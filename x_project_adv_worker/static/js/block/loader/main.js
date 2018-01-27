/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['./../jquery', './../underscore', './advertise'],
    function (jQuery, _, advertise) {
        var loader_obj = function () {
            var informer_defferr = jQuery.when(advertise(this));
            informer_defferr.then(_.bind(function (data) {
                this.advertise.parse(data);
            }, this));
            return true;
        };
        return loader_obj;
    });