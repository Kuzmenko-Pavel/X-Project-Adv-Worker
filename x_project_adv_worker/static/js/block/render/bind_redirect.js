/**
 * Created by kuzmenko-pavel on 25.04.17.
 */
define(['./../jquery', './../underscore'], function (jQuery, _) {
    "use strict";
    return function(el){
        var items = el.find('div[data-id]');
        var app = this.app;
        _.each(items, function(element, index, list) {
            jQuery(element).on('mousedown', function(event){
                if(event.which===1||event.which===2) {
                    var item = jQuery(event.currentTarget);
                    var id = item.data('id');
                    app.advertise.click(id);
                }
            });
        }, this);
    };
});