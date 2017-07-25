from aiohttp import web
import ujson

from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.styler import Styler


class InformerView(web.View):
    async def post(self):
        result = dict({'css': '', 'campaigns': [], 'block': {}})
        data = {}
        try:
            if self.request.is_xml_http and self.request.has_body:
                data = await self.request.json(loads=ujson.loads)
                if isinstance(data, dict):
                    pool = self.request.app.pool
                    block_src = data.get('block_id', '')
                    auto = data.get('auto', False)
                    country = data.get('country', 'NOT FOUND')
                    city = data.get('city', 'NOT FOUND')
                    device = data.get('device', 'pc')
                    cost = data.get('cost', 0)
                    gender = data.get('gender', 0)
                    raw_retargeting = data.get('retargeting', [])
                    retargeting = {}
                    for ids in raw_retargeting:
                        if len(ids) >= 2:
                            retargeting[str(ids[1]).lower()] = ids[0]
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

                    capacity = min([styler.block.styling_adv.count_adv, styler.block.default_adv.count_adv])
                    campaigns_result = await  self.request.app.query.get_campaigns(pool=pool, block_id=block_id,
                                                                                   block_domain=block_domain,
                                                                                   block_account=block_account,
                                                                                   country=country,
                                                                                   city=city,
                                                                                   device=device,
                                                                                   cost=cost,
                                                                                   gender=gender,
                                                                                   capacity=capacity
                                                                                   )
                    for campaign in campaigns_result:
                        if campaign['style_type'] not in ['default', 'Block', 'RetBlock', 'RecBlock']:
                            styler.add(str(campaign['id']), 'Style_1')
                        if campaign['social'] and social_branch:
                            result['campaigns'].append(campaign)
                        elif not campaign['social'] and not campaign['retargeting'] and place_branch:
                            result['campaigns'].append(campaign)
                        elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'offer' and retargeting_branch:
                            if campaign['account'] in retargeting:
                                result['campaigns'].append(campaign)
                        elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'account' and retargeting_account_branch:
                            if campaign['account'] in retargeting:
                                result['campaigns'].append(campaign)
                    result['css'] = await styler()
                    result['block']['id'] = block_result.get('id', 0)
                    result['block']['guid'] = block_result.get('guid', '')
                    result['block']['headerHtml'] = block_result.get('headerHtml', '')
                    result['block']['footerHtml'] = block_result.get('footerHtml', '')
                    result['block']['capacity'] = styler.block.default_adv.count_adv
                    result['block']['capacity_styling'] = styler.block.styling_adv.count_adv
                    result['block']['blinking'] = block_result.get('blinking', 0)
                    result['block']['blinking_reload'] = block_result.get('blinking_reload', False)
                    result['block']['shake'] = block_result.get('shake', 0)
                    result['block']['shake_mouse'] = block_result.get('shake_mouse',  False)
                    result['block']['shake_reload'] = block_result.get('shake_reload', False)
                    result['block']['html_notification'] = block_result.get('html_notification', True)
                    result['block']['button'] = styler.block.default_button.block
                    result['block']['ret_button'] = styler.block.default_button.ret_block
                    result['block']['rec_button'] = styler.block.default_button.rec_block
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request._message), data=data))
        return web.json_response(result, dumps=ujson.dumps)
