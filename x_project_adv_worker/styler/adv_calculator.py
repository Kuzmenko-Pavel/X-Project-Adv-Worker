from collections import defaultdict

import numpy as np
from scipy.spatial import cKDTree

from .adv_settings import AdvSetting, LogoSetting

_h_template = np.array([
    (240, 200, {'count_column': 1, 'count_row': 2, 'type': 'G'}),
    (295, 145, {'count_column': 1, 'count_row': 1, 'type': 'G'}),
    (320, 125, {'count_column': 1, 'count_row': 1, 'type': 'G'}),
    (310, 300, {'count_column': 1, 'count_row': 3, 'type': 'G'}),
    (600, 300, {'count_column': 2, 'count_row': 3, 'type': 'G'}),
    (600, 300, {'count_column': 2, 'count_row': 3, 'type': 'G'}),
    (620, 300, {'count_column': 2, 'count_row': 2, 'type': 'G'}),
    (728, 600, {'count_column': 4, 'count_row': 2, 'type': 'G'}),
    (800, 700, {'count_column': 5, 'count_row': 3, 'type': 'G'})
])
_v_template = np.array([
    (300, 150, {'count_column': 1, 'count_row': 1, 'type': 'G'}),
    (320, 600, {'count_column': 1, 'count_row': 6, 'type': 'G'}),
    (325, 350, {'count_column': 1, 'count_row': 4, 'type': 'G'}),
    (320, 530, {'count_column': 1, 'count_row': 4, 'type': 'G'}),
    (370, 500, {'count_column': 1, 'count_row': 4, 'type': 'G'}),
    (160, 600, {'count_column': 1, 'count_row': 3, 'type': 'G'}),
    (335, 600, {'count_column': 1, 'count_row': 6, 'type': 'G'}),
    (600, 1175, {'count_column': 3, 'count_row': 4, 'type': 'G'})
])
_vm_template = np.array([
    (280, 1260, {'count_column': 1, 'count_row': 4, 'type': 'BV'}),
    (290, 1015, {'count_column': 1, 'count_row': 6, 'type': 'BV'}),
    (290, 1305, {'count_column': 1, 'count_row': 4, 'type': 'BV'}),
    (320, 1440, {'count_column': 1, 'count_row': 4, 'type': 'BV'}),
    (335, 1507, {'count_column': 1, 'count_row': 4, 'type': 'BV'}),
    (345, 1207, {'count_column': 1, 'count_row': 3, 'type': 'BV'}),
    (344, 1548, {'count_column': 1, 'count_row': 4, 'type': 'BV'}),
    (353, 1588, {'count_column': 1, 'count_row': 4, 'type': 'BV'}),
    (374, 1683, {'count_column': 1, 'count_row': 4, 'type': 'BV'})
])
_vt_template = np.array([
    (720, 720, {'count_column': 3, 'count_row': 3, 'type': 'BV'})
])
_h_template_ref = np.array([(x[0], x[1]) for x in _h_template])

_v_template_ref = np.array([(x[0], x[1]) for x in _v_template])

_vm_template_ref = np.array([(x[0], x[1]) for x in _vm_template])

_vt_template_ref = np.array([(x[0], x[1]) for x in _vt_template])

_h_template_tree = cKDTree(_h_template_ref)

_v_template_tree = cKDTree(_v_template_ref)

_vm_template_tree = cKDTree(_vm_template_ref)

_vt_template_tree = cKDTree(_vt_template_ref)


def adv_size_g(adv_width):
    return (adv_width * 0.42) + 4


def adv_size_gv(adv_width):
    return (adv_width / 2) + header_text_size(adv_width) + 4


def adv_size_v(adv_width):
    return adv_width + header_text_size(adv_width) + 4


def adv_size_bv(adv_width):
    return adv_width + header_text_size(adv_width) + description_text_size(adv_width) + 4


def header_text_size(width, size=None, count=None):
    try:
        if size is None:
            size = 14
        if count is None:
            count = 25
        symbols = (width / (size * 0.6)) - 1
        text_height = (round(count / symbols) * size)
    except ZeroDivisionError:
        text_height = 0
    return text_height


def description_text_size(width, size=None, count=None):
    try:
        if size is None:
            size = 13
        if count is None:
            count = 70
        symbols = (width / (size * 0.5)) - 1
        text_height = round(count / symbols) * size
    except ZeroDivisionError:
        text_height = 0
    return text_height


