from aiohttp import web
import ujson
import aiohttp_jinja2
from x_project_adv_worker.styler import reset_css
from x_project_adv_worker.headers import *


class NotFoundView(web.View):
    @cache(expire=3600)
    async def get_data(self):
        post = await self.request.post()
        query = self.request.query
        block_id = post.get('scr', query.get('scr', ''))
        try:
            h = int(float(post.get('h', query.get('h'))))
        except Exception:
            h = ''
        try:
            w = int(float(post.get('w', query.get('w'))))
        except Exception:
            w = ''
        data = {
            'block_id': block_id,
            'style': reset_css,
            'w': w,
            'h': h
        }
        response = aiohttp_jinja2.render_template('not_found_block.html', self.request, data)
        return response

    async def get(self):
        return await self.get_data()

    async def post(self):
        return await self.get_data()
