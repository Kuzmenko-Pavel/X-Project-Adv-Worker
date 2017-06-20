from math import ceil
from .adv_calculator import (adv_calculator, adv_size_calculator, logo_calculator, style_type,
                             _h_template, _h_styling_template, _v_template, _v_styling_template,
                             _h_template_ref, _h_styling_template_ref, _v_template_ref, _v_styling_template_ref,
                             _h_template_tree, _h_styling_template_tree, _v_template_tree, _v_styling_template_tree)
from .adv_settings import AdvSetting
from .block_settings import BlockSetting
from .resetter import reset
from .styles import full

reset_css = reset


class Styler():
    style_type = style_type

    def __init__(self, width, height):
        self.adv_style = {
            'Block': 'Block',
            'RetBlock': 'RetBlock',
            'RecBlock': 'RecBlock'
        }
        self.adv_data = {}
        self.logo_data = {}
        self.block = BlockSetting()
        self.block.width = width
        self.block.height = height
        self._default_size_calculate(True)

    def merge(self, data=None):
        if data is not None:
            block = BlockSetting(data['block'])
            self.block.width = block.width
            self.block.border = block.border
            self.block.border_color = block.border_color
            self.block.background_color = block.background_color
            self.block.border_radius = block.border_radius

            self.block.header.width = block.header.width
            self.block.header.height = block.header.height
            self.block.header.top = block.header.top
            self.block.header.left = block.header.left

            self.block.footer.width = block.footer.width
            self.block.footer.height = block.footer.height
            self.block.footer.top = block.footer.top
            self.block.footer.left = block.footer.left
            del self.adv_style['Block']
            self.adv_data['Block'] = AdvSetting(data['adv']['Block'])

            del self.adv_style['RetBlock']
            self.adv_data['RetBlock'] = AdvSetting(data['adv']['RetBlock'])

            del self.adv_style['RecBlock']
            self.adv_data['RecBlock'] = AdvSetting(data['adv']['RecBlock'])

            self._default_size_calculate()

    def _default_size_calculate(self, default=None):
        block_width = self.block.get_width()
        block_height = self.block.get_height()
        if block_width > 0 and block_height > 0:
            if block_height < block_width:
                if default:
                    self._h_default_size_calculate()
                self._h_styling_size_calculate()
            else:
                if default:
                    self._v_default_size_calculate()
                self._v_styling_size_calculate()

    def _h_template_calculate(self):
        block_width = int(self.block.get_width())
        block_height = int(self.block.get_height())
        idx = _h_template_tree.query_ball_point((block_width, block_height), 10)
        points = _h_template[idx]
        if points.size > 0:
            self.block.default_adv.count_column = points[0][2]['count_column']
            self.block.default_adv.count_row = points[0][2]['count_row']
            self.block.default_adv.count_adv = points[0][2]['count_row'] * points[0][2]['count_column']
            self.block.default_adv.type = points[0][2]['type']
            self.block.default_adv.width = int(block_width / self.block.default_adv.count_column)
            self.block.default_adv.height = int(block_height / self.block.default_adv.count_row)
            return True
        return False

    def _v_template_calculate(self):
        block_width = int(self.block.get_width())
        block_height = int(self.block.get_height())
        idx = _v_template_tree.query_ball_point((block_width, block_height), 10)
        points = _v_template[idx]
        if points.size > 0:
            self.block.default_adv.count_column = points[0]['count_column']
            self.block.default_adv.count_row = points[0][2]['count_row']
            self.block.default_adv.count_adv = points[0][2]['count_row'] * points[0][2]['count_column']
            self.block.default_adv.type = points[0][2]['type']
            self.block.default_adv.width = int(block_width / self.block.default_adv.count_column)
            self.block.default_adv.height = int(block_height / self.block.default_adv.count_row)
            return True
        return False

    def _h_styling_template_calculate(self):
        block_width = int(self.block.get_width())
        block_height = int(self.block.get_height())
        idx = _h_styling_template_tree.query_ball_point((block_width, block_height), 10)
        points = _h_styling_template[idx]
        if points.size > 0:
            self.block.styling_adv.count_column = points[0][2]['count_column']
            self.block.styling_adv.count_row = points[0][2]['count_row']
            self.block.styling_adv.count_adv = points[0][2]['count_row'] * points[0][2]['count_column']
            self.block.styling_adv.type = points[0][2]['type']
            self.block.styling_adv.width = int(block_width / self.block.styling_adv.count_column)
            self.block.styling_adv.height = int(block_height / self.block.styling_adv.count_row)
            return True
        return False

    def _v_styling_template_calculate(self):
        block_width = int(self.block.get_width())
        block_height = int(self.block.get_height())
        idx = _v_styling_template_tree.query_ball_point((block_width, block_height), 10)
        points = _v_styling_template[idx]
        if points.size > 0:
            self.block.styling_adv.count_column = points[0][2]['count_column']
            self.block.styling_adv.count_row = points[0][2]['count_row']
            self.block.styling_adv.count_adv = points[0][2]['count_row'] * points[0][2]['count_column']
            self.block.styling_adv.type = points[0][2]['type']
            self.block.styling_adv.width = int(block_width / self.block.styling_adv.count_column)
            self.block.styling_adv.height = int(block_height / self.block.styling_adv.count_row)
            return True
        return False

    def _h_default_size_calculate(self):
        if self._h_template_calculate():
            return
        adv_type = self.block.default_adv.type
        block_width = self.block.get_width()
        block_height = self.block.get_height()
        count_column = 1.0
        count_row = 1.0
        if 130 < block_height < 200:
            adv_height = block_height
            count_column = round(block_width / (block_height - (round(320 / block_height) * 14)))
            adv_width = block_width / count_column
            adv_type = 'V'
        else:
            if block_width > 350:
                count_column = ceil(block_width / 300.0)
            elif block_width >= 300 and block_height >= 190:
                count_column = ceil(block_width / 150.0)

            if count_column == 1.0:
                if block_height >= 300:
                    count_row = ceil(block_height / 300.0)
                elif 200 < block_height < 300:
                    count_row = round(block_height / 100.0)
            else:
                if block_height >= 300:
                    count_row = round(block_height / 100.0)
                elif 190 <= block_height < 300:
                    count_column = round(block_width / 180.0)

            adv_height = block_height / count_row
            adv_width = block_width / count_column

        if adv_height >= adv_width:
            adv_type = 'V'
        else:
            adv_type = 'G'

        self.block.default_adv.count_column = count_column
        self.block.default_adv.count_row = count_row
        self.block.default_adv.count_adv = count_row * count_column
        self.block.default_adv.type = adv_type
        self.block.default_adv.width = adv_width
        self.block.default_adv.height = adv_height

    def _h_styling_size_calculate(self):
        if self._h_styling_template_calculate():
            return
        adv_type = self.block.default_adv.type
        block_width = self.block.get_width()
        block_height = self.block.get_height()
        count_column = 1.0
        count_row = 1.0
        if 130 < block_height < 200:
            adv_height = block_height
            count_column = round(block_width / (block_height - (round(320 / block_height) * 14)))
            adv_width = block_width / count_column
        else:
            if block_width > 350:
                count_column = ceil(block_width / 300.0)
            elif block_width >= 300 and block_height >= 190:
                count_column = ceil(block_width / 150.0)

            if count_column == 1.0:
                if block_height >= 300:
                    count_row = ceil(block_height / 300.0)
                elif 200 < block_height < 300:
                    count_row = round(block_height / 100.0)
            else:
                if block_height >= 300:
                    count_row = round(block_height / 100.0)
                elif 190 <= block_height < 300:
                    count_column = round(block_width / 180.0)

            adv_height = block_height / count_row
            adv_width = block_width / count_column

        if adv_height >= adv_width:
            adv_type = 'V'
        else:
            adv_type = 'G'

        self.block.default_adv.count_column = count_column
        self.block.default_adv.count_row = count_row
        self.block.default_adv.count_adv = count_row * count_column
        self.block.default_adv.type = adv_type
        self.block.default_adv.width = adv_width
        self.block.default_adv.height = adv_height

    def _v_default_size_calculate(self):
        if self._v_template_calculate():
            return
        adv_type = self.block.default_adv.type
        block_width = self.block.get_width()
        block_height = self.block.get_height()
        count_column = ceil(block_width / 300.0)
        adv_width = block_width / count_column
        adv_count_by_width = round(block_height / (adv_width + ((round(320 / adv_width) * 14) * 2)))
        if adv_width > 200 and adv_count_by_width < 4:
            adv_type = 'G'
            adv_height = adv_size_calculator[adv_type](adv_width)

        elif 160 <= adv_width <= 200 and adv_count_by_width < 4:
            adv_type = 'GV'
            adv_height = adv_size_calculator[adv_type](adv_width)

        elif adv_width < 160 and adv_count_by_width < 4:
            adv_type = 'V'
            adv_height = adv_size_calculator[adv_type](adv_width)

        else:
            adv_type = 'BV'
            adv_height = adv_size_calculator[adv_type](adv_width)
        count_row = round(block_height / adv_height)

        while True:
            if count_row <= 0:
                count_row = 1
            new_height = count_row * adv_height
            if new_height > block_height:
                difference = (new_height - block_height) / count_row
                if round(difference) < 4:
                    adv_height = adv_height - difference
                    break
                else:
                    if adv_type in ['G', 'GV'] and (adv_height - difference > 80):
                        adv_height = adv_height - difference
                        break
                    else:
                        count_row -= 1
                        if count_row > 0:
                            adv_height = block_height / count_row
                        else:
                            adv_height = block_height
                            break
            else:
                difference = (block_height - new_height) / count_row
                if round(difference):
                    adv_height = adv_height + difference
                    break
                else:
                    if adv_type in ['GV'] and (adv_width > (adv_height + difference)):
                        adv_height = adv_height + difference
                        break
                    if adv_type in ['V', 'BV'] and difference < (round(320 / adv_width) * 14):
                        adv_height = adv_height + difference
                        break
                    break

        self.block.default_adv.count_column = count_column
        self.block.default_adv.count_row = count_row
        self.block.default_adv.count_adv = count_row * count_column
        self.block.default_adv.type = adv_type
        self.block.default_adv.width = adv_width
        self.block.default_adv.height = adv_height

    def _v_styling_size_calculate(self):
        if self._v_styling_template_calculate():
            return
        adv_type = self.block.default_adv.type
        block_width = self.block.get_width()
        block_height = self.block.get_height()
        count_column = ceil(block_width / 300.0)
        adv_width = block_width / count_column
        adv_count_by_width = round(block_height / (adv_width + ((round(320 / adv_width) * 14) * 2)))
        if adv_width > 200 and adv_count_by_width < 4:
            adv_type = 'G'
            adv_height = adv_size_calculator[adv_type](adv_width)

        elif adv_width <= 200 and adv_count_by_width < 4:
            adv_type = 'V'
            adv_height = adv_size_calculator[adv_type](adv_width)

        else:
            adv_type = 'BV'
            adv_height = adv_size_calculator[adv_type](adv_width)

        count_row = round(block_height / adv_height)

        while True:
            if count_row <= 0:
                count_row = 1
            new_height = count_row * adv_height
            if new_height > block_height:
                difference = (new_height - block_height) / count_row
                if round(difference) < 4:
                    adv_height = adv_height - difference
                    break
                else:
                    if adv_type in ['G', 'GV'] and (adv_height - difference > 80):
                        adv_height = adv_height - difference
                        break
                    else:
                        count_row -= 1
                        if count_row <= 0:
                            adv_height = block_height
                            break
                        adv_height = block_height / count_row
            else:
                difference = (block_height - new_height) / count_row
                if round(difference):
                    adv_height = adv_height + difference
                    break
                else:
                    if adv_type in ['V', 'BV'] and difference < (round(320 / adv_width) * 14):
                        adv_height = adv_height + difference
                        break
                    break

        self.block.default_adv.count_column = count_column
        self.block.default_adv.count_row = count_row
        self.block.default_adv.count_adv = count_row * count_column
        self.block.default_adv.type = adv_type
        self.block.default_adv.width = adv_width
        self.block.default_adv.height = adv_height

    def _create_variable(self):
        variable = {}

        for key, value in self.adv_style.items():
            if 'Block' in key:
                self.adv_data[key] = adv_calculator[value](self.block.get_width(),
                                                           self.block.get_height(),
                                                           self.block.default_adv)
            else:
                self.adv_data[key] = adv_calculator[value](self.block.get_width(),
                                                           self.block.get_height(),
                                                           self.block.styling_adv)

                self.logo_data[key] = logo_calculator[value](self.block.get_width(),
                                                             self.block.get_height(),
                                                             self.block.styling_adv)

        variable['main'] = self.block
        variable['adv_style'] = self.adv_data
        variable['logo_style'] = self.logo_data

        return variable

    def add(self, name, style):
        if style not in self.style_type:
            style = 'Block'
        self.adv_style[name] = style

    def __call__(self, ):
        return full.render(self._create_variable())
