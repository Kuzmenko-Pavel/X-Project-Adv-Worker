from aiohttp import web
import ujson
import aiohttp_jinja2
from x_project_adv_worker.styler import reset_css
from x_project_adv_worker.headers import *
from x_project_adv_worker import __version__
import random
import string


class IframesView(web.View):

    @detect_bot()
    @not_robot()
    @cache(expire=3600)
    @cookie()
    @detect_webp()
    @csp()
    @cors()
    @console_detect_log()
    @http2_push_preload(['</v2/static/js/block.js?v=' + __version__ + '>; as=script; rel=preload;'])
    async def get_data(self):
        post = await self.request.post()
        query = self.request.query
        is_webp = self.request.is_webp
        cookie = self.request.user_cookie
        mediaQ = post.get('m', query.get('m', 'd'))
        country = post.get('country', query.get('country', ''))
        region = post.get('region', query.get('region', ''))
        test = True if post.get('test', query.get('test', 'false')) == 'true' else False
        guid_block = post.get('scr', query.get('scr', '9200beb4-b468-11e5-a497-00e081bad802'))
        auto = True if post.get('auto', query.get('auto', 'false')) == 'true' else False
        console_detect = True if post.get('cd', query.get('cd', 'true')) == 'true' else False
        is_customer = self.request.is_customer
        is_bot = self.request.bot
        debug = True if post.get('debug', query.get('debug', 'false')) == 'true' else False
        try:
            index = int(post.get('index', query.get('index', 0)))
        except Exception:
            index = 0
        rand = post.get('rand', query.get('rand', 0))
        origin = post.get('origin', query.get('origin', '*'))
        location = post.get('location', query.get('location', '*'))
        referrer = post.get('referrer', query.get('referrer', '*'))
        ip = post.get('ip', query.get('ip', ''))
        try:
            lc = post.get('lc', query.get('lc', 0))
        except Exception:
            lc = 0
        try:
            vw = post.get('vw', query.get('vw', 0))
        except Exception:
            vw = 0
        try:
            vh = post.get('vh', query.get('vh', 0))
        except Exception:
            vh = 0
        try:
            h = int(float(post.get('h', query.get('h'))))
        except Exception:
            h = 0
        try:
            w = int(float(post.get('w', query.get('w'))))
        except Exception:
            w = 0
        post_message = True if post.get('post', 'false') == 'true' else False
        rend_id = ''.join(
            random.SystemRandom().choice(string.ascii_lowercase) for _ in range(1)
        ) + ''.join(
            random.SystemRandom().choice(string.hexdigits) for _ in range(10)
        )

        if self.request.console_detect:
            console_detect = True

        if debug:
            console_detect = False
            is_customer = False
            is_bot = False

        data = {
            'js': ujson.dumps({
                'rend_id': rend_id,
                'guid_block': guid_block,
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
                'location': location,
                'referrer': referrer,
                'post': post_message,
                'w': w,
                'h': h,
                'request': 'initial',
                'debug': debug,
                'console_detect': console_detect,
                'mouse_move': False,
                'touch': False,
                'post_message': False,
                'is_customer': is_customer,
                'is_bot': is_bot,
                'mediaQ': mediaQ,
                'lc': lc,
                'vw': vw,
                'vh': vh
            }),
            'index': index,
            'version': __version__,
            'console_detect': console_detect,
            'is_customer': is_customer,
            'is_bot': is_bot,
            'rend_id': rend_id,
            'style': reset_css,
            'nonce': self.request.nonce,
            'static_hash': self.request.app.static_hash
        }
        response = aiohttp_jinja2.render_template('block.html', self.request, data)
        return response

    @not_robot()
    @cache(expire=3600)
    @csp()
    @console_detect_log()
    async def get(self):
        response = aiohttp_jinja2.render_template('empty.html', self.request, {})
        return response

    async def post(self):
        return await self.get_data()
