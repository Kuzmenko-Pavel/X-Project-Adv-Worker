/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['./../jquery', './../underscore', './informer'],
    function (jQuery, _, informer_loader) {
        var loader_obj = function () {
            var informer_defferr = jQuery.when(informer_loader(this));
            informer_defferr.then(_.bind(function (informer) {
                if (this.informer.parse(informer)){
                    this.informer.apply_css();
                    this.offers.union(informer['place'], informer['social'], informer['account_retargeting'],  informer['dynamic_retargeting']);
                    this.render.render();
                }
                else{
                   this.render.not_found();
                }
            }, this));
            return true;
        };
        return loader_obj;
    });