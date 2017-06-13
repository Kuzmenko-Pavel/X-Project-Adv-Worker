from aiohttp import web
import json

from x_project_adv_worker.styler import Styler


class InformerView(web.View):
    async def post(self):
        result = {}
        pool = self.request.app.pool
        data = await self.request.json()
        block_src = data.get('block_id', '')
        styler = Styler(data.get('w', 0), data.get('h', 0))
        block_result = await self.request.app.query.get_block(pool=pool, block_src=block_src)
        if block_result is None:
            return web.json_response(result)
        block_domain = block_result.get('domain', 0)
        block_id = block_result.get('id', 0)
        block_account = block_result.get('account', 0)
        place_branch = block_result.get('place_branch', True)
        retargeting_branch = block_result.get('retargeting_branch', True)
        retargeting_account_branch = block_result.get('retargeting_branch', True)
        social_branch = block_result.get('account', True)
        styler.merge(json.loads(block_result.get('ad_style', "{}")))
        place_offer_campaigns = []
        social_offer_campaigns = []
        dynamic_retargeting_campaigns = []
        account_retargeting_campaigns = []
        campaigns_result = await  self.request.app.query.get_campaigns(pool=pool, block_id=block_id,
                                                                       block_domain=block_domain,
                                                                       block_account=block_account)
        for campaign in campaigns_result:
            styler.add(str(campaign['id']), 'Style_1')
            if campaign['social'] and social_branch:
                social_offer_campaigns.append(campaign['id'])
            elif not campaign['social'] and not campaign['retargeting'] and place_branch:
                place_offer_campaigns.append(campaign['id'])
            elif not campaign['social'] and campaign['retargeting'] and campaign[
                'retargeting_type'] == 'offer' and retargeting_branch:
                dynamic_retargeting_campaigns.append(campaign['id'])
            elif not campaign['social'] and campaign['retargeting'] and campaign[
                'retargeting_type'] == 'account' and retargeting_account_branch:
                account_retargeting_campaigns.append(campaign['id'])

        result['place'] = place_offer_campaigns
        result['social'] = social_offer_campaigns
        result['dynamic_retargeting'] = dynamic_retargeting_campaigns
        result['account_retargeting'] = account_retargeting_campaigns

        result['css'] = styler()
        return web.json_response(result)
