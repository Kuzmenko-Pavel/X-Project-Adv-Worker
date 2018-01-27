/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['./../jquery','./../underscore'], function (jQuery, _) {
    var Advertise = function (app) {
        this.app = app;
        this.informer_id = '';
        this.informer_id_int = 0;
        this.html = "";
        this.offers = [];
        this.css = "";
    };
    Advertise.prototype.parse = function (server_obj) {
        this.informer_id = server_obj.block.guid;
        this.informer_id_int = server_obj.block.id;
        this.css = server_obj.css;
        this.html = server_obj.html;
        this.offers = server_obj.offers;
        this.app.render.render();
    };
    return Advertise;
});