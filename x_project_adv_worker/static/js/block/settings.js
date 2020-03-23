/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define(function () {
    "use strict";
    return {
        requiredData: {
            advertises: {
                param: 'advertises',
                url: '/v2/items'
            },
            offer_log: {
                param: 'log',
                url: '/v2/logger.json'
            }
        },
        partners: '/v2/partners',
        not_found: '/v2/not_found'
    };
});