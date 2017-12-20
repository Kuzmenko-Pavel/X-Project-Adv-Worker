/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['jquery', 'underscore', './informer', './offers'],
    function (jQuery, _, informer_loader, offers_loader) {
        var loader_obj = function () {
            var informer_defferr = jQuery.when(informer_loader(this));
            informer_defferr.then(_.bind(function (informer) {
                if (this.informer.parse(informer)){
                    this.informer.apply_css();
                    offers_loader(this);
                }
                else{
                   this.render.not_found();
                }
            }, this));
            return true;
        };
        return loader_obj;
    });