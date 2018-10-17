from jinja2 import Template
from x_project_adv_worker.utils import css_minifier

macro_template = """
{% macro clp() -%}
    -webkit-background-clip: padding-box;
    -moz-background-clip: padding;
    background-clip: padding-box;
{%- endmacro %}

{% macro br(size=None, color='black') -%}
    {% if size != None and size > 0 -%}
        border: {{size}}px solid {{ color  }};
    {% else %}
        border: none;
    {%- endif %}
{%- endmacro %}

{% macro bg(color=None) -%}
    {% if color != None and color !='transparent'  -%}
        background-color: {{color}};
    {% else %}
        background-color: transparent;
    {%- endif %}
{%- endmacro %}

{% macro op(opacity=None) -%}
    {% if opacity != None and opacity <1  -%}
        -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity={{opacity * 100|int}})";
        filter: alpha(opacity={{opacity * 100|int}});
        -moz-opacity: {{opacity}};
        -khtml-opacity: {{opacity}};
        opacity: {{opacity}};
    {%- endif %}
{%- endmacro %}

{% macro hide(hd=None) -%}
    {% if hd -%}
        display: none;
    {%- endif %}
{%- endmacro %}

{% macro marg(margin) -%}
{% if margin[0] -%}
    margin-top: {{margin[0]|int}}px;
{%- endif %}
{% if margin[1] -%}
    margin-right: {{margin[1]|int}}px;
    {%- endif %}
{% if margin[2] -%}
    margin-bottom: {{margin[2]|int}}px;
    {%- endif %}
{% if margin[3] -%}
    margin-left: {{margin[3]|int}}px;
{%- endif %}

{%- endmacro %}

{% macro pad(padding) -%}
{% if padding[0] -%}
    padding-top: {{padding[0]|int}}px;
{%- endif %}
{% if padding[1] -%}
    padding-right: {{padding[1]|int}}px;
{%- endif %}
{% if padding[2] -%}
    padding-bottom: {{padding[2]|int}}px;
{%- endif %}
{% if padding[3] -%}
    padding-left: {{padding[3]|int}}px;
{%- endif %}
{%- endmacro %}

{% macro brr(radiuses) -%}
    -webkit-border-top-left-radius: {{ radiuses[0]|int }}px;
    -webkit-border-top-right-radius: {{ radiuses[1]|int }}px;
    -webkit-border-bottom-right-radius: {{ radiuses[2]|int }}px;
    -webkit-border-bottom-left-radius: {{ radiuses[3]|int }}px;
    -khtml-border-top-left-radius: {{ radiuses[0]|int }}px;
    -khtml-border-top-right-radius: {{ radiuses[1]|int }}px;
    -khtml-border-bottom-right-radius: {{ radiuses[2]|int }}px;
    -khtml-border-bottom-left-radius: {{ radiuses[3]|int }}px;
    -moz-border-radius-topleft: {{ radiuses[0]|int }}px;
    -moz-border-radius-topright: {{ radiuses[1]|int }}px;
    -moz-border-radius-bottomright: {{ radiuses[2]|int }}px;
    -moz-border-radius-bottomleft: {{ radiuses[3]|int }}px;
    border-top-left-radius: {{ radiuses[0]|int }}px;
    border-top-right-radius: {{ radiuses[1]|int }}px;
    border-bottom-right-radius: {{ radiuses[2]|int }}px;
    border-bottom-left-radius: {{ radiuses[3]|int }}px;
    border-radius: {{ radiuses[0]|int }}px {{ radiuses[1]|int }}px {{ radiuses[2]|int }}px {{ radiuses[3]|int }}px;
    {{ clp() }}
{%- endmacro %}

{% macro fs(ls=None, fu=None, ta=None, fv=None, size=None, colour=None, weight=None,  lh=None, ff=None) -%}
    cursor: pointer;
    overflow: hidden;
    {% if fu -%}
        text-decoration: underline;
    {% else %}
        text-decoration: none;
    {%- endif %}
    {% if ta -%}
        text-align: {{ ta }};
    {% else %}
        text-align: center;
    {%- endif %}
    {% if fv -%}
        font-variant: small-caps;
    {% else %}
        font-variant: normal;
    {%- endif %}
    {% if size -%}
        font-size: {{size|int}}px;
    {% else %}
        font-size: 10px;
    {%- endif %}
    {% if ff -%}
        font-family: {{ ff }};
    {% else %}
        font-family: 'Arial,Helvetica,sans-serif';
    {%- endif %}
    {% if colour -%}
        color: {{ colour }};
    {% else %}
        color: black;
    {%- endif %}
    {% if weight -%}
        font-weight: bold;
    {% else %}
        font-weight: normal;
    {%- endif %}
    {% if lh -%}
        line-height: {{ lh }};
    {% else %}
        line-height: 1;
    {%- endif %}
    {% if ls -%}
        letter-spacing: {{ls}}px;
    {% else %}
        letter-spacing: normal;
    {%- endif %}
{%- endmacro %}

{% macro elps(w=None, h=None, t=None, l=None, ps=None) -%}
    {% if not w and not h -%}
        display: none;
    {%- endif %}
    {% if ps -%}
        position: {{ ps }};
    {% else %}
        position: absolute;
    {%- endif %}
    {% if t -%}
        top: {{t|int}}px;
    {%- endif %}
    {% if l -%}
        left: {{l|int}}px;
    {%- endif %}
    {% if w -%}
        width: {{w|int}}px;
    {%- endif %}
    {% if h -%}
        height: {{h|int}}px;
    {%- endif %}
{%- endmacro %}
"""

