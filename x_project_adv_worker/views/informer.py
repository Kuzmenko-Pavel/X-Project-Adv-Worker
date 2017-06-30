from aiohttp import web
import ujson
import time

from x_project_adv_worker.styler import Styler


class InformerView(web.View):
    async def post(self):
        result = dict({'css': '', 'campaigns': [], 'block': {}})
        pool = self.request.app.pool
        data = await self.request.json()
        block_src = data.get('block_id', '')
        auto = data.get('auto', False)
        country = data.get('country', 'NOT FOUND')
        city = data.get('city', 'NOT FOUND')
        device = data.get('device', 'pc')
        cost = data.get('cost', 0)
        gender = data.get('gender', 0)
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
        if not auto and not block_result.get('dynamic', False):
            styler.merge(ujson.loads(block_result.get('ad_style')))

        campaigns_result = await  self.request.app.query.get_campaigns(pool=pool, block_id=block_id,
                                                                       block_domain=block_domain,
                                                                       block_account=block_account,
                                                                       country=country,
                                                                       city=city,
                                                                       device=device,
                                                                       cost=cost,
                                                                       gender=gender)
        for campaign in campaigns_result:
            if campaign['style_type'] not in ['default', 'Block', 'RetBlock', 'RecBlock']:
                styler.add(str(campaign['id']), 'Style_1')

            if campaign['social'] and social_branch:
                result['campaigns'].append(campaign)
            elif not campaign['social'] and not campaign['retargeting'] and place_branch:
                result['campaigns'].append(campaign)
            elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'offer' and retargeting_branch:
                result['campaigns'].append(campaign)
            elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'account' and retargeting_account_branch:
                result['campaigns'].append(campaign)
        result['css'] = await styler()
        result['block']['id'] = block_result.get('id', 0)
        result['block']['guid'] = block_result.get('guid', '')
        result['block']['headerHtml'] = block_result.get('headerHtml', '')
        result['block']['footerHtml'] = block_result.get('footerHtml', '')
        return web.json_response(result, dumps=ujson.dumps)