async def calculate_default(width, height, adv):
    adv_setting = AdvSetting()
    adv_setting.width = adv.width - (2 * adv_setting.border) - adv_setting.margin[1] - adv_setting.margin[3]
    adv_setting.height = adv.height - (2 * adv_setting.border) - adv_setting.margin[0] - adv_setting.margin[2]
    if adv_setting.width <= 0:
        adv_setting.width = 1
    if adv_setting.height <= 0:
        adv_setting.height = 1
    if adv_setting.width > adv_setting.height:
        ratio = adv_setting.width / adv_setting.height
        if ratio >= 2:
            adv_setting.image.width = adv_setting.image.height = adv_setting.height
            adv_setting.header.width = adv_setting.width - adv_setting.image.width - 6
            adv_setting.header.height = header_text_size(adv_setting.header.width)
            adv_setting.header.left = adv_setting.image.width + 3
            adv_setting.description.width = adv_setting.width - adv_setting.image.width - 6
            adv_setting.description.height = description_text_size(adv_setting.description.width)
            adv_setting.description.left = adv_setting.image.width + 3
            diff_header_description_height = adv_setting.height - adv_setting.header.height - adv_setting.description.height
            if diff_header_description_height < (adv_setting.header.height * 1.5):
                if diff_header_description_height < 0:
                    diff_header_description_height = 0
                adv_setting.header.top = diff_header_description_height / 2
                adv_setting.description.top = adv_setting.header.top + adv_setting.header.height
            else:
                diff_header_description_height = diff_header_description_height - adv_setting.header.height
                adv_setting.header.top = diff_header_description_height / 4
                adv_setting.description.top = (adv_setting.header.top * 1.5) + adv_setting.header.height
                adv_setting.button.height = adv_setting.header.height + adv_setting.header.top
                adv_setting.button.width = adv_setting.header.width
                adv_setting.button.left = adv_setting.header.left
                adv_setting.button.top = adv_setting.description.top + adv_setting.description.height + 2

        elif 1.63 <= ratio < 2:
            adv_setting.image.width = adv_setting.image.height = adv_setting.height
            adv_setting.header.width = adv_setting.width - adv_setting.image.width
            adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
            adv_setting.header.left = adv_setting.image.width
            adv_setting.description.width = adv_setting.width - adv_setting.image.width
            adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                                   adv_setting.description.font.size)
            adv_setting.description.left = adv_setting.image.width
            diff_height = adv_setting.height - (adv_setting.header.height + adv_setting.description.height)
            if diff_height < 0:
                diff_height = 0
                adv_setting.description.height = adv_setting.height - adv_setting.header.height
            adv_setting.header.top = diff_height / 4
            adv_setting.description.top = adv_setting.header.top + adv_setting.header.height + (diff_height / 4)
        else:
            adv_setting.header.width = adv_setting.width - 6
            adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
            adv_setting.image.width = adv_setting.image.height = (adv_setting.width / 2) - 6
            adv_setting.description.width = adv_setting.width - (adv_setting.image.width + 6)
            adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                                   adv_setting.description.font.size)
            diff_width = adv_setting.width - (adv_setting.image.width + adv_setting.description.width)
            diff_height = adv_setting.height - (adv_setting.header.height + adv_setting.image.height)
            adv_setting.image.left = diff_width / 4
            adv_setting.description.left = adv_setting.image.left + adv_setting.image.width + (diff_width / 4)
            adv_setting.header.top = diff_height / 4
            adv_setting.image.top = adv_setting.header.top + adv_setting.header.height + (diff_height / 4)
            adv_setting.description.top = adv_setting.image.top
    else:
        ratio = adv_setting.height / adv_setting.width
        text_header = header_text_size(adv_setting.width, adv_setting.header.font.size)
        text_description = description_text_size(adv_setting.width, adv_setting.description.font.size)
        if ratio >= 2:
            adv_setting.image.width = adv_setting.image.height = adv_setting.width
            adv_setting.header.width = adv_setting.image.width
            adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
            adv_setting.header.top = adv_setting.image.height
            adv_setting.description.width = adv_setting.image.width
            adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                                   adv_setting.description.font.size)
            adv_setting.description.top = adv_setting.header.top + adv_setting.header.height
        elif 1.5 <= ratio < 2:
            if adv_setting.height < 150:
                image_width = adv_setting.height - text_header
                diff_image_width = adv_setting.width - image_width

                if 0 < diff_image_width < 10:
                    image_width = image_width - diff_image_width
                    adv_setting.image.width = adv_setting.image.height = image_width
                    adv_setting.image.left = (adv_setting.width - adv_setting.image.width) / 2
                    adv_setting.header.height = text_header
                elif diff_image_width < 0:
                    adv_setting.image.width = adv_setting.image.height = adv_setting.width
                    adv_setting.header.height = adv_setting.height - adv_setting.image.height
                    adv_setting.header.top = adv_setting.image.height
                    adv_setting.header.font.size = 12

                diff_image_height = adv_setting.height - adv_setting.image.height - adv_setting.header.height
                if 0 < diff_image_height < 10:
                    adv_setting.image.top = diff_image_height / 4
                    adv_setting.header.width = adv_setting.width
                    adv_setting.header.top = adv_setting.image.height + (adv_setting.image.top * 2)
            else:
                adv_setting.image.width = adv_setting.image.height = adv_setting.width - 6
                adv_setting.image.left = (adv_setting.width - adv_setting.image.width) / 2
                adv_setting.header.width = adv_setting.width
                adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
                adv_setting.description.width = adv_setting.width
                adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                                       adv_setting.description.font.size)
                diff_height = (adv_setting.height - (
                        adv_setting.image.height + adv_setting.image.top + adv_setting.header.height + adv_setting.description.height)) / 2
                if diff_height <= 0:
                    diff_height = 0
                elif 4 < diff_height:
                    diff_height = 4
                adv_setting.header.top = diff_height + adv_setting.image.height
                adv_setting.description.top = diff_height + adv_setting.header.top + adv_setting.header.height

        elif 1.15 <= ratio < 1.5 and adv_setting.width <= 160:
            adv_setting.header.font.weight = True
            adv_setting.header.font.decoration = True
            adv_setting.header.width = adv_setting.width
            adv_setting.header.height = header_text_size(adv_setting.header.width,
                                                         adv_setting.header.font.size, 45)
            adv_setting.image.width = adv_setting.image.height = adv_setting.height - adv_setting.header.height
            if adv_setting.image.width > adv_setting.width:
                adv_setting.image.width = adv_setting.image.height = adv_setting.width
            adv_setting.image.left = (adv_setting.width - adv_setting.image.width) / 2
            top_diff = adv_setting.height - adv_setting.image.top - adv_setting.image.height - adv_setting.header.height
            if top_diff > 4:
                top_diff = (top_diff / 2) - 2
            else:
                top_diff = 0
            adv_setting.header.top = adv_setting.image.top + adv_setting.image.height + top_diff

        elif 1.15 <= ratio < 1.5 and 160 < adv_setting.width <= 350:
            adv_setting.header.font.weight = True
            adv_setting.header.font.decoration = True
            adv_setting.header.width = adv_setting.width
            adv_setting.header.height = header_text_size(adv_setting.header.width,
                                                         adv_setting.header.font.size)
            adv_setting.image.width = adv_setting.image.height = adv_setting.height - adv_setting.header.height
            if adv_setting.image.width > adv_setting.width:
                adv_setting.image.width = adv_setting.image.height = adv_setting.width
            adv_setting.image.left = (adv_setting.width - adv_setting.image.width) / 2
            top_diff = adv_setting.height - adv_setting.image.top - adv_setting.image.height - adv_setting.header.height
            if top_diff > 4:
                top_diff = (top_diff / 2) - 2
            else:
                top_diff = 0
            adv_setting.header.top = adv_setting.image.top + adv_setting.image.height + top_diff

        elif 1.15 <= ratio < 1.5 and adv_setting.width > 350:
            image_width = adv_setting.height - (text_header + 10) - (text_description + 10)

            diff_image_width = adv_setting.width - image_width
            adv_setting.image.width = adv_setting.image.height = image_width - diff_image_width

            adv_setting.image.left = (adv_setting.width - adv_setting.image.width) / 2

            adv_setting.description.width = adv_setting.header.width = adv_setting.width

            adv_setting.header.height = text_header

            adv_setting.description.height = text_description

            diff_image_height = adv_setting.height - adv_setting.image.height - adv_setting.header.height - adv_setting.description.height

            if diff_image_height < 0:
                adv_setting.image.width = adv_setting.image.height = adv_setting.image.width - abs(
                    2 * diff_image_height)
                adv_setting.image.left = (adv_setting.width - adv_setting.image.width) / 2
            else:
                adv_setting.image.top = diff_image_height / 4

            adv_setting.header.top = adv_setting.image.height + (adv_setting.image.top * 2)

            adv_setting.description.top = adv_setting.header.top + adv_setting.header.height

        elif (1.05 <= ratio < 1.15) and adv_setting.width > 300:
            image_width = adv_setting.height - (text_header + 10) - (text_description + 10)

            diff_image_width = adv_setting.width - image_width
            adv_setting.image.width = adv_setting.image.height = image_width - diff_image_width

            adv_setting.image.left = (adv_setting.width - adv_setting.image.width) / 2

            adv_setting.description.width = adv_setting.header.width = adv_setting.width

            adv_setting.header.height = text_header

            adv_setting.description.height = text_description

            diff_image_height = adv_setting.height - adv_setting.image.height - adv_setting.header.height - adv_setting.description.height

            if diff_image_height < 0:
                adv_setting.image.width = adv_setting.image.height = adv_setting.image.width - abs(
                    2 * diff_image_height)
                adv_setting.image.left = (adv_setting.width - adv_setting.image.width) / 2
            else:
                adv_setting.image.top = diff_image_height / 4

            adv_setting.header.top = adv_setting.image.height + (adv_setting.image.top * 2)
            adv_setting.description.top = adv_setting.header.top + adv_setting.header.height

        else:
            image_width = adv_setting.height - (text_header + 10)
            diff_image_width = adv_setting.width - image_width
            image_width = image_width - diff_image_width
            adv_setting.image.width = adv_setting.image.height = image_width
            adv_setting.image.left = (adv_setting.width - adv_setting.image.width) / 2
            adv_setting.header.width = adv_setting.width
            adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
            diff_image_height = adv_setting.height - adv_setting.image.height - adv_setting.header.height
            if diff_image_height < 0:
                adv_setting.image.width = adv_setting.image.height = adv_setting.image.width - abs(
                    2 * diff_image_height)
                adv_setting.image.left = (adv_setting.width - adv_setting.image.width) / 2
                adv_setting.header.top = adv_setting.image.height + (adv_setting.image.top * 2)
            else:
                adv_setting.image.top = diff_image_height / 4
                adv_setting.header.top = adv_setting.image.height + (adv_setting.image.top * 2)
    return adv_setting


