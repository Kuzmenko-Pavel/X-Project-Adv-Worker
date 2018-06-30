/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['./../jquery', './../underscore', './advertise'],
    function (jQuery, _, advertise) {
        return function () {
            if (this.params.w_w + this.params.w_h > 120 && this.params.w_w > 30 && this.params.w_h > 30) {
                var advertise_defferr = jQuery.when(advertise(this));
                advertise_defferr.then(_.bind(function (data) {
                    this.advertise.parse(data);
                }, this));
                return true;
            }
        };
    });