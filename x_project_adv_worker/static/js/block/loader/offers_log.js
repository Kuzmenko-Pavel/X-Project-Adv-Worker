/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['./../jquery', './../settings'], function (jQuery, settings) {
    var initial = 'initial';
    var complite = 'complite';
    var Logger = function (app) {
        this.app = app;
        this.logging = false;
        this.block_status = false;
        this.offer_status = false;
        if (!this.app.adsparams.post) {
            this.block_status = null;
        }
    };
    Logger.prototype.block_initial = function () {
        if (this.block_status === false) {
            this.block_status = initial;
        }
    };
    Logger.prototype.block_complite = function () {
        if (this.block_status === initial) {
            this.block_status = complite;
        }
    };
    Logger.prototype.log = function () {
        if (this.offer_status === complite) {
            if (this.block_status === null) {
                this.logging = initial;
                this.send();
                this.logging = complite;
                this.send();
            }
            else if (this.block_status === initial && this.logging === false) {
                this.logging = initial;
                this.send();
            }
            else if (this.block_status === complite && this.logging === initial) {
                this.logging = complite;
                this.send();
            }
        }
    };
    Logger.prototype.send = function () {
        jQuery.ajax(
            settings.requiredData.offer_log.url,
            {
                params: this.app.params,
                param: settings.requiredData.offer_log.param
            }
            );
    };
    return Logger;
});