main_template = """
html, body, div, span, ul, li, img{
padding: 0;
margin: 0;
border: 0;
outline: 0;
display: block;
background-color: transparent;
-webkit-text-decoration-skip: objects;
border-style: none;
vertical-align: baseline;
text-decoration: none;
text-rendering: auto;
-webkit-font-smoothing: antialiased;
font-size: 100%;
-ms-text-size-adjust: 100%;
-webkit-text-size-adjust: 100%;
font: inherit;
font-family: arial, sans serif;
color: black;
line-height: 1;
list-style: none;
overflow: hidden;
list-style: none;
list-style-image: none;
white-space: normal;
-ms-interpolation-mode: nearest-neighbor;
image-rendering: -webkit-optimize-contrast;
behavior: url(./PIE.htc);
}
.ellipsis {
    white-space: nowrap;
    overflow: hidden;
}

.ellipsis.multiline {
    white-space: normal;
}

#mainContainer {
    {{ elps(main['width'], main['height'], 0, 0, 'relative') }}
    {{ brr(main['border_radius']) }}
    {{ bg(main['background_color']) }}
    {{ br(main['border'], main['border_color']) }}
    behavior: url(PIE.htc);
}

#mainHeader {
    {% set item = main['header'] %}
    {{ elps(
        item['width'],
        item['height'],
        item['top'],
        item['left'],
        'relative'
    ) }}
    behavior: url(PIE.htc);
}

#mainFooter {
    {% set item = main['footer'] %}
    {{ elps(
        item['width'],
        item['height'],
        item['top'],
        item['left'],
        'relative'
    ) }}
    behavior: url(PIE.htc);
}
.imageCon ul {
    position: relative;
    display: -moz-inline-stack;
    display: inline-block;
    zoom: 1;
    *display: inline;
    behavior: url(PIE.htc);
}
.imageCon ul li {
    float: left;
    display: -moz-inline-stack;
    display: inline-block;
    zoom: 1;
    *display: inline;
    behavior: url(PIE.htc);
}
div.control_prev, div.control_next {
    position: absolute;
    top: 35%;
    z-index: 2000;
    display: block;
    padding: 15% 0%;
    width: auto;
    height: auto;
    background: #2a2a2a;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    font-size: 9px;
    opacity: 0.5;
    border: 1px solid #fff;
    cursor: pointer;
    behavior: url(PIE.htc);
}
div.control_prev:hover, div.control_next:hover {
    opacity: 1;
    padding: 15% 15%;
    -webkit-transition: all 0.2s ease;
    behavior: url(./PIE.htc);
}
div.control_prev {
    border-radius: 0 5px 5px 0;
    behavior: url(PIE.htc);
}
div.control_next {
    right: 0;
    border-radius: 5px 0 0 5px;
    behavior: url(PIE.htc);
}

"""

