/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define([
        './../jquery',
        './../underscore',
        './advertise'
    ],
    function (
        jQuery,
        _,
        advertise
    ) {
        "use strict";
        return function () {
            this.params.size();
            if (this.params.w_w + this.params.w_h > 120 && this.params.w_w > 30 && this.params.w_h > 30) {
                var advertise_defferr = jQuery.when(advertise(this));
                advertise_defferr.then(_.bind(function (
                    data,
                    textStatus,
                    jqXHR
                ) {
                    this.advertise.parse(data, textStatus, jqXHR);
                }, this));
                return true;
            }
            else {
                setTimeout(_.bind(this.loader, this), 1000);
            }
        };
    });