from dataclasses import dataclass, asdict
from pathlib import Path
import json
from typing import Dict, Any


@dataclass
class EngineConfig:
    data_path: str = "historical_data.csv"
    corporate_actions_path: str = "corporate_actions.csv"
    output_dir: str = "artifacts"
    lookback_months: int = 6
    test_months: int = 1
    lstm_window: int = 30
    risk_reward_ratio: float = 2.0
    sebon_commission: float = 0.004
    dp_fee: float = 25.0
    slippage: float = 0.005
    annualization_factor: int = 252
    random_seed: int = 42
    min_signal_probability: float = 0.55
    min_signal_confidence: float = 0.55
    max_recent_signals: int = 20

    def to_dict(self) -> Dict[str, Any]:
        return asdict(self)

    def save(self, path: str) -> None:
        p = Path(path)
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(json.dumps(self.to_dict(), indent=2))
