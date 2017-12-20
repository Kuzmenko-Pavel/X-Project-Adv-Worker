/**
 * Created by kuzmenko-pavel on 25.04.17.
 */
define(['jquery', 'underscore'], function (jQuery, _) {
    return function(app, el){
        var items = el.find('div[data-id]');
        _.each(items, function(element, index, list) {
            jQuery(element).click(function(event){
                var item = jQuery(event.currentTarget);
                var id = item.data('id');
                app.offers.click(id);
            });
        }, this);
    };
});