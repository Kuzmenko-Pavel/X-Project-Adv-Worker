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
            render_obj.create_root = function () {
                this.parent_el = jQuery('#' + this.app.adsparams.rend_id);
                this.parent_el.empty();
                this.root = jQuery("<div/>");
                if (this.root[0].attachShadow) {
                    try {
                        this.parent_el.append(this.root);
                        this.root = jQuery(this.root[0].attachShadow({mode: "closed"}));
                    }
                    catch (err) {
                        this.root = this.parent_el;
                    }
                }
                else if (this.root[0].createShadowRoot) {
                    this.parent_el.append(this.root);
                    try {
                        this.root = jQuery(this.root[0].createShadowRoot());
                    }
                    catch (err) {
                        this.root = this.parent_el;
                    }
                }
                else {
                    this.root = this.parent_el;
                }
            };
            render_obj.render = function () {
                this.create_root();
                this.root.append(templates.advBlockTemplate({
                    mainHeader: this.app.advertise.header_html,
                    ads: templates.advTemplate({offers: this.app.advertise.offers}),
                    mainFooter: this.app.advertise.footer_html
                }));
                this.apply_css(this.root);
                var $adsContainer = jQuery('#adsContainer', this.root);
                this.redirect($adsContainer);
                this.slider($adsContainer);
                jQuery('.ellipsis', this.root).ellipsis();
            };
            render_obj.not_found = function () {
                jQuery('body').html(templates.advBlockPartnerTemplate({
                    src: this.app.settings.not_found + '?scr=' + this.app.adsparams.guid_block +
                    '&w=' + this.app.params.w_w + '&h=' + this.app.params.w_h,
                    h: this.app.params.w_h,
                    w: this.app.params.w_w
                }));
            };
            render_obj.parther = function () {
                jQuery('body').html(templates.advBlockPartnerTemplate({
                    src: this.app.settings.partners + '?scr=' + this.app.adsparams.guid_block +
                    '&w=' + this.app.params.w_w + '&h=' + this.app.params.w_h,
                    h: this.app.params.w_h,
                    w: this.app.params.w_w
                }));
            };
            return render_obj;
        };
    });