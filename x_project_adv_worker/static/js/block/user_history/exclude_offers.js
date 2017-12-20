/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['underscore'], function (_) {
    var ExcludeOffers = function (invert, counter) {
        var invert_ = Boolean(invert || false);
        var counter_ = Boolean(counter || false);
        this.invert = function () {
            return invert_;
        };
        this.counter = function () {
            return counter_;
        };

    };
    ExcludeOffers.prototype.add = function (guid, countViews) {
        countViews = (countViews || 1);
        if (_.isNumber(this[guid])) {
            if (this.invert()) {
                this[guid] = ++this[guid];
            }
            else {
                if (this[guid] > 0) {
                    this[guid] = --this[guid];
                }
                else {
                    this[guid] = 0;
                }
            }
        }
        else {
            if (this.invert()) {
                this[guid] = countViews;
            }
            else {
                this[guid] = countViews - 1;
            }
        }
    };

    ExcludeOffers.prototype.load = function (guid, countViews) {
        this[guid] = countViews;
    };


    ExcludeOffers.prototype.get = function () {
        var keys = [];
            _.each(this, function (value, key, uh) {
                 if (uh.invert()) {
                    if (value > 0) {
                        if (uh.counter()) {
                            keys.push([key.replace(/\D/g, ''), value]);
                        }
                        else{
                            keys.push(key.replace(/\D/g, ''));
                        }
                    }
                }
                else {
                    if (value <= 0) {
                        if (uh.counter()) {
                            keys.push([key.replace(/\D/g, ''), value]);
                        }
                        else{
                            keys.push(key.replace(/\D/g, ''));
                        }
                    }
                }
            });
        return keys;
    };

    return ExcludeOffers;
});