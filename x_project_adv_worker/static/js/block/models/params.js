/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['jquery', 'json', 'underscore'], function (jQuery, JSON, _) {
    var Params = function (app) {
        this.app = app;
        this.w_h = jQuery(window).height();
        this.w_w = jQuery(window).width();
    };
    Params.prototype.generateRequestData = function (req_type) {
        this.app.uh.load();
        var data = {};
        if (req_type === 'informer'){
            data['w'] = this.w_w;
                data['h'] = this.w_h;
            data['device'] = this.app.device;
            data['block_id'] = this.app.adsparams.block_id;
            data['auto'] = this.app.adsparams.auto;
            data['country'] = this.app.adsparams.country;
            data['region'] = this.app.adsparams.region;
            data['ip'] = this.app.adsparams.ip;
            data['token'] = this.app.adsparams.token;
            data['cost'] = this.app.uh.cost_user.get();
            data['gender'] = this.app.uh.gender_user.get();
            data['retargeting'] = this.app.uh.retargeting.get();
        }
        else if (req_type === 'log'){
            data['params'] = {};
            data['params']['informer_id'] = this.app.informer.informer_id;
            data['params']['informer_id_int'] = this.app.informer.informer_id_int;
            data['params']['ip'] = this.app.adsparams.ip;
            data['params']['cookie'] = this.app.adsparams.cookie;
            data['params']['request'] = this.app.adsparams.request;
            data['params']['test'] = this.app.adsparams.test;
            data['items'] = jQuery.map(this.app.offers.log_item, function(dataItem) {
                var item = new Object();
                item.guid = dataItem.guid;
                item.id = dataItem.id;
                item.campaign_social = dataItem.camp.social;
                item.token = dataItem.token;
                item.campaign_guid = dataItem.camp.guid;
                item.campaign_id = dataItem.camp.id;
                item.retargeting = dataItem.camp.retargeting;
                item.branch = dataItem.branch;
                return item;
            });
        }
        else {
            data['index'] = parseInt(this.app.adsparams.index);
            if (!_.isNumber(data['index'])){
                data['index'] = 0;
            }
            data['block_id'] = this.app.informer.informer_id_int;
            if (this.app.informer.capacity >= this.app.informer.capacity_styling) {
                data['capacity'] = this.app.informer.capacity;
            }
            else{
                data['capacity'] = this.app.informer.capacity_styling;
            }

            if (req_type === 'place') {
                data['campaigns'] = this.app.informer.place;
                data['exclude'] = this.app.uh.exclude_get();
                data['offer_count'] = this.app.informer.offer_count.place;
            }
            else if (req_type === 'social') {
                data['campaigns'] = this.app.informer.social;
                data['exclude'] = this.app.uh.exclude_get();
                data['offer_count'] = this.app.informer.offer_count.social;
            }
            else if (req_type === 'account_retargeting') {
                data['campaigns'] = this.app.informer.account_retargeting;
                data['exclude'] = this.app.uh.retargeting_account_exclude_get();
                data['retargeting'] = this.app.uh.retargeting.get();
                data['offer_count'] = this.app.informer.offer_count.account_retargeting;
            }
            else if (req_type === 'dynamic_retargeting') {
                data['campaigns'] = this.app.informer.dynamic_retargeting;
                data['exclude'] = this.app.uh.retargeting_exclude_get();
                data['retargeting'] = this.app.uh.retargeting.get();
                data['offer_count'] = this.app.informer.offer_count.dynamic_retargeting;
            }
        }

        return JSON.stringify(data);
    };
    return Params;
});