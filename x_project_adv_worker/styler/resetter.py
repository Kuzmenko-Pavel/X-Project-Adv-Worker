from x_project_adv_worker.utils import css_minifier
reset = css_minifier('''
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
''')
