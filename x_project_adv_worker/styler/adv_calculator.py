from collections import defaultdict

from .adv_settings import AdvSetting


def adv_size_g(adv_width):
    return (adv_width * 0.42) + 4


def adv_size_gv(adv_width):
    return ((adv_width / 2) + (round(320 / adv_width) * 14)) + 4


def adv_size_v(adv_width):
    return (adv_width + (round(320 / adv_width) * 14)) + 4


def adv_size_bv(adv_width):
    return (adv_width + ((round(320 / adv_width) * 14) * 2)) + 4


def calculate_default(adv_type, width, height):
    adv_setting = AdvSetting()
    adv_setting.width = width
    adv_setting.height = height
    return adv_setting


def calculate_retargeting(adv_type, width, height):
    adv_setting = AdvSetting()
    adv_setting.width = width
    adv_setting.height = height
    return adv_setting


def calculate_recomendet(adv_type, width, height):
    adv_setting = AdvSetting()
    adv_setting.width = width
    adv_setting.height = height
    return adv_setting


def calculate_style_1(adv_type, width, height):
    adv_setting = AdvSetting()
    adv_setting.width = width
    adv_setting.height = height
    return adv_setting


def calculate_default_logo(adv_type, width, height):
    adv_setting = AdvSetting()
    adv_setting.width = width
    adv_setting.height = height
    return adv_setting


def calculate_style_1_logo(adv_type, width, height):
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
