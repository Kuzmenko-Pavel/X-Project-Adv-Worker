/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define('detect_device', ['mobile_detect'], function (MobileDetect) {
    var md = new MobileDetect(window.navigator.userAgent);
    return function getDevise() {
        var device = "pc";
        if (md.mobile() !== null) {
            device = 'oh';
            if (md.phone() !== null){
                if (md.is('iPhone')){
                    device = 'ap';
                }
                else if (md.is('AndroidOS')){
                    device = 'np';
                }
                else if (md.is('WindowsMobileOS')|| md.is('WindowsPhoneOS')){
                    device = 'wp';
                }
            }
            else if (md.tablet() !== null){
                if (md.is('iOS')){
                    device = 'at';
                }
                else if (md.is('AndroidOS')){
                    device = 'nt';
                }
                else if (md.is('WindowsMobileOS') || md.is('WindowsPhoneOS')){
                    device = 'wt';
                }

            }
        }
        if (md.is('bot')){
            device = "bt";
        }
        return device;
    };
});