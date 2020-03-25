__all__ = ['DataProcessor']
import base64
import time
import ujson
from asyncio import ensure_future, gather, CancelledError
from itertools import zip_longest
from random import randint, choice
from urllib.parse import quote_plus

from x_project_adv_worker import __dummy_block__
from x_project_adv_worker.choiceTypes import (CampaignType, CampaignPaymentModel, CampaignStylingType,
                                              CampaignRemarketingType, BlockType)
from x_project_adv_worker.data_processor.processing_data import ProcessingData
from x_project_adv_worker.data_processor.utm_converter import UtmConverter
from x_project_adv_worker.logger import logger, exception_message


class DataProcessor(object):
    __slots__ = ['data', 'app', 'processing_data', 'request']

    def __init__(self, request, data):
        self.data = dict({
            'css': '',
            'block': dict(),
            'offers': list(),
            'clean': {
                'place': None,
                'social': None,
                'account_retargeting': None,
                'dynamic_retargeting': None
            },
            'parther': False,
            'test': False
        })
        self.request = request
        self.app = request.app
        self.processing_data = ProcessingData(request, data)

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
                sl = len(start_cats)
                for x, y in enumerate(reversed(start_cats)):
                    if y is None:
                        start_cats[sl - (x + 1)] = 1

                el = len(end_cats)
                for x, y in enumerate(reversed(end_cats)):
                    if y is None:
                        end_cats[el - (x + 1)] = 1
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
        u_thematics_range = [self.cat_to_int_range(x) for x in self.processing_data.params.thematics]
        if u_thematics_range:
            c_thematics_range = [self.cat_to_int_range(x) for x in thematics]
            if c_thematics_range:
                return any([self.range_overlap(r1, r2) for r1 in u_thematics_range for r2 in c_thematics_range])
        return False

    async def get_userCode(self):
        self.processing_data.block = await self.app.query.get_block(block_src=self.processing_data.guid_block)
        userCode = ''
        if self.processing_data.block:
            userCode = self.processing_data.block.get('userCode', '')
        if not userCode:
            userCode = '''
            '''
        return userCode

    async def find_block(self):
        tasks = []
        id_block = self.app.block_cache.get(self.processing_data.guid_block)
        if id_block:

            tasks.append(ensure_future(self.app.query.get_block(block_src=self.processing_data.guid_block)))

            tasks.append(ensure_future(self.app.query.get_campaigns(id_block=id_block,
                                                                    processing_data=self.processing_data
                                                                    )))
            self.processing_data.block, self.processing_data.campaigns = await gather(*tasks)
            if not self.processing_data.block:
                try:
                    del self.app.block_cache[self.processing_data.guid_block]
                except Exception:
                    pass
                return False
        else:
            self.processing_data.block = await self.app.query.get_block(block_src=self.processing_data.guid_block)
            if not self.processing_data.block:
                self.processing_data.params.test = True
                self.processing_data.block = await self.app.query.get_block(block_src=__dummy_block__)
                if not self.processing_data.block:
                    return False

            self.processing_data.campaigns = await  self.app.query.get_campaigns(
                id_block=self.processing_data.block.get('id', 0),
                processing_data=self.processing_data
            )
        if not self.processing_data.params.test:
            self.app.block_cache[self.processing_data.guid_block] = self.processing_data.block.get('id', 0)
        await self.block_processing()
        await self.campaigns_processing()
        return True

    async def block_processing(self):
        self.processing_data.id_block = self.processing_data.block.get('id', 0)
        self.data['block']['id'] = str(self.processing_data.id_block)
        self.data['block']['aid'] = str(self.processing_data.block.get('id_account', 0))
        self.data['block']['sid'] = str(self.processing_data.block.get('id_site', 0))
        self.data['block']['header_html'] = self.processing_data.block.get('headerHtml', '')
        self.data['block']['footer_html'] = self.processing_data.block.get('footerHtml', '')
        self.processing_data.block_rating_division = self.processing_data.block.get('rating_division', 1000)
        self.processing_data.rating_hard_limit = self.processing_data.block.get('rating_hard_limit', False)
        self.processing_data.place_branch = self.processing_data.block.get('place_branch', True)
        self.processing_data.retargeting_branch = self.processing_data.block.get('retargeting_branch', True)
        self.processing_data.retargeting_account_branch = self.processing_data.block.get('retargeting_branch', True)
        self.processing_data.social_branch = self.processing_data.block.get('social_branch', True)
        self.data['parther'] = self.processing_data.parther
        if not self.processing_data.params.auto and self.processing_data.block['block_type'] == BlockType.static:
            self.processing_data.styler.merge(ujson.loads(self.processing_data.block.get('ad_style')))
        self.processing_data.block_button = self.processing_data.styler.block.default_button.block
        self.processing_data.block_ret_button = self.processing_data.styler.block.default_button.ret_block
        self.processing_data.block_rec_button = self.processing_data.styler.block.default_button.rec_block

    async def campaigns_processing(self):
        for campaign in self.processing_data.campaigns.values():
            social = campaign['campaign_type'] == CampaignType.social
            retargeting = campaign['campaign_type'] == CampaignType.remarketing
            retargeting_offer = campaign['remarketing_type'] == CampaignRemarketingType.offer
            retargeting_account = campaign['remarketing_type'] == CampaignRemarketingType.account
            thematic = campaign['campaign_type'] == CampaignType.thematic

            if social and self.processing_data.social_branch:
                self.processing_data.campaigns_socia.append((campaign['id'], campaign['lot_concurrency']))
                self.processing_data.offer_count_socia += campaign['offer_count']

            elif not social and not retargeting and thematic and self.processing_data.place_branch:
                count_place = self.app.campaign_view_count['place'].get(campaign['id'], 0)
                count_thematic = self.app.campaign_view_count['thematic'].get(campaign['id'], 0)
                thematic_range = campaign['thematic_range']
                if thematic_range > 0:
                    if count_thematic > ((count_place + count_thematic) / 100) * thematic_range:
                        self.processing_data.campaigns_place.append((campaign['id'], campaign['lot_concurrency']))
                        self.processing_data.offer_count_place += campaign['offer_count']
                    else:
                        if self.thematics_intersection(campaign['thematics']):
                            self.processing_data.campaigns_thematic.append(
                                (campaign['id'], campaign['lot_concurrency']))
                            self.processing_data.offer_count_thematic += campaign['offer_count']
                else:
                    self.processing_data.campaigns_place.append((campaign['id'], campaign['lot_concurrency']))
                    self.processing_data.offer_count_place += campaign['offer_count']

            elif not social and not retargeting and not thematic and self.processing_data.place_branch:
                self.processing_data.campaigns_place.append((campaign['id'], campaign['lot_concurrency']))
                self.processing_data.offer_count_place += campaign['offer_count']

            elif not social and retargeting and retargeting_offer and self.processing_data.retargeting_branch:
                if campaign['guid'] in self.processing_data.params.retargeting:
                    self.processing_data.params.add_retargeting(campaign['guid'], campaign['id'])
                    self.processing_data.campaigns_retargeting_dynamic.append(
                        (campaign['id'], campaign['lot_concurrency']))
                    self.processing_data.offer_count_retargeting_dynamic += campaign['offer_count']

            elif not social and retargeting and retargeting_account and self.processing_data.retargeting_account_branch:
                if campaign['guid'] in self.processing_data.params.retargeting:
                    self.processing_data.campaigns_retargeting_account.append(
                        (campaign['id'], campaign['lot_concurrency']))
                    self.processing_data.offer_count_retargeting_account += campaign['offer_count']

    async def find_offers(self):
        tasks = list()

        tasks.append(ensure_future(self.app.query.get_place_offer(processing_data=self.processing_data)))

        tasks.append(ensure_future(self.app.query.get_thematic_offer(processing_data=self.processing_data)))

        tasks.append(ensure_future(self.app.query.get_social_offer(processing_data=self.processing_data)))

        tasks.append(ensure_future(self.app.query.get_account_retargeting_offer(processing_data=self.processing_data)))

        tasks.append(ensure_future(self.app.query.get_dynamic_retargeting_offer(processing_data=self.processing_data)))

        place_offer, thematic_offer, social_offer, account_retargeting_offer, dynamic_retargeting_offer = await gather(
            *tasks)
        await self.union_offers(place_offer, thematic_offer, social_offer, account_retargeting_offer,
                                dynamic_retargeting_offer)

        if self.app.campaign_view_count['all'] > 10000:
            self.app.campaign_view_count['thematic'].clear()
            self.app.campaign_view_count['place'].clear()
            self.app.campaign_view_count['all'] = 0

    async def find_recomendet(self, offer, loop_counter, capacity):
        views = [('mv_offer_dynamic_retargeting', self.processing_data.params.retargeting_dynamic_exclude),
                 ('mv_offer_account_retargeting', self.processing_data.params.retargeting_account_exclude),
                 ('mv_offer_place', self.processing_data.params.exclude),
                 ('mv_offer_place', self.processing_data.params.exclude),
                 ('mv_offer_social', self.processing_data.params.exclude)
                 ]
        if len(views) < loop_counter:
            return
        view = views[loop_counter - 1][0]
        offer_ids = offer.get('recommended', [])
        id_offer = offer.get('id', 0)
        id_cam = offer.get('id_cam', 0)
        offer_styling_block = offer['campaign']['styling']
        select_capacity = int(capacity - len(self.data['offers']))
        exclude = views[loop_counter - 1][1]
        if offer_styling_block:
            capacity = capacity - 1
        if select_capacity > 0:
            recomendet = await self.app.query.get_recomendet_offer(
                view=view,
                id_offer=id_offer,
                id_cam=id_cam,
                offer_ids=offer_ids,
                id_block=self.processing_data.id_block,
                capacity=select_capacity,
            )

            for x in range(int(capacity) + 1):
                if len(self.data['offers']) >= capacity:
                    break
                for recomendet_offer in recomendet:
                    if x == 0 and str(recomendet_offer['id']) in exclude:
                        continue
                    recomendet_offer['campaign'] = offer['campaign']
                    recomendet_offer['block'] = offer['block']
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

        count_not_styling = sum(
            map(lambda x: 0 if self.processing_data.campaigns.get(x['id_cam'], {}).get('styling', False) else 1,
                summary_offer))
        if count_not_styling < self.processing_data.styler.default_capacity and count_not_styling < len_summary_offer:
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

                if offer['campaign']['styling']:
                    if styling_block is None or styling_block == offer['id_cam']:
                        styling_block = offer['id_cam']
                    else:
                        continue
                else:
                    if styling_block or styling_predictive:
                        continue
                    elif styling_block is None:
                        styling_block = False

                if offer['campaign']['campaign_style'] == CampaignStylingType.style_1:
                    self.processing_data.styler.add(str(offer['campaign']['id']), 'Style_1')
                elif offer['campaign']['campaign_style'] == CampaignStylingType.style_2:
                    self.processing_data.styler.add(str(offer['campaign']['id']), 'Style_2')
                elif offer['campaign']['campaign_style'] == CampaignStylingType.style_3:
                    self.processing_data.styler.add(str(offer['campaign']['id']), 'Style_3')
                else:
                    self.processing_data.styler.add(offer['campaign']['campaign_style_class'],
                                                    offer['campaign']['campaign_style_class'])

                offer['logic_name'] = name

                if offer['campaign']['styling']:
                    capacity = self.processing_data.styler.block.styling_adv.count_adv
                else:
                    capacity = self.processing_data.styler.block.default_adv.count_adv

                await self.create_offer(offer, False, capacity)

                if offer['campaign']['styling']:
                    await self.find_recomendet(offer, loop_counter, capacity)

                if offer['campaign']['styling'] and len(
                        self.data['offers']) >= self.processing_data.styler.block.styling_adv.count_adv:
                    loop_break = True
                elif not offer['campaign']['styling'] and len(
                        self.data['offers']) >= self.processing_data.styler.block.default_adv.count_adv:
                    loop_break = True

        if styling_block:
            capacity = self.processing_data.styler.block.styling_adv.count_adv
        else:
            capacity = self.processing_data.styler.block.default_adv.count_adv

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
        if self.processing_data.params.is_webp:
            images = list(map(lambda x: x.replace('.png', '.webp'), images))
        images = list(map(lambda x: x.replace('http://', 'https://'), images))
        if len(images) == 2:
            images = images + images
        return images

    def click_cost_calc(self, offer):
        if self.processing_data.params.test:
            return 0, 0

        if offer['campaign']['payment_model'] in [CampaignPaymentModel.ppc, CampaignPaymentModel.auto]:
            cost_percent = offer['block']['cost_percent']
            cost_proportion = offer['block']['click_cost_proportion']
            cost_min = offer['block']['click_cost_min']
            cost_max = offer['block']['click_cost_max']
            ccl = offer['campaign']['click_cost']
            ccl = round(ccl * cost_percent / 100, 4)
            ccr = round(ccl * cost_proportion / 100, 4)
            if cost_min and ccr < cost_min:
                ccr = cost_min
            if cost_max and ccr > cost_max:
                ccr = cost_max
            return ccr, ccl
        return 0, 0

    async def change_link(self, offer):
        ccr, ccl = self.click_cost_calc(offer)
        utm = UtmConverter(offer)
        rev_token = quote_plus(self.processing_data.params.token[::-1])
        offer_url = await utm.url
        base64_url = base64.urlsafe_b64encode(str('\n'.join([
            'oid=%d',
            'bid=%d',
            'cid=%d',
            'sid=%d',
            'aidl=%d',
            'aidr=%d',
            't=%d',
            'to=%s',
            'ccr=%s',
            'ccl=%s',
            's=%d',
            'u=%s',
            'ra=%s',
            'tr=%d',
            'f=%d',
            'tf=%d'
        ]) % (
                                                      offer['id'],
                                                      offer['block']['id'],
                                                      offer['campaign']['id'],
                                                      offer['block']['id_site'],
                                                      offer['campaign']['id_account'],
                                                      offer['block']['id_account'],
                                                      1 if self.processing_data.params.test else 0,
                                                      offer['token'],
                                                      ccr,
                                                      ccl,
                                                      1 if offer['campaign'][
                                                               'campaign_type'] == CampaignType.social else 0,
                                                      offer_url,
                                                      self.processing_data.params.token,
                                                      int(time.time() * 1000),
                                                      offer['block']['disable_filter'] or offer['campaign'][
                                                          'disable_filter'],
                                                      max(offer['block']['time_filter'],
                                                          offer['campaign']['time_filter'])
        )).encode('utf-8'))
        params = 'a=%s&b=%s&c=%s&r=%s' % (randint(1, 9), base64_url.decode('utf-8'), randint(1, 9), rev_token)
        return 'https://click.yottos.com/click/rg?%s' % params

    async def create_logo(self, offer):
        if len(self.data['offers']) >= self.processing_data.styler.styling_capacity:
            return
        self.data['offers'].append({
            'title': offer['campaign']['campaign_style_head_title'],
            'description': None,
            'price': None,
            'url': await self.change_link(offer),
            'images': [offer['campaign']['campaign_style_logo']],
            'style_class': 'logo%s' % offer['campaign']['campaign_style_class'],
            'id': None,
            'cid': None,
            'aid': None,
            'icr': None,
            'icl': None,
            'campaign_social': None,
            'thematic': None,
            'retargeting': None,
            'unique_impression_lot': None,
            'token': None,
            'thematics': offer['thematics'],
            'button': offer['campaign']['campaign_style_button_title'],
        })

    def impression_cost_calc(self, offer):
        if self.processing_data.params.test:
            return 0, 0
        if offer['campaign']['payment_model'] == CampaignPaymentModel.ppi:
            cost_percent = offer['block']['cost_percent']
            cost_proportion = offer['block']['impression_cost_proportion']
            cost_min = offer['block']['impression_cost_min']
            cost_max = offer['block']['impression_cost_max']
            ccl = offer['campaign']['impression_cost']
            ccl = round(ccl * cost_percent / 100, 4)
            ccr = round(ccl * cost_proportion / 100, 4)
            if cost_min and ccr < cost_min:
                ccr = cost_min
            if cost_max and ccr > cost_max:
                ccr = cost_max
            return ccr / 1000, ccl / 1000
        return 0, 0

    async def create_offer(self, offer, recomendet=False, capacity=0):
        if len(self.data['offers']) >= capacity:
            return
        style_class = offer['campaign']['campaign_style_class']
        button = self.processing_data.block_button
        unique_impression_lot = offer['campaign']['unique_impression_lot']
        if offer['campaign']['campaign_type'] == CampaignType.remarketing:
            button = self.processing_data.block_ret_button
        if recomendet:
            style_class = offer['campaign']['campaign_style_class_recommendet']
            button = self.processing_data.block_rec_button
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
        icr, icl = self.impression_cost_calc(offer)
        self.data['offers'].append({
            'title': offer['title'],
            'description': offer['description'],
            'price': offer['price'],
            'url': await self.change_link(offer),
            'images': self.change_image(offer['images']),
            'style_class': 'adv%s' % style_class,
            'id': str(offer['id']),
            'cid': str(offer['campaign']['id']),
            'aid': str(offer['campaign']['id_account']),
            'icr': icr,
            'icl': icl,
            'campaign_social': offer['campaign']['campaign_type'] == CampaignType.social,
            'thematic': offer['campaign']['campaign_type'] == CampaignType.thematic,
            'retargeting': offer['campaign']['campaign_type'] == CampaignType.remarketing,
            'unique_impression_lot': unique_impression_lot,
            'token': offer['token'],
            'thematics': offer['thematics'],
            'button': button
        })

    async def css(self):
        try:
            self.data['css'] = await self.processing_data.styler.calculate()
        except CancelledError:
            logger.error('CancelledError CSS calculate %s' % str(time.time() - self.request.start_time))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex)))

    async def __call__(self):
        if await self.find_block():
            await self.find_offers()
            await self.css()
        return self.data
