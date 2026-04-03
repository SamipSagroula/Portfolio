import unittest

from trading_engine.features import garman_klass_volatility


class TestFeatures(unittest.TestCase):
    def test_garman_klass_non_negative(self):
        vol = garman_klass_volatility(100, 105, 98, 102)
        self.assertGreaterEqual(vol, 0.0)


if __name__ == "__main__":
    unittest.main()

