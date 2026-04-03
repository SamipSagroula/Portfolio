from trading_engine.risk import apply_transaction_cost, max_drawdown


def test_transaction_cost_reduces_profit():
    pnl = apply_transaction_cost(100, 110, 1, sebon_commission=0.004, dp_fee=25, slippage=0.005)
    assert pnl < 10


def test_max_drawdown_value():
    dd = max_drawdown([100, 110, 90, 95, 80])
    assert dd > 0

