from asyncio import CancelledError
from math import ceil

from x_project_adv_worker.logger import logger, exception_message
from x_project_adv_worker.utils import Map
from .adv_calculator import (adv_calculator, adv_size_calculator, style_type, _h_template, _v_template,
                             _h_template_ref, _v_template_ref, _h_template_tree, _v_template_tree,
                             _vm_template, _vm_template_ref, _vm_template_tree,
                             _vt_template, _vt_template_ref, _vt_template_tree)
from .adv_settings import AdvSetting
from .block_settings import BlockSetting
from .resetter import reset_css
from .styles import full


class Styler(object):
    __slots__ = ['adv_style', 'adv_data', 'block', 'mediaQ', 'lc', 'vw', 'vh']
    style_type = style_type

    def __init__(self, params):
        self.adv_style = {
            'Block': 'Block',
            'RetBlock': 'RetBlock',
            'RecBlock': 'RecBlock'
        }
        self.adv_data = {}
        self.block = BlockSetting()
        self.block.width = params.width
        self.block.height = params.height
        self.mediaQ = params.mediaQ
        self.lc = params.lc
        self.vw = params.vw
        self.vh = params.vh
        self._default_size_calculate(True)

    def merge(self, data=None):
        if data is not None:
            block = BlockSetting(data['block'])
            self.block.width = block.width
            self.block.height = block.height
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
            self.block.default_adv.count_adv = block.default_adv.count_adv

            self.block.default_button.block = block.default_button.block
            self.block.default_button.ret_block = block.default_button.ret_block
            self.block.default_button.rec_block = block.default_button.rec_block
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
                self._h_default_size_calculate(default)
            else:
                self._v_default_size_calculate(default)

    def _h_template_calculate(self, default=None):
        try:
            block_width = int(self.block.get_width())
            block_height = int(self.block.get_height())
            idx = _h_template_tree.query_ball_point((block_width, block_height), 10)
            points = _h_template[idx]
            if points.size > 0:
                self.block.styling_adv.count_column = points[0][2]['count_column']
                self.block.styling_adv.count_row = points[0][2]['count_row']
                self.block.styling_adv.count_adv = (points[0][2]['count_row'] * points[0][2]['count_column'])
                self.block.styling_adv.type = points[0][2]['type']
                self.block.styling_adv.width = int(block_width / self.block.styling_adv.count_column)
                self.block.styling_adv.height = int(block_height / self.block.styling_adv.count_row)
                if default:
                    self.block.default_adv = Map(self.block.styling_adv)
                return True
        except CancelledError:
            logger.error('CancelledError CSS _v_template_calculate')
        except Exception as ex:
            logger.error(exception_message(exc=str(ex)))
        return False

    def _v_template_calculate(self, default=None):
        try:
            block_width = int(self.block.get_width())
            block_height = int(self.block.get_height())
            if self.mediaQ == 'm':
                idx = _vm_template_tree.query_ball_point((block_width, block_height), 10)
                points = _vm_template[idx]
            elif self.mediaQ == 't':
                idx = _vt_template_tree.query_ball_point((block_width, block_height), 10)
                points = _vt_template[idx]
            else:
                idx = _v_template_tree.query_ball_point((block_width, block_height), 10)
                points = _v_template[idx]
            if points.size > 0:
                self.block.styling_adv.count_column = points[0][2]['count_column']
                self.block.styling_adv.count_row = points[0][2]['count_row']
                self.block.styling_adv.count_adv = points[0][2]['count_row'] * points[0][2]['count_column']
                self.block.styling_adv.type = points[0][2]['type']
                self.block.styling_adv.width = int(block_width / self.block.styling_adv.count_column)
                self.block.styling_adv.height = int(block_height / self.block.styling_adv.count_row)
                if default:
                    self.block.default_adv = Map(self.block.styling_adv)
                return True
        except CancelledError:
            logger.error('CancelledError CSS _v_template_calculate')
        except Exception as ex:
            logger.error(exception_message(exc=str(ex)))
        return False

    def _h_default_size_calculate(self, default=None):
        try:
            if self._h_template_calculate(default):
                return

            adv_type = self.block.styling_adv.type
            block_width = self.block.get_width()
            block_height = self.block.get_height()
            count_column = 1.0
            count_row = 1.0
            if 150 < block_height < 200:
                adv_height = block_height
                count_column = round(block_width / (block_height - (round(320 / block_height) * 14)))
                adv_width = block_width / count_column
                adv_type = 'V'
            else:
                if block_width >= 300 and block_height < 190:
                    count_column = ceil(block_width / 300.0)
                elif block_width >= 300 and block_height >= 190:
                    count_column = round(block_width / 150.0)

                if count_column == 1.0:
                    if block_height >= 300:
                        count_row = ceil(block_height / 300.0)
                    elif 200 < block_height < 300:
                        count_row = round(block_height / 100.0)
                else:
                    if block_height >= 300:
                        count_row = int(block_height / 150.0)

                adv_height = block_height / count_row
                adv_width = block_width / count_column

            if adv_height >= adv_width:
                adv_type = 'V'
            else:
                adv_type = 'G'

            self.block.styling_adv.count_column = count_column
            self.block.styling_adv.count_row = count_row
            self.block.styling_adv.count_adv = count_row * count_column
            self.block.styling_adv.type = adv_type
            self.block.styling_adv.width = adv_width
            self.block.styling_adv.height = adv_height
            if default:
                self.block.default_adv = Map(self.block.styling_adv)
        except CancelledError:
            logger.error('CancelledError CSS _h_default_size_calculate')
        except Exception as ex:
            logger.error(exception_message(exc=str(ex)))

    def _v_default_size_calculate(self, default=None):
        try:
            block_width_border = 300.0
            if self.mediaQ == 'm':
                block_width_border = 600.0

            if self._v_template_calculate(default):
                return
            adv_type = self.block.styling_adv.type
            block_width = self.block.get_width()
            block_height = self.block.get_height()
            count_column = ceil(block_width / block_width_border)
            if count_column < 1:
                count_column = 1
            adv_width = block_width / count_column
            adv_count_by_width = round(block_height / (adv_width + ((round(320 / adv_width) * 14) * 2)))

            if adv_width > 200 and adv_count_by_width < 4 and self.mediaQ == 'd':
                adv_type = 'G'
                adv_height = adv_size_calculator[adv_type](adv_width)

            elif 160 <= adv_width <= 200 and adv_count_by_width < 4 and self.mediaQ == 'd':
                adv_type = 'GV'
                adv_height = adv_size_calculator[adv_type](adv_width)

            elif adv_width < 160 and adv_count_by_width < 4 and self.mediaQ == 'd':
                adv_type = 'V'
                adv_height = adv_size_calculator[adv_type](adv_width)

            elif adv_width > 200 and adv_count_by_width < 4 and self.mediaQ == 't':
                adv_type = 'G'
                adv_height = adv_size_calculator[adv_type](adv_width)

            elif 160 <= adv_width <= 200 and adv_count_by_width < 4 and self.mediaQ == 't':
                adv_type = 'GV'
                adv_height = adv_size_calculator[adv_type](adv_width)

            elif adv_width < 160 and adv_count_by_width < 4 and self.mediaQ == 't':
                adv_type = 'V'
                adv_height = adv_size_calculator[adv_type](adv_width)

            else:
                adv_type = 'BV'
                adv_height = adv_size_calculator[adv_type](adv_width)
            count_row = round(block_height / adv_height)

            while_counter = 0
            while True:
                if count_row < 1:
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
                            if count_row > 1:
                                adv_height = block_height / count_row
                            else:
                                adv_height = block_height
                                break
                            count_row -= 1
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
                while_counter += 1
                if while_counter > 50:
                    logger.error(exception_message(msg='CancelledError CSS _v_default_size_calculate while counter BIG',
                                                   data={
                                                       'count_row': count_row,
                                                       'block_width': block_width,
                                                       'block_height': block_height,
                                                       'mediaQ': self.mediaQ,
                                                       'lc': self.lc,
                                                       'vw': self.vw,
                                                       'vh': self.vh,
                                                       'new_height': new_height,
                                                       'adv_height': adv_height,
                                                   }
                                                   ))
                    break

            self.block.styling_adv.count_column = count_column
            self.block.styling_adv.count_row = count_row
            self.block.styling_adv.count_adv = count_row * count_column
            self.block.styling_adv.type = adv_type
            self.block.styling_adv.width = adv_width
            self.block.styling_adv.height = adv_height
            if default:
                self.block.default_adv = Map(self.block.styling_adv)

        except CancelledError:
            logger.error('CancelledError CSS _v_default_size_calculate')
        except Exception as ex:
            logger.error(exception_message(exc=str(ex)))

    async def _create_variable(self):
        variable = dict({'main': {}, 'adv_style': {}})
        variable['main'] = dict(self.block)
        width = self.block.get_width()
        height = self.block.get_height()
        for key, value in self.adv_style.items():
            if 'Block' in key:
                if key in self.adv_data.keys():
                    variable['adv_style'][key] = self.adv_data[key]
                else:
                    tmp_adv_setting = await adv_calculator[value](width, height, self.block.default_adv)
                    variable['adv_style'][key] = dict(tmp_adv_setting)
            else:
                tmp_adv_setting = await adv_calculator[value](width, height, self.block.styling_adv)
                variable['adv_style'][key] = dict(tmp_adv_setting)

        return variable

    def add(self, name, style):
        if style not in self.style_type:
            style = 'Block'
        self.adv_style[name] = style

    @property
    def styling_capacity(self):
        return self.block.styling_adv.count_adv

    @property
    def default_capacity(self):
        return self.block.default_adv.count_adv

    @property
    def min_capacity(self):
        return min([self.block.styling_adv.count_adv, self.block.default_adv.count_adv])

    @property
    def max_capacity(self):
        capacity = max([self.block.styling_adv.count_adv, self.block.default_adv.count_adv])
        if capacity > 20:
            capacity = 20
        return capacity

    async def calculate(self):
        return full.render(await self._create_variable())
