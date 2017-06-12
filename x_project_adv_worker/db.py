import asyncpg


async def init_db(app):
    app.pool = await asyncpg.create_pool(dsn=app['config']['postgres']['uri'], min_size=15, max_size=30,
                                         max_cacheable_statement_size=150 * 1024)
    # app.pool = await asyncpg.create_pool(host='/var/run/postgresql/', user='dev', password='dev', database='test', min_size=15, max_size=30,
    #                                      max_cacheable_statement_size=150 * 1024)
    app.query = Query()


class Query(object):
    @staticmethod
    async def get_block(pool, block_src):
        async with pool.acquire() as connection:
            async with connection.transaction():
                stmt = await connection.prepare('''SELECT * FROM public.mv_informer where guid=$1 LIMIT 1 OFFSET 0;''')
                result = await stmt.fetchrow(block_src)
                if result:
                    return dict(result)
            return None

    @staticmethod
    async def get_campaigns(pool, block_id, block_domain, block_account):
        async with pool.acquire() as connection:
            async with connection.transaction():
                stmt = await connection.prepare('''SELECT ca.id,
                                                       ca.guid,
                                                       ca.title,
                                                       ca.project,
                                                       ca.social,
                                                       ca."showCoverage",
                                                       ca.impressions_per_day_limit,
                                                       ca.brending,
                                                       ca.recomendet_type,
                                                       ca.recomendet_count,
                                                       ca.account,
                                                       ca.retargeting,
                                                       ca.retargeting_type,
                                                       ca.offer_by_campaign_unique,
                                                       ca.unique_impression_lot,
                                                       ca.html_notification,
                                                       ca.disabled_retargiting_style,
                                                       ca.disabled_recomendet_style
                                                FROM campaign AS ca
                                                INNER JOIN (
                                                    SELECT  gt.id_cam as id  FROM geo AS gt
                                                    INNER JOIN geo_lite_city AS gtl ON gt.id_geo=gtl.id WHERE (gtl.country='UA' AND (gtl.city='NOT FOUND' OR gtl.city='*')) OR (gtl.country='*' AND gtl.city='*')
                                                    INTERSECT
                                                    SELECT  dt.id_cam as id FROM campaign2device AS dt
                                                    INNER JOIN device AS d ON dt.id_dev=d.id WHERE d.name='pc' OR d.name='**'
                                                    INTERSECT
                                                    SELECT ct.id FROM
                                                            (SELECT cau.id FROM
                                                                (
                                                                SELECT c2c.id_cam AS id
                                                                FROM campaign2categories AS c2c
                                                                INNER JOIN categories2domain AS ct2d ON c2c.id_cat=ct2d.id_cat AND ct2d.id_dom=$2
                                                                UNION
                                                                SELECT c2da.id_cam AS id
                                                                FROM campaign2domains AS c2da
                                                                WHERE (c2da.id_dom=$2 OR c2da.id_dom=1) AND c2da.allowed=TRUE
                                                                UNION
                                                                SELECT c2aa.id_cam AS id
                                                                FROM campaign2accounts AS c2aa
                                                                WHERE (c2aa.id_acc=$3 OR c2aa.id_acc=1) AND c2aa.allowed=TRUE
                                                                UNION
                                                                SELECT c2ia.id_cam AS id
                                                                FROM campaign2informer AS c2ia
                                                                WHERE (c2ia.id_inf=$1 OR c2ia.id_inf=1) AND c2ia.allowed=TRUE
                                                                ) AS cau
                                                                EXCEPT
                                                                SELECT caud.id
                                                                FROM
                                                                (
                                                                SELECT c2dd.id_cam AS id
                                                                FROM campaign2domains AS c2dd
                                                                LEFT JOIN campaign2domains AS c2dde ON c2dd.id_cam=c2dde.id_cam AND c2dde.id_dom=$2 AND c2dde.allowed=TRUE
                                                                WHERE c2dde.id_cam IS NULL AND ((c2dd.id_dom=$2 OR c2dd.id_dom=1) AND c2dd.allowed=FALSE)
                                                                UNION
                                                                SELECT c2ad.id_cam AS id
                                                                FROM campaign2accounts AS c2ad
                                                                LEFT JOIN campaign2accounts AS c2ade ON c2ad.id_cam=c2ade.id_cam AND c2ade.id_acc=$3 AND c2ade.allowed=TRUE
                                                                WHERE c2ade.id_cam IS NULL AND ((c2ad.id_acc=$3 OR c2ad.id_acc=1) AND c2ad.allowed=FALSE)
                                                                UNION
                                                                SELECT c2id.id_cam AS id
                                                                FROM campaign2informer AS c2id
                                                                LEFT JOIN campaign2informer AS c2ide ON c2id.id_cam=c2ide.id_cam AND c2ide.id_inf=$1 AND c2ide.allowed=TRUE
                                                                WHERE c2ide.id_cam IS NULL AND ((c2id.id_inf=$1 OR c2id.id_inf=1) AND c2id.allowed=FALSE)
                                                                ) AS caud
                                                            )AS ct
                                                            INTERSECT
                                                            SELECT crc.id AS id FROM
                                                            (
                                                                SELECT crcs.id_cam AS id FROM cron AS crcs
                                                                    WHERE crcs.day = 1
                                                                    AND
                                                                        (
                                                                            (
                                                                                crcs.hour = 0 AND crcs.min <= 0 AND crcs.start_stop=TRUE
                                                                            )
                                                                            OR
                                                                            (
                                                                              crcs.hour < 0 AND crcs.start_stop=TRUE
                                                                            )
                                                                        )
                                                                EXCEPT
                                                                SELECT crcd.id_cam AS id FROM cron AS crcd
                                                                    WHERE crcd.day = 1
                                                                    AND
                                                                        (
                                                                            (
                                                                                crcd.hour = 0 AND  crcd.min <= 0 AND crcd.start_stop=FALSE
                                                                            )
                                                                            OR
                                                                            (
                                                                              crcd.hour < 0 AND crcd.start_stop=FALSE
                                                                            )
                                                                        )
                                                            ) AS crc
                                                        ) AS c ON ca.id=c.id
                                                        GROUP BY ca.id;
                ''')
                result = await stmt.fetch(block_id, block_domain, block_account)
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
