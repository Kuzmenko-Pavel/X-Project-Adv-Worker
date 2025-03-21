import aiohttp_jinja2
from aiohttp import web

from x_project_adv_worker.headers import *
from x_project_adv_worker.styler import reset_css


class NotFoundView(web.View):
    @cache(expire=3600)
    @cookie()
    async def get_data(self):
        post = await self.request.post()
        query = self.request.query
        guid_block = post.get('scr', query.get('scr', ''))
        try:
            h = int(float(post.get('h', query.get('h'))))
        except Exception:
            h = ''
        try:
            w = int(float(post.get('w', query.get('w'))))
        except Exception:
            w = ''
        data = {
            'guid_block': guid_block,
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