async def calculate_retargeting(width, height, adv):
    adv_setting = await calculate_default(width, height, adv)
    adv_setting.border_color = '#ff0000'
    adv_setting.background_color = '#ffc7c7'
    adv_setting.header.font.color = '#991313'
    adv_setting.description.font.color = '#3d3d45'
    return adv_setting


async def calculate_recomendet(width, height, adv):
    adv_setting = await calculate_default(width, height, adv)
    adv_setting.border_color = '#21ff3b'
    adv_setting.background_color = '#adffb7'
    adv_setting.header.font.color = '#1f8515'
    adv_setting.description.font.color = '#3d3d45'
    return adv_setting


async def calculate_style_1(width, height, adv):
    adv_setting = AdvSetting()
    adv_setting.logo = LogoSetting()
    adv_setting.logo.border_radius = [0, 0, 0, 0]
    adv_setting.logo.margin = [0, 0, 0, 0]
    adv_setting.logo.background_color = '#ffffff'
    adv_setting.logo.border = 5
    adv_setting.logo.border_color = '#ffffff'
    adv_setting.cost.font.color = '#ffffff'
    adv_setting.header.font.color = '#ffffff'
    adv_setting.cost.z = 1
    adv_setting.cost.padding = [3, 1, 3, 1]
    adv_setting.cost.background_color = '#f09213'
    adv_setting.button.border = 1
    adv_setting.button.border_color = '#f09213'
    adv_setting.button.font.color = '#f09213'
    adv_setting.logo.button.border = 1
    adv_setting.logo.button.border_color = '#f09213'
    adv_setting.logo.button.font.color = '#f09213'
    adv_setting.margin = [0, 0, 0, 0]
    adv_setting.background_color = '#eff2f3'
    adv_setting.border = 5
    adv_setting.border_color = '#ffffff'
    adv_setting.logo.width = adv_setting.width = adv.width - (2 * adv_setting.border) - adv_setting.margin[1] - \
                                                 adv_setting.margin[3]
    adv_setting.logo.height = adv_setting.height = adv.height - (2 * adv_setting.border) - adv_setting.margin[0] - \
                                                   adv_setting.margin[2]
    adv_setting.header.background_color = '#eff2f3'
    adv_setting.description.background_color = '#eff2f3'
    adv_setting.description.font.color = '#256799'
    adv_setting.border_radius = [0, 0, 0, 0]
    adv_setting.header.border_radius = [0, 0, 0, 0]
    adv_setting.description.border_radius = [0, 0, 0, 0]
    adv_setting.image.border_radius = [0, 0, 0, 0]
    adv_setting.cost.border_radius = [0, 0, 5, 0]
    if adv_setting.width > adv_setting.height:
        ratio = adv_setting.width / adv_setting.height
        adv_setting.header.font.color = '#256799'
        if adv_setting.height < 100:
            adv_setting.header.font.size = 12
            adv_setting.description.font.size = 11
        if ratio >= 2:
            adv_setting.image.width = adv_setting.image.height = adv_setting.height
            adv_setting.header.width = adv_setting.width - adv_setting.image.width - 6
            adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
            adv_setting.header.left = adv_setting.image.width + 3
            adv_setting.description.width = adv_setting.width - adv_setting.image.width - 6
            adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                                   adv_setting.description.font.size)
            adv_setting.description.left = adv_setting.image.width + 3
            diff_header_description_height = adv_setting.height - adv_setting.header.height - adv_setting.description.height
            if diff_header_description_height < (adv_setting.header.height * 1.5):
                if diff_header_description_height < 0:
                    diff_header_description_height = 0
                adv_setting.header.top = diff_header_description_height / 2
                adv_setting.description.top = adv_setting.header.top + adv_setting.header.height
            else:

                diff_header_description_height = diff_header_description_height - adv_setting.header.height
                adv_setting.header.top = diff_header_description_height / 4
                adv_setting.description.top = (adv_setting.header.top * 1.5) + adv_setting.header.height
                adv_setting.button.height = adv_setting.header.height + adv_setting.header.top
                adv_setting.button.width = adv_setting.header.width
                adv_setting.button.left = adv_setting.header.left
                adv_setting.button.top = adv_setting.description.top + adv_setting.description.height + 2

        elif 1.63 <= ratio < 2:
            adv_setting.image.width = adv_setting.image.height = adv_setting.height
            adv_setting.header.width = adv_setting.width - adv_setting.image.width
            adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
            adv_setting.header.left = adv_setting.image.width
            adv_setting.description.width = adv_setting.width - adv_setting.image.width
            adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                                   adv_setting.description.font.size)
            adv_setting.description.top = adv_setting.header.top + adv_setting.header.height
            adv_setting.description.left = adv_setting.image.width
        else:
            adv_setting.header.width = adv_setting.width - 6
            adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
            adv_setting.image.width = adv_setting.image.height = (adv_setting.width / 2) - 6
            adv_setting.description.width = adv_setting.width - (adv_setting.image.width + 6)
            adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                                   adv_setting.description.font.size)
            diff_width = adv_setting.width - (adv_setting.image.width + adv_setting.description.width)
            diff_height = adv_setting.height - (adv_setting.header.height + adv_setting.image.height)
            adv_setting.image.left = diff_width / 4
            adv_setting.description.left = adv_setting.image.left + adv_setting.image.width + (diff_width / 4)
            adv_setting.header.top = diff_height / 4
            adv_setting.image.top = adv_setting.header.top + adv_setting.header.height + (diff_height / 4)
            adv_setting.description.top = adv_setting.image.top

    else:
        adv_setting.header.padding = [5, 0, 5, 0]
        ratio = adv_setting.height / adv_setting.width
        if 1.5 <= ratio:
            adv_setting.image.width = adv_setting.image.height = adv_setting.width
            adv_setting.header.background_color = '#000000'
            adv_setting.header.opacity = 0.6
            adv_setting.header.width = adv_setting.image.width
            adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
            adv_setting.description.width = adv_setting.width
            adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                                   adv_setting.description.font.size)
            adv_setting.header.z = 1
            diff_description_center = ((adv_setting.height - adv_setting.image.width) / 2) - (
                    adv_setting.description.height / 2)
            if diff_description_center < 0:
                adv_setting.image.top = 0
                adv_setting.description.top = adv_setting.height - adv_setting.description.height
                adv_setting.header.top = (adv_setting.image.top + adv_setting.image.height) - (
                        adv_setting.header.height + adv_setting.header.padding[2] + adv_setting.header.padding[0])
            else:
                adv_setting.image.top = diff_description_center / 2
                adv_setting.header.top = (adv_setting.image.top + adv_setting.image.height) - (
                        adv_setting.header.height + adv_setting.header.padding[2] + adv_setting.header.padding[0])
                adv_setting.description.top = adv_setting.header.top + (
                        adv_setting.header.height + adv_setting.header.padding[2] + adv_setting.header.padding[
                    0]) + diff_description_center


        else:
            adv_setting.image.width = adv_setting.image.height = adv_setting.width
            adv_setting.header.background_color = '#000000'
            adv_setting.header.opacity = 0.6
            adv_setting.header.width = adv_setting.image.width
            adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
            adv_setting.description.width = adv_setting.width
            adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                                   adv_setting.description.font.size)
            # diff = adv_setting.height - adv_setting.image.height
            #
            # if diff < adv_setting.description.height:
            #     adv_setting.description.height = diff
            adv_setting.header.z = 1
            diff_description_center = ((adv_setting.height - adv_setting.image.width) / 2) - (
                    adv_setting.description.height / 2)
            if diff_description_center < 0:
                adv_setting.description.z = 1
                adv_setting.description.top = adv_setting.height - adv_setting.description.height
                adv_setting.header.top = adv_setting.description.top - (
                        adv_setting.header.height + adv_setting.header.padding[2] + adv_setting.header.padding[0])
            else:
                adv_setting.header.top = adv_setting.image.height - (
                        adv_setting.header.height + adv_setting.header.padding[2] + adv_setting.header.padding[0])
                adv_setting.description.top = adv_setting.header.top + (
                        adv_setting.header.height + adv_setting.header.padding[2] + adv_setting.header.padding[
                    0]) + diff_description_center

    cost_size = adv_setting.image.width / (12 * 0.6)
    if cost_size < adv_setting.cost.font.size:
        adv_setting.cost.font.size = int(cost_size)
    adv_setting.cost.width = (adv_setting.cost.font.size * 0.6) * 14
    if adv_setting.cost.width > adv_setting.image.width:
        adv_setting.cost.width = adv_setting.image.width - (adv_setting.cost.padding[1] * 2)
    adv_setting.cost.height = adv_setting.cost.font.size
    adv_setting.cost.top = adv_setting.image.top
    adv_setting.cost.left = adv_setting.image.left

    adv_setting.logo.image.border_radius = [0, 0, 0, 0]
    adv_setting.logo.image.width = adv_setting.image.width
    adv_setting.logo.image.left = adv_setting.image.left
    adv_setting.logo.header.width = adv_setting.description.width
    adv_setting.logo.header.height = description_text_size(adv_setting.logo.header.width,
                                                           adv_setting.logo.header.font.size)
    adv_setting.logo.header.left = adv_setting.description.left
    adv_setting.logo.button.width = adv_setting.description.width - (adv_setting.logo.button.border * 2)
    adv_setting.logo.button.font.size = adv_setting.description.font.size
    adv_setting.logo.button.height = header_text_size(adv_setting.logo.button.width, adv_setting.logo.button.font.size)

    if adv_setting.logo.button.height <= adv_setting.logo.button.font.size:
        adv_setting.logo.button.height = adv_setting.logo.button.height + 8

    adv_setting.logo.button.left = adv_setting.logo.header.left
    if adv_setting.logo.header.left > 5:
        logo_block_height = adv_setting.logo.height / 2
        diff_img_logo_block = (logo_block_height - 25)
        if diff_img_logo_block < 0:
            diff_img_logo_block = 0
        adv_setting.logo.image.top = diff_img_logo_block
        diff_header_logo_block = (logo_block_height - adv_setting.logo.header.height)
        if diff_header_logo_block < 0:
            diff_header_logo_block = 0
        adv_setting.logo.header.top = diff_header_logo_block
        diff_button_logo_block = (logo_block_height - adv_setting.logo.button.height) / 2
        if diff_button_logo_block < 0:
            diff_button_logo_block = 0
        adv_setting.logo.button.top = adv_setting.logo.header.top + adv_setting.logo.header.height + diff_button_logo_block
        if (adv_setting.logo.button.top + adv_setting.logo.button.height) > adv_setting.logo.height:
            adv_setting.logo.button.top = adv_setting.logo.height - (
                    adv_setting.logo.button.height + (adv_setting.logo.button.border * 2))
    else:
        logo_block_height = adv_setting.logo.height / 3
        diff_img_logo_block = (logo_block_height - 50)
        if diff_img_logo_block < 0:
            diff_img_logo_block = 0
        adv_setting.logo.image.top = diff_img_logo_block
        diff_header_logo_block = (logo_block_height - adv_setting.logo.header.height)
        if diff_header_logo_block < 0:
            diff_header_logo_block = 0
        adv_setting.logo.header.top = adv_setting.logo.image.top + 50 + diff_header_logo_block
        diff_button_logo_block = (logo_block_height - adv_setting.logo.button.height) / 2
        if diff_button_logo_block < 0:
            diff_button_logo_block = 0
        adv_setting.logo.button.top = adv_setting.logo.header.top + adv_setting.logo.header.height + diff_button_logo_block
        if adv_setting.logo.button.top + adv_setting.logo.button.height + 2 > adv_setting.logo.height:
            adv_setting.logo.button.top = adv_setting.logo.header.top + adv_setting.logo.header.height
            if adv_setting.logo.button.top + adv_setting.logo.button.height + 2 > adv_setting.logo.height:
                adv_setting.logo.button.top = adv_setting.logo.button.top - (
                        (adv_setting.logo.button.top + adv_setting.logo.button.height + 2) - adv_setting.logo.height)

    return adv_setting


