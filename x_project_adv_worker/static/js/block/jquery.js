define([
        "./jquery/core",
        "./jquery/selector",
        "./jquery/traversing",
        "./jquery/callbacks",
        "./jquery/deferred",
        // "./jquery/core/ready",
        "./jquery/support",
        "./jquery/data",
        "./jquery/queue",
        "./jquery/queue/delay",
        "./jquery/attributes",
        // "./jquery/event",
        // "./jquery/event/alias",
        // "./jquery/manipulation",
        // "./jquery/manipulation/_evalUrl",
        "./jquery/wrap",
        "./jquery/css",
        "./jquery/css/hiddenVisibleSelectors",
        "./jquery/serialize",
        "./jquery/ajax",
        "./jquery/ajax/xhr",
        "./jquery/ajax/script",
        "./jquery/ajax/jsonp",
        "./jquery/ajax/load",
        "./jquery/event/ajax",
        "./jquery/offset",
        "./jquery/dimensions",
        "./jquery/deprecated"
        // "./jquery/exports/amd"
    ], function (jQuery) {

        if (!Date.now) {
            Date.now = function now() {
                return new Date().getTime();
            };
        }

        jQuery.ajaxSetup({
            dataType: 'json',
            type: "POST",
            contentType: 'application/json; charset=utf-8',
            cache: false,
            beforeSend: function (xhr, settings) {
                if (settings.params && settings.param) {
                    settings.data = settings.params.generateRequestData(settings.param);
                }
            }
        });

        jQuery.fn.ellipsis = function () {
            var height = function (t, el) {
                return t.height() > el.height();
            };

            var width = function (t, el) {
                return t.width() > el.width();
            };

            var wordwrap = function (str, width) {
                return str;
                // width = (width ? width : 75);
                // if (!str) { return str; }
                // var regex = '.{1,' +width+ '}(\s|$)|.{' +width+ '}|.+$';
                //
                // return str.match(RegExp(regex, 'g')).join(' ');

            };

            return this.each(function () {
                var el = jQuery(this);
                if (el.css("overflow") === 'hidden') {
                    var text = wordwrap(el.html(), Math.floor(el.width() / (parseInt(el.css('font-size')) / 1.91)));
                    var multiline = el.hasClass('multiline');
                    var t = jQuery(this.cloneNode(true))
                        .hide()
                        .css('position', 'absolute')
                        .css('overflow', 'visible')
                        .width(multiline ? el.width() : 'auto')
                        .height(multiline ? 'auto' : el.height());

                    var func = multiline ? height : width;

                    t.html(text);
                    while (text.length > 0 && func(t, el)) {
                        text = text.substr(0, text.length - 1);
                        t.html(text + "...");
                    }
                    el.html(t.html());
                    t.remove();
                }
            });
        };

        return jQuery;
    }
);
