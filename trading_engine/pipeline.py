from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, Any, List

from .config import EngineConfig
from .data import (
    read_csv_rows,
    read_corporate_actions,
    apply_corporate_actions,
    fill_non_trading_days,
    leakage_checks,
)
from .features import engineer_features, feature_columns, train_matrix
from .models import XGBoostModel, LSTMModel, MetaLabelModel, ensemble_prob, save_pickle
from .registry import ModelRegistry
from .risk import backtest, sharpe_ratio, max_drawdown
from .utils import save_json, set_seed
from .walkforward import split_walk_forward, infer_regime


def _serialize_artifacts(config: EngineConfig, payload: Dict[str, Any]) -> None:
    out = Path(config.output_dir)
    out.mkdir(parents=True, exist_ok=True)
    save_json(payload, str(out / "walk_forward_report.json"))


def _build_signals(
    rows: List[Dict[str, Any]],
    probs: List[float],
    confidence: List[float],
    min_signal_probability: float,
    max_recent_signals: int,
) -> List[Dict[str, Any]]:
    signals: List[Dict[str, Any]] = []
    n = min(len(rows), len(probs), len(confidence))
    for i in range(n):
        if probs[i] > min_signal_probability:
            signals.append(
                {
                    "date": rows[i]["date"].isoformat(),
                    "symbol": rows[i]["symbol"],
                    "signal": "BUY",
                    "probability": round(probs[i], 4),
                    "confidence": round(confidence[i], 4),
                }
            )
    return signals[-max_recent_signals:]


def run_pipeline(config: EngineConfig) -> Dict[str, Any]:
    set_seed(config.random_seed)
    raw = read_csv_rows(config.data_path)
    actions = read_corporate_actions(config.corporate_actions_path)
    adjusted = apply_corporate_actions(raw, actions)
    completed = fill_non_trading_days(adjusted)
    leakage_checks(completed)
    enriched = engineer_features(completed)

    folds: List[Dict[str, Any]] = []
    all_returns: List[float] = []
    all_equity: List[float] = [100000.0]
    latest_signals: List[Dict[str, Any]] = []
    final_models = {}

    for fold_idx, (train_rows, test_rows) in enumerate(
        split_walk_forward(enriched, lookback_months=config.lookback_months, test_months=config.test_months),
        start=1,
    ):
        x_train, y_train = train_matrix(train_rows)
        x_test, y_test = train_matrix(test_rows)

        xgb = XGBoostModel()
        xgb.fit(x_train, y_train)
        p_xgb = xgb.predict_proba(x_test)

        lstm = LSTMModel(window=config.lstm_window)
        lstm.fit(x_train, y_train)
        p_lstm = lstm.predict_proba(x_test)

        p_ens = ensemble_prob(p_xgb, p_lstm)

        meta = MetaLabelModel()
        meta.fit(p_ens, y_test)
        conf = meta.predict_confidence(p_ens)

        bt = backtest(
            test_rows,
            p_ens,
            conf,
            sebon_commission=config.sebon_commission,
            dp_fee=config.dp_fee,
            slippage=config.slippage,
            risk_reward_ratio=config.risk_reward_ratio,
            min_signal_probability=config.min_signal_probability,
            min_signal_confidence=config.min_signal_confidence,
        )
        fold_returns = bt["returns"]
        fold_equity = bt["equity_curve"]
        all_returns.extend(fold_returns)
        # stitch curve incrementally
        if len(fold_equity) > 1:
            shift = all_equity[-1] - fold_equity[0]
            all_equity.extend([v + shift for v in fold_equity[1:]])

        regime = infer_regime(test_rows)
        folds.append(
            {
                "fold": fold_idx,
                "train_size": len(train_rows),
                "test_size": len(test_rows),
                "regime": regime,
                "trades": len(bt["trades"]),
                "sharpe": sharpe_ratio(fold_returns, annualization_factor=config.annualization_factor),
                "max_drawdown": max_drawdown(fold_equity),
            }
        )

        latest_signals = _build_signals(
            test_rows,
            p_ens,
            conf,
            min_signal_probability=config.min_signal_probability,
            max_recent_signals=config.max_recent_signals,
        )
        final_models = {"xgb": xgb, "lstm": lstm, "meta": meta}

    summary = {
        "sharpe_ratio": sharpe_ratio(all_returns, annualization_factor=config.annualization_factor),
        "max_drawdown": max_drawdown(all_equity),
        "total_trades": sum(f["trades"] for f in folds),
        "folds": folds,
    }

    artifact_dir = Path(config.output_dir)
    artifact_dir.mkdir(parents=True, exist_ok=True)
    save_pickle(final_models.get("xgb"), str(artifact_dir / "xgb_model.pkl"))
    save_pickle(final_models.get("lstm"), str(artifact_dir / "lstm_model.pkl"))
    save_pickle(final_models.get("meta"), str(artifact_dir / "meta_model.pkl"))
    save_json({"feature_columns": feature_columns()}, str(artifact_dir / "feature_metadata.json"))
    save_json({"signals": latest_signals}, str(artifact_dir / "latest_signals.json"))
    _serialize_artifacts(config, {"summary": summary, "latest_signals": latest_signals})

    reg = ModelRegistry(str(artifact_dir / "model_registry.json"))
    reg.register("nepse_hybrid_ensemble", "1.0.0", str(artifact_dir), summary)

    return {"summary": summary, "latest_signals": latest_signals, "artifact_dir": str(artifact_dir)}


def generate_latest_signals(config: EngineConfig) -> List[Dict[str, Any]]:
    output = Path(config.output_dir) / "latest_signals.json"
    if not output.exists():
        run_pipeline(config)

    payload = json.loads(output.read_text())
    return payload.get("signals", [])
