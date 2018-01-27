import asyncio
import time
import ujson
import aiohttp_jinja2

from aiohttp import web

from x_project_adv_worker.headers import *
from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.styler import Styler


class AdvertisesView(web.View):
    async def find_block(self, block_src, country, region, device, cost, gender, capacity):
        tasks = []
        block_cache = self.request.app.block_cache.get(block_src)
        if block_cache:
            block_id, block_domain, block_account = block_cache

            tasks.append(asyncio.ensure_future(self.request.app.query.get_block(block_src=block_src)))

            tasks.append(asyncio.ensure_future(self.request.app.query.get_campaigns(block_id=block_id,
                                                                                    block_domain=block_domain,
                                                                                    block_account=block_account,
                                                                                    country=country,
                                                                                    region=region,
                                                                                    device=device,
                                                                                    cost=cost,
                                                                                    gender=gender,
                                                                                    capacity=capacity
                                                                                    )))
            block_result, campaigns_result = await asyncio.gather(*tasks)
            if not block_result:
                return None, None
            block_id = block_result.get('id', 0)
            block_domain = block_result.get('domain', 0)
            block_account = block_result.get('account', 0)
        else:
            block_result = await self.request.app.query.get_block(block_src=block_src)
            if not block_result:
                return None, None

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
        self.request.app.block_cache[block_src] = (block_id, block_domain, block_account)
        return block_result, campaigns_result

    async def find_offers(self, campaigns_place, campaigns_socia, campaigns_retargeting_account,
                          campaigns_retargeting_dynamic, block_id, capacity, index, offer_count_place,
                          exclude, offer_count_socia, offer_count_retargeting_account, retargeting_account_exclude,
                          offer_count_retargeting_dynamic, retargeting_dynamic_exclude, raw_retargeting):
        tasks = []
        if campaigns_place:
            tasks.append(asyncio.ensure_future(self.request.app.query.get_place_offer(
                block_id=block_id,
                campaigns=campaigns_place,
                capacity=capacity,
                index=index,
                offer_count=offer_count_place,
                exclude=exclude)))
        else:
            tasks.append(asyncio.ensure_future(self.request.app.query.get_empty_offer()))

        if campaigns_socia:
            tasks.append(asyncio.ensure_future(self.request.app.query.get_social_offer(
                block_id=block_id,
                campaigns=campaigns_socia,
                capacity=capacity,
                index=index,
                offer_count=offer_count_socia,
                exclude=exclude)))
        else:
            tasks.append(asyncio.ensure_future(self.request.app.query.get_empty_offer()))

        if campaigns_retargeting_account:
            tasks.append(asyncio.ensure_future(self.request.app.query.get_account_retargeting_offer(
                block_id=block_id,
                campaigns=campaigns_retargeting_account,
                capacity=capacity,
                index=index,
                offer_count=offer_count_retargeting_account,
                exclude=retargeting_account_exclude)))
        else:
            tasks.append(asyncio.ensure_future(self.request.app.query.get_empty_offer()))

        if campaigns_retargeting_dynamic:
            tasks.append(asyncio.ensure_future(self.request.app.query.get_dynamic_retargeting_offer(
                block_id=block_id,
                campaigns=campaigns_retargeting_dynamic,
                capacity=capacity,
                index=index,
                offer_count=offer_count_retargeting_dynamic,
                exclude=retargeting_dynamic_exclude,
                raw_retargeting=raw_retargeting)))
        else:
            tasks.append(asyncio.ensure_future(self.request.app.query.get_empty_offer()))
        return await asyncio.gather(*tasks)

    @xml_http_request()
    async def post(self):
        result = dict({
            'css': '',
            'html': '',
            'block': {},
            'offers': {},
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

                block_result, campaigns_result = await self.find_block(block_src, country, region, device, cost, gender, capacity)
                if not block_result:
                    return web.json_response(result)

                block_id = block_result.get('id', 0)
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
                        campaigns_socia.append((campaign['id'], campaign['offer_count']))
                        offer_count_socia += campaign['offer_count']

                    elif not campaign['social'] and not campaign['retargeting'] and place_branch:
                        campaigns_place.append((campaign['id'], campaign['offer_count']))
                        offer_count_place += campaign['offer_count']

                    elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'offer' and retargeting_branch:
                        if campaign['account'] in retargeting:
                            campaigns_retargeting_dynamic.append((campaign['id'], campaign['offer_count']))
                            offer_count_retargeting_dynamic += campaign['offer_count']

                    elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'account' and retargeting_account_branch:
                        if campaign['account'] in retargeting:
                            campaigns_retargeting_account.append((campaign['id'], campaign['offer_count']))
                            offer_count_retargeting_account += campaign['offer_count']

                result['css'] = await styler()
                result['block']['id'] = block_result.get('id', 0)
                result['block']['guid'] = block_result.get('guid', '')

                tasks_result = await self.find_offers(campaigns_place, campaigns_socia, campaigns_retargeting_account,
                                                      campaigns_retargeting_dynamic, block_id, capacity, index,
                                                      offer_count_place, exclude, offer_count_socia,
                                                      offer_count_retargeting_account, retargeting_account_exclude,
                                                      offer_count_retargeting_dynamic, retargeting_dynamic_exclude,
                                                      raw_retargeting)

                result['html'] = aiohttp_jinja2.render_string('advertises.html', self.request, {})
        except asyncio.CancelledError as ex:
            logger.error(exception_message(time=time.time() - self.request.start_time, exc=str(ex),
                                           request=str(self.request.message), data=data))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), request=str(self.request.message), data=data))

        return web.json_response(result, dumps=ujson.dumps)
