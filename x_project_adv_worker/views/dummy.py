from aiohttp import web


class Dummy(web.View):
    async def get(self):
        return web.json_response({})

    async def post(self):
        return web.json_response({})
