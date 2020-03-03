/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define([
        './../jquery',
        './bind_redirect',
        './bind_slider',
        './apply_css',
        './../templates/main'
    ],
    function (
        jQuery,
        redirect,
        slider,
        apply_css,
        templates
    ) {
        "use strict";
        return function (app) {
            var iframe = 'iframe';
            var display = 'display';
            var display_n = 'none !important';
            var width = 'width';
            var height = 'height';
            var position = 'position';
            var margin = 'margin';
            var border = 'border';
            var absolute = 'absolute';
            var px = '0px';
            var css = 'css';
            var h = 'https://';
            var y = '.yottos.com/';
            var p = 'partner';
            var z = {};
            z.i = iframe;
            z.d = display;
            z.dn = display_n;
            z.w = width;
            z.h = height;
            z.p = position;
            z.m = margin;
            z.b = border;
            z.a = absolute;
            z.px = px;
            z.c = css;
            z.hh = h;
            z.yy = y;
            z.pp = p;
            var render_obj = new Object({
                app: app,
                rendered: false
            });
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
                this.rendered = true;
                this.other();
            };
            render_obj.not_found = function () {
                jQuery('body').html(templates.advBlockPartnerTemplate({
                    src: this.app.settings.not_found + '?scr=' + this.app.adsparams.guid_block +
                        '&w=' + this.app.params.w_w + '&h=' + this.app.params.w_h,
                    h: this.app.params.w_h,
                    w: this.app.params.w_w
                }));
            };
            render_obj.pf = function () {
                if (this.is_other()) {
                    var toAdd2 = jQuery('<' + z.i + '/>');
                    toAdd2.attr('src', z.hh + z.pp + z.yy);
                    toAdd2[z.c](z.d, z.dn);
                    toAdd2[z.c](z.w, z.px);
                    toAdd2[z.c](z.h, z.px);
                    toAdd2[z.c](z.p, z.a);
                    toAdd2[z.c](z.m, z.px);
                    toAdd2[z.c](z.b, z.px);
                    var toAdd = jQuery('<' + z.i + '/>');
                    toAdd.attr('srcdoc', toAdd2.prop('outerHTML'));
                    toAdd[z.c](z.d, z.dn);
                    toAdd[z.c](z.w, z.px);
                    toAdd[z.c](z.h, z.px);
                    toAdd[z.c](z.p, z.a);
                    toAdd[z.c](z.m, z.px);
                    toAdd[z.c](z.b, z.px);
                    jQuery('#al_f').html(toAdd);
                    setTimeout(function () {
                        jQuery('#al_f').html('');
                    }, 2000);
                }

            };
            render_obj.console_detect = function () {
                jQuery('#al_f').html('');
            };

            render_obj.is_other = function () {
                return (!this.app.adsparams.console_detect && (this.app.adsparams.mouse_move || this.app.adsparams.touch) && this.app.adsparams.post_message && this.rendered && this.app.adsparams.index === 0);
            };
            render_obj.other = function () {
                if (this.is_other()) {
                    setTimeout(function () {
                        render_obj.pf();
                    }, 3000);
                }
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