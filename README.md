# NEPSE AI Trading Engine Integration

This repository now includes a standalone Python trading engine module for NEPSE under `trading_engine/` and a Telegram-friendly signal entrypoint at `signals.py`.

## Quick Start

1. Install Python dependencies:
   - `pip install -r requirements.txt`
2. Place your data:
   - `historical_data.csv`
   - Optional corporate actions at `corporate_actions.csv`
3. Refresh models, metrics, and latest signals:
   - `python signals.py --refresh`
4. Read latest trade ideas:
   - `python signals.py`

## Outputs

- Artifacts: `artifacts/`
  - `xgb_model.pkl`, `lstm_model.pkl`, `meta_model.pkl`
  - `feature_metadata.json`
  - `walk_forward_report.json`
  - `latest_signals.json`
  - `model_registry.json`
- Frontend config updated at:
  - `Home/public/config.json`
