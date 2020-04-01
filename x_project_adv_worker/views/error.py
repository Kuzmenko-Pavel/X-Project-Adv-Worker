import json

from aiohttp import web

from x_project_adv_worker.headers import *
from x_project_adv_worker.logger import logger, exception_message


class ErrorView(web.View):
    @xml_http_request()
    @cookie()
    @cors()
    async def post(self):
        data = {}
        try:
            data = await self.request.json(loads=json.loads)
            d = json.loads(data.get('data', "{}"))

            logger.warning(
                'ERROR AJAX REQUEST %s %s %s %s ' % (
                    data.get('url', ''),
                    d.get('block_id', ''),
                    self.request.ip,
                    data.get('statusText', '')
                )
            )
        except json.decoder.JSONDecodeError:
            logger.error(exception_message(msg='JSON Fail',
                                           text=await self.request.text(),
                                           request=str(self.request.message)
                                           )
                         )
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request.message), data=data))
        return web.json_response(dict({}), dumps=json.dumps)
