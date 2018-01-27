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

                capacity = data.get('capacity', 5)
                index = data.get('index', 0)
                offer_count = data.get('offer_count', 0)
                campaigns = data.get('campaigns', [])
                exclude = data.get('exclude', [])
                campaigns.append([0, 0])
                exclude.append(0)

                capacity = data.get('capacity', 5)
                index = data.get('index', 0)
                offer_count = data.get('offer_count', 0)
                campaigns = data.get('campaigns', [])
                exclude = data.get('exclude', [])
                campaigns.append([0, 0])
                exclude.append(0)

                capacity = data.get('capacity', 5)
                index = data.get('index', 0)
                offer_count = data.get('offer_count', 0)
                campaigns = data.get('campaigns', [])
                exclude = data.get('exclude', [])
                campaigns.append([0, 0])
                exclude.append(0)

                capacity = data.get('capacity', 5)
                index = data.get('index', 0)
                offer_count = data.get('offer_count', 0)
                campaigns = data.get('campaigns', [])
                exclude = data.get('exclude', [])
                raw_retargeting = data.get('retargeting', [])
                campaigns.append([0, 0])
                exclude.append(0)

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

                if not auto and not block_result.get('dynamic', False):
                    styler.merge(ujson.loads(block_result.get('ad_style')))

                for campaign in campaigns_result:
                    if campaign['style_type'] not in ['default', 'Block', 'RetBlock', 'RecBlock']:
                        styler.add(str(campaign['id']), campaign['style_type'])

                    if campaign['social'] and social_branch:
                        result['campaigns'].append(campaign)
                    elif not campaign['social'] and not campaign['retargeting'] and place_branch:
                        result['campaigns'].append(campaign)
                    elif not campaign['social'] and campaign['retargeting'] and campaign[
                        'retargeting_type'] == 'offer' and retargeting_branch:
                        if campaign['account'] in retargeting:
                            result['campaigns'].append(campaign)
                    elif not campaign['social'] and campaign['retargeting'] and campaign[
                        'retargeting_type'] == 'account' and retargeting_account_branch:
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
                result['block']['shake_mouse'] = block_result.get('shake_mouse', False)
                result['block']['shake_reload'] = block_result.get('shake_reload', False)
                result['block']['html_notification'] = block_result.get('html_notification', True)
                result['block']['button'] = styler.block.default_button.block
                result['block']['ret_button'] = styler.block.default_button.ret_block
                result['block']['rec_button'] = styler.block.default_button.rec_block

                result['place']['offers'], result['place']['clean'] = await self.request.app.query.get_place_offer(
                    block_id=block_id,
                    campaigns=campaigns,
                    capacity=capacity,
                    index=index,
                    offer_count=offer_count,
                    exclude=exclude)

                result['social']['offers'], result['social']['clean'] = await  self.request.app.query.get_social_offer(
                    block_id=block_id,
                    campaigns=campaigns,
                    capacity=capacity,
                    index=index,
                    offer_count=offer_count,
                    exclude=exclude)

                result['account_retargeting']['offers'], result['account_retargeting']['clean'] = await self.request.app.query.get_account_retargeting_offer(
                    block_id=block_id,
                    campaigns=campaigns,
                    capacity=capacity,
                    index=index,
                    offer_count=offer_count,
                    exclude=exclude)

                result['dynamic_retargeting']['offers'], result['dynamic_retargeting']['clean'] = await  self.request.app.query.get_dynamic_retargeting_offer(
                    block_id=block_id,
                    campaigns=campaigns,
                    capacity=capacity,
                    index=index,
                    offer_count=offer_count,
                    exclude=exclude,
                    raw_retargeting=raw_retargeting)

        except asyncio.CancelledError as ex:
            logger.error(exception_message(time=time.time() - self.request.start_time, exc=str(ex),
                                           request=str(self.request.message), data=data))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request.message), data=data))
        return web.json_response(result, dumps=ujson.dumps)
