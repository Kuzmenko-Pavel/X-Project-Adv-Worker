from aiohttp import web
import ujson


class OffersPlaceView(web.View):
    async def post(self):
        result = {'clean': False, 'offers': None}
        if self.request.is_xml_http and self.request.has_body:
            data = await self.request.json(loads=ujson.loads)
            if isinstance(data, dict):
                pool = self.request.app.pool
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
        return web.json_response(result, dumps=ujson.dumps)
