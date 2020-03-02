from aiohttp import web
import time
import re

from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.customer_ips import ip_pattern


async def handle_404(request, response):
    return web.Response(text='')


async def handle_403(request, response):
    return web.Response(text='')


async def handle_405(request, response):
    return web.Response(text='')


async def handle_500(request, response):
    return web.Response(text='')


def error_pages(overrides):
    async def middleware(app, handler):
        async def middleware_handler(request):
            try:
                request.start_time = time.time()
                response = await handler(request)
                override = overrides.get(response.status)
                if override is None:
                    return response
                else:
                    return await override(request, response)
            except web.HTTPException as ex:
                if ex.status == 404:
                    pass
                    # logger.info(exception_message(exc=str(ex), request=str(request.message)))
                elif ex.status == 403:
                    logger.warning(exception_message(exc=str(ex), request=str(request.message)))
                else:
                    logger.error(exception_message(exc=str(ex), request=str(request.message)))

                override = overrides.get(ex.status)
                if override is None:
                    raise
                else:
                    return await override(request, ex)

        return middleware_handler

    return middleware


async def customer_middleware(app, handler):
    async def middleware(request):
        request.is_customer = False
        request.console_detect = False
        request.ip = '127.0.0.1'
        ip_regex = re.compile(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$')
        headers = request.headers
        x_real_ip = headers.get('X-Real-IP', headers.get('X-Forwarded-For', ''))
        x_real_ip_check = ip_regex.match(x_real_ip)
        if x_real_ip_check:
            x_real_ip = x_real_ip_check.group()
        else:
            x_real_ip = None

        if x_real_ip is not None:
            request.ip = x_real_ip
        else:
            try:
                peername = request.transport.get_extra_info('peername')
                if peername is not None and isinstance(peername, tuple):
                    request.ip, _ = peername
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(request._message)))

        cookie_name = 'yottos_customer'
        if request.cookies.get(cookie_name):
            request.is_customer = True

        cookie_name = 'yt_cd'
        if request.cookies.get(cookie_name):
            request.console_detect = True

        if not request.is_customer and not request.console_detect:
            if ip_pattern.search(request.ip) is not None:
                request.is_customer = True

        response = await handler(request)
        return response

    return middleware


def setup_middlewares(app):
    error_middleware = error_pages({404: handle_404,
                                    403: handle_403,
                                    405: handle_405,
                                    500: handle_500})
    app.middlewares.append(error_middleware)
    app.middlewares.append(customer_middleware)
