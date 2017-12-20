/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['underscore'], function (_) {
    var GenderAccount = function () {
    };

    GenderAccount.prototype.add = function (guid, val) {
        var hit_log = new Array(0, 0, 0);
        if (_.isUndefined(this[guid])) {
            hit_log[val] += 1;
            this[guid] = [val, hit_log]
        }
        else {
            hit_log = this[guid][1];
            hit_log[val] += 1;
            hit_log[0] = 1;
            this[guid] = [_.indexOf(hit_log, _.max(hit_log)), hit_log];
        }
        if (this[guid][0] <0 ){
            this[guid][0] = 0;
        }
    };

    GenderAccount.prototype.get = function () {
        var res = [];
        _.each(this, function (element, name, uh) {
                  if (!_.isEmpty(element)){
                      res.push([name + "~" + element[0]]);
                  }
        });
        return res.join(";");
    };

    GenderAccount.prototype.load = function (guid, arg1) {
        if (_.isArray(arg1)) {
            this[guid] = [arg1[0], arg1[1]];
        }
    };
    return GenderAccount;
});