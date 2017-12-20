/**
 * Created by kuzmenko-pavel on 14.04.17.
 */
define(['jquery', './jquery.easing', './jquery.transform2d'], function (jQuery) {
    return function (elements) {
        if (this.mouseInBlock) {
            return;
        }
        if (!this.browser.isOldIE && this.device === 'pc') {
            var interval = 50, distance = 3, times = 15;
            elements.each(function (i, el) {
                interval = 50, distance = 3, times = 15;
                for (var iter = 0; iter < (times + 1); iter++) {
                    jQuery(el).animate(
                        {
                            transform: (iter % 2 === 0 ? 'rotate(' + distance + 'deg)' : 'rotate(-' + distance + 'deg)')
                        },
                        interval,
                        'easeInOutBack',
                        function() {
                            jQuery(el).css({'transform': "", 'filter': '', 'rotate': '', 'rotateY': ''});
                        }
                    );
                }
            });
        }
    };
});