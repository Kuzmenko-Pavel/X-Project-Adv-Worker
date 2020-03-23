/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define([
    './../jquery',
    './../underscore',
    './../ytl'
], function (
    jQuery,
    _,
    YottosLib
) {
    "use strict";
    var Advertise = function (app) {
        this.recall = 0;
        this.app = app;
        this.guid = '';
        this.id = '0';
        this.aid = '0';
        this.sid = '0';
        this.footer_html = "";
        this.header_html = "";
        this.offers = [];
        this.css = "";
    };
    Advertise.prototype.parse = function (
        server_obj,
        textStatus,
        jqXHR
    ) {
        var app = this.app;
        var uh = app.uh;
        if (server_obj.block.id === undefined) {
            return this.app.render.not_found();
        }
        else {
            app.logger.offer_status = 'initial';
            this.id = server_obj.block.id;
            this.aid = server_obj.block.aid;
            this.sid = server_obj.block.sid;
            this.footer_html = server_obj.block.footer_html;
            this.header_html = server_obj.block.header_html;
            this.css = server_obj.css;
            this.offers = server_obj.offers;
            if (server_obj.test) {
                this.app.adsparams.test = true;
            }
            if (server_obj.clean.thematic) {
                uh.thematic_clean(true);
            }
            if (server_obj.clean.place) {
                uh.exclude_clean(true);
                uh.thematic_clean(true);
                uh.retargeting_clean(true);
                uh.retargeting_account_clean(true);

            }
            if (server_obj.clean.social) {
                uh.exclude_clean(true);
                uh.retargeting_clean(true);
                uh.retargeting_account_clean(true);
                uh.exclude_click_clean(true);
                uh.retargeting_click_clean(true);
            }
            if (this.offers.length === 0) {
                uh.exclude_clean(true);
                uh.retargeting_clean(true);
                uh.retargeting_account_clean(true);
                uh.exclude_click_clean(true);
                uh.retargeting_click_clean(true);
                if (server_obj.parther) {
                    return app.render.parther();
                }
                else if (this.recall++ < 3) {
                    if (jqXHR && jqXHR.status === 200) {
                        app.adsparams.index = 0;
                    }
                    return app.loader();
                }
                else if (this.recall++ >= 3) {
                    return this.app.render.not_found();
                }
            }
            app.render.render();
            app.logger.offer_status = 'complite';
            app.logger.log();
        }
    };
    Advertise.prototype.get = function (id) {
        var offer = _.find(this.offers, function (element) {
            return element.id === id;
        });
        if (offer === undefined) {
            offer = this.offers[0];
        }
        return offer;
    };
    Advertise.prototype.click = function (item) {
        var ti = this.app.adsparams.ti || 0;
        var href = item.attr("href");
        item.attr("href", YottosLib.setUrlParameter(href, 'r', ti));
        setTimeout(_.bind(this.click_post, this), 0, item.data('id'));
    };
    Advertise.prototype.click_post = function (id) {
        var key = [
            'exclude_click',
            'retargeting_exclude_click',
            'thematics'
        ];
        var app = this.app;
        app.logger.block_initial();
        app.logger.log();
        app.logger.block_complite();
        app.logger.log();
        var uh = app.uh;
        var offer = this.get(id);
        uh.load(key);
        if (offer.retargeting) {
            uh[key[1]].add(offer.id, 1);
        }
        else {
            uh[key[0]].add(offer.id, 1);
        }
        _.each(offer.thematics, function (thematic) {
            uh[key[2]].add(thematic);
        });
        uh.save(key);
        app.adsparams.request = 'rotate';
        app.loader();

    };
    return Advertise;
});