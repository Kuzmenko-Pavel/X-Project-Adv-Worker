define(['./../jquery', './../underscore'], function (jQuery, _) {
    return function(){
        if (document.createStyleSheet)
        {
            var styleSheet = document.createStyleSheet("");
            styleSheet.cssText = this.app.advertise.css;
        }
        else
        {
            jQuery('<style type="text/css">' + this.app.advertise.css + '</style>').appendTo('head');
        }
    };
});