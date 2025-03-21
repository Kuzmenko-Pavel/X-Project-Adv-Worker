from x_project_adv_worker.utils import Map


class AdvSetting(Map):
    def __init__(self, *args, **kwargs):
        self.width = 0
        self.height = 0
        self.top = 0
        self.left = 0
        self.border = 1
        self.border_color = '#bdbdbd'
        self.background_color = '#ffffff'
        self.opacity = 1
        self.border_radius = [5, 5, 5, 5]
        self.margin = [1, 1, 1, 1]
        self.padding = [0, 0, 0, 0]
        self.header = Map()
        self.header.width = 0
        self.header.height = 0
        self.header.top = 0
        self.header.left = 0
        self.header.z = 0
        self.header.margin = [0, 0, 0, 0]
        self.header.padding = [0, 0, 0, 0]
        self.header.background_color = 'transparent'
        self.header.opacity = 1
        self.header.border_radius = [5, 5, 5, 5]
        self.header.border = 0
        self.header.border_color = 'transparent'
        self.header.font = Map()
        self.header.font.size = 14
        self.header.font.color = '#0063C2'
        self.header.font.align = 'center'
        self.header.font.weight = True
        self.header.font.letter = 0
        self.header.font.line = 1
        self.header.font.variant = False
        self.header.font.decoration = False
        self.header.font.family = 'Arial,Helvetica,sans-serif'
        self.description = Map()
        self.description.width = 0
        self.description.height = 0
        self.description.top = 0
        self.description.left = 0
        self.description.z = 0
        self.description.margin = [0, 0, 0, 0]
        self.description.padding = [0, 0, 0, 0]
        self.description.background_color = 'transparent'
        self.description.opacity = 1
        self.description.border_radius = [5, 5, 5, 5]
        self.description.border = 0
        self.description.border_color = 'transparent'
        self.description.font = Map()
        self.description.font.size = 13
        self.description.font.color = '#3d3d45'
        self.description.font.align = 'center'
        self.description.font.weight = False
        self.description.font.letter = 0
        self.description.font.line = 1
        self.description.font.variant = False
        self.description.font.decoration = False
        self.description.font.family = 'Arial,Helvetica,sans-serif'
        self.cost = Map()
        self.cost.width = 0
        self.cost.height = 0
        self.cost.top = 0
        self.cost.left = 0
        self.cost.z = 0
        self.cost.margin = [0, 0, 0, 0]
        self.cost.padding = [0, 0, 0, 0]
        self.cost.background_color = 'transparent'
        self.cost.opacity = 1
        self.cost.border_radius = [5, 5, 5, 5]
        self.cost.border = 0
        self.cost.border_color = 'transparent'
        self.cost.font = Map()
        self.cost.font.size = 14
        self.cost.font.color = 'black'
        self.cost.font.align = 'center'
        self.cost.font.weight = False
        self.cost.font.letter = 0
        self.cost.font.line = 1
        self.cost.font.variant = False
        self.cost.font.decoration = False
        self.cost.font.family = 'Arial,Helvetica,sans-serif'
        self.button = Map()
        self.button.width = 0
        self.button.height = 0
        self.button.top = 0
        self.button.left = 0
        self.button.z = 0
        self.button.margin = [0, 0, 0, 0]
        self.button.padding = [0, 0, 0, 0]
        self.button.opacity = 1
        self.button.background_color = 'transparent'
        self.button.border = 1
        self.button.border_color = '#ffc7c7'
        self.button.border_radius = [5, 5, 5, 5]
        self.button.font = Map()
        self.button.font.size = 14
        self.button.font.color = '#991313'
        self.button.font.align = 'center'
        self.button.font.weight = False
        self.button.font.letter = 0
        self.button.font.line = 1
        self.button.font.variant = False
        self.button.font.decoration = False
        self.button.font.family = 'Arial,Helvetica,sans-serif'
        self.image = Map()
        self.image.width = 0
        self.image.height = 0
        self.image.top = 0
        self.image.left = 0
        self.image.border = 0
        self.image.border_color = 'white'
        self.image.border_radius = [5, 5, 5, 5]
        self.logo = False
        super(AdvSetting, self).__init__(*args, **kwargs)


class LogoSetting(AdvSetting):
    def __init__(self, *args, **kwargs):
        super(LogoSetting, self).__init__(*args, **kwargs)
        del self['description']
        del self['cost']
        del self['logo']
