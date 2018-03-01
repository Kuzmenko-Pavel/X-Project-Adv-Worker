__all__ = ['Params']


class Params(object):
    __slots__ = ['width', 'height', 'block_id', 'auto', 'country', 'region', 'device', 'cost', 'gender', 'index',
                 'exclude', 'is_webp', 'retargeting_account_exclude', 'retargeting_dynamic_exclude',
                 'raw_retargeting', 'retargeting']

    def __init__(self, data):
        self.width = data.get('w', 0)
        self.height = data.get('h', 0)
        self.block_id = data.get('block_id', '')
        self.auto = data.get('auto', False)
        self.country = data.get('country', 'NOT FOUND')
        self.region = data.get('region', 'NOT FOUND')
        self.device = data.get('device', '**')
        self.cost = data.get('cost', 0)
        self.gender = data.get('gender', 0)
        self.index = data.get('index', 0)
        self.is_webp = data.get('is_webp', False)

        self.exclude = data.get('exclude', [])
        # TODO fix in db query
        self.exclude.append(0)

        self.retargeting_account_exclude = data.get('retargeting_account_exclude', [])
        # TODO fix in db query
        self.retargeting_account_exclude.append(0)

        self.retargeting_dynamic_exclude = data.get('retargeting_dynamic_exclude', [])
        # TODO fix in db query
        self.retargeting_dynamic_exclude.append(0)

        self.raw_retargeting = data.get('retargeting', [])
        self.retargeting = dict((str(ids[1]).lower(), ids[0]) for ids in data.get('retargeting', []))
