__all__ = ['DataProcessor']
from asyncio import ensure_future, gather
import ujson

from x_project_adv_worker.data_processor.params import Params
from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.styler import Styler


class DataProcessor(object):
    __slots__ = ['app', 'params', 'data', 'styler', 'block', 'campaigns', 'block_id', 'place_branch',
                 'retargeting_branch', 'retargeting_account_branch', 'social_branch', 'campaigns_place',
                 'offer_count_place', 'campaigns_socia', 'offer_count_socia', 'campaigns_retargeting_account',
                 'offer_count_retargeting_account', 'campaigns_retargeting_dynamic', 'offer_count_retargeting_dynamic',
                 'place_offer', 'social_offer', 'account_retargeting_offer', 'dynamic_retargeting_offer']

    def __init__(self, app, data):
        self.data = dict({
            'css': '',
            'block': {},
            'offers': {},
        })
        self.app = app
        self.params = Params(data)
        self.styler = Styler(self.params.width, self.params.height)
        self.block = None
        self.campaigns = None
        self.block_id = 0
        self.place_branch = True
        self.retargeting_branch = True
        self.retargeting_account_branch = True
        self.social_branch = True
        self.campaigns_place = list()
        self.offer_count_place = 0
        self.campaigns_socia = list()
        self.offer_count_socia = 0
        self.campaigns_retargeting_account = list()
        self.offer_count_retargeting_account = 0
        self.campaigns_retargeting_dynamic = list()
        self.offer_count_retargeting_dynamic = 0
        self.place_offer = list()
        self.social_offer = list()
        self.account_retargeting_offer = list()
        self.dynamic_retargeting_offer = list()

    async def find_block(self):
        tasks = []
        block_cache = self.app.block_cache.get(self.params.block_src)
        if block_cache:
            block_id, block_domain, block_account, block_width, block_height = block_cache

            tasks.append(ensure_future(self.app.query.get_block(block_src=self.params.block_src)))

            tasks.append(ensure_future(self.app.query.get_campaigns(block_id=block_id,
                                                                    block_domain=block_domain,
                                                                    block_account=block_account,
                                                                    country=self.params.country,
                                                                    region=self.params.region,
                                                                    device=self.params.device,
                                                                    cost=self.params.cost,
                                                                    gender=self.params.gender,
                                                                    capacity=self.styler.min_capacity
                                                                    )))
            self.block, self.campaigns = await gather(*tasks)
            if not self.block:
                # TODO logic for not found block
                pass
            block_id = self.block.get('id', 0)
            block_domain = self.block.get('domain', 0)
            block_account = self.block.get('account', 0)
            # TODO add width, height in db
            block_width = self.block.get('width')
            block_height = self.block.get('height')
        else:
            self.block = await self.app.query.get_block(block_src=self.params.block_src)
            if not self.block:
                # TODO logic for not found block
                pass

            block_id = self.block.get('id', 0)
            block_domain = self.block.get('domain', 0)
            block_account = self.block.get('account', 0)
            # TODO add width, height in db
            block_width = self.block.get('width')
            block_height = self.block.get('height')

            self.campaigns = await  self.app.query.get_campaigns(block_id=block_id,
                                                                 block_domain=block_domain,
                                                                 block_account=block_account,
                                                                 country=self.params.country,
                                                                 region=self.params.region,
                                                                 device=self.params.device,
                                                                 cost=self.params.cost,
                                                                 gender=self.params.gender,
                                                                 capacity=self.styler.min_capacity
                                                                 )
        self.app.block_cache[self.params.block_src] = (block_id, block_domain, block_account, block_width, block_height)
        await self.block_processing()
        await self.campaigns_processing()

    async def block_processing(self):
        self.data['block']['id'] = self.block.get('id', 0)
        self.data['block']['guid'] = self.params.block_src
        self.block_id = self.block.get('id', 0)
        self.place_branch = self.block.get('place_branch', True)
        self.retargeting_branch = self.block.get('retargeting_branch', True)
        self.retargeting_account_branch = self.block.get('retargeting_branch', True)
        # TODO check in db
        self.social_branch = self.block.get('social_branch', True)
        if not self.params.auto and not self.block.get('dynamic', False):
            self.styler.merge(ujson.loads(self.block.get('ad_style')))

    async def campaigns_processing(self):
        for campaign in self.campaigns:
            if campaign['style_type'] not in ['default', 'Block', 'RetBlock', 'RecBlock']:
                self.styler.add(str(campaign['id']), campaign['style_type'])

            if campaign['social'] and self.social_branch:
                self.campaigns_socia.append((campaign['id'], campaign['offer_count']))
                self.offer_count_socia += campaign['offer_count']

            elif not campaign['social'] and not campaign['retargeting'] and self.place_branch:
                self.campaigns_place.append((campaign['id'], campaign['offer_count']))
                self.offer_count_place += campaign['offer_count']

            elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'offer' and self.retargeting_branch:
                if campaign['account'] in self.params.retargeting:
                    self.campaigns_retargeting_dynamic.append((campaign['id'], campaign['offer_count']))
                    self.offer_count_retargeting_dynamic += campaign['offer_count']

            elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'account' and self.retargeting_account_branch:
                if campaign['account'] in self.params.retargeting:
                    self.campaigns_retargeting_account.append((campaign['id'], campaign['offer_count']))
                    self.offer_count_retargeting_account += campaign['offer_count']

        self.data['css'] = await self.styler()

        #
        # tasks_result = await self.find_offers(campaigns_place, campaigns_socia, campaigns_retargeting_account,
        #                                       campaigns_retargeting_dynamic, block_id, capacity, index,
        #                                       offer_count_place, exclude, offer_count_socia,
        #                                       offer_count_retargeting_account, retargeting_account_exclude,
        #                                       offer_count_retargeting_dynamic, retargeting_dynamic_exclude,
        #                                       raw_retargeting)
        #
        pass

    async def find_offers(self):

        tasks = list()

        tasks.append(ensure_future(self.app.query.get_place_offer(
            block_id=self.block_id,
            campaigns=self.campaigns_place,
            capacity=self.styler.max_capacity,
            index=self.params.index,
            offer_count=self.offer_count_place,
            exclude=self.params.exclude)))

        tasks.append(ensure_future(self.app.query.get_social_offer(
            block_id=self.block_id,
            campaigns=self.campaigns_socia,
            capacity=self.styler.max_capacity,
            index=self.params.index,
            offer_count=self.offer_count_socia,
            exclude=self.params.exclude)))

        tasks.append(ensure_future(self.app.query.get_account_retargeting_offer(
            block_id=self.block_id,
            campaigns=self.campaigns_retargeting_account,
            capacity=self.styler.max_capacity,
            index=self.params.index,
            offer_count=self.offer_count_retargeting_account,
            exclude=self.params.retargeting_account_exclude)))

        tasks.append(ensure_future(self.app.query.get_dynamic_retargeting_offer(
            block_id=self.block_id,
            campaigns=self.campaigns_retargeting_dynamic,
            capacity=self.styler.max_capacity,
            index=self.params.index,
            offer_count=self.offer_count_retargeting_dynamic,
            exclude=self.params.retargeting_dynamic_exclude,
            raw_retargeting=self.params.raw_retargeting)))

        self.place_offer, self.social_offer, self.account_retargeting_offer, self.dynamic_retargeting_offer = await gather(*tasks)
        await self.union_offers()

    async def union_offers(self):
        self.data['offers'] = self.place_offer[0]

    async def __call__(self):
        await self.find_block()
        await self.find_offers()
        return self.data
