/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define('check_image_format', ['jquery'], function (jQuery) {
    return function () {
        var rv = jQuery.Deferred();
        var img = new Image();
        img.onload = function () {
            rv.resolve();
        };
        img.onerror = function () {
            rv.reject();
        };
        img.src = "data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==";
        return rv.promise();
    };
});