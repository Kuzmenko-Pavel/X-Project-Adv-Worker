from aiohttp import web
import aiohttp_jinja2
from x_project_adv_worker.styler import reset_css
from x_project_adv_worker.utils import encryptDecrypt
from x_project_adv_worker.logger import logger, exception_message

@aiohttp_jinja2.template('block.html')
class IframesView(web.View):

    async def get_data(self):
        host = '127.0.0.1'
        not_found = 'NOT FOUND'
        cookie = ''
        post = await self.request.post()
        query = self.request.query
        headers = self.request.headers
        country = post.get('country', query.get('country'))
        region = post.get('region', query.get('region'))
        test = 'true' if post.get('test', query.get('test', 'false')) == 'true' else 'false'
        block_id = post.get('scr', query.get('scr', ''))
        auto = 'true' if post.get('auto', query.get('auto', 'false')) == 'true' else 'false'
        ip = post.get('ip', query.get('ip'))
        x_real_ip = headers.get('X-Real-IP', headers.get('X-Forwarded-For'))
        if ip is not None:
            host = ip
        elif x_real_ip is not None:
            host = x_real_ip
        else:
            try:
                peername = self.request.transport.get_extra_info('peername')
                if peername is not None and isinstance(peername, tuple):
                    host, _ = peername
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(self.request._message)))

        try:
            country_by_ip = self.request.app.GeoIPCountry.country_code_by_addr(host)
            if country_by_ip is not None and country is None:
                country = country_by_ip
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request._message)))

        try:
            region_by_ip = self.request.app.GeoIPCity.record_by_addr(host)
            if region_by_ip is not None and region is None:
                region = region_by_ip.get('region_name', not_found)
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request._message)))

        if country is None:
            country = not_found
        elif country == '':
            country = 'ALL'

        if region is None:
            region = not_found
        elif region == '':
            region = 'ALL'

        request_token = encryptDecrypt('valid', host)
        data = {
            'block_id': block_id,
            'auto': auto,
            'country': country,
            'region': region,
            'ip': host,
            'token': request_token,
            'test': test,
            'cookie': cookie,
            'style': reset_css
        }
        return data

    async def get(self):
        return await self.get_data()

    async def post(self):
        return await self.get_data()
