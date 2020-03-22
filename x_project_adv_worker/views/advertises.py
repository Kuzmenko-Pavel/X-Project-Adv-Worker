import asyncio
import time
import ujson

from aiohttp import web

from x_project_adv_worker.headers import *
from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.data_processor import DataProcessor


class AdvertisesView(web.View):

    @xml_http_request()
    @not_robot()
    @cookie()
    @cors()
    @detect_device()
    async def post(self):
        result = dict({
            'css': '',
            'block': dict(),
            'offers': list(),
            'clean': {
                'place': True,
                'social': True,
                'account_retargeting': True,
                'dynamic_retargeting': True
            },
            'parther': False,
            'test': False
        })
        data = {}
        try:
            try:
                data = await self.request.json(loads=ujson.loads)
            except ValueError:
                logger.error('JSON Fail %s' % await self.request.text())

            if isinstance(data, dict) and data:
                data['device'] = self.request.device
                data_processor = DataProcessor(self.request, data)
                result = await data_processor()
            else:
                logger.error('Empty Data')
        except asyncio.CancelledError:
            logger.error('CancelledError DataProcessor %s' % str(time.time() - self.request.start_time))
        except Exception as ex:
            logger.error(exception_message(time=str(time.time() - self.request.start_time),
                                           exc=str(ex), request=str(self.request.message), data=data))

        return web.json_response(result, dumps=ujson.dumps)
