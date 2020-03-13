__all__ = ['ProcessingData']
from x_project_adv_worker.styler import Styler
from x_project_adv_worker.data_processor.params import Params

parther_disable_hosts = ('95.69.249.86', '31.202.102.69', '46.96.41.87', '178.150.140.80', '178.151.44.122',
                         '178.133.46.212', '193.70.46.140', '217.20.169.197', '85.90.199.33', '82.207.109.122',
                         '194.6.232.174', '217.112.216.74', '194.6.233.163', '159.224.41.1', '79.171.124.172',
                         '93.76.209.138', '85.90.202.248', '82.117.232.89', '82.117.233.83', '77.111.244',
                         '77.111.245', '77.111.246', '77.111.247')


class ProcessingData(object):
    __slots__ = ['params', 'styler', 'block', 'campaigns', 'guid_block', 'block_rating_division', 'rating_hard_limit',
                 'place_branch', 'retargeting_branch', 'retargeting_account_branch', 'social_branch', 'block_button',
                 'block_ret_button', 'block_rec_button', 'id_block', 'campaigns_place', 'offer_count_place',
                 'campaigns_thematic', 'offer_count_thematic', 'campaigns_socia', 'offer_count_socia',
                 'campaigns_retargeting_account', 'offer_count_retargeting_account',
                 'campaigns_retargeting_dynamic', 'offer_count_retargeting_dynamic']

    def __init__(self, request, data):
        self.params = Params(request, data)
        self.styler = Styler(self.params)
        self.block = dict()
        self.campaigns = dict()
        self.id_block = 0
        self.guid_block = self.params.guid_block
        self.block_rating_division = 1000
        self.rating_hard_limit = False
        self.place_branch = True
        self.retargeting_branch = True
        self.retargeting_account_branch = True
        self.social_branch = True
        self.block_button = ''
        self.block_ret_button = ''
        self.block_rec_button = ''
        self.campaigns_place = list()
        self.offer_count_place = 0
        self.campaigns_thematic = list()
        self.offer_count_thematic = 0
        self.campaigns_socia = list()
        self.offer_count_socia = 0
        self.campaigns_retargeting_account = list()
        self.offer_count_retargeting_account = 0
        self.campaigns_retargeting_dynamic = list()
        self.offer_count_retargeting_dynamic = 0

    @property
    def parther(self):
        if not self.social_branch:
            try:
                if self.params.test or any(
                        [parther_disable in self.params.host for parther_disable in parther_disable_hosts]):
                    self.social_branch = True
                    return False
                return True
            except Exception as e:
                print(e)
        self.social_branch = True
        return False
