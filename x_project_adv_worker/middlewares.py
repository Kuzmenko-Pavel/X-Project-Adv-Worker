from aiohttp import web
import time
import re
from ipaddress import IPv4Address

from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.customer_ips import customer_ips


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
        ip = '127.0.0.1'
        ip_regex = re.compile(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$')
        headers = request.headers
        x_real_ip = headers.get('X-Real-IP', headers.get('X-Forwarded-For', ''))
        x_real_ip_check = ip_regex.match(x_real_ip)
        if x_real_ip_check:
            x_real_ip = x_real_ip_check.group()
        else:
            x_real_ip = None

        if x_real_ip is not None:
            ip = x_real_ip
        else:
            try:
                peername = request.transport.get_extra_info('peername')
                if peername is not None and isinstance(peername, tuple):
                    ip, _ = peername
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(request._message)))

        ip = IPv4Address(ip)
        if any([ip in x for x in customer_ips]):
            request.is_customer = True

        # user_cookie_name = 'yottos_ptl'
        # expires = datetime.utcnow() + timedelta(days=365)
        # user_cookie_expires = expires.strftime("%a, %d %b %Y %H:%M:%S GMT")
        # user_cookie_domain = '.yottos.com'
        # user_cookie_max_age = 60*60*24*365
        # cookie = request.cookies.get(user_cookie_name)
        # if cookie:
        #     request.partner_lock = True
        # else:
        #     request.partner_lock = False
        #
        # if any([x in ip for x in block_ip]):
        #     request.partner_lock = True
        #
        # referer = headers.get('Referer', '')
        # if len(referer) < 30:
        #     request.partner_lock = True

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
