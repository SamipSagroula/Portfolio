import unittest

from trading_engine.risk import apply_transaction_cost, max_drawdown


class TestRisk(unittest.TestCase):
    def test_transaction_cost_reduces_profit(self):
        pnl = apply_transaction_cost(100, 110, 1, sebon_commission=0.004, dp_fee=25, slippage=0.005)
        self.assertLess(pnl, 10)

    def test_max_drawdown_value(self):
        dd = max_drawdown([100, 110, 90, 95, 80])
        self.assertGreater(dd, 0)


if __name__ == "__main__":
    unittest.main()

