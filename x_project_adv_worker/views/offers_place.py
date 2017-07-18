from aiohttp import web


class OffersPlaceView(web.View):
    async def post(self):
        result = {'clean': False, 'offers': None}
        if not self.request.is_xml_http:
            return web.json_response(result)
        pool = self.request.app.pool
        data = await self.request.json()
        block_id = data.get('block_id', 0)
        capacity = data.get('capacity', 5)
        campaigns = data.get('campaigns', [])
        exclude = data.get('exclude', [])
        campaigns.append([0, 0])
        exclude.append(0)
        result['offers'], result['clean'] = await self.request.app.query.get_place_offer(pool=pool,
                                                                                         block_id=block_id,
                                                                                         campaigns=campaigns,
                                                                                         capacity=capacity,
                                                                                         exclude=exclude)
        return web.json_response(result)
