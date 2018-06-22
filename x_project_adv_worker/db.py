import asyncpg
import asyncio
import ujson
from datetime import datetime
import time

from x_project_adv_worker.logger import logger, exception_message


async def init_db(app):
    app.pool = await asyncpg.create_pool(dsn=app['config']['postgres']['uri'], min_size=1, max_size=50,
                                         max_queries=5000, command_timeout=10, timeout=60)
    app.query = Query(app.pool)
    app.block_cache = {}


class Query(object):
    def __init__(self, pool):
        self.pool = pool

    async def get_block(self, block_src):
        async with self.pool.acquire() as connection:
            async with connection.transaction():
                q = '''SELECT * FROM public.mv_informer where guid='%(guid)s' LIMIT 1 OFFSET 0;''' % {'guid': block_src}
                stmt = await connection.prepare(q)
                block = await stmt.fetchrow(timeout=10)
                if block:
                    return dict(block)
            return None

    async def get_campaigns(self, block_id, block_domain, block_account, country, region, device, gender, cost, capacity):
        result = []
        campaigns = []
        gender_list = set('0')
        cost_list = set('0')
        gender_list.add(str(gender))
        cost_list.add(str(cost))
        date = datetime.now()
        d = date.weekday() + 1
        h = date.hour
        m = date.minute
        async with self.pool.acquire() as connection:
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
               WHERE d.name = '%(device)s' OR d.name = '**'

               INTERSECT
               SELECT t.id AS id
               FROM mv_campaign AS t
               WHERE t.gender in (%(gender)s) and t.cost in (%(cost)s) and t.capacity <= %(capacity)d

               INTERSECT
               SELECT ct.id
               FROM
                 (SELECT cau.id
                  FROM
                    (
                      SELECT c2c.id_cam AS id
                      FROM mv_campaign2categories AS c2c
                        INNER JOIN mv_categories2domain AS ct2d ON c2c.id_cat = ct2d.id_cat AND ct2d.id_dom = %(id_dom)s
                      UNION
                      SELECT c2da.id_cam AS id
                      FROM mv_campaign2domains_allowed AS c2da
                      WHERE c2da.id_dom = %(id_dom)s OR c2da.id_dom = 1
                      UNION
                      SELECT c2aa.id_cam AS id
                      FROM mv_campaign2accounts_allowed AS c2aa
                      WHERE c2aa.id_acc = %(id_acc)s OR c2aa.id_acc = 1
                      UNION
                      SELECT c2ia.id_cam AS id
                      FROM mv_campaign2informer_allowed AS c2ia
                      WHERE c2ia.id_inf = %(id_inf)s OR c2ia.id_inf = 1
                    ) AS cau
                  EXCEPT
                  SELECT caud.id
                  FROM
                    (
                      SELECT c2dd.id_cam AS id
                      FROM mv_campaign2domains_disallowed AS c2dd
                      WHERE c2dd.id_dom = %(id_dom)s OR c2dd.id_dom = 1
                      UNION
                      SELECT c2ad.id_cam AS id
                      FROM mv_campaign2accounts_disallowed AS c2ad
                      WHERE c2ad.id_acc = %(id_acc)s OR c2ad.id_acc = 1
                      UNION
                      SELECT c2id.id_cam AS id
                      FROM mv_campaign2informer_disallowed AS c2id
                      WHERE c2id.id_inf = %(id_inf)s OR c2id.id_inf = 1
                    ) AS caud
                 ) AS ct

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
                             crcs.hour = %(hour)d AND crcs.min <= %(min)d AND crcs.start_stop = TRUE
                           )
                           OR
                           (
                             crcs.hour < %(hour)d AND crcs.start_stop = TRUE
                           )
                         )
                   EXCEPT
                   SELECT crcd.id_cam AS id
                   FROM mv_cron AS crcd
                   WHERE crcd.day = %(day)d
                         AND
                         (
                           (
                             crcd.hour = %(hour)d AND crcd.min <= %(min)d AND crcd.start_stop = FALSE
                           )
                           OR
                           (
                             crcd.hour < %(hour)d AND crcd.start_stop = FALSE
                           )
                         )
                 ) AS crc
             ) AS c ON ca.id = c.id
                  
                ''' % {
                    'country': country.replace("'", "''"),
                    'region': region.replace("'", "''"),
                    'device': device.replace("'", "''"),
                    'gender': ','.join(gender_list),
                    'cost': ','.join(cost_list),
                    'id_inf': str(block_id),
                    'id_dom': str(block_domain),
                    'id_acc': str(block_account),
                    'day': d,
                    'hour': h,
                    'min': m,
                    'capacity': capacity
                }
                stmt = await connection.prepare(q)
                campaigns = await stmt.fetch(timeout=10)
        for item in campaigns:
            campaign = {}
            campaign['account'] = item['account']
            campaign['brending'] = item['brending']
            campaign['guid'] = item['guid']
            campaign['html_notification'] = item['html_notification']
            campaign['id'] = item['id']
            campaign['offer_by_campaign_unique'] = item['offer_by_campaign_unique']
            campaign['recomendet_count'] = item['recomendet_count']
            campaign['recomendet_type'] = item['recomendet_type']
            campaign['retargeting'] = item['retargeting']
            campaign['retargeting_type'] = item['retargeting_type']
            campaign['social'] = item['social']
            campaign['style_type'] = item['style_type']
            campaign['style_class'] = item['style_class']
            campaign['style_class_recommendet'] = item['style_class_recommendet']
            campaign['style_data'] = ujson.loads(item['style_data'])
            campaign['styling'] = item['styling']
            campaign['unique_impression_lot'] = item['unique_impression_lot']
            offer_count = item['offer_count']
            campaign['offer_count'] = int(offer_count) if offer_count <= 30 else 30
            result.append(campaign)
        return [dict(x) for x in result]

    async def get_place_offer(self, block_id, campaigns, capacity, index, offer_count, exclude):
        if not campaigns:
            return [], False
        result = []
        clean = True
        try:
            campaigns_ids = ','.join([str(x[0]) for x in campaigns])
            counter_prediction = offer_count-len(exclude)
            exclude_ids = ','.join([str(x) for x in exclude])
            range_number = 1
            if counter_prediction < capacity * 2:
                range_number = capacity
            if counter_prediction < capacity:
                index = 0
            campaign_unique = ' or '.join(
                ['(sub.id_cam = %d and sub.range_number <= %d)' % (x[0], x[1] * range_number) for x in campaigns])
            async with self.pool.acquire() as connection:
                async with connection.transaction():
                    q = '''
                        select * from
                        (
                        select 
                        row_number() OVER (PARTITION BY ofrs.id_cam order by mv_offer_place2informer.rating desc) AS range_number,
                        count(id) OVER() as all_count,
                        mv_offer_place2informer.*,
                        ofrs.*
                        FROM mv_offer_place AS ofrs
                        left join mv_offer_place2informer on mv_offer_place2informer.offer = ofrs.id and mv_offer_place2informer.inf = %(inf)s
                        WHERE
                        ofrs.id_cam IN (%(campaigns)s)
                        AND ofrs.id NOT IN (%(exclude)s)
                        ) sub
                        where %(campaign_unique)s
                        order by sub.range_number, sub.rating desc
                        LIMIT %(capacity)d OFFSET %(offset)d;
                    ''' % {
                        'inf': str(block_id),
                        'campaigns': campaigns_ids,
                        'exclude': exclude_ids,
                        'campaign_unique': campaign_unique,
                        'capacity': capacity * 2,
                        'offset': index * capacity
                    }
                    stmt = await connection.prepare(q)
                    offers = await stmt.fetch(timeout=10)
            for offer in offers:
                if offer['all_count'] > capacity and offer['rating']:
                    clean = False
                else:
                    clean = True
                item = {}
                item['id'] = offer['id']
                item['guid'] = offer['guid']
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
            logger.error(exception_message(exc=str(ex)))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex)))
        return result, clean

    async def get_social_offer(self, block_id, campaigns, capacity, index, offer_count, exclude):
        if not campaigns:
            return [], False
        result = []
        clean = True
        try:
            campaigns_ids = ','.join([str(x[0]) for x in campaigns])
            counter_prediction = offer_count - len(exclude)
            range_number = 1
            if counter_prediction < capacity * 2:
                range_number = capacity
            if counter_prediction < capacity:
                index = 0
            campaign_unique = ' or '.join(
                ['(sub.id_cam = %s and sub.range_number <= %d)' % (x[0], x[1] * range_number) for x in campaigns])
            async with self.pool.acquire() as connection:
                async with connection.transaction():
                    q = '''
                        select * from
                        (
                        select 
                        row_number() OVER (PARTITION BY ofrs.id_cam order by mv_offer_social2informer.rating desc) AS range_number,
                        count(id) OVER() as all_count,
                        mv_offer_social2informer.*,
                        ofrs.*
                        FROM mv_offer_social AS ofrs
                        left join mv_offer_social2informer on mv_offer_social2informer.offer = ofrs.id and mv_offer_social2informer.inf = %(inf)d
                        WHERE
                        ofrs.id_cam IN (%(campaigns)s)
                        AND ofrs.id NOT IN (%(exclude)s)
                        ) sub
                        where %(campaign_unique)s
                        order by sub.range_number, sub.rating desc
                        LIMIT %(capacity)d OFFSET %(offset)d;
                    ''' % {
                        'inf': block_id,
                        'campaigns': campaigns_ids,
                        'exclude': ','.join([str(x) for x in exclude]),
                        'campaign_unique': campaign_unique,
                        'capacity': capacity,
                        'offset': index * capacity
                    }
                    stmt = await connection.prepare(q)
                    offers = await stmt.fetch(timeout=10)
            for offer in offers:
                if clean and offer['all_count'] > capacity:
                    clean = False
                item = {}
                item['id'] = offer['id']
                item['guid'] = offer['guid']
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
            logger.error(exception_message(exc=str(ex)))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex)))
        return result, clean

    async def get_dynamic_retargeting_offer(self, block_id, campaigns, capacity, index, offer_count, exclude, raw_retargeting):
        if not campaigns:
            return [], False
        result = []
        clean = True
        try:
            campaigns_ids = ','.join([str(x[0]) for x in campaigns])
            counter_prediction = offer_count - len(exclude)
            retargeting = ' or '.join(["(ofrs.accounts_cam='%s' AND ofrs.retid='%s' )" % (str(x[1]).lower(), x[0]) for x in raw_retargeting])
            if counter_prediction < capacity:
                index = 0
            async with self.pool.acquire() as connection:
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
                        'campaign_unique': ' or '.join(['sub.id_cam = %d and sub.range_number <= %d' % (x[0], x[1]) for x in campaigns]),
                        'capacity': capacity,
                        'offset': index * capacity
                    }
                    stmt = await connection.prepare(q)
                    offers = await stmt.fetch(timeout=10)
            for offer in offers:
                clean = False
                item = {}
                item['id'] = offer['id']
                item['guid'] = offer['guid']
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
            logger.error(exception_message(exc=str(ex)))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex)))
        return result, clean

    async def get_account_retargeting_offer(self, block_id, campaigns, capacity, index, offer_count, exclude):
        if not campaigns:
            return [], False
        result = []
        clean = True
        try:
            campaigns_ids = ','.join([str(x[0]) for x in campaigns])
            counter_prediction = offer_count - len(exclude)
            if counter_prediction < capacity:
                index = 0
            async with self.pool.acquire() as connection:
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
                        ofrs.id_cam IN (%(campaigns)s)
                        AND ofrs.id NOT IN (%(exclude)s)
                        ) sub
                        where %(campaign_unique)s
                        order by sub.range_number
                        LIMIT %(capacity)d OFFSET %(offset)d;
                    ''' % {
                        'campaigns': campaigns_ids,
                        'exclude': ','.join([str(x) for x in exclude]),
                        'campaign_unique': ' or '.join(['(sub.id_cam = %d and sub.range_number <= %d) ' % (x[0], x[1]) for x in campaigns]),
                        'capacity': capacity,
                        'offset': index * capacity
                    }
                    stmt = await connection.prepare(q)
                    offers = await stmt.fetch(timeout=10)
            for offer in offers:
                if clean and offer['all_count'] > capacity:
                    clean = False
                item = {}
                item['id'] = offer['id']
                item['guid'] = offer['guid']
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
            logger.error(exception_message(exc=str(ex)))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex)))
        return result, clean

    async def get_recomendet_offer(self, loop_counter, offer_ids,  block_id, capacity, exclude):
        views = ['mv_offer_dynamic_retargeting', 'mv_offer_account_retargeting', 'mv_offer_place', 'mv_offer_social']
        if len(views) < loop_counter:
            return []
        if not offer_ids:
            return []
        result = []
        view = views[loop_counter-1]
        try:
            async with self.pool.acquire() as connection:
                async with connection.transaction():
                    q = '''
                    select * 
                    from %(view)s AS ofrs
                    WHERE ofrs.id IN (%(offer_ids)s)
                    LIMIT %(capacity)d;
                    ''' % {
                        'view': view,
                        'offer_ids': ','.join([str(x) for x in offer_ids]),
                        'capacity': capacity
                    }
                    stmt = await connection.prepare(q)
                    offers = await stmt.fetch(timeout=10)
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
            logger.error(exception_message(exc=str(ex)))
        except Exception as ex:
            logger.error(exception_message(exc=str(ex)))
        return result