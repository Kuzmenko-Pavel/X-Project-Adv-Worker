/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([
    'jquery',
    'underscore',
    './start',
    './detect_device',
    './detect_browser',
    './check_image_format',
    './user_history/main',
    './settings',
    './animated/shake',
    './animated/blinking',
    './loader/main',
    './models/informer',
    './models/offers',
    './models/params',
    './render/main'
], function (jQuery,
             _,
             start,
             detect_device,
             DetectBrowser,
             check_image_format,
             user_history,
             settings,
             shake,
             blinking,
             loader,
             Informer,
             Offers,
             Params,
             Render
) {
    var Loader = function () {
        this.uh = user_history;
        this.adsparams = window.adsparams;
        this.params = new Params(this);
        this.image_format = 'png';
        this.image_cheker = check_image_format();
        this.image_cheker.then(
            _.bind(function () {
                this.image_format = 'webp';
            }, this),
            _.bind(function () {
                this.image_format = 'png';
            }, this)
        );
        this.settings = settings;
        this.device = detect_device();
        this.browser = new DetectBrowser();
        this.page_load = false;
        this.time_start = new Date().getTime();
        this.uh.load();
        this.informer = new Informer(this);
        this.offers = new Offers(this);
        this.render = new Render(this);
        this.mouseInBlock = false;
    };
    Loader.prototype.loader = loader;
    Loader.prototype.shake = shake;
    Loader.prototype.blinking = blinking;
    Loader.prototype.start = start;
    Loader.prototype.mouse_move_handler = function (e) {
    };
    Loader.prototype.scroll_handler = function (e) {
    };
    Loader.prototype.resize_handler = function (e) {
    };
    Loader.prototype.mouseenter_handler = function (e) {
        this.mouseInBlock = true;
    };
    Loader.prototype.mouseleave_handler = function (e) {
        this.mouseInBlock = false;
        //this.blinking(jQuery('#basic1'));
    };
    Loader.prototype.onmessage = function (e) {
        // console.log(e.originalEvent.data);
    };
    Loader.prototype.load_handler = function (e) {

    };
    Loader.prototype.ready_handler = function (e) {
        //this.start();
        var html_obj = jQuery(window);
        html_obj.scroll(_.bind(this.scroll_handler, this));
        html_obj.resize(_.bind(this.resize_handler, this));
        html_obj.mousemove(_.bind(this.mouse_move_handler, this));
        html_obj.mouseenter(_.bind(this.mouseenter_handler, this));
        html_obj.mouseleave(_.bind(this.mouseleave_handler, this));
        html_obj.on("message onmessage", _.bind(this.onmessage, this));
    };
    return Loader;

});