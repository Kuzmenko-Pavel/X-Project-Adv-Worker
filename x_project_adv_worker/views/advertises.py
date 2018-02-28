import asyncio
import time
import ujson

from aiohttp import web

from x_project_adv_worker.headers import *
from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.data_processor import DataProcessor


class AdvertisesView(web.View):

    @xml_http_request()
    @detect_device()
    async def post(self):
        result = dict({
            'css': '',
            'block': {},
            'offers': {},
        })
        data = {}
        try:
            data = await self.request.json(loads=ujson.loads)
            if isinstance(data, dict):
                data['device'] = self.request.device
                data_processor = DataProcessor(self.request.app, data)
                result = await data_processor()
        except asyncio.CancelledError as ex:
            logger.error(exception_message(time=time.time() - self.request.start_time, exc=str(ex),
                                           request=str(self.request.message), data=data))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request.message), data=data))

        return web.json_response(result, dumps=ujson.dumps)
