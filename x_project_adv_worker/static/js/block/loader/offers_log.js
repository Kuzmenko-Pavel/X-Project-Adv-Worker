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
        var request = this.app.adsparams.request;
        var block_status = this.block_status;
        var logging = this.logging;
        if (this.offer_status === complite) {
            if (request === 'initial') {
                if (block_status === null && logging === false) {
                    this.logging = initial;
                    this.send();
                    this.logging = complite;
                    this.send();
                }
                else if (block_status === initial && logging === false) {
                    this.logging = initial;
                    this.send();
                }
                else if (block_status === complite && logging === false) {
                    this.logging = initial;
                    this.send();
                    this.logging = complite;
                    this.send();
                }
                else if (block_status === complite && logging === initial) {
                    this.logging = complite;
                    this.send();
                }
            }

            if (request === 'rotate') {
                if (block_status === null && logging === complite) {
                    this.send();
                }
                else if (block_status === complite && logging === complite) {
                    this.send();
                }
                this.app.adsparams.request = 'rotate_complite';
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