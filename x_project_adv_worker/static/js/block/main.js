/**
 * Created by user on 13.07.16.
 */
require(['jquery', 'underscore', './loader'], function (jQuery, _, Loader) {
    (window.adsbyyottos = window.adsbyyottos || new Loader()).start();
    if (!window.adsbyyottos.page_load){
        window.adsbyyottos.page_load = true;
        jQuery(document).one('ready', _.bind(window.adsbyyottos.ready_handler, window.adsbyyottos));
        jQuery(window).one('load', _.bind(window.adsbyyottos.load_handler, window.adsbyyottos));
    }
});