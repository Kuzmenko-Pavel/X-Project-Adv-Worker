from aiohttp import web


class BlocksView(web.View):
    async def get(self):
        result = []
        pool = self.request.app.pool
        block_src = self.request.query.get('src', '')
        block_result = await self.request.app.query.get_block(pool=pool, block_src=block_src)
        inf = dict(block_result)
        block_domain = inf.get('domain', 0)
        block_id = inf.get('id', 0)
        block_account = inf.get('account', 0)
        place_offer_campaigns = []
        social_offer_campaigns = []
        dynamic_retargeting_campaigns = []
        account_retargeting_campaigns = []
        campaigns_result = await  self.request.app.query.get_campaigns(pool=pool, block_id=block_id,
                                                                       block_domain=block_domain,
                                                                       block_account=block_account)
        for campaign in campaigns_result:
            if campaign['social']:
                social_offer_campaigns.append(campaign['id'])
            else:
                if campaign['retargeting']:
                    if campaign['retargeting_type'] == 'offer':
                        dynamic_retargeting_campaigns.append(campaign['id'])
                    else:
                        account_retargeting_campaigns.append(campaign['id'])
                else:
                    place_offer_campaigns.append(campaign['id'])

        place_offer_result = await self.request.app.query.get_place_offer(pool=pool,
                                                                          campaigns=place_offer_campaigns,
                                                                          capacity=block_result.get('capacity', 0))
        social_offer_result = await self.request.app.query.get_social_offer(pool=pool,
                                                                            campaigns=social_offer_campaigns,
                                                                            capacity=block_result.get('capacity', 0))
        dynamic_retargeting_offer_result = \
            await self.request.app.query.get_dynamic_retargeting_offer(pool=pool,
                                                                       campaigns=dynamic_retargeting_campaigns,
                                                                       capacity=block_result.get('capacity', 0))
        account_retargeting_offer_result = \
            await self.request.app.query.get_account_retargeting_offer(pool=pool,
                                                                       campaigns=account_retargeting_campaigns,
                                                                       capacity=block_result.get('capacity', 0))
        result.append(place_offer_result)
        result.append(social_offer_result)
        result.append(dynamic_retargeting_offer_result)
        result.append(account_retargeting_offer_result)
        return web.json_response(result)
