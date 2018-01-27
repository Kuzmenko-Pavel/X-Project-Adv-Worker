;(function() {
var jquery_var_deletedIds, jquery_var_document, jquery_var_slice, jquery_var_concat, jquery_var_push, jquery_var_indexOf, jquery_var_class2type, jquery_var_toString, jquery_var_hasOwn, jquery_var_support, jquery_core, jquery_sizzle, jquery_selector_sizzle, jquery_selector, jquery_traversing_var_dir, jquery_traversing_var_siblings, jquery_traversing_var_rneedsContext, jquery_core_var_rsingleTag, jquery_traversing_findFilter, jquery_core_init, jquery_traversing, jquery_var_rnotwhite, jquery_callbacks, jquery_deferred, jquery_core_ready, jquery_support, jquery_data_support, jquery_data_var_acceptData, jquery_data, jquery_attributes_support, jquery_attributes_val, jquery_core_access, jquery_attributes_attr, jquery_attributes_prop, jquery_attributes_classes, jquery_attributes, jquery_manipulation_var_rcheckableType, jquery_manipulation_var_rtagName, jquery_manipulation_var_rscriptType, jquery_manipulation_var_rleadingWhitespace, jquery_manipulation_var_nodeNames, jquery_manipulation_createSafeFragment, jquery_manipulation_support, jquery_manipulation_wrapMap, jquery_manipulation_getAll, jquery_manipulation_setGlobalEval, jquery_manipulation_buildFragment, jquery_event_support, jquery_event, jquery_manipulation, jquery_wrap, jquery_var_pnum, jquery_css_var_rmargin, jquery_var_rcssNum, jquery_css_var_rnumnonpx, jquery_css_var_cssExpand, jquery_css_var_isHidden, jquery_css_var_swap, jquery_var_documentElement, jquery_css_support, jquery_css_curCSS = {}, jquery_css_adjustCSS, jquery_css_defaultDisplay, jquery_css_addGetHookIf, jquery_css, jquery_css_hiddenVisibleSelectors, jquery_serialize, jquery_ajax_var_location, jquery_ajax_var_nonce, jquery_ajax_var_rquery, jquery_ajax_parseJSON, jquery_ajax_parseXML, jquery_ajax, jquery_ajax_xhr, jquery_ajax_script, jquery_ajax_jsonp, jquery_core_parseHTML, jquery_event_alias, jquery_ajax_load, jquery_event_ajax, jquery_offset, jquery_dimensions, jquery_deprecated, jquery, underscore, mobile_detect, detect_device, detect_browser, json3, user_history_test, user_history_fixed_queue, user_history_exclude_offers, user_history_retargeting_offers, user_history_gender_account, user_history_gender_user, user_history_cost_account, user_history_cost_user, user_history_activity_account, user_history_activity_user, user_history_main, settings, loader_informer, loader_offers, loader_main, models_informer, Base64, models_link, loader_offers_log, models_offers, models_params, render_bind_redirect, text, tpl, tpl_templates_advBlockTemplatehtml, tpl_templates_advTemplatehtml, tpl_templates_advBlockNotFoundTemplatehtml, templates_main, render_bind_slider, render_main, loader, main;
(function () {
  jquery_var_deletedIds = [];
  jquery_var_document = window.document;
  jquery_var_slice = function (deletedIds) {
    return deletedIds.slice;
  }(jquery_var_deletedIds);
  jquery_var_concat = function (deletedIds) {
    return deletedIds.concat;
  }(jquery_var_deletedIds);
  jquery_var_push = function (deletedIds) {
    return deletedIds.push;
  }(jquery_var_deletedIds);
  jquery_var_indexOf = function (deletedIds) {
    return deletedIds.indexOf;
  }(jquery_var_deletedIds);
  jquery_var_class2type = {};
  jquery_var_toString = function (class2type) {
    return class2type.toString;
  }(jquery_var_class2type);
  jquery_var_hasOwn = function (class2type) {
    return class2type.hasOwnProperty;
  }(jquery_var_class2type);
  jquery_var_support = {};
  jquery_core = function (deletedIds, document, slice, concat, push, indexOf, class2type, toString, hasOwn, support) {
    var version = '@VERSION',
      // Define a local copy of jQuery
      jQuery = function (selector, context) {
        // The jQuery object is actually just the init constructor 'enhanced'
        // Need init if jQuery is called (just allow error to be thrown if not included)
        return new jQuery.fn.init(selector, context);
      },
      // Support: Android<4.1, IE<9
      // Make sure we trim BOM and NBSP
      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      // Matches dashed string for camelizing
      rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi,
      // Used by jQuery.camelCase as callback to replace()
      fcamelCase = function (all, letter) {
        return letter.toUpperCase();
      };
    jQuery.fn = jQuery.prototype = {
      // The current version of jQuery being used
      jquery: version,
      constructor: jQuery,
      // Start with an empty selector
      selector: '',
      // The default length of a jQuery object is 0
      length: 0,
      toArray: function () {
        return slice.call(this);
      },
      // Get the Nth element in the matched element set OR
      // Get the whole matched element set as a clean array
      get: function (num) {
        return num != null ? num < 0 ? this[num + this.length] : this[num] : // Return all the elements in a clean array
        slice.call(this);
      },
      // Take an array of elements and push it onto the stack
      // (returning the new matched element set)
      pushStack: function (elems) {
        // Build a new jQuery matched element set
        var ret = jQuery.merge(this.constructor(), elems);
        // Add the old object onto the stack (as a reference)
        ret.prevObject = this;
        ret.context = this.context;
        // Return the newly-formed element set
        return ret;
      },
      // Execute a callback for every element in the matched set.
      each: function (callback) {
        return jQuery.each(this, callback);
      },
      map: function (callback) {
        return this.pushStack(jQuery.map(this, function (elem, i) {
          return callback.call(elem, i, elem);
        }));
      },
      slice: function () {
        return this.pushStack(slice.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (i) {
        var len = this.length, j = +i + (i < 0 ? len : 0);
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor();
      },
      // For internal use only.
      // Behaves like an Array's method, not like a jQuery method.
      push: push,
      sort: deletedIds.sort,
      splice: deletedIds.splice
    };
    jQuery.extend = jQuery.fn.extend = function () {
      var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
      // Handle a deep copy situation
      if (typeof target === 'boolean') {
        deep = target;
        // skip the boolean and the target
        target = arguments[i] || {};
        i++;
      }
      // Handle case when target is a string or something (possible in deep copy)
      if (typeof target !== 'object' && !jQuery.isFunction(target)) {
        target = {};
      }
      // extend jQuery itself if only one argument is passed
      if (i === length) {
        target = this;
        i--;
      }
      for (; i < length; i++) {
        // Only deal with non-null/undefined values
        if ((options = arguments[i]) != null) {
          // Extend the base object
          for (name in options) {
            src = target[name];
            copy = options[name];
            // Prevent never-ending loop
            if (target === copy) {
              continue;
            }
            // Recurse if we're merging plain objects or arrays
            if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && jQuery.isArray(src) ? src : [];
              } else {
                clone = src && jQuery.isPlainObject(src) ? src : {};
              }
              // Never move original objects, clone them
              target[name] = jQuery.extend(deep, clone, copy);  // Don't bring in undefined values
            } else if (copy !== undefined) {
              target[name] = copy;
            }
          }
        }
      }
      // Return the modified object
      return target;
    };
    jQuery.extend({
      // Unique for each copy of jQuery on the page
      expando: 'jQuery' + (version + Math.random()).replace(/\D/g, ''),
      // Assume jQuery is ready without the ready module
      isReady: true,
      error: function (msg) {
        throw new Error(msg);
      },
      noop: function () {
      },
      // See test/unit/core.js for details concerning isFunction.
      // Since version 1.3, DOM methods and functions like alert
      // aren't supported. They return false on IE (#2968).
      isFunction: function (obj) {
        return jQuery.type(obj) === 'function';
      },
      isArray: Array.isArray || function (obj) {
        return jQuery.type(obj) === 'array';
      },
      isWindow: function (obj) {
        /* jshint eqeqeq: false */
        return obj != null && obj == obj.window;
      },
      isNumeric: function (obj) {
        // parseFloat NaNs numeric-cast false positives (null|true|false|"")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        // adding 1 corrects loss of precision from parseFloat (#15100)
        var realStringObj = obj && obj.toString();
        return !jQuery.isArray(obj) && realStringObj - parseFloat(realStringObj) + 1 >= 0;
      },
      isEmptyObject: function (obj) {
        var name;
        for (name in obj) {
          return false;
        }
        return true;
      },
      isPlainObject: function (obj) {
        var key;
        // Must be an Object.
        // Because of IE, we also have to check the presence of the constructor property.
        // Make sure that DOM nodes and window objects don't pass through, as well
        if (!obj || jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
          return false;
        }
        try {
          // Not own constructor property must be Object
          if (obj.constructor && !hasOwn.call(obj, 'constructor') && !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
            return false;
          }
        } catch (e) {
          return false;
        }
        // Support: IE<9
        // Handle iteration over inherited properties before own properties.
        if (!support.ownFirst) {
          for (key in obj) {
            return hasOwn.call(obj, key);
          }
        }
        // Own properties are enumerated firstly, so to speed up,
        // if last one is own, then all properties are own.
        for (key in obj) {
        }
        return key === undefined || hasOwn.call(obj, key);
      },
      type: function (obj) {
        if (obj == null) {
          return obj + '';
        }
        return typeof obj === 'object' || typeof obj === 'function' ? class2type[toString.call(obj)] || 'object' : typeof obj;
      },
      // Workarounds based on findings by Jim Driscoll
      // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
      globalEval: function (data) {
        if (data && jQuery.trim(data)) {
          // We use execScript on Internet Explorer
          // We use an anonymous function so that context is window
          // rather than jQuery in Firefox
          (window.execScript || function (data) {
            window['eval'].call(window, data);  // jscs:ignore requireDotNotation
          })(data);
        }
      },
      // Convert dashed to camelCase; used by the css and data modules
      // Microsoft forgot to hump their vendor prefix (#9572)
      camelCase: function (string) {
        return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
      },
      nodeName: function (elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
      },
      each: function (obj, callback) {
        var length, i = 0;
        if (isArrayLike(obj)) {
          length = obj.length;
          for (; i < length; i++) {
            if (callback.call(obj[i], i, obj[i]) === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            if (callback.call(obj[i], i, obj[i]) === false) {
              break;
            }
          }
        }
        return obj;
      },
      // Support: Android<4.1, IE<9
      trim: function (text) {
        return text == null ? '' : (text + '').replace(rtrim, '');
      },
      // results is for internal usage only
      makeArray: function (arr, results) {
        var ret = results || [];
        if (arr != null) {
          if (isArrayLike(Object(arr))) {
            jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr);
          } else {
            push.call(ret, arr);
          }
        }
        return ret;
      },
      inArray: function (elem, arr, i) {
        var len;
        if (arr) {
          if (indexOf) {
            return indexOf.call(arr, elem, i);
          }
          len = arr.length;
          i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
          for (; i < len; i++) {
            // Skip accessing in sparse arrays
            if (i in arr && arr[i] === elem) {
              return i;
            }
          }
        }
        return -1;
      },
      merge: function (first, second) {
        var len = +second.length, j = 0, i = first.length;
        while (j < len) {
          first[i++] = second[j++];
        }
        // Support: IE<9
        // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
        if (len !== len) {
          while (second[j] !== undefined) {
            first[i++] = second[j++];
          }
        }
        first.length = i;
        return first;
      },
      grep: function (elems, callback, invert) {
        var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
        // Go through the array, only saving the items
        // that pass the validator function
        for (; i < length; i++) {
          callbackInverse = !callback(elems[i], i);
          if (callbackInverse !== callbackExpect) {
            matches.push(elems[i]);
          }
        }
        return matches;
      },
      // arg is for internal usage only
      map: function (elems, callback, arg) {
        var length, value, i = 0, ret = [];
        // Go through the array, translating each of the items to their new values
        if (isArrayLike(elems)) {
          length = elems.length;
          for (; i < length; i++) {
            value = callback(elems[i], i, arg);
            if (value != null) {
              ret.push(value);
            }
          }  // Go through every key on the object,
        } else {
          for (i in elems) {
            value = callback(elems[i], i, arg);
            if (value != null) {
              ret.push(value);
            }
          }
        }
        // Flatten any nested arrays
        return concat.apply([], ret);
      },
      // A global GUID counter for objects
      guid: 1,
      // Bind a function to a context, optionally partially applying any
      // arguments.
      proxy: function (fn, context) {
        var args, proxy, tmp;
        if (typeof context === 'string') {
          tmp = fn[context];
          context = fn;
          fn = tmp;
        }
        // Quick check to determine if target is callable, in the spec
        // this throws a TypeError, but we will just return undefined.
        if (!jQuery.isFunction(fn)) {
          return undefined;
        }
        // Simulated bind
        args = slice.call(arguments, 2);
        proxy = function () {
          return fn.apply(context || this, args.concat(slice.call(arguments)));
        };
        // Set the guid of unique handler to the same of original handler, so it can be removed
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;
        return proxy;
      },
      now: function () {
        return +new Date();
      },
      // jQuery.support is not used in Core but other projects attach their
      // properties to it so it needs to exist.
      support: support
    });
    // JSHint would error on this code due to the Symbol not being defined in ES5.
    // Defining this global in .jshintrc would create a danger of using the global
    // unguarded in another place, it seems safer to just disable JSHint for these
    // three lines.
    /* jshint ignore: start */
    if (typeof Symbol === 'function') {
      jQuery.fn[Symbol.iterator] = deletedIds[Symbol.iterator];
    }
    /* jshint ignore: end */
    // Populate the class2type map
    jQuery.each('Boolean Number String Function Array Date RegExp Object Error Symbol'.split(' '), function (i, name) {
      class2type['[object ' + name + ']'] = name.toLowerCase();
    });
    function isArrayLike(obj) {
      // Support: iOS 8.2 (not reproducible in simulator)
      // `in` check used to prevent JIT error (gh-2145)
      // hasOwn isn't used here due to false negatives
      // regarding Nodelist length in IE
      var length = !!obj && 'length' in obj && obj.length, type = jQuery.type(obj);
      if (type === 'function' || jQuery.isWindow(obj)) {
        return false;
      }
      return type === 'array' || length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj;
    }
    return jQuery;
  }(jquery_var_deletedIds, jquery_var_document, jquery_var_slice, jquery_var_concat, jquery_var_push, jquery_var_indexOf, jquery_var_class2type, jquery_var_toString, jquery_var_hasOwn, jquery_var_support);
  /*!
   * Sizzle CSS Selector Engine v2.2.1
   * http://sizzlejs.com/
   *
   * Copyright jQuery Foundation and other contributors
   * Released under the MIT license
   * http://jquery.org/license
   *
   * Date: 2015-10-17
   */
  (function (window) {
    var i, support, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate,
      // Local document vars
      setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains,
      // Instance-specific data
      expando = 'sizzle' + 1 * new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), sortOrder = function (a, b) {
        if (a === b) {
          hasDuplicate = true;
        }
        return 0;
      },
      // General-purpose constants
      MAX_NEGATIVE = 1 << 31,
      // Instance methods
      hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice,
      // Use a stripped-down indexOf as it's faster than native
      // http://jsperf.com/thor-indexof-vs-for/5
      indexOf = function (list, elem) {
        var i = 0, len = list.length;
        for (; i < len; i++) {
          if (list[i] === elem) {
            return i;
          }
        }
        return -1;
      }, booleans = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      // Regular expressions
      // http://www.w3.org/TR/css3-selectors/#whitespace
      whitespace = '[\\x20\\t\\r\\n\\f]',
      // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
      identifier = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
      // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
      attributes = '\\[' + whitespace + '*(' + identifier + ')(?:' + whitespace + // Operator (capture 2)
      '*([*^$|!~]?=)' + whitespace + // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
      '*(?:\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)"|(' + identifier + '))|)' + whitespace + '*\\]', pseudos = ':(' + identifier + ')(?:\\((' + // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
      // 1. quoted (capture 3; capture 4 or capture 5)
      '(\'((?:\\\\.|[^\\\\\'])*)\'|"((?:\\\\.|[^\\\\"])*)")|' + // 2. simple (capture 6)
      '((?:\\\\.|[^\\\\()[\\]]|' + attributes + ')*)|' + // 3. anything else (capture 2)
      '.*' + ')\\)|)',
      // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
      rwhitespace = new RegExp(whitespace + '+', 'g'), rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'), rattributeQuotes = new RegExp('=' + whitespace + '*([^\\]\'"]*?)' + whitespace + '*\\]', 'g'), rpseudo = new RegExp(pseudos), ridentifier = new RegExp('^' + identifier + '$'), matchExpr = {
        'ID': new RegExp('^#(' + identifier + ')'),
        'CLASS': new RegExp('^\\.(' + identifier + ')'),
        'TAG': new RegExp('^(' + identifier + '|[*])'),
        'ATTR': new RegExp('^' + attributes),
        'PSEUDO': new RegExp('^' + pseudos),
        'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
        'bool': new RegExp('^(?:' + booleans + ')$', 'i'),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        'needsContext': new RegExp('^' + whitespace + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', 'i')
      }, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/,
      // Easily-parseable/retrievable ID or TAG or CLASS selectors
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, rescape = /'|\\/g,
      // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
      runescape = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig'), funescape = function (_, escaped, escapedWhitespace) {
        var high = '0x' + escaped - 65536;
        // NaN means non-codepoint
        // Support: Firefox<24
        // Workaround erroneous numeric interpretation of +"0x"
        return high !== high || escapedWhitespace ? escaped : high < 0 ? // BMP codepoint
        String.fromCharCode(high + 65536) : // Supplemental Plane codepoint (surrogate pair)
        String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
      },
      // Used for iframes
      // See setDocument()
      // Removing the function wrapper causes a "Permission Denied"
      // error in IE
      unloadHandler = function () {
        setDocument();
      };
    // Optimize for push.apply( _, NodeList )
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      // Support: Android<4.0
      // Detect silently failing push.apply
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ? function (target, els) {
          push_native.apply(target, slice.call(els));
        } : function (target, els) {
          var j = target.length, i = 0;
          while (target[j++] = els[i++]) {
          }
          target.length = j - 1;
        }
      };
    }
    function Sizzle(selector, context, results, seed) {
      var m, i, elem, nid, nidselect, match, groups, newSelector, newContext = context && context.ownerDocument,
        // nodeType defaults to 9, since context defaults to document
        nodeType = context ? context.nodeType : 9;
      results = results || [];
      // Return early from calls with invalid selector or context
      if (typeof selector !== 'string' || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }
      // Try to shortcut find operations (as opposed to filters) in HTML documents
      if (!seed) {
        if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
          setDocument(context);
        }
        context = context || document;
        if (documentIsHTML) {
          // If the selector is sufficiently simple, try using a "get*By*" DOM method
          // (excepting DocumentFragment context, where the methods don't exist)
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            // ID selector
            if (m = match[1]) {
              // Document context
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  // Support: IE, Opera, Webkit
                  // TODO: identify versions
                  // getElementById can match elements by name instead of ID
                  if (elem.id === m) {
                    results.push(elem);
                    return results;
                  }
                } else {
                  return results;
                }  // Element context
              } else {
                // Support: IE, Opera, Webkit
                // TODO: identify versions
                // getElementById can match elements by name instead of ID
                if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                  results.push(elem);
                  return results;
                }
              }  // Type selector
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;  // Class selector
            } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }
          // Take advantage of querySelectorAll
          if (support.qsa && !compilerCache[selector + ' '] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            if (nodeType !== 1) {
              newContext = context;
              newSelector = selector;  // qSA looks outside Element context, which is not what we want
                                       // Thanks to Andrew Dupont for this workaround technique
                                       // Support: IE <=8
                                       // Exclude object elements
            } else if (context.nodeName.toLowerCase() !== 'object') {
              // Capture the context ID, setting it first if necessary
              if (nid = context.getAttribute('id')) {
                nid = nid.replace(rescape, '\\$&');
              } else {
                context.setAttribute('id', nid = expando);
              }
              // Prefix every selector in the list
              groups = tokenize(selector);
              i = groups.length;
              nidselect = ridentifier.test(nid) ? '#' + nid : '[id=\'' + nid + '\']';
              while (i--) {
                groups[i] = nidselect + ' ' + toSelector(groups[i]);
              }
              newSelector = groups.join(',');
              // Expand context for sibling selectors
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            }
            if (newSelector) {
              try {
                push.apply(results, newContext.querySelectorAll(newSelector));
                return results;
              } catch (qsaError) {
              } finally {
                if (nid === expando) {
                  context.removeAttribute('id');
                }
              }
            }
          }
        }
      }
      // All others
      return select(selector.replace(rtrim, '$1'), context, results, seed);
    }
    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *	deleting the oldest entry
     */
    function createCache() {
      var keys = [];
      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if (keys.push(key + ' ') > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }
        return cache[key + ' '] = value;
      }
      return cache;
    }
    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    /**
     * Support testing using an element
     * @param {Function} fn Passed the created div and expects a boolean result
     */
    function assert(fn) {
      var div = document.createElement('div');
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        // release memory in IE
        div = null;
      }
    }
    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */
    function addHandle(attrs, handler) {
      var arr = attrs.split('|'), i = arr.length;
      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }
    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */
    function siblingCheck(a, b) {
      var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      // Use IE sourceIndex if available on both nodes
      if (diff) {
        return diff;
      }
      // Check if b follows a
      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */
    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === 'input' && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */
    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === 'input' || name === 'button') && elem.type === type;
      };
    }
    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */
    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
          // Match elements found at the specified indexes
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    /**
     * Checks a node for validity as a Sizzle context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== 'undefined' && context;
    }
    // Expose support vars for convenience
    support = Sizzle.support = {};
    /**
     * Detects XML nodes
     * @param {Element|Object} elem An element or a document
     * @returns {Boolean} True iff elem is a non-HTML XML node
     */
    isXML = Sizzle.isXML = function (elem) {
      // documentElement is verified for cases where it doesn't yet exist
      // (such as loading iframes in IE - #4833)
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== 'HTML' : false;
    };
    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [doc] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */
    setDocument = Sizzle.setDocument = function (node) {
      var hasCompare, parent, doc = node ? node.ownerDocument || node : preferredDoc;
      // Return early if doc is invalid or already selected
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      // Update global variables
      document = doc;
      docElem = document.documentElement;
      documentIsHTML = !isXML(document);
      // Support: IE 9-11, Edge
      // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
      if ((parent = document.defaultView) && parent.top !== parent) {
        // Support: IE 11
        if (parent.addEventListener) {
          parent.addEventListener('unload', unloadHandler, false);  // Support: IE 9 - 10 only
        } else if (parent.attachEvent) {
          parent.attachEvent('onunload', unloadHandler);
        }
      }
      /* Attributes
      	---------------------------------------------------------------------- */
      // Support: IE<8
      // Verify that getAttribute really returns attributes and not properties
      // (excepting IE8 booleans)
      support.attributes = assert(function (div) {
        div.className = 'i';
        return !div.getAttribute('className');
      });
      /* getElement(s)By*
      	---------------------------------------------------------------------- */
      // Check if getElementsByTagName("*") returns only elements
      support.getElementsByTagName = assert(function (div) {
        div.appendChild(document.createComment(''));
        return !div.getElementsByTagName('*').length;
      });
      // Support: IE<9
      support.getElementsByClassName = rnative.test(document.getElementsByClassName);
      // Support: IE<10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programatically-set names,
      // so use a roundabout getElementsByName test
      support.getById = assert(function (div) {
        docElem.appendChild(div).id = expando;
        return !document.getElementsByName || !document.getElementsByName(expando).length;
      });
      // ID find and filter
      if (support.getById) {
        Expr.find['ID'] = function (id, context) {
          if (typeof context.getElementById !== 'undefined' && documentIsHTML) {
            var m = context.getElementById(id);
            return m ? [m] : [];
          }
        };
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute('id') === attrId;
          };
        };
      } else {
        // Support: IE6/7
        // getElementById is not reliable as a find shortcut
        delete Expr.find['ID'];
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== 'undefined' && elem.getAttributeNode('id');
            return node && node.value === attrId;
          };
        };
      }
      // Tag
      Expr.find['TAG'] = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== 'undefined') {
          return context.getElementsByTagName(tag);  // DocumentFragment nodes don't have gEBTN
        } else if (support.qsa) {
          return context.querySelectorAll(tag);
        }
      } : function (tag, context) {
        var elem, tmp = [], i = 0,
          // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
          results = context.getElementsByTagName(tag);
        // Filter out possible comments
        if (tag === '*') {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      // Class
      Expr.find['CLASS'] = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== 'undefined' && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      /* QSA/matchesSelector
      	---------------------------------------------------------------------- */
      // QSA and matchesSelector support
      // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
      rbuggyMatches = [];
      // qSa(:focus) reports false when true (Chrome 21)
      // We allow this because of a bug in IE8/9 that throws an error
      // whenever `document.activeElement` is accessed on an iframe
      // So, we allow :focus to pass through QSA all the time to avoid the IE error
      // See http://bugs.jquery.com/ticket/13378
      rbuggyQSA = [];
      if (support.qsa = rnative.test(document.querySelectorAll)) {
        // Build QSA regex
        // Regex strategy adopted from Diego Perini
        assert(function (div) {
          // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // http://bugs.jquery.com/ticket/12359
          docElem.appendChild(div).innerHTML = '<a id=\'' + expando + '\'></a>' + '<select id=\'' + expando + '-\r\\\' msallowcapture=\'\'>' + '<option selected=\'\'></option></select>';
          // Support: IE8, Opera 11-12.16
          // Nothing should be selected when empty strings follow ^= or $= or *=
          // The test attribute must be unknown in Opera but "safe" for WinRT
          // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
          if (div.querySelectorAll('[msallowcapture^=\'\']').length) {
            rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")');
          }
          // Support: IE8
          // Boolean attributes and "value" are not treated correctly
          if (!div.querySelectorAll('[selected]').length) {
            rbuggyQSA.push('\\[' + whitespace + '*(?:value|' + booleans + ')');
          }
          // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
          if (!div.querySelectorAll('[id~=' + expando + '-]').length) {
            rbuggyQSA.push('~=');
          }
          // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests
          if (!div.querySelectorAll(':checked').length) {
            rbuggyQSA.push(':checked');
          }
          // Support: Safari 8+, iOS 8+
          // https://bugs.webkit.org/show_bug.cgi?id=136851
          // In-page `selector#id sibing-combinator selector` fails
          if (!div.querySelectorAll('a#' + expando + '+*').length) {
            rbuggyQSA.push('.#.+[+~]');
          }
        });
        assert(function (div) {
          // Support: Windows 8 Native Apps
          // The type and name attributes are restricted during .innerHTML assignment
          var input = document.createElement('input');
          input.setAttribute('type', 'hidden');
          div.appendChild(input).setAttribute('name', 'D');
          // Support: IE8
          // Enforce case-sensitivity of name attribute
          if (div.querySelectorAll('[name=d]').length) {
            rbuggyQSA.push('name' + whitespace + '*[*^$|!~]?=');
          }
          // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests
          if (!div.querySelectorAll(':enabled').length) {
            rbuggyQSA.push(':enabled', ':disabled');
          }
          // Opera 10-11 does not throw on post-comma invalid pseudos
          div.querySelectorAll('*,:x');
          rbuggyQSA.push(',.*:');
        });
      }
      if (support.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function (div) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call(div, 'div');
          // This should fail with an exception
          // Gecko does not error, returns false instead
          matches.call(div, '[s!=\'\']:x');
          rbuggyMatches.push('!=', pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'));
      /* Contains
      	---------------------------------------------------------------------- */
      hasCompare = rnative.test(docElem.compareDocumentPosition);
      // Element contains another
      // Purposefully self-exclusive
      // As in, an element does not contain itself
      contains = hasCompare || rnative.test(docElem.contains) ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function (a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      /* Sorting
      	---------------------------------------------------------------------- */
      // Document order sorting
      sortOrder = hasCompare ? function (a, b) {
        // Flag for duplicate removal
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        // Sort on method existence if only one input has compareDocumentPosition
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }
        // Calculate position if both inputs belong to the same document
        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : // Otherwise we know they are disconnected
        1;
        // Disconnected nodes
        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          // Choose the first element that is related to our preferred document
          if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
            return -1;
          }
          if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
            return 1;
          }
          // Maintain original order
          return sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;
        }
        return compare & 4 ? -1 : 1;
      } : function (a, b) {
        // Exit early if the nodes are identical
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
        // Parentless nodes are either documents or disconnected
        if (!aup || !bup) {
          return a === document ? -1 : b === document ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf(sortInput, a) - indexOf(sortInput, b) : 0;  // If the nodes are siblings, we can do a quick check
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        // Otherwise we need full lists of their ancestors for comparison
        cur = a;
        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }
        cur = b;
        while (cur = cur.parentNode) {
          bp.unshift(cur);
        }
        // Walk down the tree looking for a discrepancy
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? // Do a sibling check if the nodes have a common ancestor
        siblingCheck(ap[i], bp[i]) : // Otherwise nodes in our document sort first
        ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return document;
    };
    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function (elem, expr) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      // Make sure that attribute selectors are quoted
      expr = expr.replace(rattributeQuotes, '=\'$1\']');
      if (support.matchesSelector && documentIsHTML && !compilerCache[expr + ' '] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          // IE 9's matchesSelector returns false on disconnected nodes
          if (ret || support.disconnectedMatch || // As well, disconnected nodes are said to be in a document
            // fragment in IE 9
            elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
        }
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function (context, elem) {
      // Set document vars if needed
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function (elem, name) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
        // Don't get fooled by Object.prototype properties (jQuery #13807)
        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val !== undefined ? val : support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
    };
    Sizzle.error = function (msg) {
      throw new Error('Syntax error, unrecognized expression: ' + msg);
    };
    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */
    Sizzle.uniqueSort = function (results) {
      var elem, duplicates = [], j = 0, i = 0;
      // Unless we *know* we can detect duplicates, assume their presence
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      // Clear input after sorting to release objects
      // See https://github.com/jquery/sizzle/pull/225
      sortInput = null;
      return results;
    };
    /**
     * Utility function for retrieving the text value of an array of DOM nodes
     * @param {Array|Element} elem
     */
    getText = Sizzle.getText = function (elem) {
      var node, ret = '', i = 0, nodeType = elem.nodeType;
      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while (node = elem[i++]) {
          // Do not traverse comment nodes
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        // Use textContent for elements
        // innerText usage removed for consistency of new lines (jQuery #11153)
        if (typeof elem.textContent === 'string') {
          return elem.textContent;
        } else {
          // Traverse its children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      // Do not include comment or processing instruction nodes
      return ret;
    };
    Expr = Sizzle.selectors = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        '>': {
          dir: 'parentNode',
          first: true
        },
        ' ': { dir: 'parentNode' },
        '+': {
          dir: 'previousSibling',
          first: true
        },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        'ATTR': function (match) {
          match[1] = match[1].replace(runescape, funescape);
          // Move the given value to match[3] whether quoted or unquoted
          match[3] = (match[3] || match[4] || match[5] || '').replace(runescape, funescape);
          if (match[2] === '~=') {
            match[3] = ' ' + match[3] + ' ';
          }
          return match.slice(0, 4);
        },
        'CHILD': function (match) {
          /* matches from matchExpr["CHILD"]
          		1 type (only|nth|...)
          		2 what (child|of-type)
          		3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
          		4 xn-component of xn+y argument ([+-]?\d*n|)
          		5 sign of xn-component
          		6 x of xn-component
          		7 sign of y-component
          		8 y of y-component
          	*/
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === 'nth') {
            // nth-* requires argument
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === 'even' || match[3] === 'odd'));
            match[5] = +(match[7] + match[8] || match[3] === 'odd');  // other types prohibit arguments
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        'PSEUDO': function (match) {
          var excess, unquoted = !match[6] && match[2];
          if (matchExpr['CHILD'].test(match[0])) {
            return null;
          }
          // Accept quoted arguments as-is
          if (match[3]) {
            match[2] = match[4] || match[5] || '';  // Strip excess characters from unquoted arguments
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          // Return only captures needed by the pseudo filter method (type and argument)
          return match.slice(0, 3);
        }
      },
      filter: {
        'TAG': function (nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === '*' ? function () {
            return true;
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        'CLASS': function (className) {
          var pattern = classCache[className + ' '];
          return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === 'string' && elem.className || typeof elem.getAttribute !== 'undefined' && elem.getAttribute('class') || '');
          });
        },
        'ATTR': function (name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === '!=';
            }
            if (!operator) {
              return true;
            }
            result += '';
            return operator === '=' ? result === check : operator === '!=' ? result !== check : operator === '^=' ? check && result.indexOf(check) === 0 : operator === '*=' ? check && result.indexOf(check) > -1 : operator === '$=' ? check && result.slice(-check.length) === check : operator === '~=' ? (' ' + result.replace(rwhitespace, ' ') + ' ').indexOf(check) > -1 : operator === '|=' ? result === check || result.slice(0, check.length + 1) === check + '-' : false;
          };
        },
        'CHILD': function (type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== 'nth', forward = type.slice(-4) !== 'last', ofType = what === 'of-type';
          return first === 1 && last === 0 ? // Shortcut for :nth-*(n)
          function (elem) {
            return !!elem.parentNode;
          } : function (elem, context, xml) {
            var cache, uniqueCache, outerCache, node, nodeIndex, start, dir = simple !== forward ? 'nextSibling' : 'previousSibling', parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
            if (parent) {
              // :(first|last|only)-(child|of-type)
              if (simple) {
                while (dir) {
                  node = elem;
                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  // Reverse direction for :only-* (if we haven't yet done so)
                  start = dir = type === 'only' && !start && 'nextSibling';
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              // non-xml :nth-child(...) stores cache data on `parent`
              if (forward && useCache) {
                // Seek `elem` from a previously-cached index
                // ...in a gzip-friendly way
                node = parent;
                outerCache = node[expando] || (node[expando] = {});
                // Support: IE <9 only
                // Defend against cloned attroperties (jQuery gh-1709)
                uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                cache = uniqueCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                  // When found, cache indexes on `parent` and break
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    uniqueCache[type] = [
                      dirruns,
                      nodeIndex,
                      diff
                    ];
                    break;
                  }
                }
              } else {
                // Use previously-cached element index if available
                if (useCache) {
                  // ...in a gzip-friendly way
                  node = elem;
                  outerCache = node[expando] || (node[expando] = {});
                  // Support: IE <9 only
                  // Defend against cloned attroperties (jQuery gh-1709)
                  uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                  cache = uniqueCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }
                // xml :nth-child(...)
                // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                if (diff === false) {
                  // Use the same loop as above to seek `elem` from the start
                  while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      // Cache the index of each encountered element
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        // Support: IE <9 only
                        // Defend against cloned attroperties (jQuery gh-1709)
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        uniqueCache[type] = [
                          dirruns,
                          diff
                        ];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }
              // Incorporate the offset, then check against cycle size
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        'PSEUDO': function (pseudo, argument) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
          // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does
          if (fn[expando]) {
            return fn(argument);
          }
          // But maintain support for old signatures
          if (fn.length > 1) {
            args = [
              pseudo,
              pseudo,
              '',
              argument
            ];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx, matched = fn(seed, argument), i = matched.length;
              while (i--) {
                idx = indexOf(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        'not': markFunction(function (selector) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
            // Match elements unmatched by `matcher`
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            // Don't keep the element (issue #299)
            input[0] = null;
            return !results.pop();
          };
        }),
        'has': markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        'contains': markFunction(function (text) {
          text = text.replace(runescape, funescape);
          return function (elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        'lang': markFunction(function (lang) {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || '')) {
            Sizzle.error('unsupported lang: ' + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute('xml:lang') || elem.getAttribute('lang')) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + '-') === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        // Miscellaneous
        'target': function (elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        'root': function (elem) {
          return elem === docElem;
        },
        'focus': function (elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        'enabled': function (elem) {
          return elem.disabled === false;
        },
        'disabled': function (elem) {
          return elem.disabled === true;
        },
        'checked': function (elem) {
          // In CSS3, :checked should return both checked and selected elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
        },
        'selected': function (elem) {
          // Accessing this property makes selected-by-default
          // options in Safari work properly
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        // Contents
        'empty': function (elem) {
          // http://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
          //   but not by others (comment: 8; processing instruction: 7; etc.)
          // nodeType < 6 works because attributes (2) do not appear as children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        'parent': function (elem) {
          return !Expr.pseudos['empty'](elem);
        },
        // Element/input types
        'header': function (elem) {
          return rheader.test(elem.nodeName);
        },
        'input': function (elem) {
          return rinputs.test(elem.nodeName);
        },
        'button': function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === 'input' && elem.type === 'button' || name === 'button';
        },
        'text': function (elem) {
          var attr;
          return elem.nodeName.toLowerCase() === 'input' && elem.type === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === 'text');
        },
        // Position-in-collection
        'first': createPositionalPseudo(function () {
          return [0];
        }),
        'last': createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        'even': createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'odd': createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos['nth'] = Expr.pseudos['eq'];
    // Add button/input type pseudos
    for (i in {
        radio: true,
        checkbox: true,
        file: true,
        password: true,
        image: true
      }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
        submit: true,
        reset: true
      }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    // Easy API for creating new setFilters
    function setFilters() {
    }
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    tokenize = Sizzle.tokenize = function (selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + ' '];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        // Comma and first run
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        // Combinators
        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrim, ' ')
          });
          soFar = soFar.slice(matched.length);
        }
        // Filters
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : // Cache the tokens
      tokenCache(selector, groups).slice(0);
    };
    function toSelector(tokens) {
      var i = 0, len = tokens.length, selector = '';
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir, checkNonElements = base && dir === 'parentNode', doneName = done++;
      return combinator.first ? // Check against closest ancestor/preceding element
      function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : // Check against all ancestor/preceding elements
      function (elem, context, xml) {
        var oldCache, uniqueCache, outerCache, newCache = [
            dirruns,
            doneName
          ];
        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              // Support: IE <9 only
              // Defend against cloned attroperties (jQuery gh-1709)
              uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
              if ((oldCache = uniqueCache[dir]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                // Assign to newCache so results back-propagate to previous elements
                return newCache[2] = oldCache[2];
              } else {
                // Reuse newcache so results back-propagate to previous elements
                uniqueCache[dir] = newCache;
                // A match means we're done; a fail means we have to keep checking
                if (newCache[2] = matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0, len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function (seed, results, context, xml) {
        var temp, i, elem, preMap = [], postMap = [], preexisting = results.length,
          // Get initial elements from seed or context
          elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []),
          // Prefilter to get matcher input, preserving a map for seed-results synchronization
          matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
          postFinder || (seed ? preFilter : preexisting || postFilter) ? // ...intermediate processing is necessary
          [] : // ...otherwise use results directly
          results : matcherIn;
        // Find primary matches
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        // Apply postFilter
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          // Un-match failing elements by moving them back to matcherIn
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            // Move matched elements from seed to results to keep them synchronized
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }  // Add elements to results, through postFinder if defined
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0,
        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator(function (elem) {
          return elem === checkContext;
        }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
          return indexOf(checkContext, elem) > -1;
        }, implicitRelative, true), matchers = [function (elem, context, xml) {
            var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
            // Avoid hanging onto element (issue #299)
            checkContext = null;
            return ret;
          }];
      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          // Return special upon seeing a positional matcher
          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(// If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === ' ' ? '*' : '' })).replace(rtrim, '$1'), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, outermost) {
          var elem, j, matcher, matchedCount = 0, i = '0', unmatched = seed && [], setMatched = [], contextBackup = outermostContext,
            // We must always have either seed elements or outermost context
            elems = seed || byElement && Expr.find['TAG']('*', outermost),
            // Use integer dirruns iff this is the outermost matcher
            dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
          if (outermost) {
            outermostContext = context === document || context || outermost;
          }
          // Add elements passing elementMatchers directly to results
          // Support: IE<9, Safari
          // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
          for (; i !== len && (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;
              if (!context && elem.ownerDocument !== document) {
                setDocument(elem);
                xml = !documentIsHTML;
              }
              while (matcher = elementMatchers[j++]) {
                if (matcher(elem, context || document, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
              }
            }
            // Track unmatched elements for set filters
            if (bySet) {
              // They will have gone through all possible matchers
              if (elem = !matcher && elem) {
                matchedCount--;
              }
              // Lengthen the array for every element, matched or not
              if (seed) {
                unmatched.push(elem);
              }
            }
          }
          // `i` is now the count of elements visited above, and adding it to `matchedCount`
          // makes the latter nonnegative.
          matchedCount += i;
          // Apply set filters to unmatched elements
          // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
          // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
          // no element matchers and no seed.
          // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
          // case, which will result in a "00" `matchedCount` that differs from `i` but is also
          // numerically zero.
          if (bySet && i !== matchedCount) {
            j = 0;
            while (matcher = setMatchers[j++]) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              // Reintegrate element matches to eliminate the need for sorting
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }
              // Discard index placeholder values to get only actual matches
              setMatched = condense(setMatched);
            }
            // Add matches to results
            push.apply(results, setMatched);
            // Seedless set matches succeeding multiple successful matchers stipulate sorting
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              Sizzle.uniqueSort(results);
            }
          }
          // Override manipulation of globals by nested matchers
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function (selector, match) {
      var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + ' '];
      if (!cached) {
        // Generate a function of recursive functions that can be used to check each element
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        // Cache the compiled function
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
        // Save selector and tokenization
        cached.selector = selector;
      }
      return cached;
    };
    /**
     * A low-level selection function that works with Sizzle's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with Sizzle.compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */
    select = Sizzle.select = function (selector, context, results, seed) {
      var i, tokens, token, type, find, compiled = typeof selector === 'function' && selector, match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || [];
      // Try to minimize operations if there is only one selector in the list and no seed
      // (the latter of which guarantees us context)
      if (match.length === 1) {
        // Reduce context if the leading compound selector is an ID
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === 'ID' && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find['ID'](token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;  // Precompiled matchers will still verify ancestry, so step up a level
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }
        // Fetch a seed set for right-to-left matching
        i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];
          // Abort if we hit a combinator
          if (Expr.relative[type = token.type]) {
            break;
          }
          if (find = Expr.find[type]) {
            // Search, expanding context for leading sibling combinators
            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }
      // Compile and execute a filtering function if one is not provided
      // Provide `match` to avoid retokenization if we modified the selector above
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    };
    // One-time assignments
    // Sort stability
    support.sortStable = expando.split('').sort(sortOrder).join('') === expando;
    // Support: Chrome 14-35+
    // Always assume duplicates if they aren't passed to the comparison function
    support.detectDuplicates = !!hasDuplicate;
    // Initialize against the default document
    setDocument();
    // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert(function (div1) {
      // Should return 1, but returns 4 (following)
      return div1.compareDocumentPosition(document.createElement('div')) & 1;
    });
    // Support: IE<8
    // Prevent attribute/property "interpolation"
    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if (!assert(function (div) {
        div.innerHTML = '<a href=\'#\'></a>';
        return div.firstChild.getAttribute('href') === '#';
      })) {
      addHandle('type|href|height|width', function (elem, name, isXML) {
        if (!isXML) {
          return elem.getAttribute(name, name.toLowerCase() === 'type' ? 1 : 2);
        }
      });
    }
    // Support: IE<9
    // Use defaultValue in place of getAttribute("value")
    if (!support.attributes || !assert(function (div) {
        div.innerHTML = '<input/>';
        div.firstChild.setAttribute('value', '');
        return div.firstChild.getAttribute('value') === '';
      })) {
      addHandle('value', function (elem, name, isXML) {
        if (!isXML && elem.nodeName.toLowerCase() === 'input') {
          return elem.defaultValue;
        }
      });
    }
    // Support: IE<9
    // Use getAttributeNode to fetch booleans when getAttribute lies
    if (!assert(function (div) {
        return div.getAttribute('disabled') == null;
      })) {
      addHandle(booleans, function (elem, name, isXML) {
        var val;
        if (!isXML) {
          return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
        }
      });
    }
    // EXPOSE
    if (true) {
      jquery_sizzle = function () {
        return Sizzle;
      }();
    } else if (typeof module !== 'undefined' && module.exports) {
      module.exports = Sizzle;
    } else {
      window.Sizzle = Sizzle;
    }  // EXPOSE
  }(window));
  jquery_selector_sizzle = function (jQuery, Sizzle) {
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[':'] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
  }(jquery_core, jquery_sizzle);
  jquery_selector = undefined;
  jquery_traversing_var_dir = function (jQuery) {
    return function (elem, dir, until) {
      var matched = [], truncate = until !== undefined;
      while ((elem = elem[dir]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
          if (truncate && jQuery(elem).is(until)) {
            break;
          }
          matched.push(elem);
        }
      }
      return matched;
    };
  }(jquery_core);
  jquery_traversing_var_siblings = function (n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  jquery_traversing_var_rneedsContext = function (jQuery) {
    return jQuery.expr.match.needsContext;
  }(jquery_core);
  jquery_core_var_rsingleTag = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/;
  jquery_traversing_findFilter = function (jQuery, indexOf, rneedsContext) {
    var risSimple = /^.[^:#\[\.,]*$/;
    // Implement the identical functionality for filter and not
    function winnow(elements, qualifier, not) {
      if (jQuery.isFunction(qualifier)) {
        return jQuery.grep(elements, function (elem, i) {
          /* jshint -W018 */
          return !!qualifier.call(elem, i, elem) !== not;
        });
      }
      if (qualifier.nodeType) {
        return jQuery.grep(elements, function (elem) {
          return elem === qualifier !== not;
        });
      }
      if (typeof qualifier === 'string') {
        if (risSimple.test(qualifier)) {
          return jQuery.filter(qualifier, elements, not);
        }
        qualifier = jQuery.filter(qualifier, elements);
      }
      return jQuery.grep(elements, function (elem) {
        return jQuery.inArray(elem, qualifier) > -1 !== not;
      });
    }
    jQuery.filter = function (expr, elems, not) {
      var elem = elems[0];
      if (not) {
        expr = ':not(' + expr + ')';
      }
      return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
        return elem.nodeType === 1;
      }));
    };
    jQuery.fn.extend({
      find: function (selector) {
        var i, ret = [], self = this, len = self.length;
        if (typeof selector !== 'string') {
          return this.pushStack(jQuery(selector).filter(function () {
            for (i = 0; i < len; i++) {
              if (jQuery.contains(self[i], this)) {
                return true;
              }
            }
          }));
        }
        for (i = 0; i < len; i++) {
          jQuery.find(selector, self[i], ret);
        }
        // Needed because $( selector, context ) becomes $( context ).find( selector )
        ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
        ret.selector = this.selector ? this.selector + ' ' + selector : selector;
        return ret;
      },
      filter: function (selector) {
        return this.pushStack(winnow(this, selector || [], false));
      },
      not: function (selector) {
        return this.pushStack(winnow(this, selector || [], true));
      },
      is: function (selector) {
        return !!winnow(this, // If this is a positional/relative selector, check membership in the returned set
        // so $("p:first").is("p:last") won't return true for a doc with two "p".
        typeof selector === 'string' && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
      }
    });
  }(jquery_core, jquery_var_indexOf, jquery_traversing_var_rneedsContext);
  jquery_core_init = function (jQuery, document, rsingleTag) {
    // A central reference to the root jQuery(document)
    var rootjQuery,
      // A simple way to check for HTML strings
      // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
      // Strict HTML recognition (#11290: must start with <)
      rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, init = jQuery.fn.init = function (selector, context, root) {
        var match, elem;
        // HANDLE: $(""), $(null), $(undefined), $(false)
        if (!selector) {
          return this;
        }
        // init accepts an alternate rootjQuery
        // so migrate can support jQuery.sub (gh-2101)
        root = root || rootjQuery;
        // Handle HTML strings
        if (typeof selector === 'string') {
          if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
            // Assume that strings that start and end with <> are HTML and skip the regex check
            match = [
              null,
              selector,
              null
            ];
          } else {
            match = rquickExpr.exec(selector);
          }
          // Match html or make sure no context is specified for #id
          if (match && (match[1] || !context)) {
            // HANDLE: $(html) -> $(array)
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              // scripts is true for back-compat
              // Intentionally let the error be thrown if parseHTML is not present
              jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
              // HANDLE: $(html, props)
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  // Properties of context are called as methods if possible
                  if (jQuery.isFunction(this[match])) {
                    this[match](context[match]);  // ...and otherwise set as attributes
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;  // HANDLE: $(#id)
            } else {
              elem = document.getElementById(match[2]);
              // Check parentNode to catch when Blackberry 4.6 returns
              // nodes that are no longer in the document #6963
              if (elem && elem.parentNode) {
                // Handle the case where IE and Opera return items
                // by name instead of ID
                if (elem.id !== match[2]) {
                  return rootjQuery.find(selector);
                }
                // Otherwise, we inject the element directly into the jQuery object
                this.length = 1;
                this[0] = elem;
              }
              this.context = document;
              this.selector = selector;
              return this;
            }  // HANDLE: $(expr, $(...))
          } else if (!context || context.jquery) {
            return (context || root).find(selector);  // HANDLE: $(expr, context)
                                                      // (which is just equivalent to: $(context).find(expr)
          } else {
            return this.constructor(context).find(selector);
          }  // HANDLE: $(DOMElement)
        } else if (selector.nodeType) {
          this.context = this[0] = selector;
          this.length = 1;
          return this;  // HANDLE: $(function)
                        // Shortcut for document ready
        } else if (jQuery.isFunction(selector)) {
          return typeof root.ready !== 'undefined' ? root.ready(selector) : // Execute immediately if ready is not present
          selector(jQuery);
        }
        if (selector.selector !== undefined) {
          this.selector = selector.selector;
          this.context = selector.context;
        }
        return jQuery.makeArray(selector, this);
      };
    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;
    // Initialize central reference
    rootjQuery = jQuery(document);
    return init;
  }(jquery_core, jquery_var_document, jquery_core_var_rsingleTag);
  jquery_traversing = function (jQuery, dir, siblings, rneedsContext) {
    var rparentsprev = /^(?:parents|prev(?:Until|All))/,
      // methods guaranteed to produce a unique set when starting from a unique set
      guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
    jQuery.fn.extend({
      has: function (target) {
        var i, targets = jQuery(target, this), len = targets.length;
        return this.filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(this, targets[i])) {
              return true;
            }
          }
        });
      },
      closest: function (selectors, context) {
        var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || typeof selectors !== 'string' ? jQuery(selectors, context || this.context) : 0;
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            // Always skip document fragments
            if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : // Don't pass non-elements to Sizzle
              cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
              matched.push(cur);
              break;
            }
          }
        }
        return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
      },
      // Determine the position of an element within
      // the matched set of elements
      index: function (elem) {
        // No argument, return index in parent
        if (!elem) {
          return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
        }
        // index in selector
        if (typeof elem === 'string') {
          return jQuery.inArray(this[0], jQuery(elem));
        }
        // Locate the position of the desired element
        return jQuery.inArray(// If it receives a jQuery object, the first element is used
        elem.jquery ? elem[0] : elem, this);
      },
      add: function (selector, context) {
        return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
      },
      addBack: function (selector) {
        return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
      }
    });
    function sibling(cur, dir) {
      do {
        cur = cur[dir];
      } while (cur && cur.nodeType !== 1);
      return cur;
    }
    jQuery.each({
      parent: function (elem) {
        var parent = elem.parentNode;
        return parent && parent.nodeType !== 11 ? parent : null;
      },
      parents: function (elem) {
        return dir(elem, 'parentNode');
      },
      parentsUntil: function (elem, i, until) {
        return dir(elem, 'parentNode', until);
      },
      next: function (elem) {
        return sibling(elem, 'nextSibling');
      },
      prev: function (elem) {
        return sibling(elem, 'previousSibling');
      },
      nextAll: function (elem) {
        return dir(elem, 'nextSibling');
      },
      prevAll: function (elem) {
        return dir(elem, 'previousSibling');
      },
      nextUntil: function (elem, i, until) {
        return dir(elem, 'nextSibling', until);
      },
      prevUntil: function (elem, i, until) {
        return dir(elem, 'previousSibling', until);
      },
      siblings: function (elem) {
        return siblings((elem.parentNode || {}).firstChild, elem);
      },
      children: function (elem) {
        return siblings(elem.firstChild);
      },
      contents: function (elem) {
        return jQuery.nodeName(elem, 'iframe') ? elem.contentDocument || elem.contentWindow.document : jQuery.merge([], elem.childNodes);
      }
    }, function (name, fn) {
      jQuery.fn[name] = function (until, selector) {
        var ret = jQuery.map(this, fn, until);
        if (name.slice(-5) !== 'Until') {
          selector = until;
        }
        if (selector && typeof selector === 'string') {
          ret = jQuery.filter(selector, ret);
        }
        if (this.length > 1) {
          // Remove duplicates
          if (!guaranteedUnique[name]) {
            ret = jQuery.uniqueSort(ret);
          }
          // Reverse order for parents* and prev-derivatives
          if (rparentsprev.test(name)) {
            ret = ret.reverse();
          }
        }
        return this.pushStack(ret);
      };
    });
    return jQuery;
  }(jquery_core, jquery_traversing_var_dir, jquery_traversing_var_siblings, jquery_traversing_var_rneedsContext);
  jquery_var_rnotwhite = /\S+/g;
  jquery_callbacks = function (jQuery, rnotwhite) {
    // Convert String-formatted options into Object-formatted ones
    function createOptions(options) {
      var object = {};
      jQuery.each(options.match(rnotwhite) || [], function (_, flag) {
        object[flag] = true;
      });
      return object;
    }
    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function (options) {
      // Convert options from String-formatted to Object-formatted if needed
      // (we check in cache first)
      options = typeof options === 'string' ? createOptions(options) : jQuery.extend({}, options);
      var
        // Flag to know if list is currently firing
        firing,
        // Last fire value for non-forgettable lists
        memory,
        // Flag to know if list was already fired
        fired,
        // Flag to prevent firing
        locked,
        // Actual callback list
        list = [],
        // Queue of execution data for repeatable lists
        queue = [],
        // Index of currently firing callback (modified by add/remove as needed)
        firingIndex = -1,
        // Fire callbacks
        fire = function () {
          // Enforce single-firing
          locked = options.once;
          // Execute callbacks for all pending executions,
          // respecting firingIndex overrides and runtime changes
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              // Run callback and check for early termination
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                // Jump to end and forget the data so .add doesn't re-fire
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          // Forget the data if we're done with it
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          // Clean up if we're done firing for good
          if (locked) {
            // Keep an empty list if we have data for future add calls
            if (memory) {
              list = [];  // Otherwise, this object is spent
            } else {
              list = '';
            }
          }
        },
        // Actual Callbacks object
        self = {
          // Add a callback or a collection of callbacks to the list
          add: function () {
            if (list) {
              // If we have memory from a past run, we should fire after adding
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery.each(args, function (_, arg) {
                  if (jQuery.isFunction(arg)) {
                    if (!options.unique || !self.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && jQuery.type(arg) !== 'string') {
                    // Inspect recursively
                    add(arg);
                  }
                });
              }(arguments));
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          // Remove a callback from the list
          remove: function () {
            jQuery.each(arguments, function (_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                // Handle firing indexes
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          // Check if a given callback is in the list.
          // If no argument is given, return whether or not list has callbacks attached.
          has: function (fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          // Remove all callbacks from the list
          empty: function () {
            if (list) {
              list = [];
            }
            return this;
          },
          // Disable .fire and .add
          // Abort any current/pending executions
          // Clear all callbacks and values
          disable: function () {
            locked = queue = [];
            list = memory = '';
            return this;
          },
          disabled: function () {
            return !list;
          },
          // Disable .fire
          // Also disable .add unless we have memory (since it would have no effect)
          // Abort any pending executions
          lock: function () {
            locked = true;
            if (!memory) {
              self.disable();
            }
            return this;
          },
          locked: function () {
            return !!locked;
          },
          // Call all callbacks with the given context and arguments
          fireWith: function (context, args) {
            if (!locked) {
              args = args || [];
              args = [
                context,
                args.slice ? args.slice() : args
              ];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          // Call all the callbacks with the given arguments
          fire: function () {
            self.fireWith(this, arguments);
            return this;
          },
          // To know if the callbacks have already been called at least once
          fired: function () {
            return !!fired;
          }
        };
      return self;
    };
    return jQuery;
  }(jquery_core, jquery_var_rnotwhite);
  jquery_deferred = function (jQuery, slice) {
    jQuery.extend({
      Deferred: function (func) {
        var tuples = [
            // action, add listener, listener list, final state
            [
              'resolve',
              'done',
              jQuery.Callbacks('once memory'),
              'resolved'
            ],
            [
              'reject',
              'fail',
              jQuery.Callbacks('once memory'),
              'rejected'
            ],
            [
              'notify',
              'progress',
              jQuery.Callbacks('memory')
            ]
          ], state = 'pending', promise = {
            state: function () {
              return state;
            },
            always: function () {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            then: function () {
              var fns = arguments;
              return jQuery.Deferred(function (newDefer) {
                jQuery.each(tuples, function (i, tuple) {
                  var fn = jQuery.isFunction(fns[i]) && fns[i];
                  // deferred[ done | fail | progress ] for forwarding actions to newDefer
                  deferred[tuple[1]](function () {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && jQuery.isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + 'With'](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function (obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          }, deferred = {};
        // Keep pipe for back-compat
        promise.pipe = promise.then;
        // Add list-specific methods
        jQuery.each(tuples, function (i, tuple) {
          var list = tuple[2], stateString = tuple[3];
          // promise[ done | fail | progress ] = list.add
          promise[tuple[1]] = list.add;
          // Handle state
          if (stateString) {
            list.add(function () {
              // state = [ resolved | rejected ]
              state = stateString;  // [ reject_list | resolve_list ].disable; progress_list.lock
            }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
          }
          // deferred[ resolve | reject | notify ]
          deferred[tuple[0]] = function () {
            deferred[tuple[0] + 'With'](this === deferred ? promise : this, arguments);
            return this;
          };
          deferred[tuple[0] + 'With'] = list.fireWith;
        });
        // Make the deferred a promise
        promise.promise(deferred);
        // Call given func if any
        if (func) {
          func.call(deferred, deferred);
        }
        // All done!
        return deferred;
      },
      // Deferred helper
      when: function (subordinate) {
        var i = 0, resolveValues = slice.call(arguments), length = resolveValues.length,
          // the count of uncompleted subordinates
          remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0,
          // the master Deferred.
          // If resolveValues consist of only a single Deferred, just use that.
          deferred = remaining === 1 ? subordinate : jQuery.Deferred(),
          // Update function for both resolve and progress values
          updateFunc = function (i, contexts, values) {
            return function (value) {
              contexts[i] = this;
              values[i] = arguments.length > 1 ? slice.call(arguments) : value;
              if (values === progressValues) {
                deferred.notifyWith(contexts, values);
              } else if (!--remaining) {
                deferred.resolveWith(contexts, values);
              }
            };
          }, progressValues, progressContexts, resolveContexts;
        // add listeners to Deferred subordinates; treat others as resolved
        if (length > 1) {
          progressValues = new Array(length);
          progressContexts = new Array(length);
          resolveContexts = new Array(length);
          for (; i < length; i++) {
            if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
              resolveValues[i].promise().progress(updateFunc(i, progressContexts, progressValues)).done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject);
            } else {
              --remaining;
            }
          }
        }
        // if we're not waiting on anything, resolve the master
        if (!remaining) {
          deferred.resolveWith(resolveContexts, resolveValues);
        }
        return deferred.promise();
      }
    });
    return jQuery;
  }(jquery_core, jquery_var_slice);
  jquery_core_ready = function (jQuery, document) {
    // The deferred used on DOM ready
    var readyList;
    jQuery.fn.ready = function (fn) {
      // Add the callback
      jQuery.ready.promise().done(fn);
      return this;
    };
    jQuery.extend({
      // Is the DOM ready to be used? Set to true once it occurs.
      isReady: false,
      // A counter to track how many items to wait for before
      // the ready event fires. See #6781
      readyWait: 1,
      // Hold (or release) the ready event
      holdReady: function (hold) {
        if (hold) {
          jQuery.readyWait++;
        } else {
          jQuery.ready(true);
        }
      },
      // Handle when the DOM is ready
      ready: function (wait) {
        // Abort if there are pending holds or we're already ready
        if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
          return;
        }
        // Remember that the DOM is ready
        jQuery.isReady = true;
        // If a normal DOM Ready event fired, decrement, and wait if need be
        if (wait !== true && --jQuery.readyWait > 0) {
          return;
        }
        // If there are functions bound, to execute
        readyList.resolveWith(document, [jQuery]);
        // Trigger any bound ready events
        if (jQuery.fn.triggerHandler) {
          jQuery(document).triggerHandler('ready');
          jQuery(document).off('ready');
        }
      }
    });
    /**
     * Clean-up method for dom ready events
     */
    function detach() {
      if (document.addEventListener) {
        document.removeEventListener('DOMContentLoaded', completed);
        window.removeEventListener('load', completed);
      } else {
        document.detachEvent('onreadystatechange', completed);
        window.detachEvent('onload', completed);
      }
    }
    /**
     * The ready event handler and self cleanup method
     */
    function completed() {
      // readyState === "complete" is good enough for us to call the dom ready in oldIE
      if (document.addEventListener || window.event.type === 'load' || document.readyState === 'complete') {
        detach();
        jQuery.ready();
      }
    }
    jQuery.ready.promise = function (obj) {
      if (!readyList) {
        readyList = jQuery.Deferred();
        // Catch cases where $(document).ready() is called
        // after the browser event has already occurred.
        // Support: IE6-10
        // Older IE sometimes signals "interactive" too soon
        if (document.readyState === 'complete' || document.readyState !== 'loading' && !document.documentElement.doScroll) {
          // Handle it asynchronously to allow scripts the opportunity to delay ready
          window.setTimeout(jQuery.ready);  // Standards-based browsers support DOMContentLoaded
        } else if (document.addEventListener) {
          // Use the handy event callback
          document.addEventListener('DOMContentLoaded', completed);
          // A fallback to window.onload, that will always work
          window.addEventListener('load', completed);  // If IE event model is used
        } else {
          // Ensure firing before onload, maybe late but safe also for iframes
          document.attachEvent('onreadystatechange', completed);
          // A fallback to window.onload, that will always work
          window.attachEvent('onload', completed);
          // If IE and not a frame
          // continually check to see if the document is ready
          var top = false;
          try {
            top = window.frameElement == null && document.documentElement;
          } catch (e) {
          }
          if (top && top.doScroll) {
            (function doScrollCheck() {
              if (!jQuery.isReady) {
                try {
                  // Use the trick by Diego Perini
                  // http://javascript.nwbox.com/IEContentLoaded/
                  top.doScroll('left');
                } catch (e) {
                  return window.setTimeout(doScrollCheck, 50);
                }
                // detach all dom ready events
                detach();
                // and execute any waiting functions
                jQuery.ready();
              }
            }());
          }
        }
      }
      return readyList.promise(obj);
    };
    // Kick off the DOM ready check even if the user does not
    jQuery.ready.promise();
  }(jquery_core, jquery_var_document);
  jquery_support = function (jQuery, support, document) {
    // Support: IE<9
    // Iteration over object's inherited properties before its own
    var i;
    for (i in jQuery(support)) {
      break;
    }
    support.ownFirst = i === '0';
    // Note: most support tests are defined in their respective modules.
    // false until the test is run
    support.inlineBlockNeedsLayout = false;
    // Execute ASAP in case we need to set body.style.zoom
    jQuery(function () {
      // Minified: var a,b,c,d
      var val, div, body, container;
      body = document.getElementsByTagName('body')[0];
      if (!body || !body.style) {
        // Return for frameset docs that don't have a body
        return;
      }
      // Setup
      div = document.createElement('div');
      container = document.createElement('div');
      container.style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px';
      body.appendChild(container).appendChild(div);
      if (typeof div.style.zoom !== 'undefined') {
        // Support: IE<8
        // Check if natively block-level elements act like inline-block
        // elements when setting their display to 'inline' and giving
        // them layout
        div.style.cssText = 'display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1';
        support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
        if (val) {
          // Prevent IE 6 from affecting layout for positioned elements #11048
          // Prevent IE from shrinking the body in IE 7 mode #12869
          // Support: IE<8
          body.style.zoom = 1;
        }
      }
      body.removeChild(container);
    });
    return support;
  }(jquery_core, jquery_var_support, jquery_var_document);
  jquery_data_support = function (document, support) {
    (function () {
      var div = document.createElement('div');
      // Support: IE<9
      support.deleteExpando = true;
      try {
        delete div.test;
      } catch (e) {
        support.deleteExpando = false;
      }
      // Null elements to avoid leaks in IE.
      div = null;
    }());
    return support;
  }(jquery_var_document, jquery_var_support);
  jquery_data_var_acceptData = function (jQuery) {
    /**
     * Determines whether an object can have data
     */
    return function (elem) {
      var noData = jQuery.noData[(elem.nodeName + ' ').toLowerCase()], nodeType = +elem.nodeType || 1;
      // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
      return nodeType !== 1 && nodeType !== 9 ? false : // Nodes accept data unless otherwise specified; rejection can be conditional
      !noData || noData !== true && elem.getAttribute('classid') === noData;
    };
  }(jquery_core);
  jquery_data = function (jQuery, deletedIds, support, acceptData) {
    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /([A-Z])/g;
    function dataAttr(elem, key, data) {
      // If nothing was found internally, try to fetch any
      // data from the HTML5 data-* attribute
      if (data === undefined && elem.nodeType === 1) {
        var name = 'data-' + key.replace(rmultiDash, '-$1').toLowerCase();
        data = elem.getAttribute(name);
        if (typeof data === 'string') {
          try {
            data = data === 'true' ? true : data === 'false' ? false : data === 'null' ? null : // Only convert to a number if it doesn't change the string
            +data + '' === data ? +data : rbrace.test(data) ? jQuery.parseJSON(data) : data;
          } catch (e) {
          }
          // Make sure we set the data so it isn't changed later
          jQuery.data(elem, key, data);
        } else {
          data = undefined;
        }
      }
      return data;
    }
    // checks a cache object for emptiness
    function isEmptyDataObject(obj) {
      var name;
      for (name in obj) {
        // if the public data object is empty, the private is still empty
        if (name === 'data' && jQuery.isEmptyObject(obj[name])) {
          continue;
        }
        if (name !== 'toJSON') {
          return false;
        }
      }
      return true;
    }
    function internalData(elem, name, data, pvt) {
      if (!acceptData(elem)) {
        return;
      }
      var ret, thisCache, internalKey = jQuery.expando,
        // We have to handle DOM nodes and JS objects differently because IE6-7
        // can't GC object references properly across the DOM-JS boundary
        isNode = elem.nodeType,
        // Only DOM nodes need the global jQuery cache; JS object data is
        // attached directly to the object so GC can occur automatically
        cache = isNode ? jQuery.cache : elem,
        // Only defining an ID for JS objects if its cache already exists allows
        // the code to shortcut on the same path as a DOM node with no cache
        id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;
      // Avoid doing any more work than we need to when trying to get data on an
      // object that has no data at all
      if ((!id || !cache[id] || !pvt && !cache[id].data) && data === undefined && typeof name === 'string') {
        return;
      }
      if (!id) {
        // Only DOM nodes need a new unique ID for each element since their data
        // ends up in the global cache
        if (isNode) {
          id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
        } else {
          id = internalKey;
        }
      }
      if (!cache[id]) {
        // Avoid exposing jQuery metadata on plain JS objects when the object
        // is serialized using JSON.stringify
        cache[id] = isNode ? {} : { toJSON: jQuery.noop };
      }
      // An object can be passed to jQuery.data instead of a key/value pair; this gets
      // shallow copied over onto the existing cache
      if (typeof name === 'object' || typeof name === 'function') {
        if (pvt) {
          cache[id] = jQuery.extend(cache[id], name);
        } else {
          cache[id].data = jQuery.extend(cache[id].data, name);
        }
      }
      thisCache = cache[id];
      // jQuery data() is stored in a separate object inside the object's internal data
      // cache in order to avoid key collisions between internal data and user-defined
      // data.
      if (!pvt) {
        if (!thisCache.data) {
          thisCache.data = {};
        }
        thisCache = thisCache.data;
      }
      if (data !== undefined) {
        thisCache[jQuery.camelCase(name)] = data;
      }
      // Check for both converted-to-camel and non-converted data property names
      // If a data property was specified
      if (typeof name === 'string') {
        // First Try to find as-is property data
        ret = thisCache[name];
        // Test for null|undefined property data
        if (ret == null) {
          // Try to find the camelCased property
          ret = thisCache[jQuery.camelCase(name)];
        }
      } else {
        ret = thisCache;
      }
      return ret;
    }
    function internalRemoveData(elem, name, pvt) {
      if (!acceptData(elem)) {
        return;
      }
      var thisCache, i, isNode = elem.nodeType,
        // See jQuery.data for more information
        cache = isNode ? jQuery.cache : elem, id = isNode ? elem[jQuery.expando] : jQuery.expando;
      // If there is already no cache entry for this object, there is no
      // purpose in continuing
      if (!cache[id]) {
        return;
      }
      if (name) {
        thisCache = pvt ? cache[id] : cache[id].data;
        if (thisCache) {
          // Support array or space separated string names for data keys
          if (!jQuery.isArray(name)) {
            // try the string as a key before any manipulation
            if (name in thisCache) {
              name = [name];
            } else {
              // split the camel cased version by spaces unless a key with the spaces exists
              name = jQuery.camelCase(name);
              if (name in thisCache) {
                name = [name];
              } else {
                name = name.split(' ');
              }
            }
          } else {
            // If "name" is an array of keys...
            // When data is initially created, via ("key", "val") signature,
            // keys will be converted to camelCase.
            // Since there is no way to tell _how_ a key was added, remove
            // both plain key and camelCase key. #12786
            // This will only penalize the array argument path.
            name = name.concat(jQuery.map(name, jQuery.camelCase));
          }
          i = name.length;
          while (i--) {
            delete thisCache[name[i]];
          }
          // If there is no data left in the cache, we want to continue
          // and let the cache object itself get destroyed
          if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
            return;
          }
        }
      }
      // See jQuery.data for more information
      if (!pvt) {
        delete cache[id].data;
        // Don't destroy the parent cache unless the internal data object
        // had been the only thing left in it
        if (!isEmptyDataObject(cache[id])) {
          return;
        }
      }
      // Destroy the cache
      if (isNode) {
        jQuery.cleanData([elem], true);  // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
                                         /* jshint eqeqeq: false */
      } else if (support.deleteExpando || cache != cache.window) {
        /* jshint eqeqeq: true */
        delete cache[id];  // When all else fails, undefined
      } else {
        cache[id] = undefined;
      }
    }
    jQuery.extend({
      cache: {},
      // The following elements (space-suffixed to avoid Object.prototype collisions)
      // throw uncatchable exceptions if you attempt to set expando properties
      noData: {
        'applet ': true,
        'embed ': true,
        // ...but Flash objects (which have this classid) *can* handle expandos
        'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'
      },
      hasData: function (elem) {
        elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
        return !!elem && !isEmptyDataObject(elem);
      },
      data: function (elem, name, data) {
        return internalData(elem, name, data);
      },
      removeData: function (elem, name) {
        return internalRemoveData(elem, name);
      },
      // For internal use only.
      _data: function (elem, name, data) {
        return internalData(elem, name, data, true);
      },
      _removeData: function (elem, name) {
        return internalRemoveData(elem, name, true);
      }
    });
    jQuery.fn.extend({
      data: function (key, value) {
        var i, name, data, elem = this[0], attrs = elem && elem.attributes;
        // Special expections of .data basically thwart jQuery.access,
        // so implement the relevant behavior ourselves
        // Gets all values
        if (key === undefined) {
          if (this.length) {
            data = jQuery.data(elem);
            if (elem.nodeType === 1 && !jQuery._data(elem, 'parsedAttrs')) {
              i = attrs.length;
              while (i--) {
                // Support: IE11+
                // The attrs elements can be null (#14894)
                if (attrs[i]) {
                  name = attrs[i].name;
                  if (name.indexOf('data-') === 0) {
                    name = jQuery.camelCase(name.slice(5));
                    dataAttr(elem, name, data[name]);
                  }
                }
              }
              jQuery._data(elem, 'parsedAttrs', true);
            }
          }
          return data;
        }
        // Sets multiple values
        if (typeof key === 'object') {
          return this.each(function () {
            jQuery.data(this, key);
          });
        }
        return arguments.length > 1 ? // Sets one value
        this.each(function () {
          jQuery.data(this, key, value);
        }) : // Gets one value
        // Try to fetch any internally stored data first
        elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
      },
      removeData: function (key) {
        return this.each(function () {
          jQuery.removeData(this, key);
        });
      }
    });
    return jQuery;
  }(jquery_core, jquery_var_deletedIds, jquery_data_support, jquery_data_var_acceptData);
  jquery_attributes_support = function (document, support) {
    (function () {
      var a, input = document.createElement('input'), div = document.createElement('div'), select = document.createElement('select'), opt = select.appendChild(document.createElement('option'));
      // Setup
      div = document.createElement('div');
      div.setAttribute('className', 't');
      div.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>';
      a = div.getElementsByTagName('a')[0];
      // Support: Windows Web Apps (WWA)
      // `type` must use .setAttribute for WWA (#14901)
      input.setAttribute('type', 'checkbox');
      div.appendChild(input);
      a = div.getElementsByTagName('a')[0];
      // First batch of tests.
      a.style.cssText = 'top:1px';
      // Test setAttribute on camelCase class.
      // If it works, we need attrFixes when doing get/setAttribute (ie6/7)
      support.getSetAttribute = div.className !== 't';
      // Get the style information from getAttribute
      // (IE uses .cssText instead)
      support.style = /top/.test(a.getAttribute('style'));
      // Make sure that URLs aren't manipulated
      // (IE normalizes it by default)
      support.hrefNormalized = a.getAttribute('href') === '/a';
      // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
      support.checkOn = !!input.value;
      // Make sure that a selected-by-default option has a working selected property.
      // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
      support.optSelected = opt.selected;
      // Tests for enctype support on a form (#6743)
      support.enctype = !!document.createElement('form').enctype;
      // Make sure that the options inside disabled selects aren't marked as disabled
      // (WebKit marks them as disabled)
      select.disabled = true;
      support.optDisabled = !opt.disabled;
      // Support: IE8 only
      // Check if we can trust getAttribute("value")
      input = document.createElement('input');
      input.setAttribute('value', '');
      support.input = input.getAttribute('value') === '';
      // Check if an input maintains its value after becoming a radio
      input.value = 't';
      input.setAttribute('type', 'radio');
      support.radioValue = input.value === 't';
    }());
    return support;
  }(jquery_var_document, jquery_var_support);
  jquery_attributes_val = function (jQuery, support) {
    var rreturn = /\r/g, rspaces = /[\x20\t\r\n\f]+/g;
    jQuery.fn.extend({
      val: function (value) {
        var hooks, ret, isFunction, elem = this[0];
        if (!arguments.length) {
          if (elem) {
            hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
            if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined) {
              return ret;
            }
            ret = elem.value;
            return typeof ret === 'string' ? // handle most common string cases
            ret.replace(rreturn, '') : // handle cases where value is null/undef or number
            ret == null ? '' : ret;
          }
          return;
        }
        isFunction = jQuery.isFunction(value);
        return this.each(function (i) {
          var val;
          if (this.nodeType !== 1) {
            return;
          }
          if (isFunction) {
            val = value.call(this, i, jQuery(this).val());
          } else {
            val = value;
          }
          // Treat null/undefined as ""; convert numbers to string
          if (val == null) {
            val = '';
          } else if (typeof val === 'number') {
            val += '';
          } else if (jQuery.isArray(val)) {
            val = jQuery.map(val, function (value) {
              return value == null ? '' : value + '';
            });
          }
          hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
          // If set returns undefined, fall back to normal setting
          if (!hooks || !('set' in hooks) || hooks.set(this, val, 'value') === undefined) {
            this.value = val;
          }
        });
      }
    });
    jQuery.extend({
      valHooks: {
        option: {
          get: function (elem) {
            var val = jQuery.find.attr(elem, 'value');
            return val != null ? val : // Support: IE10-11+
            // option.text throws exceptions (#14686, #14858)
            // Strip and collapse whitespace
            // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
            jQuery.trim(jQuery.text(elem)).replace(rspaces, ' ');
          }
        },
        select: {
          get: function (elem) {
            var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === 'select-one' || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
            // Loop through all the selected options
            for (; i < max; i++) {
              option = options[i];
              // oldIE doesn't update selected after form reset (#2551)
              if ((option.selected || i === index) && (support.optDisabled ? !option.disabled : option.getAttribute('disabled') === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, 'optgroup'))) {
                // Get the specific value for the option
                value = jQuery(option).val();
                // We don't need an array for one selects
                if (one) {
                  return value;
                }
                // Multi-Selects return an array
                values.push(value);
              }
            }
            return values;
          },
          set: function (elem, value) {
            var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
            while (i--) {
              option = options[i];
              if (jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                // Support: IE6
                // When new option element is added to select box we need to
                // force reflow of newly added node in order to workaround delay
                // of initialization properties
                try {
                  option.selected = optionSet = true;
                } catch (_) {
                  option.scrollHeight;
                }
              } else {
                option.selected = false;
              }
            }
            // Force browsers to behave consistently when non-matching value is set
            if (!optionSet) {
              elem.selectedIndex = -1;
            }
            return options;
          }
        }
      }
    });
    // Radios and checkboxes getter/setter
    jQuery.each([
      'radio',
      'checkbox'
    ], function () {
      jQuery.valHooks[this] = {
        set: function (elem, value) {
          if (jQuery.isArray(value)) {
            return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
          }
        }
      };
      if (!support.checkOn) {
        jQuery.valHooks[this].get = function (elem) {
          return elem.getAttribute('value') === null ? 'on' : elem.value;
        };
      }
    });
  }(jquery_core, jquery_attributes_support);
  jquery_core_access = function (jQuery) {
    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
      var i = 0, length = elems.length, bulk = key == null;
      // Sets many values
      if (jQuery.type(key) === 'object') {
        chainable = true;
        for (i in key) {
          access(elems, fn, i, key[i], true, emptyGet, raw);
        }  // Sets one value
      } else if (value !== undefined) {
        chainable = true;
        if (!jQuery.isFunction(value)) {
          raw = true;
        }
        if (bulk) {
          // Bulk operations run against the entire set
          if (raw) {
            fn.call(elems, value);
            fn = null;  // ...except when executing function values
          } else {
            bulk = fn;
            fn = function (elem, key, value) {
              return bulk.call(jQuery(elem), value);
            };
          }
        }
        if (fn) {
          for (; i < length; i++) {
            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
          }
        }
      }
      return chainable ? elems : // Gets
      bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    };
    return access;
  }(jquery_core);
  jquery_attributes_attr = function (jQuery, access, support, rnotwhite) {
    var nodeHook, boolHook, attrHandle = jQuery.expr.attrHandle, ruseDefault = /^(?:checked|selected)$/i, getSetAttribute = support.getSetAttribute, getSetInput = support.input;
    jQuery.fn.extend({
      attr: function (name, value) {
        return access(this, jQuery.attr, name, value, arguments.length > 1);
      },
      removeAttr: function (name) {
        return this.each(function () {
          jQuery.removeAttr(this, name);
        });
      }
    });
    jQuery.extend({
      attr: function (elem, name, value) {
        var ret, hooks, nType = elem.nodeType;
        // Don't get/set attributes on text, comment and attribute nodes
        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        // Fallback to prop when attributes are not supported
        if (typeof elem.getAttribute === 'undefined') {
          return jQuery.prop(elem, name, value);
        }
        // All attributes are lowercase
        // Grab necessary hook if one is defined
        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
          name = name.toLowerCase();
          hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
        }
        if (value !== undefined) {
          if (value === null) {
            jQuery.removeAttr(elem, name);
            return;
          }
          if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
            return ret;
          }
          elem.setAttribute(name, value + '');
          return value;
        }
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        }
        ret = jQuery.find.attr(elem, name);
        // Non-existent attributes return null, we normalize to undefined
        return ret == null ? undefined : ret;
      },
      attrHooks: {
        type: {
          set: function (elem, value) {
            if (!support.radioValue && value === 'radio' && jQuery.nodeName(elem, 'input')) {
              // Setting the type on a radio button after the value resets the value in IE8-9
              // Reset value to default in case type is set after value during creation
              var val = elem.value;
              elem.setAttribute('type', value);
              if (val) {
                elem.value = val;
              }
              return value;
            }
          }
        }
      },
      removeAttr: function (elem, value) {
        var name, propName, i = 0, attrNames = value && value.match(rnotwhite);
        if (attrNames && elem.nodeType === 1) {
          while (name = attrNames[i++]) {
            propName = jQuery.propFix[name] || name;
            // Boolean attributes get special treatment (#10870)
            if (jQuery.expr.match.bool.test(name)) {
              // Set corresponding property to false
              if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                elem[propName] = false;  // Support: IE<9
                                         // Also clear defaultChecked/defaultSelected (if appropriate)
              } else {
                elem[jQuery.camelCase('default-' + name)] = elem[propName] = false;
              }  // See #9699 for explanation of this approach (setting first, then removal)
            } else {
              jQuery.attr(elem, name, '');
            }
            elem.removeAttribute(getSetAttribute ? name : propName);
          }
        }
      }
    });
    // Hooks for boolean attributes
    boolHook = {
      set: function (elem, value, name) {
        if (value === false) {
          // Remove boolean attributes when set to false
          jQuery.removeAttr(elem, name);
        } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
          // IE<8 needs the *property* name
          elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);
        } else {
          // Support: IE<9
          // Use defaultChecked and defaultSelected for oldIE
          elem[jQuery.camelCase('default-' + name)] = elem[name] = true;
        }
        return name;
      }
    };
    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
      var getter = attrHandle[name] || jQuery.find.attr;
      if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
        attrHandle[name] = function (elem, name, isXML) {
          var ret, handle;
          if (!isXML) {
            // Avoid an infinite loop by temporarily removing this function from the getter
            handle = attrHandle[name];
            attrHandle[name] = ret;
            ret = getter(elem, name, isXML) != null ? name.toLowerCase() : null;
            attrHandle[name] = handle;
          }
          return ret;
        };
      } else {
        attrHandle[name] = function (elem, name, isXML) {
          if (!isXML) {
            return elem[jQuery.camelCase('default-' + name)] ? name.toLowerCase() : null;
          }
        };
      }
    });
    // fix oldIE attroperties
    if (!getSetInput || !getSetAttribute) {
      jQuery.attrHooks.value = {
        set: function (elem, value, name) {
          if (jQuery.nodeName(elem, 'input')) {
            // Does not return so that setAttribute is also used
            elem.defaultValue = value;
          } else {
            // Use nodeHook if defined (#1954); otherwise setAttribute is fine
            return nodeHook && nodeHook.set(elem, value, name);
          }
        }
      };
    }
    // IE6/7 do not support getting/setting some attributes with get/setAttribute
    if (!getSetAttribute) {
      // Use this for any attribute in IE6/7
      // This fixes almost every IE6/7 issue
      nodeHook = {
        set: function (elem, value, name) {
          // Set the existing or create a new attribute node
          var ret = elem.getAttributeNode(name);
          if (!ret) {
            elem.setAttributeNode(ret = elem.ownerDocument.createAttribute(name));
          }
          ret.value = value += '';
          // Break association with cloned elements by also using setAttribute (#9646)
          if (name === 'value' || value === elem.getAttribute(name)) {
            return value;
          }
        }
      };
      // Some attributes are constructed with empty-string values when not defined
      attrHandle.id = attrHandle.name = attrHandle.coords = function (elem, name, isXML) {
        var ret;
        if (!isXML) {
          return (ret = elem.getAttributeNode(name)) && ret.value !== '' ? ret.value : null;
        }
      };
      // Fixing value retrieval on a button requires this module
      jQuery.valHooks.button = {
        get: function (elem, name) {
          var ret = elem.getAttributeNode(name);
          if (ret && ret.specified) {
            return ret.value;
          }
        },
        set: nodeHook.set
      };
      // Set contenteditable to false on removals(#10429)
      // Setting to empty string throws an error as an invalid value
      jQuery.attrHooks.contenteditable = {
        set: function (elem, value, name) {
          nodeHook.set(elem, value === '' ? false : value, name);
        }
      };
      // Set width and height to auto instead of 0 on empty string( Bug #8150 )
      // This is for removals
      jQuery.each([
        'width',
        'height'
      ], function (i, name) {
        jQuery.attrHooks[name] = {
          set: function (elem, value) {
            if (value === '') {
              elem.setAttribute(name, 'auto');
              return value;
            }
          }
        };
      });
    }
    if (!support.style) {
      jQuery.attrHooks.style = {
        get: function (elem) {
          // Return undefined in the case of empty string
          // Note: IE uppercases css property names, but if we were to .toLowerCase()
          // .cssText, that would destroy case sensitivity in URL's, like in "background"
          return elem.style.cssText || undefined;
        },
        set: function (elem, value) {
          return elem.style.cssText = value + '';
        }
      };
    }
  }(jquery_core, jquery_core_access, jquery_attributes_support, jquery_var_rnotwhite);
  jquery_attributes_prop = function (jQuery, access, support) {
    var rfocusable = /^(?:input|select|textarea|button|object)$/i, rclickable = /^(?:a|area)$/i;
    jQuery.fn.extend({
      prop: function (name, value) {
        return access(this, jQuery.prop, name, value, arguments.length > 1);
      },
      removeProp: function (name) {
        name = jQuery.propFix[name] || name;
        return this.each(function () {
          // try/catch handles cases where IE balks (such as removing a property on window)
          try {
            this[name] = undefined;
            delete this[name];
          } catch (e) {
          }
        });
      }
    });
    jQuery.extend({
      prop: function (elem, name, value) {
        var ret, hooks, nType = elem.nodeType;
        // Don't get/set properties on text, comment and attribute nodes
        if (nType === 3 || nType === 8 || nType === 2) {
          return;
        }
        if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
          // Fix name and attach hooks
          name = jQuery.propFix[name] || name;
          hooks = jQuery.propHooks[name];
        }
        if (value !== undefined) {
          if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
            return ret;
          }
          return elem[name] = value;
        }
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
          return ret;
        }
        return elem[name];
      },
      propHooks: {
        tabIndex: {
          get: function (elem) {
            // elem.tabIndex doesn't always return the
            // correct value when it hasn't been explicitly set
            // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
            // Use proper attribute retrieval(#12072)
            var tabindex = jQuery.find.attr(elem, 'tabindex');
            return tabindex ? parseInt(tabindex, 10) : rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href ? 0 : -1;
          }
        }
      },
      propFix: {
        'for': 'htmlFor',
        'class': 'className'
      }
    });
    // Some attributes require a special call on IE
    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if (!support.hrefNormalized) {
      // href/src property should get the full normalized URL (#10299/#12915)
      jQuery.each([
        'href',
        'src'
      ], function (i, name) {
        jQuery.propHooks[name] = {
          get: function (elem) {
            return elem.getAttribute(name, 4);
          }
        };
      });
    }
    // Support: Safari, IE9+
    // Accessing the selectedIndex property
    // forces the browser to respect setting selected
    // on the option
    // The getter ensures a default option is selected
    // when in an optgroup
    if (!support.optSelected) {
      jQuery.propHooks.selected = {
        get: function (elem) {
          var parent = elem.parentNode;
          if (parent) {
            parent.selectedIndex;
            // Make sure that it also works with optgroups, see #5701
            if (parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
          }
          return null;
        },
        set: function (elem) {
          var parent = elem.parentNode;
          if (parent) {
            parent.selectedIndex;
            if (parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
          }
        }
      };
    }
    jQuery.each([
      'tabIndex',
      'readOnly',
      'maxLength',
      'cellSpacing',
      'cellPadding',
      'rowSpan',
      'colSpan',
      'useMap',
      'frameBorder',
      'contentEditable'
    ], function () {
      jQuery.propFix[this.toLowerCase()] = this;
    });
    // IE6/7 call enctype encoding
    if (!support.enctype) {
      jQuery.propFix.enctype = 'encoding';
    }
  }(jquery_core, jquery_core_access, jquery_attributes_support);
  jquery_attributes_classes = function (jQuery, rnotwhite) {
    var rclass = /[\t\r\n\f]/g;
    function getClass(elem) {
      return jQuery.attr(elem, 'class') || '';
    }
    jQuery.fn.extend({
      addClass: function (value) {
        var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
        if (jQuery.isFunction(value)) {
          return this.each(function (j) {
            jQuery(this).addClass(value.call(this, j, getClass(this)));
          });
        }
        if (typeof value === 'string' && value) {
          classes = value.match(rnotwhite) || [];
          while (elem = this[i++]) {
            curValue = getClass(elem);
            cur = elem.nodeType === 1 && (' ' + curValue + ' ').replace(rclass, ' ');
            if (cur) {
              j = 0;
              while (clazz = classes[j++]) {
                if (cur.indexOf(' ' + clazz + ' ') < 0) {
                  cur += clazz + ' ';
                }
              }
              // only assign if different to avoid unneeded rendering.
              finalValue = jQuery.trim(cur);
              if (curValue !== finalValue) {
                jQuery.attr(elem, 'class', finalValue);
              }
            }
          }
        }
        return this;
      },
      removeClass: function (value) {
        var classes, elem, cur, curValue, clazz, j, finalValue, i = 0;
        if (jQuery.isFunction(value)) {
          return this.each(function (j) {
            jQuery(this).removeClass(value.call(this, j, getClass(this)));
          });
        }
        if (!arguments.length) {
          return this.attr('class', '');
        }
        if (typeof value === 'string' && value) {
          classes = value.match(rnotwhite) || [];
          while (elem = this[i++]) {
            curValue = getClass(elem);
            // This expression is here for better compressibility (see addClass)
            cur = elem.nodeType === 1 && (' ' + curValue + ' ').replace(rclass, ' ');
            if (cur) {
              j = 0;
              while (clazz = classes[j++]) {
                // Remove *all* instances
                while (cur.indexOf(' ' + clazz + ' ') > -1) {
                  cur = cur.replace(' ' + clazz + ' ', ' ');
                }
              }
              // Only assign if different to avoid unneeded rendering.
              finalValue = jQuery.trim(cur);
              if (curValue !== finalValue) {
                jQuery.attr(elem, 'class', finalValue);
              }
            }
          }
        }
        return this;
      },
      toggleClass: function (value, stateVal) {
        var type = typeof value;
        if (typeof stateVal === 'boolean' && type === 'string') {
          return stateVal ? this.addClass(value) : this.removeClass(value);
        }
        if (jQuery.isFunction(value)) {
          return this.each(function (i) {
            jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
          });
        }
        return this.each(function () {
          var className, i, self, classNames;
          if (type === 'string') {
            // Toggle individual class names
            i = 0;
            self = jQuery(this);
            classNames = value.match(rnotwhite) || [];
            while (className = classNames[i++]) {
              // Check each className given, space separated list
              if (self.hasClass(className)) {
                self.removeClass(className);
              } else {
                self.addClass(className);
              }
            }  // Toggle whole class name
          } else if (value === undefined || type === 'boolean') {
            className = getClass(this);
            if (className) {
              // store className if set
              jQuery._data(this, '__className__', className);
            }
            // If the element has a class name or if we're passed "false",
            // then remove the whole classname (if there was one, the above saved it).
            // Otherwise bring back whatever was previously saved (if anything),
            // falling back to the empty string if nothing was stored.
            jQuery.attr(this, 'class', className || value === false ? '' : jQuery._data(this, '__className__') || '');
          }
        });
      },
      hasClass: function (selector) {
        var className, elem, i = 0;
        className = ' ' + selector + ' ';
        while (elem = this[i++]) {
          if (elem.nodeType === 1 && (' ' + getClass(elem) + ' ').replace(rclass, ' ').indexOf(className) > -1) {
            return true;
          }
        }
        return false;
      }
    });
  }(jquery_core, jquery_var_rnotwhite);
  jquery_attributes = function (jQuery) {
    // Return jQuery for attributes-only inclusion
    return jQuery;
  }(jquery_core);
  jquery_manipulation_var_rcheckableType = /^(?:checkbox|radio)$/i;
  jquery_manipulation_var_rtagName = /<([\w:-]+)/;
  jquery_manipulation_var_rscriptType = /^$|\/(?:java|ecma)script/i;
  jquery_manipulation_var_rleadingWhitespace = /^\s+/;
  jquery_manipulation_var_nodeNames = 'abbr|article|aside|audio|bdi|canvas|data|datalist|' + 'details|dialog|figcaption|figure|footer|header|hgroup|main|' + 'mark|meter|nav|output|picture|progress|section|summary|template|time|video';
  jquery_manipulation_createSafeFragment = function (nodeNames) {
    function createSafeFragment(document) {
      var list = nodeNames.split('|'), safeFrag = document.createDocumentFragment();
      if (safeFrag.createElement) {
        while (list.length) {
          safeFrag.createElement(list.pop());
        }
      }
      return safeFrag;
    }
    return createSafeFragment;
  }(jquery_manipulation_var_nodeNames);
  jquery_manipulation_support = function (jQuery, document, support) {
    (function () {
      var div = document.createElement('div'), fragment = document.createDocumentFragment(), input = document.createElement('input');
      // Setup
      div.innerHTML = '  <link/><table></table><a href=\'/a\'>a</a><input type=\'checkbox\'/>';
      // IE strips leading whitespace when .innerHTML is used
      support.leadingWhitespace = div.firstChild.nodeType === 3;
      // Make sure that tbody elements aren't automatically inserted
      // IE will insert them into empty tables
      support.tbody = !div.getElementsByTagName('tbody').length;
      // Make sure that link elements get serialized correctly by innerHTML
      // This requires a wrapper element in IE
      support.htmlSerialize = !!div.getElementsByTagName('link').length;
      // Makes sure cloning an html5 element does not cause problems
      // Where outerHTML is undefined, this still works
      support.html5Clone = document.createElement('nav').cloneNode(true).outerHTML !== '<:nav></:nav>';
      // Check if a disconnected checkbox will retain its checked
      // value of true after appended to the DOM (IE6/7)
      input.type = 'checkbox';
      input.checked = true;
      fragment.appendChild(input);
      support.appendChecked = input.checked;
      // Make sure textarea (and checkbox) defaultValue is properly cloned
      // Support: IE6-IE11+
      div.innerHTML = '<textarea>x</textarea>';
      support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
      // #11217 - WebKit loses check when the name is after the checked attribute
      fragment.appendChild(div);
      // Support: Windows Web Apps (WWA)
      // `name` and `type` must use .setAttribute for WWA (#14901)
      input = document.createElement('input');
      input.setAttribute('type', 'radio');
      input.setAttribute('checked', 'checked');
      input.setAttribute('name', 't');
      div.appendChild(input);
      // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
      // old WebKit doesn't clone checked state correctly in fragments
      support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
      // Support: IE<9
      // Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
      support.noCloneEvent = !!div.addEventListener;
      // Support: IE<9
      // Since attributes and properties are the same in IE,
      // cleanData must set properties to undefined rather than use removeAttribute
      div[jQuery.expando] = 1;
      support.attributes = !div.getAttribute(jQuery.expando);
    }());
    return support;
  }(jquery_core, jquery_var_document, jquery_var_support);
  jquery_manipulation_wrapMap = function (support) {
    // We have to close these tags to support XHTML (#13200)
    var wrapMap = {
      option: [
        1,
        '<select multiple=\'multiple\'>',
        '</select>'
      ],
      legend: [
        1,
        '<fieldset>',
        '</fieldset>'
      ],
      area: [
        1,
        '<map>',
        '</map>'
      ],
      // Support: IE8
      param: [
        1,
        '<object>',
        '</object>'
      ],
      thead: [
        1,
        '<table>',
        '</table>'
      ],
      tr: [
        2,
        '<table><tbody>',
        '</tbody></table>'
      ],
      col: [
        2,
        '<table><tbody></tbody><colgroup>',
        '</colgroup></table>'
      ],
      td: [
        3,
        '<table><tbody><tr>',
        '</tr></tbody></table>'
      ],
      // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
      // unless wrapped in a div with non-breaking characters in front of it.
      _default: support.htmlSerialize ? [
        0,
        '',
        ''
      ] : [
        1,
        'X<div>',
        '</div>'
      ]
    };
    // Support: IE8-IE9
    wrapMap.optgroup = wrapMap.option;
    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;
    return wrapMap;
  }(jquery_manipulation_support);
  jquery_manipulation_getAll = function (jQuery) {
    function getAll(context, tag) {
      var elems, elem, i = 0, found = typeof context.getElementsByTagName !== 'undefined' ? context.getElementsByTagName(tag || '*') : typeof context.querySelectorAll !== 'undefined' ? context.querySelectorAll(tag || '*') : undefined;
      if (!found) {
        for (found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++) {
          if (!tag || jQuery.nodeName(elem, tag)) {
            found.push(elem);
          } else {
            jQuery.merge(found, getAll(elem, tag));
          }
        }
      }
      return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], found) : found;
    }
    return getAll;
  }(jquery_core);
  jquery_manipulation_setGlobalEval = function (jQuery) {
    // Mark scripts as having already been evaluated
    function setGlobalEval(elems, refElements) {
      var elem, i = 0;
      for (; (elem = elems[i]) != null; i++) {
        jQuery._data(elem, 'globalEval', !refElements || jQuery._data(refElements[i], 'globalEval'));
      }
    }
    return setGlobalEval;
  }(jquery_core);
  jquery_manipulation_buildFragment = function (jQuery, rcheckableType, rtagName, rscriptType, rleadingWhitespace, createSafeFragment, wrapMap, getAll, setGlobalEval, support) {
    var rhtml = /<|&#?\w+;/, rtbody = /<tbody/i;
    function fixDefaultChecked(elem) {
      if (rcheckableType.test(elem.type)) {
        elem.defaultChecked = elem.checked;
      }
    }
    function buildFragment(elems, context, scripts, selection, ignored) {
      var j, elem, contains, tmp, tag, tbody, wrap, l = elems.length,
        // Ensure a safe fragment
        safe = createSafeFragment(context), nodes = [], i = 0;
      for (; i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
          // Add nodes directly
          if (jQuery.type(elem) === 'object') {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);  // Convert non-html into a text node
          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem));  // Convert html into DOM nodes
          } else {
            tmp = tmp || safe.appendChild(context.createElement('div'));
            // Deserialize a standard representation
            tag = (rtagName.exec(elem) || [
              '',
              ''
            ])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
            // Descend through wrappers to the right content
            j = wrap[0];
            while (j--) {
              tmp = tmp.lastChild;
            }
            // Manually add leading whitespace removed by IE
            if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
              nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
            }
            // Remove IE's autoinserted <tbody> from table fragments
            if (!support.tbody) {
              // String was a <table>, *may* have spurious <tbody>
              elem = tag === 'table' && !rtbody.test(elem) ? tmp.firstChild : // String was a bare <thead> or <tfoot>
              wrap[1] === '<table>' && !rtbody.test(elem) ? tmp : 0;
              j = elem && elem.childNodes.length;
              while (j--) {
                if (jQuery.nodeName(tbody = elem.childNodes[j], 'tbody') && !tbody.childNodes.length) {
                  elem.removeChild(tbody);
                }
              }
            }
            jQuery.merge(nodes, tmp.childNodes);
            // Fix #12392 for WebKit and IE > 9
            tmp.textContent = '';
            // Fix #12392 for oldIE
            while (tmp.firstChild) {
              tmp.removeChild(tmp.firstChild);
            }
            // Remember the top-level container for proper cleanup
            tmp = safe.lastChild;
          }
        }
      }
      // Fix #11356: Clear elements from fragment
      if (tmp) {
        safe.removeChild(tmp);
      }
      // Reset defaultChecked for any radios and checkboxes
      // about to be appended to the DOM in IE 6/7 (#8060)
      if (!support.appendChecked) {
        jQuery.grep(getAll(nodes, 'input'), fixDefaultChecked);
      }
      i = 0;
      while (elem = nodes[i++]) {
        // Skip elements already in the context collection (trac-4087)
        if (selection && jQuery.inArray(elem, selection) > -1) {
          if (ignored) {
            ignored.push(elem);
          }
          continue;
        }
        contains = jQuery.contains(elem.ownerDocument, elem);
        // Append to fragment
        tmp = getAll(safe.appendChild(elem), 'script');
        // Preserve script evaluation history
        if (contains) {
          setGlobalEval(tmp);
        }
        // Capture executables
        if (scripts) {
          j = 0;
          while (elem = tmp[j++]) {
            if (rscriptType.test(elem.type || '')) {
              scripts.push(elem);
            }
          }
        }
      }
      tmp = null;
      return safe;
    }
    return buildFragment;
  }(jquery_core, jquery_manipulation_var_rcheckableType, jquery_manipulation_var_rtagName, jquery_manipulation_var_rscriptType, jquery_manipulation_var_rleadingWhitespace, jquery_manipulation_createSafeFragment, jquery_manipulation_wrapMap, jquery_manipulation_getAll, jquery_manipulation_setGlobalEval, jquery_manipulation_support);
  jquery_event_support = function (document, support) {
    (function () {
      var i, eventName, div = document.createElement('div');
      // Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
      for (i in {
          submit: true,
          change: true,
          focusin: true
        }) {
        eventName = 'on' + i;
        if (!(support[i] = eventName in window)) {
          // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
          div.setAttribute(eventName, 't');
          support[i] = div.attributes[eventName].expando === false;
        }
      }
      // Null elements to avoid leaks in IE.
      div = null;
    }());
    return support;
  }(jquery_var_document, jquery_var_support);
  jquery_event = function (jQuery, document, rnotwhite, hasOwn, slice, support, acceptData) {
    var rformElems = /^(?:input|select|textarea)$/i, rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
    function returnTrue() {
      return true;
    }
    function returnFalse() {
      return false;
    }
    // Support: IE9
    // See #13393 for more info
    function safeActiveElement() {
      try {
        return document.activeElement;
      } catch (err) {
      }
    }
    function on(elem, types, selector, data, fn, one) {
      var origFn, type;
      // Types can be a map of types/handlers
      if (typeof types === 'object') {
        // ( types-Object, selector, data )
        if (typeof selector !== 'string') {
          // ( types-Object, data )
          data = data || selector;
          selector = undefined;
        }
        for (type in types) {
          on(elem, type, selector, data, types[type], one);
        }
        return elem;
      }
      if (data == null && fn == null) {
        // ( types, fn )
        fn = selector;
        data = selector = undefined;
      } else if (fn == null) {
        if (typeof selector === 'string') {
          // ( types, selector, fn )
          fn = data;
          data = undefined;
        } else {
          // ( types, data, fn )
          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return elem;
      }
      if (one === 1) {
        origFn = fn;
        fn = function (event) {
          // Can use an empty set, since event contains the info
          jQuery().off(event);
          return origFn.apply(this, arguments);
        };
        // Use same guid so caller can remove using origFn
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return elem.each(function () {
        jQuery.event.add(this, types, fn, data, selector);
      });
    }
    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {
      global: {},
      add: function (elem, types, handler, data, selector) {
        var tmp, events, t, handleObjIn, special, eventHandle, handleObj, handlers, type, namespaces, origType, elemData = jQuery._data(elem);
        // Don't attach events to noData or text/comment nodes (but allow plain objects)
        if (!elemData) {
          return;
        }
        // Caller can pass in an object of custom data in lieu of the handler
        if (handler.handler) {
          handleObjIn = handler;
          handler = handleObjIn.handler;
          selector = handleObjIn.selector;
        }
        // Make sure that the handler has a unique ID, used to find/remove it later
        if (!handler.guid) {
          handler.guid = jQuery.guid++;
        }
        // Init the element's event structure and main handler, if this is the first
        if (!(events = elemData.events)) {
          events = elemData.events = {};
        }
        if (!(eventHandle = elemData.handle)) {
          eventHandle = elemData.handle = function (e) {
            // Discard the second event of a jQuery.event.trigger() and
            // when an event is called after a page has unloaded
            return typeof jQuery !== 'undefined' && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
          };
          // Add elem as a property of the handle fn to prevent a memory leak
          // with IE non-native events
          eventHandle.elem = elem;
        }
        // Handle multiple events separated by a space
        types = (types || '').match(rnotwhite) || [''];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type = origType = tmp[1];
          namespaces = (tmp[2] || '').split('.').sort();
          // There *must* be a type, no attaching namespace-only handlers
          if (!type) {
            continue;
          }
          // If event changes its type, use the special event handlers for the changed type
          special = jQuery.event.special[type] || {};
          // If selector defined, determine special event api type, otherwise given type
          type = (selector ? special.delegateType : special.bindType) || type;
          // Update special based on newly reset type
          special = jQuery.event.special[type] || {};
          // handleObj is passed to all event handlers
          handleObj = jQuery.extend({
            type: type,
            origType: origType,
            data: data,
            handler: handler,
            guid: handler.guid,
            selector: selector,
            needsContext: selector && jQuery.expr.match.needsContext.test(selector),
            namespace: namespaces.join('.')
          }, handleObjIn);
          // Init the event handler queue if we're the first
          if (!(handlers = events[type])) {
            handlers = events[type] = [];
            handlers.delegateCount = 0;
            // Only use addEventListener/attachEvent if the special events handler returns false
            if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
              // Bind the global event handler to the element
              if (elem.addEventListener) {
                elem.addEventListener(type, eventHandle, false);
              } else if (elem.attachEvent) {
                elem.attachEvent('on' + type, eventHandle);
              }
            }
          }
          if (special.add) {
            special.add.call(elem, handleObj);
            if (!handleObj.handler.guid) {
              handleObj.handler.guid = handler.guid;
            }
          }
          // Add to the element's handler list, delegates in front
          if (selector) {
            handlers.splice(handlers.delegateCount++, 0, handleObj);
          } else {
            handlers.push(handleObj);
          }
          // Keep track of which events have ever been used, for event optimization
          jQuery.event.global[type] = true;
        }
        // Nullify elem to prevent memory leaks in IE
        elem = null;
      },
      // Detach an event or set of events from an element
      remove: function (elem, types, handler, selector, mappedTypes) {
        var j, handleObj, tmp, origCount, t, events, special, handlers, type, namespaces, origType, elemData = jQuery.hasData(elem) && jQuery._data(elem);
        if (!elemData || !(events = elemData.events)) {
          return;
        }
        // Once for each type.namespace in types; type may be omitted
        types = (types || '').match(rnotwhite) || [''];
        t = types.length;
        while (t--) {
          tmp = rtypenamespace.exec(types[t]) || [];
          type = origType = tmp[1];
          namespaces = (tmp[2] || '').split('.').sort();
          // Unbind all events (on this namespace, if provided) for the element
          if (!type) {
            for (type in events) {
              jQuery.event.remove(elem, type + types[t], handler, selector, true);
            }
            continue;
          }
          special = jQuery.event.special[type] || {};
          type = (selector ? special.delegateType : special.bindType) || type;
          handlers = events[type] || [];
          tmp = tmp[2] && new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)');
          // Remove matching events
          origCount = j = handlers.length;
          while (j--) {
            handleObj = handlers[j];
            if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === '**' && handleObj.selector)) {
              handlers.splice(j, 1);
              if (handleObj.selector) {
                handlers.delegateCount--;
              }
              if (special.remove) {
                special.remove.call(elem, handleObj);
              }
            }
          }
          // Remove generic event handler if we removed something and no more handlers exist
          // (avoids potential for endless recursion during removal of special event handlers)
          if (origCount && !handlers.length) {
            if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
              jQuery.removeEvent(elem, type, elemData.handle);
            }
            delete events[type];
          }
        }
        // Remove the expando if it's no longer used
        if (jQuery.isEmptyObject(events)) {
          delete elemData.handle;
          // removeData also checks for emptiness and clears the expando if empty
          // so use it instead of delete
          jQuery._removeData(elem, 'events');
        }
      },
      trigger: function (event, data, elem, onlyHandlers) {
        var handle, ontype, cur, bubbleType, special, tmp, i, eventPath = [elem || document], type = hasOwn.call(event, 'type') ? event.type : event, namespaces = hasOwn.call(event, 'namespace') ? event.namespace.split('.') : [];
        cur = tmp = elem = elem || document;
        // Don't do events on text and comment nodes
        if (elem.nodeType === 3 || elem.nodeType === 8) {
          return;
        }
        // focus/blur morphs to focusin/out; ensure we're not firing them right now
        if (rfocusMorph.test(type + jQuery.event.triggered)) {
          return;
        }
        if (type.indexOf('.') > -1) {
          // Namespaced trigger; create a regexp to match event type in handle()
          namespaces = type.split('.');
          type = namespaces.shift();
          namespaces.sort();
        }
        ontype = type.indexOf(':') < 0 && 'on' + type;
        // Caller can pass in a jQuery.Event object, Object, or just an event type string
        event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === 'object' && event);
        // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
        event.isTrigger = onlyHandlers ? 2 : 3;
        event.namespace = namespaces.join('.');
        event.rnamespace = event.namespace ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
        // Clean up the event in case it is being reused
        event.result = undefined;
        if (!event.target) {
          event.target = elem;
        }
        // Clone any incoming data and prepend the event, creating the handler arg list
        data = data == null ? [event] : jQuery.makeArray(data, [event]);
        // Allow special events to draw outside the lines
        special = jQuery.event.special[type] || {};
        if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
          return;
        }
        // Determine event propagation path in advance, per W3C events spec (#9951)
        // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
        if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
          bubbleType = special.delegateType || type;
          if (!rfocusMorph.test(bubbleType + type)) {
            cur = cur.parentNode;
          }
          for (; cur; cur = cur.parentNode) {
            eventPath.push(cur);
            tmp = cur;
          }
          // Only add window if we got to document (e.g., not plain obj or detached DOM)
          if (tmp === (elem.ownerDocument || document)) {
            eventPath.push(tmp.defaultView || tmp.parentWindow || window);
          }
        }
        // Fire handlers on the event path
        i = 0;
        while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
          event.type = i > 1 ? bubbleType : special.bindType || type;
          // jQuery handler
          handle = (jQuery._data(cur, 'events') || {})[event.type] && jQuery._data(cur, 'handle');
          if (handle) {
            handle.apply(cur, data);
          }
          // Native handler
          handle = ontype && cur[ontype];
          if (handle && handle.apply && acceptData(cur)) {
            event.result = handle.apply(cur, data);
            if (event.result === false) {
              event.preventDefault();
            }
          }
        }
        event.type = type;
        // If nobody prevented the default action, do it now
        if (!onlyHandlers && !event.isDefaultPrevented()) {
          if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
            // Call a native DOM method on the target with the same name name as the event.
            // Can't use an .isFunction() check here because IE6/7 fails that test.
            // Don't do default actions on window, that's where global variables be (#6170)
            if (ontype && elem[type] && !jQuery.isWindow(elem)) {
              // Don't re-trigger an onFOO event when we call its FOO() method
              tmp = elem[ontype];
              if (tmp) {
                elem[ontype] = null;
              }
              // Prevent re-triggering of the same event, since we already bubbled it above
              jQuery.event.triggered = type;
              try {
                elem[type]();
              } catch (e) {
              }
              jQuery.event.triggered = undefined;
              if (tmp) {
                elem[ontype] = tmp;
              }
            }
          }
        }
        return event.result;
      },
      dispatch: function (event) {
        // Make a writable jQuery.Event from the native event object
        event = jQuery.event.fix(event);
        var i, j, ret, matched, handleObj, handlerQueue = [], args = slice.call(arguments), handlers = (jQuery._data(this, 'events') || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
        // Use the fix-ed jQuery.Event rather than the (read-only) native event
        args[0] = event;
        event.delegateTarget = this;
        // Call the preDispatch hook for the mapped type, and let it bail if desired
        if (special.preDispatch && special.preDispatch.call(this, event) === false) {
          return;
        }
        // Determine handlers
        handlerQueue = jQuery.event.handlers.call(this, event, handlers);
        // Run delegates first; they may want to stop propagation beneath us
        i = 0;
        while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
          event.currentTarget = matched.elem;
          j = 0;
          while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
            // Triggered event must either 1) have no namespace, or 2) have namespace(s)
            // a subset or equal to those in the bound event (both can have no namespace).
            if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {
              event.handleObj = handleObj;
              event.data = handleObj.data;
              ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
              if (ret !== undefined) {
                if ((event.result = ret) === false) {
                  event.preventDefault();
                  event.stopPropagation();
                }
              }
            }
          }
        }
        // Call the postDispatch hook for the mapped type
        if (special.postDispatch) {
          special.postDispatch.call(this, event);
        }
        return event.result;
      },
      handlers: function (event, handlers) {
        var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
        // Support (at least): Chrome, IE9
        // Find delegate handlers
        // Black-hole SVG <use> instance trees (#13180)
        //
        // Support: Firefox<=42+
        // Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
        if (delegateCount && cur.nodeType && (event.type !== 'click' || isNaN(event.button) || event.button < 1)) {
          /* jshint eqeqeq: false */
          for (; cur != this; cur = cur.parentNode || this) {
            /* jshint eqeqeq: true */
            // Don't check non-elements (#13208)
            // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
            if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== 'click')) {
              matches = [];
              for (i = 0; i < delegateCount; i++) {
                handleObj = handlers[i];
                // Don't conflict with Object.prototype properties (#13203)
                sel = handleObj.selector + ' ';
                if (matches[sel] === undefined) {
                  matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                }
                if (matches[sel]) {
                  matches.push(handleObj);
                }
              }
              if (matches.length) {
                handlerQueue.push({
                  elem: cur,
                  handlers: matches
                });
              }
            }
          }
        }
        // Add the remaining (directly-bound) handlers
        if (delegateCount < handlers.length) {
          handlerQueue.push({
            elem: this,
            handlers: handlers.slice(delegateCount)
          });
        }
        return handlerQueue;
      },
      fix: function (event) {
        if (event[jQuery.expando]) {
          return event;
        }
        // Create a writable copy of the event object and normalize some properties
        var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
        if (!fixHook) {
          this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
        }
        copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
        event = new jQuery.Event(originalEvent);
        i = copy.length;
        while (i--) {
          prop = copy[i];
          event[prop] = originalEvent[prop];
        }
        // Support: IE<9
        // Fix target property (#1925)
        if (!event.target) {
          event.target = originalEvent.srcElement || document;
        }
        // Support: Safari 6-8+
        // Target should not be a text node (#504, #13143)
        if (event.target.nodeType === 3) {
          event.target = event.target.parentNode;
        }
        // Support: IE<9
        // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
        event.metaKey = !!event.metaKey;
        return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
      },
      // Includes some event props shared by KeyEvent and MouseEvent
      props: ('altKey bubbles cancelable ctrlKey currentTarget detail eventPhase ' + 'metaKey relatedTarget shiftKey target timeStamp view which').split(' '),
      fixHooks: {},
      keyHooks: {
        props: 'char charCode key keyCode'.split(' '),
        filter: function (event, original) {
          // Add which for key events
          if (event.which == null) {
            event.which = original.charCode != null ? original.charCode : original.keyCode;
          }
          return event;
        }
      },
      mouseHooks: {
        props: ('button buttons clientX clientY fromElement offsetX offsetY ' + 'pageX pageY screenX screenY toElement').split(' '),
        filter: function (event, original) {
          var body, eventDoc, doc, button = original.button, fromElement = original.fromElement;
          // Calculate pageX/Y if missing and clientX/Y available
          if (event.pageX == null && original.clientX != null) {
            eventDoc = event.target.ownerDocument || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;
            event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
          }
          // Add relatedTarget, if necessary
          if (!event.relatedTarget && fromElement) {
            event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
          }
          // Add which for click: 1 === left; 2 === middle; 3 === right
          // Note: button is not normalized, so don't use it
          if (!event.which && button !== undefined) {
            event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
          }
          return event;
        }
      },
      special: {
        load: {
          // Prevent triggered image.load events from bubbling to window.load
          noBubble: true
        },
        focus: {
          // Fire native event if possible so blur/focus sequence is correct
          trigger: function () {
            if (this !== safeActiveElement() && this.focus) {
              try {
                this.focus();
                return false;
              } catch (e) {
              }
            }
          },
          delegateType: 'focusin'
        },
        blur: {
          trigger: function () {
            if (this === safeActiveElement() && this.blur) {
              this.blur();
              return false;
            }
          },
          delegateType: 'focusout'
        },
        click: {
          // For checkbox, fire native event so checked state will be right
          trigger: function () {
            if (jQuery.nodeName(this, 'input') && this.type === 'checkbox' && this.click) {
              this.click();
              return false;
            }
          },
          // For cross-browser consistency, don't fire native .click() on links
          _default: function (event) {
            return jQuery.nodeName(event.target, 'a');
          }
        },
        beforeunload: {
          postDispatch: function (event) {
            // Support: Firefox 20+
            // Firefox doesn't alert if the returnValue field is not set.
            if (event.result !== undefined && event.originalEvent) {
              event.originalEvent.returnValue = event.result;
            }
          }
        }
      },
      // Piggyback on a donor event to simulate a different one
      simulate: function (type, elem, event) {
        var e = jQuery.extend(new jQuery.Event(), event, {
          type: type,
          isSimulated: true  // Previously, `originalEvent: {}` was set here, so stopPropagation call
                // would not be triggered on donor event, since in our own
                // jQuery.event.stopPropagation function we had a check for existence of
                // originalEvent.stopPropagation method, so, consequently it would be a noop.
                //
                // Guard for simulated events was moved to jQuery.event.stopPropagation function
                // since `originalEvent` should point to the original event for the
                // constancy with other events and for more focused logic
        });
        jQuery.event.trigger(e, null, elem);
        if (e.isDefaultPrevented()) {
          event.preventDefault();
        }
      }
    };
    jQuery.removeEvent = document.removeEventListener ? function (elem, type, handle) {
      // This "if" is needed for plain objects
      if (elem.removeEventListener) {
        elem.removeEventListener(type, handle);
      }
    } : function (elem, type, handle) {
      var name = 'on' + type;
      if (elem.detachEvent) {
        // #8545, #7054, preventing memory leaks for custom events in IE6-8
        // detachEvent needed property on element, by name of that event,
        // to properly expose it to GC
        if (typeof elem[name] === 'undefined') {
          elem[name] = null;
        }
        elem.detachEvent(name, handle);
      }
    };
    jQuery.Event = function (src, props) {
      // Allow instantiation without the 'new' keyword
      if (!(this instanceof jQuery.Event)) {
        return new jQuery.Event(src, props);
      }
      // Event object
      if (src && src.type) {
        this.originalEvent = src;
        this.type = src.type;
        // Events bubbling up the document may have been marked as prevented
        // by a handler lower down the tree; reflect the correct value.
        this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined && // Support: IE < 9, Android < 4.0
        src.returnValue === false ? returnTrue : returnFalse;  // Event type
      } else {
        this.type = src;
      }
      // Put explicitly provided properties onto the event object
      if (props) {
        jQuery.extend(this, props);
      }
      // Create a timestamp if incoming event doesn't have one
      this.timeStamp = src && src.timeStamp || jQuery.now();
      // Mark it as fixed
      this[jQuery.expando] = true;
    };
    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
      constructor: jQuery.Event,
      isDefaultPrevented: returnFalse,
      isPropagationStopped: returnFalse,
      isImmediatePropagationStopped: returnFalse,
      preventDefault: function () {
        var e = this.originalEvent;
        this.isDefaultPrevented = returnTrue;
        if (!e) {
          return;
        }
        // If preventDefault exists, run it on the original event
        if (e.preventDefault) {
          e.preventDefault();  // Support: IE
                               // Otherwise set the returnValue property of the original event to false
        } else {
          e.returnValue = false;
        }
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        this.isPropagationStopped = returnTrue;
        if (!e || this.isSimulated) {
          return;
        }
        // If stopPropagation exists, run it on the original event
        if (e.stopPropagation) {
          e.stopPropagation();
        }
        // Support: IE
        // Set the cancelBubble property of the original event to true
        e.cancelBubble = true;
      },
      stopImmediatePropagation: function () {
        var e = this.originalEvent;
        this.isImmediatePropagationStopped = returnTrue;
        if (e && e.stopImmediatePropagation) {
          e.stopImmediatePropagation();
        }
        this.stopPropagation();
      }
    };
    // Create mouseenter/leave events using mouseover/out and event-time checks
    // so that event delegation works in jQuery.
    // Do the same for pointerenter/pointerleave and pointerover/pointerout
    //
    // Support: Safari 7 only
    // Safari sends mouseenter too often; see:
    // https://code.google.com/p/chromium/issues/detail?id=470258
    // for the description of the bug (it existed in older Chrome versions as well).
    jQuery.each({
      mouseenter: 'mouseover',
      mouseleave: 'mouseout',
      pointerenter: 'pointerover',
      pointerleave: 'pointerout'
    }, function (orig, fix) {
      jQuery.event.special[orig] = {
        delegateType: fix,
        bindType: fix,
        handle: function (event) {
          var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
          // For mouseenter/leave call the handler if related is outside the target.
          // NB: No relatedTarget if the mouse left/entered the browser window
          if (!related || related !== target && !jQuery.contains(target, related)) {
            event.type = handleObj.origType;
            ret = handleObj.handler.apply(this, arguments);
            event.type = fix;
          }
          return ret;
        }
      };
    });
    // IE submit delegation
    if (!support.submit) {
      jQuery.event.special.submit = {
        setup: function () {
          // Only need this for delegated form submit events
          if (jQuery.nodeName(this, 'form')) {
            return false;
          }
          // Lazy-add a submit handler when a descendant form may potentially be submitted
          jQuery.event.add(this, 'click._submit keypress._submit', function (e) {
            // Node name check avoids a VML-related crash in IE (#9807)
            var elem = e.target, form = jQuery.nodeName(elem, 'input') || jQuery.nodeName(elem, 'button') ? // Support: IE <=8
              // We use jQuery.prop instead of elem.form
              // to allow fixing the IE8 delegated submit issue (gh-2332)
              // by 3rd party polyfills/workarounds.
              jQuery.prop(elem, 'form') : undefined;
            if (form && !jQuery._data(form, 'submit')) {
              jQuery.event.add(form, 'submit._submit', function (event) {
                event._submitBubble = true;
              });
              jQuery._data(form, 'submit', true);
            }
          });  // return undefined since we don't need an event listener
        },
        postDispatch: function (event) {
          // If form was submitted by the user, bubble the event up the tree
          if (event._submitBubble) {
            delete event._submitBubble;
            if (this.parentNode && !event.isTrigger) {
              jQuery.event.simulate('submit', this.parentNode, event);
            }
          }
        },
        teardown: function () {
          // Only need this for delegated form submit events
          if (jQuery.nodeName(this, 'form')) {
            return false;
          }
          // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
          jQuery.event.remove(this, '._submit');
        }
      };
    }
    // IE change delegation and checkbox/radio fix
    if (!support.change) {
      jQuery.event.special.change = {
        setup: function () {
          if (rformElems.test(this.nodeName)) {
            // IE doesn't fire change on a check/radio until blur; trigger it on click
            // after a propertychange. Eat the blur-change in special.change.handle.
            // This still fires onchange a second time for check/radio after blur.
            if (this.type === 'checkbox' || this.type === 'radio') {
              jQuery.event.add(this, 'propertychange._change', function (event) {
                if (event.originalEvent.propertyName === 'checked') {
                  this._justChanged = true;
                }
              });
              jQuery.event.add(this, 'click._change', function (event) {
                if (this._justChanged && !event.isTrigger) {
                  this._justChanged = false;
                }
                // Allow triggered, simulated change events (#11500)
                jQuery.event.simulate('change', this, event);
              });
            }
            return false;
          }
          // Delegated event; lazy-add a change handler on descendant inputs
          jQuery.event.add(this, 'beforeactivate._change', function (e) {
            var elem = e.target;
            if (rformElems.test(elem.nodeName) && !jQuery._data(elem, 'change')) {
              jQuery.event.add(elem, 'change._change', function (event) {
                if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                  jQuery.event.simulate('change', this.parentNode, event);
                }
              });
              jQuery._data(elem, 'change', true);
            }
          });
        },
        handle: function (event) {
          var elem = event.target;
          // Swallow native change events from checkbox/radio, we already triggered them above
          if (this !== elem || event.isSimulated || event.isTrigger || elem.type !== 'radio' && elem.type !== 'checkbox') {
            return event.handleObj.handler.apply(this, arguments);
          }
        },
        teardown: function () {
          jQuery.event.remove(this, '._change');
          return !rformElems.test(this.nodeName);
        }
      };
    }
    // Support: Firefox
    // Firefox doesn't have focus(in | out) events
    // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    //
    // Support: Chrome, Safari
    // focus(in | out) events fire after focus & blur events,
    // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
    // Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
    if (!support.focusin) {
      jQuery.each({
        focus: 'focusin',
        blur: 'focusout'
      }, function (orig, fix) {
        // Attach a single capturing handler on the document while someone wants focusin/focusout
        var handler = function (event) {
          jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
        };
        jQuery.event.special[fix] = {
          setup: function () {
            var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix);
            if (!attaches) {
              doc.addEventListener(orig, handler, true);
            }
            jQuery._data(doc, fix, (attaches || 0) + 1);
          },
          teardown: function () {
            var doc = this.ownerDocument || this, attaches = jQuery._data(doc, fix) - 1;
            if (!attaches) {
              doc.removeEventListener(orig, handler, true);
              jQuery._removeData(doc, fix);
            } else {
              jQuery._data(doc, fix, attaches);
            }
          }
        };
      });
    }
    jQuery.fn.extend({
      on: function (types, selector, data, fn) {
        return on(this, types, selector, data, fn);
      },
      one: function (types, selector, data, fn) {
        return on(this, types, selector, data, fn, 1);
      },
      off: function (types, selector, fn) {
        var handleObj, type;
        if (types && types.preventDefault && types.handleObj) {
          // ( event )  dispatched jQuery.Event
          handleObj = types.handleObj;
          jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + '.' + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
          return this;
        }
        if (typeof types === 'object') {
          // ( types-object [, selector] )
          for (type in types) {
            this.off(type, selector, types[type]);
          }
          return this;
        }
        if (selector === false || typeof selector === 'function') {
          // ( types [, fn] )
          fn = selector;
          selector = undefined;
        }
        if (fn === false) {
          fn = returnFalse;
        }
        return this.each(function () {
          jQuery.event.remove(this, types, fn, selector);
        });
      },
      trigger: function (type, data) {
        return this.each(function () {
          jQuery.event.trigger(type, data, this);
        });
      },
      triggerHandler: function (type, data) {
        var elem = this[0];
        if (elem) {
          return jQuery.event.trigger(type, data, elem, true);
        }
      }
    });
    return jQuery;
  }(jquery_core, jquery_var_document, jquery_var_rnotwhite, jquery_var_hasOwn, jquery_var_slice, jquery_event_support, jquery_data_var_acceptData);
  jquery_manipulation = function (jQuery, document, concat, push, deletedIds, access, rcheckableType, rtagName, rscriptType, rleadingWhitespace, nodeNames, createSafeFragment, wrapMap, getAll, setGlobalEval, buildFragment, support, acceptData) {
    var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g, rnoshimcache = new RegExp('<(?:' + nodeNames + ')[\\s/>]', 'i'), rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
      // Support: IE 10-11, Edge 10240+
      // In IE/Edge using regex groups here causes severe slowdowns.
      // See https://connect.microsoft.com/IE/feedback/details/1736512/
      rnoInnerhtml = /<script|<style|<link/i,
      // checked="checked" or checked
      rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, safeFragment = createSafeFragment(document), fragmentDiv = safeFragment.appendChild(document.createElement('div'));
    // Support: IE<8
    // Manipulating tables requires a tbody
    function manipulationTarget(elem, content) {
      return jQuery.nodeName(elem, 'table') && jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, 'tr') ? elem.getElementsByTagName('tbody')[0] || elem.appendChild(elem.ownerDocument.createElement('tbody')) : elem;
    }
    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript(elem) {
      elem.type = (jQuery.find.attr(elem, 'type') !== null) + '/' + elem.type;
      return elem;
    }
    function restoreScript(elem) {
      var match = rscriptTypeMasked.exec(elem.type);
      if (match) {
        elem.type = match[1];
      } else {
        elem.removeAttribute('type');
      }
      return elem;
    }
    function cloneCopyEvent(src, dest) {
      if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
        return;
      }
      var type, i, l, oldData = jQuery._data(src), curData = jQuery._data(dest, oldData), events = oldData.events;
      if (events) {
        delete curData.handle;
        curData.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
      // make the cloned public data object a copy from the original
      if (curData.data) {
        curData.data = jQuery.extend({}, curData.data);
      }
    }
    function fixCloneNodeIssues(src, dest) {
      var nodeName, e, data;
      // We do not need to do anything for non-Elements
      if (dest.nodeType !== 1) {
        return;
      }
      nodeName = dest.nodeName.toLowerCase();
      // IE6-8 copies events bound via attachEvent when using cloneNode.
      if (!support.noCloneEvent && dest[jQuery.expando]) {
        data = jQuery._data(dest);
        for (e in data.events) {
          jQuery.removeEvent(dest, e, data.handle);
        }
        // Event data gets referenced instead of copied if the expando gets copied too
        dest.removeAttribute(jQuery.expando);
      }
      // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
      if (nodeName === 'script' && dest.text !== src.text) {
        disableScript(dest).text = src.text;
        restoreScript(dest);  // IE6-10 improperly clones children of object elements using classid.
                              // IE10 throws NoModificationAllowedError if parent is null, #12132.
      } else if (nodeName === 'object') {
        if (dest.parentNode) {
          dest.outerHTML = src.outerHTML;
        }
        // This path appears unavoidable for IE9. When cloning an object
        // element in IE9, the outerHTML strategy above is not sufficient.
        // If the src has innerHTML and the destination does not,
        // copy the src.innerHTML into the dest.innerHTML. #10324
        if (support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
          dest.innerHTML = src.innerHTML;
        }
      } else if (nodeName === 'input' && rcheckableType.test(src.type)) {
        // IE6-8 fails to persist the checked state of a cloned checkbox
        // or radio button. Worse, IE6-7 fail to give the cloned element
        // a checked appearance if the defaultChecked value isn't also set
        dest.defaultChecked = dest.checked = src.checked;
        // IE6-7 get confused and end up setting the value of a cloned
        // checkbox/radio button to an empty string instead of "on"
        if (dest.value !== src.value) {
          dest.value = src.value;
        }  // IE6-8 fails to return the selected option to the default selected
           // state when cloning options
      } else if (nodeName === 'option') {
        dest.defaultSelected = dest.selected = src.defaultSelected;  // IE6-8 fails to set the defaultValue to the correct value when
                                                                     // cloning other types of input fields
      } else if (nodeName === 'input' || nodeName === 'textarea') {
        dest.defaultValue = src.defaultValue;
      }
    }
    function domManip(collection, args, callback, ignored) {
      // Flatten any nested arrays
      args = concat.apply([], args);
      var first, node, hasScripts, scripts, doc, fragment, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
      // We can't cloneNode fragments that contain checked, in WebKit
      if (isFunction || l > 1 && typeof value === 'string' && !support.checkClone && rchecked.test(value)) {
        return collection.each(function (index) {
          var self = collection.eq(index);
          if (isFunction) {
            args[0] = value.call(this, index, self.html());
          }
          domManip(self, args, callback, ignored);
        });
      }
      if (l) {
        fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        // Require either new content or an interest in ignored elements to invoke the callback
        if (first || ignored) {
          scripts = jQuery.map(getAll(fragment, 'script'), disableScript);
          hasScripts = scripts.length;
          // Use the original fragment for the last item
          // instead of the first because it can end up
          // being emptied incorrectly in certain situations (#8070).
          for (; i < l; i++) {
            node = fragment;
            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true);
              // Keep references to cloned scripts for later restoration
              if (hasScripts) {
                // Support: Android<4.1, PhantomJS<2
                // push.apply(_, arraylike) throws on ancient WebKit
                jQuery.merge(scripts, getAll(node, 'script'));
              }
            }
            callback.call(collection[i], node, i);
          }
          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument;
            // Reenable scripts
            jQuery.map(scripts, restoreScript);
            // Evaluate executable scripts on first document insertion
            for (i = 0; i < hasScripts; i++) {
              node = scripts[i];
              if (rscriptType.test(node.type || '') && !jQuery._data(node, 'globalEval') && jQuery.contains(doc, node)) {
                if (node.src) {
                  // Optional AJAX dependency, but won't run scripts if not present
                  if (jQuery._evalUrl) {
                    jQuery._evalUrl(node.src);
                  }
                } else {
                  jQuery.globalEval((node.text || node.textContent || node.innerHTML || '').replace(rcleanScript, ''));
                }
              }
            }
          }
          // Fix #11809: Avoid leaking memory
          fragment = first = null;
        }
      }
      return collection;
    }
    function remove(elem, selector, keepData) {
      var node, elems = selector ? jQuery.filter(selector, elem) : elem, i = 0;
      for (; (node = elems[i]) != null; i++) {
        if (!keepData && node.nodeType === 1) {
          jQuery.cleanData(getAll(node));
        }
        if (node.parentNode) {
          if (keepData && jQuery.contains(node.ownerDocument, node)) {
            setGlobalEval(getAll(node, 'script'));
          }
          node.parentNode.removeChild(node);
        }
      }
      return elem;
    }
    jQuery.extend({
      htmlPrefilter: function (html) {
        return html.replace(rxhtmlTag, '<$1></$2>');
      },
      clone: function (elem, dataAndEvents, deepDataAndEvents) {
        var destElements, node, clone, i, srcElements, inPage = jQuery.contains(elem.ownerDocument, elem);
        if (support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test('<' + elem.nodeName + '>')) {
          clone = elem.cloneNode(true);  // IE<=8 does not properly clone detached, unknown element nodes
        } else {
          fragmentDiv.innerHTML = elem.outerHTML;
          fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
        }
        if ((!support.noCloneEvent || !support.noCloneChecked) && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
          // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
          destElements = getAll(clone);
          srcElements = getAll(elem);
          // Fix all IE cloning issues
          for (i = 0; (node = srcElements[i]) != null; ++i) {
            // Ensure that the destination node is not null; Fixes #9587
            if (destElements[i]) {
              fixCloneNodeIssues(node, destElements[i]);
            }
          }
        }
        // Copy the events from the original to the clone
        if (dataAndEvents) {
          if (deepDataAndEvents) {
            srcElements = srcElements || getAll(elem);
            destElements = destElements || getAll(clone);
            for (i = 0; (node = srcElements[i]) != null; i++) {
              cloneCopyEvent(node, destElements[i]);
            }
          } else {
            cloneCopyEvent(elem, clone);
          }
        }
        // Preserve script evaluation history
        destElements = getAll(clone, 'script');
        if (destElements.length > 0) {
          setGlobalEval(destElements, !inPage && getAll(elem, 'script'));
        }
        destElements = srcElements = node = null;
        // Return the cloned set
        return clone;
      },
      cleanData: function (elems, forceAcceptData) {
        var elem, type, id, data, i = 0, internalKey = jQuery.expando, cache = jQuery.cache, attributes = support.attributes, special = jQuery.event.special;
        for (; (elem = elems[i]) != null; i++) {
          if (forceAcceptData || acceptData(elem)) {
            id = elem[internalKey];
            data = id && cache[id];
            if (data) {
              if (data.events) {
                for (type in data.events) {
                  if (special[type]) {
                    jQuery.event.remove(elem, type);  // This is a shortcut to avoid jQuery.event.remove's overhead
                  } else {
                    jQuery.removeEvent(elem, type, data.handle);
                  }
                }
              }
              // Remove cache only if it was not already removed by jQuery.event.remove
              if (cache[id]) {
                delete cache[id];
                // Support: IE<9
                // IE does not allow us to delete expando properties from nodes
                // IE creates expando attributes along with the property
                // IE does not have a removeAttribute function on Document nodes
                if (!attributes && typeof elem.removeAttribute !== 'undefined') {
                  elem.removeAttribute(internalKey);  // Webkit & Blink performance suffers when deleting properties
                                                      // from DOM nodes, so set to undefined instead
                                                      // https://code.google.com/p/chromium/issues/detail?id=378607
                } else {
                  elem[internalKey] = undefined;
                }
                deletedIds.push(id);
              }
            }
          }
        }
      }
    });
    jQuery.fn.extend({
      // Keep domManip exposed until 3.0 (gh-2225)
      domManip: domManip,
      detach: function (selector) {
        return remove(this, selector, true);
      },
      remove: function (selector) {
        return remove(this, selector);
      },
      text: function (value) {
        return access(this, function (value) {
          return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
        }, null, value, arguments.length);
      },
      append: function () {
        return domManip(this, arguments, function (elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.appendChild(elem);
          }
        });
      },
      prepend: function () {
        return domManip(this, arguments, function (elem) {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            var target = manipulationTarget(this, elem);
            target.insertBefore(elem, target.firstChild);
          }
        });
      },
      before: function () {
        return domManip(this, arguments, function (elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this);
          }
        });
      },
      after: function () {
        return domManip(this, arguments, function (elem) {
          if (this.parentNode) {
            this.parentNode.insertBefore(elem, this.nextSibling);
          }
        });
      },
      empty: function () {
        var elem, i = 0;
        for (; (elem = this[i]) != null; i++) {
          // Remove element nodes and prevent memory leaks
          if (elem.nodeType === 1) {
            jQuery.cleanData(getAll(elem, false));
          }
          // Remove any remaining nodes
          while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
          }
          // If this is a select, ensure that it displays empty (#12336)
          // Support: IE<9
          if (elem.options && jQuery.nodeName(elem, 'select')) {
            elem.options.length = 0;
          }
        }
        return this;
      },
      clone: function (dataAndEvents, deepDataAndEvents) {
        dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
        deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
        return this.map(function () {
          return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
        });
      },
      html: function (value) {
        return access(this, function (value) {
          var elem = this[0] || {}, i = 0, l = this.length;
          if (value === undefined) {
            return elem.nodeType === 1 ? elem.innerHTML.replace(rinlinejQuery, '') : undefined;
          }
          // See if we can take a shortcut and just use innerHTML
          if (typeof value === 'string' && !rnoInnerhtml.test(value) && (support.htmlSerialize || !rnoshimcache.test(value)) && (support.leadingWhitespace || !rleadingWhitespace.test(value)) && !wrapMap[(rtagName.exec(value) || [
              '',
              ''
            ])[1].toLowerCase()]) {
            value = jQuery.htmlPrefilter(value);
            try {
              for (; i < l; i++) {
                // Remove element nodes and prevent memory leaks
                elem = this[i] || {};
                if (elem.nodeType === 1) {
                  jQuery.cleanData(getAll(elem, false));
                  elem.innerHTML = value;
                }
              }
              elem = 0;  // If using innerHTML throws an exception, use the fallback method
            } catch (e) {
            }
          }
          if (elem) {
            this.empty().append(value);
          }
        }, null, value, arguments.length);
      },
      replaceWith: function () {
        var ignored = [];
        // Make the changes, replacing each non-ignored context element with the new content
        return domManip(this, arguments, function (elem) {
          var parent = this.parentNode;
          if (jQuery.inArray(this, ignored) < 0) {
            jQuery.cleanData(getAll(this));
            if (parent) {
              parent.replaceChild(elem, this);
            }
          }  // Force callback invocation
        }, ignored);
      }
    });
    jQuery.each({
      appendTo: 'append',
      prependTo: 'prepend',
      insertBefore: 'before',
      insertAfter: 'after',
      replaceAll: 'replaceWith'
    }, function (name, original) {
      jQuery.fn[name] = function (selector) {
        var elems, i = 0, ret = [], insert = jQuery(selector), last = insert.length - 1;
        for (; i <= last; i++) {
          elems = i === last ? this : this.clone(true);
          jQuery(insert[i])[original](elems);
          // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
          push.apply(ret, elems.get());
        }
        return this.pushStack(ret);
      };
    });
    return jQuery;
  }(jquery_core, jquery_var_document, jquery_var_concat, jquery_var_push, jquery_var_deletedIds, jquery_core_access, jquery_manipulation_var_rcheckableType, jquery_manipulation_var_rtagName, jquery_manipulation_var_rscriptType, jquery_manipulation_var_rleadingWhitespace, jquery_manipulation_var_nodeNames, jquery_manipulation_createSafeFragment, jquery_manipulation_wrapMap, jquery_manipulation_getAll, jquery_manipulation_setGlobalEval, jquery_manipulation_buildFragment, jquery_manipulation_support, jquery_data_var_acceptData);
  jquery_wrap = function (jQuery) {
    jQuery.fn.extend({
      wrapAll: function (html) {
        if (jQuery.isFunction(html)) {
          return this.each(function (i) {
            jQuery(this).wrapAll(html.call(this, i));
          });
        }
        if (this[0]) {
          // The elements to wrap the target around
          var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
          if (this[0].parentNode) {
            wrap.insertBefore(this[0]);
          }
          wrap.map(function () {
            var elem = this;
            while (elem.firstChild && elem.firstChild.nodeType === 1) {
              elem = elem.firstChild;
            }
            return elem;
          }).append(this);
        }
        return this;
      },
      wrapInner: function (html) {
        if (jQuery.isFunction(html)) {
          return this.each(function (i) {
            jQuery(this).wrapInner(html.call(this, i));
          });
        }
        return this.each(function () {
          var self = jQuery(this), contents = self.contents();
          if (contents.length) {
            contents.wrapAll(html);
          } else {
            self.append(html);
          }
        });
      },
      wrap: function (html) {
        var isFunction = jQuery.isFunction(html);
        return this.each(function (i) {
          jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
        });
      },
      unwrap: function () {
        return this.parent().each(function () {
          if (!jQuery.nodeName(this, 'body')) {
            jQuery(this).replaceWith(this.childNodes);
          }
        }).end();
      }
    });
    return jQuery;
  }(jquery_core);
  jquery_var_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  jquery_css_var_rmargin = /^margin/;
  jquery_var_rcssNum = function (pnum) {
    return new RegExp('^(?:([+-])=|)(' + pnum + ')([a-z%]*)$', 'i');
  }(jquery_var_pnum);
  jquery_css_var_rnumnonpx = function (pnum) {
    return new RegExp('^(' + pnum + ')(?!px)[a-z%]+$', 'i');
  }(jquery_var_pnum);
  jquery_css_var_cssExpand = [
    'Top',
    'Right',
    'Bottom',
    'Left'
  ];
  jquery_css_var_isHidden = function (jQuery) {
    return function (elem, el) {
      // isHidden might be called from jQuery#filter function;
      // in that case, element will be second argument
      elem = el || elem;
      return jQuery.css(elem, 'display') === 'none' || !jQuery.contains(elem.ownerDocument, elem);
    };
  }(jquery_core);
  jquery_css_var_swap = function (elem, options, callback, args) {
    var ret, name, old = {};
    // Remember the old values, and insert the new ones
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.apply(elem, args || []);
    // Revert the old values
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  jquery_var_documentElement = function (document) {
    return document.documentElement;
  }(jquery_var_document);
  jquery_css_support = function (jQuery, document, documentElement, support) {
    (function () {
      var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal, reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal, container = document.createElement('div'), div = document.createElement('div');
      // Finish early in limited (non-browser) environments
      if (!div.style) {
        return;
      }
      div.style.cssText = 'float:left;opacity:.5';
      // Support: IE<9
      // Make sure that element opacity exists (as opposed to filter)
      support.opacity = div.style.opacity === '0.5';
      // Verify style float existence
      // (IE uses styleFloat instead of cssFloat)
      support.cssFloat = !!div.style.cssFloat;
      div.style.backgroundClip = 'content-box';
      div.cloneNode(true).style.backgroundClip = '';
      support.clearCloneStyle = div.style.backgroundClip === 'content-box';
      container = document.createElement('div');
      container.style.cssText = 'border:0;width:8px;height:0;top:0;left:-9999px;' + 'padding:0;margin-top:1px;position:absolute';
      div.innerHTML = '';
      container.appendChild(div);
      // Support: Firefox<29, Android 2.3
      // Vendor-prefix box-sizing
      support.boxSizing = div.style.boxSizing === '' || div.style.MozBoxSizing === '' || div.style.WebkitBoxSizing === '';
      jQuery.extend(support, {
        reliableHiddenOffsets: function () {
          if (pixelPositionVal == null) {
            computeStyleTests();
          }
          return reliableHiddenOffsetsVal;
        },
        boxSizingReliable: function () {
          // We're checking for pixelPositionVal here instead of boxSizingReliableVal
          // since that compresses better and they're computed together anyway.
          if (pixelPositionVal == null) {
            computeStyleTests();
          }
          return boxSizingReliableVal;
        },
        pixelMarginRight: function () {
          // Support: Android 4.0-4.3
          if (pixelPositionVal == null) {
            computeStyleTests();
          }
          return pixelMarginRightVal;
        },
        pixelPosition: function () {
          if (pixelPositionVal == null) {
            computeStyleTests();
          }
          return pixelPositionVal;
        },
        reliableMarginRight: function () {
          // Support: Android 2.3
          if (pixelPositionVal == null) {
            computeStyleTests();
          }
          return reliableMarginRightVal;
        },
        reliableMarginLeft: function () {
          // Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
          if (pixelPositionVal == null) {
            computeStyleTests();
          }
          return reliableMarginLeftVal;
        }
      });
      function computeStyleTests() {
        var contents, divStyle, documentElement = document.documentElement;
        // Setup
        documentElement.appendChild(container);
        div.style.cssText = // Support: Android 2.3
        // Vendor-prefix box-sizing
        '-webkit-box-sizing:border-box;box-sizing:border-box;' + 'position:relative;display:block;' + 'margin:auto;border:1px;padding:1px;' + 'top:1%;width:50%';
        // Support: IE<9
        // Assume reasonable values in the absence of getComputedStyle
        pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
        pixelMarginRightVal = reliableMarginRightVal = true;
        // Check for getComputedStyle so that this code is not run in IE<9.
        if (window.getComputedStyle) {
          divStyle = window.getComputedStyle(div);
          pixelPositionVal = (divStyle || {}).top !== '1%';
          reliableMarginLeftVal = (divStyle || {}).marginLeft === '2px';
          boxSizingReliableVal = (divStyle || { width: '4px' }).width === '4px';
          // Support: Android 4.0 - 4.3 only
          // Some styles come back with percentage values, even though they shouldn't
          div.style.marginRight = '50%';
          pixelMarginRightVal = (divStyle || { marginRight: '4px' }).marginRight === '4px';
          // Support: Android 2.3 only
          // Div with explicit width and no margin-right incorrectly
          // gets computed margin-right based on width of container (#3333)
          // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
          contents = div.appendChild(document.createElement('div'));
          // Reset CSS: box-sizing; display; margin; border; padding
          contents.style.cssText = div.style.cssText = // Support: Android 2.3
          // Vendor-prefix box-sizing
          '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;' + 'box-sizing:content-box;display:block;margin:0;border:0;padding:0';
          contents.style.marginRight = contents.style.width = '0';
          div.style.width = '1px';
          reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents) || {}).marginRight);
          div.removeChild(contents);
        }
        // Support: IE6-8
        // First check that getClientRects works as expected
        // Check if table cells still have offsetWidth/Height when they are set
        // to display:none and there are still other visible table cells in a
        // table row; if so, offsetWidth/Height are not reliable for use when
        // determining if an element has been hidden directly using
        // display:none (it is still safe to use offsets if a parent element is
        // hidden; don safety goggles and see bug #4512 for more information).
        div.style.display = 'none';
        reliableHiddenOffsetsVal = div.getClientRects().length === 0;
        if (reliableHiddenOffsetsVal) {
          div.style.display = '';
          div.innerHTML = '<table><tr><td></td><td>t</td></tr></table>';
          div.childNodes[0].style.borderCollapse = 'separate';
          contents = div.getElementsByTagName('td');
          contents[0].style.cssText = 'margin:0;border:0;padding:0;display:none';
          reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
          if (reliableHiddenOffsetsVal) {
            contents[0].style.display = '';
            contents[1].style.display = 'none';
            reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
          }
        }
        // Teardown
        documentElement.removeChild(container);
      }
    }());
    return support;
  }(jquery_core, jquery_var_document, jquery_var_documentElement, jquery_var_support);
  jquery_css_curCSS = function (exports, jQuery, documentElement, rnumnonpx, rmargin, support) {
    var getStyles, curCSS, rposition = /^(top|right|bottom|left)$/;
    if (window.getComputedStyle) {
      getStyles = function (elem) {
        // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
          view = window;
        }
        return view.getComputedStyle(elem);
      };
      curCSS = function (elem, name, computed) {
        var width, minWidth, maxWidth, ret, style = elem.style;
        computed = computed || getStyles(elem);
        // getPropertyValue is only needed for .css('filter') in IE9, see #12537
        ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;
        // Support: Opera 12.1x only
        // Fall back to style even without computed
        // computed is undefined for elems on document fragments
        if ((ret === '' || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
          ret = jQuery.style(elem, name);
        }
        if (computed) {
          // A tribute to the "awesome hack by Dean Edwards"
          // Chrome < 17 and Safari 5.0 uses "computed value"
          // instead of "used value" for margin-right
          // Safari 5.1.7 (at least) returns percentage for a larger set of values,
          // but width seems to be reliably pixels
          // this is against the CSSOM draft spec:
          // http://dev.w3.org/csswg/cssom/#resolved-values
          if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {
            // Remember the original values
            width = style.width;
            minWidth = style.minWidth;
            maxWidth = style.maxWidth;
            // Put in the new values to get a computed value out
            style.minWidth = style.maxWidth = style.width = ret;
            ret = computed.width;
            // Revert the changed values
            style.width = width;
            style.minWidth = minWidth;
            style.maxWidth = maxWidth;
          }
        }
        // Support: IE
        // IE returns zIndex value as an integer.
        return ret === undefined ? ret : ret + '';
      };
    } else if (documentElement.currentStyle) {
      getStyles = function (elem) {
        return elem.currentStyle;
      };
      curCSS = function (elem, name, computed) {
        var left, rs, rsLeft, ret, style = elem.style;
        computed = computed || getStyles(elem);
        ret = computed ? computed[name] : undefined;
        // Avoid setting ret to empty string here
        // so we don't default to auto
        if (ret == null && style && style[name]) {
          ret = style[name];
        }
        // From the awesome hack by Dean Edwards
        // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
        // If we're not dealing with a regular pixel number
        // but a number that has a weird ending, we need to convert it to pixels
        // but not position css attributes, as those are
        // proportional to the parent element instead
        // and we can't measure the parent instead because it
        // might trigger a "stacking dolls" problem
        if (rnumnonpx.test(ret) && !rposition.test(name)) {
          // Remember the original values
          left = style.left;
          rs = elem.runtimeStyle;
          rsLeft = rs && rs.left;
          // Put in the new values to get a computed value out
          if (rsLeft) {
            rs.left = elem.currentStyle.left;
          }
          style.left = name === 'fontSize' ? '1em' : ret;
          ret = style.pixelLeft + 'px';
          // Revert the changed values
          style.left = left;
          if (rsLeft) {
            rs.left = rsLeft;
          }
        }
        // Support: IE
        // IE returns zIndex value as an integer.
        return ret === undefined ? ret : ret + '' || 'auto';
      };
    }
    exports.getStyles = getStyles;
    exports.curCSS = curCSS;
    return exports;
  }(jquery_css_curCSS, jquery_core, jquery_var_documentElement, jquery_css_var_rnumnonpx, jquery_css_var_rmargin, jquery_css_support);
  jquery_css_adjustCSS = function (jQuery, rcssNum) {
    function adjustCSS(elem, prop, valueParts, tween) {
      var adjusted, scale = 1, maxIterations = 20, currentValue = tween ? function () {
          return tween.cur();
        } : function () {
          return jQuery.css(elem, prop, '');
        }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? '' : 'px'),
        // Starting value computation is required for potential unit mismatches
        initialInUnit = (jQuery.cssNumber[prop] || unit !== 'px' && +initial) && rcssNum.exec(jQuery.css(elem, prop));
      if (initialInUnit && initialInUnit[3] !== unit) {
        // Trust units reported by jQuery.css
        unit = unit || initialInUnit[3];
        // Make sure we update the tween properties later on
        valueParts = valueParts || [];
        // Iteratively approximate from a nonzero starting point
        initialInUnit = +initial || 1;
        do {
          // If previous iteration zeroed out, double until we get *something*.
          // Use string for doubling so we don't accidentally see scale as unchanged below
          scale = scale || '.5';
          // Adjust and apply
          initialInUnit = initialInUnit / scale;
          jQuery.style(elem, prop, initialInUnit + unit);  // Update scale, tolerating zero or NaN from tween.cur()
                                                           // Break the loop if scale is unchanged or perfect, or if we've just had enough.
        } while (scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations);
      }
      if (valueParts) {
        initialInUnit = +initialInUnit || +initial || 0;
        // Apply relative offset (+=/-=) if specified
        adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
        if (tween) {
          tween.unit = unit;
          tween.start = initialInUnit;
          tween.end = adjusted;
        }
      }
      return adjusted;
    }
    return adjustCSS;
  }(jquery_core, jquery_var_rcssNum);
  jquery_css_defaultDisplay = function (jQuery, document) {
    var iframe, elemdisplay = {
        // Support: Firefox
        // We have to pre-define these values for FF (#10227)
        HTML: 'block',
        BODY: 'block'
      };
    /**
     * Retrieve the actual display of a element
     * @param {String} name nodeName of the element
     * @param {Object} doc Document object
     */
    // Called only from within defaultDisplay
    function actualDisplay(name, doc) {
      var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = jQuery.css(elem[0], 'display');
      // We don't have any data stored on the element,
      // so use "detach" method as fast way to get rid of the element
      elem.detach();
      return display;
    }
    /**
     * Try to determine the default display value of an element
     * @param {String} nodeName
     */
    function defaultDisplay(nodeName) {
      var doc = document, display = elemdisplay[nodeName];
      if (!display) {
        display = actualDisplay(nodeName, doc);
        // If the simple way fails, read from inside an iframe
        if (display === 'none' || !display) {
          // Use the already-created iframe if possible
          iframe = (iframe || jQuery('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>')).appendTo(doc.documentElement);
          // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
          doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
          // Support: IE
          doc.write();
          doc.close();
          display = actualDisplay(nodeName, doc);
          iframe.detach();
        }
        // Store the correct default display
        elemdisplay[nodeName] = display;
      }
      return display;
    }
    return defaultDisplay;
  }(jquery_core, jquery_var_document);
  jquery_css_addGetHookIf = function () {
    function addGetHookIf(conditionFn, hookFn) {
      // Define the hook, we'll check on the first run if it's really needed.
      return {
        get: function () {
          if (conditionFn()) {
            // Hook not needed (or it's not possible to use it due
            // to missing dependency), remove it.
            delete this.get;
            return;
          }
          // Hook needed; redefine it so that the support test is not executed again.
          return (this.get = hookFn).apply(this, arguments);
        }
      };
    }
    return addGetHookIf;
  }();
  jquery_css = function (jQuery, pnum, access, rmargin, document, rcssNum, rnumnonpx, cssExpand, isHidden, swap, curCSS, adjustCSS, defaultDisplay, addGetHookIf, support) {
    var
      // BuildExclude
      getStyles = curCSS.getStyles, ralpha = /alpha\([^)]*\)/i, ropacity = /opacity\s*=\s*([^)]*)/i,
      // swappable if display is none or starts with table except
      // "table", "table-cell", or "table-caption"
      // see here for display values:
      // https://developer.mozilla.org/en-US/docs/CSS/display
      rdisplayswap = /^(none|table(?!-c[ea]).+)/, rnumsplit = new RegExp('^(' + pnum + ')(.*)$', 'i'), cssShow = {
        position: 'absolute',
        visibility: 'hidden',
        display: 'block'
      }, cssNormalTransform = {
        letterSpacing: '0',
        fontWeight: '400'
      }, cssPrefixes = [
        'Webkit',
        'O',
        'Moz',
        'ms'
      ], emptyStyle = document.createElement('div').style;
    // BuildExclude
    curCSS = curCSS.curCSS;
    // return a css property mapped to a potentially vendor prefixed property
    function vendorPropName(name) {
      // shortcut for names that are not vendor prefixed
      if (name in emptyStyle) {
        return name;
      }
      // check for vendor prefixed names
      var capName = name.charAt(0).toUpperCase() + name.slice(1), i = cssPrefixes.length;
      while (i--) {
        name = cssPrefixes[i] + capName;
        if (name in emptyStyle) {
          return name;
        }
      }
    }
    function showHide(elements, show) {
      var display, elem, hidden, values = [], index = 0, length = elements.length;
      for (; index < length; index++) {
        elem = elements[index];
        if (!elem.style) {
          continue;
        }
        values[index] = jQuery._data(elem, 'olddisplay');
        display = elem.style.display;
        if (show) {
          // Reset the inline display of this element to learn if it is
          // being hidden by cascaded rules or not
          if (!values[index] && display === 'none') {
            elem.style.display = '';
          }
          // Set elements which have been overridden with display: none
          // in a stylesheet to whatever the default browser style is
          // for such an element
          if (elem.style.display === '' && isHidden(elem)) {
            values[index] = jQuery._data(elem, 'olddisplay', defaultDisplay(elem.nodeName));
          }
        } else {
          hidden = isHidden(elem);
          if (display && display !== 'none' || !hidden) {
            jQuery._data(elem, 'olddisplay', hidden ? display : jQuery.css(elem, 'display'));
          }
        }
      }
      // Set the display of most of the elements in a second loop
      // to avoid the constant reflow
      for (index = 0; index < length; index++) {
        elem = elements[index];
        if (!elem.style) {
          continue;
        }
        if (!show || elem.style.display === 'none' || elem.style.display === '') {
          elem.style.display = show ? values[index] || '' : 'none';
        }
      }
      return elements;
    }
    function setPositiveNumber(elem, value, subtract) {
      var matches = rnumsplit.exec(value);
      return matches ? // Guard against undefined "subtract", e.g., when used as in cssHooks
      Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || 'px') : value;
    }
    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
      var i = extra === (isBorderBox ? 'border' : 'content') ? // If we already have the right measurement, avoid augmentation
        4 : // Otherwise initialize for horizontal or vertical properties
        name === 'width' ? 1 : 0, val = 0;
      for (; i < 4; i += 2) {
        // both box models exclude margin, so add it if we want it
        if (extra === 'margin') {
          val += jQuery.css(elem, extra + cssExpand[i], true, styles);
        }
        if (isBorderBox) {
          // border-box includes padding, so remove it if we want content
          if (extra === 'content') {
            val -= jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
          }
          // at this point, extra isn't border nor margin, so remove border
          if (extra !== 'margin') {
            val -= jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
          }
        } else {
          // at this point, extra isn't content, so add padding
          val += jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
          // at this point, extra isn't content nor padding, so add border
          if (extra !== 'padding') {
            val += jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
          }
        }
      }
      return val;
    }
    function getWidthOrHeight(elem, name, extra) {
      // Start with offset property, which is equivalent to the border-box value
      var valueIsBorderBox = true, val = name === 'width' ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';
      // some non-html elements return undefined for offsetWidth, so check for null/undefined
      // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
      // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
      if (val <= 0 || val == null) {
        // Fall back to computed then uncomputed css if necessary
        val = curCSS(elem, name, styles);
        if (val < 0 || val == null) {
          val = elem.style[name];
        }
        // Computed unit is not pixels. Stop here and return.
        if (rnumnonpx.test(val)) {
          return val;
        }
        // we need the check for style in case a browser which returns unreliable values
        // for getComputedStyle silently falls back to the reliable elem.style
        valueIsBorderBox = isBorderBox && (support.boxSizingReliable() || val === elem.style[name]);
        // Normalize "", auto, and prepare for extra
        val = parseFloat(val) || 0;
      }
      // use the active box-sizing model to add/subtract irrelevant styles
      return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? 'border' : 'content'), valueIsBorderBox, styles) + 'px';
    }
    jQuery.extend({
      // Add in style property hooks for overriding the default
      // behavior of getting and setting a style property
      cssHooks: {
        opacity: {
          get: function (elem, computed) {
            if (computed) {
              // We should always get a number back from opacity
              var ret = curCSS(elem, 'opacity');
              return ret === '' ? '1' : ret;
            }
          }
        }
      },
      // Don't automatically add "px" to these possibly-unitless properties
      cssNumber: {
        'animationIterationCount': true,
        'columnCount': true,
        'fillOpacity': true,
        'flexGrow': true,
        'flexShrink': true,
        'fontWeight': true,
        'lineHeight': true,
        'opacity': true,
        'order': true,
        'orphans': true,
        'widows': true,
        'zIndex': true,
        'zoom': true
      },
      // Add in properties whose names you wish to fix before
      // setting or getting the value
      cssProps: {
        // normalize float css property
        'float': support.cssFloat ? 'cssFloat' : 'styleFloat'
      },
      // Get and set the style property on a DOM Node
      style: function (elem, name, value, extra) {
        // Don't set styles on text and comment nodes
        if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
          return;
        }
        // Make sure that we're working with the right name
        var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
        name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
        // gets hook for the prefixed version
        // followed by the unprefixed version
        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
        // Check if we're setting a value
        if (value !== undefined) {
          type = typeof value;
          // Convert "+=" or "-=" to relative numbers (#7345)
          if (type === 'string' && (ret = rcssNum.exec(value)) && ret[1]) {
            value = adjustCSS(elem, name, ret);
            // Fixes bug #9237
            type = 'number';
          }
          // Make sure that null and NaN values aren't set. See: #7116
          if (value == null || value !== value) {
            return;
          }
          // If a number was passed in, add the unit (except for certain CSS properties)
          if (type === 'number') {
            value += ret && ret[3] || (jQuery.cssNumber[origName] ? '' : 'px');
          }
          // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
          // but it would mean to define eight
          // (for every problematic property) identical functions
          if (!support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
            style[name] = 'inherit';
          }
          // If a hook was provided, use that value, otherwise just set the specified value
          if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
            // Support: IE
            // Swallow errors from 'invalid' CSS values (#5509)
            try {
              style[name] = value;
            } catch (e) {
            }
          }
        } else {
          // If a hook was provided get the non-computed value from there
          if (hooks && 'get' in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
            return ret;
          }
          // Otherwise just get the value from the style object
          return style[name];
        }
      },
      css: function (elem, name, extra, styles) {
        var num, val, hooks, origName = jQuery.camelCase(name);
        // Make sure that we're working with the right name
        name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(origName) || origName);
        // gets hook for the prefixed version
        // followed by the unprefixed version
        hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
        // If a hook was provided get the computed value from there
        if (hooks && 'get' in hooks) {
          val = hooks.get(elem, true, extra);
        }
        // Otherwise, if a way to get the computed value exists, use that
        if (val === undefined) {
          val = curCSS(elem, name, styles);
        }
        //convert "normal" to computed value
        if (val === 'normal' && name in cssNormalTransform) {
          val = cssNormalTransform[name];
        }
        // Return, converting to number if forced or a qualifier was provided and val looks numeric
        if (extra === '' || extra) {
          num = parseFloat(val);
          return extra === true || isFinite(num) ? num || 0 : val;
        }
        return val;
      }
    });
    jQuery.each([
      'height',
      'width'
    ], function (i, name) {
      jQuery.cssHooks[name] = {
        get: function (elem, computed, extra) {
          if (computed) {
            // certain elements can have dimension info if we invisibly show them
            // however, it must have a current display style that would benefit from this
            return rdisplayswap.test(jQuery.css(elem, 'display')) && elem.offsetWidth === 0 ? swap(elem, cssShow, function () {
              return getWidthOrHeight(elem, name, extra);
            }) : getWidthOrHeight(elem, name, extra);
          }
        },
        set: function (elem, value, extra) {
          var styles = extra && getStyles(elem);
          return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box', styles) : 0);
        }
      };
    });
    if (!support.opacity) {
      jQuery.cssHooks.opacity = {
        get: function (elem, computed) {
          // IE uses filters for opacity
          return ropacity.test((computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : computed ? '1' : '';
        },
        set: function (elem, value) {
          var style = elem.style, currentStyle = elem.currentStyle, opacity = jQuery.isNumeric(value) ? 'alpha(opacity=' + value * 100 + ')' : '', filter = currentStyle && currentStyle.filter || style.filter || '';
          // IE has trouble with opacity if it does not have layout
          // Force it by setting the zoom level
          style.zoom = 1;
          // if setting opacity to 1, and no other filters exist -
          // attempt to remove filter attribute #6652
          // if value === "", then remove inline opacity #12685
          if ((value >= 1 || value === '') && jQuery.trim(filter.replace(ralpha, '')) === '' && style.removeAttribute) {
            // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
            // if "filter:" is present at all, clearType is disabled, we want to avoid this
            // style.removeAttribute is IE Only, but so apparently is this code path...
            style.removeAttribute('filter');
            // if there is no filter style applied in a css rule
            // or unset inline opacity, we are done
            if (value === '' || currentStyle && !currentStyle.filter) {
              return;
            }
          }
          // otherwise, set new filter values
          style.filter = ralpha.test(filter) ? filter.replace(ralpha, opacity) : filter + ' ' + opacity;
        }
      };
    }
    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight, function (elem, computed) {
      if (computed) {
        return swap(elem, { 'display': 'inline-block' }, curCSS, [
          elem,
          'marginRight'
        ]);
      }
    });
    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
      if (computed) {
        return (parseFloat(curCSS(elem, 'marginLeft')) || (jQuery.contains(elem.ownerDocument, elem) ? elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function () {
          return elem.getBoundingClientRect().left;
        }) : 0)) + 'px';
      }
    });
    // These hooks are used by animate to expand properties
    jQuery.each({
      margin: '',
      padding: '',
      border: 'Width'
    }, function (prefix, suffix) {
      jQuery.cssHooks[prefix + suffix] = {
        expand: function (value) {
          var i = 0, expanded = {},
            // assumes a single number if not a string
            parts = typeof value === 'string' ? value.split(' ') : [value];
          for (; i < 4; i++) {
            expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
          }
          return expanded;
        }
      };
      if (!rmargin.test(prefix)) {
        jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
      }
    });
    jQuery.fn.extend({
      css: function (name, value) {
        return access(this, function (elem, name, value) {
          var styles, len, map = {}, i = 0;
          if (jQuery.isArray(name)) {
            styles = getStyles(elem);
            len = name.length;
            for (; i < len; i++) {
              map[name[i]] = jQuery.css(elem, name[i], false, styles);
            }
            return map;
          }
          return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
        }, name, value, arguments.length > 1);
      },
      show: function () {
        return showHide(this, true);
      },
      hide: function () {
        return showHide(this);
      },
      toggle: function (state) {
        if (typeof state === 'boolean') {
          return state ? this.show() : this.hide();
        }
        return this.each(function () {
          if (isHidden(this)) {
            jQuery(this).show();
          } else {
            jQuery(this).hide();
          }
        });
      }
    });
    return jQuery;
  }(jquery_core, jquery_var_pnum, jquery_core_access, jquery_css_var_rmargin, jquery_var_document, jquery_var_rcssNum, jquery_css_var_rnumnonpx, jquery_css_var_cssExpand, jquery_css_var_isHidden, jquery_css_var_swap, jquery_css_curCSS, jquery_css_adjustCSS, jquery_css_defaultDisplay, jquery_css_addGetHookIf, jquery_css_support);
  jquery_css_hiddenVisibleSelectors = function (jQuery, document, support) {
    function getDisplay(elem) {
      return elem.style && elem.style.display || jQuery.css(elem, 'display');
    }
    function filterHidden(elem) {
      // Disconnected elements are considered hidden
      if (!jQuery.contains(elem.ownerDocument || document, elem)) {
        return true;
      }
      while (elem && elem.nodeType === 1) {
        if (getDisplay(elem) === 'none' || elem.type === 'hidden') {
          return true;
        }
        elem = elem.parentNode;
      }
      return false;
    }
    jQuery.expr.filters.hidden = function (elem) {
      // Support: Opera <= 12.12
      // Opera reports offsetWidths and offsetHeights less than zero on some elements
      return support.reliableHiddenOffsets() ? elem.offsetWidth <= 0 && elem.offsetHeight <= 0 && !elem.getClientRects().length : filterHidden(elem);
    };
    jQuery.expr.filters.visible = function (elem) {
      return !jQuery.expr.filters.hidden(elem);
    };
  }(jquery_core, jquery_var_document, jquery_css_support);
  jquery_serialize = function (jQuery, rcheckableType) {
    var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
    function buildParams(prefix, obj, traditional, add) {
      var name;
      if (jQuery.isArray(obj)) {
        // Serialize array item.
        jQuery.each(obj, function (i, v) {
          if (traditional || rbracket.test(prefix)) {
            // Treat each array item as a scalar.
            add(prefix, v);
          } else {
            // Item is non-scalar (array or object), encode its numeric index.
            buildParams(prefix + '[' + (typeof v === 'object' && v != null ? i : '') + ']', v, traditional, add);
          }
        });
      } else if (!traditional && jQuery.type(obj) === 'object') {
        // Serialize object item.
        for (name in obj) {
          buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
        }
      } else {
        // Serialize scalar item.
        add(prefix, obj);
      }
    }
    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function (a, traditional) {
      var prefix, s = [], add = function (key, value) {
          // If value is a function, invoke it and return its value
          value = jQuery.isFunction(value) ? value() : value == null ? '' : value;
          s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
        };
      // Set traditional to true for jQuery <= 1.3.2 behavior.
      if (traditional === undefined) {
        traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
      }
      // If an array was passed in, assume that it is an array of form elements.
      if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
        // Serialize the form elements
        jQuery.each(a, function () {
          add(this.name, this.value);
        });
      } else {
        // If traditional, encode the "old" way (the way 1.3.2 or older
        // did it), otherwise encode params recursively.
        for (prefix in a) {
          buildParams(prefix, a[prefix], traditional, add);
        }
      }
      // Return the resulting serialization
      return s.join('&').replace(r20, '+');
    };
    jQuery.fn.extend({
      serialize: function () {
        return jQuery.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          // Can add propHook for "elements" to filter or add form elements
          var elements = jQuery.prop(this, 'elements');
          return elements ? jQuery.makeArray(elements) : this;
        }).filter(function () {
          var type = this.type;
          // Use .is(":disabled") so that fieldset[disabled] works
          return this.name && !jQuery(this).is(':disabled') && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
        }).map(function (i, elem) {
          var val = jQuery(this).val();
          return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, '\r\n')
            };
          }) : {
            name: elem.name,
            value: val.replace(rCRLF, '\r\n')
          };
        }).get();
      }
    });
    return jQuery;
  }(jquery_core, jquery_manipulation_var_rcheckableType);
  jquery_ajax_var_location = window.location;
  jquery_ajax_var_nonce = function (jQuery) {
    return jQuery.now();
  }(jquery_core);
  jquery_ajax_var_rquery = /\?/;
  jquery_ajax_parseJSON = function (jQuery) {
    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    jQuery.parseJSON = function (data) {
      // Attempt to parse using the native JSON parser first
      if (window.JSON && window.JSON.parse) {
        // Support: Android 2.3
        // Workaround failure to string-cast null input
        return window.JSON.parse(data + '');
      }
      var requireNonComma, depth = null, str = jQuery.trim(data + '');
      // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
      // after removing valid tokens
      return str && !jQuery.trim(str.replace(rvalidtokens, function (token, comma, open, close) {
        // Force termination if we see a misplaced comma
        if (requireNonComma && comma) {
          depth = 0;
        }
        // Perform no more replacements after returning to outermost depth
        if (depth === 0) {
          return token;
        }
        // Commas must not follow "[", "{", or ","
        requireNonComma = open || comma;
        // Determine new depth
        // array/object open ("[" or "{"): depth += true - false (increment)
        // array/object close ("]" or "}"): depth += false - true (decrement)
        // other cases ("," or primitive): depth += true - true (numeric cast)
        depth += !close - !open;
        // Remove this token
        return '';
      })) ? Function('return ' + str)() : jQuery.error('Invalid JSON: ' + data);
    };
    return jQuery.parseJSON;
  }(jquery_core);
  jquery_ajax_parseXML = function (jQuery) {
    // Cross-browser xml parsing
    jQuery.parseXML = function (data) {
      var xml, tmp;
      if (!data || typeof data !== 'string') {
        return null;
      }
      try {
        if (window.DOMParser) {
          // Standard
          tmp = new window.DOMParser();
          xml = tmp.parseFromString(data, 'text/xml');
        } else {
          // IE
          xml = new window.ActiveXObject('Microsoft.XMLDOM');
          xml.async = 'false';
          xml.loadXML(data);
        }
      } catch (e) {
        xml = undefined;
      }
      if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
        jQuery.error('Invalid XML: ' + data);
      }
      return xml;
    };
    return jQuery.parseXML;
  }(jquery_core);
  jquery_ajax = function (jQuery, document, rnotwhite, location, nonce, rquery) {
    var rhash = /#.*$/, rts = /([?&])_=[^&]*/,
      // IE leaves an \r character at EOL
      rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
      // #7653, #8125, #8152: local protocol detection
      rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
      /* Prefilters
      * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
      * 2) These are called:
      *    - BEFORE asking for a transport
      *    - AFTER param serialization (s.data is a string if s.processData is true)
      * 3) key is the dataType
      * 4) the catchall symbol "*" can be used
      * 5) execution will start with transport dataType and THEN continue down to "*" if needed
      */
      prefilters = {},
      /* Transports bindings
      * 1) key is the dataType
      * 2) the catchall symbol "*" can be used
      * 3) selection will start with transport dataType and THEN go to "*" if needed
      */
      transports = {},
      // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
      allTypes = '*/'.concat('*'),
      // Document location
      ajaxLocation = location.href,
      // Segment location into parts
      ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {
      // dataTypeExpression is optional and defaults to "*"
      return function (dataTypeExpression, func) {
        if (typeof dataTypeExpression !== 'string') {
          func = dataTypeExpression;
          dataTypeExpression = '*';
        }
        var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];
        if (jQuery.isFunction(func)) {
          // For each dataType in the dataTypeExpression
          while (dataType = dataTypes[i++]) {
            // Prepend if requested
            if (dataType.charAt(0) === '+') {
              dataType = dataType.slice(1) || '*';
              (structure[dataType] = structure[dataType] || []).unshift(func);  // Otherwise append
            } else {
              (structure[dataType] = structure[dataType] || []).push(func);
            }
          }
        }
      };
    }
    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
      var inspected = {}, seekingTransport = structure === transports;
      function inspect(dataType) {
        var selected;
        inspected[dataType] = true;
        jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
          var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
          if (typeof dataTypeOrTransport === 'string' && !seekingTransport && !inspected[dataTypeOrTransport]) {
            options.dataTypes.unshift(dataTypeOrTransport);
            inspect(dataTypeOrTransport);
            return false;
          } else if (seekingTransport) {
            return !(selected = dataTypeOrTransport);
          }
        });
        return selected;
      }
      return inspect(options.dataTypes[0]) || !inspected['*'] && inspect('*');
    }
    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes #9887
    function ajaxExtend(target, src) {
      var deep, key, flatOptions = jQuery.ajaxSettings.flatOptions || {};
      for (key in src) {
        if (src[key] !== undefined) {
          (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
        }
      }
      if (deep) {
        jQuery.extend(true, target, deep);
      }
      return target;
    }
    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses(s, jqXHR, responses) {
      var firstDataType, ct, finalDataType, type, contents = s.contents, dataTypes = s.dataTypes;
      // Remove auto dataType and get content-type in the process
      while (dataTypes[0] === '*') {
        dataTypes.shift();
        if (ct === undefined) {
          ct = s.mimeType || jqXHR.getResponseHeader('Content-Type');
        }
      }
      // Check if we're dealing with a known content-type
      if (ct) {
        for (type in contents) {
          if (contents[type] && contents[type].test(ct)) {
            dataTypes.unshift(type);
            break;
          }
        }
      }
      // Check to see if we have a response for the expected dataType
      if (dataTypes[0] in responses) {
        finalDataType = dataTypes[0];
      } else {
        // Try convertible dataTypes
        for (type in responses) {
          if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
            finalDataType = type;
            break;
          }
          if (!firstDataType) {
            firstDataType = type;
          }
        }
        // Or just use first one
        finalDataType = finalDataType || firstDataType;
      }
      // If we found a dataType
      // We add the dataType to the list if needed
      // and return the corresponding response
      if (finalDataType) {
        if (finalDataType !== dataTypes[0]) {
          dataTypes.unshift(finalDataType);
        }
        return responses[finalDataType];
      }
    }
    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert(s, response, jqXHR, isSuccess) {
      var conv2, current, conv, tmp, prev, converters = {},
        // Work with a copy of dataTypes in case we need to modify it for conversion
        dataTypes = s.dataTypes.slice();
      // Create converters map with lowercased keys
      if (dataTypes[1]) {
        for (conv in s.converters) {
          converters[conv.toLowerCase()] = s.converters[conv];
        }
      }
      current = dataTypes.shift();
      // Convert to each sequential dataType
      while (current) {
        if (s.responseFields[current]) {
          jqXHR[s.responseFields[current]] = response;
        }
        // Apply the dataFilter if provided
        if (!prev && isSuccess && s.dataFilter) {
          response = s.dataFilter(response, s.dataType);
        }
        prev = current;
        current = dataTypes.shift();
        if (current) {
          // There's only work to do if current dataType is non-auto
          if (current === '*') {
            current = prev;  // Convert response if prev dataType is non-auto and differs from current
          } else if (prev !== '*' && prev !== current) {
            // Seek a direct converter
            conv = converters[prev + ' ' + current] || converters['* ' + current];
            // If none found, seek a pair
            if (!conv) {
              for (conv2 in converters) {
                // If conv2 outputs current
                tmp = conv2.split(' ');
                if (tmp[1] === current) {
                  // If prev can be converted to accepted input
                  conv = converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]];
                  if (conv) {
                    // Condense equivalence converters
                    if (conv === true) {
                      conv = converters[conv2];  // Otherwise, insert the intermediate dataType
                    } else if (converters[conv2] !== true) {
                      current = tmp[0];
                      dataTypes.unshift(tmp[1]);
                    }
                    break;
                  }
                }
              }
            }
            // Apply converter (if not an equivalence)
            if (conv !== true) {
              // Unless errors are allowed to bubble, catch and return them
              if (conv && s['throws']) {
                // jscs:ignore requireDotNotation
                response = conv(response);
              } else {
                try {
                  response = conv(response);
                } catch (e) {
                  return {
                    state: 'parsererror',
                    error: conv ? e : 'No conversion from ' + prev + ' to ' + current
                  };
                }
              }
            }
          }
        }
      }
      return {
        state: 'success',
        data: response
      };
    }
    jQuery.extend({
      // Counter for holding the number of active queries
      active: 0,
      // Last-Modified header cache for next request
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: ajaxLocation,
        type: 'GET',
        isLocal: rlocalProtocol.test(ajaxLocParts[1]),
        global: true,
        processData: true,
        async: true,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        /*
        timeout: 0,
        data: null,
        dataType: null,
        username: null,
        password: null,
        cache: null,
        throws: false,
        traditional: false,
        headers: {},
        */
        accepts: {
          '*': allTypes,
          text: 'text/plain',
          html: 'text/html',
          xml: 'application/xml, text/xml',
          json: 'application/json, text/javascript'
        },
        contents: {
          xml: /\bxml\b/,
          html: /\bhtml/,
          json: /\bjson\b/
        },
        responseFields: {
          xml: 'responseXML',
          text: 'responseText',
          json: 'responseJSON'
        },
        // Data converters
        // Keys separate source (or catchall "*") and destination types with a single space
        converters: {
          // Convert anything to text
          '* text': String,
          // Text to html (true = no transformation)
          'text html': true,
          // Evaluate text as a json expression
          'text json': jQuery.parseJSON,
          // Parse text as xml
          'text xml': jQuery.parseXML
        },
        // For options that shouldn't be deep extended:
        // you can add your own custom options here if
        // and when you create one that shouldn't be
        // deep extended (see ajaxExtend)
        flatOptions: {
          url: true,
          context: true
        }
      },
      // Creates a full fledged settings object into target
      // with both ajaxSettings and settings fields.
      // If target is omitted, writes into ajaxSettings.
      ajaxSetup: function (target, settings) {
        return settings ? // Building a settings object
        ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : // Extending ajaxSettings
        ajaxExtend(jQuery.ajaxSettings, target);
      },
      ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
      ajaxTransport: addToPrefiltersOrTransports(transports),
      // Main method
      ajax: function (url, options) {
        // If url is an object, simulate pre-1.5 signature
        if (typeof url === 'object') {
          options = url;
          url = undefined;
        }
        // Force options to be an object
        options = options || {};
        var
          // Cross-domain detection vars
          parts,
          // Loop variable
          i,
          // URL without anti-cache param
          cacheURL,
          // Response headers as string
          responseHeadersString,
          // timeout handle
          timeoutTimer,
          // To know if global events are to be dispatched
          fireGlobals, transport,
          // Response headers
          responseHeaders,
          // Create the final options object
          s = jQuery.ajaxSetup({}, options),
          // Callbacks context
          callbackContext = s.context || s,
          // Context for global events is callbackContext if it is a DOM node or jQuery collection
          globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
          // Deferreds
          deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks('once memory'),
          // Status-dependent callbacks
          statusCode = s.statusCode || {},
          // Headers (they are sent all at once)
          requestHeaders = {}, requestHeadersNames = {},
          // The jqXHR state
          state = 0,
          // Default abort message
          strAbort = 'canceled',
          // Fake xhr
          jqXHR = {
            readyState: 0,
            // Builds headers hashtable if needed
            getResponseHeader: function (key) {
              var match;
              if (state === 2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while (match = rheaders.exec(responseHeadersString)) {
                    responseHeaders[match[1].toLowerCase()] = match[2];
                  }
                }
                match = responseHeaders[key.toLowerCase()];
              }
              return match == null ? null : match;
            },
            // Raw string
            getAllResponseHeaders: function () {
              return state === 2 ? responseHeadersString : null;
            },
            // Caches the header
            setRequestHeader: function (name, value) {
              var lname = name.toLowerCase();
              if (!state) {
                name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            // Overrides response content-type header
            overrideMimeType: function (type) {
              if (!state) {
                s.mimeType = type;
              }
              return this;
            },
            // Status-dependent callbacks
            statusCode: function (map) {
              var code;
              if (map) {
                if (state < 2) {
                  for (code in map) {
                    // Lazy-add the new callback in a way that preserves old ones
                    statusCode[code] = [
                      statusCode[code],
                      map[code]
                    ];
                  }
                } else {
                  // Execute the appropriate callbacks
                  jqXHR.always(map[jqXHR.status]);
                }
              }
              return this;
            },
            // Cancel the request
            abort: function (statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
        // Attach deferreds
        deferred.promise(jqXHR).complete = completeDeferred.add;
        jqXHR.success = jqXHR.done;
        jqXHR.error = jqXHR.fail;
        // Remove hash character (#7531: and string promotion)
        // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
        // Handle falsy url in the settings object (#10093: consistency with old signature)
        // We also use the url parameter if available
        s.url = ((url || s.url || ajaxLocation) + '').replace(rhash, '').replace(rprotocol, ajaxLocParts[1] + '//');
        // Alias method option to type as per ticket #12004
        s.type = options.method || options.type || s.method || s.type;
        // Extract dataTypes list
        s.dataTypes = jQuery.trim(s.dataType || '*').toLowerCase().match(rnotwhite) || [''];
        // A cross-domain request is in order when we have a protocol:host:port mismatch
        if (s.crossDomain == null) {
          parts = rurl.exec(s.url.toLowerCase());
          s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === 'http:' ? '80' : '443')) !== (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? '80' : '443'))));
        }
        // Convert data if not already a string
        if (s.data && s.processData && typeof s.data !== 'string') {
          s.data = jQuery.param(s.data, s.traditional);
        }
        // Apply prefilters
        inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
        // If request was aborted inside a prefilter, stop there
        if (state === 2) {
          return jqXHR;
        }
        // We can fire global events as of now if asked to
        // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
        fireGlobals = jQuery.event && s.global;
        // Watch for a new set of requests
        if (fireGlobals && jQuery.active++ === 0) {
          jQuery.event.trigger('ajaxStart');
        }
        // Uppercase the type
        s.type = s.type.toUpperCase();
        // Determine if request has content
        s.hasContent = !rnoContent.test(s.type);
        // Save the URL in case we're toying with the If-Modified-Since
        // and/or If-None-Match header later on
        cacheURL = s.url;
        // More options handling for requests with no content
        if (!s.hasContent) {
          // If data is available, append data to url
          if (s.data) {
            cacheURL = s.url += (rquery.test(cacheURL) ? '&' : '?') + s.data;
            // #9682: remove data so that it's not used in an eventual retry
            delete s.data;
          }
          // Add anti-cache in url if needed
          if (s.cache === false) {
            s.url = rts.test(cacheURL) ? // If there is already a '_' parameter, set its value
            cacheURL.replace(rts, '$1_=' + nonce++) : // Otherwise add one to the end
            cacheURL + (rquery.test(cacheURL) ? '&' : '?') + '_=' + nonce++;
          }
        }
        // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
        if (s.ifModified) {
          if (jQuery.lastModified[cacheURL]) {
            jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[cacheURL]);
          }
          if (jQuery.etag[cacheURL]) {
            jqXHR.setRequestHeader('If-None-Match', jQuery.etag[cacheURL]);
          }
        }
        // Set the correct header, if data is being sent
        if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
          jqXHR.setRequestHeader('Content-Type', s.contentType);
        }
        // Set the Accepts header for the server, depending on the dataType
        jqXHR.setRequestHeader('Accept', s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '') : s.accepts['*']);
        // Check for headers option
        for (i in s.headers) {
          jqXHR.setRequestHeader(i, s.headers[i]);
        }
        // Allow custom headers/mimetypes and early abort
        if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
          // Abort if not done already and return
          return jqXHR.abort();
        }
        // aborting is no longer a cancellation
        strAbort = 'abort';
        // Install callbacks on deferreds
        for (i in {
            success: 1,
            error: 1,
            complete: 1
          }) {
          jqXHR[i](s[i]);
        }
        // Get transport
        transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
        // If no transport, we auto-abort
        if (!transport) {
          done(-1, 'No Transport');
        } else {
          jqXHR.readyState = 1;
          // Send global event
          if (fireGlobals) {
            globalEventContext.trigger('ajaxSend', [
              jqXHR,
              s
            ]);
          }
          // If request was aborted inside ajaxSend, stop there
          if (state === 2) {
            return jqXHR;
          }
          // Timeout
          if (s.async && s.timeout > 0) {
            timeoutTimer = window.setTimeout(function () {
              jqXHR.abort('timeout');
            }, s.timeout);
          }
          try {
            state = 1;
            transport.send(requestHeaders, done);
          } catch (e) {
            if (state < 2) {
              done(-1, e);
            } else {
              throw e;
            }
          }
        }
        // Callback for when everything is done
        function done(status, nativeStatusText, responses, headers) {
          var isSuccess, success, error, response, modified, statusText = nativeStatusText;
          // Called once
          if (state === 2) {
            return;
          }
          // State is "done" now
          state = 2;
          // Clear timeout if it exists
          if (timeoutTimer) {
            window.clearTimeout(timeoutTimer);
          }
          // Dereference transport for early garbage collection
          // (no matter how long the jqXHR object will be used)
          transport = undefined;
          // Cache response headers
          responseHeadersString = headers || '';
          // Set readyState
          jqXHR.readyState = status > 0 ? 4 : 0;
          // Determine if successful
          isSuccess = status >= 200 && status < 300 || status === 304;
          // Get response data
          if (responses) {
            response = ajaxHandleResponses(s, jqXHR, responses);
          }
          // Convert no matter what (that way responseXXX fields are always set)
          response = ajaxConvert(s, response, jqXHR, isSuccess);
          // If successful, handle type chaining
          if (isSuccess) {
            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
              modified = jqXHR.getResponseHeader('Last-Modified');
              if (modified) {
                jQuery.lastModified[cacheURL] = modified;
              }
              modified = jqXHR.getResponseHeader('etag');
              if (modified) {
                jQuery.etag[cacheURL] = modified;
              }
            }
            // if no content
            if (status === 204 || s.type === 'HEAD') {
              statusText = 'nocontent';  // if not modified
            } else if (status === 304) {
              statusText = 'notmodified';  // If we have data, let's convert it
            } else {
              statusText = response.state;
              success = response.data;
              error = response.error;
              isSuccess = !error;
            }
          } else {
            // We extract error from statusText
            // then normalize statusText and status for non-aborts
            error = statusText;
            if (status || !statusText) {
              statusText = 'error';
              if (status < 0) {
                status = 0;
              }
            }
          }
          // Set data for the fake xhr object
          jqXHR.status = status;
          jqXHR.statusText = (nativeStatusText || statusText) + '';
          // Success/Error
          if (isSuccess) {
            deferred.resolveWith(callbackContext, [
              success,
              statusText,
              jqXHR
            ]);
          } else {
            deferred.rejectWith(callbackContext, [
              jqXHR,
              statusText,
              error
            ]);
          }
          // Status-dependent callbacks
          jqXHR.statusCode(statusCode);
          statusCode = undefined;
          if (fireGlobals) {
            globalEventContext.trigger(isSuccess ? 'ajaxSuccess' : 'ajaxError', [
              jqXHR,
              s,
              isSuccess ? success : error
            ]);
          }
          // Complete
          completeDeferred.fireWith(callbackContext, [
            jqXHR,
            statusText
          ]);
          if (fireGlobals) {
            globalEventContext.trigger('ajaxComplete', [
              jqXHR,
              s
            ]);
            // Handle the global AJAX counter
            if (!--jQuery.active) {
              jQuery.event.trigger('ajaxStop');
            }
          }
        }
        return jqXHR;
      },
      getJSON: function (url, data, callback) {
        return jQuery.get(url, data, callback, 'json');
      },
      getScript: function (url, callback) {
        return jQuery.get(url, undefined, callback, 'script');
      }
    });
    jQuery.each([
      'get',
      'post'
    ], function (i, method) {
      jQuery[method] = function (url, data, callback, type) {
        // shift arguments if data argument was omitted
        if (jQuery.isFunction(data)) {
          type = type || callback;
          callback = data;
          data = undefined;
        }
        // The url can be an options object (which then must have .url)
        return jQuery.ajax(jQuery.extend({
          url: url,
          type: method,
          dataType: type,
          data: data,
          success: callback
        }, jQuery.isPlainObject(url) && url));
      };
    });
    return jQuery;
  }(jquery_core, jquery_var_document, jquery_var_rnotwhite, jquery_ajax_var_location, jquery_ajax_var_nonce, jquery_ajax_var_rquery);
  jquery_ajax_xhr = function (jQuery, document, support) {
    // Create the request object
    // (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ? // Support: IE6-IE8
    function () {
      // XHR cannot access local files, always use ActiveX for that case
      if (this.isLocal) {
        return createActiveXHR();
      }
      // Support: IE 9-11
      // IE seems to error on cross-domain PATCH requests when ActiveX XHR
      // is used. In IE 9+ always use the native XHR.
      // Note: this condition won't catch Edge as it doesn't define
      // document.documentMode but it also doesn't support ActiveX so it won't
      // reach this code.
      if (document.documentMode > 8) {
        return createStandardXHR();
      }
      // Support: IE<9
      // oldIE XHR does not support non-RFC2616 methods (#13240)
      // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
      // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
      // Although this check for six methods instead of eight
      // since IE also does not support "trace" and "connect"
      return /^(get|post|head|put|delete|options)$/i.test(this.type) && createStandardXHR() || createActiveXHR();
    } : // For all other browsers, use the standard XMLHttpRequest object
    createStandardXHR;
    var xhrId = 0, xhrCallbacks = {}, xhrSupported = jQuery.ajaxSettings.xhr();
    // Support: IE<10
    // Open requests must be manually aborted on unload (#5280)
    // See https://support.microsoft.com/kb/2856746 for more info
    if (window.attachEvent) {
      window.attachEvent('onunload', function () {
        for (var key in xhrCallbacks) {
          xhrCallbacks[key](undefined, true);
        }
      });
    }
    // Determine support properties
    support.cors = !!xhrSupported && 'withCredentials' in xhrSupported;
    xhrSupported = support.ajax = !!xhrSupported;
    // Create transport if the browser can provide an xhr
    if (xhrSupported) {
      jQuery.ajaxTransport(function (options) {
        // Cross domain only allowed if supported through XMLHttpRequest
        if (!options.crossDomain || support.cors) {
          var callback;
          return {
            send: function (headers, complete) {
              var i, xhr = options.xhr(), id = ++xhrId;
              // Open the socket
              xhr.open(options.type, options.url, options.async, options.username, options.password);
              // Apply custom fields if provided
              if (options.xhrFields) {
                for (i in options.xhrFields) {
                  xhr[i] = options.xhrFields[i];
                }
              }
              // Override mime type if needed
              if (options.mimeType && xhr.overrideMimeType) {
                xhr.overrideMimeType(options.mimeType);
              }
              // X-Requested-With header
              // For cross-domain requests, seeing as conditions for a preflight are
              // akin to a jigsaw puzzle, we simply never set it to be sure.
              // (it can always be set on a per-request basis or even using ajaxSetup)
              // For same-domain requests, won't change header if already provided.
              if (!options.crossDomain && !headers['X-Requested-With']) {
                headers['X-Requested-With'] = 'XMLHttpRequest';
              }
              // Set headers
              for (i in headers) {
                // Support: IE<9
                // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
                // request header to a null-value.
                //
                // To keep consistent with other XHR implementations, cast the value
                // to string and ignore `undefined`.
                if (headers[i] !== undefined) {
                  xhr.setRequestHeader(i, headers[i] + '');
                }
              }
              // Do send the request
              // This may raise an exception which is actually
              // handled in jQuery.ajax (so no try/catch here)
              xhr.send(options.hasContent && options.data || null);
              // Listener
              callback = function (_, isAbort) {
                var status, statusText, responses;
                // Was never called and is aborted or complete
                if (callback && (isAbort || xhr.readyState === 4)) {
                  // Clean up
                  delete xhrCallbacks[id];
                  callback = undefined;
                  xhr.onreadystatechange = jQuery.noop;
                  // Abort manually if needed
                  if (isAbort) {
                    if (xhr.readyState !== 4) {
                      xhr.abort();
                    }
                  } else {
                    responses = {};
                    status = xhr.status;
                    // Support: IE<10
                    // Accessing binary-data responseText throws an exception
                    // (#11426)
                    if (typeof xhr.responseText === 'string') {
                      responses.text = xhr.responseText;
                    }
                    // Firefox throws an exception when accessing
                    // statusText for faulty cross-domain requests
                    try {
                      statusText = xhr.statusText;
                    } catch (e) {
                      statusText = '';
                    }
                    // Filter status for non standard behaviors
                    // If the request is local and we have data: assume a success
                    // (success with no data won't get notified, that's the best we
                    // can do given current implementations)
                    if (!status && options.isLocal && !options.crossDomain) {
                      status = responses.text ? 200 : 404;  // IE - #1450: sometimes returns 1223 when it should be 204
                    } else if (status === 1223) {
                      status = 204;
                    }
                  }
                }
                // Call complete if needed
                if (responses) {
                  complete(status, statusText, responses, xhr.getAllResponseHeaders());
                }
              };
              // Do send the request
              // `xhr.send` may raise an exception, but it will be
              // handled in jQuery.ajax (so no try/catch here)
              if (!options.async) {
                // If we're in sync mode we fire the callback
                callback();
              } else if (xhr.readyState === 4) {
                // (IE6 & IE7) if it's in cache and has been
                // retrieved directly we need to fire the callback
                window.setTimeout(callback);
              } else {
                // Register the callback, but delay it in case `xhr.send` throws
                // Add to the list of active xhr callbacks
                xhr.onreadystatechange = xhrCallbacks[id] = callback;
              }
            },
            abort: function () {
              if (callback) {
                callback(undefined, true);
              }
            }
          };
        }
      });
    }
    // Functions to create xhrs
    function createStandardXHR() {
      try {
        return new window.XMLHttpRequest();
      } catch (e) {
      }
    }
    function createActiveXHR() {
      try {
        return new window.ActiveXObject('Microsoft.XMLHTTP');
      } catch (e) {
      }
    }
  }(jquery_core, jquery_var_document, jquery_var_support);
  jquery_ajax_script = function (jQuery, document) {
    // Install script dataType
    jQuery.ajaxSetup({
      accepts: { script: 'text/javascript, application/javascript, ' + 'application/ecmascript, application/x-ecmascript' },
      contents: { script: /\b(?:java|ecma)script\b/ },
      converters: {
        'text script': function (text) {
          jQuery.globalEval(text);
          return text;
        }
      }
    });
    // Handle cache's special case and global
    jQuery.ajaxPrefilter('script', function (s) {
      if (s.cache === undefined) {
        s.cache = false;
      }
      if (s.crossDomain) {
        s.type = 'GET';
        s.global = false;
      }
    });
    // Bind script tag hack transport
    jQuery.ajaxTransport('script', function (s) {
      // This transport only deals with cross domain requests
      if (s.crossDomain) {
        var script, head = document.head || jQuery('head')[0] || document.documentElement;
        return {
          send: function (_, callback) {
            script = document.createElement('script');
            script.async = true;
            if (s.scriptCharset) {
              script.charset = s.scriptCharset;
            }
            script.src = s.url;
            // Attach handlers for all browsers
            script.onload = script.onreadystatechange = function (_, isAbort) {
              if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                // Remove the script
                if (script.parentNode) {
                  script.parentNode.removeChild(script);
                }
                // Dereference the script
                script = null;
                // Callback if not abort
                if (!isAbort) {
                  callback(200, 'success');
                }
              }
            };
            // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
            // Use native DOM manipulation to avoid our domManip AJAX trickery
            head.insertBefore(script, head.firstChild);
          },
          abort: function () {
            if (script) {
              script.onload(undefined, true);
            }
          }
        };
      }
    });
  }(jquery_core, jquery_var_document);
  jquery_ajax_jsonp = function (jQuery, nonce, rquery) {
    var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
    // Default jsonp settings
    jQuery.ajaxSetup({
      jsonp: 'callback',
      jsonpCallback: function () {
        var callback = oldCallbacks.pop() || jQuery.expando + '_' + nonce++;
        this[callback] = true;
        return callback;
      }
    });
    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
      var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? 'url' : typeof s.data === 'string' && (s.contentType || '').indexOf('application/x-www-form-urlencoded') === 0 && rjsonp.test(s.data) && 'data');
      // Handle iff the expected data type is "jsonp" or we have a parameter to set
      if (jsonProp || s.dataTypes[0] === 'jsonp') {
        // Get callback name, remembering preexisting value associated with it
        callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
        // Insert callback into url or form data
        if (jsonProp) {
          s[jsonProp] = s[jsonProp].replace(rjsonp, '$1' + callbackName);
        } else if (s.jsonp !== false) {
          s.url += (rquery.test(s.url) ? '&' : '?') + s.jsonp + '=' + callbackName;
        }
        // Use data converter to retrieve json after script execution
        s.converters['script json'] = function () {
          if (!responseContainer) {
            jQuery.error(callbackName + ' was not called');
          }
          return responseContainer[0];
        };
        // force json dataType
        s.dataTypes[0] = 'json';
        // Install callback
        overwritten = window[callbackName];
        window[callbackName] = function () {
          responseContainer = arguments;
        };
        // Clean-up function (fires after converters)
        jqXHR.always(function () {
          // If previous value didn't exist - remove it
          if (overwritten === undefined) {
            jQuery(window).removeProp(callbackName);  // Otherwise restore preexisting value
          } else {
            window[callbackName] = overwritten;
          }
          // Save back as free
          if (s[callbackName]) {
            // make sure that re-using the options doesn't screw things around
            s.jsonpCallback = originalSettings.jsonpCallback;
            // save the callback name for future use
            oldCallbacks.push(callbackName);
          }
          // Call if it was a function and we have a response
          if (responseContainer && jQuery.isFunction(overwritten)) {
            overwritten(responseContainer[0]);
          }
          responseContainer = overwritten = undefined;
        });
        // Delegate to script
        return 'script';
      }
    });
  }(jquery_core, jquery_ajax_var_nonce, jquery_ajax_var_rquery);
  jquery_core_parseHTML = function (jQuery, document, rsingleTag, buildFragment) {
    // data: string of html
    // context (optional): If specified, the fragment will be created in this context,
    // defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function (data, context, keepScripts) {
      if (!data || typeof data !== 'string') {
        return null;
      }
      if (typeof context === 'boolean') {
        keepScripts = context;
        context = false;
      }
      context = context || document;
      var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
      // Single tag
      if (parsed) {
        return [context.createElement(parsed[1])];
      }
      parsed = buildFragment([data], context, scripts);
      if (scripts && scripts.length) {
        jQuery(scripts).remove();
      }
      return jQuery.merge([], parsed.childNodes);
    };
    return jQuery.parseHTML;
  }(jquery_core, jquery_var_document, jquery_core_var_rsingleTag, jquery_manipulation_buildFragment);
  jquery_event_alias = function (jQuery) {
    jQuery.each(('blur focus focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select submit keydown keypress keyup error contextmenu').split(' '), function (i, name) {
      // Handle event binding
      jQuery.fn[name] = function (data, fn) {
        return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
      };
    });
    jQuery.fn.extend({
      hover: function (fnOver, fnOut) {
        return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
      }
    });
  }(jquery_core);
  jquery_ajax_load = function (jQuery) {
    // Keep a copy of the old load method
    var _load = jQuery.fn.load;
    /**
     * Load a url into a page
     */
    jQuery.fn.load = function (url, params, callback) {
      if (typeof url !== 'string' && _load) {
        return _load.apply(this, arguments);
      }
      var selector, type, response, self = this, off = url.indexOf(' ');
      if (off > -1) {
        selector = jQuery.trim(url.slice(off, url.length));
        url = url.slice(0, off);
      }
      // If it's a function
      if (jQuery.isFunction(params)) {
        // We assume that it's the callback
        callback = params;
        params = undefined;  // Otherwise, build a param string
      } else if (params && typeof params === 'object') {
        type = 'POST';
      }
      // If we have elements to modify, make the request
      if (self.length > 0) {
        jQuery.ajax({
          url: url,
          // If "type" variable is undefined, then "GET" method will be used.
          // Make value of this field explicit since
          // user can override it through ajaxSetup method
          type: type || 'GET',
          dataType: 'html',
          data: params
        }).done(function (responseText) {
          // Save response for use in complete callback
          response = arguments;
          self.html(selector ? // If a selector was specified, locate the right elements in a dummy div
          // Exclude scripts to avoid IE 'Permission Denied' errors
          jQuery('<div>').append(jQuery.parseHTML(responseText)).find(selector) : // Otherwise use the full result
          responseText);  // If the request succeeds, this function gets "data", "status", "jqXHR"
                          // but they are ignored because response was set above.
                          // If it fails, this function gets "jqXHR", "status", "error"
        }).always(callback && function (jqXHR, status) {
          self.each(function () {
            callback.apply(this, response || [
              jqXHR.responseText,
              status,
              jqXHR
            ]);
          });
        });
      }
      return this;
    };
  }(jquery_core);
  jquery_event_ajax = function (jQuery) {
    // Attach a bunch of functions for handling common AJAX events
    jQuery.each([
      'ajaxStart',
      'ajaxStop',
      'ajaxComplete',
      'ajaxError',
      'ajaxSuccess',
      'ajaxSend'
    ], function (i, type) {
      jQuery.fn[type] = function (fn) {
        return this.on(type, fn);
      };
    });
  }(jquery_core);
  jquery_offset = function (jQuery, access, document, documentElement, rnumnonpx, curCSS, addGetHookIf, support) {
    // BuildExclude
    curCSS = curCSS.curCSS;
    /**
     * Gets a window from an element
     */
    function getWindow(elem) {
      return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 ? elem.defaultView || elem.parentWindow : false;
    }
    jQuery.offset = {
      setOffset: function (elem, options, i) {
        var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, 'position'), curElem = jQuery(elem), props = {};
        // set position first, in-case top/left are set even on static elem
        if (position === 'static') {
          elem.style.position = 'relative';
        }
        curOffset = curElem.offset();
        curCSSTop = jQuery.css(elem, 'top');
        curCSSLeft = jQuery.css(elem, 'left');
        calculatePosition = (position === 'absolute' || position === 'fixed') && jQuery.inArray('auto', [
          curCSSTop,
          curCSSLeft
        ]) > -1;
        // need to be able to calculate position if either top or left
        // is auto and position is either absolute or fixed
        if (calculatePosition) {
          curPosition = curElem.position();
          curTop = curPosition.top;
          curLeft = curPosition.left;
        } else {
          curTop = parseFloat(curCSSTop) || 0;
          curLeft = parseFloat(curCSSLeft) || 0;
        }
        if (jQuery.isFunction(options)) {
          // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
          options = options.call(elem, i, jQuery.extend({}, curOffset));
        }
        if (options.top != null) {
          props.top = options.top - curOffset.top + curTop;
        }
        if (options.left != null) {
          props.left = options.left - curOffset.left + curLeft;
        }
        if ('using' in options) {
          options.using.call(elem, props);
        } else {
          curElem.css(props);
        }
      }
    };
    jQuery.fn.extend({
      offset: function (options) {
        if (arguments.length) {
          return options === undefined ? this : this.each(function (i) {
            jQuery.offset.setOffset(this, options, i);
          });
        }
        var docElem, win, box = {
            top: 0,
            left: 0
          }, elem = this[0], doc = elem && elem.ownerDocument;
        if (!doc) {
          return;
        }
        docElem = doc.documentElement;
        // Make sure it's not a disconnected DOM node
        if (!jQuery.contains(docElem, elem)) {
          return box;
        }
        // If we don't have gBCR, just use 0,0 rather than error
        // BlackBerry 5, iOS 3 (original iPhone)
        if (typeof elem.getBoundingClientRect !== 'undefined') {
          box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
          top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
          left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
        };
      },
      position: function () {
        if (!this[0]) {
          return;
        }
        var offsetParent, offset, parentOffset = {
            top: 0,
            left: 0
          }, elem = this[0];
        // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
        // because it is its only offset parent
        if (jQuery.css(elem, 'position') === 'fixed') {
          // we assume that getBoundingClientRect is available when computed position is fixed
          offset = elem.getBoundingClientRect();
        } else {
          // Get *real* offsetParent
          offsetParent = this.offsetParent();
          // Get correct offsets
          offset = this.offset();
          if (!jQuery.nodeName(offsetParent[0], 'html')) {
            parentOffset = offsetParent.offset();
          }
          // Add offsetParent borders
          parentOffset.top += jQuery.css(offsetParent[0], 'borderTopWidth', true);
          parentOffset.left += jQuery.css(offsetParent[0], 'borderLeftWidth', true);
        }
        // Subtract parent offsets and element margins
        // note: when an element has margin: auto the offsetLeft and marginLeft
        // are the same in Safari causing offset.left to incorrectly be 0
        return {
          top: offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', true),
          left: offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', true)
        };
      },
      offsetParent: function () {
        return this.map(function () {
          var offsetParent = this.offsetParent;
          while (offsetParent && (!jQuery.nodeName(offsetParent, 'html') && jQuery.css(offsetParent, 'position') === 'static')) {
            offsetParent = offsetParent.offsetParent;
          }
          return offsetParent || documentElement;
        });
      }
    });
    // Create scrollLeft and scrollTop methods
    jQuery.each({
      scrollLeft: 'pageXOffset',
      scrollTop: 'pageYOffset'
    }, function (method, prop) {
      var top = /Y/.test(prop);
      jQuery.fn[method] = function (val) {
        return access(this, function (elem, method, val) {
          var win = getWindow(elem);
          if (val === undefined) {
            return win ? prop in win ? win[prop] : win.document.documentElement[method] : elem[method];
          }
          if (win) {
            win.scrollTo(!top ? val : jQuery(win).scrollLeft(), top ? val : jQuery(win).scrollTop());
          } else {
            elem[method] = val;
          }
        }, method, val, arguments.length, null);
      };
    });
    // Support: Safari<7-8+, Chrome<37-44+
    // Add the top/left cssHooks using jQuery.fn.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // getComputedStyle returns percent when specified for top/left/bottom/right
    // rather than make the css module depend on the offset module, we just check for it here
    jQuery.each([
      'top',
      'left'
    ], function (i, prop) {
      jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
        if (computed) {
          computed = curCSS(elem, prop);
          // if curCSS returns percentage, fallback to offset
          return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + 'px' : computed;
        }
      });
    });
    return jQuery;
  }(jquery_core, jquery_core_access, jquery_var_document, jquery_var_documentElement, jquery_css_var_rnumnonpx, jquery_css_curCSS, jquery_css_addGetHookIf, jquery_css_support);
  jquery_dimensions = function (jQuery, access) {
    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each({
      Height: 'height',
      Width: 'width'
    }, function (name, type) {
      jQuery.each({
        padding: 'inner' + name,
        content: type,
        '': 'outer' + name
      }, function (defaultExtra, funcName) {
        // margin is only for outerHeight, outerWidth
        jQuery.fn[funcName] = function (margin, value) {
          var chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean'), extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');
          return access(this, function (elem, type, value) {
            var doc;
            if (jQuery.isWindow(elem)) {
              // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
              // isn't a whole lot we can do. See pull request at this URL for discussion:
              // https://github.com/jquery/jquery/pull/764
              return elem.document.documentElement['client' + name];
            }
            // Get document width or height
            if (elem.nodeType === 9) {
              doc = elem.documentElement;
              // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
              // whichever is greatest
              // unfortunately, this causes bug #3838 in IE6/8 only,
              // but there is currently no good, small way to fix it.
              return Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name]);
            }
            return value === undefined ? // Get width or height on the element, requesting but not forcing parseFloat
            jQuery.css(elem, type, extra) : // Set width or height on the element
            jQuery.style(elem, type, value, extra);
          }, type, chainable ? margin : undefined, chainable, null);
        };
      });
    });
    return jQuery;
  }(jquery_core, jquery_core_access);
  jquery_deprecated = function (jQuery) {
    jQuery.fn.extend({
      bind: function (types, data, fn) {
        return this.on(types, null, data, fn);
      },
      unbind: function (types, fn) {
        return this.off(types, null, fn);
      },
      delegate: function (selector, types, data, fn) {
        return this.on(types, selector, data, fn);
      },
      undelegate: function (selector, types, fn) {
        // ( namespace ) or ( selector, types [, fn] )
        return arguments.length === 1 ? this.off(selector, '**') : this.off(types, selector || '**', fn);
      }
    });
    // The number of elements contained in the matched element set
    jQuery.fn.size = function () {
      return this.length;
    };
    jQuery.fn.andSelf = jQuery.fn.addBack;
  }(jquery_core);
  jquery = function (jQuery) {
    if (!Date.now) {
      Date.now = function now() {
        return new Date().getTime();
      };
    }
    jQuery.ajaxSetup({
      dataType: 'json',
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      cache: false,
      beforeSend: function (xhr, settings) {
        if (settings.params && settings.param) {
          settings.data = settings.params.generateRequestData(settings.param);
        }
      }
    });
    jQuery.fn.ellipsis = function () {
      var height = function (t, el) {
        return t.height() > el.height();
      };
      var width = function (t, el) {
        return t.width() > el.width();
      };
      var wordwrap = function (str, width) {
        return str;  // width = (width ? width : 75);
                     // if (!str) { return str; }
                     // var regex = '.{1,' +width+ '}(\s|$)|.{' +width+ '}|.+$';
                     //
                     // return str.match(RegExp(regex, 'g')).join(' ');
      };
      return this.each(function () {
        var el = jQuery(this);
        if (el.css('overflow') === 'hidden') {
          var text = wordwrap(el.html(), Math.floor(el.width() / (parseInt(el.css('font-size')) / 1.91)));
          var multiline = el.hasClass('multiline');
          var t = jQuery(this.cloneNode(true)).hide().css('position', 'absolute').css('overflow', 'visible').width(multiline ? el.width() : 'auto').height(multiline ? 'auto' : el.height());
          var func = multiline ? height : width;
          t.html(text);
          while (text.length > 0 && func(t, el)) {
            text = text.substr(0, text.length - 1);
            t.html(text + '...');
          }
          el.html(t.html());
          t.remove();
        }
      });
    };
    return jQuery;
  }(jquery_core);
  //     Underscore.js 1.8.3
  //     http://underscorejs.org
  //     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
  //     Underscore may be freely distributed under the MIT license.
  (function () {
    // Baseline setup
    // --------------
    // Establish the root object, `window` in the browser, or `exports` on the server.
    var root = this;
    // Save the previous value of the `_` variable.
    var previousUnderscore = root._;
    // Save bytes in the minified (but not gzipped) version:
    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
    // Create quick reference variables for speed access to core prototypes.
    var push = ArrayProto.push, slice = ArrayProto.slice, toString = ObjProto.toString, hasOwnProperty = ObjProto.hasOwnProperty;
    // All **ECMAScript 5** native function implementations that we hope to use
    // are declared here.
    var nativeIsArray = Array.isArray, nativeKeys = Object.keys, nativeBind = FuncProto.bind, nativeCreate = Object.create;
    // Naked function reference for surrogate-prototype-swapping.
    var Ctor = function () {
    };
    // Create a safe reference to the Underscore object for use below.
    var _ = function (obj) {
      if (obj instanceof _)
        return obj;
      if (!(this instanceof _))
        return new _(obj);
      this._wrapped = obj;
    };
    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `_` as a global object.
    if (typeof exports !== 'undefined') {
      if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = _;
      }
      exports._ = _;
    } else {
      root._ = _;
    }
    // Current version.
    _.VERSION = '1.8.3';
    // Internal function that returns an efficient (for current engines) version
    // of the passed-in callback, to be repeatedly applied in other Underscore
    // functions.
    var optimizeCb = function (func, context, argCount) {
      if (context === void 0)
        return func;
      switch (argCount == null ? 3 : argCount) {
      case 1:
        return function (value) {
          return func.call(context, value);
        };
      case 2:
        return function (value, other) {
          return func.call(context, value, other);
        };
      case 3:
        return function (value, index, collection) {
          return func.call(context, value, index, collection);
        };
      case 4:
        return function (accumulator, value, index, collection) {
          return func.call(context, accumulator, value, index, collection);
        };
      }
      return function () {
        return func.apply(context, arguments);
      };
    };
    // A mostly-internal function to generate callbacks that can be applied
    // to each element in a collection, returning the desired result — either
    // identity, an arbitrary callback, a property matcher, or a property accessor.
    var cb = function (value, context, argCount) {
      if (value == null)
        return _.identity;
      if (_.isFunction(value))
        return optimizeCb(value, context, argCount);
      if (_.isObject(value))
        return _.matcher(value);
      return _.property(value);
    };
    _.iteratee = function (value, context) {
      return cb(value, context, Infinity);
    };
    // An internal function for creating assigner functions.
    var createAssigner = function (keysFunc, undefinedOnly) {
      return function (obj) {
        var length = arguments.length;
        if (length < 2 || obj == null)
          return obj;
        for (var index = 1; index < length; index++) {
          var source = arguments[index], keys = keysFunc(source), l = keys.length;
          for (var i = 0; i < l; i++) {
            var key = keys[i];
            if (!undefinedOnly || obj[key] === void 0)
              obj[key] = source[key];
          }
        }
        return obj;
      };
    };
    // An internal function for creating a new object that inherits from another.
    var baseCreate = function (prototype) {
      if (!_.isObject(prototype))
        return {};
      if (nativeCreate)
        return nativeCreate(prototype);
      Ctor.prototype = prototype;
      var result = new Ctor();
      Ctor.prototype = null;
      return result;
    };
    var property = function (key) {
      return function (obj) {
        return obj == null ? void 0 : obj[key];
      };
    };
    // Helper for collection methods to determine whether a collection
    // should be iterated as an array or as an object
    // Related: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
    // Avoids a very nasty iOS 8 JIT bug on ARM-64. #2094
    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var getLength = property('length');
    var isArrayLike = function (collection) {
      var length = getLength(collection);
      return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
    };
    // Collection Functions
    // --------------------
    // The cornerstone, an `each` implementation, aka `forEach`.
    // Handles raw objects in addition to array-likes. Treats all
    // sparse array-likes as if they were dense.
    _.each = _.forEach = function (obj, iteratee, context) {
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
    // Return the results of applying the iteratee to each element.
    _.map = _.collect = function (obj, iteratee, context) {
      iteratee = cb(iteratee, context);
      var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, results = Array(length);
      for (var index = 0; index < length; index++) {
        var currentKey = keys ? keys[index] : index;
        results[index] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
    };
    // Create a reducing function iterating left or right.
    function createReduce(dir) {
      // Optimized iterator function as using arguments.length
      // in the main function will deoptimize the, see #1991.
      function iterator(obj, iteratee, memo, keys, index, length) {
        for (; index >= 0 && index < length; index += dir) {
          var currentKey = keys ? keys[index] : index;
          memo = iteratee(memo, obj[currentKey], currentKey, obj);
        }
        return memo;
      }
      return function (obj, iteratee, memo, context) {
        iteratee = optimizeCb(iteratee, context, 4);
        var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length, index = dir > 0 ? 0 : length - 1;
        // Determine the initial value if none is provided.
        if (arguments.length < 3) {
          memo = obj[keys ? keys[index] : index];
          index += dir;
        }
        return iterator(obj, iteratee, memo, keys, index, length);
      };
    }
    // **Reduce** builds up a single result from a list of values, aka `inject`,
    // or `foldl`.
    _.reduce = _.foldl = _.inject = createReduce(1);
    // The right-associative version of reduce, also known as `foldr`.
    _.reduceRight = _.foldr = createReduce(-1);
    // Return the first value which passes a truth test. Aliased as `detect`.
    _.find = _.detect = function (obj, predicate, context) {
      var key;
      if (isArrayLike(obj)) {
        key = _.findIndex(obj, predicate, context);
      } else {
        key = _.findKey(obj, predicate, context);
      }
      if (key !== void 0 && key !== -1)
        return obj[key];
    };
    // Return all the elements that pass a truth test.
    // Aliased as `select`.
    _.filter = _.select = function (obj, predicate, context) {
      var results = [];
      predicate = cb(predicate, context);
      _.each(obj, function (value, index, list) {
        if (predicate(value, index, list))
          results.push(value);
      });
      return results;
    };
    // Return all the elements for which a truth test fails.
    _.reject = function (obj, predicate, context) {
      return _.filter(obj, _.negate(cb(predicate)), context);
    };
    // Determine whether all of the elements match a truth test.
    // Aliased as `all`.
    _.every = _.all = function (obj, predicate, context) {
      predicate = cb(predicate, context);
      var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length;
      for (var index = 0; index < length; index++) {
        var currentKey = keys ? keys[index] : index;
        if (!predicate(obj[currentKey], currentKey, obj))
          return false;
      }
      return true;
    };
    // Determine if at least one element in the object matches a truth test.
    // Aliased as `any`.
    _.some = _.any = function (obj, predicate, context) {
      predicate = cb(predicate, context);
      var keys = !isArrayLike(obj) && _.keys(obj), length = (keys || obj).length;
      for (var index = 0; index < length; index++) {
        var currentKey = keys ? keys[index] : index;
        if (predicate(obj[currentKey], currentKey, obj))
          return true;
      }
      return false;
    };
    // Determine if the array or object contains a given item (using `===`).
    // Aliased as `includes` and `include`.
    _.contains = _.includes = _.include = function (obj, item, fromIndex, guard) {
      if (!isArrayLike(obj))
        obj = _.values(obj);
      if (typeof fromIndex != 'number' || guard)
        fromIndex = 0;
      return _.indexOf(obj, item, fromIndex) >= 0;
    };
    // Invoke a method (with arguments) on every item in a collection.
    _.invoke = function (obj, method) {
      var args = slice.call(arguments, 2);
      var isFunc = _.isFunction(method);
      return _.map(obj, function (value) {
        var func = isFunc ? method : value[method];
        return func == null ? func : func.apply(value, args);
      });
    };
    // Convenience version of a common use case of `map`: fetching a property.
    _.pluck = function (obj, key) {
      return _.map(obj, _.property(key));
    };
    // Convenience version of a common use case of `filter`: selecting only objects
    // containing specific `key:value` pairs.
    _.where = function (obj, attrs) {
      return _.filter(obj, _.matcher(attrs));
    };
    // Convenience version of a common use case of `find`: getting the first object
    // containing specific `key:value` pairs.
    _.findWhere = function (obj, attrs) {
      return _.find(obj, _.matcher(attrs));
    };
    // Return the maximum element (or element-based computation).
    _.max = function (obj, iteratee, context) {
      var result = -Infinity, lastComputed = -Infinity, value, computed;
      if (iteratee == null && obj != null) {
        obj = isArrayLike(obj) ? obj : _.values(obj);
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value > result) {
            result = value;
          }
        }
      } else {
        iteratee = cb(iteratee, context);
        _.each(obj, function (value, index, list) {
          computed = iteratee(value, index, list);
          if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
            result = value;
            lastComputed = computed;
          }
        });
      }
      return result;
    };
    // Return the minimum element (or element-based computation).
    _.min = function (obj, iteratee, context) {
      var result = Infinity, lastComputed = Infinity, value, computed;
      if (iteratee == null && obj != null) {
        obj = isArrayLike(obj) ? obj : _.values(obj);
        for (var i = 0, length = obj.length; i < length; i++) {
          value = obj[i];
          if (value < result) {
            result = value;
          }
        }
      } else {
        iteratee = cb(iteratee, context);
        _.each(obj, function (value, index, list) {
          computed = iteratee(value, index, list);
          if (computed < lastComputed || computed === Infinity && result === Infinity) {
            result = value;
            lastComputed = computed;
          }
        });
      }
      return result;
    };
    // Shuffle a collection, using the modern version of the
    // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
    _.shuffle = function (obj) {
      var set = isArrayLike(obj) ? obj : _.values(obj);
      var length = set.length;
      var shuffled = Array(length);
      for (var index = 0, rand; index < length; index++) {
        rand = _.random(0, index);
        if (rand !== index)
          shuffled[index] = shuffled[rand];
        shuffled[rand] = set[index];
      }
      return shuffled;
    };
    // Sample **n** random values from a collection.
    // If **n** is not specified, returns a single random element.
    // The internal `guard` argument allows it to work with `map`.
    _.sample = function (obj, n, guard) {
      if (n == null || guard) {
        if (!isArrayLike(obj))
          obj = _.values(obj);
        return obj[_.random(obj.length - 1)];
      }
      return _.shuffle(obj).slice(0, Math.max(0, n));
    };
    // Sort the object's values by a criterion produced by an iteratee.
    _.sortBy = function (obj, iteratee, context) {
      iteratee = cb(iteratee, context);
      return _.pluck(_.map(obj, function (value, index, list) {
        return {
          value: value,
          index: index,
          criteria: iteratee(value, index, list)
        };
      }).sort(function (left, right) {
        var a = left.criteria;
        var b = right.criteria;
        if (a !== b) {
          if (a > b || a === void 0)
            return 1;
          if (a < b || b === void 0)
            return -1;
        }
        return left.index - right.index;
      }), 'value');
    };
    // An internal function used for aggregate "group by" operations.
    var group = function (behavior) {
      return function (obj, iteratee, context) {
        var result = {};
        iteratee = cb(iteratee, context);
        _.each(obj, function (value, index) {
          var key = iteratee(value, index, obj);
          behavior(result, value, key);
        });
        return result;
      };
    };
    // Groups the object's values by a criterion. Pass either a string attribute
    // to group by, or a function that returns the criterion.
    _.groupBy = group(function (result, value, key) {
      if (_.has(result, key))
        result[key].push(value);
      else
        result[key] = [value];
    });
    // Indexes the object's values by a criterion, similar to `groupBy`, but for
    // when you know that your index values will be unique.
    _.indexBy = group(function (result, value, key) {
      result[key] = value;
    });
    // Counts instances of an object that group by a certain criterion. Pass
    // either a string attribute to count by, or a function that returns the
    // criterion.
    _.countBy = group(function (result, value, key) {
      if (_.has(result, key))
        result[key]++;
      else
        result[key] = 1;
    });
    // Safely create a real, live array from anything iterable.
    _.toArray = function (obj) {
      if (!obj)
        return [];
      if (_.isArray(obj))
        return slice.call(obj);
      if (isArrayLike(obj))
        return _.map(obj, _.identity);
      return _.values(obj);
    };
    // Return the number of elements in an object.
    _.size = function (obj) {
      if (obj == null)
        return 0;
      return isArrayLike(obj) ? obj.length : _.keys(obj).length;
    };
    // Split a collection into two arrays: one whose elements all satisfy the given
    // predicate, and one whose elements all do not satisfy the predicate.
    _.partition = function (obj, predicate, context) {
      predicate = cb(predicate, context);
      var pass = [], fail = [];
      _.each(obj, function (value, key, obj) {
        (predicate(value, key, obj) ? pass : fail).push(value);
      });
      return [
        pass,
        fail
      ];
    };
    // Array Functions
    // ---------------
    // Get the first element of an array. Passing **n** will return the first N
    // values in the array. Aliased as `head` and `take`. The **guard** check
    // allows it to work with `_.map`.
    _.first = _.head = _.take = function (array, n, guard) {
      if (array == null)
        return void 0;
      if (n == null || guard)
        return array[0];
      return _.initial(array, array.length - n);
    };
    // Returns everything but the last entry of the array. Especially useful on
    // the arguments object. Passing **n** will return all the values in
    // the array, excluding the last N.
    _.initial = function (array, n, guard) {
      return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
    };
    // Get the last element of an array. Passing **n** will return the last N
    // values in the array.
    _.last = function (array, n, guard) {
      if (array == null)
        return void 0;
      if (n == null || guard)
        return array[array.length - 1];
      return _.rest(array, Math.max(0, array.length - n));
    };
    // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
    // Especially useful on the arguments object. Passing an **n** will return
    // the rest N values in the array.
    _.rest = _.tail = _.drop = function (array, n, guard) {
      return slice.call(array, n == null || guard ? 1 : n);
    };
    // Trim out all falsy values from an array.
    _.compact = function (array) {
      return _.filter(array, _.identity);
    };
    // Internal implementation of a recursive `flatten` function.
    var flatten = function (input, shallow, strict, startIndex) {
      var output = [], idx = 0;
      for (var i = startIndex || 0, length = getLength(input); i < length; i++) {
        var value = input[i];
        if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
          //flatten current level of array or arguments object
          if (!shallow)
            value = flatten(value, shallow, strict);
          var j = 0, len = value.length;
          output.length += len;
          while (j < len) {
            output[idx++] = value[j++];
          }
        } else if (!strict) {
          output[idx++] = value;
        }
      }
      return output;
    };
    // Flatten out an array, either recursively (by default), or just one level.
    _.flatten = function (array, shallow) {
      return flatten(array, shallow, false);
    };
    // Return a version of the array that does not contain the specified value(s).
    _.without = function (array) {
      return _.difference(array, slice.call(arguments, 1));
    };
    // Produce a duplicate-free version of the array. If the array has already
    // been sorted, you have the option of using a faster algorithm.
    // Aliased as `unique`.
    _.uniq = _.unique = function (array, isSorted, iteratee, context) {
      if (!_.isBoolean(isSorted)) {
        context = iteratee;
        iteratee = isSorted;
        isSorted = false;
      }
      if (iteratee != null)
        iteratee = cb(iteratee, context);
      var result = [];
      var seen = [];
      for (var i = 0, length = getLength(array); i < length; i++) {
        var value = array[i], computed = iteratee ? iteratee(value, i, array) : value;
        if (isSorted) {
          if (!i || seen !== computed)
            result.push(value);
          seen = computed;
        } else if (iteratee) {
          if (!_.contains(seen, computed)) {
            seen.push(computed);
            result.push(value);
          }
        } else if (!_.contains(result, value)) {
          result.push(value);
        }
      }
      return result;
    };
    // Produce an array that contains the union: each distinct element from all of
    // the passed-in arrays.
    _.union = function () {
      return _.uniq(flatten(arguments, true, true));
    };
    // Produce an array that contains every item shared between all the
    // passed-in arrays.
    _.intersection = function (array) {
      var result = [];
      var argsLength = arguments.length;
      for (var i = 0, length = getLength(array); i < length; i++) {
        var item = array[i];
        if (_.contains(result, item))
          continue;
        for (var j = 1; j < argsLength; j++) {
          if (!_.contains(arguments[j], item))
            break;
        }
        if (j === argsLength)
          result.push(item);
      }
      return result;
    };
    // Take the difference between one array and a number of other arrays.
    // Only the elements present in just the first array will remain.
    _.difference = function (array) {
      var rest = flatten(arguments, true, true, 1);
      return _.filter(array, function (value) {
        return !_.contains(rest, value);
      });
    };
    // Zip together multiple lists into a single array -- elements that share
    // an index go together.
    _.zip = function () {
      return _.unzip(arguments);
    };
    // Complement of _.zip. Unzip accepts an array of arrays and groups
    // each array's elements on shared indices
    _.unzip = function (array) {
      var length = array && _.max(array, getLength).length || 0;
      var result = Array(length);
      for (var index = 0; index < length; index++) {
        result[index] = _.pluck(array, index);
      }
      return result;
    };
    // Converts lists into objects. Pass either a single array of `[key, value]`
    // pairs, or two parallel arrays of the same length -- one of keys, and one of
    // the corresponding values.
    _.object = function (list, values) {
      var result = {};
      for (var i = 0, length = getLength(list); i < length; i++) {
        if (values) {
          result[list[i]] = values[i];
        } else {
          result[list[i][0]] = list[i][1];
        }
      }
      return result;
    };
    // Generator function to create the findIndex and findLastIndex functions
    function createPredicateIndexFinder(dir) {
      return function (array, predicate, context) {
        predicate = cb(predicate, context);
        var length = getLength(array);
        var index = dir > 0 ? 0 : length - 1;
        for (; index >= 0 && index < length; index += dir) {
          if (predicate(array[index], index, array))
            return index;
        }
        return -1;
      };
    }
    // Returns the first index on an array-like that passes a predicate test
    _.findIndex = createPredicateIndexFinder(1);
    _.findLastIndex = createPredicateIndexFinder(-1);
    // Use a comparator function to figure out the smallest index at which
    // an object should be inserted so as to maintain order. Uses binary search.
    _.sortedIndex = function (array, obj, iteratee, context) {
      iteratee = cb(iteratee, context, 1);
      var value = iteratee(obj);
      var low = 0, high = getLength(array);
      while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (iteratee(array[mid]) < value)
          low = mid + 1;
        else
          high = mid;
      }
      return low;
    };
    // Generator function to create the indexOf and lastIndexOf functions
    function createIndexFinder(dir, predicateFind, sortedIndex) {
      return function (array, item, idx) {
        var i = 0, length = getLength(array);
        if (typeof idx == 'number') {
          if (dir > 0) {
            i = idx >= 0 ? idx : Math.max(idx + length, i);
          } else {
            length = idx >= 0 ? Math.min(idx + 1, length) : idx + length + 1;
          }
        } else if (sortedIndex && idx && length) {
          idx = sortedIndex(array, item);
          return array[idx] === item ? idx : -1;
        }
        if (item !== item) {
          idx = predicateFind(slice.call(array, i, length), _.isNaN);
          return idx >= 0 ? idx + i : -1;
        }
        for (idx = dir > 0 ? i : length - 1; idx >= 0 && idx < length; idx += dir) {
          if (array[idx] === item)
            return idx;
        }
        return -1;
      };
    }
    // Return the position of the first occurrence of an item in an array,
    // or -1 if the item is not included in the array.
    // If the array is large and already in sort order, pass `true`
    // for **isSorted** to use binary search.
    _.indexOf = createIndexFinder(1, _.findIndex, _.sortedIndex);
    _.lastIndexOf = createIndexFinder(-1, _.findLastIndex);
    // Generate an integer Array containing an arithmetic progression. A port of
    // the native Python `range()` function. See
    // [the Python documentation](http://docs.python.org/library/functions.html#range).
    _.range = function (start, stop, step) {
      if (stop == null) {
        stop = start || 0;
        start = 0;
      }
      step = step || 1;
      var length = Math.max(Math.ceil((stop - start) / step), 0);
      var range = Array(length);
      for (var idx = 0; idx < length; idx++, start += step) {
        range[idx] = start;
      }
      return range;
    };
    // Function (ahem) Functions
    // ------------------
    // Determines whether to execute a function as a constructor
    // or a normal function with the provided arguments
    var executeBound = function (sourceFunc, boundFunc, context, callingContext, args) {
      if (!(callingContext instanceof boundFunc))
        return sourceFunc.apply(context, args);
      var self = baseCreate(sourceFunc.prototype);
      var result = sourceFunc.apply(self, args);
      if (_.isObject(result))
        return result;
      return self;
    };
    // Create a function bound to a given object (assigning `this`, and arguments,
    // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
    // available.
    _.bind = function (func, context) {
      if (nativeBind && func.bind === nativeBind)
        return nativeBind.apply(func, slice.call(arguments, 1));
      if (!_.isFunction(func))
        throw new TypeError('Bind must be called on a function');
      var args = slice.call(arguments, 2);
      var bound = function () {
        return executeBound(func, bound, context, this, args.concat(slice.call(arguments)));
      };
      return bound;
    };
    // Partially apply a function by creating a version that has had some of its
    // arguments pre-filled, without changing its dynamic `this` context. _ acts
    // as a placeholder, allowing any combination of arguments to be pre-filled.
    _.partial = function (func) {
      var boundArgs = slice.call(arguments, 1);
      var bound = function () {
        var position = 0, length = boundArgs.length;
        var args = Array(length);
        for (var i = 0; i < length; i++) {
          args[i] = boundArgs[i] === _ ? arguments[position++] : boundArgs[i];
        }
        while (position < arguments.length)
          args.push(arguments[position++]);
        return executeBound(func, bound, this, this, args);
      };
      return bound;
    };
    // Bind a number of an object's methods to that object. Remaining arguments
    // are the method names to be bound. Useful for ensuring that all callbacks
    // defined on an object belong to it.
    _.bindAll = function (obj) {
      var i, length = arguments.length, key;
      if (length <= 1)
        throw new Error('bindAll must be passed function names');
      for (i = 1; i < length; i++) {
        key = arguments[i];
        obj[key] = _.bind(obj[key], obj);
      }
      return obj;
    };
    // Memoize an expensive function by storing its results.
    _.memoize = function (func, hasher) {
      var memoize = function (key) {
        var cache = memoize.cache;
        var address = '' + (hasher ? hasher.apply(this, arguments) : key);
        if (!_.has(cache, address))
          cache[address] = func.apply(this, arguments);
        return cache[address];
      };
      memoize.cache = {};
      return memoize;
    };
    // Delays a function for the given number of milliseconds, and then calls
    // it with the arguments supplied.
    _.delay = function (func, wait) {
      var args = slice.call(arguments, 2);
      return setTimeout(function () {
        return func.apply(null, args);
      }, wait);
    };
    // Defers a function, scheduling it to run after the current call stack has
    // cleared.
    _.defer = _.partial(_.delay, _, 1);
    // Returns a function, that, when invoked, will only be triggered at most once
    // during a given window of time. Normally, the throttled function will run
    // as much as it can, without ever going more than once per `wait` duration;
    // but if you'd like to disable the execution on the leading edge, pass
    // `{leading: false}`. To disable execution on the trailing edge, ditto.
    _.throttle = function (func, wait, options) {
      var context, args, result;
      var timeout = null;
      var previous = 0;
      if (!options)
        options = {};
      var later = function () {
        previous = options.leading === false ? 0 : _.now();
        timeout = null;
        result = func.apply(context, args);
        if (!timeout)
          context = args = null;
      };
      return function () {
        var now = _.now();
        if (!previous && options.leading === false)
          previous = now;
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        if (remaining <= 0 || remaining > wait) {
          if (timeout) {
            clearTimeout(timeout);
            timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout)
            context = args = null;
        } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
        }
        return result;
      };
    };
    // Returns a function, that, as long as it continues to be invoked, will not
    // be triggered. The function will be called after it stops being called for
    // N milliseconds. If `immediate` is passed, trigger the function on the
    // leading edge, instead of the trailing.
    _.debounce = function (func, wait, immediate) {
      var timeout, args, context, timestamp, result;
      var later = function () {
        var last = _.now() - timestamp;
        if (last < wait && last >= 0) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) {
            result = func.apply(context, args);
            if (!timeout)
              context = args = null;
          }
        }
      };
      return function () {
        context = this;
        args = arguments;
        timestamp = _.now();
        var callNow = immediate && !timeout;
        if (!timeout)
          timeout = setTimeout(later, wait);
        if (callNow) {
          result = func.apply(context, args);
          context = args = null;
        }
        return result;
      };
    };
    // Returns the first function passed as an argument to the second,
    // allowing you to adjust arguments, run code before and after, and
    // conditionally execute the original function.
    _.wrap = function (func, wrapper) {
      return _.partial(wrapper, func);
    };
    // Returns a negated version of the passed-in predicate.
    _.negate = function (predicate) {
      return function () {
        return !predicate.apply(this, arguments);
      };
    };
    // Returns a function that is the composition of a list of functions, each
    // consuming the return value of the function that follows.
    _.compose = function () {
      var args = arguments;
      var start = args.length - 1;
      return function () {
        var i = start;
        var result = args[start].apply(this, arguments);
        while (i--)
          result = args[i].call(this, result);
        return result;
      };
    };
    // Returns a function that will only be executed on and after the Nth call.
    _.after = function (times, func) {
      return function () {
        if (--times < 1) {
          return func.apply(this, arguments);
        }
      };
    };
    // Returns a function that will only be executed up to (but not including) the Nth call.
    _.before = function (times, func) {
      var memo;
      return function () {
        if (--times > 0) {
          memo = func.apply(this, arguments);
        }
        if (times <= 1)
          func = null;
        return memo;
      };
    };
    // Returns a function that will be executed at most one time, no matter how
    // often you call it. Useful for lazy initialization.
    _.once = _.partial(_.before, 2);
    // Object Functions
    // ----------------
    // Keys in IE < 9 that won't be iterated by `for key in ...` and thus missed.
    var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
    var nonEnumerableProps = [
      'valueOf',
      'isPrototypeOf',
      'toString',
      'propertyIsEnumerable',
      'hasOwnProperty',
      'toLocaleString'
    ];
    function collectNonEnumProps(obj, keys) {
      var nonEnumIdx = nonEnumerableProps.length;
      var constructor = obj.constructor;
      var proto = _.isFunction(constructor) && constructor.prototype || ObjProto;
      // Constructor is a special case.
      var prop = 'constructor';
      if (_.has(obj, prop) && !_.contains(keys, prop))
        keys.push(prop);
      while (nonEnumIdx--) {
        prop = nonEnumerableProps[nonEnumIdx];
        if (prop in obj && obj[prop] !== proto[prop] && !_.contains(keys, prop)) {
          keys.push(prop);
        }
      }
    }
    // Retrieve the names of an object's own properties.
    // Delegates to **ECMAScript 5**'s native `Object.keys`
    _.keys = function (obj) {
      if (!_.isObject(obj))
        return [];
      if (nativeKeys)
        return nativeKeys(obj);
      var keys = [];
      for (var key in obj)
        if (_.has(obj, key))
          keys.push(key);
      // Ahem, IE < 9.
      if (hasEnumBug)
        collectNonEnumProps(obj, keys);
      return keys;
    };
    // Retrieve all the property names of an object.
    _.allKeys = function (obj) {
      if (!_.isObject(obj))
        return [];
      var keys = [];
      for (var key in obj)
        keys.push(key);
      // Ahem, IE < 9.
      if (hasEnumBug)
        collectNonEnumProps(obj, keys);
      return keys;
    };
    // Retrieve the values of an object's properties.
    _.values = function (obj) {
      var keys = _.keys(obj);
      var length = keys.length;
      var values = Array(length);
      for (var i = 0; i < length; i++) {
        values[i] = obj[keys[i]];
      }
      return values;
    };
    // Returns the results of applying the iteratee to each element of the object
    // In contrast to _.map it returns an object
    _.mapObject = function (obj, iteratee, context) {
      iteratee = cb(iteratee, context);
      var keys = _.keys(obj), length = keys.length, results = {}, currentKey;
      for (var index = 0; index < length; index++) {
        currentKey = keys[index];
        results[currentKey] = iteratee(obj[currentKey], currentKey, obj);
      }
      return results;
    };
    // Convert an object into a list of `[key, value]` pairs.
    _.pairs = function (obj) {
      var keys = _.keys(obj);
      var length = keys.length;
      var pairs = Array(length);
      for (var i = 0; i < length; i++) {
        pairs[i] = [
          keys[i],
          obj[keys[i]]
        ];
      }
      return pairs;
    };
    // Invert the keys and values of an object. The values must be serializable.
    _.invert = function (obj) {
      var result = {};
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        result[obj[keys[i]]] = keys[i];
      }
      return result;
    };
    // Return a sorted list of the function names available on the object.
    // Aliased as `methods`
    _.functions = _.methods = function (obj) {
      var names = [];
      for (var key in obj) {
        if (_.isFunction(obj[key]))
          names.push(key);
      }
      return names.sort();
    };
    // Extend a given object with all the properties in passed-in object(s).
    _.extend = createAssigner(_.allKeys);
    // Assigns a given object with all the own properties in the passed-in object(s)
    // (https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
    _.extendOwn = _.assign = createAssigner(_.keys);
    // Returns the first key on an object that passes a predicate test
    _.findKey = function (obj, predicate, context) {
      predicate = cb(predicate, context);
      var keys = _.keys(obj), key;
      for (var i = 0, length = keys.length; i < length; i++) {
        key = keys[i];
        if (predicate(obj[key], key, obj))
          return key;
      }
    };
    // Return a copy of the object only containing the whitelisted properties.
    _.pick = function (object, oiteratee, context) {
      var result = {}, obj = object, iteratee, keys;
      if (obj == null)
        return result;
      if (_.isFunction(oiteratee)) {
        keys = _.allKeys(obj);
        iteratee = optimizeCb(oiteratee, context);
      } else {
        keys = flatten(arguments, false, false, 1);
        iteratee = function (value, key, obj) {
          return key in obj;
        };
        obj = Object(obj);
      }
      for (var i = 0, length = keys.length; i < length; i++) {
        var key = keys[i];
        var value = obj[key];
        if (iteratee(value, key, obj))
          result[key] = value;
      }
      return result;
    };
    // Return a copy of the object without the blacklisted properties.
    _.omit = function (obj, iteratee, context) {
      if (_.isFunction(iteratee)) {
        iteratee = _.negate(iteratee);
      } else {
        var keys = _.map(flatten(arguments, false, false, 1), String);
        iteratee = function (value, key) {
          return !_.contains(keys, key);
        };
      }
      return _.pick(obj, iteratee, context);
    };
    // Fill in a given object with default properties.
    _.defaults = createAssigner(_.allKeys, true);
    // Creates an object that inherits from the given prototype object.
    // If additional properties are provided then they will be added to the
    // created object.
    _.create = function (prototype, props) {
      var result = baseCreate(prototype);
      if (props)
        _.extendOwn(result, props);
      return result;
    };
    // Create a (shallow-cloned) duplicate of an object.
    _.clone = function (obj) {
      if (!_.isObject(obj))
        return obj;
      return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };
    // Invokes interceptor with the obj, and then returns obj.
    // The primary purpose of this method is to "tap into" a method chain, in
    // order to perform operations on intermediate results within the chain.
    _.tap = function (obj, interceptor) {
      interceptor(obj);
      return obj;
    };
    // Returns whether an object has a given set of `key:value` pairs.
    _.isMatch = function (object, attrs) {
      var keys = _.keys(attrs), length = keys.length;
      if (object == null)
        return !length;
      var obj = Object(object);
      for (var i = 0; i < length; i++) {
        var key = keys[i];
        if (attrs[key] !== obj[key] || !(key in obj))
          return false;
      }
      return true;
    };
    // Internal recursive comparison function for `isEqual`.
    var eq = function (a, b, aStack, bStack) {
      // Identical objects are equal. `0 === -0`, but they aren't identical.
      // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
      if (a === b)
        return a !== 0 || 1 / a === 1 / b;
      // A strict comparison is necessary because `null == undefined`.
      if (a == null || b == null)
        return a === b;
      // Unwrap any wrapped objects.
      if (a instanceof _)
        a = a._wrapped;
      if (b instanceof _)
        b = b._wrapped;
      // Compare `[[Class]]` names.
      var className = toString.call(a);
      if (className !== toString.call(b))
        return false;
      switch (className) {
      // Strings, numbers, regular expressions, dates, and booleans are compared by value.
      case '[object RegExp]':
      // RegExps are coerced to strings for comparison (Note: '' + /a/i === '/a/i')
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return '' + a === '' + b;
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive.
        // Object(NaN) is equivalent to NaN
        if (+a !== +a)
          return +b !== +b;
        // An `egal` comparison is performed for other numeric values.
        return +a === 0 ? 1 / +a === 1 / b : +a === +b;
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a === +b;
      }
      var areArrays = className === '[object Array]';
      if (!areArrays) {
        if (typeof a != 'object' || typeof b != 'object')
          return false;
        // Objects with different constructors are not equivalent, but `Object`s or `Array`s
        // from different frames are.
        var aCtor = a.constructor, bCtor = b.constructor;
        if (aCtor !== bCtor && !(_.isFunction(aCtor) && aCtor instanceof aCtor && _.isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
          return false;
        }
      }
      // Assume equality for cyclic structures. The algorithm for detecting cyclic
      // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
      // Initializing stack of traversed objects.
      // It's done here since we only need them for objects and arrays comparison.
      aStack = aStack || [];
      bStack = bStack || [];
      var length = aStack.length;
      while (length--) {
        // Linear search. Performance is inversely proportional to the number of
        // unique nested structures.
        if (aStack[length] === a)
          return bStack[length] === b;
      }
      // Add the first object to the stack of traversed objects.
      aStack.push(a);
      bStack.push(b);
      // Recursively compare objects and arrays.
      if (areArrays) {
        // Compare array lengths to determine if a deep comparison is necessary.
        length = a.length;
        if (length !== b.length)
          return false;
        // Deep compare the contents, ignoring non-numeric properties.
        while (length--) {
          if (!eq(a[length], b[length], aStack, bStack))
            return false;
        }
      } else {
        // Deep compare objects.
        var keys = _.keys(a), key;
        length = keys.length;
        // Ensure that both objects contain the same number of properties before comparing deep equality.
        if (_.keys(b).length !== length)
          return false;
        while (length--) {
          // Deep compare each member
          key = keys[length];
          if (!(_.has(b, key) && eq(a[key], b[key], aStack, bStack)))
            return false;
        }
      }
      // Remove the first object from the stack of traversed objects.
      aStack.pop();
      bStack.pop();
      return true;
    };
    // Perform a deep comparison to check if two objects are equal.
    _.isEqual = function (a, b) {
      return eq(a, b);
    };
    // Is a given array, string, or object empty?
    // An "empty" object has no enumerable own-properties.
    _.isEmpty = function (obj) {
      if (obj == null)
        return true;
      if (isArrayLike(obj) && (_.isArray(obj) || _.isString(obj) || _.isArguments(obj)))
        return obj.length === 0;
      return _.keys(obj).length === 0;
    };
    // Is a given value a DOM element?
    _.isElement = function (obj) {
      return !!(obj && obj.nodeType === 1);
    };
    // Is a given value an array?
    // Delegates to ECMA5's native Array.isArray
    _.isArray = nativeIsArray || function (obj) {
      return toString.call(obj) === '[object Array]';
    };
    // Is a given variable an object?
    _.isObject = function (obj) {
      var type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
    };
    // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp, isError.
    _.each([
      'Arguments',
      'Function',
      'String',
      'Number',
      'Date',
      'RegExp',
      'Error'
    ], function (name) {
      _['is' + name] = function (obj) {
        return toString.call(obj) === '[object ' + name + ']';
      };
    });
    // Define a fallback version of the method in browsers (ahem, IE < 9), where
    // there isn't any inspectable "Arguments" type.
    if (!_.isArguments(arguments)) {
      _.isArguments = function (obj) {
        return _.has(obj, 'callee');
      };
    }
    // Optimize `isFunction` if appropriate. Work around some typeof bugs in old v8,
    // IE 11 (#1621), and in Safari 8 (#1929).
    if (typeof /./ != 'function' && typeof Int8Array != 'object') {
      _.isFunction = function (obj) {
        return typeof obj == 'function' || false;
      };
    }
    // Is a given object a finite number?
    _.isFinite = function (obj) {
      return isFinite(obj) && !isNaN(parseFloat(obj));
    };
    // Is the given value `NaN`? (NaN is the only number which does not equal itself).
    _.isNaN = function (obj) {
      return _.isNumber(obj) && obj !== +obj;
    };
    // Is a given value a boolean?
    _.isBoolean = function (obj) {
      return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };
    // Is a given value equal to null?
    _.isNull = function (obj) {
      return obj === null;
    };
    // Is a given variable undefined?
    _.isUndefined = function (obj) {
      return obj === void 0;
    };
    // Shortcut function for checking if an object has a given property directly
    // on itself (in other words, not on a prototype).
    _.has = function (obj, key) {
      return obj != null && hasOwnProperty.call(obj, key);
    };
    // Utility Functions
    // -----------------
    // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
    // previous owner. Returns a reference to the Underscore object.
    _.noConflict = function () {
      root._ = previousUnderscore;
      return this;
    };
    // Keep the identity function around for default iteratees.
    _.identity = function (value) {
      return value;
    };
    // Predicate-generating functions. Often useful outside of Underscore.
    _.constant = function (value) {
      return function () {
        return value;
      };
    };
    _.noop = function () {
    };
    _.property = property;
    // Generates a function for a given object that returns a given property.
    _.propertyOf = function (obj) {
      return obj == null ? function () {
      } : function (key) {
        return obj[key];
      };
    };
    // Returns a predicate for checking whether an object has a given set of
    // `key:value` pairs.
    _.matcher = _.matches = function (attrs) {
      attrs = _.extendOwn({}, attrs);
      return function (obj) {
        return _.isMatch(obj, attrs);
      };
    };
    // Run a function **n** times.
    _.times = function (n, iteratee, context) {
      var accum = Array(Math.max(0, n));
      iteratee = optimizeCb(iteratee, context, 1);
      for (var i = 0; i < n; i++)
        accum[i] = iteratee(i);
      return accum;
    };
    // Return a random integer between min and max (inclusive).
    _.random = function (min, max) {
      if (max == null) {
        max = min;
        min = 0;
      }
      return min + Math.floor(Math.random() * (max - min + 1));
    };
    // A (possibly faster) way to get the current timestamp as an integer.
    _.now = Date.now || function () {
      return new Date().getTime();
    };
    // List of HTML entities for escaping.
    var escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '\'': '&#x27;',
      '`': '&#x60;'
    };
    var unescapeMap = _.invert(escapeMap);
    // Functions for escaping and unescaping strings to/from HTML interpolation.
    var createEscaper = function (map) {
      var escaper = function (match) {
        return map[match];
      };
      // Regexes for identifying a key that needs to be escaped
      var source = '(?:' + _.keys(map).join('|') + ')';
      var testRegexp = RegExp(source);
      var replaceRegexp = RegExp(source, 'g');
      return function (string) {
        string = string == null ? '' : '' + string;
        return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
      };
    };
    _.escape = createEscaper(escapeMap);
    _.unescape = createEscaper(unescapeMap);
    // If the value of the named `property` is a function then invoke it with the
    // `object` as context; otherwise, return it.
    _.result = function (object, property, fallback) {
      var value = object == null ? void 0 : object[property];
      if (value === void 0) {
        value = fallback;
      }
      return _.isFunction(value) ? value.call(object) : value;
    };
    // Generate a unique integer id (unique within the entire client session).
    // Useful for temporary DOM ids.
    var idCounter = 0;
    _.uniqueId = function (prefix) {
      var id = ++idCounter + '';
      return prefix ? prefix + id : id;
    };
    // By default, Underscore uses ERB-style template delimiters, change the
    // following template settings to use alternative delimiters.
    _.templateSettings = {
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: /<%=([\s\S]+?)%>/g,
      escape: /<%-([\s\S]+?)%>/g
    };
    // When customizing `templateSettings`, if you don't want to define an
    // interpolation, evaluation or escaping regex, we need one that is
    // guaranteed not to match.
    var noMatch = /(.)^/;
    // Certain characters need to be escaped so that they can be put into a
    // string literal.
    var escapes = {
      '\'': '\'',
      '\\': '\\',
      '\r': 'r',
      '\n': 'n',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    };
    var escaper = /\\|'|\r|\n|\u2028|\u2029/g;
    var escapeChar = function (match) {
      return '\\' + escapes[match];
    };
    // JavaScript micro-templating, similar to John Resig's implementation.
    // Underscore templating handles arbitrary delimiters, preserves whitespace,
    // and correctly escapes quotes within interpolated code.
    // NB: `oldSettings` only exists for backwards compatibility.
    _.template = function (text, settings, oldSettings) {
      if (!settings && oldSettings)
        settings = oldSettings;
      settings = _.defaults({}, settings, _.templateSettings);
      // Combine delimiters into one regular expression via alternation.
      var matcher = RegExp([
        (settings.escape || noMatch).source,
        (settings.interpolate || noMatch).source,
        (settings.evaluate || noMatch).source
      ].join('|') + '|$', 'g');
      // Compile the template source, escaping string literals appropriately.
      var index = 0;
      var source = '__p+=\'';
      text.replace(matcher, function (match, escape, interpolate, evaluate, offset) {
        source += text.slice(index, offset).replace(escaper, escapeChar);
        index = offset + match.length;
        if (escape) {
          source += '\'+\n((__t=(' + escape + '))==null?\'\':_.escape(__t))+\n\'';
        } else if (interpolate) {
          source += '\'+\n((__t=(' + interpolate + '))==null?\'\':__t)+\n\'';
        } else if (evaluate) {
          source += '\';\n' + evaluate + '\n__p+=\'';
        }
        // Adobe VMs need the match returned to produce the correct offest.
        return match;
      });
      source += '\';\n';
      // If a variable is not specified, place data values in local scope.
      if (!settings.variable)
        source = 'with(obj||{}){\n' + source + '}\n';
      source = 'var __t,__p=\'\',__j=Array.prototype.join,' + 'print=function(){__p+=__j.call(arguments,\'\');};\n' + source + 'return __p;\n';
      try {
        var render = new Function(settings.variable || 'obj', '_', source);
      } catch (e) {
        e.source = source;
        throw e;
      }
      var template = function (data) {
        return render.call(this, data, _);
      };
      // Provide the compiled source as a convenience for precompilation.
      var argument = settings.variable || 'obj';
      template.source = 'function(' + argument + '){\n' + source + '}';
      return template;
    };
    // Add a "chain" function. Start chaining a wrapped Underscore object.
    _.chain = function (obj) {
      var instance = _(obj);
      instance._chain = true;
      return instance;
    };
    // OOP
    // ---------------
    // If Underscore is called as a function, it returns a wrapped object that
    // can be used OO-style. This wrapper holds altered versions of all the
    // underscore functions. Wrapped objects may be chained.
    // Helper function to continue chaining intermediate results.
    var result = function (instance, obj) {
      return instance._chain ? _(obj).chain() : obj;
    };
    // Add your own custom functions to the Underscore object.
    _.mixin = function (obj) {
      _.each(_.functions(obj), function (name) {
        var func = _[name] = obj[name];
        _.prototype[name] = function () {
          var args = [this._wrapped];
          push.apply(args, arguments);
          return result(this, func.apply(_, args));
        };
      });
    };
    // Add all of the Underscore functions to the wrapper object.
    _.mixin(_);
    // Add all mutator Array functions to the wrapper.
    _.each([
      'pop',
      'push',
      'reverse',
      'shift',
      'sort',
      'splice',
      'unshift'
    ], function (name) {
      var method = ArrayProto[name];
      _.prototype[name] = function () {
        var obj = this._wrapped;
        method.apply(obj, arguments);
        if ((name === 'shift' || name === 'splice') && obj.length === 0)
          delete obj[0];
        return result(this, obj);
      };
    });
    // Add all accessor Array functions to the wrapper.
    _.each([
      'concat',
      'join',
      'slice'
    ], function (name) {
      var method = ArrayProto[name];
      _.prototype[name] = function () {
        return result(this, method.apply(this._wrapped, arguments));
      };
    });
    // Extracts the result from a wrapped and chained object.
    _.prototype.value = function () {
      return this._wrapped;
    };
    // Provide unwrapping proxy for some methods used in engine operations
    // such as arithmetic and JSON stringification.
    _.prototype.valueOf = _.prototype.toJSON = _.prototype.value;
    _.prototype.toString = function () {
      return '' + this._wrapped;
    };
    // AMD registration happens at the end for compatibility with AMD loaders
    // that may not enforce next-turn semantics on modules. Even though general
    // practice for AMD registration is to be anonymous, underscore registers
    // as a named module because, like jQuery, it is a base library that is
    // popular enough to be bundled in a third party lib, but not be part of
    // an AMD load request. Those cases could generate an error when an
    // anonymous define() is called outside of a loader request.
    if (true) {
      underscore = function () {
        return _;
      }();
    }
  }.call(this));
  mobile_detect = function () {
    var MobileDetect = function (userAgent, maxPhoneWidth) {
      this.ua = userAgent || '';
      this._cache = {};
      //600dp is typical 7" tablet minimum width
      this.maxPhoneWidth = maxPhoneWidth || 600;
    };
    var impl = {};
    impl.mobileDetectRules = {
      'phones': {
        'iPhone': '\\biPhone\\b|\\biPod\\b',
        'BlackBerry': 'BlackBerry|\\bBB10\\b|rim[0-9]+',
        'HTC': 'HTC|HTC.*(Sensation|Evo|Vision|Explorer|6800|8100|8900|A7272|S510e|C110e|Legend|Desire|T8282)|APX515CKT|Qtek9090|APA9292KT|HD_mini|Sensation.*Z710e|PG86100|Z715e|Desire.*(A8181|HD)|ADR6200|ADR6400L|ADR6425|001HT|Inspire 4G|Android.*\\bEVO\\b|T-Mobile G1|Z520m',
        'Nexus': 'Nexus One|Nexus S|Galaxy.*Nexus|Android.*Nexus.*Mobile|Nexus 4|Nexus 5|Nexus 6',
        'Dell': 'Dell.*Streak|Dell.*Aero|Dell.*Venue|DELL.*Venue Pro|Dell Flash|Dell Smoke|Dell Mini 3iX|XCD28|XCD35|\\b001DL\\b|\\b101DL\\b|\\bGS01\\b',
        'Motorola': 'Motorola|DROIDX|DROID BIONIC|\\bDroid\\b.*Build|Android.*Xoom|HRI39|MOT-|A1260|A1680|A555|A853|A855|A953|A955|A956|Motorola.*ELECTRIFY|Motorola.*i1|i867|i940|MB200|MB300|MB501|MB502|MB508|MB511|MB520|MB525|MB526|MB611|MB612|MB632|MB810|MB855|MB860|MB861|MB865|MB870|ME501|ME502|ME511|ME525|ME600|ME632|ME722|ME811|ME860|ME863|ME865|MT620|MT710|MT716|MT720|MT810|MT870|MT917|Motorola.*TITANIUM|WX435|WX445|XT300|XT301|XT311|XT316|XT317|XT319|XT320|XT390|XT502|XT530|XT531|XT532|XT535|XT603|XT610|XT611|XT615|XT681|XT701|XT702|XT711|XT720|XT800|XT806|XT860|XT862|XT875|XT882|XT883|XT894|XT901|XT907|XT909|XT910|XT912|XT928|XT926|XT915|XT919|XT925|XT1021|\\bMoto E\\b',
        'Samsung': '\\bSamsung\\b|SM-G9250|GT-19300|SGH-I337|BGT-S5230|GT-B2100|GT-B2700|GT-B2710|GT-B3210|GT-B3310|GT-B3410|GT-B3730|GT-B3740|GT-B5510|GT-B5512|GT-B5722|GT-B6520|GT-B7300|GT-B7320|GT-B7330|GT-B7350|GT-B7510|GT-B7722|GT-B7800|GT-C3010|GT-C3011|GT-C3060|GT-C3200|GT-C3212|GT-C3212I|GT-C3262|GT-C3222|GT-C3300|GT-C3300K|GT-C3303|GT-C3303K|GT-C3310|GT-C3322|GT-C3330|GT-C3350|GT-C3500|GT-C3510|GT-C3530|GT-C3630|GT-C3780|GT-C5010|GT-C5212|GT-C6620|GT-C6625|GT-C6712|GT-E1050|GT-E1070|GT-E1075|GT-E1080|GT-E1081|GT-E1085|GT-E1087|GT-E1100|GT-E1107|GT-E1110|GT-E1120|GT-E1125|GT-E1130|GT-E1160|GT-E1170|GT-E1175|GT-E1180|GT-E1182|GT-E1200|GT-E1210|GT-E1225|GT-E1230|GT-E1390|GT-E2100|GT-E2120|GT-E2121|GT-E2152|GT-E2220|GT-E2222|GT-E2230|GT-E2232|GT-E2250|GT-E2370|GT-E2550|GT-E2652|GT-E3210|GT-E3213|GT-I5500|GT-I5503|GT-I5700|GT-I5800|GT-I5801|GT-I6410|GT-I6420|GT-I7110|GT-I7410|GT-I7500|GT-I8000|GT-I8150|GT-I8160|GT-I8190|GT-I8320|GT-I8330|GT-I8350|GT-I8530|GT-I8700|GT-I8703|GT-I8910|GT-I9000|GT-I9001|GT-I9003|GT-I9010|GT-I9020|GT-I9023|GT-I9070|GT-I9082|GT-I9100|GT-I9103|GT-I9220|GT-I9250|GT-I9300|GT-I9305|GT-I9500|GT-I9505|GT-M3510|GT-M5650|GT-M7500|GT-M7600|GT-M7603|GT-M8800|GT-M8910|GT-N7000|GT-S3110|GT-S3310|GT-S3350|GT-S3353|GT-S3370|GT-S3650|GT-S3653|GT-S3770|GT-S3850|GT-S5210|GT-S5220|GT-S5229|GT-S5230|GT-S5233|GT-S5250|GT-S5253|GT-S5260|GT-S5263|GT-S5270|GT-S5300|GT-S5330|GT-S5350|GT-S5360|GT-S5363|GT-S5369|GT-S5380|GT-S5380D|GT-S5560|GT-S5570|GT-S5600|GT-S5603|GT-S5610|GT-S5620|GT-S5660|GT-S5670|GT-S5690|GT-S5750|GT-S5780|GT-S5830|GT-S5839|GT-S6102|GT-S6500|GT-S7070|GT-S7200|GT-S7220|GT-S7230|GT-S7233|GT-S7250|GT-S7500|GT-S7530|GT-S7550|GT-S7562|GT-S7710|GT-S8000|GT-S8003|GT-S8500|GT-S8530|GT-S8600|SCH-A310|SCH-A530|SCH-A570|SCH-A610|SCH-A630|SCH-A650|SCH-A790|SCH-A795|SCH-A850|SCH-A870|SCH-A890|SCH-A930|SCH-A950|SCH-A970|SCH-A990|SCH-I100|SCH-I110|SCH-I400|SCH-I405|SCH-I500|SCH-I510|SCH-I515|SCH-I600|SCH-I730|SCH-I760|SCH-I770|SCH-I830|SCH-I910|SCH-I920|SCH-I959|SCH-LC11|SCH-N150|SCH-N300|SCH-R100|SCH-R300|SCH-R351|SCH-R400|SCH-R410|SCH-T300|SCH-U310|SCH-U320|SCH-U350|SCH-U360|SCH-U365|SCH-U370|SCH-U380|SCH-U410|SCH-U430|SCH-U450|SCH-U460|SCH-U470|SCH-U490|SCH-U540|SCH-U550|SCH-U620|SCH-U640|SCH-U650|SCH-U660|SCH-U700|SCH-U740|SCH-U750|SCH-U810|SCH-U820|SCH-U900|SCH-U940|SCH-U960|SCS-26UC|SGH-A107|SGH-A117|SGH-A127|SGH-A137|SGH-A157|SGH-A167|SGH-A177|SGH-A187|SGH-A197|SGH-A227|SGH-A237|SGH-A257|SGH-A437|SGH-A517|SGH-A597|SGH-A637|SGH-A657|SGH-A667|SGH-A687|SGH-A697|SGH-A707|SGH-A717|SGH-A727|SGH-A737|SGH-A747|SGH-A767|SGH-A777|SGH-A797|SGH-A817|SGH-A827|SGH-A837|SGH-A847|SGH-A867|SGH-A877|SGH-A887|SGH-A897|SGH-A927|SGH-B100|SGH-B130|SGH-B200|SGH-B220|SGH-C100|SGH-C110|SGH-C120|SGH-C130|SGH-C140|SGH-C160|SGH-C170|SGH-C180|SGH-C200|SGH-C207|SGH-C210|SGH-C225|SGH-C230|SGH-C417|SGH-C450|SGH-D307|SGH-D347|SGH-D357|SGH-D407|SGH-D415|SGH-D780|SGH-D807|SGH-D980|SGH-E105|SGH-E200|SGH-E315|SGH-E316|SGH-E317|SGH-E335|SGH-E590|SGH-E635|SGH-E715|SGH-E890|SGH-F300|SGH-F480|SGH-I200|SGH-I300|SGH-I320|SGH-I550|SGH-I577|SGH-I600|SGH-I607|SGH-I617|SGH-I627|SGH-I637|SGH-I677|SGH-I700|SGH-I717|SGH-I727|SGH-i747M|SGH-I777|SGH-I780|SGH-I827|SGH-I847|SGH-I857|SGH-I896|SGH-I897|SGH-I900|SGH-I907|SGH-I917|SGH-I927|SGH-I937|SGH-I997|SGH-J150|SGH-J200|SGH-L170|SGH-L700|SGH-M110|SGH-M150|SGH-M200|SGH-N105|SGH-N500|SGH-N600|SGH-N620|SGH-N625|SGH-N700|SGH-N710|SGH-P107|SGH-P207|SGH-P300|SGH-P310|SGH-P520|SGH-P735|SGH-P777|SGH-Q105|SGH-R210|SGH-R220|SGH-R225|SGH-S105|SGH-S307|SGH-T109|SGH-T119|SGH-T139|SGH-T209|SGH-T219|SGH-T229|SGH-T239|SGH-T249|SGH-T259|SGH-T309|SGH-T319|SGH-T329|SGH-T339|SGH-T349|SGH-T359|SGH-T369|SGH-T379|SGH-T409|SGH-T429|SGH-T439|SGH-T459|SGH-T469|SGH-T479|SGH-T499|SGH-T509|SGH-T519|SGH-T539|SGH-T559|SGH-T589|SGH-T609|SGH-T619|SGH-T629|SGH-T639|SGH-T659|SGH-T669|SGH-T679|SGH-T709|SGH-T719|SGH-T729|SGH-T739|SGH-T746|SGH-T749|SGH-T759|SGH-T769|SGH-T809|SGH-T819|SGH-T839|SGH-T919|SGH-T929|SGH-T939|SGH-T959|SGH-T989|SGH-U100|SGH-U200|SGH-U800|SGH-V205|SGH-V206|SGH-X100|SGH-X105|SGH-X120|SGH-X140|SGH-X426|SGH-X427|SGH-X475|SGH-X495|SGH-X497|SGH-X507|SGH-X600|SGH-X610|SGH-X620|SGH-X630|SGH-X700|SGH-X820|SGH-X890|SGH-Z130|SGH-Z150|SGH-Z170|SGH-ZX10|SGH-ZX20|SHW-M110|SPH-A120|SPH-A400|SPH-A420|SPH-A460|SPH-A500|SPH-A560|SPH-A600|SPH-A620|SPH-A660|SPH-A700|SPH-A740|SPH-A760|SPH-A790|SPH-A800|SPH-A820|SPH-A840|SPH-A880|SPH-A900|SPH-A940|SPH-A960|SPH-D600|SPH-D700|SPH-D710|SPH-D720|SPH-I300|SPH-I325|SPH-I330|SPH-I350|SPH-I500|SPH-I600|SPH-I700|SPH-L700|SPH-M100|SPH-M220|SPH-M240|SPH-M300|SPH-M305|SPH-M320|SPH-M330|SPH-M350|SPH-M360|SPH-M370|SPH-M380|SPH-M510|SPH-M540|SPH-M550|SPH-M560|SPH-M570|SPH-M580|SPH-M610|SPH-M620|SPH-M630|SPH-M800|SPH-M810|SPH-M850|SPH-M900|SPH-M910|SPH-M920|SPH-M930|SPH-N100|SPH-N200|SPH-N240|SPH-N300|SPH-N400|SPH-Z400|SWC-E100|SCH-i909|GT-N7100|GT-N7105|SCH-I535|SM-N900A|SGH-I317|SGH-T999L|GT-S5360B|GT-I8262|GT-S6802|GT-S6312|GT-S6310|GT-S5312|GT-S5310|GT-I9105|GT-I8510|GT-S6790N|SM-G7105|SM-N9005|GT-S5301|GT-I9295|GT-I9195|SM-C101|GT-S7392|GT-S7560|GT-B7610|GT-I5510|GT-S7582|GT-S7530E|GT-I8750|SM-G9006V|SM-G9008V|SM-G9009D|SM-G900A|SM-G900D|SM-G900F|SM-G900H|SM-G900I|SM-G900J|SM-G900K|SM-G900L|SM-G900M|SM-G900P|SM-G900R4|SM-G900S|SM-G900T|SM-G900V|SM-G900W8|SHV-E160K|SCH-P709|SCH-P729|SM-T2558|GT-I9205|SM-G9350|SM-J120F|SM-G920F|SM-G920V|SM-G930F|SM-N910C',
        'LG': '\\bLG\\b;|LG[- ]?(C800|C900|E400|E610|E900|E-900|F160|F180K|F180L|F180S|730|855|L160|LS740|LS840|LS970|LU6200|MS690|MS695|MS770|MS840|MS870|MS910|P500|P700|P705|VM696|AS680|AS695|AX840|C729|E970|GS505|272|C395|E739BK|E960|L55C|L75C|LS696|LS860|P769BK|P350|P500|P509|P870|UN272|US730|VS840|VS950|LN272|LN510|LS670|LS855|LW690|MN270|MN510|P509|P769|P930|UN200|UN270|UN510|UN610|US670|US740|US760|UX265|UX840|VN271|VN530|VS660|VS700|VS740|VS750|VS910|VS920|VS930|VX9200|VX11000|AX840A|LW770|P506|P925|P999|E612|D955|D802|MS323)',
        'Sony': 'SonyST|SonyLT|SonyEricsson|SonyEricssonLT15iv|LT18i|E10i|LT28h|LT26w|SonyEricssonMT27i|C5303|C6902|C6903|C6906|C6943|D2533',
        'Asus': 'Asus.*Galaxy|PadFone.*Mobile',
        'NokiaLumia': 'Lumia [0-9]{3,4}',
        'Micromax': 'Micromax.*\\b(A210|A92|A88|A72|A111|A110Q|A115|A116|A110|A90S|A26|A51|A35|A54|A25|A27|A89|A68|A65|A57|A90)\\b',
        'Palm': 'PalmSource|Palm',
        'Vertu': 'Vertu|Vertu.*Ltd|Vertu.*Ascent|Vertu.*Ayxta|Vertu.*Constellation(F|Quest)?|Vertu.*Monika|Vertu.*Signature',
        'Pantech': 'PANTECH|IM-A850S|IM-A840S|IM-A830L|IM-A830K|IM-A830S|IM-A820L|IM-A810K|IM-A810S|IM-A800S|IM-T100K|IM-A725L|IM-A780L|IM-A775C|IM-A770K|IM-A760S|IM-A750K|IM-A740S|IM-A730S|IM-A720L|IM-A710K|IM-A690L|IM-A690S|IM-A650S|IM-A630K|IM-A600S|VEGA PTL21|PT003|P8010|ADR910L|P6030|P6020|P9070|P4100|P9060|P5000|CDM8992|TXT8045|ADR8995|IS11PT|P2030|P6010|P8000|PT002|IS06|CDM8999|P9050|PT001|TXT8040|P2020|P9020|P2000|P7040|P7000|C790',
        'Fly': 'IQ230|IQ444|IQ450|IQ440|IQ442|IQ441|IQ245|IQ256|IQ236|IQ255|IQ235|IQ245|IQ275|IQ240|IQ285|IQ280|IQ270|IQ260|IQ250',
        'Wiko': 'KITE 4G|HIGHWAY|GETAWAY|STAIRWAY|DARKSIDE|DARKFULL|DARKNIGHT|DARKMOON|SLIDE|WAX 4G|RAINBOW|BLOOM|SUNSET|GOA(?!nna)|LENNY|BARRY|IGGY|OZZY|CINK FIVE|CINK PEAX|CINK PEAX 2|CINK SLIM|CINK SLIM 2|CINK +|CINK KING|CINK PEAX|CINK SLIM|SUBLIM',
        'iMobile': 'i-mobile (IQ|i-STYLE|idea|ZAA|Hitz)',
        'SimValley': '\\b(SP-80|XT-930|SX-340|XT-930|SX-310|SP-360|SP60|SPT-800|SP-120|SPT-800|SP-140|SPX-5|SPX-8|SP-100|SPX-8|SPX-12)\\b',
        'Wolfgang': 'AT-B24D|AT-AS50HD|AT-AS40W|AT-AS55HD|AT-AS45q2|AT-B26D|AT-AS50Q',
        'Alcatel': 'Alcatel',
        'Nintendo': 'Nintendo 3DS',
        'Amoi': 'Amoi',
        'INQ': 'INQ',
        'GenericPhone': 'Tapatalk|PDA;|SAGEM|\\bmmp\\b|pocket|\\bpsp\\b|symbian|Smartphone|smartfon|treo|up.browser|up.link|vodafone|\\bwap\\b|nokia|Series40|Series60|S60|SonyEricsson|N900|MAUI.*WAP.*Browser'
      },
      'tablets': {
        'iPad': 'iPad|iPad.*Mobile',
        'NexusTablet': 'Android.*Nexus[\\s]+(7|9|10)',
        'SamsungTablet': 'SAMSUNG.*Tablet|Galaxy.*Tab|SC-01C|GT-P1000|GT-P1003|GT-P1010|GT-P3105|GT-P6210|GT-P6800|GT-P6810|GT-P7100|GT-P7300|GT-P7310|GT-P7500|GT-P7510|SCH-I800|SCH-I815|SCH-I905|SGH-I957|SGH-I987|SGH-T849|SGH-T859|SGH-T869|SPH-P100|GT-P3100|GT-P3108|GT-P3110|GT-P5100|GT-P5110|GT-P6200|GT-P7320|GT-P7511|GT-N8000|GT-P8510|SGH-I497|SPH-P500|SGH-T779|SCH-I705|SCH-I915|GT-N8013|GT-P3113|GT-P5113|GT-P8110|GT-N8010|GT-N8005|GT-N8020|GT-P1013|GT-P6201|GT-P7501|GT-N5100|GT-N5105|GT-N5110|SHV-E140K|SHV-E140L|SHV-E140S|SHV-E150S|SHV-E230K|SHV-E230L|SHV-E230S|SHW-M180K|SHW-M180L|SHW-M180S|SHW-M180W|SHW-M300W|SHW-M305W|SHW-M380K|SHW-M380S|SHW-M380W|SHW-M430W|SHW-M480K|SHW-M480S|SHW-M480W|SHW-M485W|SHW-M486W|SHW-M500W|GT-I9228|SCH-P739|SCH-I925|GT-I9200|GT-P5200|GT-P5210|GT-P5210X|SM-T311|SM-T310|SM-T310X|SM-T210|SM-T210R|SM-T211|SM-P600|SM-P601|SM-P605|SM-P900|SM-P901|SM-T217|SM-T217A|SM-T217S|SM-P6000|SM-T3100|SGH-I467|XE500|SM-T110|GT-P5220|GT-I9200X|GT-N5110X|GT-N5120|SM-P905|SM-T111|SM-T2105|SM-T315|SM-T320|SM-T320X|SM-T321|SM-T520|SM-T525|SM-T530NU|SM-T230NU|SM-T330NU|SM-T900|XE500T1C|SM-P605V|SM-P905V|SM-T337V|SM-T537V|SM-T707V|SM-T807V|SM-P600X|SM-P900X|SM-T210X|SM-T230|SM-T230X|SM-T325|GT-P7503|SM-T531|SM-T330|SM-T530|SM-T705|SM-T705C|SM-T535|SM-T331|SM-T800|SM-T700|SM-T537|SM-T807|SM-P907A|SM-T337A|SM-T537A|SM-T707A|SM-T807A|SM-T237|SM-T807P|SM-P607T|SM-T217T|SM-T337T|SM-T807T|SM-T116NQ|SM-T116BU|SM-P550|SM-T350|SM-T550|SM-T9000|SM-P9000|SM-T705Y|SM-T805|GT-P3113|SM-T710|SM-T810|SM-T815|SM-T360|SM-T533|SM-T113|SM-T335|SM-T715|SM-T560|SM-T670|SM-T677|SM-T377|SM-T567|SM-T357T|SM-T555|SM-T561|SM-T713|SM-T719|SM-T813|SM-T819|SM-T580|SM-T355Y|SM-T280|SM-T817A|SM-T820|SM-W700|SM-P580|SM-T587|SM-P350|SM-P555M|SM-P355M|SM-T113NU|SM-T815Y',
        'Kindle': 'Kindle|Silk.*Accelerated|Android.*\\b(KFOT|KFTT|KFJWI|KFJWA|KFOTE|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|WFJWAE|KFSAWA|KFSAWI|KFASWI|KFARWI|KFFOWI|KFGIWI|KFMEWI)\\b|Android.*Silk/[0-9.]+ like Chrome/[0-9.]+ (?!Mobile)',
        'SurfaceTablet': 'Windows NT [0-9.]+; ARM;.*(Tablet|ARMBJS)',
        'HPTablet': 'HP Slate (7|8|10)|HP ElitePad 900|hp-tablet|EliteBook.*Touch|HP 8|Slate 21|HP SlateBook 10',
        'AsusTablet': '^.*PadFone((?!Mobile).)*$|Transformer|TF101|TF101G|TF300T|TF300TG|TF300TL|TF700T|TF700KL|TF701T|TF810C|ME171|ME301T|ME302C|ME371MG|ME370T|ME372MG|ME172V|ME173X|ME400C|Slider SL101|\\bK00F\\b|\\bK00C\\b|\\bK00E\\b|\\bK00L\\b|TX201LA|ME176C|ME102A|\\bM80TA\\b|ME372CL|ME560CG|ME372CG|ME302KL| K010 | K011 | K017 | K01E |ME572C|ME103K|ME170C|ME171C|\\bME70C\\b|ME581C|ME581CL|ME8510C|ME181C|P01Y|PO1MA|P01Z|\\bP027\\b',
        'BlackBerryTablet': 'PlayBook|RIM Tablet',
        'HTCtablet': 'HTC_Flyer_P512|HTC Flyer|HTC Jetstream|HTC-P715a|HTC EVO View 4G|PG41200|PG09410',
        'MotorolaTablet': 'xoom|sholest|MZ615|MZ605|MZ505|MZ601|MZ602|MZ603|MZ604|MZ606|MZ607|MZ608|MZ609|MZ615|MZ616|MZ617',
        'NookTablet': 'Android.*Nook|NookColor|nook browser|BNRV200|BNRV200A|BNTV250|BNTV250A|BNTV400|BNTV600|LogicPD Zoom2',
        'AcerTablet': 'Android.*; \\b(A100|A101|A110|A200|A210|A211|A500|A501|A510|A511|A700|A701|W500|W500P|W501|W501P|W510|W511|W700|G100|G100W|B1-A71|B1-710|B1-711|A1-810|A1-811|A1-830)\\b|W3-810|\\bA3-A10\\b|\\bA3-A11\\b|\\bA3-A20\\b|\\bA3-A30',
        'ToshibaTablet': 'Android.*(AT100|AT105|AT200|AT205|AT270|AT275|AT300|AT305|AT1S5|AT500|AT570|AT700|AT830)|TOSHIBA.*FOLIO',
        'LGTablet': '\\bL-06C|LG-V909|LG-V900|LG-V700|LG-V510|LG-V500|LG-V410|LG-V400|LG-VK810\\b',
        'FujitsuTablet': 'Android.*\\b(F-01D|F-02F|F-05E|F-10D|M532|Q572)\\b',
        'PrestigioTablet': 'PMP3170B|PMP3270B|PMP3470B|PMP7170B|PMP3370B|PMP3570C|PMP5870C|PMP3670B|PMP5570C|PMP5770D|PMP3970B|PMP3870C|PMP5580C|PMP5880D|PMP5780D|PMP5588C|PMP7280C|PMP7280C3G|PMP7280|PMP7880D|PMP5597D|PMP5597|PMP7100D|PER3464|PER3274|PER3574|PER3884|PER5274|PER5474|PMP5097CPRO|PMP5097|PMP7380D|PMP5297C|PMP5297C_QUAD|PMP812E|PMP812E3G|PMP812F|PMP810E|PMP880TD|PMT3017|PMT3037|PMT3047|PMT3057|PMT7008|PMT5887|PMT5001|PMT5002',
        'LenovoTablet': 'Lenovo TAB|Idea(Tab|Pad)( A1|A10| K1|)|ThinkPad([ ]+)?Tablet|YT3-850M|YT3-X90L|YT3-X90F|YT3-X90X|Lenovo.*(S2109|S2110|S5000|S6000|K3011|A3000|A3500|A1000|A2107|A2109|A1107|A5500|A7600|B6000|B8000|B8080)(-|)(FL|F|HV|H|)',
        'DellTablet': 'Venue 11|Venue 8|Venue 7|Dell Streak 10|Dell Streak 7',
        'YarvikTablet': 'Android.*\\b(TAB210|TAB211|TAB224|TAB250|TAB260|TAB264|TAB310|TAB360|TAB364|TAB410|TAB411|TAB420|TAB424|TAB450|TAB460|TAB461|TAB464|TAB465|TAB467|TAB468|TAB07-100|TAB07-101|TAB07-150|TAB07-151|TAB07-152|TAB07-200|TAB07-201-3G|TAB07-210|TAB07-211|TAB07-212|TAB07-214|TAB07-220|TAB07-400|TAB07-485|TAB08-150|TAB08-200|TAB08-201-3G|TAB08-201-30|TAB09-100|TAB09-211|TAB09-410|TAB10-150|TAB10-201|TAB10-211|TAB10-400|TAB10-410|TAB13-201|TAB274EUK|TAB275EUK|TAB374EUK|TAB462EUK|TAB474EUK|TAB9-200)\\b',
        'MedionTablet': 'Android.*\\bOYO\\b|LIFE.*(P9212|P9514|P9516|S9512)|LIFETAB',
        'ArnovaTablet': '97G4|AN10G2|AN7bG3|AN7fG3|AN8G3|AN8cG3|AN7G3|AN9G3|AN7dG3|AN7dG3ST|AN7dG3ChildPad|AN10bG3|AN10bG3DT|AN9G2',
        'IntensoTablet': 'INM8002KP|INM1010FP|INM805ND|Intenso Tab|TAB1004',
        'IRUTablet': 'M702pro',
        'MegafonTablet': 'MegaFon V9|\\bZTE V9\\b|Android.*\\bMT7A\\b',
        'EbodaTablet': 'E-Boda (Supreme|Impresspeed|Izzycomm|Essential)',
        'AllViewTablet': 'Allview.*(Viva|Alldro|City|Speed|All TV|Frenzy|Quasar|Shine|TX1|AX1|AX2)',
        'ArchosTablet': '\\b(101G9|80G9|A101IT)\\b|Qilive 97R|Archos5|\\bARCHOS (70|79|80|90|97|101|FAMILYPAD|)(b|c|)(G10| Cobalt| TITANIUM(HD|)| Xenon| Neon|XSK| 2| XS 2| PLATINUM| CARBON|GAMEPAD)\\b',
        'AinolTablet': 'NOVO7|NOVO8|NOVO10|Novo7Aurora|Novo7Basic|NOVO7PALADIN|novo9-Spark',
        'NokiaLumiaTablet': 'Lumia 2520',
        'SonyTablet': 'Sony.*Tablet|Xperia Tablet|Sony Tablet S|SO-03E|SGPT12|SGPT13|SGPT114|SGPT121|SGPT122|SGPT123|SGPT111|SGPT112|SGPT113|SGPT131|SGPT132|SGPT133|SGPT211|SGPT212|SGPT213|SGP311|SGP312|SGP321|EBRD1101|EBRD1102|EBRD1201|SGP351|SGP341|SGP511|SGP512|SGP521|SGP541|SGP551|SGP621|SGP612|SOT31',
        'PhilipsTablet': '\\b(PI2010|PI3000|PI3100|PI3105|PI3110|PI3205|PI3210|PI3900|PI4010|PI7000|PI7100)\\b',
        'CubeTablet': 'Android.*(K8GT|U9GT|U10GT|U16GT|U17GT|U18GT|U19GT|U20GT|U23GT|U30GT)|CUBE U8GT',
        'CobyTablet': 'MID1042|MID1045|MID1125|MID1126|MID7012|MID7014|MID7015|MID7034|MID7035|MID7036|MID7042|MID7048|MID7127|MID8042|MID8048|MID8127|MID9042|MID9740|MID9742|MID7022|MID7010',
        'MIDTablet': 'M9701|M9000|M9100|M806|M1052|M806|T703|MID701|MID713|MID710|MID727|MID760|MID830|MID728|MID933|MID125|MID810|MID732|MID120|MID930|MID800|MID731|MID900|MID100|MID820|MID735|MID980|MID130|MID833|MID737|MID960|MID135|MID860|MID736|MID140|MID930|MID835|MID733|MID4X10',
        'MSITablet': 'MSI \\b(Primo 73K|Primo 73L|Primo 81L|Primo 77|Primo 93|Primo 75|Primo 76|Primo 73|Primo 81|Primo 91|Primo 90|Enjoy 71|Enjoy 7|Enjoy 10)\\b',
        'SMiTTablet': 'Android.*(\\bMID\\b|MID-560|MTV-T1200|MTV-PND531|MTV-P1101|MTV-PND530)',
        'RockChipTablet': 'Android.*(RK2818|RK2808A|RK2918|RK3066)|RK2738|RK2808A',
        'FlyTablet': 'IQ310|Fly Vision',
        'bqTablet': 'Android.*(bq)?.*(Elcano|Curie|Edison|Maxwell|Kepler|Pascal|Tesla|Hypatia|Platon|Newton|Livingstone|Cervantes|Avant|Aquaris [E|M]10)|Maxwell.*Lite|Maxwell.*Plus',
        'HuaweiTablet': 'MediaPad|MediaPad 7 Youth|IDEOS S7|S7-201c|S7-202u|S7-101|S7-103|S7-104|S7-105|S7-106|S7-201|S7-Slim',
        'NecTablet': '\\bN-06D|\\bN-08D',
        'PantechTablet': 'Pantech.*P4100',
        'BronchoTablet': 'Broncho.*(N701|N708|N802|a710)',
        'VersusTablet': 'TOUCHPAD.*[78910]|\\bTOUCHTAB\\b',
        'ZyncTablet': 'z1000|Z99 2G|z99|z930|z999|z990|z909|Z919|z900',
        'PositivoTablet': 'TB07STA|TB10STA|TB07FTA|TB10FTA',
        'NabiTablet': 'Android.*\\bNabi',
        'KoboTablet': 'Kobo Touch|\\bK080\\b|\\bVox\\b Build|\\bArc\\b Build',
        'DanewTablet': 'DSlide.*\\b(700|701R|702|703R|704|802|970|971|972|973|974|1010|1012)\\b',
        'TexetTablet': 'NaviPad|TB-772A|TM-7045|TM-7055|TM-9750|TM-7016|TM-7024|TM-7026|TM-7041|TM-7043|TM-7047|TM-8041|TM-9741|TM-9747|TM-9748|TM-9751|TM-7022|TM-7021|TM-7020|TM-7011|TM-7010|TM-7023|TM-7025|TM-7037W|TM-7038W|TM-7027W|TM-9720|TM-9725|TM-9737W|TM-1020|TM-9738W|TM-9740|TM-9743W|TB-807A|TB-771A|TB-727A|TB-725A|TB-719A|TB-823A|TB-805A|TB-723A|TB-715A|TB-707A|TB-705A|TB-709A|TB-711A|TB-890HD|TB-880HD|TB-790HD|TB-780HD|TB-770HD|TB-721HD|TB-710HD|TB-434HD|TB-860HD|TB-840HD|TB-760HD|TB-750HD|TB-740HD|TB-730HD|TB-722HD|TB-720HD|TB-700HD|TB-500HD|TB-470HD|TB-431HD|TB-430HD|TB-506|TB-504|TB-446|TB-436|TB-416|TB-146SE|TB-126SE',
        'PlaystationTablet': 'Playstation.*(Portable|Vita)',
        'TrekstorTablet': 'ST10416-1|VT10416-1|ST70408-1|ST702xx-1|ST702xx-2|ST80208|ST97216|ST70104-2|VT10416-2|ST10216-2A|SurfTab',
        'PyleAudioTablet': '\\b(PTBL10CEU|PTBL10C|PTBL72BC|PTBL72BCEU|PTBL7CEU|PTBL7C|PTBL92BC|PTBL92BCEU|PTBL9CEU|PTBL9CUK|PTBL9C)\\b',
        'AdvanTablet': 'Android.* \\b(E3A|T3X|T5C|T5B|T3E|T3C|T3B|T1J|T1F|T2A|T1H|T1i|E1C|T1-E|T5-A|T4|E1-B|T2Ci|T1-B|T1-D|O1-A|E1-A|T1-A|T3A|T4i)\\b ',
        'DanyTechTablet': 'Genius Tab G3|Genius Tab S2|Genius Tab Q3|Genius Tab G4|Genius Tab Q4|Genius Tab G-II|Genius TAB GII|Genius TAB GIII|Genius Tab S1',
        'GalapadTablet': 'Android.*\\bG1\\b',
        'MicromaxTablet': 'Funbook|Micromax.*\\b(P250|P560|P360|P362|P600|P300|P350|P500|P275)\\b',
        'KarbonnTablet': 'Android.*\\b(A39|A37|A34|ST8|ST10|ST7|Smart Tab3|Smart Tab2)\\b',
        'AllFineTablet': 'Fine7 Genius|Fine7 Shine|Fine7 Air|Fine8 Style|Fine9 More|Fine10 Joy|Fine11 Wide',
        'PROSCANTablet': '\\b(PEM63|PLT1023G|PLT1041|PLT1044|PLT1044G|PLT1091|PLT4311|PLT4311PL|PLT4315|PLT7030|PLT7033|PLT7033D|PLT7035|PLT7035D|PLT7044K|PLT7045K|PLT7045KB|PLT7071KG|PLT7072|PLT7223G|PLT7225G|PLT7777G|PLT7810K|PLT7849G|PLT7851G|PLT7852G|PLT8015|PLT8031|PLT8034|PLT8036|PLT8080K|PLT8082|PLT8088|PLT8223G|PLT8234G|PLT8235G|PLT8816K|PLT9011|PLT9045K|PLT9233G|PLT9735|PLT9760G|PLT9770G)\\b',
        'YONESTablet': 'BQ1078|BC1003|BC1077|RK9702|BC9730|BC9001|IT9001|BC7008|BC7010|BC708|BC728|BC7012|BC7030|BC7027|BC7026',
        'ChangJiaTablet': 'TPC7102|TPC7103|TPC7105|TPC7106|TPC7107|TPC7201|TPC7203|TPC7205|TPC7210|TPC7708|TPC7709|TPC7712|TPC7110|TPC8101|TPC8103|TPC8105|TPC8106|TPC8203|TPC8205|TPC8503|TPC9106|TPC9701|TPC97101|TPC97103|TPC97105|TPC97106|TPC97111|TPC97113|TPC97203|TPC97603|TPC97809|TPC97205|TPC10101|TPC10103|TPC10106|TPC10111|TPC10203|TPC10205|TPC10503',
        'GUTablet': 'TX-A1301|TX-M9002|Q702|kf026',
        'PointOfViewTablet': 'TAB-P506|TAB-navi-7-3G-M|TAB-P517|TAB-P-527|TAB-P701|TAB-P703|TAB-P721|TAB-P731N|TAB-P741|TAB-P825|TAB-P905|TAB-P925|TAB-PR945|TAB-PL1015|TAB-P1025|TAB-PI1045|TAB-P1325|TAB-PROTAB[0-9]+|TAB-PROTAB25|TAB-PROTAB26|TAB-PROTAB27|TAB-PROTAB26XL|TAB-PROTAB2-IPS9|TAB-PROTAB30-IPS9|TAB-PROTAB25XXL|TAB-PROTAB26-IPS10|TAB-PROTAB30-IPS10',
        'OvermaxTablet': 'OV-(SteelCore|NewBase|Basecore|Baseone|Exellen|Quattor|EduTab|Solution|ACTION|BasicTab|TeddyTab|MagicTab|Stream|TB-08|TB-09)',
        'HCLTablet': 'HCL.*Tablet|Connect-3G-2.0|Connect-2G-2.0|ME Tablet U1|ME Tablet U2|ME Tablet G1|ME Tablet X1|ME Tablet Y2|ME Tablet Sync',
        'DPSTablet': 'DPS Dream 9|DPS Dual 7',
        'VistureTablet': 'V97 HD|i75 3G|Visture V4( HD)?|Visture V5( HD)?|Visture V10',
        'CrestaTablet': 'CTP(-)?810|CTP(-)?818|CTP(-)?828|CTP(-)?838|CTP(-)?888|CTP(-)?978|CTP(-)?980|CTP(-)?987|CTP(-)?988|CTP(-)?989',
        'MediatekTablet': '\\bMT8125|MT8389|MT8135|MT8377\\b',
        'ConcordeTablet': 'Concorde([ ]+)?Tab|ConCorde ReadMan',
        'GoCleverTablet': 'GOCLEVER TAB|A7GOCLEVER|M1042|M7841|M742|R1042BK|R1041|TAB A975|TAB A7842|TAB A741|TAB A741L|TAB M723G|TAB M721|TAB A1021|TAB I921|TAB R721|TAB I720|TAB T76|TAB R70|TAB R76.2|TAB R106|TAB R83.2|TAB M813G|TAB I721|GCTA722|TAB I70|TAB I71|TAB S73|TAB R73|TAB R74|TAB R93|TAB R75|TAB R76.1|TAB A73|TAB A93|TAB A93.2|TAB T72|TAB R83|TAB R974|TAB R973|TAB A101|TAB A103|TAB A104|TAB A104.2|R105BK|M713G|A972BK|TAB A971|TAB R974.2|TAB R104|TAB R83.3|TAB A1042',
        'ModecomTablet': 'FreeTAB 9000|FreeTAB 7.4|FreeTAB 7004|FreeTAB 7800|FreeTAB 2096|FreeTAB 7.5|FreeTAB 1014|FreeTAB 1001 |FreeTAB 8001|FreeTAB 9706|FreeTAB 9702|FreeTAB 7003|FreeTAB 7002|FreeTAB 1002|FreeTAB 7801|FreeTAB 1331|FreeTAB 1004|FreeTAB 8002|FreeTAB 8014|FreeTAB 9704|FreeTAB 1003',
        'VoninoTablet': '\\b(Argus[ _]?S|Diamond[ _]?79HD|Emerald[ _]?78E|Luna[ _]?70C|Onyx[ _]?S|Onyx[ _]?Z|Orin[ _]?HD|Orin[ _]?S|Otis[ _]?S|SpeedStar[ _]?S|Magnet[ _]?M9|Primus[ _]?94[ _]?3G|Primus[ _]?94HD|Primus[ _]?QS|Android.*\\bQ8\\b|Sirius[ _]?EVO[ _]?QS|Sirius[ _]?QS|Spirit[ _]?S)\\b',
        'ECSTablet': 'V07OT2|TM105A|S10OT1|TR10CS1',
        'StorexTablet': 'eZee[_\']?(Tab|Go)[0-9]+|TabLC7|Looney Tunes Tab',
        'VodafoneTablet': 'SmartTab([ ]+)?[0-9]+|SmartTabII10|SmartTabII7|VF-1497',
        'EssentielBTablet': 'Smart[ \']?TAB[ ]+?[0-9]+|Family[ \']?TAB2',
        'RossMoorTablet': 'RM-790|RM-997|RMD-878G|RMD-974R|RMT-705A|RMT-701|RME-601|RMT-501|RMT-711',
        'iMobileTablet': 'i-mobile i-note',
        'TolinoTablet': 'tolino tab [0-9.]+|tolino shine',
        'AudioSonicTablet': '\\bC-22Q|T7-QC|T-17B|T-17P\\b',
        'AMPETablet': 'Android.* A78 ',
        'SkkTablet': 'Android.* (SKYPAD|PHOENIX|CYCLOPS)',
        'TecnoTablet': 'TECNO P9',
        'JXDTablet': 'Android.* \\b(F3000|A3300|JXD5000|JXD3000|JXD2000|JXD300B|JXD300|S5800|S7800|S602b|S5110b|S7300|S5300|S602|S603|S5100|S5110|S601|S7100a|P3000F|P3000s|P101|P200s|P1000m|P200m|P9100|P1000s|S6600b|S908|P1000|P300|S18|S6600|S9100)\\b',
        'iJoyTablet': 'Tablet (Spirit 7|Essentia|Galatea|Fusion|Onix 7|Landa|Titan|Scooby|Deox|Stella|Themis|Argon|Unique 7|Sygnus|Hexen|Finity 7|Cream|Cream X2|Jade|Neon 7|Neron 7|Kandy|Scape|Saphyr 7|Rebel|Biox|Rebel|Rebel 8GB|Myst|Draco 7|Myst|Tab7-004|Myst|Tadeo Jones|Tablet Boing|Arrow|Draco Dual Cam|Aurix|Mint|Amity|Revolution|Finity 9|Neon 9|T9w|Amity 4GB Dual Cam|Stone 4GB|Stone 8GB|Andromeda|Silken|X2|Andromeda II|Halley|Flame|Saphyr 9,7|Touch 8|Planet|Triton|Unique 10|Hexen 10|Memphis 4GB|Memphis 8GB|Onix 10)',
        'FX2Tablet': 'FX2 PAD7|FX2 PAD10',
        'XoroTablet': 'KidsPAD 701|PAD[ ]?712|PAD[ ]?714|PAD[ ]?716|PAD[ ]?717|PAD[ ]?718|PAD[ ]?720|PAD[ ]?721|PAD[ ]?722|PAD[ ]?790|PAD[ ]?792|PAD[ ]?900|PAD[ ]?9715D|PAD[ ]?9716DR|PAD[ ]?9718DR|PAD[ ]?9719QR|PAD[ ]?9720QR|TelePAD1030|Telepad1032|TelePAD730|TelePAD731|TelePAD732|TelePAD735Q|TelePAD830|TelePAD9730|TelePAD795|MegaPAD 1331|MegaPAD 1851|MegaPAD 2151',
        'ViewsonicTablet': 'ViewPad 10pi|ViewPad 10e|ViewPad 10s|ViewPad E72|ViewPad7|ViewPad E100|ViewPad 7e|ViewSonic VB733|VB100a',
        'OdysTablet': 'LOOX|XENO10|ODYS[ -](Space|EVO|Xpress|NOON)|\\bXELIO\\b|Xelio10Pro|XELIO7PHONETAB|XELIO10EXTREME|XELIOPT2|NEO_QUAD10',
        'CaptivaTablet': 'CAPTIVA PAD',
        'IconbitTablet': 'NetTAB|NT-3702|NT-3702S|NT-3702S|NT-3603P|NT-3603P|NT-0704S|NT-0704S|NT-3805C|NT-3805C|NT-0806C|NT-0806C|NT-0909T|NT-0909T|NT-0907S|NT-0907S|NT-0902S|NT-0902S',
        'TeclastTablet': 'T98 4G|\\bP80\\b|\\bX90HD\\b|X98 Air|X98 Air 3G|\\bX89\\b|P80 3G|\\bX80h\\b|P98 Air|\\bX89HD\\b|P98 3G|\\bP90HD\\b|P89 3G|X98 3G|\\bP70h\\b|P79HD 3G|G18d 3G|\\bP79HD\\b|\\bP89s\\b|\\bA88\\b|\\bP10HD\\b|\\bP19HD\\b|G18 3G|\\bP78HD\\b|\\bA78\\b|\\bP75\\b|G17s 3G|G17h 3G|\\bP85t\\b|\\bP90\\b|\\bP11\\b|\\bP98t\\b|\\bP98HD\\b|\\bG18d\\b|\\bP85s\\b|\\bP11HD\\b|\\bP88s\\b|\\bA80HD\\b|\\bA80se\\b|\\bA10h\\b|\\bP89\\b|\\bP78s\\b|\\bG18\\b|\\bP85\\b|\\bA70h\\b|\\bA70\\b|\\bG17\\b|\\bP18\\b|\\bA80s\\b|\\bA11s\\b|\\bP88HD\\b|\\bA80h\\b|\\bP76s\\b|\\bP76h\\b|\\bP98\\b|\\bA10HD\\b|\\bP78\\b|\\bP88\\b|\\bA11\\b|\\bA10t\\b|\\bP76a\\b|\\bP76t\\b|\\bP76e\\b|\\bP85HD\\b|\\bP85a\\b|\\bP86\\b|\\bP75HD\\b|\\bP76v\\b|\\bA12\\b|\\bP75a\\b|\\bA15\\b|\\bP76Ti\\b|\\bP81HD\\b|\\bA10\\b|\\bT760VE\\b|\\bT720HD\\b|\\bP76\\b|\\bP73\\b|\\bP71\\b|\\bP72\\b|\\bT720SE\\b|\\bC520Ti\\b|\\bT760\\b|\\bT720VE\\b|T720-3GE|T720-WiFi',
        'OndaTablet': '\\b(V975i|Vi30|VX530|V701|Vi60|V701s|Vi50|V801s|V719|Vx610w|VX610W|V819i|Vi10|VX580W|Vi10|V711s|V813|V811|V820w|V820|Vi20|V711|VI30W|V712|V891w|V972|V819w|V820w|Vi60|V820w|V711|V813s|V801|V819|V975s|V801|V819|V819|V818|V811|V712|V975m|V101w|V961w|V812|V818|V971|V971s|V919|V989|V116w|V102w|V973|Vi40)\\b[\\s]+',
        'JaytechTablet': 'TPC-PA762',
        'BlaupunktTablet': 'Endeavour 800NG|Endeavour 1010',
        'DigmaTablet': '\\b(iDx10|iDx9|iDx8|iDx7|iDxD7|iDxD8|iDsQ8|iDsQ7|iDsQ8|iDsD10|iDnD7|3TS804H|iDsQ11|iDj7|iDs10)\\b',
        'EvolioTablet': 'ARIA_Mini_wifi|Aria[ _]Mini|Evolio X10|Evolio X7|Evolio X8|\\bEvotab\\b|\\bNeura\\b',
        'LavaTablet': 'QPAD E704|\\bIvoryS\\b|E-TAB IVORY|\\bE-TAB\\b',
        'AocTablet': 'MW0811|MW0812|MW0922|MTK8382|MW1031|MW0831|MW0821|MW0931|MW0712',
        'MpmanTablet': 'MP11 OCTA|MP10 OCTA|MPQC1114|MPQC1004|MPQC994|MPQC974|MPQC973|MPQC804|MPQC784|MPQC780|\\bMPG7\\b|MPDCG75|MPDCG71|MPDC1006|MP101DC|MPDC9000|MPDC905|MPDC706HD|MPDC706|MPDC705|MPDC110|MPDC100|MPDC99|MPDC97|MPDC88|MPDC8|MPDC77|MP709|MID701|MID711|MID170|MPDC703|MPQC1010',
        'CelkonTablet': 'CT695|CT888|CT[\\s]?910|CT7 Tab|CT9 Tab|CT3 Tab|CT2 Tab|CT1 Tab|C820|C720|\\bCT-1\\b',
        'WolderTablet': 'miTab \\b(DIAMOND|SPACE|BROOKLYN|NEO|FLY|MANHATTAN|FUNK|EVOLUTION|SKY|GOCAR|IRON|GENIUS|POP|MINT|EPSILON|BROADWAY|JUMP|HOP|LEGEND|NEW AGE|LINE|ADVANCE|FEEL|FOLLOW|LIKE|LINK|LIVE|THINK|FREEDOM|CHICAGO|CLEVELAND|BALTIMORE-GH|IOWA|BOSTON|SEATTLE|PHOENIX|DALLAS|IN 101|MasterChef)\\b',
        'MiTablet': '\\bMI PAD\\b|\\bHM NOTE 1W\\b',
        'NibiruTablet': 'Nibiru M1|Nibiru Jupiter One',
        'NexoTablet': 'NEXO NOVA|NEXO 10|NEXO AVIO|NEXO FREE|NEXO GO|NEXO EVO|NEXO 3G|NEXO SMART|NEXO KIDDO|NEXO MOBI',
        'LeaderTablet': 'TBLT10Q|TBLT10I|TBL-10WDKB|TBL-10WDKBO2013|TBL-W230V2|TBL-W450|TBL-W500|SV572|TBLT7I|TBA-AC7-8G|TBLT79|TBL-8W16|TBL-10W32|TBL-10WKB|TBL-W100',
        'UbislateTablet': 'UbiSlate[\\s]?7C',
        'PocketBookTablet': 'Pocketbook',
        'KocasoTablet': '\\b(TB-1207)\\b',
        'HisenseTablet': '\\b(F5281|E2371)\\b',
        'Hudl': 'Hudl HT7S3|Hudl 2',
        'TelstraTablet': 'T-Hub2',
        'GenericTablet': 'Android.*\\b97D\\b|Tablet(?!.*PC)|BNTV250A|MID-WCDMA|LogicPD Zoom2|\\bA7EB\\b|CatNova8|A1_07|CT704|CT1002|\\bM721\\b|rk30sdk|\\bEVOTAB\\b|M758A|ET904|ALUMIUM10|Smartfren Tab|Endeavour 1010|Tablet-PC-4|Tagi Tab|\\bM6pro\\b|CT1020W|arc 10HD|\\bTP750\\b|\\bQTAQZ3\\b'
      },
      'oss': {
        'AndroidOS': 'Android',
        'BlackBerryOS': 'blackberry|\\bBB10\\b|rim tablet os',
        'PalmOS': 'PalmOS|avantgo|blazer|elaine|hiptop|palm|plucker|xiino',
        'SymbianOS': 'Symbian|SymbOS|Series60|Series40|SYB-[0-9]+|\\bS60\\b',
        'WindowsMobileOS': 'Windows CE.*(PPC|Smartphone|Mobile|[0-9]{3}x[0-9]{3})|Window Mobile|Windows Phone [0-9.]+|WCE;',
        'WindowsPhoneOS': 'Windows Phone 10.0|Windows Phone 8.1|Windows Phone 8.0|Windows Phone OS|XBLWP7|ZuneWP7|Windows NT 6.[23]; ARM;',
        'iOS': '\\biPhone.*Mobile|\\biPod|\\biPad',
        'MeeGoOS': 'MeeGo',
        'MaemoOS': 'Maemo',
        'JavaOS': 'J2ME/|\\bMIDP\\b|\\bCLDC\\b',
        'webOS': 'webOS|hpwOS',
        'badaOS': '\\bBada\\b',
        'BREWOS': 'BREW'
      },
      'uas': {
        'Chrome': '\\bCrMo\\b|CriOS|Android.*Chrome/[.0-9]* (Mobile)?',
        'Dolfin': '\\bDolfin\\b',
        'Opera': 'Opera.*Mini|Opera.*Mobi|Android.*Opera|Mobile.*OPR/[0-9.]+|Coast/[0-9.]+',
        'Skyfire': 'Skyfire',
        'Edge': 'Mobile Safari/[.0-9]* Edge',
        'IE': 'IEMobile|MSIEMobile',
        'Firefox': 'fennec|firefox.*maemo|(Mobile|Tablet).*Firefox|Firefox.*Mobile|FxiOS',
        'Bolt': 'bolt',
        'TeaShark': 'teashark',
        'Blazer': 'Blazer',
        'Safari': 'Version.*Mobile.*Safari|Safari.*Mobile|MobileSafari',
        'UCBrowser': 'UC.*Browser|UCWEB',
        'baiduboxapp': 'baiduboxapp',
        'baidubrowser': 'baidubrowser',
        'DiigoBrowser': 'DiigoBrowser',
        'Puffin': 'Puffin',
        'Mercury': '\\bMercury\\b',
        'ObigoBrowser': 'Obigo',
        'NetFront': 'NF-Browser',
        'GenericBrowser': 'NokiaBrowser|OviBrowser|OneBrowser|TwonkyBeamBrowser|SEMC.*Browser|FlyFlow|Minimo|NetFront|Novarra-Vision|MQQBrowser|MicroMessenger',
        'PaleMoon': 'Android.*PaleMoon|Mobile.*PaleMoon'
      },
      'props': {
        'Mobile': 'Mobile/[VER]',
        'Build': 'Build/[VER]',
        'Version': 'Version/[VER]',
        'VendorID': 'VendorID/[VER]',
        'iPad': 'iPad.*CPU[a-z ]+[VER]',
        'iPhone': 'iPhone.*CPU[a-z ]+[VER]',
        'iPod': 'iPod.*CPU[a-z ]+[VER]',
        'Kindle': 'Kindle/[VER]',
        'Chrome': [
          'Chrome/[VER]',
          'CriOS/[VER]',
          'CrMo/[VER]'
        ],
        'Coast': ['Coast/[VER]'],
        'Dolfin': 'Dolfin/[VER]',
        'Firefox': [
          'Firefox/[VER]',
          'FxiOS/[VER]'
        ],
        'Fennec': 'Fennec/[VER]',
        'Edge': 'Edge/[VER]',
        'IE': [
          'IEMobile/[VER];',
          'IEMobile [VER]',
          'MSIE [VER];',
          'Trident/[0-9.]+;.*rv:[VER]'
        ],
        'NetFront': 'NetFront/[VER]',
        'NokiaBrowser': 'NokiaBrowser/[VER]',
        'Opera': [
          ' OPR/[VER]',
          'Opera Mini/[VER]',
          'Version/[VER]'
        ],
        'Opera Mini': 'Opera Mini/[VER]',
        'Opera Mobi': 'Version/[VER]',
        'UC Browser': 'UC Browser[VER]',
        'MQQBrowser': 'MQQBrowser/[VER]',
        'MicroMessenger': 'MicroMessenger/[VER]',
        'baiduboxapp': 'baiduboxapp/[VER]',
        'baidubrowser': 'baidubrowser/[VER]',
        'SamsungBrowser': 'SamsungBrowser/[VER]',
        'Iron': 'Iron/[VER]',
        'Safari': [
          'Version/[VER]',
          'Safari/[VER]'
        ],
        'Skyfire': 'Skyfire/[VER]',
        'Tizen': 'Tizen/[VER]',
        'Webkit': 'webkit[ /][VER]',
        'PaleMoon': 'PaleMoon/[VER]',
        'Gecko': 'Gecko/[VER]',
        'Trident': 'Trident/[VER]',
        'Presto': 'Presto/[VER]',
        'Goanna': 'Goanna/[VER]',
        'iOS': ' \\bi?OS\\b [VER][ ;]{1}',
        'Android': 'Android [VER]',
        'BlackBerry': [
          'BlackBerry[\\w]+/[VER]',
          'BlackBerry.*Version/[VER]',
          'Version/[VER]'
        ],
        'BREW': 'BREW [VER]',
        'Java': 'Java/[VER]',
        'Windows Phone OS': [
          'Windows Phone OS [VER]',
          'Windows Phone [VER]'
        ],
        'Windows Phone': 'Windows Phone [VER]',
        'Windows CE': 'Windows CE/[VER]',
        'Windows NT': 'Windows NT [VER]',
        'Symbian': [
          'SymbianOS/[VER]',
          'Symbian/[VER]'
        ],
        'webOS': [
          'webOS/[VER]',
          'hpwOS/[VER];'
        ]
      },
      'utils': {
        'Bot': 'Googlebot|facebookexternalhit|AdsBot-Google|Google Keyword Suggestion|Facebot|YandexBot|YandexMobileBot|bingbot|ia_archiver|AhrefsBot|Ezooms|GSLFbot|WBSearchBot|Twitterbot|TweetmemeBot|Twikle|PaperLiBot|Wotbox|UnwindFetchor|Exabot|MJ12bot|YandexImages|TurnitinBot|Pingdom',
        'MobileBot': 'Googlebot-Mobile|AdsBot-Google-Mobile|YahooSeeker/M1A1-R2D2',
        'DesktopMode': 'WPDesktop',
        'TV': 'SonyDTV|HbbTV',
        'WebKit': '(webkit)[ /]([\\w.]+)',
        'Console': '\\b(Nintendo|Nintendo WiiU|Nintendo 3DS|PLAYSTATION|Xbox)\\b',
        'Watch': 'SM-V700'
      }
    };
    // following patterns come from http://detectmobilebrowsers.com/
    impl.detectMobileBrowsers = {
      fullPattern: /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,
      shortPattern: /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,
      tabletPattern: /android|ipad|playbook|silk/i
    };
    var hasOwnProp = Object.prototype.hasOwnProperty, isArray;
    impl.FALLBACK_PHONE = 'UnknownPhone';
    impl.FALLBACK_TABLET = 'UnknownTablet';
    impl.FALLBACK_MOBILE = 'UnknownMobile';
    isArray = 'isArray' in Array ? Array.isArray : function (value) {
      return Object.prototype.toString.call(value) === '[object Array]';
    };
    function equalIC(a, b) {
      return a !== null && b !== null && a.toLowerCase() === b.toLowerCase();
    }
    function containsIC(array, value) {
      var valueLC, i, len = array.length;
      if (!len || !value) {
        return false;
      }
      valueLC = value.toLowerCase();
      for (i = 0; i < len; ++i) {
        if (valueLC === array[i].toLowerCase()) {
          return true;
        }
      }
      return false;
    }
    function convertPropsToRegExp(object) {
      for (var key in object) {
        if (hasOwnProp.call(object, key)) {
          object[key] = new RegExp(object[key], 'i');
        }
      }
    }
    (function init() {
      var key, values, value, i, len, verPos, mobileDetectRules = impl.mobileDetectRules;
      for (key in mobileDetectRules.props) {
        if (hasOwnProp.call(mobileDetectRules.props, key)) {
          values = mobileDetectRules.props[key];
          if (!isArray(values)) {
            values = [values];
          }
          len = values.length;
          for (i = 0; i < len; ++i) {
            value = values[i];
            verPos = value.indexOf('[VER]');
            if (verPos >= 0) {
              value = value.substring(0, verPos) + '([\\w._\\+]+)' + value.substring(verPos + 5);
            }
            values[i] = new RegExp(value, 'i');
          }
          mobileDetectRules.props[key] = values;
        }
      }
      convertPropsToRegExp(mobileDetectRules.oss);
      convertPropsToRegExp(mobileDetectRules.phones);
      convertPropsToRegExp(mobileDetectRules.tablets);
      convertPropsToRegExp(mobileDetectRules.uas);
      convertPropsToRegExp(mobileDetectRules.utils);
      // copy some patterns to oss0 which are tested first (see issue#15)
      mobileDetectRules.oss0 = {
        WindowsPhoneOS: mobileDetectRules.oss.WindowsPhoneOS,
        WindowsMobileOS: mobileDetectRules.oss.WindowsMobileOS
      };
    }());
    /**
     * Test userAgent string against a set of rules and find the first matched key.
     * @param {Object} rules (key is String, value is RegExp)
     * @param {String} userAgent the navigator.userAgent (or HTTP-Header 'User-Agent').
     * @returns {String|null} the matched key if found, otherwise <tt>null</tt>
     * @private
     */
    impl.findMatch = function (rules, userAgent) {
      for (var key in rules) {
        if (hasOwnProp.call(rules, key)) {
          if (rules[key].test(userAgent)) {
            return key;
          }
        }
      }
      return null;
    };
    /**
     * Test userAgent string against a set of rules and return an array of matched keys.
     * @param {Object} rules (key is String, value is RegExp)
     * @param {String} userAgent the navigator.userAgent (or HTTP-Header 'User-Agent').
     * @returns {Array} an array of matched keys, may be empty when there is no match, but not <tt>null</tt>
     * @private
     */
    impl.findMatches = function (rules, userAgent) {
      var result = [];
      for (var key in rules) {
        if (hasOwnProp.call(rules, key)) {
          if (rules[key].test(userAgent)) {
            result.push(key);
          }
        }
      }
      return result;
    };
    /**
     * Check the version of the given property in the User-Agent.
     *
     * @param {String} propertyName
     * @param {String} userAgent
     * @return {String} version or <tt>null</tt> if version not found
     * @private
     */
    impl.getVersionStr = function (propertyName, userAgent) {
      var props = impl.mobileDetectRules.props, patterns, i, len, match;
      if (hasOwnProp.call(props, propertyName)) {
        patterns = props[propertyName];
        len = patterns.length;
        for (i = 0; i < len; ++i) {
          match = patterns[i].exec(userAgent);
          if (match !== null) {
            return match[1];
          }
        }
      }
      return null;
    };
    /**
     * Check the version of the given property in the User-Agent.
     * Will return a float number. (eg. 2_0 will return 2.0, 4.3.1 will return 4.31)
     *
     * @param {String} propertyName
     * @param {String} userAgent
     * @return {Number} version or <tt>NaN</tt> if version not found
     * @private
     */
    impl.getVersion = function (propertyName, userAgent) {
      var version = impl.getVersionStr(propertyName, userAgent);
      return version ? impl.prepareVersionNo(version) : NaN;
    };
    /**
     * Prepare the version number.
     *
     * @param {String} version
     * @return {Number} the version number as a floating number
     * @private
     */
    impl.prepareVersionNo = function (version) {
      var numbers;
      numbers = version.split(/[a-z._ \/\-]/i);
      if (numbers.length === 1) {
        version = numbers[0];
      }
      if (numbers.length > 1) {
        version = numbers[0] + '.';
        numbers.shift();
        version += numbers.join('');
      }
      return Number(version);
    };
    impl.isMobileFallback = function (userAgent) {
      return impl.detectMobileBrowsers.fullPattern.test(userAgent) || impl.detectMobileBrowsers.shortPattern.test(userAgent.substr(0, 4));
    };
    impl.isTabletFallback = function (userAgent) {
      return impl.detectMobileBrowsers.tabletPattern.test(userAgent);
    };
    impl.prepareDetectionCache = function (cache, userAgent, maxPhoneWidth) {
      if (cache.mobile !== undefined) {
        return;
      }
      var phone, tablet, phoneSized;
      // first check for stronger tablet rules, then phone (see issue#5)
      tablet = impl.findMatch(impl.mobileDetectRules.tablets, userAgent);
      if (tablet) {
        cache.mobile = cache.tablet = tablet;
        cache.phone = null;
        return;  // unambiguously identified as tablet
      }
      phone = impl.findMatch(impl.mobileDetectRules.phones, userAgent);
      if (phone) {
        cache.mobile = cache.phone = phone;
        cache.tablet = null;
        return;  // unambiguously identified as phone
      }
      // our rules haven't found a match -> try more general fallback rules
      if (impl.isMobileFallback(userAgent)) {
        phoneSized = MobileDetect.isPhoneSized(maxPhoneWidth);
        if (phoneSized === undefined) {
          cache.mobile = impl.FALLBACK_MOBILE;
          cache.tablet = cache.phone = null;
        } else if (phoneSized) {
          cache.mobile = cache.phone = impl.FALLBACK_PHONE;
          cache.tablet = null;
        } else {
          cache.mobile = cache.tablet = impl.FALLBACK_TABLET;
          cache.phone = null;
        }
      } else if (impl.isTabletFallback(userAgent)) {
        cache.mobile = cache.tablet = impl.FALLBACK_TABLET;
        cache.phone = null;
      } else {
        // not mobile at all!
        cache.mobile = cache.tablet = cache.phone = null;
      }
    };
    // t is a reference to a MobileDetect instance
    impl.mobileGrade = function (t) {
      // impl note:
      // To keep in sync w/ Mobile_Detect.php easily, the following code is tightly aligned to the PHP version.
      // When changes are made in Mobile_Detect.php, copy this method and replace:
      //     $this-> / t.
      //     self::MOBILE_GRADE_(.) / '$1'
      //     , self::VERSION_TYPE_FLOAT / (nothing)
      //     isIOS() / os('iOS')
      //     [reg] / (nothing)   <-- jsdelivr complaining about unescaped unicode character U+00AE
      var $isMobile = t.mobile() !== null;
      if (// Apple iOS 3.2-5.1 - Tested on the original iPad (4.3 / 5.0), iPad 2 (4.3), iPad 3 (5.1), original iPhone (3.1), iPhone 3 (3.2), 3GS (4.3), 4 (4.3 / 5.0), and 4S (5.1)
        t.os('iOS') && t.version('iPad') >= 4.3 || t.os('iOS') && t.version('iPhone') >= 3.1 || t.os('iOS') && t.version('iPod') >= 3.1 || t.version('Android') > 2.1 && t.is('Webkit') || // Windows Phone 7-7.5 - Tested on the HTC Surround (7.0) HTC Trophy (7.5), LG-E900 (7.5), Nokia Lumia 800
        t.version('Windows Phone OS') >= 7 || // Blackberry 7 - Tested on BlackBerry Torch 9810
        // Blackberry 6.0 - Tested on the Torch 9800 and Style 9670
        t.is('BlackBerry') && t.version('BlackBerry') >= 6 || // Blackberry Playbook (1.0-2.0) - Tested on PlayBook
        t.match('Playbook.*Tablet') || t.version('webOS') >= 1.4 && t.match('Palm|Pre|Pixi') || // Palm WebOS 3.0  - Tested on HP TouchPad
        t.match('hp.*TouchPad') || t.is('Firefox') && t.version('Firefox') >= 12 || t.is('Chrome') && t.is('AndroidOS') && t.version('Android') >= 4 || t.is('Skyfire') && t.version('Skyfire') >= 4.1 && t.is('AndroidOS') && t.version('Android') >= 2.3 || t.is('Opera') && t.version('Opera Mobi') > 11 && t.is('AndroidOS') || // Meego 1.2 - Tested on Nokia 950 and N9
        t.is('MeeGoOS') || // Tizen (pre-release) - Tested on early hardware
        t.is('Tizen') || // Samsung Bada 2.0 - Tested on a Samsung Wave 3, Dolphin browser
        // @todo: more tests here!
        t.is('Dolfin') && t.version('Bada') >= 2 || (t.is('UC Browser') || t.is('Dolfin')) && t.version('Android') >= 2.3 || (t.match('Kindle Fire') || t.is('Kindle') && t.version('Kindle') >= 3) || // Nook Color 1.4.1 - Tested on original Nook Color, not Nook Tablet
        t.is('AndroidOS') && t.is('NookTablet') || // Chrome Desktop 11-21 - Tested on OS X 10.7 and Windows 7
        t.version('Chrome') >= 11 && !$isMobile || // Safari Desktop 4-5 - Tested on OS X 10.7 and Windows 7
        t.version('Safari') >= 5 && !$isMobile || // Firefox Desktop 4-13 - Tested on OS X 10.7 and Windows 7
        t.version('Firefox') >= 4 && !$isMobile || // Internet Explorer 7-9 - Tested on Windows XP, Vista and 7
        t.version('MSIE') >= 7 && !$isMobile || // Opera Desktop 10-12 - Tested on OS X 10.7 and Windows 7
        // @reference: http://my.opera.com/community/openweb/idopera/
        t.version('Opera') >= 10 && !$isMobile) {
        return 'A';
      }
      if (t.os('iOS') && t.version('iPad') < 4.3 || t.os('iOS') && t.version('iPhone') < 3.1 || t.os('iOS') && t.version('iPod') < 3.1 || // Blackberry 5.0: Tested on the Storm 2 9550, Bold 9770
        t.is('Blackberry') && t.version('BlackBerry') >= 5 && t.version('BlackBerry') < 6 || t.version('Opera Mini') >= 5 && t.version('Opera Mini') <= 6.5 && (t.version('Android') >= 2.3 || t.is('iOS')) || // Nokia Symbian^3 - Tested on Nokia N8 (Symbian^3), C7 (Symbian^3), also works on N97 (Symbian^1)
        t.match('NokiaN8|NokiaC7|N97.*Series60|Symbian/3') || // @todo: report this (tested on Nokia N71)
        t.version('Opera Mobi') >= 11 && t.is('SymbianOS')) {
        return 'B';
      }
      if (// Blackberry 4.x - Tested on the Curve 8330
        t.version('BlackBerry') < 5 || // Windows Mobile - Tested on the HTC Leo (WinMo 5.2)
        t.match('MSIEMobile|Windows CE.*Mobile') || t.version('Windows Mobile') <= 5.2) {
        return 'C';
      }
      //All older smartphone platforms and featurephones - Any device that doesn't support media queries
      //will receive the basic, C grade experience.
      return 'C';
    };
    impl.detectOS = function (ua) {
      return impl.findMatch(impl.mobileDetectRules.oss0, ua) || impl.findMatch(impl.mobileDetectRules.oss, ua);
    };
    impl.getDeviceSmallerSide = function () {
      return window.screen.width < window.screen.height ? window.screen.width : window.screen.height;
    };
    MobileDetect.prototype = {
      constructor: MobileDetect,
      /**
       * Returns the detected phone or tablet type or <tt>null</tt> if it is not a mobile device.
       * <br>
       * For a list of possible return values see {@link MobileDetect#phone} and {@link MobileDetect#tablet}.<br>
       * <br>
       * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
       * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
       * is positive, a value of <code>UnknownPhone</code>, <code>UnknownTablet</code> or
       * <code>UnknownMobile</code> is returned.<br>
       * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
       * <br>
       * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
       * and <code>UnknownMobile</code>, so you will get <code>UnknownMobile</code> here.<br>
       * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
       * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
       * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
       * <br>
       * In most cases you will use the return value just as a boolean.
       *
       * @returns {String} the key for the phone family or tablet family, e.g. "Nexus".
       * @function MobileDetect#mobile
       */
      mobile: function () {
        impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
        return this._cache.mobile;
      },
      /**
       * Returns the detected phone type/family string or <tt>null</tt>.
       * <br>
       * The returned tablet (family or producer) is one of following keys:<br>
       * <br><tt>iPhone, BlackBerry, HTC, Nexus, Dell, Motorola, Samsung, LG, Sony, Asus,
       * NokiaLumia, Micromax, Palm, Vertu, Pantech, Fly, Wiko, iMobile, SimValley,
       * Wolfgang, Alcatel, Nintendo, Amoi, INQ, GenericPhone</tt><br>
       * <br>
       * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
       * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
       * is positive, a value of <code>UnknownPhone</code> or <code>UnknownMobile</code> is returned.<br>
       * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
       * <br>
       * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
       * and <code>UnknownMobile</code>, so you will get <code>null</code> here, while {@link MobileDetect#mobile}
       * will return <code>UnknownMobile</code>.<br>
       * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
       * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
       * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
       * <br>
       * In most cases you will use the return value just as a boolean.
       *
       * @returns {String} the key of the phone family or producer, e.g. "iPhone"
       * @function MobileDetect#phone
       */
      phone: function () {
        impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
        return this._cache.phone;
      },
      /**
       * Returns the detected tablet type/family string or <tt>null</tt>.
       * <br>
       * The returned tablet (family or producer) is one of following keys:<br>
       * <br><tt>iPad, NexusTablet, SamsungTablet, Kindle, SurfaceTablet, HPTablet, AsusTablet,
       * BlackBerryTablet, HTCtablet, MotorolaTablet, NookTablet, AcerTablet,
       * ToshibaTablet, LGTablet, FujitsuTablet, PrestigioTablet, LenovoTablet,
       * DellTablet, YarvikTablet, MedionTablet, ArnovaTablet, IntensoTablet, IRUTablet,
       * MegafonTablet, EbodaTablet, AllViewTablet, ArchosTablet, AinolTablet,
       * NokiaLumiaTablet, SonyTablet, PhilipsTablet, CubeTablet, CobyTablet, MIDTablet,
       * MSITablet, SMiTTablet, RockChipTablet, FlyTablet, bqTablet, HuaweiTablet,
       * NecTablet, PantechTablet, BronchoTablet, VersusTablet, ZyncTablet,
       * PositivoTablet, NabiTablet, KoboTablet, DanewTablet, TexetTablet,
       * PlaystationTablet, TrekstorTablet, PyleAudioTablet, AdvanTablet,
       * DanyTechTablet, GalapadTablet, MicromaxTablet, KarbonnTablet, AllFineTablet,
       * PROSCANTablet, YONESTablet, ChangJiaTablet, GUTablet, PointOfViewTablet,
       * OvermaxTablet, HCLTablet, DPSTablet, VistureTablet, CrestaTablet,
       * MediatekTablet, ConcordeTablet, GoCleverTablet, ModecomTablet, VoninoTablet,
       * ECSTablet, StorexTablet, VodafoneTablet, EssentielBTablet, RossMoorTablet,
       * iMobileTablet, TolinoTablet, AudioSonicTablet, AMPETablet, SkkTablet,
       * TecnoTablet, JXDTablet, iJoyTablet, FX2Tablet, XoroTablet, ViewsonicTablet,
       * OdysTablet, CaptivaTablet, IconbitTablet, TeclastTablet, OndaTablet,
       * JaytechTablet, BlaupunktTablet, DigmaTablet, EvolioTablet, LavaTablet,
       * AocTablet, MpmanTablet, CelkonTablet, WolderTablet, MiTablet, NibiruTablet,
       * NexoTablet, LeaderTablet, UbislateTablet, PocketBookTablet, KocasoTablet,
       * HisenseTablet, Hudl, TelstraTablet, GenericTablet</tt><br>
       * <br>
       * If the device is not detected by the regular expressions from Mobile-Detect, a test is made against
       * the patterns of <a href="http://detectmobilebrowsers.com/">detectmobilebrowsers.com</a>. If this test
       * is positive, a value of <code>UnknownTablet</code> or <code>UnknownMobile</code> is returned.<br>
       * When used in browser, the decision whether phone or tablet is made based on <code>screen.width/height</code>.<br>
       * <br>
       * When used server-side (node.js), there is no way to tell the difference between <code>UnknownTablet</code>
       * and <code>UnknownMobile</code>, so you will get <code>null</code> here, while {@link MobileDetect#mobile}
       * will return <code>UnknownMobile</code>.<br>
       * Be aware that since v1.0.0 in this special case you will get <code>UnknownMobile</code> only for:
       * {@link MobileDetect#mobile}, not for {@link MobileDetect#phone} and {@link MobileDetect#tablet}.
       * In versions before v1.0.0 all 3 methods returned <code>UnknownMobile</code> which was tedious to use.
       * <br>
       * In most cases you will use the return value just as a boolean.
       *
       * @returns {String} the key of the tablet family or producer, e.g. "SamsungTablet"
       * @function MobileDetect#tablet
       */
      tablet: function () {
        impl.prepareDetectionCache(this._cache, this.ua, this.maxPhoneWidth);
        return this._cache.tablet;
      },
      /**
       * Returns the (first) detected user-agent string or <tt>null</tt>.
       * <br>
       * The returned user-agent is one of following keys:<br>
       * <br><tt>Chrome, Dolfin, Opera, Skyfire, Edge, IE, Firefox, Bolt, TeaShark, Blazer,
       * Safari, UCBrowser, baiduboxapp, baidubrowser, DiigoBrowser, Puffin, Mercury,
       * ObigoBrowser, NetFront, GenericBrowser, PaleMoon</tt><br>
       * <br>
       * In most cases calling {@link MobileDetect#userAgent} will be sufficient. But there are rare
       * cases where a mobile device pretends to be more than one particular browser. You can get the
       * list of all matches with {@link MobileDetect#userAgents} or check for a particular value by
       * providing one of the defined keys as first argument to {@link MobileDetect#is}.
       *
       * @returns {String} the key for the detected user-agent or <tt>null</tt>
       * @function MobileDetect#userAgent
       */
      userAgent: function () {
        if (this._cache.userAgent === undefined) {
          this._cache.userAgent = impl.findMatch(impl.mobileDetectRules.uas, this.ua);
        }
        return this._cache.userAgent;
      },
      /**
       * Returns all detected user-agent strings.
       * <br>
       * The array is empty or contains one or more of following keys:<br>
       * <br><tt>Chrome, Dolfin, Opera, Skyfire, Edge, IE, Firefox, Bolt, TeaShark, Blazer,
       * Safari, UCBrowser, baiduboxapp, baidubrowser, DiigoBrowser, Puffin, Mercury,
       * ObigoBrowser, NetFront, GenericBrowser, PaleMoon</tt><br>
       * <br>
       * In most cases calling {@link MobileDetect#userAgent} will be sufficient. But there are rare
       * cases where a mobile device pretends to be more than one particular browser. You can get the
       * list of all matches with {@link MobileDetect#userAgents} or check for a particular value by
       * providing one of the defined keys as first argument to {@link MobileDetect#is}.
       *
       * @returns {Array} the array of detected user-agent keys or <tt>[]</tt>
       * @function MobileDetect#userAgents
       */
      userAgents: function () {
        if (this._cache.userAgents === undefined) {
          this._cache.userAgents = impl.findMatches(impl.mobileDetectRules.uas, this.ua);
        }
        return this._cache.userAgents;
      },
      /**
       * Returns the detected operating system string or <tt>null</tt>.
       * <br>
       * The operating system is one of following keys:<br>
       * <br><tt>AndroidOS, BlackBerryOS, PalmOS, SymbianOS, WindowsMobileOS, WindowsPhoneOS,
       * iOS, MeeGoOS, MaemoOS, JavaOS, webOS, badaOS, BREWOS</tt><br>
       *
       * @returns {String} the key for the detected operating system.
       * @function MobileDetect#os
       */
      os: function () {
        if (this._cache.os === undefined) {
          this._cache.os = impl.detectOS(this.ua);
        }
        return this._cache.os;
      },
      /**
       * Get the version (as Number) of the given property in the User-Agent.
       * <br>
       * Will return a float number. (eg. 2_0 will return 2.0, 4.3.1 will return 4.31)
       *
       * @param {String} key a key defining a thing which has a version.<br>
       *        You can use one of following keys:<br>
       * <br><tt>Mobile, Build, Version, VendorID, iPad, iPhone, iPod, Kindle, Chrome, Coast,
       * Dolfin, Firefox, Fennec, Edge, IE, NetFront, NokiaBrowser, Opera, Opera Mini,
       * Opera Mobi, UC Browser, MQQBrowser, MicroMessenger, baiduboxapp, baidubrowser,
       * SamsungBrowser, Iron, Safari, Skyfire, Tizen, Webkit, PaleMoon, Gecko, Trident,
       * Presto, Goanna, iOS, Android, BlackBerry, BREW, Java, Windows Phone OS, Windows
       * Phone, Windows CE, Windows NT, Symbian, webOS</tt><br>
       *
       * @returns {Number} the version as float or <tt>NaN</tt> if User-Agent doesn't contain this version.
       *          Be careful when comparing this value with '==' operator!
       * @function MobileDetect#version
       */
      version: function (key) {
        return impl.getVersion(key, this.ua);
      },
      /**
       * Get the version (as String) of the given property in the User-Agent.
       * <br>
       *
       * @param {String} key a key defining a thing which has a version.<br>
       *        You can use one of following keys:<br>
       * <br><tt>Mobile, Build, Version, VendorID, iPad, iPhone, iPod, Kindle, Chrome, Coast,
       * Dolfin, Firefox, Fennec, Edge, IE, NetFront, NokiaBrowser, Opera, Opera Mini,
       * Opera Mobi, UC Browser, MQQBrowser, MicroMessenger, baiduboxapp, baidubrowser,
       * SamsungBrowser, Iron, Safari, Skyfire, Tizen, Webkit, PaleMoon, Gecko, Trident,
       * Presto, Goanna, iOS, Android, BlackBerry, BREW, Java, Windows Phone OS, Windows
       * Phone, Windows CE, Windows NT, Symbian, webOS</tt><br>
       *
       * @returns {String} the "raw" version as String or <tt>null</tt> if User-Agent doesn't contain this version.
       *
       * @function MobileDetect#versionStr
       */
      versionStr: function (key) {
        return impl.getVersionStr(key, this.ua);
      },
      /**
       * Global test key against userAgent, os, phone, tablet and some other properties of userAgent string.
       *
       * @param {String} key the key (case-insensitive) of a userAgent, an operating system, phone or
       *        tablet family.<br>
       *        For a complete list of possible values, see {@link MobileDetect#userAgent},
       *        {@link MobileDetect#os}, {@link MobileDetect#phone}, {@link MobileDetect#tablet}.<br>
       *        Additionally you have following keys:<br>
       * <br><tt>Bot, MobileBot, DesktopMode, TV, WebKit, Console, Watch</tt><br>
       *
       * @returns {boolean} <tt>true</tt> when the given key is one of the defined keys of userAgent, os, phone,
       *                    tablet or one of the listed additional keys, otherwise <tt>false</tt>
       * @function MobileDetect#is
       */
      is: function (key) {
        return containsIC(this.userAgents(), key) || equalIC(key, this.os()) || equalIC(key, this.phone()) || equalIC(key, this.tablet()) || containsIC(impl.findMatches(impl.mobileDetectRules.utils, this.ua), key);
      },
      /**
       * Do a quick test against navigator::userAgent.
       *
       * @param {String|RegExp} pattern the pattern, either as String or RegExp
       *                        (a string will be converted to a case-insensitive RegExp).
       * @returns {boolean} <tt>true</tt> when the pattern matches, otherwise <tt>false</tt>
       * @function MobileDetect#match
       */
      match: function (pattern) {
        if (!(pattern instanceof RegExp)) {
          pattern = new RegExp(pattern, 'i');
        }
        return pattern.test(this.ua);
      },
      /**
       * Checks whether the mobile device can be considered as phone regarding <code>screen.width</code>.
       * <br>
       * Obviously this method makes sense in browser environments only (not for Node.js)!
       * @param {number} [maxPhoneWidth] the maximum logical pixels (aka. CSS-pixels) to be considered as phone.<br>
       *        The argument is optional and if not present or falsy, the value of the constructor is taken.
       * @returns {boolean|undefined} <code>undefined</code> if screen size wasn't detectable, else <code>true</code>
       *          when screen.width is less or equal to maxPhoneWidth, otherwise <code>false</code>.<br>
       *          Will always return <code>undefined</code> server-side.
       */
      isPhoneSized: function (maxPhoneWidth) {
        return MobileDetect.isPhoneSized(maxPhoneWidth || this.maxPhoneWidth);
      },
      /**
       * Returns the mobile grade ('A', 'B', 'C').
       *
       * @returns {String} one of the mobile grades ('A', 'B', 'C').
       * @function MobileDetect#mobileGrade
       */
      mobileGrade: function () {
        if (this._cache.grade === undefined) {
          this._cache.grade = impl.mobileGrade(this);
        }
        return this._cache.grade;
      }
    };
    // environment-dependent
    if (typeof window !== 'undefined' && window.screen) {
      MobileDetect.isPhoneSized = function (maxPhoneWidth) {
        return maxPhoneWidth < 0 ? undefined : impl.getDeviceSmallerSide() <= maxPhoneWidth;
      };
    } else {
      MobileDetect.isPhoneSized = function () {
      };
    }
    // should not be replaced by a completely new object - just overwrite existing methods
    MobileDetect._impl = impl;
    return MobileDetect;
  }();
  detect_device = function (MobileDetect) {
    var md = new MobileDetect(window.navigator.userAgent);
    return function getDevise() {
      var device = 'pc';
      if (md.mobile() !== null) {
        device = 'oh';
        if (md.phone() !== null) {
          if (md.is('iPhone')) {
            device = 'ap';
          } else if (md.is('AndroidOS')) {
            device = 'np';
          } else if (md.is('WindowsMobileOS') || md.is('WindowsPhoneOS')) {
            device = 'wp';
          }
        } else if (md.tablet() !== null) {
          if (md.is('iOS')) {
            device = 'at';
          } else if (md.is('AndroidOS')) {
            device = 'nt';
          } else if (md.is('WindowsMobileOS') || md.is('WindowsPhoneOS')) {
            device = 'wt';
          }
        }
      }
      if (md.is('bot')) {
        device = 'bt';
      }
      return device;
    };
  }(mobile_detect);
  detect_browser = function (MobileDetect) {
    var md = new MobileDetect(window.navigator.userAgent);
    return function () {
      this.isOldIE = false;
      this.IE7 = false;
    };
  }(mobile_detect);
  json3 = function () {
    var JSON = window.JSON || {};
    JSON.stringify = JSON.stringify || function (obj) {
      var t = typeof obj;
      if (t !== 'object' || obj === null) {
        if (t === 'string') {
          obj = '"' + obj + '"';
        }
        return String(obj);
      } else {
        var n, v, json = [], arr = obj && obj.constructor === Array;
        for (n in obj) {
          v = obj[n];
          t = typeof v;
          if (t === 'string') {
            v = '"' + v + '"';
          } else if (t === 'object' && v !== null) {
            v = this.stringify(v);
          }
          json.push((arr ? '' : '"' + n + '":') + String(v));
        }
        return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}');
      }
    };
    JSON.parse = JSON.parse || function (str) {
      if (str === '') {
        str = '""';
      }
      eval('var p=' + str + ';');
      return p;
    };
    return JSON;
  }();
  user_history_test = function (JSON) {
    return function () {
      var storageTest = function (test) {
        JSON.parse('{}');
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
      };
      var test = function () {
        try {
          storageTest('test');
          return true;
        } catch (e) {
          return false;
        }
      };
      var result = test();
      return result;
    };
  }(json3);
  user_history_fixed_queue = function (_) {
    var FixedArray = function () {
    };
    FixedArray.prototype = Function.prototype;
    FixedArray.prototype.add = function (arg1, arg2) {
      arg2 = arg2 || false;
      if (arg2) {
        if (arg1 < this.fixedSize) {
          this[arg1] = arg2;
        }
      } else {
        if (this.indexOf(arg1) < 0) {
          this.push(arg1);
        }
      }
      if (this.length <= this.fixedSize) {
        return;
      }
      Array.prototype.splice.call(this, 0, this.length - this.fixedSize);
    };
    FixedArray.prototype.load = function (arg1, arg2) {
      arg2 = arg2 || false;
      if (arg2) {
        if (arg1 < this.fixedSize) {
          this[arg1] = arg2;
        }
      } else {
        if (this.indexOf(arg1) < 0) {
          this.push(arg1);
        }
      }
      if (this.length <= this.fixedSize) {
        return;
      }
      Array.prototype.splice.call(this, 0, this.length - this.fixedSize);
    };
    FixedArray.prototype.get = function () {
      Array.prototype.splice.call(this, 0, this.length - this.fixedSize);
      return this.join(';');
    };
    var FixedQueue = function (size) {
      FixedArray.prototype.fixedSize = size;
      var queue = new FixedArray();
      return queue;
    };
    return FixedQueue;
  }(underscore);
  user_history_exclude_offers = function (_) {
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
      countViews = countViews || 1;
      if (_.isNumber(this[guid])) {
        if (this.invert()) {
          this[guid] = ++this[guid];
        } else {
          if (this[guid] > 0) {
            this[guid] = --this[guid];
          } else {
            this[guid] = 0;
          }
        }
      } else {
        if (this.invert()) {
          this[guid] = countViews;
        } else {
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
              keys.push([
                key.replace(/\D/g, ''),
                value
              ]);
            } else {
              keys.push(key.replace(/\D/g, ''));
            }
          }
        } else {
          if (value <= 0) {
            if (uh.counter()) {
              keys.push([
                key.replace(/\D/g, ''),
                value
              ]);
            } else {
              keys.push(key.replace(/\D/g, ''));
            }
          }
        }
      });
      return keys;
    };
    return ExcludeOffers;
  }(underscore);
  user_history_retargeting_offers = function (_) {
    var RetargetingOffers = function () {
    };
    RetargetingOffers.prototype.add = function (guid, arg1, arg2, arg3, arg4) {
      this[guid] = [
        arg1,
        arg2,
        arg3,
        arg4
      ];
    };
    RetargetingOffers.prototype.load = function (guid, arg1) {
      if (_.isArray(arg1)) {
        if (_.isUndefined(arg1[3])) {
          arg1[3] = arg1[0];
        }
        this[guid] = [
          arg1[0],
          arg1[1],
          arg1[2],
          arg1[3]
        ];
      }
    };
    RetargetingOffers.prototype.remove = function (key) {
      delete this[key];
    };
    RetargetingOffers.prototype.get = function () {
      var x;
      var keys = [];
      var res = [];
      var time = Math.floor(Date.now());
      for (var key in this) {
        var value = this[key];
        if (value[0] > time) {
          keys.push([
            key.split('...')[0],
            this[key][2],
            this[key][1],
            parseInt(this[key][3]),
            Math.abs(new Date(Math.floor(Date.now())).getDate() - new Date(this[key][3] * 1000).getDate())
          ]);
        }
      }
      keys.sort(function (a, b) {
        if (a[3] < b[3]) {
          return -1;
        }
        if (a[3] > b[3]) {
          return 1;
        }
        return 0;
      });
      for (x in keys) {
        if (typeof keys[x] !== 'function') {
          res.push([
            keys[x][0],
            keys[x][2],
            keys[x][4]
          ]);
        }
      }
      return res;
    };
    return RetargetingOffers;
  }(underscore);
  user_history_gender_account = function (_) {
    var GenderAccount = function () {
    };
    GenderAccount.prototype.add = function (guid, val) {
      var hit_log = new Array(0, 0, 0);
      if (_.isUndefined(this[guid])) {
        hit_log[val] += 1;
        this[guid] = [
          val,
          hit_log
        ];
      } else {
        hit_log = this[guid][1];
        hit_log[val] += 1;
        hit_log[0] = 1;
        this[guid] = [
          _.indexOf(hit_log, _.max(hit_log)),
          hit_log
        ];
      }
      if (this[guid][0] < 0) {
        this[guid][0] = 0;
      }
    };
    GenderAccount.prototype.get = function () {
      var res = [];
      _.each(this, function (element, name, uh) {
        if (!_.isEmpty(element)) {
          res.push([name + '~' + element[0]]);
        }
      });
      return res.join(';');
    };
    GenderAccount.prototype.load = function (guid, arg1) {
      if (_.isArray(arg1)) {
        this[guid] = [
          arg1[0],
          arg1[1]
        ];
      }
    };
    return GenderAccount;
  }(underscore);
  user_history_gender_user = function (_) {
    var GenderUser = function () {
    };
    GenderUser.prototype.add = function (val) {
      var hit_log = new Array(0, 0, 0);
      if (_.isUndefined(this['gender'])) {
        this['gender'] = val;
        hit_log[val] += 1;
        this['hit_log'] = hit_log;
      } else {
        if (_.isArray(this['hit_log'])) {
          hit_log = this['hit_log'];
          hit_log[val] += 1;
          hit_log[0] = 1;
          this['hit_log'] = hit_log;
          this['gender'] = _.indexOf(hit_log, _.max(hit_log));
        }
      }
      if (this['gender'] < 0) {
        this['gender'] = 0;
      }
    };
    GenderUser.prototype.get = function () {
      var res = 0;
      if (!_.isUndefined(this['gender'])) {
        res = this['gender'];
      }
      return res;
    };
    GenderUser.prototype.load = function (guid, arg1) {
      this[guid] = arg1;
    };
    return GenderUser;
  }(underscore);
  user_history_cost_account = function (_) {
    var CostAccount = function () {
    };
    CostAccount.prototype.add = function (guid, val) {
      var hit_log = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      if (_.isUndefined(this[guid])) {
        hit_log[val] += 1;
        this[guid] = [
          val,
          hit_log
        ];
      } else {
        hit_log = this[guid][1];
        hit_log[val] += 1;
        hit_log[0] = 1;
        this[guid] = [
          _.indexOf(hit_log, _.max(hit_log)),
          hit_log
        ];
      }
      if (this[guid][0] < 0) {
        this[guid][0] = 0;
      }
    };
    CostAccount.prototype.get = function () {
      var res = [];
      _.each(this, function (element, name, uh) {
        if (!_.isEmpty(element)) {
          res.push([name + '~' + element[0]]);
        }
      });
      return res.join(';');
    };
    CostAccount.prototype.load = function (guid, arg1) {
      if (_.isArray(arg1)) {
        this[guid] = [
          arg1[0],
          arg1[1]
        ];
      }
    };
    return CostAccount;
  }(underscore);
  user_history_cost_user = function (_) {
    var CostUser = function () {
    };
    CostUser.prototype.add = function (val) {
      var hit_log = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
      if (_.isUndefined(this['cost'])) {
        this['cost'] = val;
        hit_log[val] += 1;
        this['hit_log'] = hit_log;
      } else {
        if (_.isArray(this['hit_log'])) {
          hit_log = this['hit_log'];
          hit_log[val] += 1;
          hit_log[0] = 1;
          this['hit_log'] = hit_log;
          this['cost'] = _.indexOf(hit_log, _.max(hit_log));
        }
      }
      if (this['cost'] < 0) {
        this['cost'] = 0;
      }
    };
    CostUser.prototype.get = function () {
      var res = 0;
      if (!_.isUndefined(this['cost'])) {
        res = this['cost'];
      }
      return res;
    };
    CostUser.prototype.load = function (guid, arg1) {
      this[guid] = arg1;
    };
    return CostUser;
  }(underscore);
  user_history_activity_account = function (_) {
    var ActivityAccount = function () {
    };
    ActivityAccount.prototype.add = function (guid, timeFirst, timeLast) {
      if (_.isUndefined(this[guid])) {
        this[guid] = [
          timeFirst,
          timeLast
        ];
      } else {
        this[guid][1] = timeLast;
      }
    };
    ActivityAccount.prototype.load = function (guid, arg1) {
      if (_.isArray(arg1)) {
        this[guid] = [
          arg1[0],
          arg1[1]
        ];
      }
    };
    return ActivityAccount;
  }(underscore);
  user_history_activity_user = function (_) {
    var ActivityUser = function () {
    };
    ActivityUser.prototype.add = function (timeFirst, timeLast) {
      if (_.isUndefined(this['timeFirst'])) {
        this['timeFirst'] = timeFirst;
      }
      this['timeLast'] = timeLast;
    };
    ActivityUser.prototype.load = function (guid, arg1) {
      this[guid] = arg1;
    };
    return ActivityUser;
  }(underscore);
  user_history_main = function (_, JSON, test, FixedQueue, ExcludeOffers, RetargetingOffers, GenderAccount, GenderUser, CostAccount, CostUser, ActivityAccount, ActivityUser) {
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
  }(underscore, json3, user_history_test, user_history_fixed_queue, user_history_exclude_offers, user_history_retargeting_offers, user_history_gender_account, user_history_gender_user, user_history_cost_account, user_history_cost_user, user_history_activity_account, user_history_activity_user);
  settings = {
    requiredData: {
      advertises: {
        param: 'advertises',
        url: '/v1/advertises.json'
      },
      offer_log: {
        param: 'log',
        url: '/logger.json'
      }
    }
  };
  loader_informer = function (jQuery, settings) {
    return function (obj) {
      return jQuery.ajax(settings.requiredData.advertises.url, {
        params: obj.params,
        param: settings.requiredData.advertises.param
      });
    };
  }(jquery, settings);
  loader_offers = function (jQuery, _, settings) {
    return function (obj) {
      var request = jQuery.map(settings.requiredData.offers, function (dataItem) {
        if (!obj.informer[dataItem.param] || (obj.informer[dataItem.param] || '').length === 0) {
          return {};
        }
        var deferred = jQuery.Deferred();
        jQuery.ajax(dataItem.url, {
          params: obj.params,
          param: dataItem.param
        }).done(function (data) {
          deferred.resolve(data);
        }).fail(function () {
          deferred.resolve({});
        });
        return deferred.promise();
      });
      var offers_defferr = jQuery.when.apply(jQuery, request);
      offers_defferr.then(_.bind(function (place, social, account_retargeting, dynamic_retargeting) {
        obj.offers.union(place, social, account_retargeting, dynamic_retargeting);
        obj.render.render();
      }, this));
    };
  }(jquery, underscore, settings);
  loader_main = function (jQuery, _, informer_loader, offers_loader) {
    var loader_obj = function () {
      var informer_defferr = jQuery.when(informer_loader(this));
      informer_defferr.then(_.bind(function (informer) {
        if (this.informer.parse(informer)) {
          this.informer.apply_css();  // offers_loader(this);
        } else {
          this.render.not_found();
        }
      }, this));
      return true;
    };
    return loader_obj;
  }(jquery, underscore, loader_informer, loader_offers);
  models_informer = function (jQuery, _) {
    var Informer = function (app) {
      this.app = app;
      this.informer_id = '';
      this.informer_id_int = 0;
      this.footerHtml = '';
      this.headerHtml = '';
      this.blinking = 0;
      this.blinking_reload = false;
      this.html_notification = false;
      this.shake = 0;
      this.shake_mouse = false;
      this.shake_reload = false;
      this.capacity = 1;
      this.capacity_styling = 1;
      this.button = '';
      this.ret_button = '';
      this.rec_button = '';
      this.campaigns = {};
      this.place = [];
      this.social = [];
      this.account_retargeting = [];
      this.dynamic_retargeting = [];
      this.css = '';
    };
    Informer.prototype.parse = function (server_obj) {
      console.log(server_obj);
      this.css = server_obj.css;
      _.each(server_obj.campaigns, function (element, index, list) {
        if (element.retargeting && element.retargeting_type === 'offer') {
          this.dynamic_retargeting.push([
            element.id,
            element.offer_by_campaign_unique
          ]);
        } else if (element.retargeting && element.retargeting_type === 'account') {
          this.account_retargeting.push([
            element.id,
            element.offer_by_campaign_unique
          ]);
        } else if (!element.retargeting && !element.social) {
          this.place.push([
            element.id,
            element.offer_by_campaign_unique
          ]);
        } else if (!element.retargeting && element.social) {
          this.social.push([
            element.id,
            element.offer_by_campaign_unique
          ]);
        } else {
          this.social.push([
            element.id,
            element.offer_by_campaign_unique
          ]);
        }
        this.campaigns[element.id] = element;
      }, this);
      if (server_obj.block) {
        if (server_obj.block.id === undefined) {
          return false;
        }
        this.informer_id = server_obj.block.guid;
        this.informer_id_int = server_obj.block.id;
        this.capacity = server_obj.block.capacity;
        this.capacity_styling = server_obj.block.capacity_styling;
        this.headerHtml = server_obj.block.headerHtml;
        this.footerHtml = server_obj.block.footerHtml;
        this.blinking = server_obj.block.blinking;
        this.blinking_reload = server_obj.block.blinking_reload;
        this.html_notification = server_obj.block.html_notification;
        this.shake = server_obj.block.shake;
        this.shake_mouse = server_obj.block.shake_mouse;
        this.shake_reload = server_obj.block.shake_reload;
        this.button = server_obj.block.button;
        this.ret_button = server_obj.block.ret_button;
        this.rec_button = server_obj.block.rec_button;
      }
      return true;
    };
    Informer.prototype.apply_css = function () {
      if (document.createStyleSheet) {
        var styleSheet = document.createStyleSheet('');
        styleSheet.cssText = this.css;
      } else {
        jQuery('<style type="text/css">' + this.css + '</style>').appendTo('head');
      }
    };
    return Informer;
  }(jquery, underscore);
  Base64 = function () {
    var Base64 = {
      // private property
      _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      // public method for encoding
      encode: function (input) {
        var output = '';
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = Base64._utf8_encode(input);
        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (chr1 & 3) << 4 | chr2 >> 4;
          enc3 = (chr2 & 15) << 2 | chr3 >> 6;
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }
          output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
      },
      // public method for decoding
      decode: function (input) {
        var output = '';
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
        while (i < input.length) {
          enc1 = this._keyStr.indexOf(input.charAt(i++));
          enc2 = this._keyStr.indexOf(input.charAt(i++));
          enc3 = this._keyStr.indexOf(input.charAt(i++));
          enc4 = this._keyStr.indexOf(input.charAt(i++));
          chr1 = enc1 << 2 | enc2 >> 4;
          chr2 = (enc2 & 15) << 4 | enc3 >> 2;
          chr3 = (enc3 & 3) << 6 | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 !== 64) {
            output = output + String.fromCharCode(chr2);
          }
          if (enc4 !== 64) {
            output = output + String.fromCharCode(chr3);
          }
        }
        output = Base64._utf8_decode(output);
        return output;
      },
      // private method for UTF-8 encoding
      _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, '\n');
        var utftext = '';
        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(c & 63 | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(c & 63 | 128);
          }
        }
        return utftext;
      },
      // private method for UTF-8 decoding
      _utf8_decode: function (utftext) {
        var string = '';
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
          } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode((c & 31) << 6 | c2 & 63);
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode((c & 15) << 12 | (c2 & 63) << 6 | c3 & 63);
            i += 3;
          }
        }
        return string;
      }
    };
    return Base64;
  }();
  models_link = function (b) {
    return function (i, app) {
      var e = new Date().getTime();
      var t = e - app.time_start;
      var url = 'id=' + i.guid + '\n' + 'inf=' + app.informer.informer_id + '\n' + 'token=' + i.token + '\n' + 'url=' + i.url + '\n' + 'rand=' + app.adsparams.token + '\n' + 'camp=' + i.guid_cam + '\n' + 't=' + t + '\n';
      var r = [
        '/click?',
        b.encode(url)
      ];
      return r.join('');
    };
  }(Base64);
  loader_offers_log = function (jQuery, settings) {
    return function (obj) {
      return jQuery.ajax(settings.requiredData.offer_log.url, {
        params: obj.params,
        param: settings.requiredData.offer_log.param
      });
    };
  }(jquery, settings);
  models_offers = function (jQuery, _, link, offers_loader, offers_log) {
    var Offers = function (app) {
      this.app = app;
      this.items = [];
      this.log_item = [];
      this.styling = null;
      this.brending = null;
      this.req_count = 0;
    };
    Offers.prototype.create = function (item, recomendet) {
      if (this.styling) {
        if (this.items.length >= this.app.informer.capacity_styling) {
          return;
        }
      } else {
        if (this.items.length >= this.app.informer.capacity) {
          return;
        }
      }
      if (item.campaign.styling) {
        if (this.styling === null || this.styling === item.id_cam) {
          this.styling = item.id_cam;
        } else {
          return;
        }
      } else {
        if (this.styling === null) {
          this.styling = false;
        }
      }
      if (item.campaign.brending) {
        if (this.brending === null || this.brending === item.id_cam) {
          this.brending = item.id_cam;
        } else {
          return;
        }
      } else {
        if (this.brending === null) {
          this.brending = false;
        }
      }
      if (this.items.length === this.app.informer.capacity_styling - 1 && this.styling && item.campaign.style_data) {
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
      } else {
        if (item.campaign.brending) {
          var brending_item = item.recommended || [];
          var recomendet_count = item.campaign.recomendet_count;
          var day = 0;
          if (item.campaign.recomendet_type === 'min') {
            if (recomendet_count - day > 1) {
              recomendet_count = recomendet_count - day;
            } else {
              recomendet_count = 1;
            }
          } else if (item.campaign.recomendet_type === 'max') {
            if (1 + day < recomendet_count) {
              recomendet_count = 1 + day;
            }
          } else {
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
      this.items = [];
      this.styling = null;
      var full_block_offer = 0;
      var one_block_offer = 0;
      if (dynamic_retargeting && dynamic_retargeting['offers']) {
        full_block_offer = 0;
        one_block_offer = 0;
        _.each(dynamic_retargeting['offers'], function (element, index, list) {
          list[index].campaign = this.app.informer.campaigns[element.id_cam];
          if (list[index].campaign.styling || list[index].campaign.brending) {
            full_block_offer += 1;
          } else {
            one_block_offer += 1;
          }
        }, this);
        this.app.uh.retargeting_clean(dynamic_retargeting['clean']);
        _.each(dynamic_retargeting['offers'], function (element, index, list) {
          if (full_block_offer >= one_block_offer) {
            if (element.campaign.styling || element.campaign.brending) {
              this.create(element);
            }
          } else {
            this.create(element);
          }
        }, this);
      }
      if (account_retargeting && account_retargeting['offers']) {
        full_block_offer = 0;
        one_block_offer = 0;
        _.each(account_retargeting['offers'], function (element, index, list) {
          list[index].campaign = this.app.informer.campaigns[element.id_cam];
          if (list[index].campaign.styling || list[index].campaign.brending) {
            full_block_offer += 1;
          } else {
            one_block_offer += 1;
          }
        }, this);
        _.each(account_retargeting['offers'], function (element, index, list) {
          if (full_block_offer >= one_block_offer) {
            if (element.campaign.styling || element.campaign.brending) {
              this.create(element);
            }
          } else {
            this.create(element);
          }
        }, this);
      }
      if (place && place['offers']) {
        full_block_offer = 0;
        one_block_offer = 0;
        _.each(place['offers'], function (element, index, list) {
          list[index].campaign = this.app.informer.campaigns[element.id_cam];
          if (list[index].campaign.styling || list[index].campaign.brending) {
            full_block_offer += 1;
          } else {
            one_block_offer += 1;
          }
        }, this);
        _.each(place['offers'], function (element, index, list) {
          if (full_block_offer >= one_block_offer) {
            if (element.campaign.styling || element.campaign.brending) {
              this.create(element);
            }
          } else {
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
            if (list[index].campaign.styling || list[index].campaign.brending) {
              full_block_offer += 1;
            } else {
              one_block_offer += 1;
            }
          }, this);
          _.each(social['offers'], function (element, index, list) {
            if (full_block_offer >= one_block_offer) {
              if (element.campaign.styling || element.campaign.brending) {
                this.create(element);
              }
            } else {
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
      } else {
        counter = 0;
        while (0 < this.items.length && this.items.length < this.app.informer.capacity) {
          this.items.push(this.items[counter]);
          counter++;
        }
      }
      if (place['clean'] || place['clean'] && social['clean']) {
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
      } else {
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
      } else {
        this.app.uh.exclude.add(offer.id, offer.camp.unique_impression_lot);
      }
      this.app.uh.save();
    };
    return Offers;
  }(jquery, underscore, models_link, loader_offers, loader_offers_log);
  models_params = function (jQuery, JSON, _) {
    var Params = function (app) {
      this.app = app;
      this.w_h = jQuery(window).height();
      this.w_w = jQuery(window).width();
    };
    Params.prototype.generateRequestData = function (req_type) {
      this.app.uh.load();
      var data = {};
      if (req_type === 'advertises') {
        data['w'] = this.w_w;
        data['h'] = this.w_h;
        data['device'] = this.app.device;
        data['block_id'] = this.app.adsparams.block_id;
        data['auto'] = this.app.adsparams.auto;
        data['country'] = this.app.adsparams.country;
        data['region'] = this.app.adsparams.region;
        data['ip'] = this.app.adsparams.ip;
        data['token'] = this.app.adsparams.token;
        data['cost'] = this.app.uh.cost_user.get();
        data['gender'] = this.app.uh.gender_user.get();
        data['retargeting'] = this.app.uh.retargeting.get();
        data['index'] = parseInt(this.app.adsparams.index);
        if (!_.isNumber(data['index'])) {
          data['index'] = 0;
        }
        data['exclude'] = this.app.uh.exclude_get();
        data['retargeting_account_exclude'] = this.app.uh.retargeting_account_exclude_get();
        data['retargeting_dynamic_exclude'] = this.app.uh.retargeting_exclude_get();
        data['retargeting'] = this.app.uh.retargeting.get();
      } else if (req_type === 'log') {
        data['params'] = {};
        data['params']['informer_id'] = this.app.informer.informer_id;
        data['params']['informer_id_int'] = this.app.informer.informer_id_int;
        data['params']['ip'] = this.app.adsparams.ip;
        data['params']['cookie'] = this.app.adsparams.cookie;
        data['params']['request'] = this.app.adsparams.request;
        data['params']['test'] = this.app.adsparams.test;
        data['items'] = jQuery.map(this.app.offers.log_item, function (dataItem) {
          var item = {};
          item.guid = dataItem.guid;
          item.id = dataItem.id;
          item.campaign_social = dataItem.camp.social;
          item.token = dataItem.token;
          item.campaign_guid = dataItem.camp.guid;
          item.campaign_id = dataItem.camp.id;
          item.retargeting = dataItem.camp.retargeting;
          item.branch = dataItem.branch;
          return item;
        });
      }
      return JSON.stringify(data);
    };
    return Params;
  }(jquery, json3, underscore);
  render_bind_redirect = function (jQuery, _) {
    return function (app, el) {
      var items = el.find('div[data-id]');
      _.each(items, function (element, index, list) {
        jQuery(element).click(function (event) {
          var item = jQuery(event.currentTarget);
          var id = item.data('id');
          app.offers.click(id);
        });
      }, this);
    };
  }(jquery, underscore);
  text = function (module) {
    var text, fs, Cc, Ci, xpcIsWindows, progIds = [
        'Msxml2.XMLHTTP',
        'Microsoft.XMLHTTP',
        'Msxml2.XMLHTTP.4.0'
      ], xmlRegExp = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, bodyRegExp = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, hasLocation = typeof location !== 'undefined' && location.href, defaultProtocol = hasLocation && location.protocol && location.protocol.replace(/\:/, ''), defaultHostName = hasLocation && location.hostname, defaultPort = hasLocation && (location.port || undefined), buildMap = {}, masterConfig = module.config && module.config() || {};
    function useDefault(value, defaultValue) {
      return value === undefined || value === '' ? defaultValue : value;
    }
    //Allow for default ports for http and https.
    function isSamePort(protocol1, port1, protocol2, port2) {
      if (port1 === port2) {
        return true;
      } else if (protocol1 === protocol2) {
        if (protocol1 === 'http') {
          return useDefault(port1, '80') === useDefault(port2, '80');
        } else if (protocol1 === 'https') {
          return useDefault(port1, '443') === useDefault(port2, '443');
        }
      }
      return false;
    }
    text = {
      version: '2.0.15',
      strip: function (content) {
        //Strips <?xml ...?> declarations so that external SVG and XML
        //documents can be added to a document without worry. Also, if the string
        //is an HTML document, only the part inside the body tag is returned.
        if (content) {
          content = content.replace(xmlRegExp, '');
          var matches = content.match(bodyRegExp);
          if (matches) {
            content = matches[1];
          }
        } else {
          content = '';
        }
        return content;
      },
      jsEscape: function (content) {
        return content.replace(/(['\\])/g, '\\$1').replace(/[\f]/g, '\\f').replace(/[\b]/g, '\\b').replace(/[\n]/g, '\\n').replace(/[\t]/g, '\\t').replace(/[\r]/g, '\\r').replace(/[\u2028]/g, '\\u2028').replace(/[\u2029]/g, '\\u2029');
      },
      createXhr: masterConfig.createXhr || function () {
        //Would love to dump the ActiveX crap in here. Need IE 6 to die first.
        var xhr, i, progId;
        if (typeof XMLHttpRequest !== 'undefined') {
          return new XMLHttpRequest();
        } else if (typeof ActiveXObject !== 'undefined') {
          for (i = 0; i < 3; i += 1) {
            progId = progIds[i];
            try {
              xhr = new ActiveXObject(progId);
            } catch (e) {
            }
            if (xhr) {
              progIds = [progId];
              // so faster next time
              break;
            }
          }
        }
        return xhr;
      },
      /**
       * Parses a resource name into its component parts. Resource names
       * look like: module/name.ext!strip, where the !strip part is
       * optional.
       * @param {String} name the resource name
       * @returns {Object} with properties "moduleName", "ext" and "strip"
       * where strip is a boolean.
       */
      parseName: function (name) {
        var modName, ext, temp, strip = false, index = name.lastIndexOf('.'), isRelative = name.indexOf('./') === 0 || name.indexOf('../') === 0;
        if (index !== -1 && (!isRelative || index > 1)) {
          modName = name.substring(0, index);
          ext = name.substring(index + 1);
        } else {
          modName = name;
        }
        temp = ext || modName;
        index = temp.indexOf('!');
        if (index !== -1) {
          //Pull off the strip arg.
          strip = temp.substring(index + 1) === 'strip';
          temp = temp.substring(0, index);
          if (ext) {
            ext = temp;
          } else {
            modName = temp;
          }
        }
        return {
          moduleName: modName,
          ext: ext,
          strip: strip
        };
      },
      xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
      /**
       * Is an URL on another domain. Only works for browser use, returns
       * false in non-browser environments. Only used to know if an
       * optimized .js version of a text resource should be loaded
       * instead.
       * @param {String} url
       * @returns Boolean
       */
      useXhr: function (url, protocol, hostname, port) {
        var uProtocol, uHostName, uPort, match = text.xdRegExp.exec(url);
        if (!match) {
          return true;
        }
        uProtocol = match[2];
        uHostName = match[3];
        uHostName = uHostName.split(':');
        uPort = uHostName[1];
        uHostName = uHostName[0];
        return (!uProtocol || uProtocol === protocol) && (!uHostName || uHostName.toLowerCase() === hostname.toLowerCase()) && (!uPort && !uHostName || isSamePort(uProtocol, uPort, protocol, port));
      },
      finishLoad: function (name, strip, content, onLoad) {
        content = strip ? text.strip(content) : content;
        if (masterConfig.isBuild) {
          buildMap[name] = content;
        }
        onLoad(content);
      },
      load: function (name, req, onLoad, config) {
        //Name has format: some.module.filext!strip
        //The strip part is optional.
        //if strip is present, then that means only get the string contents
        //inside a body tag in an HTML string. For XML/SVG content it means
        //removing the <?xml ...?> declarations so the content can be inserted
        //into the current doc without problems.
        // Do not bother with the work if a build and text will
        // not be inlined.
        if (config && config.isBuild && !config.inlineText) {
          onLoad();
          return;
        }
        masterConfig.isBuild = config && config.isBuild;
        var parsed = text.parseName(name), nonStripName = parsed.moduleName + (parsed.ext ? '.' + parsed.ext : ''), url = req.toUrl(nonStripName), useXhr = masterConfig.useXhr || text.useXhr;
        // Do not load if it is an empty: url
        if (url.indexOf('empty:') === 0) {
          onLoad();
          return;
        }
        //Load the text. Use XHR if possible and in a browser.
        if (!hasLocation || useXhr(url, defaultProtocol, defaultHostName, defaultPort)) {
          text.get(url, function (content) {
            text.finishLoad(name, parsed.strip, content, onLoad);
          }, function (err) {
            if (onLoad.error) {
              onLoad.error(err);
            }
          });
        } else {
          //Need to fetch the resource across domains. Assume
          //the resource has been optimized into a JS module. Fetch
          //by the module name + extension, but do not include the
          //!strip part to avoid file system issues.
          req([nonStripName], function (content) {
            text.finishLoad(parsed.moduleName + '.' + parsed.ext, parsed.strip, content, onLoad);
          });
        }
      },
      write: function (pluginName, moduleName, write, config) {
        if (buildMap.hasOwnProperty(moduleName)) {
          var content = text.jsEscape(buildMap[moduleName]);
          write.asModule(pluginName + '!' + moduleName, 'define(function () { return \'' + content + '\';});\n');
        }
      },
      writeFile: function (pluginName, moduleName, req, write, config) {
        var parsed = text.parseName(moduleName), extPart = parsed.ext ? '.' + parsed.ext : '', nonStripName = parsed.moduleName + extPart,
          //Use a '.js' file name so that it indicates it is a
          //script that can be loaded across domains.
          fileName = req.toUrl(parsed.moduleName + extPart) + '.js';
        //Leverage own load() method to load plugin value, but only
        //write out values that do not have the strip argument,
        //to avoid any potential issues with ! in file names.
        text.load(nonStripName, req, function (value) {
          //Use own write() method to construct full module value.
          //But need to create shell that translates writeFile's
          //write() to the right interface.
          var textWrite = function (contents) {
            return write(fileName, contents);
          };
          textWrite.asModule = function (moduleName, contents) {
            return write.asModule(moduleName, fileName, contents);
          };
          text.write(pluginName, nonStripName, textWrite, config);
        }, config);
      }
    };
    if (masterConfig.env === 'node' || !masterConfig.env && typeof process !== 'undefined' && process.versions && !!process.versions.node && !process.versions['node-webkit'] && !process.versions['atom-shell']) {
      //Using special require.nodeRequire, something added by r.js.
      fs = require.nodeRequire('fs');
      text.get = function (url, callback, errback) {
        try {
          var file = fs.readFileSync(url, 'utf8');
          //Remove BOM (Byte Mark Order) from utf8 files if it is there.
          if (file[0] === '\uFEFF') {
            file = file.substring(1);
          }
          callback(file);
        } catch (e) {
          if (errback) {
            errback(e);
          }
        }
      };
    } else if (masterConfig.env === 'xhr' || !masterConfig.env && text.createXhr()) {
      text.get = function (url, callback, errback, headers) {
        var xhr = text.createXhr(), header;
        xhr.open('GET', url, true);
        //Allow plugins direct access to xhr headers
        if (headers) {
          for (header in headers) {
            if (headers.hasOwnProperty(header)) {
              xhr.setRequestHeader(header.toLowerCase(), headers[header]);
            }
          }
        }
        //Allow overrides specified in config
        if (masterConfig.onXhr) {
          masterConfig.onXhr(xhr, url);
        }
        xhr.onreadystatechange = function (evt) {
          var status, err;
          //Do not explicitly handle errors, those should be
          //visible via console output in the browser.
          if (xhr.readyState === 4) {
            status = xhr.status || 0;
            if (status > 399 && status < 600) {
              //An http 4xx or 5xx error. Signal an error.
              err = new Error(url + ' HTTP status: ' + status);
              err.xhr = xhr;
              if (errback) {
                errback(err);
              }
            } else {
              callback(xhr.responseText);
            }
            if (masterConfig.onXhrComplete) {
              masterConfig.onXhrComplete(xhr, url);
            }
          }
        };
        xhr.send(null);
      };
    } else if (masterConfig.env === 'rhino' || !masterConfig.env && typeof Packages !== 'undefined' && typeof java !== 'undefined') {
      //Why Java, why is this so awkward?
      text.get = function (url, callback) {
        var stringBuffer, line, encoding = 'utf-8', file = new java.io.File(url), lineSeparator = java.lang.System.getProperty('line.separator'), input = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(file), encoding)), content = '';
        try {
          stringBuffer = new java.lang.StringBuffer();
          line = input.readLine();
          // Byte Order Mark (BOM) - The Unicode Standard, version 3.0, page 324
          // http://www.unicode.org/faq/utf_bom.html
          // Note that when we use utf-8, the BOM should appear as "EF BB BF", but it doesn't due to this bug in the JDK:
          // http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4508058
          if (line && line.length() && line.charAt(0) === 65279) {
            // Eat the BOM, since we've already found the encoding on this file,
            // and we plan to concatenating this buffer with others; the BOM should
            // only appear at the top of a file.
            line = line.substring(1);
          }
          if (line !== null) {
            stringBuffer.append(line);
          }
          while ((line = input.readLine()) !== null) {
            stringBuffer.append(lineSeparator);
            stringBuffer.append(line);
          }
          //Make sure we return a JavaScript string and not a Java string.
          content = String(stringBuffer.toString());  //String
        } finally {
          input.close();
        }
        callback(content);
      };
    } else if (masterConfig.env === 'xpconnect' || !masterConfig.env && typeof Components !== 'undefined' && Components.classes && Components.interfaces) {
      //Avert your gaze!
      Cc = Components.classes;
      Ci = Components.interfaces;
      Components.utils['import']('resource://gre/modules/FileUtils.jsm');
      xpcIsWindows = '@mozilla.org/windows-registry-key;1' in Cc;
      text.get = function (url, callback) {
        var inStream, convertStream, fileObj, readData = {};
        if (xpcIsWindows) {
          url = url.replace(/\//g, '\\');
        }
        fileObj = new FileUtils.File(url);
        //XPCOM, you so crazy
        try {
          inStream = Cc['@mozilla.org/network/file-input-stream;1'].createInstance(Ci.nsIFileInputStream);
          inStream.init(fileObj, 1, 0, false);
          convertStream = Cc['@mozilla.org/intl/converter-input-stream;1'].createInstance(Ci.nsIConverterInputStream);
          convertStream.init(inStream, 'utf-8', inStream.available(), Ci.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER);
          convertStream.readString(inStream.available(), readData);
          convertStream.close();
          inStream.close();
          callback(readData.value);
        } catch (e) {
          throw new Error((fileObj && fileObj.path || '') + ': ' + e);
        }
      };
    }
    return text;
  }({});
  tpl = function (_, text) {
    var buildMap = {};
    var tpl = {
      version: '0.1.0',
      load: function (name, req, onLoadNative, config) {
        var onLoad = function (content) {
          // Merge settings
          _.extend(_.templateSettings, config.underscoreTemplateSettings || {});
          // compile the template
          content = _.template(content);
          /* jshint ignore:start */
          if (config.isBuild) {
            content = buildMap[name] = content.source;
          } else {
            content = new Function('obj', 'return ' + content.source)();
          }
          /* jshint ignore:end */
          onLoadNative(content);
        };
        // load template using the text plugin
        text.load(name, req, onLoad, config);
      },
      write: function (pluginName, moduleName, write) {
        if (buildMap.hasOwnProperty(moduleName)) {
          write('define("' + pluginName + '!' + moduleName + '", ["underscore"], function(_) { ' + 'return ' + buildMap[moduleName] + ';' + '});\n');
        }
      }
    };
    return tpl;
  }(underscore, text);
  tpl_templates_advBlockTemplatehtml = function (_) {
    return function (obj) {
      var __t, __p = '', __j = Array.prototype.join, print = function () {
          __p += __j.call(arguments, '');
        };
      with (obj || {}) {
        __p += '<div id="mainContainer">\n<div id=\'mainHeader\'>' + ((__t = mainHeader) == null ? '' : __t) + '</div>\n<div id=\'adsContainer\'>' + ((__t = ads) == null ? '' : __t) + '</div>\n<div id=\'mainFooter\'>' + ((__t = mainFooter) == null ? '' : __t) + '</div>\n</div>';
      }
      return __p;
    };
  }(underscore);
  tpl_templates_advTemplatehtml = function (_) {
    return function (obj) {
      var __t, __p = '', __j = Array.prototype.join, print = function () {
          __p += __j.call(arguments, '');
        };
      with (obj || {}) {
        __p += '';
        for (var offer in offers) {
          __p += '\n<div data-id=\'' + ((__t = offers[offer].id) == null ? '' : __t) + '\' class=\'' + ((__t = offers[offer].style_class) == null ? '' : __t) + '\'>\n<div class=\'ellipsis multiline header\'>' + ((__t = offers[offer].title) == null ? '' : __t) + '</div>\n<div class=\'ellipsis multiline description\'>' + ((__t = offers[offer].description) == null ? '' : __t) + '</div>\n<div class=\'ellipsis cost\'>' + ((__t = offers[offer].price) == null ? '' : __t) + '</div>\n<div class=\'imageCon\' data-image-id=\'' + ((__t = offers[offer].id) == null ? '' : __t) + '\' data-image-index=\'' + ((__t = offer) == null ? '' : __t) + '\'>\n<div class=\'control_next\'>>></div>\n<div class=\'control_prev\'><<</div>\n<ul>\n';
          for (var image in offers[offer].images) {
            __p += '\n<li><img src="' + ((__t = offers[offer].images[image]) == null ? '' : __t) + '" alt=""/></li>\n';
          }
          __p += '\n</ul>\n</div>\n<div class="ellipsis button">' + ((__t = offers[offer].button) == null ? '' : __t) + '</div>\n</div>\n';
        }
        __p += '';
      }
      return __p;
    };
  }(underscore);
  tpl_templates_advBlockNotFoundTemplatehtml = function (_) {
    return function (obj) {
      var __t, __p = '', __j = Array.prototype.join, print = function () {
          __p += __j.call(arguments, '');
        };
      with (obj || {}) {
        __p += '<html><head><META http-equiv="Content-Type" content="text/html; charset=utf-8">\n<style type="text/css">\nhtml, body {\npadding: 0; margin: 0; border: 0;\n}\n#adInfo {\nmargin: auto;\nbackground-repeat: no-repeat;\noverflow: hidden;\nbackground-image: url(\'https://cdnt.yottos.com/getmyad/logos/colorLogo.gif\');\nheight: 10px;\nwidth: 100px;\n}\n#adText{\nmargin: auto;\nwidth: 155px;\ntext-align:center;\nfont-size:1.5em;\ncolor:#F1991B;\nletter-spacing: -1px;\nfont-weight:700;\ntext-transform:uppercase;\nanimation:blur .75s ease-out infinite;\ntext-shadow:0px 0px 5px #fff,\n0px 0px 7px #fff;\n}\n@keyframes blur{\nfrom{\ntext-shadow:0px 0px 10px #fff,\n0px 0px 10px #fff,\n0px 0px 25px #fff,\n0px 0px 25px #fff,\n0px 0px 25px #fff,\n0px 0px 25px #fff,\n0px 0px 25px #fff,\n0px 0px 25px #fff,\n0px 0px 50px #fff,\n0px 0px 50px #fff,\n0px 0px 50px #7B96B8,\n0px 0px 150px #7B96B8,\n0px 10px 100px #7B96B8,\n0px 10px 100px #7B96B8,\n0px 10px 100px #7B96B8,\n0px 10px 100px #7B96B8,\n0px -10px 100px #7B96B8,\n0px -10px 100px #7B96B8;}\n}\n</style>\n</head>\n<body>\n<div id="adText"><a href="https://yottos.com/webmasters" target="_blank" style="\n    color: #F1991B;\n        text-decoration: blink;">Как разместить рекламу на своем сайте?</a></div>\n<div id="adInfo"><a href="https://yottos.com/webmasters" target="_blank" title="Реклама от Yottos"></a></div>\n</body>\n</html>';
      }
      return __p;
    };
  }(underscore);
  templates_main = function (advBlockTemplate, advTemplate, advBlockNotFoundTemplate) {
    return {
      advBlockTemplate: advBlockTemplate,
      advTemplate: advTemplate,
      advBlockNotFoundTemplate: advBlockNotFoundTemplate
    };
  }(tpl_templates_advBlockTemplatehtml, tpl_templates_advTemplatehtml, tpl_templates_advBlockNotFoundTemplatehtml);
  render_bind_slider = function (jQuery, _) {
    var slider = function (el) {
      var items = el.find('.imageCon');
      _.each(items, function (element, index, list) {
        var el = jQuery(element);
        var slideCount = el.find('img').length;
        var slideWidth = el.find('img').width();
        var slideHeight = el.find('img').height();
        var sliderUlWidth = slideCount * slideWidth;
        if (slideHeight <= 0) {
          slideHeight = 'auto';
        }
        el.css({
          width: slideWidth,
          height: slideHeight
        });
        if (slideCount > 1) {
          el.find('ul').css({
            width: sliderUlWidth,
            marginLeft: -slideWidth,
            zoom: 1
          });
          el.find('li').css({ zoom: 1 });
          el.find('img').css({ zoom: 1 });
          el.find('li:last-child').prependTo(el.find('ul'));
          el.find('div.control_prev').unbind();
          el.find('div.control_next').unbind();
          el.find('div.control_prev').click(function (event) {
            event.stopPropagation();
            var el = jQuery(event.target).parent();
            var slideWidth = el.find('img').width();
            el.find('ul').animate({ left: +slideWidth }, 900, 'easeOutCirc', function () {
              el.find('li:last-child').prependTo(el.find('ul'));
              el.find('ul').css({
                'left': '',
                zoom: 1
              });
            });
          });
          el.find('div.control_next').click(function (event) {
            event.stopPropagation();
            var el = jQuery(event.target).parent();
            var slideWidth = el.find('img').width();
            el.find('ul').animate({ left: -slideWidth }, 900, 'easeOutCirc', function () {
              el.find('li:first-child').appendTo(el.find('ul'));
              el.find('ul').css({
                'left': '',
                zoom: 1
              });
            });
          });
        } else {
          el.find('ul').css({ width: sliderUlWidth });
          el.find('div.control_prev').hide();
          el.find('div.control_next').hide();
        }
      }, this);
    };
    return slider;
  }(jquery, underscore);
  render_main = function (jQuery, _, redirect, templates, slider) {
    return function (app) {
      var render_obj = new Object({ app: app });
      render_obj.render = function () {
        var temp_el = jQuery('<div></div>');
        temp_el.append(templates.advTemplate({ offers: this.app.offers.items }));
        jQuery('body').html(templates.advBlockTemplate({
          mainHeader: this.app.informer.headerHtml,
          ads: temp_el.html(),
          mainFooter: this.app.informer.footerHtml
        }));
        redirect(this.app, jQuery('#adsContainer'));
        slider(jQuery('#adsContainer'));
        this.app.offers.views(jQuery('#adsContainer'));
        jQuery('.ellipsis').ellipsis();
      };
      render_obj.not_found = function () {
        jQuery('html').html(templates.advBlockNotFoundTemplate());
      };
      return render_obj;
    };
  }(jquery, underscore, render_bind_redirect, templates_main, render_bind_slider);
  loader = function (jQuery, _, detect_device, DetectBrowser, user_history, settings, loader, Informer, Offers, Params, Render) {
    var Loader = function () {
      this.uh = user_history;
      this.adsparams = window.adsparams;
      this.params = new Params(this);
      this.image_format = 'png';
      if (this.adsparams['is_webp']) {
        this.image_format = 'webp';
      }
      this.settings = settings;
      this.device = detect_device();
      this.browser = new DetectBrowser();
      this.time_start = new Date().getTime();
      this.uh.load();
      this.informer = new Informer(this);
      this.offers = new Offers(this);
      this.render = new Render(this);
    };
    Loader.prototype.loader = loader;
    return Loader;
  }(jquery, underscore, detect_device, detect_browser, user_history_main, settings, loader_main, models_informer, models_offers, models_params, render_main);
  (function (Loader) {
    (window.adsbyyottos = window.adsbyyottos || new Loader()).loader();
  }(loader));
  main = undefined;
}());
}());