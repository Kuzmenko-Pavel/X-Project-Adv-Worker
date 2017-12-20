/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['underscore'], function (_) {
    var GenderUser = function () {
    };

    GenderUser.prototype.add = function (val) {
        var hit_log = new Array(0, 0, 0);
        if (_.isUndefined(this['gender'])) {
            this['gender'] = val;
            hit_log[val] += 1;
            this['hit_log'] = hit_log;
        }
        else {
            if (_.isArray(this['hit_log'])) {
                hit_log = this['hit_log'];
                hit_log[val] += 1;
                hit_log[0] = 1;
                this['hit_log'] = hit_log;
                this['gender'] = _.indexOf(hit_log, _.max(hit_log));
            }
        }
        if (this['gender'] < 0) {
            this['gender'] = 0;
        }
    };

    GenderUser.prototype.get = function () {
        var res = 0;
        if (!_.isUndefined(this['gender'])) {
            res = this['gender'];
        }
        return res;
    };

    GenderUser.prototype.load = function (guid, arg1) {
        this[guid] = arg1;
    };

    return GenderUser;
});