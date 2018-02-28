/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['./../jquery', './../underscore', './bind_redirect', './bind_slider', './apply_css'],
    function (jQuery, redirect, templates, slider, apply_css) {
        return function (app) {
            var render_obj = new Object({app: app});
            render_obj.redirect = redirect;
            render_obj.slider = slider;
            render_obj.apply_css = apply_css;
            render_obj.render = function () {
                // var $adsContainer = jQuery('#adsContainer');
                // this.redirect($adsContainer);
                // this.slider($adsContainer);
                this.apply_css();
                jQuery('body').append('<pre id="json"></pre>');
                jQuery('#json').html(JSON.stringify(this.app.advertise.offers, null, 2));
                jQuery('.ellipsis').ellipsis();
            };
            return render_obj;
        };
    });