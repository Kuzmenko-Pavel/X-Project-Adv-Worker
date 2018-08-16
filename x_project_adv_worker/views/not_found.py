from aiohttp import web
import ujson
import aiohttp_jinja2
from x_project_adv_worker.styler import reset_css
from x_project_adv_worker.headers import *


class NotFoundView(web.View):
    @cache(expire=3600)
    async def get_data(self):
        data = {
            'style': reset_css,
            'nonce': self.request.nonce
        }
        response = aiohttp_jinja2.render_template('not_found_block.html', self.request, data)
        return response

    async def get(self):
        return await self.get_data()

    async def post(self):
        return await self.get_data()
