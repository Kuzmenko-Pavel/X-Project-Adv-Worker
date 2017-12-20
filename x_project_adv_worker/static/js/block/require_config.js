/**
 * Created by user on 05.07.16.
 */
require.config({
    paths: {
        'jquery': './jquery',
        'underscore': './../../../../bower_components/underscore/underscore',
        'mobile_detect': './../../../../bower_components/mobile-detect/mobile-detect',
        'json': './../../../../bower_components/json3/lib/json3',
        'text': './../../../../node_modules/text/text',
        'tpl': './underscore-tpl'
    },
    shim: {
        underscore: {
            exports: '_'
        },
        json: {
            exports: 'JSON'
        }
    }
});