define([
    './../jquery',
    './../underscore'
], function (
    jQuery,
    _
) {
    "use strict";
    return function (el) {
        if (document.createStyleSheet) {
            var styleSheet = document.createStyleSheet("");
            styleSheet.cssText = this.app.advertise.css;
        }
        else {
            jQuery('<style type="text/css">' + this.app.advertise.css + '</style>').appendTo(el);
        }
    };
});