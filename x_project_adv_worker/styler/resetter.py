from x_project_adv_worker.utils import css_minifier
reset_css = css_minifier('''
html, body, div{
padding: 0;
margin: 0;
border: 0;
outline: 0;
display: block;
background-color: transparent;
border-style: none;
vertical-align: baseline;
list-style: none;
overflow: hidden;
list-style: none;
list-style-image: none;
white-space: normal;
}
''')
