from aiohttp import web


class OffersSocialView(web.View):
    async def post(self):
        result = {}
        pool = self.request.app.pool
        data = await self.request.json()
        return web.json_response(result)
