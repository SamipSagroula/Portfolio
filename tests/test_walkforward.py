import unittest
from datetime import datetime

from trading_engine.walkforward import infer_regime


class TestWalkForward(unittest.TestCase):
    def test_infer_regime_bull(self):
        rows = [{"close": 100, "date": datetime(2024, 1, 1)}, {"close": 110, "date": datetime(2024, 1, 2)}]
        self.assertEqual(infer_regime(rows), "bull")

    def test_infer_regime_bear(self):
        rows = [{"close": 110, "date": datetime(2024, 1, 1)}, {"close": 100, "date": datetime(2024, 1, 2)}]
        self.assertEqual(infer_regime(rows), "bear")

    def test_infer_regime_sideways(self):
        rows = [{"close": 100, "date": datetime(2024, 1, 1)}, {"close": 100, "date": datetime(2024, 1, 2)}]
        self.assertEqual(infer_regime(rows), "sideways")


if __name__ == "__main__":
    unittest.main()

