from x_project_adv_worker.utils import Map


class AdvSetting(Map):
    def __init__(self, *args, **kwargs):
        super(AdvSetting, self).__init__(*args, **kwargs)
        self.width = 0
        self.height = 0
        self.border = 0
        self.border_color = 'white'
        self.background_color = 'tran'
        self.border_radius = [0, 0, 0, 0]
        self.margin = [0, 0, 0, 0]
        self.header = Map()
        self.header.width = 0
        self.header.height = 0
        self.description = Map()
        self.description.width = 0
        self.description.height = 0
        self.cost = Map()
        self.cost.width = 0
        self.cost.height = 0
        self.button = Map()
        self.button.width = 0
        self.button.height = 0
        self.image = Map()
        self.image.width = 0
        self.image.height = 0

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
