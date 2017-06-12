from aiohttp import web

from .utils import encryptDecrypt


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
                override = overrides.get(ex.status)
                if override is None:
                    raise
                else:
                    return await override(request, ex)

        return middleware_handler

    return middleware


async def cors_middleware(app, handler):
    async def middleware(request):
        response = await handler(request)
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response

    return middleware

async def xml_http_request_middleware(app, handler):
    async def middleware_handler(request):
        headers = request.headers
        request.is_xml_http = bool(headers.get('X-Requested-With', False))
        return await handler(request)

    return middleware_handler


async def geoip_http_request_middleware(app, handler):
    async def middleware_handler(request):
        host = '127.0.0.1'
        not_found = 'NOT FOUND'
        ip = request.query.get('ip')
        if ip is not None:
            host = ip
        else:
            peername = request.transport.get_extra_info('peername')
            if peername is not None:
                host, _ = peername

        request.country = not_found
        request.region = not_found
        request.ip = host

        country = app.GeoIPCountry.country_code_by_addr(host)
        if country is not None:
            request.country = country

        city = app.GeoIPCity.record_by_addr(host)
        if city is not None:
            request.region = city.get('region_name', not_found)

        request.token = encryptDecrypt('valid', request.ip)

        return await handler(request)

    return middleware_handler


def setup_middlewares(app):
    error_middleware = error_pages({404: handle_404,
                                    405: handle_405,
                                    500: handle_500})
    app.middlewares.append(error_middleware)
    app.middlewares.append(xml_http_request_middleware)
    app.middlewares.append(geoip_http_request_middleware)
    app.middlewares.append(cors_middleware)
