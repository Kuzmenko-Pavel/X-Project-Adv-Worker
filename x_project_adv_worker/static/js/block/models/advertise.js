/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['./../jquery','./../underscore'], function (jQuery, _) {
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
        }
    };
    return Advertise;
});