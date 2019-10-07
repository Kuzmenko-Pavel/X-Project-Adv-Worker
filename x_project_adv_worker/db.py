import os
import asyncpg
import asyncio
import ujson
from datetime import datetime
import time

from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.choiceTypes import (CampaignType, CampaignPaymentModel, CampaignStylingType, BlockType,
                                              CampaignRemarketingType, CampaignRecommendedAlgorithmType)


async def init_db(app):
    application_name = 'AdvWorker pid=%s' % os.getpid()
    app.pool = await asyncpg.create_pool(dsn=app['config']['postgres']['uri'], min_size=1, max_size=10,
                                         max_inactive_connection_lifetime=300,
                                         max_queries=1000, command_timeout=60, timeout=60,
                                         server_settings={'application_name': application_name})
    app.query = Query(app.pool)
    # TODO зашита от переполнения и утечек
    app.block_cache = {}
    app.campaign_view_count = {
        'all': 0,
        'place': {},
        'thematic': {},
    }


class Query(object):
    def __init__(self, pool):
        self.pool = pool

    async def get_block(self, block_src):
        async with self.pool.acquire() as connection:
            try:
                async with connection.transaction():
                    q = '''SELECT id, 
                              guid, 
                              id_account, 
                              id_site, 
                              block_type, 
                              "headerHtml", 
                              "footerHtml", 
                              "userCode",
                              ad_style,
                              place_branch,
                              retargeting_branch,
                              social_branch, 
                              rating_division,
                              rating_hard_limit,
                              site_name,
                              block_adv_category, 
                              click_cost_min,
                              click_cost_proportion,
                              click_cost_max,
                              impression_cost_min, 
                              impression_cost_proportion,
                              impression_cost_max,
                              cost_percent, 
                              disable_filter,
                              time_filter
                          FROM public.mv_block 
                          where guid='%(guid)s' LIMIT 1 OFFSET 0;''' % {'guid': block_src}
                    # stmt = await connection.prepare(q)
                    # block = await stmt.fetchrow()
                    block = await connection.fetchrow(q)
                    if block:
                        return {
                            'id': block['id'],
                            'guid': str(block['guid']),
                            'id_account': block['id_account'],
                            'id_site': block['id_site'],
                            'block_type': BlockType(block['block_type']),
                            'headerHtml': block['headerHtml'],
                            'footerHtml': block['footerHtml'],
                            'userCode': block['userCode'],
                            'ad_style': block['ad_style'],
                            'iplace_branchd': block['place_branch'],
                            'retargeting_branch': block['retargeting_branch'],
                            'social_branch': block['social_branch'],
                            'rating_division': block['rating_division'],
                            'rating_hard_limit': block['rating_hard_limit'],
                            'site_name': block['site_name'],
                            'block_adv_category': block['block_adv_category'],
                            'click_cost_min': block['click_cost_min'],
                            'click_cost_proportion': block['click_cost_proportion'],
                            'click_cost_max': block['click_cost_max'],
                            'impression_cost_min': block['impression_cost_min'],
                            'impression_cost_proportion': block['impression_cost_proportion'],
                            'impression_cost_max': block['impression_cost_max'],
                            'cost_percent': block['cost_percent'],
                            'disable_filter': block['disable_filter'],
                            'time_filter': block['time_filter']
                        }
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_block')
                # logger.error(exception_message(exc=str(ex)))
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
        return None

    async def get_campaigns(self, id_block, processing_data):
        result = {}
        country = processing_data.params.country.replace("'", "''")
        region = processing_data.params.region.replace("'", "''")
        device = processing_data.params.device.replace("'", "''")
        capacity = processing_data.styler.min_capacity
        date = datetime.now()
        d = date.weekday() + 1
        h = date.hour
        m = date.minute
        t = (h * 60) + m
        async with self.pool.acquire() as connection:
            try:
                async with connection.transaction():
                    q = '''
                    SELECT
                       ca.id,
                       ca.id_account,
                       ca.guid,
                       ca.name,
                       ca.campaign_type,
                       ca.campaign_style,
                       ca.campaign_style_logo,
                       ca.campaign_style_head_title,
                       ca.campaign_style_button_title,
                       ca.campaign_style_class,
                       ca.campaign_style_class_recommendet,
                       ca.unique_impression_lot,
                       ca.styling,
                       ca.utm,
                       ca.capacity,
                       ca.utm_human_data,
                       ca.disable_filter,
                       ca.time_filter,
                       ca.payment_model,
                       ca.lot_concurrency,
                       ca.remarketing_type,
                       ca.recommended_algorithm,
                       ca.recommended_count,
                       ca.thematic_range,
                       ca.offer_count,
                       COALESCE(cp.click_cost, ca.click_cost) as click_cost,
                       COALESCE(cp.impression_cost, ca.impression_cost) as impression_cost,
                       ct.path
                FROM mv_campaign AS ca
                  INNER JOIN (
                   SELECT gt.id_cam AS id
                   FROM mv_geo AS gt
                     INNER JOIN mv_geo_lite_city AS gtl ON gt.id_geo = gtl.id
                   WHERE (gtl.country = '%(country)s' AND (gtl.city = '%(region)s' OR gtl.city = '*')) OR
                         (gtl.country = '*' AND gtl.city = '*')
                         
                   INTERSECT
                   SELECT dt.id_cam AS id
                   FROM mv_campaign2device AS dt
                     INNER JOIN mv_device AS d ON dt.id_dev = d.id
                   WHERE d.code = '%(device)s' OR d.code = '**'
                   
                   INTERSECT
                   SELECT t.id AS id
                   FROM mv_campaign AS t
                   WHERE t.capacity <= %(capacity)d
                   
                   INTERSECT
                   SELECT crcs.id_cam AS id
                       FROM mv_cron AS crcs
                       WHERE crcs.day = %(day)d AND  crcs.time @> %(time)d
                   EXCEPT
                   SELECT DISTINCT(cbb.id_cam) AS id
                   FROM mv_campaigns_by_blocking_block AS cbb
                   WHERE cbb.id_block = %(id_block)d
                 ) AS c ON ca.id = c.id
                 LEFT JOIN mv_campaign_thematics AS ct ON ca.id = ct.id_cam
                 LEFT JOIN mv_campaigns_by_block_price AS cp ON ca.id = cp.id_cam and cp.id_block = %(id_block)d
                      
                    ''' % {
                        'country': country,
                        'region': region,
                        'device': device,
                        'id_block': id_block,
                        'day': d,
                        'time': t,
                        'capacity': capacity
                    }
                    # stmt = await connection.prepare(q)
                    # campaigns = await stmt.fetch()
                    campaigns = await connection.fetch(q)
                    for item in campaigns:
                        campaign = {}
                        campaign['id'] = item['id']
                        campaign['id_account'] = item['id_account']
                        campaign['guid'] = str(item['guid'])
                        campaign['name'] = item.get('name', '')
                        campaign['campaign_type'] = CampaignType(item['campaign_type'])
                        campaign['campaign_style'] = CampaignStylingType(item['campaign_style'])
                        campaign['campaign_style_logo'] = item['campaign_style_logo']
                        campaign['campaign_style_head_title'] = item['campaign_style_head_title']
                        campaign['campaign_style_button_title'] = item['campaign_style_button_title']
                        campaign['campaign_style_class'] = item['campaign_style_class']
                        campaign['campaign_style_class_recommendet'] = item['campaign_style_class_recommendet']
                        campaign['styling'] = item['styling']
                        campaign['utm'] = item['utm']
                        campaign['utm_human_data'] = item['utm_human_data']
                        campaign['disable_filter'] = item['disable_filter']
                        campaign['time_filter'] = item['time_filter']
                        campaign['unique_impression_lot'] = item['unique_impression_lot']
                        campaign['payment_model'] = CampaignPaymentModel(item['payment_model'])
                        campaign['lot_concurrency'] = item['lot_concurrency']
                        campaign['remarketing_type'] = CampaignRemarketingType(item['remarketing_type'])
                        campaign['recommended_algorithm'] = CampaignRecommendedAlgorithmType(
                            item['recommended_algorithm'])
                        campaign['recommended_count'] = item['recommended_count']
                        campaign['thematic_range'] = item['thematic_range']
                        campaign['thematics'] = item['path']
                        campaign['click_cost'] = item['click_cost']
                        campaign['impression_cost'] = item['impression_cost']
                        offer_count = item['offer_count']
                        campaign['offer_count'] = int(offer_count) if offer_count <= 30 else 30
                        result[campaign['id']] = campaign
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_campaigns')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
        return result

    async def get_place_offer(self, processing_data, recursion=False):
        rating_hard_limit = processing_data.rating_hard_limit
        block_rating_division = processing_data.block_rating_division
        id_block = processing_data.id_block
        block_categoryes = processing_data.block.get('block_adv_category', [])
        campaigns = processing_data.campaigns_place
        capacity = processing_data.styler.max_capacity
        index = processing_data.params.index
        offer_count = processing_data.offer_count_place
        exclude = processing_data.params.exclude
        if not campaigns:
            return [], None
        result = []
        clean = True
        async with self.pool.acquire() as connection:
            try:
                campaigns_ids = ','.join([str(x[0]) for x in campaigns])
                counter_prediction = offer_count - len(exclude)
                exclude_ids = ','.join([str(x) for x in exclude])
                range_number = 1
                if counter_prediction < capacity * 2:
                    range_number = capacity
                if -10 < counter_prediction < capacity:
                    index = 0
                campaign_unique = ' or '.join(
                    ['(sub.id_cam = %d and sub.range_number <= %d)' % (x[0], x[1] * range_number) for x in
                     campaigns])
                async with connection.transaction():
                    q = '''
                        select * from
                        (
                        select 
                        row_number() OVER (PARTITION BY ofrs.id_cam order by mv_offer2block_rating.rating desc) AS range_number,
                        count(id) OVER() as all_count,
                        mv_offer2block_rating.*,
                        ofrs.*
                        FROM mv_offer_place AS ofrs
                        left join mv_offer2block_rating on mv_offer2block_rating.id_offer = ofrs.id and mv_offer2block_rating.id_block = %(block_id)d
                        left join mv_offer_categories on mv_offer_categories.id_offer = ofrs.id and mv_offer_categories.path ? %(lquery)s
                        WHERE
                        campaign_range_number < 30
                        AND mv_offer_categories.id_offer is NULL
                        AND ofrs.id_cam IN (%(campaigns)s)
                        AND ofrs.id NOT IN (%(exclude)s)
                        ) sub
                        where %(campaign_unique)s
                        order by sub.range_number, sub.rating desc
                        LIMIT %(capacity)d OFFSET %(offset)d;
                    ''' % {
                        'block_id': id_block,
                        'lquery': "ARRAY[%s]::lquery[]" % ','.join([
                            "'%s.*'" % x for x in block_categoryes
                        ]),
                        'campaigns': campaigns_ids,
                        'exclude': exclude_ids,
                        'campaign_unique': campaign_unique,
                        'capacity': capacity * 2,
                        'offset': index * capacity
                    }
                    # stmt = await connection.prepare(q)
                    # offers = await stmt.fetch()
                    offers = await connection.fetch(q)
                    for offer in offers:
                        rating = offer['rating']
                        if rating is None:
                            rating = 12500.0
                        if rating_hard_limit and rating < block_rating_division:
                            continue

                        if offer['all_count'] > capacity and rating > 0:
                            clean = False
                        else:
                            clean = True
                        item = {}
                        item['id'] = offer['id']
                        item['id_cam'] = offer['id_cam']
                        item['images'] = offer['images']
                        item['description'] = offer['description']
                        item['url'] = offer['url']
                        item['title'] = offer['title']
                        item['price'] = offer['price']
                        item['recommended'] = offer['recommended']
                        item['rating'] = rating
                        item['token'] = str(item['id']) + str(id_block) + str(time.time()).replace('.', '')
                        item['campaign'] = processing_data.campaigns.get(offer['id_cam'])
                        item['block'] = processing_data.block
                        result.append(item)
                    if len(result) < capacity and not recursion:
                        rec_exclude = [0]
                        rec_exclude.extend([x['id'] for x in result])
                        rec_res, rec_clean = await self.get_place_offer(processing_data, True)
                        for item in rec_res:
                            result.append(item)
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_place_offer')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
            if not clean:
                if all([item['rating'] < block_rating_division for item in result]):
                    clean = True
        return result, clean

    async def get_thematic_offer(self, processing_data, recursion=False):
        rating_hard_limit = processing_data.rating_hard_limit
        block_rating_division = processing_data.block_rating_division
        id_block = processing_data.id_block
        block_categoryes = processing_data.block.get('block_adv_category', [])
        campaigns = processing_data.campaigns_thematic
        capacity = processing_data.styler.max_capacity
        index = processing_data.params.index
        offer_count = processing_data.offer_count_thematic
        exclude = processing_data.params.thematics_exclude
        if not campaigns:
            return [], None
        result = []
        clean = True
        async with self.pool.acquire() as connection:
            try:
                campaigns_ids = ','.join([str(x[0]) for x in campaigns])
                counter_prediction = offer_count - len(exclude)
                exclude_ids = ','.join([str(x) for x in exclude])
                range_number = 1
                if counter_prediction < capacity * 2:
                    range_number = capacity
                if -10 < counter_prediction < capacity:
                    index = 0
                campaign_unique = ' or '.join(
                    ['(sub.id_cam = %d and sub.range_number <= %d)' % (x[0], x[1] * range_number) for x in
                     campaigns])
                async with connection.transaction():
                    q = '''
                                select * from
                                (
                                select 
                                row_number() OVER (PARTITION BY ofrs.id_cam order by mv_offer2block_rating.rating desc) AS range_number,
                                count(id) OVER() as all_count,
                                mv_offer2block_rating.*,
                                ofrs.*
                                FROM mv_offer_place AS ofrs
                                left join mv_offer2block_rating on mv_offer2block_rating.id_offer = ofrs.id and mv_offer2block_rating.id_block = %(block_id)d
                                left join mv_offer_categories on mv_offer_categories.id_offer = ofrs.id and mv_offer_categories.path ? %(lquery)s
                                WHERE
                                campaign_range_number < 30
                                AND mv_offer_categories.id_offer is NULL
                                AND ofrs.id_cam IN (%(campaigns)s)
                                AND ofrs.id NOT IN (%(exclude)s)
                                ) sub
                                where %(campaign_unique)s
                                order by sub.range_number, sub.rating desc
                                LIMIT %(capacity)d OFFSET %(offset)d;
                            ''' % {
                        'block_id': id_block,
                        'lquery': "ARRAY[%s]::lquery[]" % ','.join([
                            "'%s.*'" % x for x in block_categoryes
                        ]),
                        'campaigns': campaigns_ids,
                        'exclude': exclude_ids,
                        'campaign_unique': campaign_unique,
                        'capacity': capacity * 2,
                        'offset': index * capacity
                    }
                    # stmt = await connection.prepare(q)
                    # offers = await stmt.fetch()
                    offers = await connection.fetch(q)
                    for offer in offers:
                        rating = offer['rating']
                        if rating is None:
                            rating = 12500.0
                        if rating_hard_limit and rating < block_rating_division:
                            continue

                        if offer['all_count'] > capacity and rating > 0:
                            clean = False
                        else:
                            clean = True
                        item = {}
                        item['id'] = offer['id']
                        item['id_cam'] = offer['id_cam']
                        item['images'] = offer['images']
                        item['description'] = offer['description']
                        item['url'] = offer['url']
                        item['title'] = offer['title']
                        item['price'] = offer['price']
                        item['recommended'] = offer['recommended']
                        item['rating'] = rating
                        item['token'] = str(item['id']) + str(id_block) + str(time.time()).replace('.', '')
                        item['campaign'] = processing_data.campaigns.get(offer['id_cam'])
                        item['block'] = processing_data.block
                        result.append(item)
                    if len(result) < capacity and not recursion:
                        rec_exclude = [0]
                        rec_exclude.extend([x['id'] for x in result])
                        rec_res, rec_clean = await self.get_place_offer(processing_data, True)
                        for item in rec_res:
                            result.append(item)
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_place_offer')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
            if not clean:
                if all([item['rating'] < block_rating_division for item in result]):
                    clean = True
        return result, clean

    async def get_social_offer(self, processing_data):
        id_block = processing_data.id_block
        block_categoryes = processing_data.block.get('block_adv_category', [])
        campaigns = processing_data.campaigns_socia
        capacity = processing_data.styler.max_capacity
        offer_count = processing_data.offer_count_socia
        exclude = processing_data.params.exclude
        if not campaigns:
            return [], None
        result = []
        clean = True
        async with self.pool.acquire() as connection:
            try:
                campaigns_ids = ','.join([str(x[0]) for x in campaigns])
                counter_prediction = offer_count - len(exclude)
                if counter_prediction < capacity:
                    exclude = list([0])
                async with connection.transaction():
                    q = '''
                            select * from
                            (
                            select 
                            row_number() OVER (PARTITION BY ofrs.id_cam order by offer_social2block_rating.rating desc) AS range_number,
                            count(id) OVER() as all_count,
                            offer_social2block_rating.*,
                            ofrs.*
                            FROM mv_offer_social AS ofrs
                            left join offer_social2block_rating on offer_social2block_rating.id_offer = ofrs.id and offer_social2block_rating.id_block = %(block_id)d
                            left join mv_offer_categories on mv_offer_categories.id_offer = ofrs.id and mv_offer_categories.path ? %(lquery)s
                            WHERE
                            campaign_range_number < 30
                            AND mv_offer_categories.id_offer is NULL
                            AND ofrs.id_cam IN (%(campaigns)s)
                            AND ofrs.id NOT IN (%(exclude)s)
                            ) sub
                            order by sub.range_number, sub.rating desc
                            LIMIT %(capacity)d;
                        ''' % {
                        'block_id': id_block,
                        'lquery': "ARRAY[%s]::lquery[]" % ','.join([
                            "'%s.*'" % x for x in block_categoryes
                        ]),
                        'campaigns': campaigns_ids,
                        'exclude': ','.join([str(x) for x in exclude]),
                        'capacity': capacity
                    }
                    # stmt = await connection.prepare(q)
                    # offers = await stmt.fetch()
                    offers = await connection.fetch(q)
                    for offer in offers:
                        if clean and offer['all_count'] > capacity:
                            clean = False
                        item = {}
                        item['id'] = offer['id']
                        item['id_cam'] = offer['id_cam']
                        item['images'] = offer['images']
                        item['description'] = offer['description']
                        item['url'] = offer['url']
                        item['title'] = offer['title']
                        item['price'] = offer['price']
                        item['recommended'] = offer['recommended']
                        item['token'] = str(item['id']) + str(id_block) + str(time.time()).replace('.', '')
                        item['campaign'] = processing_data.campaigns.get(offer['id_cam'])
                        item['block'] = processing_data.block
                        result.append(item)
                if counter_prediction < capacity:
                    clean = True
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_social_offer')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
        return result, clean

    async def get_dynamic_retargeting_offer(self, processing_data):
        id_block = processing_data.id_block
        campaigns = processing_data.campaigns_retargeting_dynamic
        capacity = processing_data.styler.max_capacity
        index = processing_data.params.index
        offer_count = processing_data.offer_count_retargeting_dynamic
        exclude = processing_data.params.retargeting_dynamic_exclude
        retargeting_list = processing_data.params.retargeting_list
        if not campaigns:
            return [], None
        result = []
        clean = True
        async with self.pool.acquire() as connection:
            try:
                campaigns_ids = ','.join([str(x[0]) for x in campaigns])
                counter_prediction = offer_count - len(exclude)
                retargeting = ' or '.join(["ofrs.id_ret='%s'" % str(x) for x in retargeting_list])
                if counter_prediction < capacity:
                    index = 0

                async with connection.transaction():
                    q = '''
                            select * from
                            (
                            select 
                            row_number() OVER (PARTITION BY ofrs.id_cam) AS range_number,
                            count(id) OVER() as all_count,
                            ofrs.*
                            FROM mv_offer_dynamic_retargeting AS ofrs
                            WHERE
                            ofrs.id_cam IN (%(campaigns)s)
                            AND ofrs.id NOT IN (%(exclude)s)
                            AND (%(retargeting)s)
                            ) sub
                            where %(campaign_unique)s
                            order by sub.range_number
                            LIMIT %(capacity)d OFFSET %(offset)d;
                        ''' % {
                        'campaigns': campaigns_ids,
                        'exclude': ','.join([str(x) for x in exclude]),
                        'retargeting': retargeting,
                        'campaign_unique': ' or '.join(
                            ['sub.id_cam = %d and sub.range_number <= %d' % (x[0], x[1]) for x in campaigns]),
                        'capacity': capacity,
                        'offset': index * capacity
                    }
                    # stmt = await connection.prepare(q)
                    # offers = await stmt.fetch()
                    offers = await connection.fetch(q)
                    for offer in offers:
                        clean = False
                        item = {}
                        item['id'] = offer['id']
                        item['id_cam'] = offer['id_cam']
                        item['images'] = offer['images']
                        item['description'] = offer['description']
                        item['url'] = offer['url']
                        item['title'] = offer['title']
                        item['price'] = offer['price']
                        item['recommended'] = offer['recommended']
                        item['token'] = str(item['id']) + str(id_block) + str(time.time()).replace('.', '')
                        item['campaign'] = processing_data.campaigns.get(offer['id_cam'])
                        item['block'] = processing_data.block
                        result.append(item)
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_dynamic_retargeting_offer')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
        return result, clean

    async def get_account_retargeting_offer(self, processing_data):
        id_block = processing_data.id_block
        campaigns = processing_data.campaigns_retargeting_account
        capacity = processing_data.styler.max_capacity
        index = processing_data.params.index
        offer_count = processing_data.offer_count_retargeting_account
        exclude = processing_data.params.retargeting_account_exclude
        if not campaigns:
            return [], None
        result = []
        clean = True
        async with self.pool.acquire() as connection:
            try:
                campaigns_ids = ','.join([str(x[0]) for x in campaigns])
                counter_prediction = offer_count - len(exclude)
                if counter_prediction < capacity:
                    index = 0
                async with connection.transaction():
                    q = '''
                        select * from
                        (
                        select 
                        row_number() OVER (PARTITION BY ofrs.id_cam) AS range_number,
                        count(id) OVER() as all_count,
                        ofrs.*
                        FROM mv_offer_account_retargeting AS ofrs
                        WHERE
                        campaign_range_number < 30
                        AND ofrs.id_cam IN (%(campaigns)s)
                        AND ofrs.id NOT IN (%(exclude)s)
                        ) sub
                        where %(campaign_unique)s
                        order by sub.range_number
                        LIMIT %(capacity)d OFFSET %(offset)d;
                    ''' % {
                        'campaigns': campaigns_ids,
                        'exclude': ','.join([str(x) for x in exclude]),
                        'campaign_unique': ' or '.join(
                            ['(sub.id_cam = %d and sub.range_number <= %d) ' % (x[0], x[1]) for x in
                             campaigns]),
                        'capacity': capacity,
                        'offset': index * capacity
                    }
                    # stmt = await connection.prepare(q)
                    # offers = await stmt.fetch()
                    offers = await connection.fetch(q)
                    for offer in offers:
                        if clean and offer['all_count'] > capacity:
                            clean = False
                        item = {}
                        item['id'] = offer['id']
                        item['id_cam'] = offer['id_cam']
                        item['images'] = offer['images']
                        item['description'] = offer['description']
                        item['url'] = offer['url']
                        item['title'] = offer['title']
                        item['price'] = offer['price']
                        item['recommended'] = offer['recommended']
                        item['token'] = str(item['id']) + str(id_block) + str(time.time()).replace('.', '')
                        item['campaign'] = processing_data.campaigns.get(offer['id_cam'])
                        item['block'] = processing_data.block
                        result.append(item)
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_account_retargeting_offer')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
            return result, clean

    async def get_recomendet_offer(self, view, offer_ids, id_block, capacity):
        if not offer_ids:
            return []
        result = []
        async with self.pool.acquire() as connection:
            try:
                async with connection.transaction():
                    q = '''
                    select * 
                    from %(view)s AS ofrs
                    WHERE ofrs.id IN (%(offer_ids)s)
                    LIMIT %(capacity)d;
                    ''' % {
                        'view': view,
                        'offer_ids': ','.join([str(x) for x in offer_ids]),
                        'capacity': capacity * 2
                    }
                    # stmt = await connection.prepare(q)
                    # offers = await stmt.fetch()
                    offers = await connection.fetch(q)
                    for offer in offers:
                        item = {}
                        item['id'] = offer['id']
                        item['guid'] = offer['guid']
                        item['id_cam'] = offer['id_cam']
                        item['images'] = offer['images']
                        item['description'] = offer['description']
                        item['url'] = offer['url']
                        item['title'] = offer['title']
                        item['price'] = offer['price']
                        item['recommended'] = []
                        item['token'] = str(item['id']) + str(id_block) + str(time.time()).replace('.', '')
                        result.append(item)
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_recomendet_offer')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
        return result
