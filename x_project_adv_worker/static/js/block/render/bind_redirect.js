/**
 * Created by kuzmenko-pavel on 25.04.17.
 */
define(['./../jquery', './../underscore'], function (jQuery, _) {
    "use strict";
    return function(el){
        var items = el.find('div[data-id]');
        var app = this.app;
        _.each(items, function(element, index, list) {
            jQuery(element).click(function (event) {
                var item = jQuery(event.currentTarget);
                app.advertise.click('' + item.data('id'));
            });
        }, this);
    };
});