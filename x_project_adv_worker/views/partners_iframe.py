import asyncio
import time

import aiohttp_jinja2
from aiohttp import web

from x_project_adv_worker.data_processor import DataProcessor
from x_project_adv_worker.headers import *
from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.styler import reset_css


class PartnersIframeView(web.View):
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
        userCode = ''
        try:
            data_processor = DataProcessor(self.request, {'block_id': guid_block})
            userCode = await data_processor.get_userCode()
        except asyncio.CancelledError as ex:
            logger.error(exception_message(msg="PartnersIframeView CancelledError",
                                           time=time.time() - self.request.start_time,
                                           exc=str(ex),
                                           request=str(self.request.message)))
        data = {
            'guid_block': guid_block,
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
