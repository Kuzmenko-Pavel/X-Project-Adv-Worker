from x_project_adv_worker.utils import Map


class AdvSetting(Map):
    def __init__(self, *args, **kwargs):
        self.width = 0
        self.height = 0
        self.top = 0
        self.left = 0
        self.border = 1
        self.border_color = '#ffffff'
        self.background_color = '#ffffff'
        self.border_radius = [5, 5, 5, 5]
        self.margin = [1, 1, 1, 1]
        self.header = Map()
        self.header.width = 0
        self.header.height = 0
        self.header.top = 0
        self.header.left = 0
        self.header.font = Map()
        self.header.font.size = 10
        self.header.font.color = '#000000'
        self.header.font.align = 'center'
        self.header.font.weight = False
        self.header.font.letter = 0
        self.header.font.line = 1
        self.header.font.variant = False
        self.header.font.decoration = False
        self.header.font.family = 'arial, sans serif'
        self.description = Map()
        self.description.width = 0
        self.description.height = 0
        self.description.top = 0
        self.description.left = 0
        self.description.font = Map()
        self.description.font.size = 10
        self.description.font.color = 'black'
        self.description.font.align = 'center'
        self.description.font.weight = False
        self.description.font.letter = 0
        self.description.font.line = 1
        self.description.font.variant = False
        self.description.font.decoration = False
        self.description.font.family = 'arial, sans serif'
        self.cost = Map()
        self.cost.width = 0
        self.cost.height = 0
        self.cost.top = 0
        self.cost.left = 0
        self.cost.font = Map()
        self.cost.font.size = 10
        self.cost.font.color = 'black'
        self.cost.font.align = 'center'
        self.cost.font.weight = False
        self.cost.font.letter = 0
        self.cost.font.line = 1
        self.cost.font.variant = False
        self.cost.font.decoration = False
        self.cost.font.family = 'arial, sans serif'
        self.button = Map()
        self.button.width = 0
        self.button.height = 0
        self.button.top = 0
        self.button.left = 0
        self.image = Map()
        self.image.width = 0
        self.image.height = 0
        self.image.top = 0
        self.image.left = 0
        self.image.border = 0
        self.image.border_color = 'white'
        self.image.border_radius = [5, 5, 5, 5]
        super(AdvSetting, self).__init__(*args, **kwargs)
