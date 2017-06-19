macro_template = """
{% macro clp() -%}
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;
{%- endmacro %}

{% macro br(size=False, color='black') -%}
  @if $size and $size > 0 {
    border: $size + 0px solid $color;
  }
  {% else %}
    border: none;
  }
{%- endmacro %}

{% macro bg($color: false) -%}
  @if $color and $color != 'transparent' {
    background-color: $color;
  }
  {% else %}
    background-color: transparent;
  }
{%- endmacro %}

{% macro hide($hd: false) -%}
@mixin hide($hd: false){
  @if $hd {
    display: none;
  }
{%- endmacro %}

{% macro marg($margin) -%}
    margin-top: nth($margin, 1) + 0px;
    margin-right: nth($margin, 2) + 0px;
    margin-bottom: nth($margin, 3) + 0px;
    margin-left: nth($margin, 4) + 0px;
{%- endmacro %}

{% macro brr($radiuses) -%}
  -webkit-border-top-left-radius: nth($radiuses, 1) + 0px;
  -webkit-border-top-right-radius: nth($radiuses, 2) + 0px;
  -webkit-border-bottom-right-radius: nth($radiuses, 3) + 0px;
  -webkit-border-bottom-left-radius: nth($radiuses, 4) + 0px;
  -khtml-border-top-left-radius: nth($radiuses, 1) + 0px;
  -khtml-border-top-right-radius: nth($radiuses, 2) + 0px;
  -khtml-border-bottom-right-radius: nth($radiuses, 3) + 0px;
  -khtml-border-bottom-left-radius: nth($radiuses, 4) + 0px;
  -moz-border-radius-topleft: nth($radiuses, 1) + 0px;
  -moz-border-radius-topright: nth($radiuses, 2) + 0px;
  -moz-border-radius-bottomright: nth($radiuses, 3) + 0px;
  -moz-border-radius-bottomleft: nth($radiuses, 4) + 0px;
  border-top-left-radius: nth($radiuses, 1) + 0px;
  border-top-right-radius: nth($radiuses, 2) + 0px;
  border-bottom-right-radius: nth($radiuses, 3) + 0px;
  border-bottom-left-radius: nth($radiuses, 4) + 0px;
  border-radius: nth($radiuses, 1) + 0px nth($radiuses, 2) + 0px nth($radiuses, 3) + 0px nth($radiuses, 4) + 0px;
  {{ clp() }}
{%- endmacro %}

{% macro fs($ls: false, $fu: false, $ta: false, $fv: false, $size: false, $colour: false, $weight: false,  $lh: false) -%}
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  @if $fu {
    text-decoration: underline;
  {% else %}
    text-decoration: none;
  }

  @if $ta {
    text-align: $ta;
  {% else %}
    text-align: center;
  }

  @if $fv {
    font-variant: small-caps;
  {% else %}
    font-variant: normal;
  }

  @if $size {
    font-size: $size + 0px;
  {% else %}
    font-size: 10px;
  {% endif %}

  @if $colour {
    color: $colour;
  {% else %}
    color: black;
  {% endif %}

  @if $weight {
    font-weight: bold;
  {% else %}
    font-weight: normal;
  {% endif %}

  @if $lh {
    line-height: $lh;
  {% else %}
    line-height: 1;
  {% endif %}
  @if $ls {
    letter-spacing: $ls + 0px;
  {% else %}
    letter-spacing: normal;
  {% endif %}
{%- endmacro %}

{% macro elps($w: false, $h: false, $t: false, $l: false, $ps: false) -%}
  @if $ps {
    position: $ps;
  {% else %}
    position: absolute;
  {% endif %}

  @if $t {
    top: $t + 0px;
  {% endif %}

  @if $l {
    left: $l + 0px;
  {% endif %}

  @if $w {
    width: $w + 0px;
  {% endif %}

  @if $h {
    height: $h + 0px;
  {% endif %}

{%- endmacro %}
"""

main_template = """
#mainContainer {
    @include elps(
        map_get($main, 'width'),
        map_get($main, 'height'),
        0,
        0,
        relative
    );
    @include brr(map_get($main, 'border_radius'));
    @include bg(map_get($main, 'background_color'));
    @include br(map_get($main, 'border'), map_get($main, 'border_color'));
}

#mainHeader {
    $i: map_get($main, 'header');
    @include elps(
        map_get($i, 'width'),
        map_get($i, 'height'),
        map_get($i, 'top'),
        map_get($i, 'left'),
        relative
    );
}

#mainFooter {
    $i: map_get($main, 'footer');
    @include elps(
        map_get($i, 'width'),
        map_get($i, 'height'),
        map_get($i, 'top'),
        map_get($i, 'left'),
        relative
    );
}
"""

