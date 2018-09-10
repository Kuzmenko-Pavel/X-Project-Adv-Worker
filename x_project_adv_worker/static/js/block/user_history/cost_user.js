/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['./../underscore'], function (_) {
    var prototype = 'prototype';
    var CostUser = function () {
        this.hit_log = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        this.cost = void 0;
    };

    CostUser[prototype].add = function (val) {
        if (this.cost === void 0) {
            this.cost = val;
            this.hit_log[val] += 1;
        }
        else {
            this.hit_log[val] += 1;
            this.hit_log[0] = 1;
            this.cost = _.indexOf(this.hit_log, _.max(this.hit_log));
        }
        if (this.cost < 0) {
            this.cost = 0;
        }
    };
    CostUser[prototype].get = function () {
        if (this.cost === void 0) {
            return 0;
        }
        return this.cost;
    };
    CostUser[prototype].load = function (
        guid,
        arg1
    ) {
        this[guid] = arg1;
    };
    CostUser[prototype].clear = function () {
        _.each(this || {}, function (
            value,
            key,
            uh
        ) {
            if (!_.isUndefined(value) && !_.isFunction(value)) {
                delete uh[key];
            }
        });
    };
    return CostUser;
});