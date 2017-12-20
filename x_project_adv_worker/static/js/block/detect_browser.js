/**
 * Created by kuzmenko-pavel on 14.04.17.
 */
define(['mobile_detect'], function (MobileDetect) {
    var md = new MobileDetect(window.navigator.userAgent);
    return function (){
        this.isOldIE = false;
        this.IE7 = false;
    };
});