from math import ceil

import sass

from .adv_calculator import adv_calculator, adv_size_calculator, logo_calculator, style_type
from .adv_settings import AdvSetting
from .block_settings import BlockSetting
from .resetter import reset
from .styles import full

reset_css = sass.compile(string=reset, output_style='compressed')


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
        self._default_size_calculate()

    def _default_size_calculate(self):
        block_width = self.block.get_width()
        block_height = self.block.get_height()
        if block_height < block_width:
            self._h_default_size_calculate()
            self._h_styling_size_calculate()
        else:
            self._v_default_size_calculate()
            self._v_styling_size_calculate()

    def _h_default_size_calculate(self):
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
            count_row = 1.0
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
        return adv_width, adv_height

    def _h_styling_size_calculate(self):
        self._h_default_size_calculate()

    def _v_default_size_calculate(self):
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
                        adv_height = block_height / count_row
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

        adv_count = round(block_height / adv_height)
        while True:
            new_height = adv_count * adv_height
            if new_height > block_height:
                difference = (new_height - block_height) / adv_count
                if round(difference) < 4:
                    adv_height = adv_height - difference
                    break
                else:
                    if adv_type in ['G', 'GV'] and (adv_height - difference > 80):
                        adv_height = adv_height - difference
                        break
                    else:
                        adv_count -= 1
                        if adv_count <= 0:
                            adv_height = block_height
                            break
                        adv_height = block_height / adv_count
            else:
                difference = (block_height - new_height) / adv_count
                if round(difference):
                    adv_height = adv_height + difference
                    break
                else:
                    if adv_type in ['V', 'BV'] and difference < (round(320 / adv_width) * 14):
                        adv_height = adv_height + difference
                        break
                    break

        self.block.default_adv.count_column = count_column
        self.block.default_adv.type = adv_type
        self.block.default_adv.width = adv_width
        self.block.default_adv.height = adv_height

    def _create_variable(self):
        variable = []
        for key, value in self.adv_style.items():
            if 'Block' in key:
                self.adv_data[key] = adv_calculator[value](self.block.default_adv.type,
                                                           self.block.default_adv.width,
                                                           self.block.default_adv.height)
            else:
                self.adv_data[key] = adv_calculator[value](self.block.styling_adv.type,
                                                           self.block.styling_adv.width,
                                                           self.block.styling_adv.height)

                self.logo_data[key] = logo_calculator[value](self.block.styling_adv.type,
                                                             self.block.styling_adv.width,
                                                             self.block.styling_adv.height)
        variable.append(
            '''
            $width: %s;
            $height: %s;
            $border: %s;
            $border_color: %s;
            $background_color: %s;
            $border_radius: %s;
            $adv-style: ();
            $logo-style: ();
            ''' % (
                self.block.width,
                self.block.height,
                self.block.border,
                self.block.border_color,
                self.block.background_color,
                ','.join(str(x) for x in self.block.border_radius)
            )
        )
        variable.append('$adv-style: (')
        adv = []
        for key, value in self.adv_data.items():
            adv.append('%s: %s' % (key, value.variable))
        variable.append(',\n'.join(adv))
        variable.append(');')

        variable.append('$logo-style: (')
        logo = []
        for key, value in self.logo_data.items():
            logo.append('%s: %s' % (key, value.variable))
        variable.append(',\n'.join(adv))
        variable.append(');')

        return ' '.join(variable)

    def add(self, name, style):
        if style not in self.style_type:
            style = 'Block'
        self.adv_style[name] = style

    def __call__(self, ):
        variable = self._create_variable()
        print(variable)
        css = sass.compile(string=' '.join([variable, full]), output_style='compressed')
        print(css)
        return css
