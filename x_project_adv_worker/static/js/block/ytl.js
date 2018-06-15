define([], function () {
    var prototype = 'prototype';
    var ArrayProto = Array[prototype], ObjProto = Object[prototype], FuncProto = Function[prototype];
    var toString         = ObjProto.toString;
    var slice            = ArrayProto.slice;
    var nativeIsArray      = Array.isArray;
    var nativeKeys         = Object.keys;
    var nativeBind         = FuncProto.bind;
    var nativeCreate       = Object.create;
    var passiveSupported = false;
    var modern = window.addEventListener;
    var add = modern ? 'addEventListener' : 'attachEvent';
    var rem = modern ? 'removeEventListener' : 'detachEvent';
    var pre = modern ? '' : 'on';
    try {
      var options = Object.defineProperty({}, "passive", {
        get: function() {
          passiveSupported = true;
        }
      });
      window[add](pre + 'test', null, options);
      window[rem](pre + 'test', null, options);
    } catch(err) {}
    var Ctor = function(){};
    var _ = function(obj) {
        if (obj instanceof _){
            return obj;
        }
        if (!(this instanceof _)){
            return new _(obj);
        }
        this._wrapped = obj;
    };
    var optimizeCb = function(func, context, argCount) {
        if (context === void 0) {
            return func;
        }
        switch (argCount == null ? 3 : argCount) {
            case 1: return function(value) {
                return func.call(context, value);
            };
            case 2: return function(value, other) {
                return func.call(context, value, other);
            };
            case 3: return function(value, index, collection) {
                return func.call(context, value, index, collection);
            };
            case 4: return function(accumulator, value, index, collection) {
                return func.call(context, accumulator, value, index, collection);
            };
        }
        return function() {
            return func.apply(context, arguments);
        };
    };
    var cb = function(value, context, argCount) {
        if (value === null) {
            return _.identity;
        }
        if (_.isFunction(value)) {
            return optimizeCb(value, context, argCount);
        }
        if (_.isObject(value)) {
            return _.matcher(value);
        }
        return _.property(value);
    };
    _.iteratee = function(value, context) {
        return cb(value, context, Infinity);
    };
    var baseCreate = function(prototype) {
        if (!_.isObject(prototype)) {
            return {};
        }
        if (nativeCreate) {
            return nativeCreate(prototype);
        }
        Ctor[prototype] = prototype;
        var result = new Ctor();
        Ctor[prototype] = null;
        return result;
    };
    var property = function(key) {
        return function(obj) {
            return obj === null ? void 0 : obj[key];
        };
    };
    var createAssigner = function(keysFunc, undefinedOnly) {
        return function(obj) {
            var length = arguments.length;
            if (length < 2 || obj === null) {
                return obj;
            }
            for (var index = 1; index < length; index++) {
                var source = arguments[index],
                    keys = keysFunc(source),
                    l = keys.length;
                for (var i = 0; i < l; i++) {
                    var key = keys[i];
                    if (!undefinedOnly || obj[key] === void 0) {
                        obj[key] = source[key];
                    }
                }
            }
            return obj;
        };
    };
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = property('length');
    var isArrayLike = function(collection) {
        var length = getLength(collection);
        return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    var hasEnumBug = !{toString: null}.propertyIsEnumerable('toString');
    var nonEnumerableProps = ['valueOf', 'isPrototypeOf', 'toString',
        'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];
    function collectNonEnumProps(obj, keys) {
        var nonEnumIdx = nonEnumerableProps.length;
        var constructor = obj.constructor;
        var proto = (_.isFunction(constructor) && constructor[prototype]) || ObjProto;

        // Constructor is a special case.
        var prop = 'constructor';
        if (_.has(obj, prop) && !_.contains(keys, prop)) {
            keys.push(prop);
        }

        while (nonEnumIdx--) {
            prop = nonEnumerableProps[nonEnumIdx];
            if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
                keys.push(prop);
            }
        }
    }
    _.keys = function(obj) {
        if (!_.isObject(obj)) {
            return [];
        }
        if (nativeKeys) {
            return nativeKeys(obj);
        }
        var keys = [];
        for (var key in obj) {
            if (_.has(obj, key)) {
                keys.push(key);}
        }
        if (hasEnumBug) {
            collectNonEnumProps(obj, keys);
        }
        return keys;
    };
    _.each = _.forEach = function(obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            var keys = _.keys(obj);
            for (i = 0, length = keys.length; i < length; i++) {
                iteratee(obj[keys[i]], keys[i], obj);
            }
        }
        return obj;
    };
    function createReduce(dir) {
        function iterator(obj, iteratee, memo, keys, index, length) {
            for (; index >= 0 && index < length; index += dir) {
                var currentKey = keys ? keys[index] : index;
                memo = iteratee(memo, obj[currentKey], currentKey, obj);
            }
            return memo;
        }

        return function(obj, iteratee, memo, context) {
            iteratee = optimizeCb(iteratee, context, 4);
            var keys = !isArrayLike(obj) && _.keys(obj),
                length = (keys || obj).length,
                index = dir > 0 ? 0 : length - 1;
            if (arguments.length < 3) {
                memo = obj[keys ? keys[index] : index];
                index += dir;
            }
            return iterator(obj, iteratee, memo, keys, index, length);
        };
    }
    _.reduce = _.foldl = _.inject = createReduce(1);
    _.reduceRight = _.foldr = createReduce(-1);
    _.filter = _.select = function(obj, predicate, context) {
        var results = [];
        predicate = cb(predicate, context);
        _.each(obj, function(value, index, list) {
            if (predicate(value, index, list)) {
                results.push(value);
            }
        });
        return results;
    };
    _.some = _.any = function(obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) {
                return true;
            }
        }
        return false;
    };
    _.size = function(obj) {
        if (obj == null) {
            return 0;
        }
        return isArrayLike(obj) ? obj.length : _.keys(obj).length;
    };
    var executeBound = function(sourceFunc, boundFunc, context, callingContext, args) {
      if (!(callingContext instanceof boundFunc)) {
          return sourceFunc.apply(context, args);
      }
      var self = baseCreate(sourceFunc[prototype]);
      var result = sourceFunc.apply(self, args);
      if (_.isObject(result)) {
          return result;
      }
      return self;
    };

    // Create a function bound to a given object (assigning `this`, and arguments,
    // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
    // available.
    _.bind = function(func, context) {
      if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
      if (!_.isFunction(func)) {
          throw new TypeError('Bind must be called on a function');
      }
      var args = slice.call(arguments, 2);
      var bound = function() {
        return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
      };
      return bound;
    };
    _.allKeys = function(obj) {
        if (!_.isObject(obj)) {
            return [];
        }
        var keys = [];
        for (var key in obj) {
            keys.push(key);
        }
        // Ahem, IE < 9.
        if (hasEnumBug){
            collectNonEnumProps(obj, keys);
        }
        return keys;
    };
    _.extend = createAssigner(_.allKeys);
    _.extendOwn = _.assign = createAssigner(_.keys);
    _.isArray = nativeIsArray || function(obj) {
        return toString.call(obj) === '[object Array]';
    };
    _.isObject = function(obj) {
        var type = typeof obj;
        return type === 'function' || type === 'object' && !!obj;
    };
    _.each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error'], function(name) {
        _['is' + name] = function(obj) {
            return toString.call(obj) === '[object ' + name + ']';
        };
    });
    _.isNull = function(obj) {
        return obj === null;
    };
    var result = function(instance, obj) {
      return instance._chain ? _(obj).chain() : obj;
    };
    _.each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
        var method = ArrayProto[name];
        _[prototype][name] = function() {
            var obj = this._wrapped;
            method.apply(obj, arguments);
            if ((name === 'shift' || name === 'splice') && obj.length === 0) {
                delete obj[0];
            }
            return result(this, obj);
        };
    });
    _.each(['concat', 'join', 'slice'], function(name) {
        var method = ArrayProto[name];
        _[prototype][name] = function() {
            return result(this, method.apply(this._wrapped, arguments));
        };
    });
    _[prototype].value = function() {
        return this._wrapped;
    };
    _[prototype].valueOf = _[prototype].toJSON = _[prototype].value;
    _[prototype].toString = function() {
        return '' + this._wrapped;
    };
    _.on_event = function(evnt, elem, callback, context, once) {
        var func = _.bind(callback, context || elem);
        var opt = {once: once || false};
        if (passiveSupported){
            opt.passive = true;
        }
        elem[add](pre + evnt, func, opt);
    };
    _.on_load = function(win, callback, context) {
        var fn = _.bind(callback, context || win);
        var done = false;
        var  top = true;
        var doc = win.document;
        var root = doc.documentElement;

        var init = function(e) {
                if (e.type === 'readystatechange' && doc.readyState !== 'complete'){
                    return;
                }
                (e.type === 'load' ? win : doc)[rem](pre + e.type, init, false);
                if (!done && (done = true)){
                    fn.call(win, e.type || e);
                }
            };

        var poll = function() {
                try {
                    root.doScroll('left');
                } catch(e) {
                    setTimeout(poll, 50);
                    return;
                }
                init('poll');
            };

        if (doc.readyState === 'complete'){
            fn.call(win, 'lazy');
        }
        else {
            if (!modern && root.doScroll) {
                try {
                    top = !win.frameElement;
                } catch(e) {

                }
                if (top) {
                    poll();
                }
            }
            doc[add](pre + 'DOMContentLoaded', init, false);
            doc[add](pre + 'readystatechange', init, false);
            win[add](pre + 'load', init, false);
        }

    };

    var YottosLib = function () {};
    YottosLib[prototype].JSON = window.JSON || {};
    YottosLib[prototype].JSON.stringify = YottosLib[prototype].JSON.stringify || function (obj) {
        var t = typeof (obj);
        if (t !== "object" || obj === null) {
            if (t === "string") {
                obj = '"' + obj + '"';
            }
            return String(obj);
        }
        else {
            var n, v, json = [], arr = (obj && obj.constructor === Array);

            for (n in obj) {
                v = obj[n];
                t = typeof (v);

                if (t === "string"){
                    v = '"' + v + '"';
                }
                else if (t === "object" && v !== null) {
                    v = this.stringify(v);
                }
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };
    YottosLib[prototype].JSON.parse = YottosLib[prototype].JSON.parse || function (str) {
        if (str === ""){
            str = '""';
        }
        eval("var p=" + str + ";");
        return p;
    };
    YottosLib[prototype].b = {_keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="};
    YottosLib[prototype].b.e = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = this._u_e(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }

        return output;
    };
    YottosLib[prototype].b.d = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._u_d(output);
        return output;

    };
    YottosLib[prototype].b._u_e = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };
    YottosLib[prototype].b._u_d = function (utftext) {
            var string = "";
            var i = 0;
            var c = 0;
            var c1 = 0;
            var c2 = 0;
            var c3 = 0;

            while (i < utftext.length) {

                c = utftext.charCodeAt(i);

                if (c < 128) {
                    string += String.fromCharCode(c);
                    i++;
                }
                else if ((c > 191) && (c < 224)) {
                    c2 = utftext.charCodeAt(i + 1);
                    string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                    i += 2;
                }
                else {
                    c2 = utftext.charCodeAt(i + 1);
                    c3 = utftext.charCodeAt(i + 2);
                    string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    i += 3;
                }

            }

            return string;
        };
    YottosLib[prototype]._ = _;
    YottosLib[prototype].post_exists = function () {
        var post = false;
        var postMessage = 'postMessage';
        if (window[postMessage]){
            post = true;
        }
        return post;
    };
    return  new YottosLib();
});