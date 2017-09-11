import asyncpg
import ujson
from datetime import datetime
import time


async def init_db(app):
    app.pool = await asyncpg.create_pool(dsn=app['config']['postgres']['uri'], min_size=3, max_size=30,
                                         max_queries=5000, command_timeout=10, timeout=60)
    # Example for unix socket connection
    # app.pool = await asyncpg.create_pool(host='/var/run/postgresql/', user='dev', password='dev', database='test',
    #                                      min_size=15, max_size=30, max_cacheable_statement_size=150 * 1024)
    app.query = Query()


class Query(object):
    @staticmethod
    async def get_block(pool, block_src):
        async with pool.acquire() as connection:
            async with connection.transaction():
                q = '''SELECT * FROM public.mv_informer where guid='%(guid)s' LIMIT 1 OFFSET 0;''' % {'guid': block_src}
                stmt = await connection.prepare(q)
                block = await stmt.fetchrow(timeout=1)
                if block:
                    return dict(block)
            return None

    @staticmethod
    async def get_campaigns(pool, block_id, block_domain, block_account, country, region, device, gender, cost, capacity):
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
        async with pool.acquire() as connection:
            async with connection.transaction():
                q = '''
    SELECT
ca.*
FROM mv_campaign AS ca
  INNER JOIN (
               SELECT gt.id_cam_pk AS id
               FROM mv_geo AS gt
                 INNER JOIN mv_geo_lite_city AS gtl ON gt.id_geo_pk = gtl.id
               WHERE (gtl.country = '%(country)s' AND (gtl.city = '%(region)s' OR gtl.city = '*')) OR
                     (gtl.country = '*' AND gtl.city = '*')
                     
               INTERSECT
               SELECT dt.id_cam_pk AS id
               FROM mv_campaign2device AS dt
                 INNER JOIN mv_device AS d ON dt.id_dev_pk = d.id
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
                      SELECT c2c.id_cam_pk AS id
                      FROM mv_campaign2categories AS c2c
                        INNER JOIN mv_categories2domain AS ct2d ON c2c.id_cat_pk = ct2d.id_cat_pk AND ct2d.id_dom_pk = %(id_dom)d
                      UNION
                      SELECT c2da.id_cam AS id
                      FROM mv_campaign2domains AS c2da
                      WHERE (c2da.id_dom = %(id_dom)d OR c2da.id_dom = 1) AND c2da.allowed = TRUE
                      UNION
                      SELECT c2aa.id_cam AS id
                      FROM mv_campaign2accounts AS c2aa
                      WHERE (c2aa.id_acc = %(id_acc)d OR c2aa.id_acc = 1) AND c2aa.allowed = TRUE
                      UNION
                      SELECT c2ia.id_cam AS id
                      FROM mv_campaign2informer AS c2ia
                      WHERE (c2ia.id_inf = %(id_inf)d OR c2ia.id_inf = 1) AND c2ia.allowed = TRUE
                    ) AS cau
                  EXCEPT
                  SELECT caud.id
                  FROM
                    (
                      SELECT c2dd.id_cam AS id
                      FROM mv_campaign2domains AS c2dd
                        LEFT JOIN mv_campaign2domains AS c2dde
                          ON c2dd.id_cam = c2dde.id_cam AND c2dde.id_dom = %(id_dom)d AND c2dde.allowed = TRUE
                      WHERE c2dde.id_cam IS NULL AND ((c2dd.id_dom = %(id_dom)d OR c2dd.id_dom = 1) AND c2dd.allowed = FALSE)
                      UNION
                      SELECT c2ad.id_cam AS id
                      FROM mv_campaign2accounts AS c2ad
                        LEFT JOIN mv_campaign2accounts AS c2ade
                          ON c2ad.id_cam = c2ade.id_cam AND c2ade.id_acc = %(id_acc)d AND c2ade.allowed = TRUE
                      WHERE c2ade.id_cam IS NULL AND ((c2ad.id_acc = %(id_acc)d OR c2ad.id_acc = 1) AND c2ad.allowed = FALSE)
                      UNION
                      SELECT c2id.id_cam AS id
                      FROM mv_campaign2informer AS c2id
                        LEFT JOIN mv_campaign2informer AS c2ide
                          ON c2id.id_cam = c2ide.id_cam AND c2ide.id_inf = %(id_inf)d AND c2ide.allowed = TRUE
                      WHERE c2ide.id_cam IS NULL AND ((c2id.id_inf = %(id_inf)d OR c2id.id_inf = 1) AND c2id.allowed = FALSE)
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
                    'id_inf': block_id,
                    'id_dom': block_domain,
                    'id_acc': block_account,
                    'day': d,
                    'hour': h,
                    'min': m,
                    'capacity': capacity
                }
                stmt = await connection.prepare(q)
                campaigns = await stmt.fetch(timeout=5)
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
            result.append(campaign)
        return [dict(x) for x in result]

    @staticmethod
    async def get_place_offer(pool, block_id, campaigns, capacity, exclude):
        result = []
        offers = []
        clean = True
        async with pool.acquire() as connection:
            async with connection.transaction():
                campaigns_ids = ','.join([str(x[0]) for x in campaigns])
                exclude_ids = ','.join([str(x) for x in exclude])
                campaign_unique = ' or '.join(['sub.id_cam = %d and sub.range_number <= %d' % (x[0], x[1]) for x in campaigns])
                q = '''
                    select * from
                    (
                    select 
                    row_number() OVER (PARTITION BY ofrs.id_cam order by mv_offer_place2informer.rating desc) AS range_number,
                    count(id) OVER() as all_count,
                    mv_offer_place2informer.*,
                    ofrs.*
                    FROM mv_offer_place AS ofrs
                    left join mv_offer_place2informer on mv_offer_place2informer.offer = ofrs.id and mv_offer_place2informer.inf = %(inf)d
                    WHERE
                    ofrs.id_cam IN (%(campaigns)s)
                    AND ofrs.id NOT IN (%(exclude)s)
                    ) sub
                    where %(campaign_unique)s
                    order by sub.range_number, sub.rating desc
                    LIMIT %(capacity)d OFFSET 0;
                ''' % {
                    'inf': block_id,
                    'campaigns': campaigns_ids,
                    'exclude': exclude_ids,
                    'campaign_unique': campaign_unique,
                    'capacity': capacity
                }
                stmt = await connection.prepare(q)
                offers = await stmt.fetch(timeout=1)
        for offer in offers:
            if clean and offer['all_count'] > capacity:
                clean = False
            item = {}
            item['id'] = offer['id']
            item['guid'] = offer['guid']
            item['id_cam'] = offer['id_cam']
            item['image'] = offer['image']
            item['description'] = offer['description']
            item['url'] = offer['url']
            item['title'] = offer['title']
            item['price'] = offer['price']
            item['recommended'] = []
            if offer['recommended']:
                for rec in ujson.loads(offer['recommended']):
                    rec['token'] = str(rec['id']) + str(block_id) + str(time.time()).replace('.', '')
                    item['recommended'].append(rec)
            item['token'] = str(item['id']) + str(block_id) + str(time.time()).replace('.', '')
            result.append(item)
        return result, clean

    @staticmethod
    async def get_social_offer(pool, block_id, campaigns, capacity, exclude):
        result = []
        offers = []
        clean = True
        async with pool.acquire() as connection:
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
                    LIMIT %(capacity)d OFFSET 0;
                ''' % {
                    'inf': block_id,
                    'campaigns': ','.join([str(x[0]) for x in campaigns]),
                    'exclude': ','.join([str(x) for x in exclude]),
                    'campaign_unique': ' or '.join(['sub.id_cam = %d and sub.range_number <= %d' % (x[0], x[1]) for x in campaigns]),
                    'capacity': capacity
                }
                stmt = await connection.prepare(q)
                offers = await stmt.fetch(timeout=1)
        for offer in offers:
            if clean and offer['all_count'] > capacity:
                clean = False
            item = {}
            item['id'] = offer['id']
            item['guid'] = offer['guid']
            item['id_cam'] = offer['id_cam']
            item['image'] = offer['image']
            item['description'] = offer['description']
            item['url'] = offer['url']
            item['title'] = offer['title']
            item['price'] = offer['price']
            item['recommended'] = []
            if offer['recommended']:
                for rec in ujson.loads(offer['recommended']):
                    rec['token'] = str(rec['id']) + str(block_id) + str(time.time()).replace('.', '')
                    item['recommended'].append(rec)

            item['token'] = str(item['id']) + str(block_id) + str(time.time()).replace('.', '')
            result.append(item)
        return result, clean

    @staticmethod
    async def get_dynamic_retargeting_offer(pool, block_id, campaigns, capacity, exclude, raw_retargeting):
        result = []
        offers = []
        clean = True
        async with pool.acquire() as connection:
            async with connection.transaction():
                retargeting = ' or '.join(["(ofrs.accounts_cam='%s' AND ofrs.retid='%s' )" % (str(x[1]).lower(), x[0]) for x in raw_retargeting])
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
                    LIMIT %(capacity)d OFFSET 0;
                ''' % {
                    'campaigns': ','.join([str(x[0]) for x in campaigns]),
                    'exclude': ','.join([str(x) for x in exclude]),
                    'retargeting': retargeting,
                    'campaign_unique': ' or '.join(['sub.id_cam = %d and sub.range_number <= %d' % (x[0], x[1]) for x in campaigns]),
                    'capacity': capacity
                }
                stmt = await connection.prepare(q)
                offers = await stmt.fetch(timeout=1)
        for offer in offers:
            clean = False
            item = {}
            item['id'] = offer['id']
            item['guid'] = offer['guid']
            item['id_cam'] = offer['id_cam']
            item['image'] = offer['image']
            item['description'] = offer['description']
            item['url'] = offer['url']
            item['title'] = offer['title']
            item['price'] = offer['price']
            item['recommended'] = []
            if offer['recommended']:
                for rec in ujson.loads(offer['recommended']):
                    rec['token'] = str(rec['id']) + str(block_id) + str(time.time()).replace('.', '')
                    item['recommended'].append(rec)
            item['token'] = str(item['id']) + str(block_id) + str(time.time()).replace('.', '')
            result.append(item)
        return result, clean

    @staticmethod
    async def get_account_retargeting_offer(pool, block_id, campaigns, capacity, exclude):
        result = []
        offers = []
        clean = True
        async with pool.acquire() as connection:
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
                    LIMIT %(capacity)d OFFSET 0;
                ''' % {
                    'campaigns': ','.join([str(x[0]) for x in campaigns]),
                    'exclude': ','.join([str(x) for x in exclude]),
                    'campaign_unique': ' or '.join(['sub.id_cam = %d and sub.range_number <= %d' % (x[0], x[1]) for x in campaigns]),
                    'capacity': capacity
                }
                stmt = await connection.prepare(q)
                offers = await stmt.fetch(timeout=1)
        for offer in offers:
            if clean and offer['all_count'] > capacity:
                clean = False
            item = {}
            item['id'] = offer['id']
            item['guid'] = offer['guid']
            item['id_cam'] = offer['id_cam']
            item['image'] = offer['image']
            item['description'] = offer['description']
            item['url'] = offer['url']
            item['title'] = offer['title']
            item['price'] = offer['price']
            item['recommended'] = []
            if offer['recommended']:
                for rec in ujson.loads(offer['recommended']):
                    rec['token'] = str(rec['id']) + str(block_id) + str(time.time()).replace('.', '')
                    item['recommended'].append(rec)
            item['token'] = str(item['id']) + str(block_id) + str(time.time()).replace('.', '')
            result.append(item)
        return result, clean
