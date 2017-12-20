/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['jquery','underscore'], function (jQuery, _) {
    var Informer = function (app) {
        this.app = app;
        this.informer_id = '';
        this.informer_id_int = 0;
        this.footerHtml = "";
        this.headerHtml = "";
        this.blinking = 0;
        this.blinking_reload = false;
        this.html_notification = false;
        this.shake = 0;
        this.shake_mouse = false;
        this.shake_reload = false;
        this.capacity = 1;
        this.capacity_styling = 1;
        this.button = '';
        this.ret_button = '';
        this.rec_button = '';
        this.offer_count = {place:0, social:0, dynamic_retargeting:0, account_retargeting:0};
        this.campaigns = new Object();
        this.place = new Array();
        this.social = new Array();
        this.account_retargeting = new Array();
        this.dynamic_retargeting = new Array();
        this.css = "";
    };
    Informer.prototype.parse = function (server_obj) {
        this.css = server_obj.css;
        _.each(server_obj.campaigns, function(element, index, list) {
            if (element.retargeting && element.retargeting_type === 'offer'){
                this.dynamic_retargeting.push([element.id, element.offer_by_campaign_unique]);
                this.offer_count.dynamic_retargeting += element.offer_count;
            }
            else if (element.retargeting && element.retargeting_type === 'account'){
                this.account_retargeting.push([element.id, element.offer_by_campaign_unique]);
                this.offer_count.account_retargeting += element.offer_count;
            }
            else if (!element.retargeting && !element.social){
                this.place.push([element.id, element.offer_by_campaign_unique]);
                this.offer_count.place += element.offer_count;
            }
            else if (!element.retargeting && element.social){
                this.social.push([element.id, element.offer_by_campaign_unique]);
                this.offer_count.social += element.offer_count;
            }
            else{
                this.social.push([element.id, element.offer_by_campaign_unique]);
                this.offer_count.social += element.offer_count;
            }
            this.campaigns[element.id] = element;
        }, this);
        if (server_obj.block){
            if (server_obj.block.id === undefined){
                return false;
            }
            this.informer_id = server_obj.block.guid;
            this.informer_id_int = server_obj.block.id;
            this.capacity = server_obj.block.capacity;
            this.capacity_styling = server_obj.block.capacity_styling;
            this.headerHtml = server_obj.block.headerHtml;
            this.footerHtml = server_obj.block.footerHtml;
            this.blinking = server_obj.block.blinking;
            this.blinking_reload = server_obj.block.blinking_reload;
            this.html_notification = server_obj.block.html_notification;
            this.shake = server_obj.block.shake;
            this.shake_mouse = server_obj.block.shake_mouse;
            this.shake_reload = server_obj.block.shake_reload;
            this.button = server_obj.block.button;
            this.ret_button = server_obj.block.ret_button;
            this.rec_button = server_obj.block.rec_button;
        }
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