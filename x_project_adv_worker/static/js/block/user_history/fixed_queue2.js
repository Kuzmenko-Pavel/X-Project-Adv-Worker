/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define([], function () {
    "use strict";

    function FixedQueue(size) {
        var arr = new Array();
        arr.__proto__ = FixedQueue.prototype;
        arr._size = size;

        return arr;
    }

    FixedQueue.prototype = new Array();

    FixedQueue.prototype.add = function (
        index,
        value
    ) {
        value = (value || false);

        if (value) {
            if (index < this._size) {
                this[index] = value;
            }
        } else if (this.indexOf(index) < 0) {
            this.push(index);
        }

        if (this.length > this._size) {
            this.splice(0, this.length - this._size);
        }
    };

    FixedQueue.prototype.load = function (
        index,
        value
    ) {
        this.add(index, value)
    };

    FixedQueue.prototype.clear = function () {
        while (this.length) {
            this.pop();
        }
    };

    FixedQueue.prototype.get = function () {
        return this;
    };

    return FixedQueue;
});