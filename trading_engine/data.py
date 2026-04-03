from __future__ import annotations

import csv
from datetime import datetime, timedelta
from pathlib import Path
from typing import Dict, List, Any, Optional, Iterable


REQUIRED_COLUMNS = {
    "date",
    "symbol",
    "sector",
    "open",
    "high",
    "low",
    "close",
    "volume",
}


def _to_float(value: str) -> float:
    return float(value) if value not in ("", None) else 0.0


def _to_date(value: str) -> datetime:
    return datetime.fromisoformat(value)


def validate_schema(rows: List[Dict[str, Any]]) -> None:
    if not rows:
        raise ValueError("No data rows found")
    cols = set(rows[0].keys())
    missing = REQUIRED_COLUMNS - cols
    if missing:
        raise ValueError(f"Missing required columns: {sorted(missing)}")


def read_csv_rows(path: str) -> List[Dict[str, Any]]:
    p = Path(path)
    if not p.exists():
        raise FileNotFoundError(f"Data file not found: {path}")
    with p.open("r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        rows = [dict(r) for r in reader]
    validate_schema(rows)
    parsed: List[Dict[str, Any]] = []
    for r in rows:
        parsed.append(
            {
                "date": _to_date(r["date"]),
                "symbol": r["symbol"],
                "sector": r["sector"],
                "open": _to_float(r["open"]),
                "high": _to_float(r["high"]),
                "low": _to_float(r["low"]),
                "close": _to_float(r["close"]),
                "volume": _to_float(r["volume"]),
                "hydro_index": _to_float(r.get("hydro_index", "0")),
                "banking_index": _to_float(r.get("banking_index", "0")),
                "is_closed": False,
            }
        )
    parsed.sort(key=lambda x: (x["symbol"], x["date"]))
    return parsed


def read_corporate_actions(path: str) -> Dict[str, Dict[datetime, float]]:
    p = Path(path)
    if not p.exists():
        return {}
    with p.open("r", newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        out: Dict[str, Dict[datetime, float]] = {}
        for r in reader:
            symbol = r["symbol"]
            action_date = _to_date(r["date"])
            factor = _to_float(r.get("adjustment_factor", "1"))
            out.setdefault(symbol, {})[action_date] = factor
    return out


def apply_corporate_actions(rows: List[Dict[str, Any]], actions: Dict[str, Dict[datetime, float]]) -> List[Dict[str, Any]]:
    adjusted: List[Dict[str, Any]] = []
    for row in rows:
        factor = actions.get(row["symbol"], {}).get(row["date"], 1.0)
        nr = dict(row)
        if factor and factor > 0:
            nr["open"] = nr["open"] / factor
            nr["high"] = nr["high"] / factor
            nr["low"] = nr["low"] / factor
            nr["close"] = nr["close"] / factor
            nr["volume"] = nr["volume"] * factor
        adjusted.append(nr)
    return adjusted


def _daterange(start: datetime, end: datetime) -> Iterable[datetime]:
    cur = start
    while cur <= end:
        yield cur
        cur += timedelta(days=1)


def fill_non_trading_days(rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    by_symbol: Dict[str, List[Dict[str, Any]]] = {}
    for row in rows:
        by_symbol.setdefault(row["symbol"], []).append(row)
    output: List[Dict[str, Any]] = []
    for symbol, symbol_rows in by_symbol.items():
        symbol_rows.sort(key=lambda x: x["date"])
        start = symbol_rows[0]["date"]
        end = symbol_rows[-1]["date"]
        row_by_date = {r["date"]: r for r in symbol_rows}
        last_known = symbol_rows[0]
        for dt in _daterange(start, end):
            if dt in row_by_date:
                last_known = row_by_date[dt]
                output.append(last_known)
            else:
                filled = dict(last_known)
                filled["date"] = dt
                filled["volume"] = 0.0
                filled["is_closed"] = True
                output.append(filled)
    output.sort(key=lambda x: (x["symbol"], x["date"]))
    return output


def leakage_checks(rows: List[Dict[str, Any]]) -> None:
    by_symbol: Dict[str, List[Dict[str, Any]]] = {}
    for row in rows:
        by_symbol.setdefault(row["symbol"], []).append(row)
    for symbol, symbol_rows in by_symbol.items():
        symbol_rows.sort(key=lambda x: x["date"])
        for i in range(1, len(symbol_rows)):
            if symbol_rows[i]["date"] <= symbol_rows[i - 1]["date"]:
                raise ValueError(f"Time leakage risk: non-increasing date for {symbol}")

