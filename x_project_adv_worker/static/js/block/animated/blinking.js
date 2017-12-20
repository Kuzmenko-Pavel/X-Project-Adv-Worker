/**
 * Created by kuzmenko-pavel on 14.04.17.
 */
define(['jquery'], function (jQuery) {
    return function (elements) {
        if (this.mouseInBlock) {
            return;
        }
        if (!this.browser.isOldIE && this.device === 'pc') {
           elements.each(function(i, el) {
                        setTimeout(function(){
                            jQuery(el).stop().fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
                        },500 + ( i * 500 ));
                    });
        }
    };
});