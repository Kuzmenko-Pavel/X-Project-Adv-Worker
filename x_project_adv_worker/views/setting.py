import json

from aiohttp import web

from x_project_adv_worker.headers import *


class SettingJs(web.View):
    @cache(expire=60)
    @cookie()
    async def get(self):
        query = self.request.query
        guid_block = query.get('scr', '')
        height = 0
        width = 0
        last_modified = ''
        v = 'v2'
        script = "adsbyyottos.block_settings.cache['%(guid)s']=%(json)s;"
        body = script % {
            'guid': guid_block,
            'json': json.dumps({
                'h': height,
                'w': width,
                'm': last_modified,
                'v': v
            })
        }
        return web.Response(body=body, content_type='application/x-javascript', charset='utf-8')

    @cache(expire=60)
    @cookie()
    async def post(self):
        post = await self.request.post()
        query = self.request.query
        guid_block = post.get('scr', query.get('scr', ''))
        height = 0
        width = 0
        last_modified = ''
        v = 'v2'
        data = {'h': height, 'w': width, 'm': last_modified, 'v': v}
        return web.json_response(data)

    @cache(expire=3600)
    @cookie()
    @cors(allow_origin='*')
    async def options(self):
        return web.Response()


class SettingJson(web.View):
    @cache(expire=60)
    @cookie()
    async def get_data(self):
        post = await self.request.post()
        query = self.request.query
        guid_block = post.get('scr', query.get('scr', ''))
        height = 0
        width = 0
        last_modified = ''
        v = 'v2'
        data = {'h': height, 'w': width, 'm': last_modified, 'v': v}
        return web.json_response(data)

    async def get(self):
        return await self.get_data()

    async def post(self):
        return await self.get_data()
