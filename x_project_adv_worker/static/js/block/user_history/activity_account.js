/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['underscore'], function (_) {
    var ActivityAccount = function () {
    };
    ActivityAccount.prototype.add = function (guid, timeFirst, timeLast) {
        if (_.isUndefined(this[guid])) {
            this[guid] = [timeFirst, timeLast];
        }
        else {
            this[guid][1] = timeLast;
        }
    };
    ActivityAccount.prototype.load = function (guid, arg1) {
        if (_.isArray(arg1)) {
            this[guid] = [arg1[0], arg1[1]];
        }
    };
    return ActivityAccount;
});