async def calculate_style_2(width, height, adv):
    adv_setting = AdvSetting()
    adv_setting.margin = [0, 0, 0, 0]
    adv_setting.background_color = '#eff2f3'
    adv_setting.border = 5
    adv_setting.border_radius = [0, 0, 0, 0]
    adv_setting.border_color = '#ffffff'
    adv_setting.header.z = 1000
    adv_setting.header.font.color = '#256799'
    adv_setting.header.font.size = 14
    adv_setting.header.font.weight = False
    adv_setting.header.font.align = 'left'
    adv_setting.header.background_color = '#eff2f3'
    adv_setting.header.border_radius = [0, 0, 0, 0]
    adv_setting.header.padding = [0, 0, 0, 0]
    adv_setting.header.border = 2
    adv_setting.header.border_color = '#eff2f3'
    adv_setting.description.padding = [0, 0, 0, 0]
    adv_setting.description.background_color = '#eff2f3'
    adv_setting.description.font.color = '#5d9000'
    adv_setting.description.font.size = 18
    adv_setting.description.font.weight = True
    adv_setting.description.font.align = 'left'
    adv_setting.description.border_radius = [0, 0, 0, 0]
    adv_setting.description.z = 1000
    adv_setting.description.border = 2
    adv_setting.description.border_color = '#eff2f3'
    adv_setting.image.border_radius = [0, 0, 0, 0]
    adv_setting.button.border = 1
    adv_setting.button.border_color = '#db5c4c'
    adv_setting.button.font.color = '#db5c4c'
    adv_setting.logo = LogoSetting()
    adv_setting.logo.border_radius = [0, 0, 0, 0]
    adv_setting.logo.margin = [0, 0, 0, 0]
    adv_setting.logo.background_color = '#ffffff'
    adv_setting.logo.border = 5
    adv_setting.logo.border_color = '#ffffff'
    adv_setting.logo.header.font.color = '#256799'
    adv_setting.logo.header.font.size = 16
    adv_setting.logo.header.font.weight = False
    adv_setting.logo.button.border = 1
    adv_setting.logo.button.border_color = '#db5c4c'
    adv_setting.logo.button.font.color = '#db5c4c'
    adv_setting.logo.button.background_color = '#ffffff'
    adv_setting.logo.button.z = 1000
    adv_setting.logo.width = adv_setting.width = adv.width - (2 * adv_setting.border)
    adv_setting.logo.height = adv_setting.height = adv.height - (2 * adv_setting.border)
    if adv_setting.width > adv_setting.height:
        ratio = adv_setting.width / adv_setting.height
        if adv_setting.height < 100:
            adv_setting.header.font.size = 11
            adv_setting.description.font.size = 13
        elif adv_setting.height < 80:
            adv_setting.header.font.size = 10
            adv_setting.description.font.size = 12
        if ratio >= 1.8:
            adv_setting.image.width = adv_setting.image.height = adv_setting.height
            adv_setting.description.left = adv_setting.header.left = adv_setting.image.width
            adv_setting.header.width = adv_setting.width - adv_setting.image.width - 4
            adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
            adv_setting.description.width = adv_setting.width - adv_setting.image.width - 4
            adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                                   adv_setting.description.font.size, 22)
            diff_top = (adv_setting.height - (adv_setting.description.height + adv_setting.header.height + 8)) / 2
            if diff_top < 0:
                diff_top = 0
            adv_setting.description.top = adv_setting.height - (adv_setting.description.height + 4 + diff_top)
            adv_setting.header.top = adv_setting.description.top - (adv_setting.header.height + 4)
        else:
            adv_setting.header.font.align = 'center'
            adv_setting.header.width = adv_setting.width - 4
            adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
            adv_setting.image.width = adv_setting.image.height = adv_setting.height - (adv_setting.header.height + 8)
            adv_setting.description.width = adv_setting.width - (adv_setting.image.width + 4)
            adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                                   adv_setting.description.font.size, 22)
            adv_setting.header.top = 0
            adv_setting.image.top = adv_setting.header.height + 4
            diff_top = (adv_setting.image.height - adv_setting.description.height) / 2
            if diff_top < 0:
                diff_top = 0
            adv_setting.description.left = adv_setting.image.width + 5
            adv_setting.description.top = adv_setting.image.top + diff_top
        adv_setting.logo.image.width = (adv_setting.height / 2) * 3.3
        adv_setting.logo.image.left = (adv_setting.width - adv_setting.logo.image.width) / 2

    else:
        if adv_setting.width < 100:
            adv_setting.header.font.size = 10
            adv_setting.description.font.size = 11
        adv_setting.image.width = adv_setting.image.height = adv_setting.width
        adv_setting.header.width = adv_setting.image.width - 4
        adv_setting.header.height = header_text_size(adv_setting.header.width, adv_setting.header.font.size)
        adv_setting.description.width = adv_setting.width - 4
        adv_setting.description.height = description_text_size(adv_setting.description.width,
                                                               adv_setting.description.font.size, 22)

        diff_top = (adv_setting.height - (
                adv_setting.description.height + adv_setting.header.height + adv_setting.image.height + 20)) / 3

        if diff_top < 0:
            diff_top = 0

        adv_setting.description.top = adv_setting.height - (adv_setting.description.height + 4 + diff_top)
        adv_setting.header.top = adv_setting.description.top - (adv_setting.header.height + 4 + diff_top)
        adv_setting.image.top = diff_top
        adv_setting.logo.image.width = adv_setting.image.width
        adv_setting.logo.image.left = adv_setting.image.left

    adv_setting.logo.image.border_radius = [0, 0, 0, 0]
    adv_setting.logo.header.width = adv_setting.description.width
    adv_setting.logo.header.font.size = adv_setting.header.font.size
    adv_setting.logo.header.height = description_text_size(adv_setting.logo.header.width,
                                                           adv_setting.logo.header.font.size)
    adv_setting.logo.button.width = adv_setting.logo.image.width - ((adv_setting.logo.button.border * 2) + 6)
    adv_setting.logo.button.left = 3
    adv_setting.logo.header.left = adv_setting.description.left
    adv_setting.logo.button.font.size = adv_setting.description.font.size
    adv_setting.logo.button.height = header_text_size(adv_setting.logo.button.width, adv_setting.logo.button.font.size)

    if adv_setting.logo.header.left > 5:
        adv_setting.logo.button.top = 0
        adv_setting.logo.button.left = 0
        adv_setting.logo.button.width = 0
        adv_setting.logo.button.height = 0
        adv_setting.logo.header.left = 0
        adv_setting.logo.header.width = adv_setting.logo.width
        adv_setting.logo.header.height = description_text_size(adv_setting.logo.header.width,
                                                               adv_setting.logo.header.font.size)
        adv_setting.logo.header.top = adv_setting.logo.height - adv_setting.logo.header.height
    else:
        logo_block_height = adv_setting.logo.height / 3
        diff_img_logo_block = (logo_block_height - 50)
        if diff_img_logo_block < 0:
            diff_img_logo_block = 0
        adv_setting.logo.image.top = diff_img_logo_block
        diff_header_logo_block = (logo_block_height - adv_setting.logo.header.height)
        if diff_header_logo_block < 0:
            diff_header_logo_block = 0
        adv_setting.logo.header.top = adv_setting.logo.image.top + 50 + diff_header_logo_block
        diff_button_logo_block = (logo_block_height - adv_setting.logo.button.height) / 2
        if diff_button_logo_block < 0:
            diff_button_logo_block = 0
        adv_setting.logo.button.top = adv_setting.logo.header.top + adv_setting.logo.header.height + diff_button_logo_block
        if adv_setting.logo.button.top + adv_setting.logo.button.height + 2 > adv_setting.logo.height:
            adv_setting.logo.button.top = adv_setting.logo.header.top + adv_setting.logo.header.height
            if adv_setting.logo.button.top + adv_setting.logo.button.height + 2 > adv_setting.logo.height:
                adv_setting.logo.button.top = adv_setting.logo.button.top - (
                        (adv_setting.logo.button.top + adv_setting.logo.button.height + 2) - adv_setting.logo.height)

    return adv_setting


