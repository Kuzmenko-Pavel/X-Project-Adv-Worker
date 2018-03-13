__all__ = ['Params']
import time

from x_project_adv_worker.logger import logger, exception_message


class Params(object):
    __slots__ = ['width', 'height', 'block_id', 'auto', 'country', 'region', 'device', 'cost', 'gender', 'index',
                 'exclude', 'is_webp', 'retargeting_account_exclude', 'retargeting_dynamic_exclude',
                 'raw_retargeting', 'retargeting', 'time_start']

    def __init__(self, data):
        self.width = 0
        self.height = 0
        self.block_id = ''
        self.auto = False
        self.country = 'NOT FOUND'
        self.region = 'NOT FOUND'
        self.device = '**'
        self.cost = 0
        self.gender = 0
        self.index = 0
        self.is_webp = False
        self.time_start = int(time.time() * 1000)
        self.exclude = list([0])
        self.retargeting_account_exclude = list([0])
        self.retargeting_dynamic_exclude = list([0])
        self.raw_retargeting = list()
        self.retargeting = dict()
        try:
            self.__loads__(data)
        except Exception as ex:
            logger.error(exception_message(exc=str(ex), data=data))

    def __loads__(self, data):
        self.width = int(data.get('w', self.width))
        self.height = int(data.get('h', self.height))
        self.block_id = str(data.get('block_id', self.block_id))
        self.auto = bool(data.get('auto', self.auto))
        self.country = str(data.get('country', self.country))
        self.region = str(data.get('region', self.region))
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