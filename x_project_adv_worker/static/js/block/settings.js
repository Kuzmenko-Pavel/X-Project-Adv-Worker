/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define(function () {
    return {
        requiredData: {
            advertises: {
                param: 'advertises',
                url: '/v1/advertises.json'
            },
            offer_log: {
                param: 'log',
                url: '/logger.json'
            }
        },
        partners: '/v1/partners',
        not_found: '/v1/not_found'
    };
});