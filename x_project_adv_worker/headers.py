__all__ = ['cookie', 'csp', 'detect_webp', 'xml_http_request', 'cors', 'detect_device', 'cache', 'http2_push_preload',
           'not_robot', 'detect_bot', 'console_detect_log']
import asyncio
import functools
import time
from datetime import datetime, timedelta
from uuid import uuid4

from aiohttp import web, hdrs
from aiohttp.abc import AbstractView

from x_project_adv_worker import __version__
from x_project_adv_worker.user_agents import simple_parse


def cookie(name='yottos_unique_id', domain='.yottos.com', days=365):
    def wrapper(func):
        @asyncio.coroutine
        @functools.wraps(func)
        def wrapped(*args):
            expires = datetime.utcnow() + timedelta(days=days)
            user_cookie_expires = expires.strftime("%a, %d %b %Y %H:%M:%S GMT")
            user_cookie_max_age = 60 * 60 * 24 * days
            # Supports class based views see web.View
            if isinstance(args[0], AbstractView):
                request = args[0].request
            else:
                request = args[-1]
            user_cookie = request.cookies.get(name, str(time.time()).replace('.', ''))
            if isinstance(args[0], AbstractView):
                args[0].request.user_cookie = user_cookie
            else:
                args[-1].user_cookie = user_cookie
            if asyncio.iscoroutinefunction(func):
                coro = func
            else:
                coro = asyncio.coroutine(func)
            context = yield from coro(*args)
            if isinstance(context, web.StreamResponse):
                context.set_cookie(name, user_cookie,
                                   expires=user_cookie_expires,
                                   domain=domain,
                                   secure=True,
                                   max_age=user_cookie_max_age)
                try:
                    context._cookies[name]['samesite'] = None
                except Exception:
                    pass
            return context

        return wrapped

    return wrapper


def csp():
    def wrapper(func):
        @asyncio.coroutine
        @functools.wraps(func)
        def wrapped(*args):
            if isinstance(args[0], AbstractView):
                request = args[0].request
            else:
                request = args[-1]
            nonce = uuid4().hex
            request.nonce = nonce
            host = request.host
            csp = []
            csp_data = {
                'base-uri': [host],
                'default-src': [host],
                'img-src': ['cdn.yottos.com',
                            '*.yottos.com',
                            "'self'",
                            "data:"],
                'script-src': ["'unsafe-inline'",
                               "'self'",
                               'cdn.yottos.com',
                               '*.yottos.com',
                               "'nonce-%s'" % nonce, host],
                'connect-src': [host],
                'style-src': ["'unsafe-inline'"],
                'worker-src': [host],
                'frame-src': [host, '*'],
                'manifest-src': [host],
                'media-src': [],
                'font-src': [],
                'child-src': [host],
                'form-action': [host],
                'object-src': [],
                'sandbox': ['allow-scripts', 'allow-same-origin', 'allow-forms', 'allow-popups',
                            'allow-popups-to-escape-sandbox', 'allow-top-navigation',
                            'allow-top-navigation-by-user-activation'],
                # 'require-sri-for': ['script']

            }
            if request.app['config']['debug']['console']:
                csp_data['script-src'].append("'self'")
                csp_data['style-src'].append("'self'")
                csp_data['img-src'].append("'self'")
            if asyncio.iscoroutinefunction(func):
                coro = func
            else:
                coro = asyncio.coroutine(func)
            context = yield from coro(*args)
            if isinstance(context, web.StreamResponse):
                for key, value in csp_data.items():
                    if len(value) == 0:
                        value.append("'none'")
                    csp.append('%s %s' % (key, ' '.join(value)))
                csp.append('block-all-mixed-content')
                context.headers['content-security-policy'] = '; '.join(csp)
                return context
            return context

        return wrapped

    return wrapper


def detect_webp():
    def wrapper(func):
        @asyncio.coroutine
        @functools.wraps(func)
        def wrapped(*args):
            if isinstance(args[0], AbstractView):
                args[0].request.is_webp = 'webp' in args[0].request.headers.get('ACCEPT', [])
            else:
                args[-1].is_webp = 'webp' in args[-1].headers.get('ACCEPT', [])
            if asyncio.iscoroutinefunction(func):
                coro = func
            else:
                coro = asyncio.coroutine(func)
            context = yield from coro(*args)
            return context

        return wrapped

    return wrapper


def xml_http_request():
    def wrapper(func):
        @asyncio.coroutine
        @functools.wraps(func)
        def wrapped(*args):
            if isinstance(args[0], AbstractView):
                request = args[0].request
            else:
                request = args[-1]
            is_xml_http = bool(request.headers.get('X-Requested-With', False))
            if is_xml_http and request.can_read_body:
                if asyncio.iscoroutinefunction(func):
                    coro = func
                else:
                    coro = asyncio.coroutine(func)
                context = yield from coro(*args)
                return context
            else:
                raise web.HTTPForbidden()

        return wrapped

    return wrapper


