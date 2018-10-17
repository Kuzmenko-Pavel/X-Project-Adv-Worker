from aiohttp import web
import ujson
import aiohttp_jinja2
from x_project_adv_worker.styler import reset_css
from x_project_adv_worker.headers import *
import random
import string


class IframesView(web.View):

    @cache(expire=3600)
    @cookie()
    @detect_webp()
    @csp()
    async def get_data(self):
        post = await self.request.post()
        query = self.request.query
        is_webp = self.request.is_webp
        cookie = self.request.user_cookie
        country = post.get('country', query.get('country', ''))
        region = post.get('region', query.get('region', ''))
        test = True if post.get('test', query.get('test', 'false')) == 'true' else False
        block_id = post.get('scr', query.get('scr', ''))
        auto = True if post.get('auto', query.get('auto', 'false')) == 'true' else False
        index = post.get('index', query.get('index', 0))
        rand = post.get('rand', query.get('rand', 0))
        origin = post.get('origin', query.get('origin', '*'))
        ip = post.get('ip', query.get('ip', ''))
        h = post.get('h', query.get('h', ''))
        w = post.get('w', query.get('w', ''))
        post_message = True if post.get('post', 'false') == 'true' else False
        rend_id = ''.join(
            random.SystemRandom().choice(string.ascii_lowercase) for _ in range(1)
        ) + ''.join(
            random.SystemRandom().choice(string.hexdigits) for _ in range(10)
        )

        data = {
            'js': ujson.dumps({
                'rend_id': rend_id,
                'block_id': block_id,
                'index': index,
                'rand': rand,
                'auto': auto,
                'country': country,
                'region': region,
                'ip': ip,
                'test': test,
                'cookie': cookie,
                'is_webp': is_webp,
                'origin': origin,
                'post': post_message,
                'w': w,
                'h': h,
                'request': 'initial'
            }),
            'rend_id': rend_id,
            'style': reset_css,
            'nonce': self.request.nonce
        }
        response = aiohttp_jinja2.render_template('block.html', self.request, data)
        return response

    async def get(self):
        return await self.get_data()

    async def post(self):
        return await self.get_data()
