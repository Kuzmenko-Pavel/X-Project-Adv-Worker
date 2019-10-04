__all__ = ['Params']
import time
import re

from x_project_adv_worker.utils import encryptDecrypt
from x_project_adv_worker.logger import logger, exception_message


ip_regex = re.compile(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$')
not_found = 'NOT FOUND'


class Params(object):
    __slots__ = ['width', 'height', 'guid_block', 'auto', 'country', 'region', 'device', 'cost', 'gender', 'index',
                 'exclude', 'is_webp', 'host', 'token', 'thematics', 'thematics_exclude',
                 'retargeting_account_exclude', 'retargeting_dynamic_exclude',
                 'raw_retargeting', 'retargeting', 'time_start', 'test', 'retargeting_list']

    def __init__(self, request, data):
        self.width = 0
        self.height = 0
        self.guid_block = ''
        self.auto = False
        self.test = False
        self.country = ''
        self.region = ''
        self.device = '**'
        self.cost = 0
        self.gender = 0
        self.index = 0
        self.is_webp = False
        self.host = '127.0.0.1'
        self.token = ''
        self.time_start = int(time.time() * 1000)
        self.exclude = list([0])
        self.thematics_exclude = list([0])
        self.retargeting_account_exclude = list([0])
        self.retargeting_dynamic_exclude = list([0])
        self.raw_retargeting = list()
        self.thematics = list()
        self.retargeting = dict()
        self.retargeting_list = list()
        try:
            self.__loads__(request, data)
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), data=data))

    def __loads__(self, request, data):
        self.width = int(float(data.get('w', self.width)))
        self.height = int(float(data.get('h', self.height)))
        self.guid_block = str(data.get('guid_block', self.guid_block))
        self.auto = bool(data.get('auto', self.auto))
        self.test = bool(data.get('test', self.test))
        self.country = str(data.get('country', self.country)).strip()
        self.region = str(data.get('region', self.region)).strip()
        self.device = str(data.get('device', self.device))
        self.cost = int(data.get('cost', self.cost))
        self.gender = int(data.get('gender', self.gender))
        self.index = int(data.get('index', self.index))
        self.is_webp = bool(data.get('is_webp', self.is_webp))
        self.time_start = int(data.get('time_start', self.time_start))

        self.exclude = [str(x) for x in data.get('exclude', []) if str(x).strip()]
        if not self.exclude:
            self.exclude = list([0])
        self.thematics_exclude = [str(x) for x in data.get('thematics_exclude', []) if str(x).strip()]
        if not self.thematics_exclude:
            self.thematics_exclude = list([0])
        self.retargeting_account_exclude = data.get('retargeting_account_exclude', [])
        if not self.retargeting_account_exclude:
            self.retargeting_account_exclude = list([0])
        self.retargeting_dynamic_exclude = data.get('retargeting_dynamic_exclude', [])
        if not self.retargeting_dynamic_exclude:
            self.retargeting_dynamic_exclude = list([0])

        self.thematics = data.get('thematics', [])
        self.raw_retargeting = data.get('retargeting', [])
        self.retargeting = dict((str(ids[1]).lower(), ids[0]) for ids in data.get('retargeting', []))

        ip = str(data.get('ip', '')).strip()
        ip_check = ip_regex.match(ip)
        if ip_check:
            ip = ip_check.group()
        else:
            ip = None

        x_real_ip = request.headers.get('X-Real-IP', request.headers.get('X-Forwarded-For', ''))
        x_real_ip_check = ip_regex.match(x_real_ip)
        if x_real_ip_check:
            x_real_ip = x_real_ip_check.group()
        else:
            x_real_ip = None

        if ip:
            self.host = ip
        elif x_real_ip:
            self.host = x_real_ip
        else:
            try:
                peername = request.transport.get_extra_info('peername')
                if peername and isinstance(peername, tuple):
                    self.host, _ = peername
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(request._message)))

        self.token = encryptDecrypt('valid', self.host)

        if not self.country:
            try:
                country_by_ip = request.app.GeoIPCountry.country_code_by_addr(self.host)
                if country_by_ip:
                    self.country = country_by_ip
                if not self.country:
                    self.country = not_found
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(request._message)))

        if not self.region:
            try:
                self.region = not_found
                region_by_ip = request.app.GeoIPCity.record_by_addr(self.host)
                if region_by_ip:
                    self.region = region_by_ip.get('region_name', not_found)
                if not self.region:
                    self.region = not_found
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(request._message)))

    def add_retargeting(self, guid, id):
        for ret_el in self.raw_retargeting:
            if guid == ret_el[1].lower():
                self.retargeting_list.append('%s::%s' % (id, ret_el[0]))
