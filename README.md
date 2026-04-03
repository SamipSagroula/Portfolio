# NEPSE AI Trading Engine Integration

This repository now includes a standalone Python trading engine module for NEPSE under `/home/runner/work/Portfolio/Portfolio/trading_engine` and a Telegram-friendly signal entrypoint at `/home/runner/work/Portfolio/Portfolio/signals.py`.

## Quick Start

1. Install Python dependencies:
   - `pip install -r /home/runner/work/Portfolio/Portfolio/requirements.txt`
2. Place your data:
   - `/home/runner/work/Portfolio/Portfolio/historical_data.csv`
   - Optional corporate actions at `/home/runner/work/Portfolio/Portfolio/corporate_actions.csv`
3. Refresh models, metrics, and latest signals:
   - `python /home/runner/work/Portfolio/Portfolio/signals.py --refresh`
4. Read latest trade ideas:
   - `python /home/runner/work/Portfolio/Portfolio/signals.py`

## Outputs

- Artifacts: `/home/runner/work/Portfolio/Portfolio/artifacts`
  - `xgb_model.pkl`, `lstm_model.pkl`, `meta_model.pkl`
  - `feature_metadata.json`
  - `walk_forward_report.json`
  - `latest_signals.json`
  - `model_registry.json`
- Frontend config updated at:
  - `/home/runner/work/Portfolio/Portfolio/Home/public/config.json`

