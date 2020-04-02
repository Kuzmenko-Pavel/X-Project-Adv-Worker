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
