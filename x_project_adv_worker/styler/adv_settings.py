from x_project_adv_worker.utils import Map


class AdvSetting(Map):
    def __init__(self, *args, **kwargs):
        super(AdvSetting, self).__init__(*args, **kwargs)
        self.width = 0
        self.height = 0
        self.top = 0
        self.left = 0
        self.border = 0
        self.border_color = 'white'
        self.background_color = 'transparent'
        self.border_radius = [0, 0, 0, 0]
        self.margin = [0, 0, 0, 0]
        self.header = Map()
        self.header.width = 0
        self.header.height = 0
        self.header.top = 0
        self.header.left = 0
        self.header.font = Map()
        self.header.font.size = 10
        self.header.font.color = 'black'
        self.header.font.align = 'center'
        self.header.font.weight = 'false'
        self.header.font.letter = 'false'
        self.header.font.line = 'false'
        self.header.font.variant = 'false'
        self.header.font.decoration = 'false'
        self.description = Map()
        self.description.width = 0
        self.description.height = 0
        self.description.top = 0
        self.description.left = 0
        self.description.font = Map()
        self.description.font.size = 10
        self.description.font.color = 'black'
        self.description.font.align = 'center'
        self.description.font.weight = 'false'
        self.description.font.letter = 'false'
        self.description.font.line = 'false'
        self.description.font.variant = 'false'
        self.description.font.decoration = 'false'
        self.cost = Map()
        self.cost.width = 0
        self.cost.height = 0
        self.cost.top = 0
        self.cost.left = 0
        self.cost.font = Map()
        self.cost.font.size = 10
        self.cost.font.color = 'black'
        self.cost.font.align = 'center'
        self.cost.font.weight = 'false'
        self.cost.font.letter = 'false'
        self.cost.font.line = 'false'
        self.cost.font.variant = 'false'
        self.cost.font.decoration = 'false'
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
        self.image.border_radius = [0, 0, 0, 0]

    def to_variable(self, obj):
        result = []
        result.append('(')
        for key, value in obj.items():
            if isinstance(value, dict):
                result.append('%s: %s ,' % (key, self.to_variable(value)))
            elif isinstance(value, list):
                result.append('%s: %s ,' % (key, '(' + ','.join([str(x) for x in value]) + ')'))
            else:
                result.append('%s: %s ,' % (key, value))
        result.append(')')
        return ' \n'.join(result)

    @property
    def variable(self):
        return self.to_variable(self)