async def calculate_style_3(width, height, adv):
    adv_setting = await calculate_style_1(width, height, adv)
    adv_setting.cost.border_radius = [0, 0, 10, 0]
    adv_setting.button.border_color = '#0076f4'
    adv_setting.button.font.color = '#0076f4'
    adv_setting.logo.button.border_color = '#0076f4'
    adv_setting.logo.button.font.color = '#0076f4'
    adv_setting.cost.background_color = '#0076f4'
    adv_setting.header.width = adv_setting.cost.width
    adv_setting.header.height = adv_setting.cost.height
    adv_setting.header.top = adv_setting.image.top + 1
    adv_setting.header.left = adv_setting.image.left
    adv_setting.header.border_radius = adv_setting.cost.border_radius
    adv_setting.header.border = adv_setting.cost.border
    adv_setting.header.background_color = adv_setting.cost.background_color
    adv_setting.header.opacity = adv_setting.cost.opacity
    adv_setting.header.z = adv_setting.cost.z
    adv_setting.header.font.size = adv_setting.cost.font.size
    adv_setting.header.font.weight = adv_setting.cost.font.weight
    adv_setting.header.font.color = adv_setting.cost.font.color
    adv_setting.header.padding = adv_setting.cost.padding
    adv_setting.image.width = adv_setting.image.width - 2
    adv_setting.image.height = adv_setting.image.height - 2
    adv_setting.image.border = 1
    adv_setting.image.border_color = '#eff2f3'
    adv_setting.cost.z = 0
    adv_setting.cost.width = 0
    adv_setting.cost.height = 0
    return adv_setting


adv_calculator = defaultdict(lambda: calculate_default)
adv_calculator['Block'] = calculate_default
adv_calculator['RetBlock'] = calculate_retargeting
adv_calculator['RecBlock'] = calculate_recomendet
adv_calculator['Style_1'] = calculate_style_1
adv_calculator['Style_2'] = calculate_style_2
adv_calculator['Style_3'] = calculate_style_3

adv_size_calculator = defaultdict(lambda: adv_size_gv)
adv_size_calculator['G'] = adv_size_g
adv_size_calculator['GV'] = adv_size_gv
adv_size_calculator['V'] = adv_size_v
adv_size_calculator['BV'] = adv_size_bv

style_type = ['Block', 'RetBlock', 'RecBlock', 'Style_1', 'Style_2', 'Style_3']
