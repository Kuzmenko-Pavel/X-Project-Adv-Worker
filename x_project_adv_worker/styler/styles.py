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
    margin-top: {{margin[0]}}px;
    margin-right: {{margin[1]}}px;
    margin-bottom: {{margin[2]}}px;
    margin-left: {{margin[3]}}px;
{%- endmacro %}

{% macro pad(padding) -%}
    padding-top: {{padding[0]}}px;
    padding-right: {{padding[1]}}px;
    padding-bottom: {{padding[2]}}px;
    padding-left: {{padding[3]}}px;
{%- endmacro %}

{% macro brr(radiuses) -%}
    -webkit-border-top-left-radius: {{ radiuses[0] }}px;
    -webkit-border-top-right-radius: {{ radiuses[1] }}px;
    -webkit-border-bottom-right-radius: {{ radiuses[2] }}px;
    -webkit-border-bottom-left-radius: {{ radiuses[3] }}px;
    -khtml-border-top-left-radius: {{ radiuses[0] }}px;
    -khtml-border-top-right-radius: {{ radiuses[1] }}px;
    -khtml-border-bottom-right-radius: {{ radiuses[2] }}px;
    -khtml-border-bottom-left-radius: {{ radiuses[3] }}px;
    -moz-border-radius-topleft: {{ radiuses[0] }}px;
    -moz-border-radius-topright: {{ radiuses[1] }}px;
    -moz-border-radius-bottomright: {{ radiuses[2] }}px;
    -moz-border-radius-bottomleft: {{ radiuses[3] }}px;
    border-top-left-radius: {{ radiuses[0] }}px;
    border-top-right-radius: {{ radiuses[1] }}px;
    border-bottom-right-radius: {{ radiuses[2] }}px;
    border-bottom-left-radius: {{ radiuses[3] }}px;
    border-radius: {{ radiuses[0] }}px {{ radiuses[1] }}px {{ radiuses[2] }}px {{ radiuses[3] }}px;
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
        font-size: {{size}}px;
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
        top: {{t}}px;
    {%- endif %}
    {% if l -%}
        left: {{l}}px;
    {%- endif %}
    {% if w -%}
        width: {{w}}px;
    {%- endif %}
    {% if h -%}
        height: {{h}}px;
    {%- endif %}
{%- endmacro %}
"""

main_template = """

#mainContainer {
    {{ elps(main['width'], main['height'], 0, 0, 'relative') }}
    {{ brr(main['border_radius']) }}
    {{ bg(main['background_color']) }}
    {{ br(main['border'], main['border_color']) }}
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
}

#mainFooter {
    {% set item = main['header'] %}
    {{ elps(
        item['width'],
        item['height'],
        item['top'],
        item['left'],
        'relative'
    ) }}
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
    behavior: url(PIE.htc);
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
        z-index: {{header['z']}};
        {{ marg(header['margin']) }}
        {{ pad(header['padding']) }}
        {{ bg(header['background_color']) }}
        {{ brr(header['border_radius']) }}
        {{ op(header['opacity']) }}
    }
    .adv{{ name }}>.header:hover {
        text-decoration: underline;
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
        z-index: {{description['z']}};
        {{ marg(description['margin']) }}
        {{ pad(description['padding']) }}
        {{ bg(description['background_color']) }}
        {{ brr(description['border_radius']) }}
        {{ op(description['opacity']) }}
    }
    .adv{{ name }}>.description:hover {
        text-decoration: underline;
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
        z-index: {{cost['z']}};
        {{ marg(cost['margin']) }}
        {{ pad(cost['padding']) }}
        {{ bg(cost['background_color']) }}
        {{ brr(cost['border_radius']) }}
        {{ op(cost['opacity']) }}
    }
    .adv{{ name }}>.cost:hover {
        text-decoration: underline;
    }
    .adv{{ name }}>.button,.adv{{ name }}>.button:visited,.adv{{ name }}>.button:active,.adv{{ name }}>.button:link {
        {{ elps(
            button['width'],
            button['height'],
            button['top'],
            button['left']
        ) }}
        {{ bg(button['background_color']) }}
        {{ br(button['border'], button['border_color']) }}
        {{ brr(button['border_radius']) }}
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

    }
    .adv{{ name }}>.button:hover {
        text-decoration: underline;
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
    }
    .adv{{ name }} ul > li > img {
        {{ elps(
            image['width'],
            image['height'],
            ps='relative'
        ) }}
        {{ br(image['border'], image['border_color']) }}
        {{ brr(image['border_radius']) }}
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
        }
        .logo{{ name }}>.header:hover {
            text-decoration: underline;
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
        }
        .logo{{ name }}>.button:hover {
            text-decoration: underline;
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
        }
        .logo{{ name }}>.imageCon>.control_next, .logo{{ name }}>.imageCon>.control_prev{
            display: none;
        }
        .logo{{ name }} ul > li > img {
            {{ elps(
                logo['image']['width'],
                logo['image']['height'],
                ps='relative'
            ) }}
            {{ br(logo['image']['border'], logo['image']['border_color']) }}
            {{ brr(logo['image']['border_radius']) }}
        }
    {%- endif %}
{%- endfor %}
"""

full_template = ' '.join([macro_template, main_template, adv_template])
full_template = css_minifier(full_template)
full = Template(full_template, trim_blocks=True, lstrip_blocks=True, enable_async=True)
