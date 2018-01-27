/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([
    './detect_device',
    './detect_browser',
    './user_history/main',
    './settings',
    './loader/main',
    './models/advertise',
    './models/params',
    './render/main'
], function (
             detect_device,
             DetectBrowser,
             user_history,
             settings,
             loader,
             Advertise,
             Params,
             Render
) {
    var Loader = function () {
        this.uh = user_history;
        this.adsparams = window.adsparams;
        this.params = new Params(this);
        this.image_format = 'png';
        if (this.adsparams['is_webp']){
            this.image_format = 'webp';
        }
        this.settings = settings;
        this.device = detect_device();
        this.browser = new DetectBrowser();
        this.time_start = new Date().getTime();
        this.uh.load();
        this.advertise = new Advertise(this);
        this.render = new Render(this);
    };

    Loader.prototype.loader = loader;
    return Loader;

});