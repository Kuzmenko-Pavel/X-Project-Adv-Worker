from aiohttp import web


class OffersAccountRetargetingView(web.View):
    async def post(self):
        result = {'clean': False, 'offers': None}
        pool = self.request.app.pool
        data = await self.request.json()
        capacity = data.get('capacity', 5)
        campaigns = data.get('campaigns', [])
        exclude = data.get('exclude', [])
        campaigns.append([0, 0])
        exclude.append(0)
        result['offers'], result['clean'] = await self.request.app.query.get_account_retargeting_offer(pool=pool,
                                                                                                       campaigns=campaigns,
                                                                                                       capacity=capacity,
                                                                                                       exclude=exclude)
        return web.json_response(result)
