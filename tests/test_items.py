import argparse
import asyncio
import os

import pytest
from aiohttp import web
from trafaret_config import commandline

from x_project_adv_worker import logger
from x_project_adv_worker.db import init_db
from x_project_adv_worker.geo_ip import init_geo_ip
from x_project_adv_worker.middlewares import setup_middlewares
from x_project_adv_worker.routes import setup_routes
from x_project_adv_worker.static_hash import static_hash
from x_project_adv_worker.templates import init_templates
from x_project_adv_worker.utils import TRAFARET_CONF


def exception_message_patch(*args, **kwargs):
    pass


logger.exception_message = exception_message_patch


@pytest.yield_fixture
def loop():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    yield loop
    loop.close()


@pytest.fixture
def app(loop, test_client):
    dir_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../x_project_adv_worker"))
    ap = argparse.ArgumentParser(description='Great Description To Be Here')
    ap.add_argument('-s', "--socket", action='store', dest='socket', help='unix socket')
    commandline.standard_argparse_options(ap.add_argument_group('configuration'),
                                          default_config=dir_path + '/../conf.yaml')

    options = ap.parse_args([])
    config = commandline.config_from_options(options, TRAFARET_CONF)
    config['socket'] = options.socket
    config['dir_path'] = dir_path
    app = web.Application()
    app.block_ip_cache = {}
    app['config'] = config
    app.on_startup.append(init_db)
    app.on_startup.append(static_hash)
    init_templates(app)
    init_geo_ip(app)

    setup_routes(app)
    setup_middlewares(app)
    return app


async def test_items_get(test_client, app):
    client = await test_client(app)
    resp = await client.get('/v2/items')
    assert resp.status == 200
    assert await resp.text() == ''


async def test_items_head(test_client, app):
    client = await test_client(app)
    resp = await client.head('/v2/items')
    assert resp.status == 200
    assert await resp.text() == ''


async def test_items_post(test_client, app):
    client = await test_client(app)
    resp = await client.post('/v2/items')
    assert resp.status == 200
    assert await resp.text() == ''


async def test_items_options(test_client, app):
    client = await test_client(app)
    resp = await client.options('/v2/items')
    assert resp.status == 200
    assert await resp.text() == ''


async def test_items_post_valid(test_client, app):
    empty_data = dict({
        'css': '',
        'block': dict(),
        'offers': list(),
        'clean': {
            'place': None,
            'social': None,
            'account_retargeting': None,
            'dynamic_retargeting': None
        },
        'parther': False,
        'test': False
    })
    client = await test_client(app)
    payload = {"w": 631, "h": 400, "ti": "EVB%5CS", "guid_block": "8715ca9e-6bb9-11e7-8440-d8cb8a7f86f0", "auto": True,
               "country": "", "region": "", "ip": "37.57.27.229", "is_webp": True, "test": False,
               "time_start": 1585841506469, "cost": 0, "gender": 0, "thematics": [], "mediaQ": "d", "lc": "2",
               "vw": "1920", "vh": "1053", "retargeting": [], "index": 2,
               "exclude": ["125", "299", "467", "808", "1002", "1467891", "4397960", "21464367"],
               "thematics_exclude": [], "retargeting_account_exclude": [], "retargeting_dynamic_exclude": []}

    headers = {
        'x-requested-with': 'XMLHttpRequest',
        'content-type': 'text/plain;charset=UTF-8',
        'cookie': 'yottos_unique_id=15858415007834132; bhpp=2.5.5'
    }
    resp = await client.post('/v2/items', json=payload, headers=headers)
    assert resp.status == 200
    resp_data = await resp.json()
    assert resp_data != empty_data
    assert len(resp_data['offers']) > 0
    assert len(resp_data['css']) > 0
    assert not resp_data['test']
