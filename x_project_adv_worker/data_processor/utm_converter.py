__all__ = ['UtmConverter']
from urllib.parse import urlparse, urlencode, parse_qsl, urlunparse, unquote
import random


class UtmConverter:
    source = 'base'
    utm_default = 'yottos'
    utm_source = 'yottos'
    utm_campaign = 'yottos'
    utm_content = 'yottos'
    utm_medium = 'yottos'
    utm_term = 'yottos'
    utm_rand = str(random.randint(0, 1000000))

    makros = ['{source}', '{source_id}', '{source_guid}', '{campaign}', '{campaign_id}', '{campaign_guid}', '{name}',
              '{offer}', '{offer_id}', '{offer_guid}', '{rand}']

    def __init__(self, offer):
        self.url = offer['url']
        # self.id_offer
        # self.id_block
        # self.id_campaign
        # self.id_site
        # self.id_account_left
        # self.id_account_rite

    async def get_utm_source(self):
        return self.utm_source

    async def get_utm_campaign(self):
        return self.utm_campaign

    async def get_utm_medium(self):
        return self.utm_medium

    async def get_utm_term(self):
        return self.utm_term

    async def get_utm_rand(self):
        return self.utm_rand

    async def get_default_utm(self, name):
        return self.utm_default

    async def __add_makros(self, params, values):
        for key, value in params.items():
            for i in self.makros:
                value = value.replace(i, values.get(i, await self.get_default_utm(i)))
            params[key] = value
        return urlencode(params)

    def utm_exist(self, key, params):
        return key in params

    async def __add_utm(self, params, keys):
        for key, value in keys.items():
            if not self.utm_exist(key, params):
                params[key] = value
        return urlencode(params)

    async def get_makros_values(self):
        return {
            '{source}': await self.get_utm_source(),
            '{campaign}': await self.get_utm_campaign(),
            '{medium}': await self.get_utm_medium()
        }

    async def get_utm_keys(self):
        return {
            'utm_medium': await self.get_utm_medium(),
            'utm_source': await self.get_utm_source(),
            'utm_campaign': await self.get_utm_campaign(),
            'utm_content': await self.get_utm_medium(),
            'utm_term': await self.get_utm_term(),
        }

    async def __add_dynamic_param(self, url):
        try:
            values = await self.get_makros_values()
            url_parts = list(urlparse(url))
            params = dict(parse_qsl(url_parts[3]))
            if len(params) > 0:
                url_parts[3] = await self.__add_makros(params, values)

            query = dict(parse_qsl(url_parts[4]))
            if len(query) > 0:
                url_parts[4] = await self.__add_makros(query, values)
            url = urlunparse(url_parts)
        except Exception as e:
            print(e)
        return url

    async def __add_utm_param(self, url):
        try:
            keys = await self.get_utm_keys()
            url_parts = list(urlparse(url))
            params = dict(parse_qsl(url_parts[3]))
            if len(params) > 0:
                url_parts[3] = await self.__add_utm(params, keys)

            query = dict(parse_qsl(url_parts[4]))
            if len(query) > 0:
                url_parts[4] = await self.__add_utm(query, keys)
            url = urlunparse(url_parts)
        except Exception as e:
            print(e)
        return url

    @property
    async def url(self):
        url = self.url
        url = await self.__add_dynamic_param(url)
        url = await self.__add_utm_param(url)
        return url
