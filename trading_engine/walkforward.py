from __future__ import annotations

from datetime import datetime
from typing import List, Dict, Any, Iterator, Tuple


def _month_start(dt: datetime) -> datetime:
    return datetime(dt.year, dt.month, 1)


def _add_months(dt: datetime, months: int) -> datetime:
    month = dt.month - 1 + months
    year = dt.year + month // 12
    month = month % 12 + 1
    return datetime(year, month, 1)


def split_walk_forward(
    rows: List[Dict[str, Any]], lookback_months: int = 6, test_months: int = 1
) -> Iterator[Tuple[List[Dict[str, Any]], List[Dict[str, Any]]]]:
    if not rows:
        return
    sorted_rows = sorted(rows, key=lambda x: x["date"])
    first = _month_start(sorted_rows[0]["date"])
    last = _month_start(sorted_rows[-1]["date"])
    cursor = _add_months(first, lookback_months)
    while cursor <= last:
        train_start = _add_months(cursor, -lookback_months)
        train_end = cursor
        test_end = _add_months(cursor, test_months)
        train = [r for r in sorted_rows if train_start <= _month_start(r["date"]) < train_end]
        test = [r for r in sorted_rows if train_end <= _month_start(r["date"]) < test_end]
        if train and test:
            yield train, test
        cursor = _add_months(cursor, test_months)


def infer_regime(rows: List[Dict[str, Any]]) -> str:
    if len(rows) < 2:
        return "sideways"
    start = rows[0]["close"]
    end = rows[-1]["close"]
    if end > start:
        return "bull"
    if end < start:
        return "bear"
    return "sideways"

