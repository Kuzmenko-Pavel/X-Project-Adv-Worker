/**
 * Created by kuzmenko-pavel on 04.04.17.
 */
define([
    './ytl',
    './user_history/main',
    './settings',
    './loader/main',
    './models/advertise',
    './models/params',
    './render/main'
], function (YottosLib,
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
        this.name = 'y_iframe_'+this.adsparams.rand+'_' + this.adsparams.index;
        this.params = new Params(this);
        this.settings = settings;
        this.time_start = new Date().getTime();
        this.uh.load();
        this.loader = loader;
        this.advertise = new Advertise(this);
        this.render = new Render(this);
        this.post_listener = function (e) {
            if (e && e.data){
                if (typeof e.data === 'string'){
                    var name = e.data.split(":")[0];
                    var action = e.data.split(":")[1];
                    if (this.name === name){
                        if (this[action]){
                            this[action](e.origin);
                        }
                        else{
                            console.log(name, action);
                        }
                    }
                }
            }
        };
        this.ping = function (targetOrigin) {
            targetOrigin = targetOrigin || this.adsparams.origin;
            if (parent && parent.postMessage) {
                parent.postMessage(this.name+':ping', targetOrigin);
            }
        };
        YottosLib._.on_event('message', window, this.post_listener, this);
        this.ping();

    };
    return new Loader();

});