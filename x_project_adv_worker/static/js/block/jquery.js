define([
        "./../../../../bower_components/jquery/src/core",
        "./../../../../bower_components/jquery/src/selector",
        "./../../../../bower_components/jquery/src/traversing",
        "./../../../../bower_components/jquery/src/callbacks",
        "./../../../../bower_components/jquery/src/deferred",
        "./../../../../bower_components/jquery/src/core/ready",
        "./../../../../bower_components/jquery/src/support",
        "./../../../../bower_components/jquery/src/data",
        "./../../../../bower_components/jquery/src/queue",
        "./../../../../bower_components/jquery/src/queue/delay",
        "./../../../../bower_components/jquery/src/attributes",
        "./../../../../bower_components/jquery/src/event",
        "./../../../../bower_components/jquery/src/event/alias",
        "./../../../../bower_components/jquery/src/manipulation",
        "./../../../../bower_components/jquery/src/manipulation/_evalUrl",
        "./../../../../bower_components/jquery/src/wrap",
        "./../../../../bower_components/jquery/src/css",
        "./../../../../bower_components/jquery/src/css/hiddenVisibleSelectors",
        "./../../../../bower_components/jquery/src/serialize",
        "./../../../../bower_components/jquery/src/ajax",
        "./../../../../bower_components/jquery/src/ajax/xhr",
        "./../../../../bower_components/jquery/src/ajax/script",
        "./../../../../bower_components/jquery/src/ajax/jsonp",
        "./../../../../bower_components/jquery/src/ajax/load",
        "./../../../../bower_components/jquery/src/event/ajax",
        "./../../../../bower_components/jquery/src/effects",
        "./../../../../bower_components/jquery/src/effects/animatedSelector",
        "./../../../../bower_components/jquery/src/offset",
        "./../../../../bower_components/jquery/src/dimensions",
        "./../../../../bower_components/jquery/src/deprecated",
        "./../../../../bower_components/jquery/src/exports/amd"
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

        jQuery.fn.ellipsis = function()
        {
            var height = function(t, el){
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

            return this.each(function()
            {
                var el = jQuery(this);
                if(el.css("overflow") === 'hidden')
                {
                    var text = wordwrap(el.html(), Math.floor(el.width()/(parseInt(el.css('font-size')) / 1.91)));
                    var multiline = el.hasClass('multiline');
                    var t = jQuery(this.cloneNode(true))
                        .hide()
                        .css('position', 'absolute')
                        .css('overflow', 'visible')
                        .width(multiline ? el.width() : 'auto')
                        .height(multiline ? 'auto' : el.height());

                    var func = multiline ? height : width;

                    t.html(text);
                    while (text.length > 0 && func(t, el))
                    {
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
