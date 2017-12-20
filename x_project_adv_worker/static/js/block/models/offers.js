/**
 * Created by kuzmenko-pavel on 20.04.17.
 */
define(['jquery', 'underscore', './link', './../loader/offers', './../loader/offers_log'], function (jQuery, _, link, offers_loader, offers_log) {
    var Offers = function (app) {
        this.app = app;
        this.items = new Array();
        this.log_item = new Array();
        this.styling = null;
        this.brending = null;
        this.req_count = 0;
    };
    Offers.prototype.create = function (item, recomendet) {
        if (this.styling) {
            if (this.items.length >= this.app.informer.capacity_styling) {
                return;
            }
        }
        else {
            if (this.items.length >= this.app.informer.capacity) {
                return;
            }
        }
        if (item.campaign.styling) {
            if (this.styling === null || this.styling === item.id_cam) {
                this.styling = item.id_cam;
            }
            else {
                return;
            }
        }
        else {
            if (this.styling === null) {
                this.styling = false;
            }
        }
        if (item.campaign.brending) {
            if (this.brending === null || this.brending === item.id_cam) {
                this.brending = item.id_cam;
            }
            else {
                return;
            }
        }
        else {
            if (this.brending === null) {
                this.brending = false;
            }
        }
        if (this.items.length === (this.app.informer.capacity_styling - 1) && this.styling && item.campaign.style_data) {
            var img = [];
            img.push(item.campaign.style_data.img);
            this.items.push(new Object({
                title: item.campaign.style_data.head_title,
                description: null,
                price: null,
                url: item.url,
                images: img,
                style_class: 'logo' + item.campaign.style_class,
                id: null,
                guid: null,
                camp: item.campaign,
                id_cam: null,
                guid_cam: null,
                token: null,
                button: item.campaign.style_data.button_title
            }));
            return;
        }
        var style_class = item.campaign.style_class;
        var button = this.app.informer.button;
        var branch = 'NL30';
        if (item.campaign.retargeting) {
            button = this.app.informer.ret_button;
            branch = 'NL31';
        }
        if (recomendet) {
            style_class = item.campaign.style_class_recommendet;
            button = this.app.informer.rec_button;
            branch = 'NL32';
        }
        var img_list = _.map(item.image, function (img) {
            return jQuery.trim(img.replace(/(png|webp)/g, this.app.image_format));
        }, this);

        if (img_list.length === 2) {
            img_list[2] = img_list[0];
            img_list[3] = img_list[1];
        }
        if (this.app.browser.IE7) {
            img_list = img_list.slice(0, 1);
        }
        this.items.push(new Object({
            title: item.title,
            description: item.description,
            price: item.price,
            url: item.url,
            images: img_list,
            style_class: 'adv' + style_class,
            id: item.id,
            guid: item.guid,
            camp: item.campaign,
            id_cam: item.id_cam,
            guid_cam: item.campaign.guid,
            token: item.token,
            branch: branch,
            button: button
        }));
        if (item.campaign.styling) {
            var styling_item = item.recommended || [];
            if (styling_item.length < this.app.informer.capacity_styling) {
                styling_item = styling_item.concat(styling_item);
            }
            _.each(styling_item, function (element, index, list) {
                element.id_cam = item.id_cam;
                element.campaign = item.campaign;
                this.create(element, true);
            }, this);
            if (!recomendet) {
                if (this.items.length <= this.app.informer.capacity_styling) {
                    this.create(item);
                }
            }
        }
        else {
            if (item.campaign.brending) {
                var brending_item = item.recommended || [];
                var recomendet_count = item.campaign.recomendet_count;
                var day = 0;
                if (item.campaign.recomendet_type === 'min') {
                    if (recomendet_count - day > 1) {
                        recomendet_count = recomendet_count - day;
                    }
                    else {
                        recomendet_count = 1;
                    }
                }
                else if (item.campaign.recomendet_type === 'max') {
                    if (1 + day < recomendet_count) {
                        recomendet_count = 1 + day;
                    }
                }
                else {
                    if (recomendet_count < 1) {
                        recomendet_count = 1;
                    }
                }
                brending_item = brending_item.slice(0, recomendet_count);
                _.each(brending_item, function (element, index, list) {
                    element.id_cam = item.id_cam;
                    element.campaign = item.campaign;
                    this.create(element, true);
                }, this);
            }
        }

    };
    Offers.prototype.union = function (place, social, account_retargeting, dynamic_retargeting) {
        this.items = new Array();
        this.styling = null;
        var full_block_offer = 0;
        var one_block_offer = 0;
        if (dynamic_retargeting && dynamic_retargeting['offers']) {
            full_block_offer = 0;
            one_block_offer = 0;
            _.each(dynamic_retargeting['offers'], function (element, index, list) {
                list[index].campaign = this.app.informer.campaigns[element.id_cam];
                if (list[index].campaign.styling || list[index].campaign.brending){
                    full_block_offer +=1;
                }
                else{
                    one_block_offer +=1;
                }
            }, this);
            this.app.uh.retargeting_clean(dynamic_retargeting['clean']);
            _.each(dynamic_retargeting['offers'], function (element, index, list) {
                if (full_block_offer >= one_block_offer){
                    if (element.campaign.styling || element.campaign.brending){
                        this.create(element);
                    }
                }
                else{
                    this.create(element);
                }
            }, this);
        }
        if (account_retargeting && account_retargeting['offers']) {
            full_block_offer = 0;
            one_block_offer = 0;
            _.each(account_retargeting['offers'], function (element, index, list) {
                list[index].campaign = this.app.informer.campaigns[element.id_cam];
                if (list[index].campaign.styling || list[index].campaign.brending){
                    full_block_offer +=1;
                }
                else{
                    one_block_offer +=1;
                }
            }, this);
            _.each(account_retargeting['offers'], function (element, index, list) {
                if (full_block_offer >= one_block_offer){
                    if (element.campaign.styling || element.campaign.brending){
                        this.create(element);
                    }
                }
                else{
                    this.create(element);
                }
            }, this);
        }
        if (place && place['offers']) {
            full_block_offer = 0;
            one_block_offer = 0;
            _.each(place['offers'], function (element, index, list) {
                list[index].campaign = this.app.informer.campaigns[element.id_cam];
                if (list[index].campaign.styling || list[index].campaign.brending){
                    full_block_offer +=1;
                }
                else{
                    one_block_offer +=1;
                }
            }, this);
            _.each(place['offers'], function (element, index, list) {
                if (full_block_offer >= one_block_offer){
                    if (element.campaign.styling || element.campaign.brending){
                        this.create(element);
                    }
                }
                else{
                    this.create(element);
                }
            }, this);
        }
        if (this.items.length === 0) {
            if (social && social['offers']) {
                full_block_offer = 0;
                one_block_offer = 0;
                _.each(social['offers'], function (element, index, list) {
                    list[index].campaign = this.app.informer.campaigns[element.id_cam];
                    if (list[index].campaign.styling || list[index].campaign.brending){
                        full_block_offer +=1;
                    }
                    else{
                    one_block_offer +=1;
                }
                }, this);
                _.each(social['offers'], function (element, index, list) {
                    if (full_block_offer >= one_block_offer){
                        if (element.campaign.styling || element.campaign.brending){
                            this.create(element);
                        }
                    }
                    else{
                        this.create(element);
                    }
                }, this);
            }
        }
        var counter = 0;
        if (this.styling) {
            counter = 0;
            while (0 < this.items.length && this.items.length < this.app.informer.capacity_styling) {
                this.items.push(this.items[counter]);
                counter++;
            }
        }
        else {
            counter = 0;
            while (0 < this.items.length && this.items.length < this.app.informer.capacity) {
                this.items.push(this.items[counter]);
                counter++;
            }
        }
        if (place['clean'] || (place['clean'] && social['clean'])) {
            this.app.uh.exclude_clean(true);
        }
        if (this.items.length === 0) {
            if (this.app.uh.clear() && this.req_count < 10) {
                this.req_count++;
                offers_loader(this.app);
            }
        }
    };
    Offers.prototype.get = function (id) {
        var offer = _.find(this.items, function (element) {
            return element.id === id;
        });
        if (offer === undefined) {
            offer = this.items[0];
        }
        return offer;
    };
    Offers.prototype.click = function (id) {
        var offer = this.get(id);
        var popup = window.open(link(offer, this.app), '_blank');
        if (popup) {
            popup.moveTo(0, 0);
        }
        this.app.uh.load();
        if (offer.camp.retargeting) {
            this.app.uh.retargeting_exclude_click.add(offer.id, 1);
        }
        else {
            this.app.uh.exclude_click.add(offer.id, 1);
        }
        this.app.uh.save();
        offers_loader(this.app);
    };
    Offers.prototype.views = function (el) {
        var items = el.find('div[data-id]');
        _.each(items, function (element, index, list) {
            var id = jQuery(element).data('id');
            if (id !== '') {
                this.view(id);
            }
        }, this);
        if (items.length > 0) {
            offers_log(this.app);
        }
    };
    Offers.prototype.view = function (id) {
        var offer = this.get(id);
        this.log_item.push(offer);
        this.app.uh.load();
        if (offer.camp.retargeting) {
            this.app.uh.retargeting_exclude.add(offer.id, offer.camp.unique_impression_lot);
            this.app.uh.retargeting_view.add(offer.id);
        }
        else {
            this.app.uh.exclude.add(offer.id, offer.camp.unique_impression_lot);
        }
        this.app.uh.save();
    };
    return Offers;
});