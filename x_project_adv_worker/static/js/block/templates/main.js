/**
 * Created by kuzmenko-pavel on 26.04.17.
 */
define([
    'tpl!./advBlockTemplate.html',
    'tpl!./advTemplate.html',
    'tpl!./advBlockNotFoundTemplate.html',
    'tpl!./advBlockPartnerTemplate.html'
], function (
    advBlockTemplate,
    advTemplate,
    advBlockNotFoundTemplate,
    advBlockPartnerTemplate
) {
    "use strict";
    return {
        advBlockTemplate: advBlockTemplate,
        advTemplate: advTemplate,
        advBlockNotFoundTemplate: advBlockNotFoundTemplate,
        advBlockPartnerTemplate: advBlockPartnerTemplate
    };
});