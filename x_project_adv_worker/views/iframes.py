from aiohttp import web
import aiohttp_jinja2


@aiohttp_jinja2.template('block.html')
class IframesView(web.View):
    async def get(self):
        data = {
            'block_id': self.request.query.get('src', ''),
            'country': self.request.country,
            'region': self.request.region,
            'ip': self.request.ip,
            'token': self.request.token
        }
        return data
