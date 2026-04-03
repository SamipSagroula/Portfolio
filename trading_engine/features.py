from __future__ import annotations

import math
from typing import Dict, List, Any, Tuple


def _pct_change(cur: float, prev: float) -> float:
    if prev == 0:
        return 0.0
    return (cur - prev) / prev


def _rolling_mean(values: List[float], window: int) -> List[float]:
    out: List[float] = []
    for i in range(len(values)):
        start = max(0, i - window + 1)
        seg = values[start : i + 1]
        out.append(sum(seg) / len(seg))
    return out


def _rolling_atr(highs: List[float], lows: List[float], closes: List[float], window: int = 14) -> List[float]:
    tr: List[float] = []
    for i in range(len(highs)):
        prev_close = closes[i - 1] if i > 0 else closes[i]
        tr_val = max(highs[i] - lows[i], abs(highs[i] - prev_close), abs(lows[i] - prev_close))
        tr.append(tr_val)
    return _rolling_mean(tr, window)


def garman_klass_volatility(o: float, h: float, l: float, c: float) -> float:
    if min(o, h, l, c) <= 0:
        return 0.0
    return max(
        0.0,
        0.5 * (math.log(h / l) ** 2) - (2 * math.log(2) - 1) * (math.log(c / o) ** 2),
    )


def _sector_index_return(row: Dict[str, Any], prev_row: Dict[str, Any]) -> float:
    sector = row["sector"].lower()
    if "hydro" in sector:
        return _pct_change(row.get("hydro_index", 0.0), prev_row.get("hydro_index", 0.0))
    if "bank" in sector:
        return _pct_change(row.get("banking_index", 0.0), prev_row.get("banking_index", 0.0))
    return 0.0


def engineer_features(rows: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    by_symbol: Dict[str, List[Dict[str, Any]]] = {}
    for row in rows:
        by_symbol.setdefault(row["symbol"], []).append(row)
    output: List[Dict[str, Any]] = []
    for symbol_rows in by_symbol.values():
        symbol_rows.sort(key=lambda x: x["date"])
        closes = [r["close"] for r in symbol_rows]
        highs = [r["high"] for r in symbol_rows]
        lows = [r["low"] for r in symbol_rows]
        atr = _rolling_atr(highs, lows, closes, window=14)
        for i, row in enumerate(symbol_rows):
            prev = symbol_rows[i - 1] if i > 0 else row
            feature_row = dict(row)
            ret = _pct_change(row["close"], prev["close"])
            # Liquidity (Amihud)
            feature_row["amihud_illiquidity"] = abs(ret) / max(row["volume"], 1.0)
            # Momentum
            feature_row["ts_momentum_30"] = _pct_change(row["close"], symbol_rows[max(i - 30, 0)]["close"])
            feature_row["sector_relative_strength"] = ret - _sector_index_return(row, prev)
            # SMC proxies
            prev_high = prev["high"]
            prev_low = prev["low"]
            # Market Structure Break (MSB) and Fair Value Gap (FVG) Smart Money Concept features.
            feature_row["market_structure_break"] = 1.0 if row["close"] > prev_high or row["close"] < prev_low else 0.0
            feature_row["fair_value_gap"] = 1.0 if i >= 2 and lows[i] > highs[i - 2] else 0.0
            # Backward-compatible aliases.
            feature_row["msb"] = feature_row["market_structure_break"]
            feature_row["fvg"] = feature_row["fair_value_gap"]
            # Volatility
            feature_row["garman_klass_vol"] = garman_klass_volatility(row["open"], row["high"], row["low"], row["close"])
            feature_row["atr_14"] = atr[i]
            # Labels
            next_close = symbol_rows[i + 1]["close"] if i < len(symbol_rows) - 1 else row["close"]
            next_ret = _pct_change(next_close, row["close"])
            feature_row["target"] = 1 if next_ret > 0 else 0
            output.append(feature_row)
    output.sort(key=lambda x: (x["symbol"], x["date"]))
    return output


def feature_columns() -> List[str]:
    return [
        "amihud_illiquidity",
        "ts_momentum_30",
        "sector_relative_strength",
        "market_structure_break",
        "fair_value_gap",
        "garman_klass_vol",
        "atr_14",
    ]


def train_matrix(rows: List[Dict[str, Any]]) -> Tuple[List[List[float]], List[int]]:
    cols = feature_columns()
    x = [[float(r.get(c, 0.0)) for c in cols] for r in rows]
    y = [int(r.get("target", 0)) for r in rows]
    return x, y
