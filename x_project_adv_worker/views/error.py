import re
import ujson

from aiohttp import web

from x_project_adv_worker.headers import *
from x_project_adv_worker.logger import logger, exception_message

ip_regex = re.compile(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$')


class ErrorView(web.View):
    @xml_http_request()
    @cookie()
    @cors()
    async def post(self):
        host = '127.0.0.1'
        result = dict({
        })
        data = {}
        try:
            data = await self.request.json(loads=ujson.loads)
            d = ujson.loads(data.get('data', "{}"))
            ip = str(data.get('ip', '')).strip()
            ip_check = ip_regex.match(ip)
            if ip_check:
                ip = ip_check.group()
            else:
                ip = None

            x_real_ip = self.request.headers.get('X-Real-IP', self.request.headers.get('X-Forwarded-For', ''))
            x_real_ip_check = ip_regex.match(x_real_ip)
            if x_real_ip_check:
                x_real_ip = x_real_ip_check.group()
            else:
                x_real_ip = None

            if ip:
                host = ip
            elif x_real_ip:
                host = x_real_ip
            else:
                try:
                    peername = self.request.transport.get_extra_info('peername')
                    if peername and isinstance(peername, tuple):
                        host, _ = peername
                except Exception as ex:
                    logger.error(exception_message(exc=str(ex), request=str(self.request._message)))
            logger.warning(
                'ERROR AJAX REQUEST %s %s %s %s ' % (data.get('url', ''), d.get('block_id', ''), host,
                                                     data.get('statusText', '')))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request.message), data=data))
        return web.json_response(result, dumps=ujson.dumps)
