/**
 * Created by kuzmenko-pavel on 25.04.17.
 */
define(['./../jquery', './../underscore'], function (jQuery, _) {
    return function(el){
        var items = el.find('div[data-id]');
        _.each(items, function(element, index, list) {
            jQuery(element).click(function(event){
            });
        }, this);
    };
});