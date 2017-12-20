/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['underscore'], function (_) {
    var CostUser = function () {
    };

    CostUser.prototype.add = function (val) {
        var hit_log = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        if (_.isUndefined(this['cost'])) {
            this['cost'] = val;
            hit_log[val] += 1;
            this['hit_log'] = hit_log;
        }
        else {
            if (_.isArray(this['hit_log'])) {
                hit_log = this['hit_log'];
                hit_log[val] += 1;
                hit_log[0] = 1;
                this['hit_log'] = hit_log;
                this['cost'] = _.indexOf(hit_log, _.max(hit_log));
            }
        }
        if (this['cost'] < 0) {
            this['cost'] = 0;
        }
    };
    CostUser.prototype.get = function () {
        var res = 0;
        if (!_.isUndefined(this['cost'])) {
            res = this['cost'];
        }
        return res;
    };
    CostUser.prototype.load = function (guid, arg1) {
        this[guid] = arg1;
    };
    return CostUser;
});