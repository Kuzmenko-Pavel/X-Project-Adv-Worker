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
                jQuery('body').html(templates.advBlockPartnerTemplate({
                    src: this.app.settings.not_found + '?scr=' + this.app.adsparams.block_id +
                    '&w=' + this.app.params.w_w + '&h=' + this.app.params.w_h,
                    h: this.app.params.w_h,
                    w: this.app.params.w_w
                }));
            };
            render_obj.parther = function () {
                jQuery('body').html(templates.advBlockPartnerTemplate({
                    src: this.app.settings.partners + '?scr=' + this.app.adsparams.block_id +
                    '&w=' + this.app.params.w_w + '&h=' + this.app.params.w_h,
                    h: this.app.params.w_h,
                    w: this.app.params.w_w
                }));
            };
            return render_obj;
        };
    });