adv_template = """
@each $name, $setting in $adv-style {
   .adv#{$name} {
     @include elps(
        map_get($setting, 'width'),
        map_get($setting, 'height'),
        map_get($setting, 'top'),
        map_get($setting, 'left'),
        relative
     );
     @include bg(map_get($setting, 'background_color'));
     @include br(map_get($setting, 'border'), map_get($setting, 'border_color'));
     @include brr(map_get($setting, 'border_radius'));
     @include marg(map_get($setting, 'margin'));
     > {
       .header, .header:visited, .header:active, .header:link {
            $i: map_get($setting, 'header');
            @include elps(
                map_get($i, 'width'),
                map_get($i, 'height'),
                map_get($i, 'top'),
                map_get($i, 'left')
             ); 
             $f: map_get($i, 'font');
             @include fs(map_get($f, 'letter'),
                         map_get($f, 'decoration'),
                         map_get($f, 'align'),
                         map_get($f, 'variant'),
                         map_get($f, 'size'),
                         map_get($f, 'color'),
                         map_get($f, 'weight'),
                         map_get($f, 'line')
                         )
       }
       .header:hover {
         text-decoration: underline;

       }
       .description, .description:visited, .description:active, .description:link {
            $i: map_get($setting, 'description');
            @include elps(
                map_get($i, 'width'),
                map_get($i, 'height'),
                map_get($i, 'top'),
                map_get($i, 'left')
             );
             $f: map_get($i, 'font');
             @include fs(map_get($f, 'letter'),
                         map_get($f, 'decoration'),
                         map_get($f, 'align'),
                         map_get($f, 'variant'),
                         map_get($f, 'size'),
                         map_get($f, 'color'),
                         map_get($f, 'weight'),
                         map_get($f, 'line')
                         )
       }
       .description:hover {
         text-decoration: underline;

       }
       .cost, .cost:visited, .cost:active, .cost:link {
            $i: map_get($setting, 'cost');
            @include elps(
                map_get($i, 'width'),
                map_get($i, 'height'),
                map_get($i, 'top'),
                map_get($i, 'left')
             ); 
             $f: map_get($i, 'font');
             @include fs(map_get($f, 'letter'),
                         map_get($f, 'decoration'),
                         map_get($f, 'align'),
                         map_get($f, 'variant'),
                         map_get($f, 'size'),
                         map_get($f, 'color'),
                         map_get($f, 'weight'),
                         map_get($f, 'line')
            )

       }
       .cost:hover {
         text-decoration: underline;

       }
       .button, .button:visited, .button:active, .button:link {
            $i: map_get($setting, 'cost');
            @include elps(
                map_get($i, 'width'),
                map_get($i, 'height'),
                map_get($i, 'top'),
                map_get($i, 'left')
             ); 
         span {
           display: none;

         }
       }
       .button:hover {

       }
       .button:after {

       }
       .imageCon {
        $i: map_get($setting, 'image');
            @include elps(
                map_get($i, 'width'),
                map_get($i, 'height'),
                map_get($i, 'top'),
                map_get($i, 'left')
             );
        @include br(map_get($i, 'border'), map_get($i, 'border_color'));
        @include brr(map_get($i, 'border_radius'));
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
           &:hover {
             opacity: 1;
             padding: 15% 15%;
             -webkit-transition: all 0.2s ease;

           }
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
         > img {
            $i: map_get($setting, 'cost');
            @include elps(
                map_get($i, 'width'),
                map_get($i, 'height'),
                $ps: relative
             );
         }
       }

     }

   }
}
"""

logo_template = """
@each $name, $setting in $logo-style {
   .logo#{$name} {
     > {
       .header, .header:visited, .header:active, .header:link {
          width: map_get($setting, 'width')
       }
       .header:hover {
         text-decoration: underline;

       }
       .description, .description:visited, .description:active, .description:link {

       }
       .description:hover {
         text-decoration: underline;

       }
       .cost, .cost:visited, .cost:active, .cost:link {

       }
       .cost:hover {
         text-decoration: underline;

       }
       .button, .button:visited, .button:active, .button:link {
         span {
           display: none;

         }
       }
       .button:hover {

       }
       .button:after {

       }
       .imageCon {
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
           &:hover {
             opacity: 1;
             padding: 15% 15%;
             -webkit-transition: all 0.2s ease;

           }
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
         .image {

         }
       }

     }

   }
}
"""
