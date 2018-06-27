/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define([
    './../jquery',
    './../underscore'
], function (
    jQuery,
    _
) {
    var Advertise = function (app) {
        this.app = app;
        this.informer_id = '';
        this.informer_id_int = 0;
        this.footer_html = "";
        this.header_html = "";
        this.offers = [];
        this.css = "";
    };
    Advertise.prototype.parse = function (server_obj) {
        var app = this.app;
        var uh = app.uh;
        if (server_obj.block.id === undefined){
            this.app.render.not_found();
        }
        else{
            app.logger.offer_status = 'initial';
            this.informer_id = server_obj.block.guid;
            this.informer_id_int = server_obj.block.id;
            this.footer_html = server_obj.block.footer_html;
            this.header_html = server_obj.block.header_html;
            this.css = server_obj.css;
            this.offers = server_obj.offers;
            app.render.render();
            uh.exclude_clean(server_obj.clean.place);
            if (server_obj.clean.place || server_obj.clean.place === null) {
                uh.retargeting_clean(server_obj.clean.dynamic_retargeting);
                uh.retargeting_account_clean(server_obj.clean.account_retargeting);
            }
            if (server_obj.clean.social) {
                uh.exclude_clean(true);
                uh.retargeting_clean(true);
                uh.retargeting_account_clean(true);
                uh.exclude_click_clean(true);
                uh.retargeting_click_clean(true);
            }
            if (this.offers.length === 0){
                uh.exclude_clean(true);
                uh.retargeting_clean(true);
                uh.retargeting_account_clean(true);
                uh.exclude_click_clean(true);
                uh.retargeting_click_clean(true);
            }
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
    Advertise.prototype.click = function (id) {
        var app = this.app;
        var uh = app.uh;
        var offer = this.get(id);
        var popup = window.open(offer.url, '_blank');
        if (popup) {
            popup.moveTo(0, 0);
        }
        uh.load();
        if (offer.retargeting) {
            uh.retargeting_exclude_click.add(offer.id, 1);
        }
        else {
            uh.exclude_click.add(offer.id, 1);
        }
        uh.save();
        app.adsparams.request = 'rotate';
        app.loader();
    };
    return Advertise;
});