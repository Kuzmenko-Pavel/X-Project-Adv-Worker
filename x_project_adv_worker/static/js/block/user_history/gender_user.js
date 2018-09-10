/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['./../underscore'], function (_) {
    var prototype = 'prototype';
    var GenderUser = function () {
        this.gender = void 0;
        this.hit_log = new Array(0, 0, 0);
    };

    GenderUser[prototype].add = function (val) {
        if (this.gender === void 0) {
            this.hit_log[val] += 1;
        }
        else {
            if (_.isArray(this['hit_log'])) {
                this.hit_log[val] += 1;
                this.hit_log[0] = 1;
                this.gender = _.indexOf(this.hit_log, _.max(this.hit_log));
            }
        }
        if (this.gender < 0) {
            this.gender = 0;
        }
    };

    GenderUser[prototype].get = function () {
        if (this.gender === void 0) {
            return 0;
        }
        return this.gender;
    };

    GenderUser[prototype].load = function (
        guid,
        arg1
    ) {
        this[guid] = arg1;
    };
    GenderUser[prototype].clear = function () {
        this.gender = void 0;
        this.hit_log = new Array(0, 0, 0);
    };
    return GenderUser;
});