from aiohttp import web

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
                logger.error(exception_message(exc=str(ex), request=str(request._message)))
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


def setup_middlewares(app):
    error_middleware = error_pages({404: handle_404,
                                    405: handle_405,
                                    500: handle_500})
    app.middlewares.append(error_middleware)
    app.middlewares.append(xml_http_request_middleware)
    app.middlewares.append(cors_middleware)
