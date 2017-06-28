from aiohttp import web
import ujson
import time

from x_project_adv_worker.styler import Styler


class InformerView(web.View):
    async def post(self):
        # start_time = time.time()
        result = dict({'place': [], 'social': [], 'dynamic_retargeting': [], 'account_retargeting':[]})
        pool = self.request.app.pool
        data = await self.request.json()
        block_src = data.get('block_id', '')
        auto = data.get('auto', False)
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
        if not auto:
            styler.merge(ujson.loads(block_result.get('ad_style')))

        campaigns_result = await  self.request.app.query.get_campaigns(pool=pool, block_id=block_id,
                                                                       block_domain=block_domain,
                                                                       block_account=block_account)
        for campaign in campaigns_result:
            # styler.add(str(campaign['id']), 'Style_1')
            if campaign['social'] and social_branch:
                result['social'].append(campaign['id'])
            elif not campaign['social'] and not campaign['retargeting'] and place_branch:
                result['place'].append(campaign['id'])
            elif not campaign['social'] and campaign['retargeting'] and campaign[
                'retargeting_type'] == 'offer' and retargeting_branch:
                result['dynamic_retargeting'].append(campaign['id'])
            elif not campaign['social'] and campaign['retargeting'] and campaign[
                'retargeting_type'] == 'account' and retargeting_account_branch:
                result['account_retargeting'].append(campaign['id'])
        start_time_css = time.time()
        result['css'] = await styler()
        print("styler --- %s ms ---" % ((time.time() - start_time_css) * 1000))
        # print("--- %s ms ---" % ((time.time() - start_time) * 1000))
        return web.json_response(result, dumps=ujson.dumps)
