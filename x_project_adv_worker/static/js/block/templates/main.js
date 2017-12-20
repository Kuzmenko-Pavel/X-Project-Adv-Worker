/**
 * Created by kuzmenko-pavel on 26.04.17.
 */
define(['tpl!./advBlockTemplate.html','tpl!./advTemplate.html', 'tpl!./advBlockNotFoundTemplate.html'], function (advBlockTemplate, advTemplate, advBlockNotFoundTemplate) {
    return {
        advBlockTemplate:advBlockTemplate,
        advTemplate:advTemplate,
        advBlockNotFoundTemplate:advBlockNotFoundTemplate
    };
});