/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['./../jquery','./../underscore'], function (jQuery, _) {
    var Informer = function (app) {
        this.app = app;
        this.informer_id = '';
        this.informer_id_int = 0;
        this.footerHtml = "";
        this.headerHtml = "";
        this.button = '';
        this.ret_button = '';
        this.rec_button = '';
        this.campaigns = {};
        this.css = "";
    };
    Informer.prototype.parse = function (server_obj) {
        if (server_obj.block){
            if (server_obj.block.id === undefined){
                return false;
            }
            this.informer_id = server_obj.block.guid;
            this.informer_id_int = server_obj.block.id;
            this.headerHtml = server_obj.block.headerHtml;
            this.footerHtml = server_obj.block.footerHtml;
            this.button = server_obj.block.button;
            this.ret_button = server_obj.block.ret_button;
            this.rec_button = server_obj.block.rec_button;
        }
        this.css = server_obj.css;
        _.each(server_obj.campaigns, function(element, index, list) {
            this.campaigns[element.id] = element;
        }, this);
        return true;
    };
    Informer.prototype.apply_css = function () {
        if (document.createStyleSheet)
        {
            var styleSheet = document.createStyleSheet("");
            styleSheet.cssText = this.css;
        }
        else
        {
            jQuery('<style type="text/css">' + this.css + '</style>').appendTo('head');
        }
    };
    return Informer;
});