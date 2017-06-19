from x_project_adv_worker.utils import Map


class BlockSetting(Map):
    def __init__(self, *args, **kwargs):
        super(BlockSetting, self).__init__(*args, **kwargs)
        self.width = 0
        self.height = 0
        self.border = 0
        self.border_color = 'white'
        self.background_color = 'transparent'
        self.border_radius = [0, 0, 0, 0]
        self.header = Map()
        self.header.width = 0
        self.header.height = 0
        self.header.top = 0
        self.header.left = 0
        self.footer = Map()
        self.footer.width = 0
        self.footer.height = 0
        self.footer.top = 0
        self.footer.left = 0
        self.default_adv = Map()
        self.styling_adv = Map()
        self.default_adv.count_column = 0
        self.default_adv.count_row = 0
        self.default_adv.count_adv = 0
        self.default_adv.width = 0
        self.default_adv.height = 0
        self.default_adv.type = None
        self.styling_adv.count_column = 0
        self.styling_adv.count_row = 0
        self.default_adv.count_adv = 0
        self.styling_adv.width = 0
        self.styling_adv.height = 0
        self.styling_adv.type = None

    def get_width(self):
        return float(self.width - self.border)

    def get_height(self):
        return float(self.height - self.border)

    def get_css(self):
