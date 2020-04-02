import asyncio

import pytest

from x_project_adv_worker.main import init


@pytest.yield_fixture
def loop():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    yield loop
    loop.close()


@pytest.fixture
def app(loop, test_client):
    return init(loop, [])


async def test_static_options(test_client, app):
    client = await test_client(app)
    resp = await client.options('/v2/items')
    resp = await client.options('/v2/static/js/block.js')
    assert resp.status == 200
    assert await resp.text() == ''
    assert resp.content_type != 'application/javascript'


async def test_static_get(test_client, app):
    client = await test_client(app)
    resp = await client.get('/v2/static/js/block.js')
    assert resp.status == 200
    assert await resp.text() != ''
    assert resp.content_type == 'application/javascript'
