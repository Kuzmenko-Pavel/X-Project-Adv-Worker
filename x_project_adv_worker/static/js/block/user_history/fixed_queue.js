/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['./../underscore'], function (_) {
    var FixedQueue = function (size) {
        var queue = [];
        queue.fixedSize = size;
        queue.add = FixedQueue.add;
        queue.load = FixedQueue.load;
        queue.get = FixedQueue.get;
        queue.clear = FixedQueue.clear;
        return queue;
    };
    FixedQueue.add = function (
        arg1,
        arg2
    ) {
        arg2 = (arg2 || false);
        if (arg2) {
            if (arg1 < this.fixedSize) {
                this[arg1] = arg2;
            }
        }
        else {
            if (this.indexOf(arg1) < 0) {
                this.push(arg1);
            }
        }

        if (this.length <= this.fixedSize) {
            return;
        }
        Array.prototype.splice.call(
            this,
            0,
            (this.length - this.fixedSize)
        );

    };
    FixedQueue.load = function (
        arg1,
        arg2
    ) {
        arg2 = (arg2 || false);
        if (arg2) {
            if (arg1 < this.fixedSize) {
                this[arg1] = arg2;
            }
        }
        else {
            if (this.indexOf(arg1) < 0) {
                this.push(arg1);
            }
        }

        if (this.length <= this.fixedSize) {
            return;
        }
        Array.prototype.splice.call(
            this,
            0,
            (this.length - this.fixedSize)
        );

    };
    FixedQueue.clear = function () {
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
    FixedQueue.get = function () {
        Array.prototype.splice.call(
            this,
            0,
            (this.length - this.fixedSize)
        );
        return this.join(";");
    };
    return FixedQueue;
});