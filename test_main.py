import pytest
from backend import main


def test_flask_simple():
    main.config['TESTING'] = True
    client = main.test_client()
    result = client.get('/test')
    assert b'root' == result.data
