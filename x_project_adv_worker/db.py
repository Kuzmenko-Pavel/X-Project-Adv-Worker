import os
import asyncpg
import asyncio
import ujson
from datetime import datetime
import time

from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.choiceTypes import (CampaignType, CampaignPaymentModel, CampaignStylingType,
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
                    q = '''SELECT * 
                          FROM public.mv_block 
                          where guid='%(guid)s' LIMIT 1 OFFSET 0;''' % {'guid': block_src}
                    # stmt = await connection.prepare(q)
                    # block = await stmt.fetchrow()
                    block = await connection.fetchrow(q)
                    if block:
                        return dict(block)
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_block')
                # logger.error(exception_message(exc=str(ex)))
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
        return None

    async def get_campaigns(self, block_id, country, region, device, capacity):
        result = []
        date = datetime.now()
        d = date.weekday() + 1
        h = date.hour
        m = date.minute
        async with self.pool.acquire() as connection:
            try:
                async with connection.transaction():
                    q = '''
                    SELECT
                ca.*
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
                   SELECT crc.id AS id
                   FROM
                     (
                       SELECT crcs.id_cam AS id
                       FROM mv_cron AS crcs
                       WHERE crcs.day = %(day)d
                             AND
                             (
                               (
                                 crcs.hour = %(hour)d AND range = 0 AND crcs.min <= %(min)d AND crcs.start_stop = TRUE
                               )
                               OR
                               (
                                 crcs.hour < %(hour)d AND range = 0 AND crcs.start_stop = TRUE
                               )
                             )
                       EXCEPT
                       SELECT crcd.id_cam AS id
                       FROM mv_cron AS crcd
                       WHERE crcd.day = %(day)d
                             AND
                             (
                               (
                                 crcd.hour = %(hour)d AND range = 0 AND crcd.min <= %(min)d AND crcd.start_stop = FALSE
                               )
                               OR
                               (
                                 crcd.hour < %(hour)d AND range = 0 AND crcd.start_stop = FALSE
                               )
                             )
                     ) AS crc
                     UNION 
                     SELECT crc1.id AS id
                       FROM
                         (
                           SELECT crcs.id_cam AS id
                           FROM mv_cron AS crcs
                           WHERE crcs.day = %(day)d
                                 AND
                                 (
                                   (
                                     crcs.hour = %(hour)d AND range = 1 AND crcs.min <= %(min)d AND crcs.start_stop = TRUE
                                   )
                                   OR
                                   (
                                     crcs.hour < %(hour)d AND range = 1 AND crcs.start_stop = TRUE
                                   )
                                 )
                           EXCEPT
                           SELECT crcd.id_cam AS id
                           FROM mv_cron AS crcd
                           WHERE crcd.day = %(day)d
                                 AND
                                 (
                                   (
                                     crcd.hour = %(hour)d AND range = 1 AND crcd.min <= %(min)d AND crcd.start_stop = FALSE
                                   )
                                   OR
                                   (
                                     crcd.hour < %(hour)d AND range = 1 AND crcd.start_stop = FALSE
                                   )
                                 )
                         ) AS crc1
                 ) AS c ON ca.id = c.id
                      
                    ''' % {
                        'country': country.replace("'", "''"),
                        'region': region.replace("'", "''"),
                        'device': device.replace("'", "''"),
                        'id_inf': str(block_id),
                        'day': d,
                        'hour': h,
                        'min': m,
                        'capacity': capacity
                    }
                    # stmt = await connection.prepare(q)
                    # campaigns = await stmt.fetch()
                    campaigns = await connection.fetch(q)
                    for item in campaigns:
                        campaign = {}
                        campaign['id'] = item['id']
                        campaign['id_account'] = item['id_account']
                        campaign['guid'] = item['guid']
                        campaign['name'] = item.get('name', '')
                        campaign['campaign_type'] = CampaignType(item['campaign_type'])
                        campaign['campaign_style'] = CampaignStylingType(item['campaign_style'])
                        campaign['campaign_style_logo'] = item['campaign_style_logo']
                        campaign['campaign_style_head_title'] = item['campaign_style_head_title']
                        campaign['campaign_style_button_title'] = item['campaign_style_button_title']
                        campaign['campaign_style_class'] = item['campaign_style_class']
                        campaign['campaign_style_class_recommendet'] = item['campaign_style_class_recommendet']
                        campaign['utm'] = item['utm']
                        campaign['utm_human_data'] = item['utm_human_data']
                        campaign['disable_filter'] = item['disable_filter']
                        campaign['time_filter'] = item['time_filter']
                        campaign['payment_model'] = CampaignPaymentModel(item['payment_model'])
                        campaign['lot_concurrency'] = item['lot_concurrency']
                        campaign['remarketing_type'] = CampaignRemarketingType(item['remarketing_type'])
                        campaign['recommended_algorithm'] = CampaignRecommendedAlgorithmType(
                            item['recommended_algorithm'])
                        campaign['recommended_count'] = item['recommended_count']
                        campaign['thematic_range'] = item['thematic_range']
                        campaign['click_cost'] = item['click_cost']
                        campaign['impression_cost'] = item['impression_cost']
                        offer_count = item['offer_count']
                        campaign['offer_count'] = int(offer_count) if offer_count <= 30 else 30
                        result.append(campaign)
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_campaigns')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
        return [dict(x) for x in result]

    async def get_place_offer(self, processor,
                              block_id, campaigns, capacity, index, offer_count, exclude, recursion=False):
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
                    ['(sub.id_cam = %d and sub.campaign_range_number <= %d)' % (x[0], x[1] * range_number) for x in
                     campaigns])
                async with connection.transaction():
                    q = '''
                        select * from
                        (
                        select 
                        count(id) OVER() as all_count,
                        mv_offer2block_rating.*,
                        ofrs.*
                        FROM mv_offer_place AS ofrs
                        left join mv_offer2block_rating on mv_offer2block_rating.id_offer = ofrs.id and mv_offer2block_rating.id_block = %(inf)s
                        WHERE
                        campaign_range_number < 30
                        AND ofrs.id_cam IN (%(campaigns)s)
                        AND ofrs.id NOT IN (%(exclude)s)
                        ) sub
                        where %(campaign_unique)s
                        order by sub.campaign_range_number, sub.rating desc
                        LIMIT %(capacity)d OFFSET %(offset)d;
                    ''' % {
                        'inf': str(block_id),
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
                        if processor.rating_hard_limit and rating < processor.block_rating_division:
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
                        item['token'] = str(item['id']) + str(block_id) + str(time.time()).replace('.', '')
                        result.append(item)
                    if len(result) < capacity and not recursion:
                        rec_exclude = [0]
                        rec_exclude.extend([x['id'] for x in result])
                        rec_res, rec_clean = await self.get_place_offer(processor, block_id, campaigns, capacity, 0,
                                                                        offer_count, rec_exclude, True)
                        for item in rec_res:
                            result.append(item)
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_place_offer')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
            if not clean:
                if all([item['rating'] < processor.block_rating_division for item in result]):
                    clean = True
        return result, clean

    async def get_social_offer(self, processor, block_id, campaigns, capacity, index, offer_count, exclude):
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
                            count(id) OVER() as all_count,
                            offer_social2block_rating.*,
                            ofrs.*
                            FROM mv_offer_social AS ofrs
                            left join offer_social2block_rating on offer_social2block_rating.id_offer = ofrs.id and offer_social2block_rating.id_block = %(inf)d
                            WHERE
                            campaign_range_number < 30
                            AND ofrs.id_cam IN (%(campaigns)s)
                            AND ofrs.id NOT IN (%(exclude)s)
                            ) sub
                            order by sub.campaign_range_number, sub.rating desc
                            LIMIT %(capacity)d;
                        ''' % {
                        'inf': block_id,
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
                        item['token'] = str(item['id']) + str(block_id) + str(time.time()).replace('.', '')
                        result.append(item)
                if counter_prediction < capacity:
                    clean = True
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_social_offer')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
        return result, clean

    async def get_dynamic_retargeting_offer(self, processor, block_id, campaigns, capacity, index, offer_count,
                                            exclude, raw_retargeting):
        if not campaigns:
            return [], None
        result = []
        clean = True
        async with self.pool.acquire() as connection:
            try:
                campaigns_ids = ','.join([str(x[0]) for x in campaigns])
                counter_prediction = offer_count - len(exclude)
                retargeting = ' or '.join(
                    ["ofrs.id_ret='%s'" % (str(x[1]).lower(), x[0]) for x in
                     raw_retargeting])
                if counter_prediction < capacity:
                    index = 0

                async with connection.transaction():
                    q = '''
                            select * from
                            (
                            select 
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
                            ['sub.id_cam = %d and sub.campaign_range_number <= %d' % (x[0], x[1]) for x in campaigns]),
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
                        item['token'] = str(item['id']) + str(block_id) + str(time.time()).replace('.', '')
                        result.append(item)
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_dynamic_retargeting_offer')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
        return result, clean

    async def get_account_retargeting_offer(self, processor, block_id, campaigns, capacity, index,
                                            offer_count, exclude):
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
                            ['(sub.id_cam = %d and sub.campaign_range_number <= %d) ' % (x[0], x[1]) for x in
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
                        item['token'] = str(item['id']) + str(block_id) + str(time.time()).replace('.', '')
                        result.append(item)
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_account_retargeting_offer')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
            return result, clean

    async def get_recomendet_offer(self, view, offer_ids, block_id, capacity):
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
                        item['token'] = str(item['id']) + str(block_id) + str(time.time()).replace('.', '')
                        result.append(item)
            except asyncio.CancelledError as ex:
                logger.error('CancelledError get_recomendet_offer')
            except Exception as ex:
                logger.error(exception_message(exc=str(ex)))
        return result