def cors(allow_origin=None, allow_headers=None):
    def wrapper(func):
        @asyncio.coroutine
        @functools.wraps(func)
        def wrapped(*args):
            ao = allow_origin
            ah = allow_headers
            if isinstance(args[0], AbstractView):
                request = args[0].request
            else:
                request = args[-1]

            if ao is None:
                host = request.host
                scheme = request.scheme
                if 'yottos.com' in host:
                    scheme = 'https'
                ao = '%s//:%s' % (scheme, host)
            if ah is None:
                ah = request.method

            if asyncio.iscoroutinefunction(func):
                coro = func
            else:
                coro = asyncio.coroutine(func)
            context = yield from coro(*args)
            if isinstance(context, web.StreamResponse):
                context.headers[hdrs.ACCESS_CONTROL_ALLOW_ORIGIN] = ao
                context.headers[hdrs.ACCESS_CONTROL_ALLOW_HEADERS] = ah
                context.headers[hdrs.ACCESS_CONTROL_ALLOW_CREDENTIALS] = 'true'
                context.headers[hdrs.ACCESS_CONTROL_ALLOW_METHODS] = '%s %s' % (hdrs.METH_GET, hdrs.METH_POST)
            return context

        return wrapped

    return wrapper


def http2_push_preload(links=None):
    def wrapper(func):
        @asyncio.coroutine
        @functools.wraps(func)
        def wrapped(*args):
            name = 'bhpp'
            domain = 'rg.yottos.com'
            days = 30
            expires = datetime.utcnow() + timedelta(days=days)
            user_cookie_expires = expires.strftime("%a, %d %b %Y %H:%M:%S GMT")
            user_cookie_max_age = 60 * 60 * 24 * days
            if isinstance(args[0], AbstractView):
                request = args[0].request
            else:
                request = args[-1]
            user_cookie = request.cookies.get(name)
            if asyncio.iscoroutinefunction(func):
                coro = func
            else:
                coro = asyncio.coroutine(func)
            context = yield from coro(*args)
            if isinstance(context, web.StreamResponse):
                if links and user_cookie != __version__:
                    context.headers[hdrs.LINK] = '%s' % ','.join(links)

                context.set_cookie(name, __version__,
                                   expires=user_cookie_expires,
                                   domain=domain,
                                   secure=True,
                                   max_age=user_cookie_max_age)
                try:
                    context._cookies[name]['samesite'] = None
                except Exception:
                    pass
            return context

        return wrapped

    return wrapper


def detect_device():
    def wrapper(func):
        @asyncio.coroutine
        @functools.wraps(func)
        def wrapped(*args):
            if isinstance(args[0], AbstractView):
                args[0].request.device = simple_parse(args[0].request.headers.get(hdrs.USER_AGENT, ''))
            else:
                args[-1].device = simple_parse(args[-1].headers.get(hdrs.USER_AGENT, ''))

            if asyncio.iscoroutinefunction(func):
                coro = func
            else:
                coro = asyncio.coroutine(func)

            context = yield from coro(*args)
            return context

        return wrapped

    return wrapper


def cache(expire):
    def wrapper(func):
        @asyncio.coroutine
        @functools.wraps(func)
        def wrapped(*args):
            if asyncio.iscoroutinefunction(func):
                coro = func
            else:
                coro = asyncio.coroutine(func)
            context = yield from coro(*args)
            if isinstance(context, web.StreamResponse):
                context.headers[hdrs.CACHE_CONTROL] = 'max-age=%s' % str(expire)
            return context

        return wrapped

    return wrapper


def not_robot():
    def wrapper(func):
        @asyncio.coroutine
        @functools.wraps(func)
        def wrapped(*args):
            if asyncio.iscoroutinefunction(func):
                coro = func
            else:
                coro = asyncio.coroutine(func)
            context = yield from coro(*args)
            if isinstance(context, web.StreamResponse):
                context.headers['X-Robots-Tag'] = 'noindex, nofollow, noarchive, notranslate, noimageindex'
                context.headers['Accept-CH'] = 'device-memory, dpr, width, viewport-width, rtt, downlink, ect'
                context.headers['Accept-CH-Lifetime'] = '31536000'
                context.headers['Referrer-Policy'] = 'origin'
                return context
            return context

        return wrapped

    return wrapper


def detect_bot():
    def wrapper(func):
        @asyncio.coroutine
        @functools.wraps(func)
        def wrapped(*args):
            if isinstance(args[0], AbstractView):
                args[0].request.bot = simple_parse(args[0].request.headers[hdrs.USER_AGENT]) == 'bt'
            else:
                args[-1].bot = simple_parse(args[-1].headers[hdrs.USER_AGENT]) == 'bt'

            if asyncio.iscoroutinefunction(func):
                coro = func
            else:
                coro = asyncio.coroutine(func)

            context = yield from coro(*args)
            return context

        return wrapped

    return wrapper


def console_detect_log():
    def wrapper(func):
        @asyncio.coroutine
        @functools.wraps(func)
        def wrapped(*args):
            if isinstance(args[0], AbstractView):
                request = args[0].request
                if request.console_detect:
                    if len(args[0].request.app.block_ip_cache) > 1000:
                        args[0].request.app.block_ip_cache = {}
                    args[0].request.app.block_ip_cache[request.ip] = True
                else:
                    if args[0].request.app.block_ip_cache.get(request.ip):
                        args[0].request.console_detect = True

            else:
                request = args[-1]
                if request.console_detect:
                    if len(args[-1].app.block_ip_cache) > 1000:
                        args[-1].app.block_ip_cache = {}
                    args[-1].app.block_ip_cache[request.ip] = True
                else:
                    if args[-1].app.block_ip_cache.get(request.ip):
                        args[-1].console_detect = True

            if asyncio.iscoroutinefunction(func):
                coro = func
            else:
                coro = asyncio.coroutine(func)

            context = yield from coro(*args)
            return context

        return wrapped

    return wrapper
