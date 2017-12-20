/**
 * Created by kuzmenko-pavel on 05.04.17.
 */
define(function () {
    return {
        requiredData: {
            informer: {
                param: 'informer',
                url: '/v1/informer.json'
            },
            offer_log: {
                param: 'log',
                url: '/logger.json'
            },
            offers: [
                {
                    param: 'place',
                    url: '/v1/place.json'
                },
                {
                    param: 'social',
                    url: '/v1/social.json'
                },
                {
                    param: 'account_retargeting',
                    url: '/v1/account_retargeting.json'
                },
                {
                    param: 'dynamic_retargeting',
                    url: '/v1/dynamic_retargeting.json'
                }
            ]
        }
    };
});