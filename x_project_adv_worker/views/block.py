from aiohttp import web


class BlocksView(web.View):
    async def get(self):
        pool = self.request.app.pool
        block_src = self.request.query.get('src', '')
        result = await self.request.app.query.get_block(pool=pool, block_src=block_src)
        inf = dict(result)
        block_domain = inf['domain']
        block_id = inf['id']
        block_account = inf['account']
        result = await  self.request.app.query.get_campaigns(pool=pool, block_id=block_id, block_domain=block_domain,
                                                             block_account=block_account)
        return web.json_response(result)
