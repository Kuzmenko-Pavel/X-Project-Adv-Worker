__all__ = ['UtmConverter']
from trans import trans
from urllib.parse import urlparse, urlencode, parse_qsl, urlunparse, quote
import random


class UtmConverter:
    source = 'base'
    utm_default = 'yottos'
    utm_source = 'yottos'
    utm_campaign = 'yottos'
    utm_content = 'yottos'
    utm_medium = 'cpc_yottos'
    utm_term = 'yottos'
    utm_rand = str(random.randint(0, 1000000))

    makros = ['{source}', '{source_id}', '{source_guid}', '{campaign}', '{campaign_id}', '{campaign_guid}', '{name}',
              '{offer}', '{offer_id}', '{offer_guid}', '{rand}']

    def __init__(self, offer):
        self.raw_url = offer['url']
        self.id_offer = str(offer['id'])
        self.id_block = str(offer['block']['id'])
        self.guid_block = str(offer['block']['guid'])
        self.id_campaign = str(offer['campaign']['id'])
        self.id_site = str(offer['block']['id_site'])
        self.offer_name = self.trans(str(offer['title']))
        self.site_name = self.trans(str(offer['block']['site_name']))
        self.campaign_name = self.trans(str(offer['campaign']['name']))
        self.utm = bool(offer['campaign']['utm'])
        self.utm_human_data = bool(offer['campaign']['utm_human_data'])

    @staticmethod
    def char_replace(string, chars=None, to_char=None):
        if chars is None:
            chars = [' ', '.', ',', ';', '!', '?', ':']
        if to_char is None:
            to_char = '_'
        for ch in chars:
            if ch in string:
                string = string.replace(ch, to_char)
        return string.lower()

    def trans(self, string):
        try:
            return trans(self.char_replace(string))
        except Exception:
            return string

    async def get_source(self):
        if self.utm_human_data:
            return self.site_name
        return self.guid_block

    async def get_source_id(self):
        return self.id_block

    async def get_campaign(self):
        return self.campaign_name

    async def get_campaign_id(self):
        return self.id_campaign

    async def get_offer(self):
        return self.offer_name

    async def get_offer_id(self):
        return self.id_offer

    async def get_rand(self):
        return self.utm_rand

    async def get_utm_source(self):
        return await self.get_source()

    async def get_utm_campaign(self):
        return await self.get_campaign()

    async def get_utm_content(self):
        return await self.get_offer()

    async def get_utm_medium(self):
        return self.utm_medium

    async def get_utm_term(self):
        return await self.get_source_id()

    async def get_utm_rand(self):
        return await self.get_rand()

    async def get_default_utm(self, name):
        return self.utm_default

    async def __add_makros(self, params, values):
        for key, value in params.items():
            for i in self.makros:
                value = value.replace(i, values.get(i, await self.get_default_utm(i)))
            params[key] = value
        return urlencode(params, quote_via=quote)

    def utm_exist(self, key, params):
        return key in params

    async def __add_utm(self, params, keys):
        for key, value in keys.items():
            if not self.utm_exist(key, params):
                params[key] = value
        return urlencode(params, quote_via=quote)

    async def get_makros_values(self):
        return {
            '{source}': await self.get_source(),
            '{source_id}': await self.get_source_id(),
            '{campaign}': await self.get_campaign(),
            '{campaign_id}': await self.get_campaign_id(),
            '{name}': await self.get_offer(),
            '{offer}': await self.get_offer(),
            '{offer_id}': await self.get_offer_id(),
            '{rand}': await self.get_rand()
        }

    async def get_utm_keys(self):
        return {
            'utm_medium': await self.get_utm_medium(),
            'utm_source': await self.get_utm_source(),
            'utm_campaign': await self.get_utm_campaign(),
            'utm_content': await self.get_utm_content(),
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
            url_parts[4] = await self.__add_utm(query, keys)
            url = urlunparse(url_parts)
        except Exception as e:
            print(e)
        return url

    @property
    async def url(self):
        url = await self.__add_dynamic_param(self.raw_url)
        if self.utm:
            url = await self.__add_utm_param(url)
        return url
