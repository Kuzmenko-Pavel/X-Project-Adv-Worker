/**
 * Created by kuzmenko-pavel on 13.04.17.
 */
define(['underscore', 'json', './test', './fixed_queue', './exclude_offers', './retargeting_offers', './gender_account', './gender_user', './cost_account', './cost_user', './activity_account', './activity_user'],
    function (_, JSON, test, FixedQueue, ExcludeOffers, RetargetingOffers, GenderAccount, GenderUser, CostAccount, CostUser, ActivityAccount, ActivityUser) {
        var UserHistory = function () {
            this.searchengines = new FixedQueue(3);
            this.context = new FixedQueue(3);
            this.retargeting = new RetargetingOffers();
            this.exclude = new ExcludeOffers();
            this.exclude_click = new ExcludeOffers();
            this.retargeting_exclude = new ExcludeOffers();
            this.retargeting_account_exclude = new ExcludeOffers();
            this.retargeting_exclude_click = new ExcludeOffers();
            this.retargeting_account_exclude_click = new ExcludeOffers();
            this.retargeting_view = new ExcludeOffers(true, true);
            this.history = new FixedQueue(3);
            this.gender_accounts = new GenderAccount();
            this.gender_user = new GenderUser();
            this.cost_accounts = new CostAccount();
            this.cost_user = new CostUser();
            this.activity_accounts = new ActivityAccount();
            this.activity_user = new ActivityUser();
        };
        UserHistory.prototype.clear = function () {
            if (test()) {
                localStorage.clear();
                this.exclude_clean(true);
                this.exclude_click_clean(true);
                this.retargeting_clean(true);
                this.retargeting_account_clean(true);
                this.retargeting_click_clean(true);
                this.load();
                this.save();
                return true;
            }
            return false;
        };
        UserHistory.prototype.load = function () {
            if (test()) {
                _.each(this, function (uh_element, uh_name, uh) {
                    var retrievedObject = JSON.parse(localStorage.getItem(uh_name));
                    _.each(retrievedObject, function (element, index, list) {
                        uh[uh_name].load(index, list[index]);
                    });
                });
                return true;
            }
            return false;
        };
        UserHistory.prototype.save = function () {
            if (test()) {
                _.each(this, function (uh_element, uh_name, uh) {
                    localStorage.setItem(uh_name, JSON.stringify(uh[uh_name]));
                });
                return true;
            }
            return false;
        };

        UserHistory.prototype.exclude_clean = function (cl) {
            if (cl) {
                this.load();
                this.exclude = new ExcludeOffers();
                this.save();
            }
            return cl;
        };
        UserHistory.prototype.exclude_click_clean = function (cl) {
            if (cl) {
                this.load();
                this.exclude_click = new ExcludeOffers();
                this.save();
            }
            return cl;
        };
        UserHistory.prototype.exclude_get = function () {
            var keys = this.exclude.get().concat(this.exclude_click.get());
            keys = _.uniq(keys);
            return keys;
        };
        UserHistory.prototype.retargeting_clean = function (cl) {
            if (cl) {
                this.retargeting_exclude = new ExcludeOffers();
                this.retargeting_view = new ExcludeOffers(true, true);
                this.save();
            }
            return cl;
        };
        UserHistory.prototype.retargeting_account_clean = function (cl) {
            if (cl) {
                this.load();
                this.retargeting_account_exclude = new ExcludeOffers();
                this.save();
            }
            return cl;
        };
        UserHistory.prototype.retargeting_click_clean = function (cl) {
            if (cl) {
                this.load();
                this.retargeting_click_exclude = new ExcludeOffers();
                this.save();
            }
            return cl;
        };
        UserHistory.prototype.retargeting_exclude_get = function () {
            var keys = this.retargeting_exclude.get().concat(this.retargeting_exclude_click.get());
            keys = _.uniq(keys);
            return keys;
        };
        UserHistory.prototype.retargeting_account_exclude_get = function () {
            var keys = this.retargeting_account_exclude.get().concat(this.retargeting_account_exclude_click.get());
            keys = _.uniq(keys);
            return keys;
        };
        return new UserHistory();
    });