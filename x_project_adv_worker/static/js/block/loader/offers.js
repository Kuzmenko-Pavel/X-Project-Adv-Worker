/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['jquery', './../settings'], function (jQuery, settings) {
    return function (obj) {
        var request = jQuery.map(settings.requiredData.offers, function(dataItem) {
            if (!obj.informer[dataItem.param] || (obj.informer[dataItem.param] || '').length === 0) {
                return {};
            }
            var deferred = jQuery.Deferred();
            jQuery.ajax(dataItem.url, {params:obj.params, param:dataItem.param}).done(function(data) {
                deferred.resolve(data);
            }).fail(function() {
                deferred.resolve({});
            });
            return deferred.promise();
        });
        var offers_defferr = jQuery.when.apply(jQuery, request);
        offers_defferr.then(_.bind(function (place, social, account_retargeting,  dynamic_retargeting) {
            obj.offers.union(place, social, account_retargeting,  dynamic_retargeting);
            obj.render.render();
        }, this));
    };
});