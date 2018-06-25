/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['./../jquery', './../json3', './../underscore'], function (jQuery, JSON, _) {
    var Params = function (app) {
        this.app = app;
        this.w_h = jQuery(window).height();
        this.w_w = jQuery(window).width();
        //this.app.adsparams.post
    };
    Params.prototype.generateRequestData = function (req_type) {
        this.app.uh.load();
        var data = {};
        var params = 'params';
        var adsparams = 'adsparams';
        if (req_type === 'advertises'){
            data['w'] = this.w_w;
            data['h'] = this.w_h;
            data['block_id'] = this.app[adsparams].block_id;
            data['auto'] = this.app[adsparams].auto;
            data['country'] = this.app[adsparams].country;
            data['region'] = this.app[adsparams].region;
            data['ip'] = this.app[adsparams].ip;
            data['is_webp'] = this.app[adsparams].is_webp;
            data['time_start'] = this.app.time_start;
            data['cost'] = this.app.uh.cost_user.get();
            data['gender'] = this.app.uh.gender_user.get();
            data['retargeting'] = this.app.uh.retargeting.get();
            data['index'] = parseInt(this.app[adsparams].index);
            if (!_.isNumber(data['index'])){
                data['index'] = 0;
            }
            data['exclude'] = this.app.uh.exclude_get();
            data['retargeting_account_exclude'] = this.app.uh.retargeting_account_exclude_get();
            data['retargeting_dynamic_exclude'] = this.app.uh.retargeting_exclude_get();
            data['retargeting'] = this.app.uh.retargeting.get();
        }
        else if (req_type === 'log'){
            var block_impression = 1
            data[params] = {};
            data[params]['informer_id'] = this.app.advertise.informer_id;
            data[params]['informer_id_int'] = this.app.advertise.informer_id_int;
            data[params]['ip'] = this.app[adsparams].ip;
            data[params]['cookie'] = this.app[adsparams].cookie;
            data[params]['request'] = this.app[adsparams].request;
            data[params]['active'] = this.app.logger.logging;
            data[params]['test'] = this.app[adsparams].test;
            // data['items'] = jQuery.map(this.app.advertise.offers, function(dataItem) {
            //     var item = {};
            //     item.guid = dataItem.guid;
            //     item.id = dataItem.id;
            //     item.campaign_social = dataItem.campaign_social;
            //     item.token = dataItem.token;
            //     item.campaign_guid = dataItem.guid_cam;
            //     item.campaign_id = dataItem.id_cam;
            //     item.retargeting = dataItem.retargeting;
            //     item.branch = dataItem.branch;
            //     return item;
            // });
            data['items'] = [];
            this.app.uh.load();
            _.each(this.app.advertise.offers, function (offer) {
                var item = {};
                item.guid = offer.guid;
                item.id = offer.id;
                item.campaign_social = offer.campaign_social;
                item.token = offer.token;
                item.campaign_guid = offer.guid_cam;
                item.campaign_id = offer.id_cam;
                item.retargeting = offer.retargeting;
                item.branch = offer.branch;
                this.data['items'].push(item);
                if (this.app.logger.logging === 'complite') {
                    if (offer.retargeting) {
                        this.app.uh.retargeting_exclude.add(offer.id, offer.unique_impression_lot);
                        this.app.uh.retargeting_view.add(offer.id);
                    }
                    else {
                        this.app.uh.exclude.add(offer.id, offer.unique_impression_lot);
                    }
                }
            }, {
                app: this.app,
                data: data
            });
            this.app.uh.save();
        }
        return JSON.stringify(data);
    };
    return Params;
});