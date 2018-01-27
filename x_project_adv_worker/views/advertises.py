import asyncio
import time
import ujson

from aiohttp import web

from x_project_adv_worker.headers import *
from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.styler import Styler


class AdvertisesView(web.View):
    @xml_http_request()
    async def post(self):
        result = dict({
            'css': '',
            'campaigns': [],
            'block': {},
            'place': {'clean': False, 'offers': None},
            'social': {'clean': False, 'offers': None},
            'account_retargeting': {'clean': False, 'offers': None},
            'dynamic_retargeting': {'clean': False, 'offers': None}
        })
        data = {}
        try:
            data = await self.request.json(loads=ujson.loads)
            if isinstance(data, dict):
                block_src = data.get('block_id', '')
                auto = data.get('auto', False)
                country = data.get('country', 'NOT FOUND')
                region = data.get('region', 'NOT FOUND')
                device = data.get('device', '**')
                cost = data.get('cost', 0)
                gender = data.get('gender', 0)
                index = data.get('index', 0)
                exclude = data.get('exclude', [])
                exclude.append(0)
                retargeting_account_exclude = data.get('retargeting_account_exclude', [])
                retargeting_account_exclude.append(0)
                retargeting_dynamic_exclude = data.get('retargeting_dynamic_exclude', [])
                retargeting_dynamic_exclude.append(0)
                raw_retargeting = data.get('retargeting', [])
                retargeting = {}
                for ids in raw_retargeting:
                    if len(ids) >= 2:
                        retargeting[str(ids[1]).lower()] = ids[0]
                styler = Styler(data.get('w', 0), data.get('h', 0))
                capacity = min([styler.block.styling_adv.count_adv, styler.block.default_adv.count_adv])

                block_result = await self.request.app.query.get_block(block_src=block_src)
                if not block_result:
                    return web.json_response(result)

                block_id = block_result.get('id', 0)
                block_domain = block_result.get('domain', 0)
                block_account = block_result.get('account', 0)

                campaigns_result = await  self.request.app.query.get_campaigns(block_id=block_id,
                                                                               block_domain=block_domain,
                                                                               block_account=block_account,
                                                                               country=country,
                                                                               region=region,
                                                                               device=device,
                                                                               cost=cost,
                                                                               gender=gender,
                                                                               capacity=capacity
                                                                               )
                place_branch = block_result.get('place_branch', True)
                retargeting_branch = block_result.get('retargeting_branch', True)
                retargeting_account_branch = block_result.get('retargeting_branch', True)
                social_branch = block_result.get('account', True)

                campaigns_place = []
                offer_count_place = 0
                campaigns_socia = []
                offer_count_socia = 0
                campaigns_retargeting_account = []
                offer_count_retargeting_account = 0
                campaigns_retargeting_dynamic = []
                offer_count_retargeting_dynamic = 0

                if not auto and not block_result.get('dynamic', False):
                    styler.merge(ujson.loads(block_result.get('ad_style')))

                for campaign in campaigns_result:
                    if campaign['style_type'] not in ['default', 'Block', 'RetBlock', 'RecBlock']:
                        styler.add(str(campaign['id']), campaign['style_type'])

                    if campaign['social'] and social_branch:
                        result['campaigns'].append(campaign)
                        campaigns_socia.append((campaign['id'], campaign['offer_count']))
                        offer_count_socia += campaign['offer_count']

                    elif not campaign['social'] and not campaign['retargeting'] and place_branch:
                        result['campaigns'].append(campaign)
                        campaigns_place.append((campaign['id'], campaign['offer_count']))
                        offer_count_place += campaign['offer_count']

                    elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'offer' and retargeting_branch:
                        if campaign['account'] in retargeting:
                            result['campaigns'].append(campaign)
                            campaigns_retargeting_dynamic.append((campaign['id'], campaign['offer_count']))
                            offer_count_retargeting_dynamic += campaign['offer_count']

                    elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'account' and retargeting_account_branch:
                        if campaign['account'] in retargeting:
                            result['campaigns'].append(campaign)
                            campaigns_retargeting_account.append((campaign['id'], campaign['offer_count']))
                            offer_count_retargeting_account += campaign['offer_count']

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
                result['block']['shake_mouse'] = block_result.get('shake_mouse', False)
                result['block']['shake_reload'] = block_result.get('shake_reload', False)
                result['block']['html_notification'] = block_result.get('html_notification', True)
                result['block']['button'] = styler.block.default_button.block
                result['block']['ret_button'] = styler.block.default_button.ret_block
                result['block']['rec_button'] = styler.block.default_button.rec_block

                if campaigns_place:
                    result['place']['offers'], result['place']['clean'] = await self.request.app.query.get_place_offer(
                        block_id=block_id,
                        campaigns=campaigns_place,
                        capacity=capacity,
                        index=index,
                        offer_count=offer_count_place,
                        exclude=exclude)

                if campaigns_socia:
                    result['social']['offers'], result['social']['clean'] = await  self.request.app.query.get_social_offer(
                        block_id=block_id,
                        campaigns=campaigns_socia,
                        capacity=capacity,
                        index=index,
                        offer_count=offer_count_socia,
                        exclude=exclude)

                if campaigns_retargeting_account:
                    result['account_retargeting']['offers'], result['account_retargeting']['clean'] = await self.request.app.query.get_account_retargeting_offer(
                        block_id=block_id,
                        campaigns=campaigns_retargeting_account,
                        capacity=capacity,
                        index=index,
                        offer_count=offer_count_retargeting_account,
                        exclude=retargeting_account_exclude)

                if campaigns_retargeting_dynamic:
                    result['dynamic_retargeting']['offers'], result['dynamic_retargeting']['clean'] = await  self.request.app.query.get_dynamic_retargeting_offer(
                        block_id=block_id,
                        campaigns=campaigns_retargeting_dynamic,
                        capacity=capacity,
                        index=index,
                        offer_count=offer_count_retargeting_dynamic,
                        exclude=retargeting_dynamic_exclude,
                        raw_retargeting=raw_retargeting)

        except asyncio.CancelledError as ex:
            logger.error(exception_message(time=time.time() - self.request.start_time, exc=str(ex),
                                           request=str(self.request.message), data=data))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request.message), data=data))
        return web.json_response(result, dumps=ujson.dumps)
