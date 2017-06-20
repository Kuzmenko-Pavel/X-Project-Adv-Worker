from collections import defaultdict
from scipy.spatial import cKDTree
import numpy as np

from .adv_settings import AdvSetting

_h_template = np.array([
    (295, 145, {'count_column': 1, 'count_row': 1, 'type': 'G'}),
    (300, 150, {'count_column': 1, 'count_row': 1, 'type': 'G'})
])
_v_template = np.array([
    (300, 150, {'count_column': 1, 'count_row': 1, 'type': 'G'})
])
_h_styling_template = np.array([
    (300, 150, {'count_column': 1, 'count_row': 1, 'type': 'G'})
])
_v_styling_template = np.array([
    (300, 150, {'count_column': 1, 'count_row': 1, 'type': 'G'})
])
_h_template_ref = np.array([(x[0], x[1]) for x in _h_template])
_v_template_ref = np.array([(x[0], x[1]) for x in _v_template])
_h_styling_template_ref = np.array([(x[0], x[1]) for x in _h_styling_template])
_v_styling_template_ref = np.array([(x[0], x[1]) for x in _v_styling_template])
_h_template_tree = cKDTree(_h_template_ref)
_v_template_tree = cKDTree(_v_template_ref)
_h_styling_template_tree = cKDTree(_h_styling_template_ref)
_v_styling_template_tree = cKDTree(_v_styling_template_ref)


def adv_size_g(adv_width):
    return (adv_width * 0.42) + 4


def adv_size_gv(adv_width):
    return ((adv_width / 2) + (round(320 / adv_width) * 14)) + 4


def adv_size_v(adv_width):
    return (adv_width + (round(320 / adv_width) * 14)) + 4


def adv_size_bv(adv_width):
    return (adv_width + ((round(320 / adv_width) * 14) * 2)) + 4


def calculate_default(width, height, adv):
    adv_setting = AdvSetting()
    adv_setting.width = adv.width - (2 * adv_setting.border) - adv_setting.margin[1] - adv_setting.margin[3]
    adv_setting.height = adv.height - (2 * adv_setting.border) - adv_setting.margin[0] - adv_setting.margin[2]

    if adv.type == 'G':
        header_height = (round(320 / adv_setting.height) * 14)
        description_height = (round(320 / (adv_setting.height - header_height)) * 14)
        image_width = adv_setting.height
        image_left = 0
        image_height = adv_setting.height
        image_top = 0
        header_width = adv_setting.width - image_width
        header_left = image_left + image_width
        header_top = 0
        description_width = adv_setting.width - image_width
        description_left = image_left + image_width
        description_top = header_top + header_height
    elif adv.type == 'V':
        pass
    elif adv.type == 'BV':
        pass
    else:
        pass
    adv_setting.image.width = image_width
    adv_setting.image.height = image_height
    adv_setting.image.left = image_left
    adv_setting.image.top = image_top
    adv_setting.header.width = header_width
    adv_setting.header.height = header_height
    adv_setting.header.left = header_left
    adv_setting.header.top = header_top
    adv_setting.description.width = description_width
    adv_setting.description.height = description_height
    adv_setting.description.left = description_left
    adv_setting.description.top = description_top
    return adv_setting


def calculate_retargeting(width, height, adv):
    adv_setting = AdvSetting()
    adv_setting.border = 1
    adv_setting.margin = [1, 1, 1, 1]
    adv_setting.width = adv.width - (2 * adv_setting.border) - adv_setting.margin[1] - adv_setting.margin[3]
    adv_setting.height = adv.height - (2 * adv_setting.border) - adv_setting.margin[0] - adv_setting.margin[2]
    return adv_setting


def calculate_recomendet(width, height, adv):
    adv_setting = AdvSetting()
    adv_setting.border = 1
    adv_setting.margin = [1, 1, 1, 1]
    adv_setting.width = adv.width - (2 * adv_setting.border) - adv_setting.margin[1] - adv_setting.margin[3]
    adv_setting.height = adv.height - (2 * adv_setting.border) - adv_setting.margin[0] - adv_setting.margin[2]
    return adv_setting


def calculate_style_1(width, height, adv):
    adv_setting = AdvSetting()
    adv_setting.width = width
    adv_setting.height = height
    return adv_setting


def calculate_default_logo(width, height, adv):
    adv_setting = AdvSetting()
    adv_setting.width = width
    adv_setting.height = height
    return adv_setting


def calculate_style_1_logo(width, height, adv):
    adv_setting = AdvSetting()
    adv_setting.width = width
    adv_setting.height = height
    return adv_setting


adv_calculator = defaultdict(lambda: calculate_default)
adv_calculator['Block'] = calculate_default
adv_calculator['RetBlock'] = calculate_retargeting
adv_calculator['RecBlock'] = calculate_recomendet
adv_calculator['Style_1'] = calculate_style_1

logo_calculator = defaultdict(lambda: calculate_default_logo)
logo_calculator['Style_1'] = calculate_style_1_logo

adv_size_calculator = defaultdict(lambda: adv_size_gv)
adv_size_calculator['G'] = adv_size_g
adv_size_calculator['GV'] = adv_size_gv
adv_size_calculator['V'] = adv_size_v
adv_size_calculator['BV'] = adv_size_bv

style_type = ['Block', 'RetBlock', 'RecBlock', 'Style_1']
