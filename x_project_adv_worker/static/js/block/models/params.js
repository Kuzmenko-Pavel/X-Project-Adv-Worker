/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['./../jquery', './../json3', './../underscore'], function (jQuery, JSON, _) {
    var Params = function (app) {
        this.app = app;
        this.w_h = jQuery(window).height();
        this.w_w = jQuery(window).width();
    };
    Params.prototype.generateRequestData = function (req_type) {
        this.app.uh.load();
        var data = {};
        if (req_type === 'advertises'){
            data['w'] = this.w_w;
            data['h'] = this.w_h;
            data['block_id'] = this.app.adsparams.block_id;
            data['auto'] = this.app.adsparams.auto;
            data['country'] = this.app.adsparams.country;
            data['region'] = this.app.adsparams.region;
            data['ip'] = this.app.adsparams.ip;
            data['token'] = this.app.adsparams.token;
            data['is_webp'] = this.app.adsparams.is_webp;
            data['cost'] = this.app.uh.cost_user.get();
            data['gender'] = this.app.uh.gender_user.get();
            data['retargeting'] = this.app.uh.retargeting.get();
            data['index'] = parseInt(this.app.adsparams.index);
            if (!_.isNumber(data['index'])){
                data['index'] = 0;
            }
            data['exclude'] = this.app.uh.exclude_get();
            data['retargeting_account_exclude'] = this.app.uh.retargeting_account_exclude_get();
            data['retargeting_dynamic_exclude'] = this.app.uh.retargeting_exclude_get();
            data['retargeting'] = this.app.uh.retargeting.get();
        }
        else if (req_type === 'log'){
            data['params'] = {};
            data['params']['informer_id'] = this.app.advertise.informer_id;
            data['params']['informer_id_int'] = this.app.advertise.informer_id_int;
            data['params']['ip'] = this.app.adsparams.ip;
            data['params']['cookie'] = this.app.adsparams.cookie;
            data['params']['request'] = this.app.adsparams.request;
            data['params']['test'] = this.app.adsparams.test;
            data['items'] = jQuery.map(this.app.advertise.offers, function(dataItem) {
                var item = {};
                item.guid = dataItem.guid;
                item.id = dataItem.id;
                item.campaign_social = dataItem.campaign_social;
                item.token = dataItem.token;
                item.campaign_guid = dataItem.guid_cam;
                item.campaign_id = dataItem.id_cam;
                item.retargeting = dataItem.retargeting;
                item.branch = dataItem.branch;
                return item;
            });
        }
        return JSON.stringify(data);
    };
    return Params;
});