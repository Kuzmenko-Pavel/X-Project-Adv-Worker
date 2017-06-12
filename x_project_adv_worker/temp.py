a = """
$border: (5 5 5 5);
$adv-style: (Block:(width: 10px), RetBlock:(width: 10px), RecBlock:(width: 10px));

@mixin clip-padding {
  -webkit-background-clip: padding-box;
  -moz-background-clip: padding;
  background-clip: padding-box;
}

@mixin border-radius($radiuses) {
  -webkit-border-top-left-radius: nth($radiuses, 1) px;
  -webkit-border-top-right-radius: nth($radiuses, 2) px;
  -webkit-border-bottom-right-radius: nth($radiuses, 3) px;
  -webkit-border-bottom-left-radius: nth($radiuses, 4) px;
  -moz-border-radius-topleft: nth($radiuses, 1) px;
  -moz-border-radius-topright: nth($radiuses, 2) px;
  -moz-border-radius-bottomright: nth($radiuses, 3) px;
  -moz-border-radius-bottomleft: nth($radiuses, 4) px;
  border-top-left-radius: nth($radiuses, 1) px;
  border-top-right-radius: nth($radiuses, 2) px;
  border-bottom-right-radius: nth($radiuses, 3) px;
  border-bottom-left-radius: nth($radiuses, 4) px;
  border-radius: nth($radiuses, 1) px nth($radiuses, 2) px nth($radiuses, 3) px nth($radiuses, 4) px;
  @include clip-padding;
}



#mainContainer {
    @include border-radius($border);
}

#mainHeader {

}

#mainFooter {

}
@each $name, $setting in $adv-style {
   .adv#{$name} {
     div {
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
