from aiohttp import web
import aiohttp_jinja2
from x_project_adv_worker.styler import reset_css

@aiohttp_jinja2.template('block.html')
class IframesView(web.View):

    async def get(self):
        data = {
            'block_id': self.request.query.get('scr', ''),
            'country': self.request.country,
            'region': self.request.region,
            'ip': self.request.ip,
            'token': self.request.token,
            'style': reset_css
        }
        return data

    async def post(self):
        data = {
            'block_id': self.request.query.get('scr', ''),
            'country': self.request.country,
            'region': self.request.region,
            'ip': self.request.ip,
            'token': self.request.token,
            'style': reset_css
        }
        return data
