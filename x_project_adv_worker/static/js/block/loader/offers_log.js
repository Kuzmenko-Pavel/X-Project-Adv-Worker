/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['./../jquery', './../settings'], function (jQuery, settings) {
    var Logger = function (app) {
        this.app = app;
        this.logging = false;
        if (!this.app.adsparams.post) {
            this.logging = null;
        }
    };
    Logger.prototype.log = function () {
        if (this.logging === false) {
            this.logging = 'initial';
            this.send();
            this.log();
        }
        else if (this.logging === null) {
            this.logging = 'initial';
            this.send();
            this.logging = 'complite';
            this.send();
        }
        else if (this.logging === 'initial') {
            this.logging = 'complite';
            this.send();
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