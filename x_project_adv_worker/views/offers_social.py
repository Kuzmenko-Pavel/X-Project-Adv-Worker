from aiohttp import web
from asyncio import CancelledError
import time
import ujson

from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.headers import *


class OffersSocialView(web.View):
    @xml_http_request()
    async def post(self):
        result = {'clean': False, 'offers': None}
        data = {}
        try:
            data = await self.request.json(loads=ujson.loads)
            if isinstance(data, dict):
                pool = self.request.app.pool
                block_id = data.get('block_id', 0)
                capacity = data.get('capacity', 5)
                index = data.get('index', 0)
                offer_count = data.get('offer_count', 0)
                campaigns = data.get('campaigns', [])
                exclude = data.get('exclude', [])
                campaigns.append([0, 0])
                exclude.append(0)
                result['offers'], result['clean'] = await  self.request.app.query.get_social_offer(pool=pool,
                                                                                                   block_id=block_id,
                                                                                                   campaigns=campaigns,
                                                                                                   capacity=capacity,
                                                                                                   index=index,
                                                                                                   offer_count=offer_count,
                                                                                                   exclude=exclude)
        except CancelledError as ex:
            logger.error(exception_message(time=time.time() - self.request.start_time, exc=str(ex),
                                           request=str(self.request.message), data=data))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request._message), data=data))
        return web.json_response(result, dumps=ujson.dumps)
