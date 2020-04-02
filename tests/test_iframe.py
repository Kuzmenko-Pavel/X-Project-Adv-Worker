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


async def test_iframe_get(test_client, app):
    client = await test_client(app)
    resp = await client.get('/v2/pub')
    assert resp.status == 200
    resp_data = await resp.text()
    assert '<body></body>' in resp_data


async def test_iframe_head(test_client, app):
    client = await test_client(app)
    resp = await client.head('/v2/pub')
    assert resp.status == 200
    assert await resp.text() == ''


async def test_iframe_post(test_client, app):
    client = await test_client(app)
    resp = await client.post('/v2/pub')
    assert resp.status == 200
    resp_data = await resp.text()
    assert '8715ca9e-6bb9-11e7-8440-d8cb8a7f86f0' in resp_data


async def test_iframe_options(test_client, app):
    client = await test_client(app)
    resp = await client.options('/v2/pub')
    assert resp.status == 200
    assert await resp.text() == ''


async def test_iframe_post_valid(test_client, app, faker):
    client = await test_client(app)
    payload = 'ip=94.180.161.4&origin=http%3A%2F%2Fhelpers.com.ua&location=http%3A%2F%2Fhelpers.com.ua%2F%3Fadsbyyottos_ip%3D94.180.161.4&referrer=&cd=true&rotator=0&hdl=false&index=0&rand=1585844998298&post=true&scr=9200beb4-b468-11e5-a497-00e081bad801&mod=20191120142546&h=1275&w=160&m=d&vw=1920&vh=1053'

    headers = {
        'x-requested-with': 'XMLHttpRequest',
        'content-type': 'application/x-www-form-urlencoded',
        'cookie': 'bhpp=2.5.1; yottos_unique_id=15857748984561691; yottos_customer=330',
        'user-agent': faker.user_agent()
    }
    resp = await client.post('/v2/pub', data=payload, headers=headers)
    assert resp.status == 200
    resp_data = await resp.text()
    print(resp_data)
    assert '94.180.161.4' in resp_data
    assert '9200beb4-b468-11e5-a497-00e081bad801' in resp_data
