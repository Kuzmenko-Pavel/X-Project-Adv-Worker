/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([
    './user_history/main',
    './settings',
    './loader/main',
    './models/advertise',
    './models/params',
    './render/main'
], function (user_history,
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
        this.settings = settings;
        this.time_start = new Date().getTime();
        this.uh.load();
        this.advertise = new Advertise(this);
        this.render = new Render(this);
    };

    Loader.prototype.loader = loader;
    return Loader;

});