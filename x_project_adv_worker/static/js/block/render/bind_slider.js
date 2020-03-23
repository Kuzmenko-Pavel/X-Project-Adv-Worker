/**
 * Created by kuzmenko-pavel on 04.07.17.
 */
define([
    './../jquery',
    './../underscore',
    './../animated/jquery.easing'
], function (
    jQuery,
    _,
    easing
) {
    "use strict";
    return function (el) {
        var items = el.find('.imageCon');
        _.each(items, function (
            element,
            index,
            list
        ) {
            var el = jQuery(element);
            var slideCount = el.find('img').length;
            var slideWidth = el.find('img').outerWidth(true);
            var slideHeight = el.find('img').outerHeight(true);
            var sliderUlWidth = slideCount * slideWidth;
            if (slideHeight <= 0) {
                slideHeight = 'auto';
            }
            el.css({
                width: slideWidth,
                height: slideHeight
            });
            if (slideCount > 1) {
                el.find('ul').css({
                    width: sliderUlWidth,
                    marginLeft: -slideWidth,
                    zoom: 1
                });
                el.find('li').css({zoom: 1});
                el.find('img').css({zoom: 1});
                el.find('li:last-child').prependTo(el.find('ul'));
                el.find('div.control_prev').unbind();
                el.find('div.control_next').unbind();

                el.find('div.control_prev').click(function (event) {
                    var el = jQuery(event.target).parent();
                    var slideWidth = el.find('img').width();
                    el.find('ul').animate({
                        left: +slideWidth
                    }, 900, 'easeOutCirc', function () {
                        el.find('li:last-child').prependTo(el.find('ul'));
                        el.find('ul').css({
                            'left': '',
                            zoom: 1
                        });
                    });
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    return false;
                });
                el.find('div.control_next').click(function (event) {
                    var el = jQuery(event.target).parent();
                    var slideWidth = el.find('img').width();
                    el.find('ul').animate({
                        left: -slideWidth
                    }, 900, 'easeOutCirc', function () {
                        el.find('li:first-child').appendTo(el.find('ul'));
                        el.find('ul').css({
                            'left': '',
                            zoom: 1
                        });
                    });
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                    event.preventDefault();
                    return false;
                });
            }
            else {
                el.find('ul').css({width: sliderUlWidth});
                el.find('div.control_prev').hide();
                el.find('div.control_next').hide();
            }
        }, this);
    };
});