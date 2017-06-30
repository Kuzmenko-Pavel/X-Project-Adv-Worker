import asyncpg
from datetime import datetime


async def init_db(app):
    app.pool = await asyncpg.create_pool(dsn=app['config']['postgres']['uri'], min_size=15, max_size=30,
                                         max_cacheable_statement_size=150 * 1024)
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
                result = await stmt.fetchrow()
                if result:
                    return dict(result)
            return None

    @staticmethod
    async def get_campaigns(pool, block_id, block_domain, block_account, country, city, device, gender, cost):
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
               WHERE (gtl.country = '%(country)s' AND (gtl.city = '%(city)s' OR gtl.city = '*')) OR
                     (gtl.country = '*' AND gtl.city = '*')
                     
               INTERSECT
               SELECT dt.id_cam_pk AS id
               FROM mv_campaign2device AS dt
                 INNER JOIN mv_device AS d ON dt.id_dev_pk = d.id
               WHERE d.name = '%(device)s' OR d.name = '**'

               INTERSECT
               SELECT t.id AS id
               FROM mv_campaign AS t
               WHERE t.gender in (%(gender)s) and t.cost in (%(cost)s)

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
                    'country': country,
                    'city': city,
                    'device': device,
                    'gender': ','.join(gender_list),
                    'cost': ','.join(cost_list),
                    'id_inf': block_id,
                    'id_dom': block_domain,
                    'id_acc': block_account,
                    'day': d,
                    'hour': h,
                    'min': m
                }
                stmt = await connection.prepare(q)
                result = await stmt.fetch()
                return [dict(x) for x in result] if result else []

    @staticmethod
    async def get_place_offer(pool, campaigns, capacity):
        async with pool.acquire() as connection:
            async with connection.transaction():
                stmt = await connection.prepare('''
                SELECT *
                FROM offer_place AS ofrs
                WHERE ofrs.id_cam IN ( '''
                                                + ','.join(['%s' % x for x in campaigns]) +
                                                ''') AND ofrs.id NOT IN ('''
                                                + ','.join(['%s' % x for x in [0, ]]) +
                                                ''') AND rating > 1000  ORDER BY rating DESC LIMIT '''
                                                + str(capacity) +
                                                ''' OFFSET 0;
                                                ''')
                result = await stmt.fetch()
                return [dict(x) for x in result] if result else []

    @staticmethod
    async def get_social_offer(pool, campaigns, capacity):
        async with pool.acquire() as connection:
            async with connection.transaction():
                stmt = await connection.prepare('''
                SELECT *
                FROM offer_social AS ofrs
                WHERE ofrs.id_cam IN ( '''
                                                + ','.join(['%s' % x for x in campaigns]) +
                                                ''') AND ofrs.id NOT IN ('''
                                                + ','.join(['%s' % x for x in [0, ]]) +
                                                ''') AND rating > 1000  ORDER BY rating DESC LIMIT '''
                                                + str(capacity) +
                                                ''' OFFSET 0;
                                                ''')
                result = await stmt.fetch()
                return [dict(x) for x in result] if result else []

    @staticmethod
    async def get_dynamic_retargeting_offer(pool, campaigns, capacity):
        async with pool.acquire() as connection:
            async with connection.transaction():
                stmt = await connection.prepare('''
                SELECT *
                FROM offer_dynamic_retargeting AS ofrs
                WHERE ofrs.id_cam IN ( '''
                                                + ','.join(['%s' % x for x in campaigns]) +
                                                ''') AND ofrs.id NOT IN ('''
                                                + ','.join(['%s' % x for x in [0, ]]) +
                                                ''') LIMIT '''
                                                + str(capacity) +
                                                ''' OFFSET 0;
                                                ''')
                result = await stmt.fetch()
                return [dict(x) for x in result] if result else []

    @staticmethod
    async def get_account_retargeting_offer(pool, campaigns, capacity):
        async with pool.acquire() as connection:
            async with connection.transaction():
                stmt = await connection.prepare('''
                                SELECT *
                                FROM offer_account_retargeting AS ofrs
                                WHERE ofrs.id_cam IN ( '''
                                                + ','.join(['%s' % x for x in campaigns]) +
                                                ''') AND ofrs.id NOT IN ('''
                                                + ','.join(['%s' % x for x in [0, ]]) +
                                                ''') LIMIT '''
                                                + str(capacity) +
                                                ''' OFFSET 0;
                                                ''')
                result = await stmt.fetch()
                return [dict(x) for x in result] if result else []
