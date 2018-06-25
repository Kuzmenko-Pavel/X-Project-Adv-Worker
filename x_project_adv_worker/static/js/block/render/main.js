/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['./../jquery', './bind_redirect', './bind_slider', './apply_css', './../templates/main'],
    function (jQuery, redirect, slider, apply_css, templates) {
        return function (app) {
            var render_obj = new Object({app: app});
            render_obj.redirect = redirect;
            render_obj.slider = slider;
            render_obj.apply_css = apply_css;
            render_obj.render = function () {
                jQuery('body').html(templates.advBlockTemplate({
                    mainHeader: this.app.advertise.header_html,
                    ads: templates.advTemplate({offers: this.app.advertise.offers}),
                    mainFooter: this.app.advertise.footer_html
                }));
                this.apply_css();
                var $adsContainer = jQuery('#adsContainer');
                this.redirect($adsContainer);
                this.slider($adsContainer);
                jQuery('.ellipsis').ellipsis();
            };
            render_obj.not_found = function () {
                (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                  })(window,document,'script','https://cdn.yottos.com/ua_5703702_12.js','ga');
                jQuery('body').html(templates.advBlockNotFoundTemplate());
            };
            return render_obj;
        };
    });