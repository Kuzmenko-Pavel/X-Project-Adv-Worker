/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['./../jquery','./../underscore', './../loader/offers_log'], function (jQuery, _, offers_log) {
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
        if (server_obj.block.id === undefined){
            this.app.render.not_found();
        }
        else{
            this.informer_id = server_obj.block.guid;
            this.informer_id_int = server_obj.block.id;
            this.footer_html = server_obj.block.footer_html;
            this.header_html = server_obj.block.header_html;
            this.css = server_obj.css;
            this.offers = server_obj.offers;
            this.app.render.render();
            this.app.uh.exclude_clean(server_obj.clean.place);
            if (server_obj.clean.place){
                this.app.uh.retargeting_clean(server_obj.clean.dynamic_retargeting);
                this.app.uh.retargeting_account_clean(server_obj.clean.account_retargeting);
            }
            if (this.offers.length === 0){
                this.app.uh.exclude_clean(true);
                this.app.uh.retargeting_clean(true);
                this.app.uh.retargeting_account_clean(true);
                this.app.uh.exclude_click_clean(true);
                this.app.uh.retargeting_click_clean(true);
            }
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
        var offer = this.get(id);
        var popup = window.open(offer.url, '_blank');
        if (popup) {
            popup.moveTo(0, 0);
        }
        this.app.uh.load();
        if (offer.camp.retargeting) {
            this.app.uh.retargeting_exclude_click.add(offer.id, 1);
        }
        else {
            this.app.uh.exclude_click.add(offer.id, 1);
        }
        this.app.uh.save();
        this.app.loader();
    };
    Advertise.prototype.view = function () {
        this.app.uh.load();
        _.each(this.offers, function (offer) {
            if (offer.retargeting) {
                this.app.uh.retargeting_exclude.add(offer.id, offer.unique_impression_lot);
                this.app.uh.retargeting_view.add(offer.id);
            }
            else {
                this.app.uh.exclude.add(offer.id, offer.unique_impression_lot);
            }
        }, this);
        this.app.uh.save();
        offers_log(this.app);
    };
    return Advertise;
});