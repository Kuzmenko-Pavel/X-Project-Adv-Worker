/**
 * Created by kuzmenko-pavel on 25.04.17.
 */
define(['jquery', 'underscore'], function (jQuery, _) {
    return function(items){
        if (typeof(window.ga) === 'function')
        {
            jQuery.each(items, function(i, v) {
                jQuery("div[data-id='"+ v.id +"']>div").each(function() {
                    var eventLabel = jQuery(this).attr('data-name');
                    var eventAction = 'place';
                    if (v.retargeting)
                    {
                        if (v.is_recommended)
                        {
                            eventAction = 'recomendet';
                        }
                        else
                        {
                            eventAction = 'retargeting';
                        }
                    }
                    jQuery(this).click(function(){
                      window.ga('set', 'campaignContent', v.campaign_title.toLowerCase());
                      window.ga('set', 'campaignContent', v.title.toLowerCase());
                      window.ga('send', 'event', {'eventCategory': 'Click','eventAction': eventAction, 'eventLabel': eventLabel});
                    });
                });
            });
        }
    };
});