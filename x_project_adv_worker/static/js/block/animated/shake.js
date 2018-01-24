/**
 * Created by kuzmenko-pavel on 14.04.17.
 */
define(['./../jquery', './jquery.easing', './jquery.transform2d'], function (jQuery) {
    return function (elements) {
        if (this.mouseInBlock) {
            return;
        }
        if (!this.browser.isOldIE && this.device === 'pc') {
            var interval, distance, time;
            var an_f = function (el) {
                jQuery(el).css({'transform': "", 'filter': '', 'rotate': '', 'rotateY': ''});
            };
            elements.each(function (i, el) {
                interval = 50;
                distance = 3;
                time = 15;
                for (var iter = 0; iter < (time + 1); iter++) {
                    jQuery(el).animate(
                        {
                            transform: (iter % 2 === 0 ? 'rotate(' + distance + 'deg)' : 'rotate(-' + distance + 'deg)')
                        },
                        interval,
                        'easeInOutBack',
                        an_f(el)
                    );
                }
            });
        }
    };
});