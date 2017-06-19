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
        self._default_size_calculate(True)

    @staticmethod
    def __to_int(val):
        if val is None:
            val = 0
        elif isinstance(val, str):
            if val == 'auto':
                val = 0
            else:
                val = int(val.replace('px', ''))
        return val

    @staticmethod
    def __to_color(val):
        if isinstance(val, str) and len(val) == 6:
            val = '#' + val
        else:
            val = '#ffffff'
        return val

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

    def merge(self, data=None):
        if data is not None:
            self.block.width = self.__to_int(data.get('Main', {}).get('width'))
            self.block.height = self.__to_int(data.get('Main', {}).get('height'))
            self.block.border = self.__to_int(data.get('Main', {}).get('borderWidth'))
            self.block.border_color = self.__to_color(data.get('Main', {}).get('borderColor'))
            background_color_transparent = data.get('Main', {}).get('backgroundColorStatus', True)
            self.block.background_color = 'transparent' if background_color_transparent else self.__to_color(
                data.get('Main', {}).get('backgroundColor')
            )
            self.block.border_radius = [
                self.__to_int(data.get('Main', {}).get('border_top_left_radius')),
                self.__to_int(data.get('Main', {}).get('border_top_right_radius')),
                self.__to_int(data.get('Main', {}).get('border_bottom_right_radius')),
                self.__to_int(data.get('Main', {}).get('border_bottom_left_radius'))
            ]

            self.block.header.width = self.__to_int(data.get('MainHeader', {}).get('width'))
            self.block.header.height = self.__to_int(data.get('MainHeader', {}).get('height'))
            self.block.header.top = self.__to_int(data.get('MainHeader', {}).get('top'))
            self.block.header.left = self.__to_int(data.get('MainHeader', {}).get('left'))

            self.block.footer.width = self.__to_int(data.get('MainFooter', {}).get('width'))
            self.block.footer.height = self.__to_int(data.get('MainFooter', {}).get('height'))
            self.block.footer.top = self.__to_int(data.get('MainFooter', {}).get('top'))
            self.block.footer.left = self.__to_int(data.get('MainFooter', {}).get('left'))

            del self.adv_style['Block']
            advBlock = AdvSetting()
            advBlock.width = self.__to_int(data.get('Advertise', {}).get('width'))
            advBlock.height = self.__to_int(data.get('Advertise', {}).get('height'))
            advBlock.top = self.__to_int(data.get('Advertise', {}).get('top'))
            advBlock.left = self.__to_int(data.get('Advertise', {}).get('left'))
            advBlock.border_radius = [
                self.__to_int(data.get('Advertise', {}).get('border_top_left_radius')),
                self.__to_int(data.get('Advertise', {}).get('border_top_right_radius')),
                self.__to_int(data.get('Advertise', {}).get('border_bottom_right_radius')),
                self.__to_int(data.get('Advertise', {}).get('border_bottom_left_radius'))
            ]
            advBlock.margin = [
                self.__to_int(data.get('Advertise', {}).get('margin_top')),
                self.__to_int(data.get('Advertise', {}).get('margin_right')),
                self.__to_int(data.get('Advertise', {}).get('margin_bottom')),
                self.__to_int(data.get('Advertise', {}).get('margin_left'))
            ]
            advBlock.border = self.__to_int(data.get('Advertise', {}).get('borderWidth'))
            advBlock.border_color = self.__to_color(data.get('Advertise', {}).get('borderColor'))
            background_color_transparent = data.get('Advertise', {}).get('backgroundColorStatus', True)
            advBlock.background_color = 'transparent' if background_color_transparent else self.__to_color(
                data.get('Advertise', {}).get('backgroundColor')
            )
            advBlock.header.width = self.__to_int(data.get('Header', {}).get('width'))
            advBlock.header.height = self.__to_int(data.get('Header', {}).get('height'))
            advBlock.header.top = self.__to_int(data.get('Header', {}).get('top'))
            advBlock.header.left = self.__to_int(data.get('Header', {}).get('left'))
            advBlock.description.width = self.__to_int(data.get('Description', {}).get('width'))
            advBlock.description.height = self.__to_int(data.get('Description', {}).get('height'))
            advBlock.description.top = self.__to_int(data.get('Description', {}).get('top'))
            advBlock.description.left = self.__to_int(data.get('Description', {}).get('left'))
            advBlock.cost.width = self.__to_int(data.get('Cost', {}).get('width'))
            advBlock.cost.height = self.__to_int(data.get('Cost', {}).get('height'))
            advBlock.cost.top = self.__to_int(data.get('Cost', {}).get('top'))
            advBlock.cost.left = self.__to_int(data.get('Cost', {}).get('left'))
            advBlock.button.width = self.__to_int(data.get('Button', {}).get('width'))
            advBlock.button.height = self.__to_int(data.get('Button', {}).get('height'))
            advBlock.button.top = self.__to_int(data.get('Button', {}).get('top'))
            advBlock.button.left = self.__to_int(data.get('Button', {}).get('left'))
            advBlock.image.width = self.__to_int(data.get('Image', {}).get('width'))
            advBlock.image.height = self.__to_int(data.get('Image', {}).get('height'))
            advBlock.image.top = self.__to_int(data.get('Image', {}).get('top'))
            advBlock.image.left = self.__to_int(data.get('Image', {}).get('left'))
            advBlock.image.border = self.__to_int(data.get('Image', {}).get('borderWidth'))
            advBlock.image.border_color = self.__to_color(data.get('Image', {}).get('borderColor'))
            advBlock.image.border_radius = [
                self.__to_int(data.get('Image', {}).get('border_top_left_radius')),
                self.__to_int(data.get('Image', {}).get('border_top_right_radius')),
                self.__to_int(data.get('Image', {}).get('border_bottom_right_radius')),
                self.__to_int(data.get('Image', {}).get('border_bottom_left_radius'))
            ]
            self.adv_data['Block'] = advBlock

            del self.adv_style['RetBlock']
            advRetBlock = AdvSetting()
            advRetBlock.width = self.__to_int(data.get('Advertise', {}).get('width'))
            advRetBlock.height = self.__to_int(data.get('Advertise', {}).get('height'))
            advRetBlock.top = self.__to_int(data.get('Advertise', {}).get('top'))
            advRetBlock.left = self.__to_int(data.get('Advertise', {}).get('left'))
            advRetBlock.border_radius = [
                self.__to_int(data.get('Advertise', {}).get('border_top_left_radius')),
                self.__to_int(data.get('Advertise', {}).get('border_top_right_radius')),
                self.__to_int(data.get('Advertise', {}).get('border_bottom_right_radius')),
                self.__to_int(data.get('Advertise', {}).get('border_bottom_left_radius'))
            ]
            advRetBlock.margin = [
                self.__to_int(data.get('Advertise', {}).get('margin_top')),
                self.__to_int(data.get('Advertise', {}).get('margin_right')),
                self.__to_int(data.get('Advertise', {}).get('margin_bottom')),
                self.__to_int(data.get('Advertise', {}).get('margin_left'))
            ]
            advRetBlock.border = self.__to_int(data.get('Advertise', {}).get('borderWidthRet'))
            advRetBlock.border_color = self.__to_color(data.get('Advertise', {}).get('borderColorRet'))
            background_color_transparent = data.get('Advertise', {}).get('backgroundColorRetStatus', True)
            advRetBlock.background_color = 'transparent' if background_color_transparent else self.__to_color(
                data.get('Advertise', {}).get('backgroundColorRet')
            )
            advRetBlock.header.width = self.__to_int(data.get('RetHeader', {}).get('width'))
            advRetBlock.header.height = self.__to_int(data.get('RetHeader', {}).get('height'))
            advRetBlock.header.top = self.__to_int(data.get('RetHeader', {}).get('top'))
            advRetBlock.header.left = self.__to_int(data.get('RetHeader', {}).get('left'))
            advRetBlock.description.width = self.__to_int(data.get('RetDescription', {}).get('width'))
            advRetBlock.description.height = self.__to_int(data.get('RetDescription', {}).get('height'))
            advRetBlock.description.top = self.__to_int(data.get('RetDescription', {}).get('top'))
            advRetBlock.description.left = self.__to_int(data.get('RetDescription', {}).get('left'))
            advRetBlock.cost.width = self.__to_int(data.get('RetCost', {}).get('width'))
            advRetBlock.cost.height = self.__to_int(data.get('RetCost', {}).get('height'))
            advRetBlock.cost.top = self.__to_int(data.get('RetCost', {}).get('top'))
            advRetBlock.cost.left = self.__to_int(data.get('RetCost', {}).get('left'))
            advRetBlock.button.width = self.__to_int(data.get('RetButton', {}).get('width'))
            advRetBlock.button.height = self.__to_int(data.get('RetButton', {}).get('height'))
            advRetBlock.button.top = self.__to_int(data.get('RetButton', {}).get('top'))
            advRetBlock.button.left = self.__to_int(data.get('RetButton', {}).get('left'))
            advRetBlock.image.width = self.__to_int(data.get('RetImage', {}).get('width'))
            advRetBlock.image.height = self.__to_int(data.get('RetImage', {}).get('height'))
            advRetBlock.image.top = self.__to_int(data.get('RetImage', {}).get('top'))
            advRetBlock.image.left = self.__to_int(data.get('RetImage', {}).get('left'))
            advRetBlock.image.border = self.__to_int(data.get('RetImage', {}).get('borderWidth'))
            advRetBlock.image.border_color = self.__to_color(data.get('RetImage', {}).get('borderColor'))
            advRetBlock.image.border_radius = [
                self.__to_int(data.get('RetImage', {}).get('border_top_left_radius')),
                self.__to_int(data.get('RetImage', {}).get('border_top_right_radius')),
                self.__to_int(data.get('RetImage', {}).get('border_bottom_right_radius')),
                self.__to_int(data.get('RetImage', {}).get('border_bottom_left_radius'))
            ]
            self.adv_data['RetBlock'] = advRetBlock

            del self.adv_style['RecBlock']
            advRecBlock = AdvSetting()
            advRecBlock.width = self.__to_int(data.get('Advertise', {}).get('width'))
            advRecBlock.height = self.__to_int(data.get('Advertise', {}).get('height'))
            advRecBlock.top = self.__to_int(data.get('Advertise', {}).get('top'))
            advRecBlock.left = self.__to_int(data.get('Advertise', {}).get('left'))
            advRecBlock.border_radius = [
                self.__to_int(data.get('Advertise', {}).get('border_top_left_radius')),
                self.__to_int(data.get('Advertise', {}).get('border_top_right_radius')),
                self.__to_int(data.get('Advertise', {}).get('border_bottom_right_radius')),
                self.__to_int(data.get('Advertise', {}).get('border_bottom_left_radius'))
            ]
            advRecBlock.margin = [
                self.__to_int(data.get('Advertise', {}).get('margin_top')),
                self.__to_int(data.get('Advertise', {}).get('margin_right')),
                self.__to_int(data.get('Advertise', {}).get('margin_bottom')),
                self.__to_int(data.get('Advertise', {}).get('margin_left'))
            ]
            advRecBlock.border = self.__to_int(data.get('Advertise', {}).get('borderWidthRec'))
            advRecBlock.border_color = self.__to_color(data.get('Advertise', {}).get('borderColorRec'))
            background_color_transparent = data.get('Advertise', {}).get('backgroundColorRecStatus', True)
            advRecBlock.background_color = 'transparent' if background_color_transparent else self.__to_color(
                data.get('Advertise', {}).get('backgroundColorRec')
            )
            advRecBlock.header.width = self.__to_int(data.get('RecHeader', {}).get('width'))
            advRecBlock.header.height = self.__to_int(data.get('RecHeader', {}).get('height'))
            advRecBlock.header.top = self.__to_int(data.get('RecHeader', {}).get('top'))
            advRecBlock.header.left = self.__to_int(data.get('RecHeader', {}).get('left'))
            advRecBlock.description.width = self.__to_int(data.get('RecDescription', {}).get('width'))
            advRecBlock.description.height = self.__to_int(data.get('RecDescription', {}).get('height'))
            advRecBlock.description.top = self.__to_int(data.get('RecDescription', {}).get('top'))
            advRecBlock.description.left = self.__to_int(data.get('Description', {}).get('left'))
            advRecBlock.cost.width = self.__to_int(data.get('RecCost', {}).get('width'))
            advRecBlock.cost.height = self.__to_int(data.get('RecCost', {}).get('height'))
            advRecBlock.cost.top = self.__to_int(data.get('RecCost', {}).get('top'))
            advRecBlock.cost.left = self.__to_int(data.get('RecCost', {}).get('left'))
            advRecBlock.button.width = self.__to_int(data.get('RecButton', {}).get('width'))
            advRecBlock.button.height = self.__to_int(data.get('RecButton', {}).get('height'))
            advRecBlock.button.top = self.__to_int(data.get('RecButton', {}).get('top'))
            advRecBlock.button.left = self.__to_int(data.get('RecButton', {}).get('left'))
            advRecBlock.image.width = self.__to_int(data.get('RecImage', {}).get('width'))
            advRecBlock.image.height = self.__to_int(data.get('RecImage', {}).get('height'))
            advRecBlock.image.top = self.__to_int(data.get('RecImage', {}).get('top'))
            advRecBlock.image.left = self.__to_int(data.get('RecImage', {}).get('left'))
            advRecBlock.image.border = self.__to_int(data.get('RecImage', {}).get('borderWidth'))
            advRecBlock.image.border_color = self.__to_color(data.get('RecImage', {}).get('borderColor'))
            advRecBlock.image.border_radius = [
                self.__to_int(data.get('RecImage', {}).get('border_top_left_radius')),
                self.__to_int(data.get('RecImage', {}).get('border_top_right_radius')),
                self.__to_int(data.get('RecImage', {}).get('border_bottom_right_radius')),
                self.__to_int(data.get('RecImage', {}).get('border_bottom_left_radius'))
            ]
            self.adv_data['RecBlock'] = advRecBlock

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

        print(block_width, block_height, count_column, count_row, adv_type, adv_width, adv_height)
        self.block.default_adv.count_column = count_column
        self.block.default_adv.count_row = count_row
        self.block.default_adv.count_adv = count_row * count_column
        self.block.default_adv.type = adv_type
        self.block.default_adv.width = adv_width
        self.block.default_adv.height = adv_height

    def _h_styling_size_calculate(self):
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

        print(block_width, block_height, count_column, count_row, adv_type, adv_width, adv_height)
        self.block.default_adv.count_column = count_column
        self.block.default_adv.count_row = count_row
        self.block.default_adv.count_adv = count_row * count_column
        self.block.default_adv.type = adv_type
        self.block.default_adv.width = adv_width
        self.block.default_adv.height = adv_height

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

        print(block_width, block_height, count_column, count_row, adv_type, adv_width, adv_height)
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

        print(block_width, block_height, count_column, count_row, adv_type, adv_width, adv_height)
        self.block.default_adv.count_column = count_column
        self.block.default_adv.count_row = count_row
        self.block.default_adv.count_adv = count_row * count_column
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

        variable.append('$main: %s;' % self.to_variable(self.block))
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
        import time
        start_time = time.time()
        variable = self._create_variable()
        print(variable)
        print("--- %s ms ---" % ((time.time() - start_time) * 1000))
        start_time = time.time()
        css = sass.compile(string=' '.join([variable, full]), output_style='expanded')
        print("--- %s ms ---" % ((time.time() - start_time) * 1000))

        return css
