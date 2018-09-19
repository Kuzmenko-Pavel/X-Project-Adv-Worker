import asyncio
import time
import ujson

from aiohttp import web

from x_project_adv_worker.headers import *
from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.data_processor import DataProcessor


class ErrorView(web.View):
    async def post(self):
        result = dict({
        })
        data = {}
        try:
            data = await self.request.json(loads=ujson.loads)
            pass
            # logger.warning(
            #     'ERROR AJAX REQUEST %s %s %s ' % (data.get('url', ''), data.get('data', {}).get('block_id', ''),
            #                                       data.get('statusText', '')))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request.message), data=data))
        return web.json_response(result, dumps=ujson.dumps)
