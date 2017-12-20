/**
 * Created by kuzmenko-pavel on 04.07.17.
 */
define(['jquery', 'underscore'], function (jQuery, _) {
    var slider = function(el){
        var items = el.find('.imageCon');
        _.each(items, function(element, index, list) {
            var el = jQuery(element);
            var slideCount = el.find('img').length;
            var slideWidth = el.find('img').width();
            var slideHeight = el.find('img').height();
            var sliderUlWidth = slideCount * slideWidth;
            if (slideHeight <=0){
                slideHeight = 'auto';
            }
            el.css({ width: slideWidth, height: slideHeight });
            if (slideCount > 1)
            {
                el.find('ul').css({ width: sliderUlWidth, marginLeft: - slideWidth, zoom: 1 });
                el.find('li').css({ zoom: 1 });
                el.find('img').css({ zoom: 1 });
                el.find('li:last-child').prependTo(el.find('ul'));
                el.find('div.control_prev').unbind();
                el.find('div.control_next').unbind();

                el.find('div.control_prev').click(function (event) {
                    event.stopPropagation();
                    var el = jQuery(event.target).parent();
                    var slideWidth = el.find('img').width();
                    el.find('ul').animate({
                        left: + slideWidth
                    }, 900, 'easeOutCirc',  function () {
                        el.find('li:last-child').prependTo(el.find('ul'));
                        el.find('ul').css({'left': '',zoom: 1});
                    });
                });
                el.find('div.control_next').click(function (event) {
                    event.stopPropagation();
                    var el = jQuery(event.target).parent();
                    var slideWidth = el.find('img').width();
                    el.find('ul').animate({
                        left: - slideWidth
                        }, 900, 'easeOutCirc', function () {
                        el.find('li:first-child').appendTo(el.find('ul'));
                        el.find('ul').css({'left': '',zoom: 1});
                    });
                });
            }
            else
            {
                el.find('ul').css({ width: sliderUlWidth});
                el.find('div.control_prev').hide();
                el.find('div.control_next').hide();
            }
        }, this);
    };
    return slider;
});