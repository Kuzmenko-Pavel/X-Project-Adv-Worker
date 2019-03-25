/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define([
    './../json3',
    './../underscore'
], function (
    JSON,
    _
) {
    var Params = function (app) {
        this.app = app;
        this.w_h = 0;
        this.w_w = 0;
        this.size();
    };
    Params.prototype.size = function () {
        if (this.app.adsparams.h && this.app.adsparams.w) {
            if (this.app.adsparams.w + this.app.adsparams.h > 120 && this.app.adsparams.w > 30 && this.app.adsparams.h > 30) {
                this.w_h = this.app.adsparams.h;
                this.w_w = this.app.adsparams.w;
                return;
            }
        }
        var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0];
        this.w_h = w.innerHeight || e.clientHeight || g.clientHeight;
        this.w_w = w.innerWidth || e.clientWidth || g.clientWidth;
    };
    Params.prototype.generateRequestData = function (req_type) {
        var data = {};
        var params = 'params';
        var adsparams = 'adsparams';
        var retargeting = 'retargeting';
        var exclude = 'exclude';
        var index = 'index';
        var informer = 'informer';
        var app = 'app';
        if (req_type === 'advertises'){
            this[app].uh.load();
            data.w = this.w_w;
            data.h = this.w_h;
            data.block_id = this[app][adsparams].block_id;
            data.auto = this[app][adsparams].auto;
            data.country = this[app][adsparams].country;
            data.region = this[app][adsparams].region;
            data.ip = this[app][adsparams].ip;
            data.is_webp = this[app][adsparams].is_webp;
            data.test = this[app][adsparams].test;
            data.time_start = this[app].time_start;
            data.cost = this[app].uh.cost_user.get();
            data.gender = this[app].uh.gender_user.get();
            data.thematics = this[app].uh.thematics.get();
            data[retargeting] = this[app].uh.retargeting.get();
            data[index] = parseInt(this[app][adsparams].index);
            if (!_.isNumber(data[index])) {
                data[index] = 0;
            }
            data[exclude] = this[app].uh.exclude_get();
            data['thematics_' + exclude] = this[app].uh.thematics_exclude_get();
            data[retargeting + '_account_' + exclude] = this[app].uh.retargeting_account_exclude_get();
            data[retargeting + '_dynamic_' + exclude] = this[app].uh.retargeting_exclude_get();
            data[retargeting] = this[app].uh.retargeting.get();
        }
        else if (req_type === 'log'){
            var complite = this[app].logger.logging === 'complite';
            var key = [
                'exclude',
                'retargeting_exclude',
                'time',
                'thematic_exclude'
            ];
            data[params] = {};
            data[params][informer + '_id'] = this[app].advertise[informer + '_id'];
            data[params][informer + '_id_int'] = this[app].advertise[informer + '_id_int'];
            data[params]['cookie'] = this[app][adsparams].cookie;
            data[params]['request'] = this[app][adsparams].request;
            data[params]['active'] = this[app].logger.logging;
            data[params]['test'] = this[app][adsparams].test;
            data.items = [];
            if (complite) {
                this[app].uh.load(key);
            }
            _.each(this.app.advertise.offers, function (offer) {
                if (offer.id !== null) {
                    var item = {};
                    item.guid = offer.guid;
                    item.id = offer.id;
                    item.campaign_social = offer.campaign_social;
                    item.token = offer.token;
                    item.campaign_guid = offer.guid_cam;
                    item.campaign_id = offer.id_cam;
                    item.retargeting = offer.retargeting;
                    item.branch = offer.branch;
                    this.data.items.push(item);
                    if (complite) {
                        if (offer.retargeting) {
                            this[app].uh[key[1]].add(offer.id, offer.unique_impression_lot);
                            //this[app].uh.retargeting_view.add(offer.id);
                        }
                        else if (offer.thematic) {
                            this[app].uh[key[3]].add(offer.id, offer.unique_impression_lot);
                        }
                        else {
                            this[app].uh[key[0]].add(offer.id, offer.unique_impression_lot);
                        }
                    }
                }
            }, {
                app: this[app],
                data: data
            });
            if (complite) {
                this[app].uh.save(key);
            }

        }
        return JSON.stringify(data);
    };
    return Params;
});