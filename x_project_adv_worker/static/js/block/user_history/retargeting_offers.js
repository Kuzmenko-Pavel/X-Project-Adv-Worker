/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['underscore'], function (_) {
    var RetargetingOffers = function() {
    };

    RetargetingOffers.prototype.add = function (guid, arg1, arg2, arg3, arg4) {
        this[guid] = [arg1, arg2, arg3, arg4];
    };

    RetargetingOffers.prototype.load = function (guid, arg1) {
        if (_.isArray(arg1)) {
            if (_.isUndefined(arg1[3])) {
                arg1[3] = arg1[0]
            }
            this[guid] = [arg1[0], arg1[1], arg1[2], arg1[3]];
        }
    };


    RetargetingOffers.prototype.remove = function (key) {
        delete this[key];
    };

    RetargetingOffers.prototype.get = function () {
        var keys = [];
        var res = [];
        var time = Math.floor(Date.now());
        for (var key in this) {
            var value = this[key];
            if (value[0] > time) {
                keys.push([
                    key.split('...')[0],
                    this[key][2],
                    this[key][1],
                    parseInt(this[key][3]),
                    Math.abs(new Date(Math.floor(Date.now())).getDate() - new Date(this[key][3] * 1000).getDate())
                ]);
            }
        }
        keys.sort(function (a, b) {
                if (a[3] < b[3]) {
                    return -1;
                }
                if (a[3] > b[3]) {
                    return 1;
                }
                return 0;
            }
        );
        for (x in keys) {
            if (typeof(keys[x]) != 'function') {
                res.push([keys[x][0], keys[x][2], keys[x][4]]);
            }
        }
        return res;
    };
    return RetargetingOffers;
});