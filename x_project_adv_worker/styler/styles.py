from jinja2 import Template
from x_project_adv_worker.utils import css_minifier

macro_template = """
{% macro clp() -%}
-webkit-background-clip: padding-box;
-moz-background-clip: padding;
background-clip: padding-box;
{%- endmacro %}

{% macro br(size=None, color='black') -%}
{% if size >0 -%}
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
text-overflow: ellipsis;
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
font-family: 'arial, sans serif';
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
{{ elps(main.width, main.height, 0, 0, relative) }}
{{ brr(main.border_radius) }}
{{ bg(main.background_color) }}
{{ br(main.border, main.border_color) }}
}

#mainHeader {
{{ elps(
main.header.width,
main.header.height,
main.header.top,
main.header.left,
relative
) }}
}

#mainFooter {
{{ elps(
main.footer.width,
main.footer.height,
main.footer.top,
main.footer.left,
relative
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
.adv{{ name }} {
{{ elps(
setting.width,
setting.height,
setting.top,
setting.left,
'relative'
) }}
float: left;
{{ bg(setting.background_color) }}
{{ br(setting.border, setting.border_color) }}
{{ brr(setting.border_radius) }}
{{ marg(setting.margin) }}
}
.adv{{ name }}>.header,.adv{{ name }}>.header:visited,.adv{{ name }}>.header:active,.adv{{ name }}>.header:link {
{{ elps(
setting.header.width,
setting.header.height,
setting.header.top,
setting.header.left
) }}
{{ fs(setting.header.font.letter,
setting.header.font.decoration,
setting.header.font.align,
setting.header.font.variant,
setting.header.font.size,
setting.header.font.color,
setting.header.font.weight,
setting.header.font.line,
setting.header.font.family
)
}}
}
.adv{{ name }}>.header:hover {
text-decoration: underline;
}
.adv{{ name }}>.description,.adv{{ name }}>.description:visited,.adv{{ name }}>.description:active,.adv{{ name }}>.description:link {
{{ elps(
setting.description.width,
setting.description.height,
setting.description.top,
setting.description.left
) }}
{{ fs(setting.description.font.letter,
setting.description.font.decoration,
setting.description.font.align,
setting.description.font.variant,
setting.description.font.size,
setting.description.font.color,
setting.description.font.weight,
setting.description.font.line,
setting.description.font.family
)
}}
}
.adv{{ name }}>.description:hover {
text-decoration: underline;
}
.adv{{ name }}>.cost,.adv{{ name }}>.cost:visited,.adv{{ name }}>.cost:active,.adv{{ name }}>.cost:link {
{{ elps(
setting.cost.width,
setting.cost.height,
setting.cost.top,
setting.cost.left
) }}
{{ fs(setting.cost.font.letter,
setting.cost.font.decoration,
setting.cost.font.align,
setting.cost.font.variant,
setting.cost.font.size,
setting.cost.font.color,
setting.cost.font.weight,
setting.cost.font.line,
setting.cost.font.family
)
}}
}
.adv{{ name }}>.cost:hover {
text-decoration: underline;
}
.adv{{ name }}>.button,.adv{{ name }}>.button:visited,.adv{{ name }}>.button:active,.adv{{ name }}>.button:link {
{{ elps(
setting.button.width,
setting.button.height,
setting.button.top,
setting.button.left
) }}
}
.adv{{ name }}>.button span,.adv{{ name }}>.button:visited span,.adv{{ name }}>.button:active span,.adv{{ name }}>.button:link span {
display: none;
}
.adv{{ name }}>.button:hover {
}
.adv{{ name }}>.button:after {
}
.adv{{ name }}>.imageCon{
{{ elps(
setting.image.width,
setting.image.height,
setting.image.top,
setting.image.left
) }}
{{ br(setting.image.border, setting.image.border_color) }}
{{ brr(setting.image.border_radius) }}
}
.adv{{ name }}>img {
{{ elps(
setting.image.width,
setting.image.height,
ps='relative'
) }}
{{ br(setting.image.border, setting.image.border_color) }}
{{ brr(setting.image.border_radius) }}
}
{%- endfor %}
"""

logo_template = """
{% for name, setting in logo_style.items() %}
.adv{{ name }} {
 {{ elps(
    setting.width,
    setting.height,
    setting.top,
    setting.left,
    'relative'
) }}
{{ bg(setting.background_color) }}
{{ br(setting.border, setting.border_color) }}
{{ brr(setting.border_radius) }}
{{ marg(setting.margin) }}
}
.adv{{ name }} > .header, .header:visited, .header:active, .header:link {
{{ elps(
setting.header.width,
setting.header.height,
setting.header.top,
setting.header.left
) }}
{{ fs(setting.header.font.letter,
setting.header.font.decoration,
setting.header.font.align,
setting.header.font.variant,
setting.header.font.size,
setting.header.font.color,
setting.header.font.weight,
setting.header.font.line
)
}}
}
.adv{{ name }} > .header:hover {
text-decoration: underline;
}
.adv{{ name }} > .description, .description:visited, .description:active, .description:link {
{{ elps(
setting.description.width,
setting.description.height,
setting.description.top,
setting.description.left
) }}
{{ fs(setting.description.font.letter,
setting.description.font.decoration,
setting.description.font.align,
setting.description.font.variant,
setting.description.font.size,
setting.description.font.color,
setting.description.font.weight,
setting.description.font.line
)
}}
}
.adv{{ name }} > .description:hover {
text-decoration: underline;
}
.adv{{ name }} > .cost, .cost:visited, .cost:active, .cost:link {
{{ elps(
setting.cost.width,
setting.cost.height,
setting.cost.top,
setting.cost.left
) }}
{{ fs(setting.cost.font.letter,
setting.cost.font.decoration,
setting.cost.font.align,
setting.cost.font.variant,
setting.cost.font.size,
setting.cost.font.color,
setting.cost.font.weight,
setting.cost.font.line
)
}}
}
.adv{{ name }} > .cost:hover {
text-decoration: underline;
}
{% endfor %}
"""
full_template = ' '.join([macro_template, main_template, adv_template, logo_template])
full_template = css_minifier(full_template)
full = Template(full_template, trim_blocks=True, lstrip_blocks=True, enable_async=True)