adv_template = """
{% for name, setting in adv_style.items() -%}
    {% set header = setting['header'] %}
    {% set description = setting['description'] %}
    {% set cost = setting['cost'] %}
    {% set button = setting['button'] %}
    {% set image = setting['image'] %}
    {% set logo = setting['logo'] %}
    .adv{{ name }} {
        float: left; 
        {{ elps(
            setting['width'],
            setting['height'],
            setting['top'],
            setting['left'],
            'relative'
        ) }}
        {{ bg(setting['background_color']) }}
        {{ br(setting['border'], setting['border_color']) }}
        {{ brr(setting['border_radius']) }}
        {{ marg(setting['margin']) }}
        {{ pad(setting['padding']) }}
        behavior: url(PIE.htc);
    }
    .adv{{ name }}>.header,.adv{{ name }}>.header:visited,.adv{{ name }}>.header:active,.adv{{ name }}>.header:link {
        {{ elps(
            header['width'],
            header['height'],
            header['top'],
            header['left']
        ) }}
        {% set font = header['font'] %}
        {{ fs(font['letter'],
            font['decoration'],
            font['align'],
            font['variant'],
            font['size'],
            font['color'],
            font['weight'],
            font['line'],
            font['family']
        )
        }}
        {{ br(header['border'], header['border_color']) }}
        z-index: {{header['z']}};
        {{ marg(header['margin']) }}
        {{ pad(header['padding']) }}
        {{ bg(header['background_color']) }}
        {{ brr(header['border_radius']) }}
        {{ op(header['opacity']) }}
        behavior: url(PIE.htc);
    }
    .adv{{ name }}>.header:hover {
        text-decoration: underline;
        behavior: url(PIE.htc);
    }
    .adv{{ name }}>.description,.adv{{ name }}>.description:visited,.adv{{ name }}>.description:active,.adv{{ name }}>.description:link {
        {{ elps(
            description['width'],
            description['height'],
            description['top'],
            description['left']
        ) }}
        {% set font = description['font'] %}
        {{ fs(font['letter'],
            font['decoration'],
            font['align'],
            font['variant'],
            font['size'],
            font['color'],
            font['weight'],
            font['line'],
            font['family']
        )
        }}
        {{ br(description['border'], description['border_color']) }}
        z-index: {{description['z']}};
        {{ marg(description['margin']) }}
        {{ pad(description['padding']) }}
        {{ bg(description['background_color']) }}
        {{ brr(description['border_radius']) }}
        {{ op(description['opacity']) }}
        behavior: url(PIE.htc);
    }
    .adv{{ name }}>.description:hover {
        text-decoration: underline;
        behavior: url(PIE.htc);
    }
    .adv{{ name }}>.cost,.adv{{ name }}>.cost:visited,.adv{{ name }}>.cost:active,.adv{{ name }}>.cost:link {
        {{ elps(
            cost['width'],
            cost['height'],
            cost['top'],
            cost['left']
        ) }}
        {% set font = cost['font'] %}
        {{ fs(font['letter'],
            font['decoration'],
            font['align'],
            font['variant'],
            font['size'],
            font['color'],
            font['weight'],
            font['line'],
            font['family']
        )
        }}
        white-space:nowrap;
        text-overflow: ellipsis;
        {{ br(cost['border'], cost['border_color']) }}
        z-index: {{cost['z']}};
        {{ marg(cost['margin']) }}
        {{ pad(cost['padding']) }}
        {{ bg(cost['background_color']) }}
        {{ brr(cost['border_radius']) }}
        {{ op(cost['opacity']) }}
        behavior: url(PIE.htc);
    }
    .adv{{ name }}>.cost:hover {
        text-decoration: underline;
        behavior: url(PIE.htc);
    }
    .adv{{ name }}>.button,.adv{{ name }}>.button:visited,.adv{{ name }}>.button:active,.adv{{ name }}>.button:link {
        {{ elps(
            button['width'],
            button['height'],
            button['top'],
            button['left']
        ) }}
        {{ br(button['border'], button['border_color']) }}
        {% set font = button['font'] %}
        {{ fs(font['letter'],
            font['decoration'],
            font['align'],
            font['variant'],
            font['size'],
            font['color'],
            font['weight'],
            font['line'],
            font['family']
        )
        }}
        line-height: {{button['height']}}px;
        z-index: {{button['z']}};
        {{ marg(button['margin']) }}
        {{ pad(button['padding']) }}
        {{ bg(button['background_color']) }}
        {{ brr(button['border_radius']) }}
        {{ op(button['opacity']) }}
        behavior: url(PIE.htc);

    }
    .adv{{ name }}>.button:hover {
        text-decoration: underline;
        behavior: url(PIE.htc);
    }
    .adv{{ name }}>.imageCon{
        {{ elps(
            image['width'],
            image['height'],
            image['top'],
            image['left']
        ) }}
        {{ br(image['border'], image['border_color']) }}
        {{ brr(image['border_radius']) }}
        behavior: url(PIE.htc);
    }
    .adv{{ name }} ul > li > img {
        {{ elps(
            image['width'],
            image['height'],
            ps='relative'
        ) }}
        {{ br(image['border'], image['border_color']) }}
        {{ brr(image['border_radius']) }}
        behavior: url(PIE.htc);
    }

    {% if logo -%}
        .logo{{ name }} {
            float: left;
            {{ elps(
                logo['width'],
                logo['height'],
                logo['top'],
                logo['left'],
                'relative'
            ) }}
            {{ bg(logo['background_color']) }}
            {{ br(logo['border'], logo['border_color']) }}
            {{ brr(logo['border_radius']) }}
            {{ marg(logo['margin']) }}
            behavior: url(PIE.htc);
        }
        .logo{{ name }}>.header,.logo{{ name }}>.header:visited,.logo{{ name }}>.header:active,.logo{{ name }}>.header:link {
            {{ elps(
                logo['header']['width'],
                logo['header']['height'],
                logo['header']['top'],
                logo['header']['left']
            ) }}
            {% set font = logo['header']['font'] %}
            {{ fs(font['letter'],
                font['decoration'],
                font['align'],
                font['variant'],
                font['size'],
                font['color'],
                font['weight'],
                font['line'],
                font['family']
            )
            }}
            behavior: url(PIE.htc);
        }
        .logo{{ name }}>.header:hover {
            text-decoration: underline;
            behavior: url(PIE.htc);
        }
           .logo{{ name }}>.button,.logo{{ name }}>.button:visited,.logo{{ name }}>.button:active,.logo{{ name }}>.button:link {
            {{ elps(
                logo['button']['width'],
                logo['button']['height'],
                logo['button']['top'],
                logo['button']['left']
            ) }}
            {{ bg(logo['button']['background_color']) }}
            {{ br(logo['button']['border'], logo['button']['border_color']) }}
            {{ brr(logo['button']['border_radius']) }}
            {% set font = logo['button']['font'] %}
            {{ fs(font['letter'],
                font['decoration'],
                font['align'],
                font['variant'],
                font['size'],
                font['color'],
                font['weight'],
                font['line'],
                font['family']
            )
            }}
            line-height: {{logo['button']['height']}}px;
            behavior: url(PIE.htc);
        }
        .logo{{ name }}>.button:hover {
            text-decoration: underline;
            behavior: url(PIE.htc);
        }

        .logo{{ name }}>.imageCon{
            {{ elps(
                logo['image']['width'],
                logo['image']['height'],
                logo['image']['top'],
                logo['image']['left']
            ) }}
            {{ br(logo['image']['border'], logo['image']['border_color']) }}
            {{ brr(logo['image']['border_radius']) }}
            behavior: url(PIE.htc);
        }
        .logo{{ name }}>.imageCon>.control_next, .logo{{ name }}>.imageCon>.control_prev{
            display: none;
            behavior: url(PIE.htc);
        }
        .logo{{ name }} ul > li > img {
            {{ elps(
                logo['image']['width'],
                logo['image']['height'],
                ps='relative'
            ) }}
            {{ br(logo['image']['border'], logo['image']['border_color']) }}
            {{ brr(logo['image']['border_radius']) }}
            behavior: url(PIE.htc);
        }
    {%- endif %}
{%- endfor %}
"""

full_template = ' '.join([macro_template, main_template, adv_template])
full_template = css_minifier(full_template)
full = Template(full_template, trim_blocks=True, lstrip_blocks=True, enable_async=True)
