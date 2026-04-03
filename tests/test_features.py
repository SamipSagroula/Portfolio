from trading_engine.features import garman_klass_volatility


def test_garman_klass_non_negative():
    vol = garman_klass_volatility(100, 105, 98, 102)
    assert vol >= 0.0

