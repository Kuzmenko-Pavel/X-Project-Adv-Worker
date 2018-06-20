__all__ = ['Params']
import time
import re

from x_project_adv_worker.utils import encryptDecrypt
from x_project_adv_worker.logger import logger, exception_message


ip_regex = re.compile(r'^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$')
not_found = 'NOT FOUND'


class Params(object):
    __slots__ = ['width', 'height', 'block_id', 'auto', 'country', 'region', 'device', 'cost', 'gender', 'index',
                 'exclude', 'is_webp', 'host', 'token',
                 'retargeting_account_exclude', 'retargeting_dynamic_exclude',
                 'raw_retargeting', 'retargeting', 'time_start']

    def __init__(self, request, data):
        self.width = 0
        self.height = 0
        self.block_id = ''
        self.auto = False
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
        self.retargeting_account_exclude = list([0])
        self.retargeting_dynamic_exclude = list([0])
        self.raw_retargeting = list()
        self.retargeting = dict()
        try:
            self.__loads__(request, data)
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), data=data))

    def __loads__(self, request, data):
        self.width = int(data.get('w', self.width))
        self.height = int(data.get('h', self.height))
        self.block_id = str(data.get('block_id', self.block_id))
        self.auto = bool(data.get('auto', self.auto))
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
        self.retargeting_account_exclude = data.get('retargeting_account_exclude', [])
        if not self.retargeting_account_exclude:
            self.retargeting_account_exclude = list([0])
        self.retargeting_dynamic_exclude = data.get('retargeting_dynamic_exclude', [])
        if not self.retargeting_dynamic_exclude:
            self.retargeting_dynamic_exclude = list([0])

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
                    host, _ = peername
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(request._message)))

        self.token = encryptDecrypt('valid', self.host)

        if not self.country:
            try:
                self.country = not_found
                country_by_ip = request.app.GeoIPCountry.country_code_by_addr(self.host)
                if country_by_ip:
                    self.country = country_by_ip
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(request._message)))

        if not self.region:
            try:
                self.region = not_found
                region_by_ip = request.app.GeoIPCity.record_by_addr(self.host)
                if region_by_ip:
                    self.region = region_by_ip.get('region_name', not_found)
            except Exception as ex:
                logger.error(exception_message(exc=str(ex), request=str(request._message)))
