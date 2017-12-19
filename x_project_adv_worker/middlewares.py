from aiohttp import hdrs, web
import time
from datetime import datetime, timedelta

from x_project_adv_worker.logger import logger, exception_message


async def handle_404(request, response):
    return web.Response(text='')


async def handle_405(request, response):
    return web.Response(text='')


async def handle_500(request, response):
    return web.Response(text='')


def error_pages(overrides):
    async def middleware(app, handler):
        async def middleware_handler(request):
            try:
                response = await handler(request)
                override = overrides.get(response.status)
                if override is None:
                    return response
                else:
                    return await override(request, response)
            except web.HTTPException as ex:
                if ex.status != 404:
                    logger.error(exception_message(exc=str(ex), request=str(request._message)))
                override = overrides.get(ex.status)
                if override is None:
                    raise
                else:
                    return await override(request, ex)

        return middleware_handler

    return middleware


async def cookie_middleware(app, handler):
    async def middleware(request):
        user_cookie_name = 'yottos_unique_id'
        expires = datetime.utcnow() + timedelta(days=365)
        user_cookie_expires = expires.strftime("%a, %d %b %Y %H:%M:%S GMT")
        user_cookie_domain = '.yottos.com'
        user_cookie_max_age = 60*60*24*365
        request.user_cookie = request.cookies.get(user_cookie_name, str(time.time()).replace('.', ''))
        response = await handler(request)
        response.set_cookie(user_cookie_name, request.user_cookie,
                            expires=user_cookie_expires,
                            domain=user_cookie_domain,
                            max_age=user_cookie_max_age)
        return response

    return middleware


async def detect_accept_middleware(app, handler):
    async def middleware(request):
        is_webp = False
        if 'webp' in request.headers.get('ACCEPT', []):
            is_webp = True
        request.webp = is_webp
        response = await handler(request)
        return response

    return middleware


async def cors_middleware(app, handler):
    async def middleware(request):
        if request.method == hdrs.METH_OPTIONS:
            response = web.Response(text='')
        else:
            response = await handler(request)
        response.headers[hdrs.ACCESS_CONTROL_ALLOW_ORIGIN] = '*'
        response.headers[hdrs.ACCESS_CONTROL_ALLOW_HEADERS] = '*'
        response.headers[hdrs.ACCESS_CONTROL_ALLOW_CREDENTIALS] = 'true'
        response.headers[hdrs.ACCESS_CONTROL_ALLOW_METHODS] = '%s %s' % (hdrs.METH_GET, hdrs.METH_POST)
        return response

    return middleware


async def csp_middleware(app, handler):
    async def middleware(request):
        csp = []
        csp_data = {
            'base-uri': ["'self'"],
            'default-src': ["'self'"],
            'img-src': ['data:', 'cdn.yottos.com'],
            'script-src': ["'nonce-2726c7f26c'", 'http://10.0.0.110:8000/'],
            'connect-src': ['http://10.0.0.110:8080/'],
            'style-src': ["'unsafe-inline'"],
            'worker-src': [],
            'frame-src': [],
            'manifest-src': [],
            'media-src': [],
            'font-src': [],
            'child-src': [],
            'form-action': [],
            'object-src': [],
            # 'plugin-types': [],
            'sandbox': ['allow-scripts', 'allow-same-origin', 'allow-popups'],
            # 'require-sri-for': ['script', 'style'],

        }
        response = await handler(request)
        for key, value in csp_data.items():
            if len(value) == 0:
                value.append("'none'")
            csp.append('%s %s' % (key, ' '.join(value)))
        # csp.append('upgrade-insecure-requests')
        csp.append('block-all-mixed-content')
        response.headers['content-security-policy'] = '; '.join(csp)
        return response

    return middleware


async def xml_http_request_middleware(app, handler):
    async def middleware_handler(request):
        headers = request.headers
        request.is_xml_http = bool(headers.get('X-Requested-With', False))
        return await handler(request)

    return middleware_handler


def setup_middlewares(app):
    error_middleware = error_pages({404: handle_404,
                                    405: handle_405,
                                    500: handle_500})
    app.middlewares.append(cookie_middleware)
    app.middlewares.append(detect_accept_middleware)
    app.middlewares.append(xml_http_request_middleware)
    app.middlewares.append(cors_middleware)
    app.middlewares.append(csp_middleware)
    app.middlewares.append(error_middleware)
