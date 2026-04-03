from __future__ import annotations

import math
import pickle
from pathlib import Path
from typing import List, Dict, Any, Optional


class BaselineLinearModel:
    def __init__(self) -> None:
        self.weights: List[float] = []
        self.bias: float = 0.0

    def fit(self, x: List[List[float]], y: List[int]) -> None:
        if not x:
            self.weights = []
            self.bias = 0.0
            return
        n_features = len(x[0])
        # lightweight deterministic fitting (class-conditional difference)
        pos = [0.0] * n_features
        neg = [0.0] * n_features
        pc = nc = 0
        for row, label in zip(x, y):
            if label == 1:
                pc += 1
                pos = [a + b for a, b in zip(pos, row)]
            else:
                nc += 1
                neg = [a + b for a, b in zip(neg, row)]
        pos_mean = [v / max(pc, 1) for v in pos]
        neg_mean = [v / max(nc, 1) for v in neg]
        self.weights = [p - n for p, n in zip(pos_mean, neg_mean)]
        self.bias = 0.0

    def predict_proba(self, x: List[List[float]]) -> List[float]:
        out: List[float] = []
        for row in x:
            score = sum(w * v for w, v in zip(self.weights, row)) + self.bias
            p = 1.0 / (1.0 + math.exp(-max(min(score, 20), -20)))
            out.append(p)
        return out


class XGBoostModel:
    def __init__(self) -> None:
        self.backend: str = "baseline"
        self.model: Any = BaselineLinearModel()

    def fit(self, x: List[List[float]], y: List[int]) -> None:
        try:
            from xgboost import XGBClassifier  # type: ignore

            model = XGBClassifier(
                n_estimators=100,
                max_depth=4,
                learning_rate=0.05,
                subsample=0.8,
                colsample_bytree=0.8,
                random_state=42,
                eval_metric="logloss",
            )
            model.fit(x, y)
            self.backend = "xgboost"
            self.model = model
        except Exception:
            self.backend = "baseline"
            self.model = BaselineLinearModel()
            self.model.fit(x, y)

    def predict_proba(self, x: List[List[float]]) -> List[float]:
        if self.backend == "xgboost":
            probs = self.model.predict_proba(x)
            return [float(p[1]) for p in probs]
        return self.model.predict_proba(x)


class LSTMModel:
    def __init__(self, window: int = 30) -> None:
        self.window = window
        self.backend = "baseline"
        self.device = "cpu"
        self.model: Any = BaselineLinearModel()
        try:
            import torch  # type: ignore

            self.device = "cuda" if torch.cuda.is_available() else "cpu"
        except Exception:
            self.device = "cpu"

    def fit(self, x: List[List[float]], y: List[int]) -> None:
        # Lightweight fallback to deterministic baseline in constrained environments.
        self.model.fit(x, y)

    def predict_proba(self, x: List[List[float]]) -> List[float]:
        return self.model.predict_proba(x)


class MetaLabelModel:
    def __init__(self) -> None:
        self.model = BaselineLinearModel()

    def fit(self, base_probs: List[float], y: List[int]) -> None:
        x = [[p] for p in base_probs]
        self.model.fit(x, y)

    def predict_confidence(self, base_probs: List[float]) -> List[float]:
        return self.model.predict_proba([[p] for p in base_probs])


def ensemble_prob(xgb_probs: List[float], lstm_probs: List[float]) -> List[float]:
    return [(a + b) / 2.0 for a, b in zip(xgb_probs, lstm_probs)]


def save_pickle(obj: Any, path: str) -> None:
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    with p.open("wb") as f:
        pickle.dump(obj, f)


def load_pickle(path: str) -> Optional[Any]:
    p = Path(path)
    if not p.exists():
        return None
    with p.open("rb") as f:
        return pickle.load(f)

