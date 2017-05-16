from aiohttp import web
import aiohttp_jinja2


class StylesView(web.View):
    async def post(self):
        temp = aiohttp_jinja2.render_string('block.html', self.request, {'text': 'Hello Aiohttp!'},
                                            app_key=aiohttp_jinja2.APP_KEY)
        print(temp)
        return web.Response(text='Hello Aiohttp!')
