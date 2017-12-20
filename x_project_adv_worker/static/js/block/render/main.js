/**
 * Created by kuzmenko-pavel on 18.04.17.
 */
define(['jquery', 'underscore', './bind_redirect', './../templates/main', './bind_slider'],
    function (jQuery, _, redirect, templates, slider) {
        return function (app) {
            var render_obj = new Object({app: app});
            render_obj.render = function () {
                var temp_el = jQuery('<div></div>');
                temp_el.append(templates.advTemplate({offers: this.app.offers.items}));
                jQuery('body').html(templates.advBlockTemplate({
                    mainHeader: this.app.informer.headerHtml,
                    ads: temp_el.html(),
                    mainFooter: this.app.informer.footerHtml
                }));
                redirect(this.app, jQuery('#adsContainer'));
                slider(jQuery('#adsContainer'));
                this.app.offers.views(jQuery('#adsContainer'));
                jQuery('.ellipsis').ellipsis();
            };
            render_obj.not_found = function () {
                jQuery('html').html(templates.advBlockNotFoundTemplate());
            };
            return render_obj;
        };
    });