import asyncio
import functools
from datetime import datetime, timedelta
import time

from aiohttp import web
from aiohttp.abc import AbstractView


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
                                   max_age=user_cookie_max_age)
                return context
            return context

        return wrapped

    return wrapper
