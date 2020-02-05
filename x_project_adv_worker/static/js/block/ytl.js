define(['./underscore'], function (_) {
    var prototype = 'prototype';
    var passiveSupported = false;
    var modern = window.addEventListener;
    var add = modern ? 'addEventListener' : 'attachEvent';
    var rem = modern ? 'removeEventListener' : 'detachEvent';
    var pre = modern ? '' : 'on';
    try {
        var options = Object.defineProperty({}, "passive", {
            get: function () {
                passiveSupported = true;
            }
        });
        window[add](pre + 'test', null, options);
        window[rem](pre + 'test', null, options);
    } catch (err) {
    }
    var YottosLib = function () {
    };
    YottosLib[prototype].on_event = function (
        evnt,
        elem,
        callback,
        context,
        once
    ) {
        var func = _.bind(callback, context || elem);
        var opt = {once: once || false};
        if (passiveSupported) {
            opt.passive = true;
        }
        elem[add](pre + evnt, func, opt);
    };
    YottosLib[prototype].on_load = function (
        win,
        callback,
        context
    ) {
        var fn = _.bind(callback, context || win);
        var done = false;
        var top = true;
        var doc = win.document;
        var root = doc.documentElement;

        var init = function (e) {
            if (e.type === 'readystatechange' && doc.readyState !== 'complete') {
                return;
            }
            (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
            if (!done && (done = true)) {
                fn.call(win, e.type || e);
            }
        };

        var poll = function () {
            try {
                root.doScroll('left');
            } catch (e) {
                setTimeout(poll, 50);
                return;
            }
            init('poll');
        };

        if (doc.readyState === 'complete') {
            fn.call(win, 'lazy');
        }
        else {
            if (!modern && root.doScroll) {
                try {
                    top = !win.frameElement;
                } catch (e) {

                }
                if (top) {
                    poll();
                }
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }

    };

    YottosLib[prototype].post_exists = function () {
        var post = false;
        var postMessage = 'postMessage';
        if (window[postMessage]) {
            post = true;
        }
        return post;
    };
    return new YottosLib();
});