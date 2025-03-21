import asyncio
import json
import time

from aiohttp import web

from x_project_adv_worker.data_processor import DataProcessor
from x_project_adv_worker.headers import *
from x_project_adv_worker.logger import logger, exception_message


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
                data = await self.request.json(loads=json.loads)
            except json.decoder.JSONDecodeError:
                logger.warning(exception_message(msg='JSON Fail',
                                                 text=await self.request.text(),
                                                 request=str(self.request.message)
                                                 )
                               )

            if isinstance(data, dict) and data:
                data['device'] = self.request.device
                data_processor = DataProcessor(self.request, data)
                result = await data_processor()
            else:
                logger.warning('Empty Data')
        except asyncio.CancelledError:
            logger.warning('CancelledError DataProcessor %s' % str(time.time() - self.request.start_time))
            if (time.time() - self.request.start_time) > 1:
                logger.error(exception_message(
                    msg='CancelledError DataProcessor %s' % str(time.time() - self.request.start_time),
                    request=str(self.request.message),
                    data=data)
                )
        except OverflowError as ex:
            logger.error(exception_message(msg='Overflow Error DataProcessor',
                                           time=str(time.time() - self.request.start_time),
                                           exc=str(ex), request=str(self.request.message), data=data,
                                           text=await self.request.text()))
        except MemoryError as ex:
            logger.error(exception_message(msg='MemoryError DataProcessor',
                                           time=str(time.time() - self.request.start_time),
                                           exc=str(ex), request=str(self.request.message), data=data,
                                           text=await self.request.text()))
        except Exception as ex:
            logger.error(exception_message(time=str(time.time() - self.request.start_time),
                                           exc=str(ex), request=str(self.request.message), data=data,
                                           text=await self.request.text()))

        return web.json_response(result, dumps=json.dumps)
