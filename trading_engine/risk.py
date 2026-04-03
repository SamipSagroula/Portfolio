from __future__ import annotations

from typing import List, Dict, Any
import math


def apply_transaction_cost(entry: float, exit_price: float, qty: float, sebon_commission: float, dp_fee: float, slippage: float) -> float:
    """Compute net PnL after SEBON-related commission, DP fee, and slippage costs."""
    gross = (exit_price - entry) * qty
    turnover = (entry + exit_price) * qty
    fees = turnover * sebon_commission + dp_fee
    slip = turnover * slippage
    return gross - fees - slip


def atr_stop_and_target(entry: float, atr: float, risk_reward_ratio: float = 2.0) -> Dict[str, float]:
    stop = max(entry - atr, 0.0)
    target = entry + atr * risk_reward_ratio
    return {"stop_loss": stop, "take_profit": target}


def sharpe_ratio(returns: List[float], annualization_factor: int = 252) -> float:
    if not returns:
        return 0.0
    mean_r = sum(returns) / len(returns)
    var = sum((r - mean_r) ** 2 for r in returns) / max(len(returns) - 1, 1)
    std = math.sqrt(var)
    if std == 0:
        return 0.0
    return (mean_r / std) * math.sqrt(annualization_factor)


def max_drawdown(equity_curve: List[float]) -> float:
    if not equity_curve:
        return 0.0
    peak = equity_curve[0]
    mdd = 0.0
    for v in equity_curve:
        peak = max(peak, v)
        if peak > 0:
            dd = (peak - v) / peak
            mdd = max(mdd, dd)
    return mdd


def backtest(
    rows: List[Dict[str, Any]],
    probs: List[float],
    confidence: List[float],
    sebon_commission: float,
    dp_fee: float,
    slippage: float,
    risk_reward_ratio: float = 2.0,
    min_signal_probability: float = 0.55,
    min_signal_confidence: float = 0.55,
) -> Dict[str, Any]:
    equity = 100000.0
    eq_curve = [equity]
    returns: List[float] = []
    trades: List[Dict[str, Any]] = []
    n = min(len(rows), len(probs), len(confidence))
    for i in range(n - 1):
        r = rows[i]
        entry = float(r["close"])
        atr = float(r.get("atr_14", 0.0))
        rr = atr_stop_and_target(entry, atr, risk_reward_ratio=risk_reward_ratio)
        if probs[i] > min_signal_probability and confidence[i] > min_signal_confidence:
            nxt = rows[i + 1]
            exit_price = float(nxt["close"])
            pnl = apply_transaction_cost(
                entry=entry,
                exit_price=exit_price,
                qty=1.0,
                sebon_commission=sebon_commission,
                dp_fee=dp_fee,
                slippage=slippage,
            )
            ret = pnl / max(entry, 1.0)
            returns.append(ret)
            equity += pnl
            eq_curve.append(equity)
            trades.append(
                {
                    "date": r["date"].isoformat(),
                    "symbol": r["symbol"],
                    "entry": entry,
                    "exit": exit_price,
                    "stop_loss": rr["stop_loss"],
                    "take_profit": rr["take_profit"],
                    "pnl": pnl,
                    "probability": probs[i],
                    "confidence": confidence[i],
                }
            )
    return {"equity_curve": eq_curve, "returns": returns, "trades": trades}
