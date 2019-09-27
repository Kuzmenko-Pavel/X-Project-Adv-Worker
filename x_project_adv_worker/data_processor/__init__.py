__all__ = ['DataProcessor']
import ujson
import base64
import time
from random import randint, choice
from asyncio import ensure_future, gather
from itertools import zip_longest
from collections import defaultdict

from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.data_processor.params import Params
from x_project_adv_worker.styler import Styler
from x_project_adv_worker.choiceTypes import (CampaignType, CampaignPaymentModel, CampaignStylingType,
                                              CampaignRemarketingType, CampaignRecommendedAlgorithmType)

parther_disable_hosts = ('95.69.249.86', '31.202.102.69', '46.96.41.87', '178.150.140.80', '178.151.44.122',
                         '178.133.46.212', '193.70.46.140', '217.20.169.197', '85.90.199.33', '82.207.109.122',
                         '194.6.232.174', '217.112.216.74', '194.6.233.163', '159.224.41.1', '79.171.124.172',
                         '93.76.209.138', '85.90.202.248', '82.117.232.89', '82.117.233.83', '77.111.244',
                         '77.111.245', '77.111.246', '77.111.247')


class DataProcessor(object):
    __slots__ = ['app', 'params', 'data', 'styler', 'block', 'campaigns', 'block_id', 'place_branch',
                 'retargeting_branch', 'retargeting_account_branch', 'social_branch', 'campaigns_place',
                 'offer_count_place', 'campaigns_socia', 'offer_count_socia', 'campaigns_retargeting_account',
                 'offer_count_retargeting_account', 'campaigns_retargeting_dynamic', 'offer_count_retargeting_dynamic',
                 'block_button', 'block_ret_button', 'block_rec_button', 'block_rating_division',
                 'rating_hard_limit', 'campaigns_thematic', 'offer_count_thematic']

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
        self.block_rating_division = 1000
        self.rating_hard_limit = False
        self.place_branch = True
        self.retargeting_branch = True
        self.retargeting_account_branch = True
        self.social_branch = True
        self.campaigns_place = list()
        self.offer_count_place = 0
        self.campaigns_thematic = list()
        self.offer_count_thematic = 0
        self.campaigns_socia = list()
        self.offer_count_socia = 0
        self.campaigns_retargeting_account = list()
        self.offer_count_retargeting_account = 0
        self.campaigns_retargeting_dynamic = list()
        self.offer_count_retargeting_dynamic = 0
        self.block_button = ''
        self.block_ret_button = ''
        self.block_rec_button = ''

    def cat_to_int_range(self, cat):
        start = 0
        end = 0
        try:
            if len(cat) > 0:
                max_size = 1024
                cats = [int(x) for x in cat.split('.')][:6]
                cats = [i if i else j for i, j in zip_longest(cats, [None, None, None, None, None, None], fillvalue=0)]
                start_cats = cats[::]
                end_cats = cats[::]
                if cats[-1] is None:
                    l = len(cats)
                    for x, y in enumerate(reversed(cats)):
                        if y is None:
                            start_cats[l - (x + 1)] = 1
                            end_cats[l - (x + 1)] = max_size
                        else:
                            break
                start = sum([y * (max_size ** x) for x, y in enumerate(reversed(start_cats))])
                end = sum([y * (max_size ** x) for x, y in enumerate(reversed(end_cats))])
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), cat=str(cat)))
        return start, end

    def range_overlap(self, r1, r2):
        start1, end1 = r1
        start2, end2 = r2
        """Does the range (start1, end1) overlap with (start2, end2)?"""
        return end1 >= start2 and end2 >= start1

    def thematics_intersection(self, thematics):
        u_thematics_range = [self.cat_to_int_range(x) for x in self.params.thematics]
        if u_thematics_range:
            c_thematics_range = [self.cat_to_int_range(x) for x in thematics]
            if c_thematics_range:
                return any([self.range_overlap(r1, r2) for r1 in u_thematics_range for r2 in c_thematics_range])
        return False

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
        block_id = self.app.block_cache.get(self.params.block_id)
        if block_id:

            tasks.append(ensure_future(self.app.query.get_block(block_src=self.params.block_id)))

            tasks.append(ensure_future(self.app.query.get_campaigns(block_id=block_id,
                                                                    country=self.params.country,
                                                                    region=self.params.region,
                                                                    device=self.params.device,
                                                                    capacity=self.styler.min_capacity
                                                                    )))
            block, campaigns = await gather(*tasks)
            if not block:
                try:
                    del self.app.block_cache[self.params.block_id]
                except Exception:
                    pass
                return False
            block_id = block.get('id', 0)
        else:
            block = await self.app.query.get_block(block_src=self.params.block_id)
            if not block:
                return False

            block_id = block.get('id', 0)

            campaigns = await  self.app.query.get_campaigns(block_id=block_id,
                                                            country=self.params.country,
                                                            region=self.params.region,
                                                            device=self.params.device,
                                                            capacity=self.styler.min_capacity
                                                            )
        self.app.block_cache[self.params.block_id] = block_id
        await self.block_processing(block)
        await self.campaigns_processing(campaigns)
        return True

    async def block_processing(self, block):
        self.data['block']['id'] = str(block.get('id', 0))
        self.data['block']['ida'] = str(block.get('id_account', 0))
        self.data['block']['ids'] = str(block.get('id_site', 0))
        self.data['block']['guid'] = self.params.block_id
        self.data['block']['header_html'] = block.get('headerHtml', '')
        self.data['block']['footer_html'] = block.get('footerHtml', '')
        self.block_id = block.get('id', 0)
        self.block = block
        self.block_rating_division = block.get('rating_division', 1000)
        self.rating_hard_limit = block.get('rating_hard_limit', False)
        self.place_branch = block.get('place_branch', True)
        self.retargeting_branch = block.get('retargeting_branch', True)
        self.retargeting_account_branch = block.get('retargeting_branch', True)
        # TODO check in db retargeting_account_branch = retargeting_branch
        self.social_branch = block.get('social_branch', True)
        self.data['parther'] = not self.social_branch
        if self.data['parther']:
            try:
                if self.params.test or any(
                        [parther_disable in self.params.host for parther_disable in parther_disable_hosts]):
                    self.social_branch = True
                    self.data['parther'] = False
            except Exception as e:
                print(e)
                self.social_branch = True
                self.data['parther'] = False
        if not self.params.auto and not block.get('dynamic', False):
            self.styler.merge(ujson.loads(block.get('ad_style')))
        self.block_button = self.styler.block.default_button.block
        self.block_ret_button = self.styler.block.default_button.ret_block
        self.block_rec_button = self.styler.block.default_button.rec_block

    async def campaigns_processing(self, campaigns):
        for campaign in campaigns:
            self.campaigns[campaign['id']] = campaign
            social = campaign['campaign_type'] == CampaignType.social
            retargeting = campaign['campaign_type'] == CampaignType.remarketing
            retargeting_offer = campaign['remarketing_type'] == CampaignRemarketingType.offer
            retargeting_account = campaign['remarketing_type'] == CampaignRemarketingType.account
            thematic = campaign['campaign_type'] == CampaignType.thematic

            if social and self.social_branch:
                self.campaigns_socia.append((campaign['id'], campaign['lot_concurrency']))
                self.offer_count_socia += campaign['offer_count']

            elif not social and not retargeting and thematic and self.place_branch:
                count_place = self.app.campaign_view_count['place'][campaign['id']]
                count_thematic = self.app.campaign_view_count['thematic'][campaign['id']]
                thematic_range = campaign['thematic_range']
                if thematic_range > 0:
                    if count_thematic > ((count_place + count_thematic) / 100) * thematic_range:
                        self.campaigns_place.append((campaign['id'], campaign['lot_concurrency']))
                        self.offer_count_place += campaign['offer_count']
                    else:
                        if self.thematics_intersection(campaign['thematics']):
                            self.campaigns_thematic.append((campaign['id'], campaign['lot_concurrency']))
                            self.offer_count_thematic += campaign['offer_count']
                else:
                    self.campaigns_place.append((campaign['id'], campaign['lot_concurrency']))
                    self.offer_count_place += campaign['offer_count']

            elif not social and not retargeting and not thematic and self.place_branch:
                self.campaigns_place.append((campaign['id'], campaign['lot_concurrency']))
                self.offer_count_place += campaign['offer_count']

            elif not social and retargeting and retargeting_offer and self.retargeting_branch:
                if campaign['guid'] in self.params.retargeting:
                    self.params.add_retargeting(campaign['guid'], campaign['id'])
                    self.campaigns_retargeting_dynamic.append((campaign['id'], campaign['lot_concurrency']))
                    self.offer_count_retargeting_dynamic += campaign['offer_count']

            elif not social and retargeting and retargeting_account and self.retargeting_account_branch:
                if campaign['guid'] in self.params.retargeting:
                    self.campaigns_retargeting_account.append((campaign['id'], campaign['lot_concurrency']))
                    self.offer_count_retargeting_account += campaign['offer_count']

    async def find_offers(self):
        tasks = list()
        tasks.append(ensure_future(self.app.query.get_place_offer(
            processor=self,
            block_id=self.block_id,
            block_categoryes=self.block.get('block_adv_category', []),
            campaigns=self.campaigns_place,
            capacity=self.styler.max_capacity,
            index=self.params.index,
            offer_count=self.offer_count_place,
            exclude=self.params.exclude)))

        tasks.append(ensure_future(self.app.query.get_place_offer(
            processor=self,
            block_id=self.block_id,
            block_categoryes=self.block.get('block_adv_category', []),
            campaigns=self.campaigns_thematic,
            capacity=self.styler.max_capacity,
            index=self.params.index,
            offer_count=self.offer_count_thematic,
            exclude=self.params.thematics_exclude)))

        tasks.append(ensure_future(self.app.query.get_social_offer(
            processor=self,
            block_id=self.block_id,
            block_categoryes=self.block.get('block_adv_category', []),
            campaigns=self.campaigns_socia,
            capacity=self.styler.max_capacity,
            index=self.params.index,
            offer_count=self.offer_count_socia,
            exclude=self.params.exclude)))

        tasks.append(ensure_future(self.app.query.get_account_retargeting_offer(
            processor=self,
            block_id=self.block_id,
            campaigns=self.campaigns_retargeting_account,
            capacity=self.styler.max_capacity,
            index=self.params.index,
            offer_count=self.offer_count_retargeting_account,
            exclude=self.params.retargeting_account_exclude)))

        tasks.append(ensure_future(self.app.query.get_dynamic_retargeting_offer(
            processor=self,
            block_id=self.block_id,
            campaigns=self.campaigns_retargeting_dynamic,
            capacity=self.styler.max_capacity,
            index=self.params.index,
            offer_count=self.offer_count_retargeting_dynamic,
            exclude=self.params.retargeting_dynamic_exclude,
            retargeting_list=self.params.retargeting_list)))

        place_offer, thematic_offer, social_offer, account_retargeting_offer, dynamic_retargeting_offer = await gather(
            *tasks)
        await self.union_offers(place_offer, thematic_offer, social_offer, account_retargeting_offer,
                                dynamic_retargeting_offer)

        if self.app.campaign_view_count['all'] > 10000:
            self.app.campaign_view_count['thematic'].clear()
            self.app.campaign_view_count['place'].clear()
            self.app.campaign_view_count['all'] = 0

    async def find_recomendet(self, offer, loop_counter, capacity):
        views = [('mv_offer_dynamic_retargeting', self.params.retargeting_dynamic_exclude),
                 ('mv_offer_account_retargeting', self.params.retargeting_account_exclude),
                 ('mv_offer_place', self.params.exclude),
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

    async def union_offers(self, place_offer, thematic_offer, social_offer, account_retargeting_offer,
                           dynamic_retargeting_offer):
        styling_block = None
        styling_predictive = False
        loop_break = False
        loop_counter = 0

        summary_offer = dynamic_retargeting_offer[0] + account_retargeting_offer[0] + place_offer[0]
        len_summary_offer = len(summary_offer)

        count_not_styling = sum(map(lambda x: 0 if self.campaigns.get(x['id_cam'], {}).get('styling', False) else 1,
                                    summary_offer))
        if count_not_styling < self.styler.default_capacity and count_not_styling < len_summary_offer:
            styling_predictive = True

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
            ('thematic', thematic_offer),
            ('place', place_offer),
            ('social', social_offer)
        ]

        for name, result in views:
            loop_counter += 1
            if loop_break:
                break
            self.data['clean'][name] = result[1]
            if name == 'social' and len(self.data['offers']) > 0:
                break
            for offer in result[0]:
                if loop_break:
                    break

                camp = self.campaigns.get(offer['id_cam'])
                offer_styling_block = camp['styling']
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

                if camp['campaign_style'] == CampaignStylingType.style_1:
                    self.styler.add(str(camp['id']), 'Style_1')
                elif camp['campaign_style'] == CampaignStylingType.style_2:
                    self.styler.add(str(camp['id']), 'Style_2')
                elif camp['campaign_style'] == CampaignStylingType.style_3:
                    self.styler.add(str(camp['id']), 'Style_3')
                else:
                    self.styler.add(camp['campaign_style_class'], camp['campaign_style_class'])

                offer['campaign'] = camp
                offer['logic_name'] = name

                if offer_styling_block:
                    capacity = self.styler.block.styling_adv.count_adv
                else:
                    capacity = self.styler.block.default_adv.count_adv

                await self.create_offer(offer, False, capacity)

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
                self.data['clean']['place'] = True
                self.data['clean']['social'] = True
                self.data['clean']['account_retargeting'] = True
                self.data['clean']['dynamic_retargeting'] = True
            else:
                for x in range(int(capacity) - len(self.data['offers'])):
                    if 0 < len(self.data['offers']) < capacity:
                        self.data['offers'].append(choice(self.data['offers']))
                    else:
                        break

    def change_image(self, images):
        if self.params.is_webp:
            images = list(map(lambda x: x.replace('.png', '.webp'), images))
            images = list(map(lambda x: x.replace('http://', 'https://'), images))
        if len(images) == 2:
            images = images + images
        return images

    def change_link(self, offer):
        offer_url = offer['url']
        base64_url = base64.urlsafe_b64encode(str('o=%s\nb=%s\nc=%s\ns=%s\nal=%s\nar=%s\nto=%s\nu=%s\nra=%s\ntr=%d' % (
            offer['id'],
            self.block['id'],
            offer['campaign']['id'],
            self.block['id_site'],
            offer['campaign']['id_account'],
            self.block['id_account'],
            offer['token'],
            offer_url,
            self.params.token,
            int(time.time()*1000)
        )).encode('utf-8'))
        params = 'a=%s&b=%s&c=%s' % (randint(1, 9), base64_url.decode('utf-8'), randint(1, 9))
        return 'https://click.yottos.com/click/rg?%s' % params

    async def create_logo(self, offer):
        if len(self.data['offers']) >= self.styler.styling_capacity:
            return
        self.data['offers'].append({
            'title': offer['campaign']['campaign_style_head_title'],
            'description': None,
            'price': None,
            'url': self.change_link(offer),
            'images': [offer['campaign']['campaign_style_logo']],
            'style_class': 'logo%s' % offer['campaign']['campaign_style_class'],
            'id': None,
            'id_cam': None,
            'campaign_social': None,
            'retargeting': None,
            'unique_impression_lot': None,
            'token': None,
            'branch': None,
            'button': offer['campaign']['campaign_style_button_title']
        })

    async def create_offer(self, offer, recomendet=False, capacity=0):
        if len(self.data['offers']) >= capacity:
            return
        style_class = offer['campaign']['campaign_style_class']
        button = self.block_button
        unique_impression_lot = offer['campaign']['unique_impression_lot']
        if offer['campaign']['campaign_type'] == CampaignType.remarketing:
            button = self.block_ret_button
        if recomendet:
            style_class = offer['campaign']['campaign_style_class_recommendet']
            button = self.block_rec_button
            unique_impression_lot = 1

        if offer['campaign']['campaign_type'] == CampaignType.thematic:
            key = offer['campaign']['id']
            if offer.get('logic_name') == 'thematic':
                self.app.campaign_view_count['all'] = self.app.campaign_view_count.get('all', 0) + 1
                count = self.app.campaign_view_count['thematic'].get(key, 0) + 1
                self.app.campaign_view_count['thematic'][offer['campaign']['id']] = count
            elif offer.get('logic_name') == 'place':
                self.app.campaign_view_count['all'] = self.app.campaign_view_count.get('all', 0) + 1
                count = self.app.campaign_view_count['place'].get(key, 0) + 1
                self.app.campaign_view_count['place'][offer['campaign']['id']] = count

        self.data['offers'].append({
            'title': offer['title'],
            'description': offer['description'],
            'price': offer['price'],
            'url': self.change_link(offer),
            'images': self.change_image(offer['images']),
            'style_class': 'adv%s' % style_class,
            'id': str(offer['id']),
            'cid': str(offer['campaign']['id']),
            'aid': str(offer['campaign']['id_account']),
            'icr': 0,
            'icl': 0,
            'campaign_social': offer['campaign']['campaign_type'] == CampaignType.social,
            'thematic': offer['campaign']['campaign_type'] == CampaignType.thematic,
            'retargeting': offer['campaign']['campaign_type'] == CampaignType.remarketing,
            'unique_impression_lot': unique_impression_lot,
            'token': offer['token'],
            'thematics': offer['campaign']['thematics'],
            'button': button
        })

    async def css(self):
        self.data['css'] = await self.styler.calculate()

    async def __call__(self):
        if await self.find_block():
            await self.find_offers()
            await self.css()
        return self.data
