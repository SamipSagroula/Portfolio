#!/usr/bin/env python3
from __future__ import annotations

import argparse
import json
from pathlib import Path

from trading_engine.config import EngineConfig
from trading_engine.pipeline import run_pipeline, generate_latest_signals
from trading_engine.utils import save_json


def update_frontend_config(summary: dict, path: str = "Home/public/config.json") -> None:
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "tradingEngine": {
            "name": "NEPSE Hybrid Ensemble",
            "sharpeRatio": round(float(summary.get("sharpe_ratio", 0.0)), 4),
            "maxDrawdown": round(float(summary.get("max_drawdown", 0.0)), 4),
            "totalTrades": int(summary.get("total_trades", 0)),
        }
    }
    save_json(payload, str(p))


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate hedge-fund grade NEPSE trade ideas.")
    parser.add_argument("--data", default="historical_data.csv", help="Path to historical CSV")
    parser.add_argument("--actions", default="corporate_actions.csv", help="Path to corporate actions CSV")
    parser.add_argument("--output", default="artifacts", help="Artifacts output directory")
    parser.add_argument("--refresh", action="store_true", help="Retrain and refresh artifacts before reading signals")
    args = parser.parse_args()

    cfg = EngineConfig(data_path=args.data, corporate_actions_path=args.actions, output_dir=args.output)
    if args.refresh:
        result = run_pipeline(cfg)
        update_frontend_config(result["summary"])
        print(json.dumps({"status": "refreshed", "summary": result["summary"]}, indent=2))
        return

    signals = generate_latest_signals(cfg)
    print(json.dumps({"signals": signals}, indent=2))


if __name__ == "__main__":
    main()

