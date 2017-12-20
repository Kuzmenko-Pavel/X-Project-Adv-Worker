/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['json'], function (JSON) {
    return function () {
        var test = 'test';
        try {
            JSON.parse("{}");
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    };
});