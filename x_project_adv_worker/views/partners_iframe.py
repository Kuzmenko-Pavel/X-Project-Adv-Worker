from aiohttp import web
import asyncio
import time
import ujson
import aiohttp_jinja2
from x_project_adv_worker.styler import reset_css
from x_project_adv_worker.headers import *
from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.data_processor import DataProcessor


class PartnersIframeView(web.View):
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
        userCode = ''
        try:
            data_processor = DataProcessor(self.request, {'block_id': block_id})
            userCode = await data_processor.get_userCode()
        except asyncio.CancelledError as ex:
            logger.error(exception_message(time=time.time() - self.request.start_time, exc=str(ex),
                                           request=str(self.request.message)))
        data = {
            'block_id': block_id,
            'style': reset_css,
            'userCode': userCode,
            'w': w,
            'h': h
        }
        response = aiohttp_jinja2.render_template('partners_block.html', self.request, data)
        return response

    async def get(self):
        return await self.get_data()

    async def post(self):
        return await self.get_data()
