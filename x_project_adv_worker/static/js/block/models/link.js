/**
 * Created by kuzmenko-pavel on 25.04.17.
 */
define(['../Base64'], function (b) {
    return function(i, app)
    {
        var e = new Date().getTime();
        var t = e - app.time_start;
        var url = "id="+ i.guid + "\n" + "inf=" + app.informer.informer_id + "\n" + "token=" + i.token + "\n" + "url=" + i.url + "\n" + "rand=" +  app.adsparams.token + "\n" + "camp=" +  i.guid_cam + "\n" + "t=" + t + "\n" ;
        var r = ['/click?', b.encode(url)];
        return r.join('');
    };
});