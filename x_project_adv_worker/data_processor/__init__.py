__all__ = ['DataProcessor']
import ujson
import base64
import time
import random
from asyncio import ensure_future, gather

from x_project_adv_worker.data_processor.params import Params
from x_project_adv_worker.styler import Styler


class DataProcessor(object):
    __slots__ = ['app', 'params', 'data', 'styler', 'block', 'campaigns', 'block_id', 'place_branch',
                 'retargeting_branch', 'retargeting_account_branch', 'social_branch', 'campaigns_place',
                 'offer_count_place', 'campaigns_socia', 'offer_count_socia', 'campaigns_retargeting_account',
                 'offer_count_retargeting_account', 'campaigns_retargeting_dynamic', 'offer_count_retargeting_dynamic',
                 'block_button', 'block_ret_button', 'block_rec_button']

    def __init__(self, request, data):
        self.data = dict({
            'css': '',
            'block': dict(),
            'offers': list(),
            'clean': {'place': None, 'social': None, 'account_retargeting': None, 'dynamic_retargeting': None},
            'parther': False
        })
        self.app = request.app
        self.params = Params(request, data)
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
        self.block_button = ''
        self.block_ret_button = ''
        self.block_rec_button = ''

    async def get_userCode(self):
        block = await self.app.query.get_block(block_src=self.params.block_id)
        userCode = ''
        if block:
            userCode = block.get('userCode', '')
        if not userCode:
            userCode = '''
            <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            <!-- инвистигейшин -->
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="ca-pub-7005100774217586"
                 data-ad-slot="3052658814"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
            <script>
            (adsbygoogle = window.adsbygoogle || []).push({});
            </script>
            '''
        return userCode

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
            if not block or block.get('blocked', False):
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
            if not block or block.get('blocked', False):
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
        self.data['block']['header_html'] = block.get('headerHtml', '')
        self.data['block']['footer_html'] = block.get('footerHtml', '')
        self.block_id = block.get('id', 0)
        self.place_branch = block.get('place_branch', True)
        self.retargeting_branch = block.get('retargeting_branch', True)
        self.retargeting_account_branch = block.get('retargeting_branch', True)
        # TODO check in db retargeting_account_branch = retargeting_branch
        self.social_branch = block.get('social_branch', True)
        self.data['parther'] = not self.social_branch
        if not self.params.auto and not block.get('dynamic', False):
            self.styler.merge(ujson.loads(block.get('ad_style')))
        self.block_button = self.styler.block.default_button.block
        self.block_ret_button = self.styler.block.default_button.ret_block
        self.block_rec_button = self.styler.block.default_button.rec_block

    async def campaigns_processing(self, campaigns):
        for campaign in campaigns:
            self.campaigns[campaign['id']] = campaign

            if campaign['social'] and self.social_branch:
                self.campaigns_socia.append((campaign['id'], campaign['offer_by_campaign_unique']))
                self.offer_count_socia += campaign['offer_count']

            elif not campaign['social'] and not campaign['retargeting'] and self.place_branch:
                self.campaigns_place.append((campaign['id'], campaign['offer_by_campaign_unique']))
                self.offer_count_place += campaign['offer_count']

            elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'offer' and self.retargeting_branch:
                if campaign['account'] in self.params.retargeting:
                    self.campaigns_retargeting_dynamic.append((campaign['id'], campaign['offer_by_campaign_unique']))
                    self.offer_count_retargeting_dynamic += campaign['offer_count']

            elif not campaign['social'] and campaign['retargeting'] and campaign['retargeting_type'] == 'account' and self.retargeting_account_branch:
                if campaign['account'] in self.params.retargeting:
                    self.campaigns_retargeting_account.append((campaign['id'], campaign['offer_by_campaign_unique']))
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

    async def find_recomendet(self, offer, loop_counter, capacity):
        views = [('mv_offer_dynamic_retargeting', self.params.retargeting_dynamic_exclude),
                 ('mv_offer_account_retargeting', self.params.retargeting_account_exclude),
                 ('mv_offer_place', self.params.exclude),
                 ('mv_offer_social', self.params.exclude)
                 ]
        if len(views) < loop_counter:
            return
        view = views[loop_counter - 1][0]
        offer_ids = offer.get('recommended', [])
        offer_styling_block = offer['campaign']['styling']
        select_capacity = int(capacity - len(self.data['offers']))
        exclude = views[loop_counter - 1][1]
        if offer_styling_block:
            capacity = capacity - 1
        if select_capacity > 0:
            recomendet = await self.app.query.get_recomendet_offer(
                view=view,
                offer_ids=offer_ids,
                block_id=self.block_id,
                capacity=select_capacity)

            for x in range(int(capacity) + 1):
                if len(self.data['offers']) >= capacity:
                    break
                for recomendet_offer in recomendet:
                    if x == 0 and str(recomendet_offer['id']) in exclude:
                        continue
                    recomendet_offer['campaign'] = offer['campaign']
                    if len(self.data['offers']) < capacity:
                        await self.create_offer(recomendet_offer, True, capacity)
                    else:
                        break
                if not recomendet:
                    break

            for x in range(int(capacity) - len(self.data['offers'])):
                if len(self.data['offers']) < capacity:
                    await self.create_offer(offer, True, capacity)
                else:
                    break
        if offer_styling_block:
            await self.create_logo(offer)

    async def union_offers(self, place_offer, social_offer, account_retargeting_offer, dynamic_retargeting_offer):
        styling_block = None
        styling_predictive = False
        brending_block = None
        brending_predictive = False
        loop_break = False
        loop_counter = 0

        summary_offer = dynamic_retargeting_offer[0] + account_retargeting_offer[0] + place_offer[0]
        len_summary_offer = len(summary_offer)

        count_not_styling = sum(map(lambda x: 0 if self.campaigns.get(x['id_cam'], {}).get('styling', False) else 1,
                                    summary_offer))
        if count_not_styling < self.styler.default_capacity and count_not_styling < len_summary_offer:
            styling_predictive = True

        count_not_brending = sum(map(lambda x: 0 if self.campaigns.get(x['id_cam'], {}).get('brending', False) else 1,
                                     summary_offer))
        if count_not_brending < self.styler.default_capacity and count_not_brending < len_summary_offer:
            brending_predictive = True

        if not place_offer[1]:
            self.data['clean']['place'] = place_offer[1]
        if not social_offer[1]:
            self.data['clean']['social'] = social_offer[1]
        if not account_retargeting_offer[1]:
            self.data['clean']['account_retargeting'] = account_retargeting_offer[1]
        if not dynamic_retargeting_offer[1]:
            self.data['clean']['dynamic_retargeting'] = dynamic_retargeting_offer[1]

        views = [
            ('dynamic_retargeting', dynamic_retargeting_offer),
            ('account_retargeting', account_retargeting_offer),
            ('place', place_offer),
            ('social', social_offer)
        ]

        for name, result in views:
            loop_counter += 1
            if loop_break:
                break
            self.data['clean'][name] = result[1]
            for offer in result[0]:
                if loop_break:
                    break

                camp = self.campaigns.get(offer['id_cam'])
                offer_styling_block = camp['styling']
                offer_brending_block = camp['brending']
                if offer_styling_block:
                    if styling_block is None or styling_block == offer['id_cam']:
                        styling_block = offer['id_cam']
                    else:
                        continue
                else:
                    if styling_block or styling_predictive:
                        continue
                    elif styling_block is None:
                        styling_block = False

                if offer_brending_block:
                    if brending_block is None or brending_block == offer['id_cam']:
                        brending_block = offer['id_cam']
                    else:
                        continue
                else:
                    if brending_block or brending_predictive:
                        continue
                    elif brending_block is None:
                        brending_block = False

                if camp['style_type'] not in ['default', 'Block', 'RetBlock', 'RecBlock']:
                    self.styler.add(str(camp['id']), camp['style_type'])
                else:
                    self.styler.add(camp['style_class'], camp['style_class'])
                    if offer_brending_block:
                        self.styler.add(camp['style_class_recommendet'], camp['style_class_recommendet'])

                offer['campaign'] = camp

                if offer_styling_block:
                    capacity = self.styler.block.styling_adv.count_adv
                else:
                    capacity = self.styler.block.default_adv.count_adv

                await self.create_offer(offer, False, capacity)

                if offer_styling_block or offer_brending_block:
                    await self.find_recomendet(offer, loop_counter, capacity)

                if offer_styling_block and len(self.data['offers']) >= self.styler.block.styling_adv.count_adv:
                    loop_break = True
                elif not offer_styling_block and len(self.data['offers']) >= self.styler.block.default_adv.count_adv:
                    loop_break = True

        if styling_block:
            capacity = self.styler.block.styling_adv.count_adv
        else:
            capacity = self.styler.block.default_adv.count_adv

        if len(self.data['offers']) < capacity:
            if self.data['parther']:
                self.data['offers'].clear()
            else:
                for x in range(int(capacity) - len(self.data['offers'])):
                    if 0 < len(self.data['offers']) < capacity:
                        self.data['offers'].append(random.choice(self.data['offers']))
                    else:
                        break

    def change_image(self, images):
        if self.params.is_webp:
            images = list(map(lambda x: x.replace('.png', '.webp'), images))
        if len(images) == 2:
            images = images + images
        return images

    def change_link(self, offer):
        offer_url = offer['url']
        base64_url = base64.urlsafe_b64encode(str('id=%s\ninf=%s\ntoken=%s\nurl=%s\nrand=%s\ncamp=%s\ntr=%d' % (
            offer['guid'],
            self.params.block_id,
            offer['token'],
            offer_url,
            self.params.token,
            offer['campaign']['guid'],
            int(time.time()*1000)
        )).encode('utf-8'))
        return b'/click?' + base64_url

    async def create_logo(self, offer):
        if len(self.data['offers']) >= self.styler.styling_capacity:
            return
        self.data['offers'].append({
            'title': offer['campaign']['style_data']['head_title'],
            'description': None,
            'price': None,
            'url': self.change_link(offer),
            'images': [offer['campaign']['style_data']['img']],
            'style_class': 'logo%s' % offer['campaign']['style_class'],
            'id': None,
            'guid': None,
            'id_cam': None,
            'guid_cam': None,
            'campaign_social': None,
            'retargeting': None,
            'unique_impression_lot': None,
            'token': None,
            'branch': None,
            'button':  offer['campaign']['style_data']['button_title']
        })

    async def create_offer(self, offer, recomendet=False, capacity=0):
        if len(self.data['offers']) >= capacity:
            return
        style_class = offer['campaign']['style_class']
        button = self.block_button
        branch = 'NL30'
        unique_impression_lot = offer['campaign']['unique_impression_lot']
        if offer['campaign']['retargeting']:
            button = self.block_ret_button
            branch = 'NL31'
        if recomendet:
            style_class = offer['campaign']['style_class_recommendet']
            button = self.block_rec_button
            branch = 'NL32'
            unique_impression_lot = 1

        self.data['offers'].append({
            'title': offer['title'],
            'description': offer['description'],
            'price': offer['price'],
            'url': self.change_link(offer),
            'images': self.change_image(offer['images']),
            'style_class': 'adv%s' % style_class,
            'id': str(offer['id']),
            'guid': offer['guid'],
            'id_cam': str(offer['id_cam']),
            'guid_cam': offer['campaign']['guid'],
            'campaign_social': offer['campaign']['social'],
            'retargeting': offer['campaign']['retargeting'],
            'unique_impression_lot': unique_impression_lot,
            'token': offer['token'],
            'branch': branch,
            'button': button
        })

    async def css(self):
        self.data['css'] = await self.styler.calculate()

    async def __call__(self):
        if await self.find_block():
            await self.find_offers()
            await self.css()
        return self.data
