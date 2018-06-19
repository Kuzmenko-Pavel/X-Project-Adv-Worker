__all__ = ['DataProcessor']
import ujson
from asyncio import ensure_future, gather

from x_project_adv_worker.data_processor.params import Params
from x_project_adv_worker.styler import Styler


class DataProcessor(object):
    __slots__ = ['app', 'params', 'data', 'styler', 'block', 'campaigns', 'block_id', 'place_branch',
                 'retargeting_branch', 'retargeting_account_branch', 'social_branch', 'campaigns_place',
                 'offer_count_place', 'campaigns_socia', 'offer_count_socia', 'campaigns_retargeting_account',
                 'offer_count_retargeting_account', 'campaigns_retargeting_dynamic', 'offer_count_retargeting_dynamic',
                 'styling', 'brending', 'block_button', 'block_ret_button', 'block_rec_button']

    def __init__(self, app, data):
        self.data = dict({
            'css': '',
            'block': dict(),
            'offers': list(),
            'clean': {'place': False, 'account_retargeting': False, 'dynamic_retargeting': False}
        })
        self.app = app
        self.params = Params(data)
        self.styler = Styler(self.params.width, self.params.height)
        self.block = dict()
        self.campaigns = dict()
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
        self.styling = None
        self.brending = None
        self.block_button = ''
        self.block_ret_button = ''
        self.block_rec_button = ''

    async def find_block(self):
        tasks = []
        block_cache = self.app.block_cache.get(self.params.block_id)
        if block_cache:
            block_id, block_domain, block_account, block_width, block_height = block_cache

            tasks.append(ensure_future(self.app.query.get_block(block_src=self.params.block_id)))

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
            block, campaigns = await gather(*tasks)
            if not block:
                del self.app.block_cache[self.params.block_id]
                return False
            block_id = block.get('id', 0)
            block_domain = block.get('domain', 0)
            block_account = block.get('account', 0)
            # TODO add width, height in db
            block_width = block.get('width')
            block_height = block.get('height')
        else:
            block = await self.app.query.get_block(block_src=self.params.block_id)
            if not block:
                return False

            block_id = block.get('id', 0)
            block_domain = block.get('domain', 0)
            block_account = block.get('account', 0)
            # TODO add width, height in db
            block_width = block.get('width')
            block_height = block.get('height')

            campaigns = await  self.app.query.get_campaigns(block_id=block_id,
                                                            block_domain=block_domain,
                                                            block_account=block_account,
                                                            country=self.params.country,
                                                            region=self.params.region,
                                                            device=self.params.device,
                                                            cost=self.params.cost,
                                                            gender=self.params.gender,
                                                            capacity=self.styler.min_capacity
                                                            )
        self.app.block_cache[self.params.block_id] = (block_id, block_domain, block_account, block_width, block_height)
        await self.block_processing(block)
        await self.campaigns_processing(campaigns)
        return True

    async def block_processing(self, block):
        self.data['block']['id'] = block.get('id', 0)
        self.data['block']['guid'] = self.params.block_id
        self.data['block']['headerHtml'] = block.get('headerHtml', '')
        self.data['block']['footerHtml'] = block.get('footerHtml', '')
        self.block_id = block.get('id', 0)
        self.place_branch = block.get('place_branch', True)
        self.retargeting_branch = block.get('retargeting_branch', True)
        self.retargeting_account_branch = block.get('retargeting_branch', True)
        # TODO check in db
        self.social_branch = block.get('social_branch', True)
        if not self.params.auto and not block.get('dynamic', False):
            self.styler.merge(ujson.loads(block.get('ad_style')))
        self.block_button = self.styler.block.default_button.block
        self.block_ret_button = self.styler.block.default_button.ret_block
        self.block_rec_button = self.styler.block.default_button.rec_block

    async def campaigns_processing(self, campaigns):
        for campaign in campaigns:
            self.campaigns[campaign['id']] = campaign
            # if campaign['style_type'] not in ['default', 'Block', 'RetBlock', 'RecBlock']:
            #     self.styler.add(str(campaign['id']), campaign['style_type'])

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

        place_offer, social_offer, account_retargeting_offer, dynamic_retargeting_offer = await gather(*tasks)
        await self.union_offers(place_offer, social_offer, account_retargeting_offer, dynamic_retargeting_offer)

    async def find_recomendet(self):
        await self.app.query.get_recomendet_offer(
                offer_ids=[1],
                capacity=self.styler.max_capacity,
                exclude=self.params.exclude)

    async def union_offers(self, place_offer, social_offer, account_retargeting_offer, dynamic_retargeting_offer):
        self.data['clean']['place'] = place_offer[1]
        self.data['clean']['place'] = social_offer[1]
        self.data['clean']['account_retargeting'] = account_retargeting_offer[1]
        self.data['clean']['dynamic_retargeting'] = dynamic_retargeting_offer[1]
        for result in [dynamic_retargeting_offer, account_retargeting_offer, place_offer, social_offer]:
            for offer in result[0]:
                camp = self.campaigns.get(offer['id_cam'])
                offer['campaign'] = camp
                await self.create_offer(offer)

    def change_image(self, images):
        return images

    def change_link(self, offer):
        return ''

    async def create_offer(self, offer, recomendet=None):
        # TODO Нахер переделать, херня полная
        data_offers_len = len(self.data['offers'])
        offer_styling = offer['campaign']['styling']
        offer_brending = offer['campaign']['brending']
        if self.styling:
            if data_offers_len >= self.styler.block.styling_adv.count_adv:
                return
            elif data_offers_len == (self.styler.block.styling_adv.count_adv - 1) and offer['campaign']['style_data']:
                self.data['offers'].append({
                    'title': offer['campaign']['style_data']['head_title'],
                    'description': None,
                    'price': None,
                    'url': self.change_link(offer),
                    'images': [offer['campaign']['style_data']['img']],
                    'style_class': 'logo' + offer['campaign']['style_class'],
                    'id': None,
                    'guid': None,
                    'id_cam': None,
                    'guid_cam': None,
                    'token': None,
                    'button': offer['campaign']['style_data']['button_title']
                })
                return
        else:
            if data_offers_len >= self.styler.block.default_adv.count_adv:
                return
        if offer_styling:
            if self.styling is None or self.styling == offer['id_cam']:
                self.styling = offer['id_cam']
            else:
                return
        else:
            if self.styling is None:
                self.styling = False

        if offer_brending:
            if self.brending is None or self.brending == offer['id_cam']:
                self.brending = offer['id_cam']
            else:
                return
        else:
            if self.brending is None:
                self.brending = False

        style_class = offer['campaign']['style_class']
        button = self.block_button
        branch = 'NL30'
        if offer['campaign']['retargeting']:
            button = self.block_ret_button
            branch = 'NL31'
        if recomendet:
            style_class = offer['campaign']['style_class_recommendet']
            button = self.block_rec_button
            branch = 'NL32'

        self.data['offers'].append({
            'title': offer['title'],
            'description': offer['description'],
            'price': offer['price'],
            'url': self.change_link(offer['url']),
            'images': self.change_image(offer['images']),
            'style_class': 'adv' + style_class,
            'id': str(offer['id']),
            'guid': offer['guid'],
            'id_cam': str(offer['id_cam']),
            'guid_cam': offer['campaign']['guid'],
            'campaign_social': offer['campaign']['social'],
            'retargeting': offer['campaign']['retargeting'],
            'unique_impression_lot': offer['campaign']['unique_impression_lot'],
            'token': offer['token'],
            'branch': branch,
            'button': button
        })
        if offer['campaign']['style_type'] not in ['default', 'Block', 'RetBlock', 'RecBlock']:
            self.styler.add(str(offer['campaign']['id']), offer['campaign']['style_type'])
        # if offer_styling:
        #     styling_item = offer.get('recommended', [])
        #     if len(styling_item) < self.styler.block.styling_adv.count_adv:
        #         styling_item = styling_item * 2
        #     for item in styling_item:
        #         item['id_cam'] = offer['id_cam']
        #         item['campaign'] = offer['campaign']
        #         await self.create_offer(item, True)
        #     if recomendet:
        #         if len(self.data['offers']) <= self.styler.block.styling_adv.count_adv:
        #             await self.create_offer(offer)
        # else:
        #     if offer_brending:
        #         brending_item = offer.get('recommended', [])
        #         recomendet_count = offer['campaign']['recomendet_count']
        #         day = 0
        #         if offer['campaign']['recomendet_type'] == 'min':
        #             if recomendet_count - day > 1:
        #                 recomendet_count = recomendet_count - day
        #             else:
        #                 recomendet_count = 1
        #         elif offer['campaign']['recomendet_type'] == 'max':
        #             if 1 + day < recomendet_count:
        #                 recomendet_count = 1 + day
        #         else:
        #             if recomendet_count < 1:
        #                 recomendet_count = 1
        #         for item in brending_item[:recomendet_count]:
        #             item['id_cam'] = offer['id_cam']
        #             item['campaign'] = offer['campaign']
        #             await self.create_offer(item, True)

    async def css(self):
        self.data['css'] = await self.styler.calculate()

    async def __call__(self):
        if await self.find_block():
            await self.find_offers()
            await gather(ensure_future(self.find_recomendet()), ensure_future(self.css()))
        return self.data
