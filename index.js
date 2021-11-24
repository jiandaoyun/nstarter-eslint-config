/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/cookie/index.js":
/*!**************************************!*\
  !*** ./node_modules/cookie/index.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module exports.
 * @public
 */

exports.parse = parse;
exports.serialize = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;
var pairSplitRegExp = /; */;

/**
 * RegExp to match field-content in RFC 7230 sec 3.2
 *
 * field-content = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 * field-vchar   = VCHAR / obs-text
 * obs-text      = %x80-FF
 */

var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {object}
 * @public
 */

function parse(str, options) {
  if (typeof str !== 'string') {
    throw new TypeError('argument str must be a string');
  }

  var obj = {}
  var opt = options || {};
  var pairs = str.split(pairSplitRegExp);
  var dec = opt.decode || decode;

  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    var eq_idx = pair.indexOf('=');

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      continue;
    }

    var key = pair.substr(0, eq_idx).trim()
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  }

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;

  if (typeof enc !== 'function') {
    throw new TypeError('option encode is invalid');
  }

  if (!fieldContentRegExp.test(name)) {
    throw new TypeError('argument name is invalid');
  }

  var value = enc(val);

  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError('argument val is invalid');
  }

  var str = name + '=' + value;

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;

    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError('option maxAge is invalid')
    }

    str += '; Max-Age=' + Math.floor(maxAge);
  }

  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError('option domain is invalid');
    }

    str += '; Domain=' + opt.domain;
  }

  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError('option path is invalid');
    }

    str += '; Path=' + opt.path;
  }

  if (opt.expires) {
    if (typeof opt.expires.toUTCString !== 'function') {
      throw new TypeError('option expires is invalid');
    }

    str += '; Expires=' + opt.expires.toUTCString();
  }

  if (opt.httpOnly) {
    str += '; HttpOnly';
  }

  if (opt.secure) {
    str += '; Secure';
  }

  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === 'string'
      ? opt.sameSite.toLowerCase() : opt.sameSite;

    switch (sameSite) {
      case true:
        str += '; SameSite=Strict';
        break;
      case 'lax':
        str += '; SameSite=Lax';
        break;
      case 'strict':
        str += '; SameSite=Strict';
        break;
      case 'none':
        str += '; SameSite=None';
        break;
      default:
        throw new TypeError('option sameSite is invalid');
    }
  }

  return str;
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/prop-types/checkPropTypes.js":
/*!***************************************************!*\
  !*** ./node_modules/prop-types/checkPropTypes.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),

/***/ "./node_modules/prop-types/factoryWithTypeCheckers.js":
/*!************************************************************!*\
  !*** ./node_modules/prop-types/factoryWithTypeCheckers.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");

var ReactPropTypesSecret = __webpack_require__(/*! ./lib/ReactPropTypesSecret */ "./node_modules/prop-types/lib/ReactPropTypesSecret.js");
var checkPropTypes = __webpack_require__(/*! ./checkPropTypes */ "./node_modules/prop-types/checkPropTypes.js");

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : 0;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ "./node_modules/prop-types/index.js":
/*!******************************************!*\
  !*** ./node_modules/prop-types/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(/*! react-is */ "./node_modules/react-is/index.js");

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(/*! ./factoryWithTypeCheckers */ "./node_modules/prop-types/factoryWithTypeCheckers.js")(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),

/***/ "./node_modules/prop-types/lib/ReactPropTypesSecret.js":
/*!*************************************************************!*\
  !*** ./node_modules/prop-types/lib/ReactPropTypesSecret.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ "./node_modules/punycode/punycode.js":
/*!*******************************************!*\
  !*** ./node_modules/punycode/punycode.js ***!
  \*******************************************/
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.3.2 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports =  true && exports &&
		!exports.nodeType && exports;
	var freeModule =  true && module &&
		!module.nodeType && module;
	var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return punycode;
		}).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}

}(this));


/***/ }),

/***/ "./node_modules/querystring/decode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/decode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (Array.isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};


/***/ }),

/***/ "./node_modules/querystring/encode.js":
/*!********************************************!*\
  !*** ./node_modules/querystring/encode.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).map(function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (Array.isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};


/***/ }),

/***/ "./node_modules/querystring/index.js":
/*!*******************************************!*\
  !*** ./node_modules/querystring/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.decode = exports.parse = __webpack_require__(/*! ./decode */ "./node_modules/querystring/decode.js");
exports.encode = exports.stringify = __webpack_require__(/*! ./encode */ "./node_modules/querystring/encode.js");


/***/ }),

/***/ "./node_modules/react-is/cjs/react-is.development.js":
/*!***********************************************************!*\
  !*** ./node_modules/react-is/cjs/react-is.development.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;
var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace; // TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?

var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_BLOCK_TYPE = hasSymbol ? Symbol.for('react.block') : 0xead9;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;
var REACT_SCOPE_TYPE = hasSymbol ? Symbol.for('react.scope') : 0xead7;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE || type.$$typeof === REACT_SCOPE_TYPE || type.$$typeof === REACT_BLOCK_TYPE);
}

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;

    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;

          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_LAZY_TYPE:
              case REACT_MEMO_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;

              default:
                return $$typeof;
            }

        }

      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
} // AsyncMode is deprecated along with isAsyncMode

var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;
var hasWarnedAboutDeprecatedIsAsyncMode = false; // AsyncMode should be deprecated

function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint

      console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }

  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
exports.isValidElementType = isValidElementType;
exports.typeOf = typeOf;
  })();
}


/***/ }),

/***/ "./node_modules/react-is/index.js":
/*!****************************************!*\
  !*** ./node_modules/react-is/index.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-is.development.js */ "./node_modules/react-is/cjs/react-is.development.js");
}


/***/ }),

/***/ "./node_modules/react-tooltip/dist/index.es.js":
/*!*****************************************************!*\
  !*** ./node_modules/react-tooltip/dist/index.es.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/v4.js");




function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var CONSTANT = {
  GLOBAL: {
    HIDE: '__react_tooltip_hide_event',
    REBUILD: '__react_tooltip_rebuild_event',
    SHOW: '__react_tooltip_show_event'
  }
};

/**
 * Static methods for react-tooltip
 */

var dispatchGlobalEvent = function dispatchGlobalEvent(eventName, opts) {
  // Compatible with IE
  // @see http://stackoverflow.com/questions/26596123/internet-explorer-9-10-11-event-constructor-doesnt-work
  // @see https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
  var event;

  if (typeof window.CustomEvent === 'function') {
    event = new window.CustomEvent(eventName, {
      detail: opts
    });
  } else {
    event = document.createEvent('Event');
    event.initEvent(eventName, false, true, opts);
  }

  window.dispatchEvent(event);
};

function staticMethods (target) {
  /**
   * Hide all tooltip
   * @trigger ReactTooltip.hide()
   */
  target.hide = function (target) {
    dispatchGlobalEvent(CONSTANT.GLOBAL.HIDE, {
      target: target
    });
  };
  /**
   * Rebuild all tooltip
   * @trigger ReactTooltip.rebuild()
   */


  target.rebuild = function () {
    dispatchGlobalEvent(CONSTANT.GLOBAL.REBUILD);
  };
  /**
   * Show specific tooltip
   * @trigger ReactTooltip.show()
   */


  target.show = function (target) {
    dispatchGlobalEvent(CONSTANT.GLOBAL.SHOW, {
      target: target
    });
  };

  target.prototype.globalRebuild = function () {
    if (this.mount) {
      this.unbindListener();
      this.bindListener();
    }
  };

  target.prototype.globalShow = function (event) {
    if (this.mount) {
      var hasTarget = event && event.detail && event.detail.target && true || false; // Create a fake event, specific show will limit the type to `solid`
      // only `float` type cares e.clientX e.clientY

      this.showTooltip({
        currentTarget: hasTarget && event.detail.target
      }, true);
    }
  };

  target.prototype.globalHide = function (event) {
    if (this.mount) {
      var hasTarget = event && event.detail && event.detail.target && true || false;
      this.hideTooltip({
        currentTarget: hasTarget && event.detail.target
      }, hasTarget);
    }
  };
}

/**
 * Events that should be bound to the window
 */
function windowListener (target) {
  target.prototype.bindWindowEvents = function (resizeHide) {
    // ReactTooltip.hide
    window.removeEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide);
    window.addEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide, false); // ReactTooltip.rebuild

    window.removeEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild);
    window.addEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild, false); // ReactTooltip.show

    window.removeEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow);
    window.addEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow, false); // Resize

    if (resizeHide) {
      window.removeEventListener('resize', this.onWindowResize);
      window.addEventListener('resize', this.onWindowResize, false);
    }
  };

  target.prototype.unbindWindowEvents = function () {
    window.removeEventListener(CONSTANT.GLOBAL.HIDE, this.globalHide);
    window.removeEventListener(CONSTANT.GLOBAL.REBUILD, this.globalRebuild);
    window.removeEventListener(CONSTANT.GLOBAL.SHOW, this.globalShow);
    window.removeEventListener('resize', this.onWindowResize);
  };
  /**
   * invoked by resize event of window
   */


  target.prototype.onWindowResize = function () {
    if (!this.mount) return;
    this.hideTooltip();
  };
}

/**
 * Custom events to control showing and hiding of tooltip
 *
 * @attributes
 * - `event` {String}
 * - `eventOff` {String}
 */
var checkStatus = function checkStatus(dataEventOff, e) {
  var show = this.state.show;
  var id = this.props.id;
  var isCapture = this.isCapture(e.currentTarget);
  var currentItem = e.currentTarget.getAttribute('currentItem');
  if (!isCapture) e.stopPropagation();

  if (show && currentItem === 'true') {
    if (!dataEventOff) this.hideTooltip(e);
  } else {
    e.currentTarget.setAttribute('currentItem', 'true');
    setUntargetItems(e.currentTarget, this.getTargetArray(id));
    this.showTooltip(e);
  }
};

var setUntargetItems = function setUntargetItems(currentTarget, targetArray) {
  for (var i = 0; i < targetArray.length; i++) {
    if (currentTarget !== targetArray[i]) {
      targetArray[i].setAttribute('currentItem', 'false');
    } else {
      targetArray[i].setAttribute('currentItem', 'true');
    }
  }
};

var customListeners = {
  id: '9b69f92e-d3fe-498b-b1b4-c5e63a51b0cf',
  set: function set(target, event, listener) {
    if (this.id in target) {
      var map = target[this.id];
      map[event] = listener;
    } else {
      // this is workaround for WeakMap, which is not supported in older browsers, such as IE
      Object.defineProperty(target, this.id, {
        configurable: true,
        value: _defineProperty({}, event, listener)
      });
    }
  },
  get: function get(target, event) {
    var map = target[this.id];

    if (map !== undefined) {
      return map[event];
    }
  }
};
function customEvent (target) {
  target.prototype.isCustomEvent = function (ele) {
    var event = this.state.event;
    return event || !!ele.getAttribute('data-event');
  };
  /* Bind listener for custom event */


  target.prototype.customBindListener = function (ele) {
    var _this = this;

    var _this$state = this.state,
        event = _this$state.event,
        eventOff = _this$state.eventOff;
    var dataEvent = ele.getAttribute('data-event') || event;
    var dataEventOff = ele.getAttribute('data-event-off') || eventOff;
    dataEvent.split(' ').forEach(function (event) {
      ele.removeEventListener(event, customListeners.get(ele, event));
      var customListener = checkStatus.bind(_this, dataEventOff);
      customListeners.set(ele, event, customListener);
      ele.addEventListener(event, customListener, false);
    });

    if (dataEventOff) {
      dataEventOff.split(' ').forEach(function (event) {
        ele.removeEventListener(event, _this.hideTooltip);
        ele.addEventListener(event, _this.hideTooltip, false);
      });
    }
  };
  /* Unbind listener for custom event */


  target.prototype.customUnbindListener = function (ele) {
    var _this$state2 = this.state,
        event = _this$state2.event,
        eventOff = _this$state2.eventOff;
    var dataEvent = event || ele.getAttribute('data-event');
    var dataEventOff = eventOff || ele.getAttribute('data-event-off');
    ele.removeEventListener(dataEvent, customListeners.get(ele, event));
    if (dataEventOff) ele.removeEventListener(dataEventOff, this.hideTooltip);
  };
}

/**
 * Util method to judge if it should follow capture model
 */
function isCapture (target) {
  target.prototype.isCapture = function (currentTarget) {
    return currentTarget && currentTarget.getAttribute('data-iscapture') === 'true' || this.props.isCapture || false;
  };
}

/**
 * Util method to get effect
 */
function getEffect (target) {
  target.prototype.getEffect = function (currentTarget) {
    var dataEffect = currentTarget.getAttribute('data-effect');
    return dataEffect || this.props.effect || 'float';
  };
}

/**
 * Util method to get effect
 */

var makeProxy = function makeProxy(e) {
  var proxy = {};

  for (var key in e) {
    if (typeof e[key] === 'function') {
      proxy[key] = e[key].bind(e);
    } else {
      proxy[key] = e[key];
    }
  }

  return proxy;
};

var bodyListener = function bodyListener(callback, options, e) {
  var _options$respectEffec = options.respectEffect,
      respectEffect = _options$respectEffec === void 0 ? false : _options$respectEffec,
      _options$customEvent = options.customEvent,
      customEvent = _options$customEvent === void 0 ? false : _options$customEvent;
  var id = this.props.id;
  var tip = e.target.getAttribute('data-tip') || null;
  var forId = e.target.getAttribute('data-for') || null;
  var target = e.target;

  if (this.isCustomEvent(target) && !customEvent) {
    return;
  }

  var isTargetBelongsToTooltip = id == null && forId == null || forId === id;

  if (tip != null && (!respectEffect || this.getEffect(target) === 'float') && isTargetBelongsToTooltip) {
    var proxy = makeProxy(e);
    proxy.currentTarget = target;
    callback(proxy);
  }
};

var findCustomEvents = function findCustomEvents(targetArray, dataAttribute) {
  var events = {};
  targetArray.forEach(function (target) {
    var event = target.getAttribute(dataAttribute);
    if (event) event.split(' ').forEach(function (event) {
      return events[event] = true;
    });
  });
  return events;
};

var getBody = function getBody() {
  return document.getElementsByTagName('body')[0];
};

function bodyMode (target) {
  target.prototype.isBodyMode = function () {
    return !!this.props.bodyMode;
  };

  target.prototype.bindBodyListener = function (targetArray) {
    var _this = this;

    var _this$state = this.state,
        event = _this$state.event,
        eventOff = _this$state.eventOff,
        possibleCustomEvents = _this$state.possibleCustomEvents,
        possibleCustomEventsOff = _this$state.possibleCustomEventsOff;
    var body = getBody();
    var customEvents = findCustomEvents(targetArray, 'data-event');
    var customEventsOff = findCustomEvents(targetArray, 'data-event-off');
    if (event != null) customEvents[event] = true;
    if (eventOff != null) customEventsOff[eventOff] = true;
    possibleCustomEvents.split(' ').forEach(function (event) {
      return customEvents[event] = true;
    });
    possibleCustomEventsOff.split(' ').forEach(function (event) {
      return customEventsOff[event] = true;
    });
    this.unbindBodyListener(body);
    var listeners = this.bodyModeListeners = {};

    if (event == null) {
      listeners.mouseover = bodyListener.bind(this, this.showTooltip, {});
      listeners.mousemove = bodyListener.bind(this, this.updateTooltip, {
        respectEffect: true
      });
      listeners.mouseout = bodyListener.bind(this, this.hideTooltip, {});
    }

    for (var _event in customEvents) {
      listeners[_event] = bodyListener.bind(this, function (e) {
        var targetEventOff = e.currentTarget.getAttribute('data-event-off') || eventOff;
        checkStatus.call(_this, targetEventOff, e);
      }, {
        customEvent: true
      });
    }

    for (var _event2 in customEventsOff) {
      listeners[_event2] = bodyListener.bind(this, this.hideTooltip, {
        customEvent: true
      });
    }

    for (var _event3 in listeners) {
      body.addEventListener(_event3, listeners[_event3]);
    }
  };

  target.prototype.unbindBodyListener = function (body) {
    body = body || getBody();
    var listeners = this.bodyModeListeners;

    for (var event in listeners) {
      body.removeEventListener(event, listeners[event]);
    }
  };
}

/**
 * Tracking target removing from DOM.
 * It's necessary to hide tooltip when it's target disappears.
 * Otherwise, the tooltip would be shown forever until another target
 * is triggered.
 *
 * If MutationObserver is not available, this feature just doesn't work.
 */
// https://hacks.mozilla.org/2012/05/dom-mutationobserver-reacting-to-dom-changes-without-killing-browser-performance/
var getMutationObserverClass = function getMutationObserverClass() {
  return window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
};

function trackRemoval (target) {
  target.prototype.bindRemovalTracker = function () {
    var _this = this;

    var MutationObserver = getMutationObserverClass();
    if (MutationObserver == null) return;
    var observer = new MutationObserver(function (mutations) {
      for (var m1 = 0; m1 < mutations.length; m1++) {
        var mutation = mutations[m1];

        for (var m2 = 0; m2 < mutation.removedNodes.length; m2++) {
          var element = mutation.removedNodes[m2];

          if (element === _this.state.currentTarget) {
            _this.hideTooltip();

            return;
          }
        }
      }
    });
    observer.observe(window.document, {
      childList: true,
      subtree: true
    });
    this.removalTracker = observer;
  };

  target.prototype.unbindRemovalTracker = function () {
    if (this.removalTracker) {
      this.removalTracker.disconnect();
      this.removalTracker = null;
    }
  };
}

/**
 * Calculate the position of tooltip
 *
 * @params
 * - `e` {Event} the event of current mouse
 * - `target` {Element} the currentTarget of the event
 * - `node` {DOM} the react-tooltip object
 * - `place` {String} top / right / bottom / left
 * - `effect` {String} float / solid
 * - `offset` {Object} the offset to default position
 *
 * @return {Object}
 * - `isNewState` {Bool} required
 * - `newState` {Object}
 * - `position` {Object} {left: {Number}, top: {Number}}
 */
function getPosition (e, target, node, place, desiredPlace, effect, offset) {
  var _getDimensions = getDimensions(node),
      tipWidth = _getDimensions.width,
      tipHeight = _getDimensions.height;

  var _getDimensions2 = getDimensions(target),
      targetWidth = _getDimensions2.width,
      targetHeight = _getDimensions2.height;

  var _getCurrentOffset = getCurrentOffset(e, target, effect),
      mouseX = _getCurrentOffset.mouseX,
      mouseY = _getCurrentOffset.mouseY;

  var defaultOffset = getDefaultPosition(effect, targetWidth, targetHeight, tipWidth, tipHeight);

  var _calculateOffset = calculateOffset(offset),
      extraOffsetX = _calculateOffset.extraOffsetX,
      extraOffsetY = _calculateOffset.extraOffsetY;

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  var _getParent = getParent(node),
      parentTop = _getParent.parentTop,
      parentLeft = _getParent.parentLeft; // Get the edge offset of the tooltip


  var getTipOffsetLeft = function getTipOffsetLeft(place) {
    var offsetX = defaultOffset[place].l;
    return mouseX + offsetX + extraOffsetX;
  };

  var getTipOffsetRight = function getTipOffsetRight(place) {
    var offsetX = defaultOffset[place].r;
    return mouseX + offsetX + extraOffsetX;
  };

  var getTipOffsetTop = function getTipOffsetTop(place) {
    var offsetY = defaultOffset[place].t;
    return mouseY + offsetY + extraOffsetY;
  };

  var getTipOffsetBottom = function getTipOffsetBottom(place) {
    var offsetY = defaultOffset[place].b;
    return mouseY + offsetY + extraOffsetY;
  }; //
  // Functions to test whether the tooltip's sides are inside
  // the client window for a given orientation p
  //
  //  _____________
  // |             | <-- Right side
  // | p = 'left'  |\
  // |             |/  |\
  // |_____________|   |_\  <-- Mouse
  //      / \           |
  //       |
  //       |
  //  Bottom side
  //


  var outsideLeft = function outsideLeft(p) {
    return getTipOffsetLeft(p) < 0;
  };

  var outsideRight = function outsideRight(p) {
    return getTipOffsetRight(p) > windowWidth;
  };

  var outsideTop = function outsideTop(p) {
    return getTipOffsetTop(p) < 0;
  };

  var outsideBottom = function outsideBottom(p) {
    return getTipOffsetBottom(p) > windowHeight;
  }; // Check whether the tooltip with orientation p is completely inside the client window


  var outside = function outside(p) {
    return outsideLeft(p) || outsideRight(p) || outsideTop(p) || outsideBottom(p);
  };

  var inside = function inside(p) {
    return !outside(p);
  };

  var placesList = ['top', 'bottom', 'left', 'right'];
  var insideList = [];

  for (var i = 0; i < 4; i++) {
    var p = placesList[i];

    if (inside(p)) {
      insideList.push(p);
    }
  }

  var isNewState = false;
  var newPlace;
  var shouldUpdatePlace = desiredPlace !== place;

  if (inside(desiredPlace) && shouldUpdatePlace) {
    isNewState = true;
    newPlace = desiredPlace;
  } else if (insideList.length > 0 && outside(desiredPlace) && outside(place)) {
    isNewState = true;
    newPlace = insideList[0];
  }

  if (isNewState) {
    return {
      isNewState: true,
      newState: {
        place: newPlace
      }
    };
  }

  return {
    isNewState: false,
    position: {
      left: parseInt(getTipOffsetLeft(place) - parentLeft, 10),
      top: parseInt(getTipOffsetTop(place) - parentTop, 10)
    }
  };
}

var getDimensions = function getDimensions(node) {
  var _node$getBoundingClie = node.getBoundingClientRect(),
      height = _node$getBoundingClie.height,
      width = _node$getBoundingClie.width;

  return {
    height: parseInt(height, 10),
    width: parseInt(width, 10)
  };
}; // Get current mouse offset


var getCurrentOffset = function getCurrentOffset(e, currentTarget, effect) {
  var boundingClientRect = currentTarget.getBoundingClientRect();
  var targetTop = boundingClientRect.top;
  var targetLeft = boundingClientRect.left;

  var _getDimensions3 = getDimensions(currentTarget),
      targetWidth = _getDimensions3.width,
      targetHeight = _getDimensions3.height;

  if (effect === 'float') {
    return {
      mouseX: e.clientX,
      mouseY: e.clientY
    };
  }

  return {
    mouseX: targetLeft + targetWidth / 2,
    mouseY: targetTop + targetHeight / 2
  };
}; // List all possibility of tooltip final offset
// This is useful in judging if it is necessary for tooltip to switch position when out of window


var getDefaultPosition = function getDefaultPosition(effect, targetWidth, targetHeight, tipWidth, tipHeight) {
  var top;
  var right;
  var bottom;
  var left;
  var disToMouse = 3;
  var triangleHeight = 2;
  var cursorHeight = 12; // Optimize for float bottom only, cause the cursor will hide the tooltip

  if (effect === 'float') {
    top = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: -(tipHeight + disToMouse + triangleHeight),
      b: -disToMouse
    };
    bottom = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: disToMouse + cursorHeight,
      b: tipHeight + disToMouse + triangleHeight + cursorHeight
    };
    left = {
      l: -(tipWidth + disToMouse + triangleHeight),
      r: -disToMouse,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
    right = {
      l: disToMouse,
      r: tipWidth + disToMouse + triangleHeight,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
  } else if (effect === 'solid') {
    top = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: -(targetHeight / 2 + tipHeight + triangleHeight),
      b: -(targetHeight / 2)
    };
    bottom = {
      l: -(tipWidth / 2),
      r: tipWidth / 2,
      t: targetHeight / 2,
      b: targetHeight / 2 + tipHeight + triangleHeight
    };
    left = {
      l: -(tipWidth + targetWidth / 2 + triangleHeight),
      r: -(targetWidth / 2),
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
    right = {
      l: targetWidth / 2,
      r: tipWidth + targetWidth / 2 + triangleHeight,
      t: -(tipHeight / 2),
      b: tipHeight / 2
    };
  }

  return {
    top: top,
    bottom: bottom,
    left: left,
    right: right
  };
}; // Consider additional offset into position calculation


var calculateOffset = function calculateOffset(offset) {
  var extraOffsetX = 0;
  var extraOffsetY = 0;

  if (Object.prototype.toString.apply(offset) === '[object String]') {
    offset = JSON.parse(offset.toString().replace(/'/g, '"'));
  }

  for (var key in offset) {
    if (key === 'top') {
      extraOffsetY -= parseInt(offset[key], 10);
    } else if (key === 'bottom') {
      extraOffsetY += parseInt(offset[key], 10);
    } else if (key === 'left') {
      extraOffsetX -= parseInt(offset[key], 10);
    } else if (key === 'right') {
      extraOffsetX += parseInt(offset[key], 10);
    }
  }

  return {
    extraOffsetX: extraOffsetX,
    extraOffsetY: extraOffsetY
  };
}; // Get the offset of the parent elements


var getParent = function getParent(currentTarget) {
  var currentParent = currentTarget;

  while (currentParent) {
    var computedStyle = window.getComputedStyle(currentParent); // transform and will-change: transform change the containing block
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_Block

    if (computedStyle.getPropertyValue('transform') !== 'none' || computedStyle.getPropertyValue('will-change') === 'transform') break;
    currentParent = currentParent.parentElement;
  }

  var parentTop = currentParent && currentParent.getBoundingClientRect().top || 0;
  var parentLeft = currentParent && currentParent.getBoundingClientRect().left || 0;
  return {
    parentTop: parentTop,
    parentLeft: parentLeft
  };
};

/**
 * To get the tooltip content
 * it may comes from data-tip or this.props.children
 * it should support multiline
 *
 * @params
 * - `tip` {String} value of data-tip
 * - `children` {ReactElement} this.props.children
 * - `multiline` {Any} could be Bool(true/false) or String('true'/'false')
 *
 * @return
 * - String or react component
 */
function getTipContent (tip, children, getContent, multiline) {
  if (children) return children;
  if (getContent !== undefined && getContent !== null) return getContent; // getContent can be 0, '', etc.

  if (getContent === null) return null; // Tip not exist and children is null or undefined

  var regexp = /<br\s*\/?>/;

  if (!multiline || multiline === 'false' || !regexp.test(tip)) {
    // No trim(), so that user can keep their input
    return tip;
  } // Multiline tooltip content


  return tip.split(regexp).map(function (d, i) {
    return react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", {
      key: i,
      className: "multi-line"
    }, d);
  });
}

/**
 * Support aria- and role in ReactTooltip
 *
 * @params props {Object}
 * @return {Object}
 */
function parseAria(props) {
  var ariaObj = {};
  Object.keys(props).filter(function (prop) {
    // aria-xxx and role is acceptable
    return /(^aria-\w+$|^role$)/.test(prop);
  }).forEach(function (prop) {
    ariaObj[prop] = props[prop];
  });
  return ariaObj;
}

/**
 * Convert nodelist to array
 * @see https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/core/createArrayFromMixed.js#L24
 * NodeLists are functions in Safari
 */
function nodeListToArray (nodeList) {
  var length = nodeList.length;

  if (nodeList.hasOwnProperty) {
    return Array.prototype.slice.call(nodeList);
  }

  return new Array(length).fill().map(function (index) {
    return nodeList[index];
  });
}

function generateUUID() {
  return 't' + (0,uuid__WEBPACK_IMPORTED_MODULE_2__["default"])();
}

var baseCss = ".__react_component_tooltip {\n  border-radius: 3px;\n  display: inline-block;\n  font-size: 13px;\n  left: -999em;\n  opacity: 0;\n  padding: 8px 21px;\n  position: fixed;\n  pointer-events: none;\n  transition: opacity 0.3s ease-out;\n  top: -999em;\n  visibility: hidden;\n  z-index: 999;\n}\n.__react_component_tooltip.allow_hover, .__react_component_tooltip.allow_click {\n  pointer-events: auto;\n}\n.__react_component_tooltip::before, .__react_component_tooltip::after {\n  content: \"\";\n  width: 0;\n  height: 0;\n  position: absolute;\n}\n.__react_component_tooltip.show {\n  opacity: 0.9;\n  margin-top: 0;\n  margin-left: 0;\n  visibility: visible;\n}\n.__react_component_tooltip.place-top::before {\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  bottom: -8px;\n  left: 50%;\n  margin-left: -10px;\n}\n.__react_component_tooltip.place-bottom::before {\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent;\n  top: -8px;\n  left: 50%;\n  margin-left: -10px;\n}\n.__react_component_tooltip.place-left::before {\n  border-top: 6px solid transparent;\n  border-bottom: 6px solid transparent;\n  right: -8px;\n  top: 50%;\n  margin-top: -5px;\n}\n.__react_component_tooltip.place-right::before {\n  border-top: 6px solid transparent;\n  border-bottom: 6px solid transparent;\n  left: -8px;\n  top: 50%;\n  margin-top: -5px;\n}\n.__react_component_tooltip .multi-line {\n  display: block;\n  padding: 2px 0;\n  text-align: center;\n}";

/**
 * Default pop-up style values (text color, background color).
 */
var defaultColors = {
  dark: {
    text: '#fff',
    background: '#222',
    border: 'transparent',
    arrow: '#222'
  },
  success: {
    text: '#fff',
    background: '#8DC572',
    border: 'transparent',
    arrow: '#8DC572'
  },
  warning: {
    text: '#fff',
    background: '#F0AD4E',
    border: 'transparent',
    arrow: '#F0AD4E'
  },
  error: {
    text: '#fff',
    background: '#BE6464',
    border: 'transparent',
    arrow: '#BE6464'
  },
  info: {
    text: '#fff',
    background: '#337AB7',
    border: 'transparent',
    arrow: '#337AB7'
  },
  light: {
    text: '#222',
    background: '#fff',
    border: 'transparent',
    arrow: '#fff'
  }
};
function getDefaultPopupColors(type) {
  return defaultColors[type] ? _objectSpread2({}, defaultColors[type]) : undefined;
}

/**
 * Generates the specific tooltip style for use on render.
 */

function generateTooltipStyle(uuid, customColors, type, hasBorder) {
  return generateStyle(uuid, getPopupColors(customColors, type, hasBorder));
}
/**
 * Generates the tooltip style rules based on the element-specified "data-type" property.
 */

function generateStyle(uuid, colors) {
  var textColor = colors.text;
  var backgroundColor = colors.background;
  var borderColor = colors.border;
  var arrowColor = colors.arrow;
  return "\n  \t.".concat(uuid, " {\n\t    color: ").concat(textColor, ";\n\t    background: ").concat(backgroundColor, ";\n\t    border: 1px solid ").concat(borderColor, ";\n  \t}\n\n  \t.").concat(uuid, ".place-top {\n        margin-top: -10px;\n    }\n    .").concat(uuid, ".place-top::before {\n        border-top: 8px solid ").concat(borderColor, ";\n    }\n    .").concat(uuid, ".place-top::after {\n        border-left: 8px solid transparent;\n        border-right: 8px solid transparent;\n        bottom: -6px;\n        left: 50%;\n        margin-left: -8px;\n        border-top-color: ").concat(arrowColor, ";\n        border-top-style: solid;\n        border-top-width: 6px;\n    }\n\n    .").concat(uuid, ".place-bottom {\n        margin-top: 10px;\n    }\n    .").concat(uuid, ".place-bottom::before {\n        border-bottom: 8px solid ").concat(borderColor, ";\n    }\n    .").concat(uuid, ".place-bottom::after {\n        border-left: 8px solid transparent;\n        border-right: 8px solid transparent;\n        top: -6px;\n        left: 50%;\n        margin-left: -8px;\n        border-bottom-color: ").concat(arrowColor, ";\n        border-bottom-style: solid;\n        border-bottom-width: 6px;\n    }\n\n    .").concat(uuid, ".place-left {\n        margin-left: -10px;\n    }\n    .").concat(uuid, ".place-left::before {\n        border-left: 8px solid ").concat(borderColor, ";\n    }\n    .").concat(uuid, ".place-left::after {\n        border-top: 5px solid transparent;\n        border-bottom: 5px solid transparent;\n        right: -6px;\n        top: 50%;\n        margin-top: -4px;\n        border-left-color: ").concat(arrowColor, ";\n        border-left-style: solid;\n        border-left-width: 6px;\n    }\n\n    .").concat(uuid, ".place-right {\n        margin-left: 10px;\n    }\n    .").concat(uuid, ".place-right::before {\n        border-right: 8px solid ").concat(borderColor, ";\n    }\n    .").concat(uuid, ".place-right::after {\n        border-top: 5px solid transparent;\n        border-bottom: 5px solid transparent;\n        left: -6px;\n        top: 50%;\n        margin-top: -4px;\n        border-right-color: ").concat(arrowColor, ";\n        border-right-style: solid;\n        border-right-width: 6px;\n    }\n  ");
}

function getPopupColors(customColors, type, hasBorder) {
  var textColor = customColors.text;
  var backgroundColor = customColors.background;
  var borderColor = customColors.border;
  var arrowColor = customColors.arrow ? customColors.arrow : customColors.background;
  var colors = getDefaultPopupColors(type);

  if (textColor) {
    colors.text = textColor;
  }

  if (backgroundColor) {
    colors.background = backgroundColor;
  }

  if (hasBorder) {
    if (borderColor) {
      colors.border = borderColor;
    } else {
      colors.border = type === 'light' ? 'black' : 'white';
    }
  }

  if (arrowColor) {
    colors.arrow = arrowColor;
  }

  return colors;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global_1 =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var fails = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var objectPropertyIsEnumerable = {
	f: f
};

var createPropertyDescriptor = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var toString = {}.toString;

var classofRaw = function (it) {
  return toString.call(it).slice(8, -1);
};

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings



var toIndexedObject = function (it) {
  return indexedObject(requireObjectCoercible(it));
};

var isObject = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
var toPrimitive = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject = function (argument) {
  return Object(requireObjectCoercible(argument));
};

var hasOwnProperty = {}.hasOwnProperty;

var has = function hasOwn(it, key) {
  return hasOwnProperty.call(toObject(it), key);
};

var document$1 = global_1.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document$1) && isObject(document$1.createElement);

var documentCreateElement = function (it) {
  return EXISTS ? document$1.createElement(it) : {};
};

// Thank's IE8 for his funny defineProperty
var ie8DomDefine = !descriptors && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- requied for testing
  return Object.defineProperty(documentCreateElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
var f$1 = descriptors ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (ie8DomDefine) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
};

var objectGetOwnPropertyDescriptor = {
	f: f$1
};

var anObject = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};

// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
var f$2 = descriptors ? $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (ie8DomDefine) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var objectDefineProperty = {
	f: f$2
};

var createNonEnumerableProperty = descriptors ? function (object, key, value) {
  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var setGlobal = function (key, value) {
  try {
    createNonEnumerableProperty(global_1, key, value);
  } catch (error) {
    global_1[key] = value;
  } return value;
};

var SHARED = '__core-js_shared__';
var store = global_1[SHARED] || setGlobal(SHARED, {});

var sharedStore = store;

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof sharedStore.inspectSource != 'function') {
  sharedStore.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

var inspectSource = sharedStore.inspectSource;

var WeakMap = global_1.WeakMap;

var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

var shared = createCommonjsModule(function (module) {
(module.exports = function (key, value) {
  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.12.1',
  mode:  'global',
  copyright: '© 2021 Denis Pushkarev (zloirock.ru)'
});
});

var id = 0;
var postfix = Math.random();

var uid = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

var keys = shared('keys');

var sharedKey = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys = {};

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var WeakMap$1 = global_1.WeakMap;
var set, get, has$1;

var enforce = function (it) {
  return has$1(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (nativeWeakMap || sharedStore.state) {
  var store$1 = sharedStore.state || (sharedStore.state = new WeakMap$1());
  var wmget = store$1.get;
  var wmhas = store$1.has;
  var wmset = store$1.set;
  set = function (it, metadata) {
    if (wmhas.call(store$1, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset.call(store$1, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store$1, it) || {};
  };
  has$1 = function (it) {
    return wmhas.call(store$1, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (has(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return has(it, STATE) ? it[STATE] : {};
  };
  has$1 = function (it) {
    return has(it, STATE);
  };
}

var internalState = {
  set: set,
  get: get,
  has: has$1,
  enforce: enforce,
  getterFor: getterFor
};

var redefine = createCommonjsModule(function (module) {
var getInternalState = internalState.get;
var enforceInternalState = internalState.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  var state;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) {
      createNonEnumerableProperty(value, 'name', key);
    }
    state = enforceInternalState(value);
    if (!state.source) {
      state.source = TEMPLATE.join(typeof key == 'string' ? key : '');
    }
  }
  if (O === global_1) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});
});

var path = global_1;

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

var getBuiltIn = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
};

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.es/ecma262/#sec-tointeger
var toInteger = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var max = Math.max;
var min$1 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
};

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};

var indexOf = arrayIncludes.indexOf;


var objectKeysInternal = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return objectKeysInternal(O, hiddenKeys$1);
};

var objectGetOwnPropertyNames = {
	f: f$3
};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
var f$4 = Object.getOwnPropertySymbols;

var objectGetOwnPropertySymbols = {
	f: f$4
};

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = objectGetOwnPropertyNames.f(anObject(it));
  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

var copyConstructorProperties = function (target, source) {
  var keys = ownKeys$1(source);
  var defineProperty = objectDefineProperty.f;
  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

var isForced_1 = isForced;

var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global_1;
  } else if (STATIC) {
    target = global_1[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global_1[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor$1(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};

var aFunction$1 = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};

// optional / simple context binding
var functionBindContext = function (fn, that, length) {
  aFunction$1(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
var isArray = Array.isArray || function isArray(arg) {
  return classofRaw(arg) == 'Array';
};

var engineUserAgent = getBuiltIn('navigator', 'userAgent') || '';

var process = global_1.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] < 4 ? 1 : match[0] + match[1];
} else if (engineUserAgent) {
  match = engineUserAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = engineUserAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

var engineV8Version = version && +version;

/* eslint-disable es/no-symbol -- required for testing */



// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
  return !String(Symbol()) ||
    // Chrome 38 Symbol has incorrect toString conversion
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && engineV8Version && engineV8Version < 41;
});

/* eslint-disable es/no-symbol -- required for testing */


var useSymbolAsUid = nativeSymbol
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var WellKnownSymbolsStore = shared('wks');
var Symbol$1 = global_1.Symbol;
var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

var wellKnownSymbol = function (name) {
  if (!has(WellKnownSymbolsStore, name) || !(nativeSymbol || typeof WellKnownSymbolsStore[name] == 'string')) {
    if (nativeSymbol && has(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
    }
  } return WellKnownSymbolsStore[name];
};

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.es/ecma262/#sec-arrayspeciescreate
var arraySpeciesCreate = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex, filterOut }` methods implementation
var createMethod$1 = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var IS_FILTER_OUT = TYPE == 7;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = indexedObject(O);
    var boundFunction = functionBindContext(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER || IS_FILTER_OUT ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else switch (TYPE) {
          case 4: return false;             // every
          case 7: push.call(target, value); // filterOut
        }
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

var arrayIteration = {
  // `Array.prototype.forEach` method
  // https://tc39.es/ecma262/#sec-array.prototype.foreach
  forEach: createMethod$1(0),
  // `Array.prototype.map` method
  // https://tc39.es/ecma262/#sec-array.prototype.map
  map: createMethod$1(1),
  // `Array.prototype.filter` method
  // https://tc39.es/ecma262/#sec-array.prototype.filter
  filter: createMethod$1(2),
  // `Array.prototype.some` method
  // https://tc39.es/ecma262/#sec-array.prototype.some
  some: createMethod$1(3),
  // `Array.prototype.every` method
  // https://tc39.es/ecma262/#sec-array.prototype.every
  every: createMethod$1(4),
  // `Array.prototype.find` method
  // https://tc39.es/ecma262/#sec-array.prototype.find
  find: createMethod$1(5),
  // `Array.prototype.findIndex` method
  // https://tc39.es/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod$1(6),
  // `Array.prototype.filterOut` method
  // https://github.com/tc39/proposal-array-filtering
  filterOut: createMethod$1(7)
};

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys = Object.keys || function keys(O) {
  return objectKeysInternal(O, enumBugKeys);
};

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
  return O;
};

var html = getBuiltIn('document', 'documentElement');

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject -- old IE */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : objectDefineProperties(result, Properties);
};

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: objectCreate(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};

var $find = arrayIteration.find;


var FIND = 'find';
var SKIPS_HOLES = true;

// Shouldn't skip holes
if (FIND in []) Array(1)[FIND](function () { SKIPS_HOLES = false; });

// `Array.prototype.find` method
// https://tc39.es/ecma262/#sec-array.prototype.find
_export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables(FIND);

var _class, _class2, _temp;

var ReactTooltip = staticMethods(_class = windowListener(_class = customEvent(_class = isCapture(_class = getEffect(_class = bodyMode(_class = trackRemoval(_class = (_temp = _class2 =
/*#__PURE__*/
function (_React$Component) {
  _inherits(ReactTooltip, _React$Component);

  _createClass(ReactTooltip, null, [{
    key: "propTypes",
    get: function get() {
      return {
        uuid: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        children: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().any),
        place: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        type: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        effect: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        offset: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().object),
        multiline: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
        border: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
        textColor: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        backgroundColor: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        borderColor: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        arrowColor: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        insecure: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
        "class": (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        className: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        id: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        html: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
        delayHide: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
        delayUpdate: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
        delayShow: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().number),
        event: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        eventOff: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        isCapture: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
        globalEventOff: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        getContent: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().any),
        afterShow: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
        afterHide: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
        overridePosition: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().func),
        disable: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
        scrollHide: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
        resizeHide: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
        wrapper: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        bodyMode: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool),
        possibleCustomEvents: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        possibleCustomEventsOff: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().string),
        clickable: (prop_types__WEBPACK_IMPORTED_MODULE_1___default().bool)
      };
    }
  }]);

  function ReactTooltip(props) {
    var _this;

    _classCallCheck(this, ReactTooltip);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReactTooltip).call(this, props));
    _this.state = {
      uuid: props.uuid || generateUUID(),
      place: props.place || 'top',
      // Direction of tooltip
      desiredPlace: props.place || 'top',
      type: 'dark',
      // Color theme of tooltip
      effect: 'float',
      // float or fixed
      show: false,
      border: false,
      customColors: {},
      offset: {},
      extraClass: '',
      html: false,
      delayHide: 0,
      delayShow: 0,
      event: props.event || null,
      eventOff: props.eventOff || null,
      currentEvent: null,
      // Current mouse event
      currentTarget: null,
      // Current target of mouse event
      ariaProps: parseAria(props),
      // aria- and role attributes
      isEmptyTip: false,
      disable: false,
      possibleCustomEvents: props.possibleCustomEvents || '',
      possibleCustomEventsOff: props.possibleCustomEventsOff || '',
      originTooltip: null,
      isMultiline: false
    };

    _this.bind(['showTooltip', 'updateTooltip', 'hideTooltip', 'hideTooltipOnScroll', 'getTooltipContent', 'globalRebuild', 'globalShow', 'globalHide', 'onWindowResize', 'mouseOnToolTip']);

    _this.mount = true;
    _this.delayShowLoop = null;
    _this.delayHideLoop = null;
    _this.delayReshow = null;
    _this.intervalUpdateContent = null;
    return _this;
  }
  /**
   * For unify the bind and unbind listener
   */


  _createClass(ReactTooltip, [{
    key: "bind",
    value: function bind(methodArray) {
      var _this2 = this;

      methodArray.forEach(function (method) {
        _this2[method] = _this2[method].bind(_this2);
      });
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          insecure = _this$props.insecure,
          resizeHide = _this$props.resizeHide;
      this.bindListener(); // Bind listener for tooltip

      this.bindWindowEvents(resizeHide); // Bind global event for static method

      this.injectStyles(); // Inject styles for each DOM root having tooltip.
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mount = false;
      this.clearTimer();
      this.unbindListener();
      this.removeScrollListener(this.state.currentTarget);
      this.unbindWindowEvents();
    }
    /* Look for the closest DOM root having tooltip and inject styles. */

  }, {
    key: "injectStyles",
    value: function injectStyles() {
      var tooltipRef = this.tooltipRef;

      if (!tooltipRef) {
        return;
      }

      var parentNode = tooltipRef.parentNode;

      while (parentNode.parentNode) {
        parentNode = parentNode.parentNode;
      }

      var domRoot;

      switch (parentNode.constructor.name) {
        case 'Document':
        case 'HTMLDocument':
        case undefined:
          domRoot = parentNode.head;
          break;

        case 'ShadowRoot':
        default:
          domRoot = parentNode;
          break;
      } // Prevent styles duplication.


      if (!domRoot.querySelector('style[data-react-tooltip]')) {
        var style = document.createElement('style');
        style.textContent = baseCss;
        style.setAttribute('data-react-tooltip', 'true');
        domRoot.appendChild(style);
      }
    }
    /**
     * Return if the mouse is on the tooltip.
     * @returns {boolean} true - mouse is on the tooltip
     */

  }, {
    key: "mouseOnToolTip",
    value: function mouseOnToolTip() {
      var show = this.state.show;

      if (show && this.tooltipRef) {
        /* old IE or Firefox work around */
        if (!this.tooltipRef.matches) {
          /* old IE work around */
          if (this.tooltipRef.msMatchesSelector) {
            this.tooltipRef.matches = this.tooltipRef.msMatchesSelector;
          } else {
            /* old Firefox work around */
            this.tooltipRef.matches = this.tooltipRef.mozMatchesSelector;
          }
        }

        return this.tooltipRef.matches(':hover');
      }

      return false;
    }
    /**
     * Pick out corresponded target elements
     */

  }, {
    key: "getTargetArray",
    value: function getTargetArray(id) {
      var targetArray = [];
      var selector;

      if (!id) {
        selector = '[data-tip]:not([data-for])';
      } else {
        var escaped = id.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        selector = "[data-tip][data-for=\"".concat(escaped, "\"]");
      } // Scan document for shadow DOM elements


      nodeListToArray(document.getElementsByTagName('*')).filter(function (element) {
        return element.shadowRoot;
      }).forEach(function (element) {
        targetArray = targetArray.concat(nodeListToArray(element.shadowRoot.querySelectorAll(selector)));
      });
      return targetArray.concat(nodeListToArray(document.querySelectorAll(selector)));
    }
    /**
     * Bind listener to the target elements
     * These listeners used to trigger showing or hiding the tooltip
     */

  }, {
    key: "bindListener",
    value: function bindListener() {
      var _this3 = this;

      var _this$props2 = this.props,
          id = _this$props2.id,
          globalEventOff = _this$props2.globalEventOff,
          isCapture = _this$props2.isCapture;
      var targetArray = this.getTargetArray(id);
      targetArray.forEach(function (target) {
        if (target.getAttribute('currentItem') === null) {
          target.setAttribute('currentItem', 'false');
        }

        _this3.unbindBasicListener(target);

        if (_this3.isCustomEvent(target)) {
          _this3.customUnbindListener(target);
        }
      });

      if (this.isBodyMode()) {
        this.bindBodyListener(targetArray);
      } else {
        targetArray.forEach(function (target) {
          var isCaptureMode = _this3.isCapture(target);

          var effect = _this3.getEffect(target);

          if (_this3.isCustomEvent(target)) {
            _this3.customBindListener(target);

            return;
          }

          target.addEventListener('mouseenter', _this3.showTooltip, isCaptureMode);
          target.addEventListener('focus', _this3.showTooltip, isCaptureMode);

          if (effect === 'float') {
            target.addEventListener('mousemove', _this3.updateTooltip, isCaptureMode);
          }

          target.addEventListener('mouseleave', _this3.hideTooltip, isCaptureMode);
          target.addEventListener('blur', _this3.hideTooltip, isCaptureMode);
        });
      } // Global event to hide tooltip


      if (globalEventOff) {
        window.removeEventListener(globalEventOff, this.hideTooltip);
        window.addEventListener(globalEventOff, this.hideTooltip, isCapture);
      } // Track removal of targetArray elements from DOM


      this.bindRemovalTracker();
    }
    /**
     * Unbind listeners on target elements
     */

  }, {
    key: "unbindListener",
    value: function unbindListener() {
      var _this4 = this;

      var _this$props3 = this.props,
          id = _this$props3.id,
          globalEventOff = _this$props3.globalEventOff;

      if (this.isBodyMode()) {
        this.unbindBodyListener();
      } else {
        var targetArray = this.getTargetArray(id);
        targetArray.forEach(function (target) {
          _this4.unbindBasicListener(target);

          if (_this4.isCustomEvent(target)) _this4.customUnbindListener(target);
        });
      }

      if (globalEventOff) window.removeEventListener(globalEventOff, this.hideTooltip);
      this.unbindRemovalTracker();
    }
    /**
     * Invoke this before bind listener and unmount the component
     * it is necessary to invoke this even when binding custom event
     * so that the tooltip can switch between custom and default listener
     */

  }, {
    key: "unbindBasicListener",
    value: function unbindBasicListener(target) {
      var isCaptureMode = this.isCapture(target);
      target.removeEventListener('mouseenter', this.showTooltip, isCaptureMode);
      target.removeEventListener('mousemove', this.updateTooltip, isCaptureMode);
      target.removeEventListener('mouseleave', this.hideTooltip, isCaptureMode);
    }
  }, {
    key: "getTooltipContent",
    value: function getTooltipContent() {
      var _this$props4 = this.props,
          getContent = _this$props4.getContent,
          children = _this$props4.children; // Generate tooltip content

      var content;

      if (getContent) {
        if (Array.isArray(getContent)) {
          content = getContent[0] && getContent[0](this.state.originTooltip);
        } else {
          content = getContent(this.state.originTooltip);
        }
      }

      return getTipContent(this.state.originTooltip, children, content, this.state.isMultiline);
    }
  }, {
    key: "isEmptyTip",
    value: function isEmptyTip(placeholder) {
      return typeof placeholder === 'string' && placeholder === '' || placeholder === null;
    }
    /**
     * When mouse enter, show the tooltip
     */

  }, {
    key: "showTooltip",
    value: function showTooltip(e, isGlobalCall) {
      if (!this.tooltipRef) {
        return;
      }

      if (isGlobalCall) {
        // Don't trigger other elements belongs to other ReactTooltip
        var targetArray = this.getTargetArray(this.props.id);
        var isMyElement = targetArray.some(function (ele) {
          return ele === e.currentTarget;
        });
        if (!isMyElement) return;
      } // Get the tooltip content
      // calculate in this phrase so that tip width height can be detected


      var _this$props5 = this.props,
          multiline = _this$props5.multiline,
          getContent = _this$props5.getContent;
      var originTooltip = e.currentTarget.getAttribute('data-tip');
      var isMultiline = e.currentTarget.getAttribute('data-multiline') || multiline || false; // If it is focus event or called by ReactTooltip.show, switch to `solid` effect

      var switchToSolid = e instanceof window.FocusEvent || isGlobalCall; // if it needs to skip adding hide listener to scroll

      var scrollHide = true;

      if (e.currentTarget.getAttribute('data-scroll-hide')) {
        scrollHide = e.currentTarget.getAttribute('data-scroll-hide') === 'true';
      } else if (this.props.scrollHide != null) {
        scrollHide = this.props.scrollHide;
      } // adding aria-describedby to target to make tooltips read by screen readers


      if (e && e.currentTarget && e.currentTarget.setAttribute) {
        e.currentTarget.setAttribute('aria-describedby', this.state.uuid);
      } // Make sure the correct place is set


      var desiredPlace = e.currentTarget.getAttribute('data-place') || this.props.place || 'top';
      var effect = switchToSolid && 'solid' || this.getEffect(e.currentTarget);
      var offset = e.currentTarget.getAttribute('data-offset') || this.props.offset || {};
      var result = getPosition(e, e.currentTarget, this.tooltipRef, desiredPlace, desiredPlace, effect, offset);

      if (result.position && this.props.overridePosition) {
        result.position = this.props.overridePosition(result.position, e, e.currentTarget, this.tooltipRef, desiredPlace, desiredPlace, effect, offset);
      }

      var place = result.isNewState ? result.newState.place : desiredPlace; // To prevent previously created timers from triggering

      this.clearTimer();
      var target = e.currentTarget;
      var reshowDelay = this.state.show ? target.getAttribute('data-delay-update') || this.props.delayUpdate : 0;
      var self = this;

      var updateState = function updateState() {
        self.setState({
          originTooltip: originTooltip,
          isMultiline: isMultiline,
          desiredPlace: desiredPlace,
          place: place,
          type: target.getAttribute('data-type') || self.props.type || 'dark',
          customColors: {
            text: target.getAttribute('data-text-color') || self.props.textColor || null,
            background: target.getAttribute('data-background-color') || self.props.backgroundColor || null,
            border: target.getAttribute('data-border-color') || self.props.borderColor || null,
            arrow: target.getAttribute('data-arrow-color') || self.props.arrowColor || null
          },
          effect: effect,
          offset: offset,
          html: (target.getAttribute('data-html') ? target.getAttribute('data-html') === 'true' : self.props.html) || false,
          delayShow: target.getAttribute('data-delay-show') || self.props.delayShow || 0,
          delayHide: target.getAttribute('data-delay-hide') || self.props.delayHide || 0,
          delayUpdate: target.getAttribute('data-delay-update') || self.props.delayUpdate || 0,
          border: (target.getAttribute('data-border') ? target.getAttribute('data-border') === 'true' : self.props.border) || false,
          extraClass: target.getAttribute('data-class') || self.props["class"] || self.props.className || '',
          disable: (target.getAttribute('data-tip-disable') ? target.getAttribute('data-tip-disable') === 'true' : self.props.disable) || false,
          currentTarget: target
        }, function () {
          if (scrollHide) {
            self.addScrollListener(self.state.currentTarget);
          }

          self.updateTooltip(e);

          if (getContent && Array.isArray(getContent)) {
            self.intervalUpdateContent = setInterval(function () {
              if (self.mount) {
                var _getContent = self.props.getContent;
                var placeholder = getTipContent(originTooltip, '', _getContent[0](), isMultiline);
                var isEmptyTip = self.isEmptyTip(placeholder);
                self.setState({
                  isEmptyTip: isEmptyTip
                });
                self.updatePosition();
              }
            }, getContent[1]);
          }
        });
      }; // If there is no delay call immediately, don't allow events to get in first.


      if (reshowDelay) {
        this.delayReshow = setTimeout(updateState, reshowDelay);
      } else {
        updateState();
      }
    }
    /**
     * When mouse hover, update tool tip
     */

  }, {
    key: "updateTooltip",
    value: function updateTooltip(e) {
      var _this5 = this;

      var _this$state = this.state,
          delayShow = _this$state.delayShow,
          disable = _this$state.disable;
      var afterShow = this.props.afterShow;
      var placeholder = this.getTooltipContent();
      var eventTarget = e.currentTarget || e.target; // Check if the mouse is actually over the tooltip, if so don't hide the tooltip

      if (this.mouseOnToolTip()) {
        return;
      } // if the tooltip is empty, disable the tooltip


      if (this.isEmptyTip(placeholder) || disable) {
        return;
      }

      var delayTime = !this.state.show ? parseInt(delayShow, 10) : 0;

      var updateState = function updateState() {
        if (Array.isArray(placeholder) && placeholder.length > 0 || placeholder) {
          var isInvisible = !_this5.state.show;

          _this5.setState({
            currentEvent: e,
            currentTarget: eventTarget,
            show: true
          }, function () {
            _this5.updatePosition();

            if (isInvisible && afterShow) {
              afterShow(e);
            }
          });
        }
      };

      clearTimeout(this.delayShowLoop);

      if (delayTime) {
        this.delayShowLoop = setTimeout(updateState, delayTime);
      } else {
        updateState();
      }
    }
    /*
     * If we're mousing over the tooltip remove it when we leave.
     */

  }, {
    key: "listenForTooltipExit",
    value: function listenForTooltipExit() {
      var show = this.state.show;

      if (show && this.tooltipRef) {
        this.tooltipRef.addEventListener('mouseleave', this.hideTooltip);
      }
    }
  }, {
    key: "removeListenerForTooltipExit",
    value: function removeListenerForTooltipExit() {
      var show = this.state.show;

      if (show && this.tooltipRef) {
        this.tooltipRef.removeEventListener('mouseleave', this.hideTooltip);
      }
    }
    /**
     * When mouse leave, hide tooltip
     */

  }, {
    key: "hideTooltip",
    value: function hideTooltip(e, hasTarget) {
      var _this6 = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
        isScroll: false
      };
      var disable = this.state.disable;
      var isScroll = options.isScroll;
      var delayHide = isScroll ? 0 : this.state.delayHide;
      var afterHide = this.props.afterHide;
      var placeholder = this.getTooltipContent();
      if (!this.mount) return;
      if (this.isEmptyTip(placeholder) || disable) return; // if the tooltip is empty, disable the tooltip

      if (hasTarget) {
        // Don't trigger other elements belongs to other ReactTooltip
        var targetArray = this.getTargetArray(this.props.id);
        var isMyElement = targetArray.some(function (ele) {
          return ele === e.currentTarget;
        });
        if (!isMyElement || !this.state.show) return;
      } // clean up aria-describedby when hiding tooltip


      if (e && e.currentTarget && e.currentTarget.removeAttribute) {
        e.currentTarget.removeAttribute('aria-describedby');
      }

      var resetState = function resetState() {
        var isVisible = _this6.state.show; // Check if the mouse is actually over the tooltip, if so don't hide the tooltip

        if (_this6.mouseOnToolTip()) {
          _this6.listenForTooltipExit();

          return;
        }

        _this6.removeListenerForTooltipExit();

        _this6.setState({
          show: false
        }, function () {
          _this6.removeScrollListener(_this6.state.currentTarget);

          if (isVisible && afterHide) {
            afterHide(e);
          }
        });
      };

      this.clearTimer();

      if (delayHide) {
        this.delayHideLoop = setTimeout(resetState, parseInt(delayHide, 10));
      } else {
        resetState();
      }
    }
    /**
     * When scroll, hide tooltip
     */

  }, {
    key: "hideTooltipOnScroll",
    value: function hideTooltipOnScroll(event, hasTarget) {
      this.hideTooltip(event, hasTarget, {
        isScroll: true
      });
    }
    /**
     * Add scroll event listener when tooltip show
     * automatically hide the tooltip when scrolling
     */

  }, {
    key: "addScrollListener",
    value: function addScrollListener(currentTarget) {
      var isCaptureMode = this.isCapture(currentTarget);
      window.addEventListener('scroll', this.hideTooltipOnScroll, isCaptureMode);
    }
  }, {
    key: "removeScrollListener",
    value: function removeScrollListener(currentTarget) {
      var isCaptureMode = this.isCapture(currentTarget);
      window.removeEventListener('scroll', this.hideTooltipOnScroll, isCaptureMode);
    } // Calculation the position

  }, {
    key: "updatePosition",
    value: function updatePosition() {
      var _this7 = this;

      var _this$state2 = this.state,
          currentEvent = _this$state2.currentEvent,
          currentTarget = _this$state2.currentTarget,
          place = _this$state2.place,
          desiredPlace = _this$state2.desiredPlace,
          effect = _this$state2.effect,
          offset = _this$state2.offset;
      var node = this.tooltipRef;
      var result = getPosition(currentEvent, currentTarget, node, place, desiredPlace, effect, offset);

      if (result.position && this.props.overridePosition) {
        result.position = this.props.overridePosition(result.position, currentEvent, currentTarget, node, place, desiredPlace, effect, offset);
      }

      if (result.isNewState) {
        // Switch to reverse placement
        return this.setState(result.newState, function () {
          _this7.updatePosition();
        });
      } // Set tooltip position


      node.style.left = result.position.left + 'px';
      node.style.top = result.position.top + 'px';
    }
    /**
     * CLear all kinds of timeout of interval
     */

  }, {
    key: "clearTimer",
    value: function clearTimer() {
      clearTimeout(this.delayShowLoop);
      clearTimeout(this.delayHideLoop);
      clearTimeout(this.delayReshow);
      clearInterval(this.intervalUpdateContent);
    }
  }, {
    key: "hasCustomColors",
    value: function hasCustomColors() {
      var _this8 = this;

      return Boolean(Object.keys(this.state.customColors).find(function (color) {
        return color !== 'border' && _this8.state.customColors[color];
      }) || this.state.border && this.state.customColors['border']);
    }
  }, {
    key: "render",
    value: function render() {
      var _this9 = this;

      var _this$state3 = this.state,
          extraClass = _this$state3.extraClass,
          html = _this$state3.html,
          ariaProps = _this$state3.ariaProps,
          disable = _this$state3.disable,
          uuid = _this$state3.uuid;
      var content = this.getTooltipContent();
      var isEmptyTip = this.isEmptyTip(content);
      var style = generateTooltipStyle(this.state.uuid, this.state.customColors, this.state.type, this.state.border);
      var tooltipClass = '__react_component_tooltip' + " ".concat(this.state.uuid) + (this.state.show && !disable && !isEmptyTip ? ' show' : '') + (this.state.border ? ' border' : '') + " place-".concat(this.state.place) + // top, bottom, left, right
      " type-".concat(this.hasCustomColors() ? 'custom' : this.state.type) + ( // dark, success, warning, error, info, light, custom
      this.props.delayUpdate ? ' allow_hover' : '') + (this.props.clickable ? ' allow_click' : '');
      var Wrapper = this.props.wrapper;

      if (ReactTooltip.supportedWrappers.indexOf(Wrapper) < 0) {
        Wrapper = ReactTooltip.defaultProps.wrapper;
      }

      var wrapperClassName = [tooltipClass, extraClass].filter(Boolean).join(' ');

      if (html) {
        var htmlContent = "".concat(content, "\n<style aria-hidden=\"true\">").concat(style, "</style>");
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Wrapper, _extends({
          className: "".concat(wrapperClassName),
          id: this.props.id || uuid,
          ref: function ref(_ref) {
            return _this9.tooltipRef = _ref;
          }
        }, ariaProps, {
          "data-id": "tooltip",
          dangerouslySetInnerHTML: {
            __html: htmlContent
          }
        }));
      } else {
        return react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Wrapper, _extends({
          className: "".concat(wrapperClassName),
          id: this.props.id || uuid
        }, ariaProps, {
          ref: function ref(_ref2) {
            return _this9.tooltipRef = _ref2;
          },
          "data-id": "tooltip"
        }), react__WEBPACK_IMPORTED_MODULE_0___default().createElement("style", {
          dangerouslySetInnerHTML: {
            __html: style
          },
          "aria-hidden": "true"
        }), content);
      }
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var ariaProps = prevState.ariaProps;
      var newAriaProps = parseAria(nextProps);
      var isChanged = Object.keys(newAriaProps).some(function (props) {
        return newAriaProps[props] !== ariaProps[props];
      });

      if (!isChanged) {
        return null;
      }

      return _objectSpread2({}, prevState, {
        ariaProps: newAriaProps
      });
    }
  }]);

  return ReactTooltip;
}((react__WEBPACK_IMPORTED_MODULE_0___default().Component)), _defineProperty(_class2, "defaultProps", {
  insecure: true,
  resizeHide: true,
  wrapper: 'div',
  clickable: false
}), _defineProperty(_class2, "supportedWrappers", ['div', 'span']), _defineProperty(_class2, "displayName", 'ReactTooltip'), _temp)) || _class) || _class) || _class) || _class) || _class) || _class) || _class;

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ReactTooltip);
//# sourceMappingURL=index.es.js.map


/***/ }),

/***/ "./config/build.ts":
/*!*************************!*\
  !*** ./config/build.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildEslintrcMeta = exports.NAMESPACES = exports.NAMESPACE_CONFIG = void 0;
/* eslint-disable @typescript-eslint/no-require-imports */
const package_json_1 = __importDefault(__webpack_require__(/*! ../package.json */ "./package.json"));
exports.NAMESPACE_CONFIG = {
    base: {
        /** bad.js good.js 的后缀 */
        exampleExtension: 'js',
        /** Prism 语言设置 */
        prismLanguage: 'js',
        /** 插件前缀 */
        rulePrefix: '',
        /** 规则配置 */
        ruleConfig: __webpack_require__(/*! ./rules/base.json */ "./config/rules/base.json"),
        /** 各插件的文档地址 */
        getDocsUrl: (rule) => `https://eslint.org/docs/rules/${rule}`,
        /** 插件的名称 */
        pluginName: undefined,
    },
    typescript: {
        exampleExtension: 'ts',
        prismLanguage: 'ts',
        rulePrefix: '@typescript-eslint/',
        ruleConfig: __webpack_require__(/*! ./rules/typescript.json */ "./config/rules/typescript.json"),
        getDocsUrl: (rule) => `https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/${rule.replace(/.*\//, '')}.md`,
        pluginName: '@typescript-eslint/eslint-plugin',
    },
};
exports.NAMESPACES = Object.keys(exports.NAMESPACE_CONFIG);
/** 写入 eslintrc 中的元信息 */
function buildEslintrcMeta() {
    return `
/**
 * ${package_json_1.default.description}
 * ${package_json_1.default.homepage}
 *
 * 依赖版本：
 *   ${[
        'eslint',
        'eslint-plugin-import',
        '@babel/eslint-parser',
        '@typescript-eslint/parser',
        '@typescript-eslint/eslint-plugin',
    ]
        .map((key) => `${key} ${package_json_1.default.devDependencies[key]}`)
        .join('\n *   ')}
 *
 * 此文件是由脚本 scripts/build.ts 自动生成
 */
`;
}
exports.buildEslintrcMeta = buildEslintrcMeta;


/***/ }),

/***/ "./config/i18n.ts":
/*!************************!*\
  !*** ./config/i18n.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.locale = exports.languageOptions = exports.avaliableLanguages = void 0;
exports.avaliableLanguages = ['zh-CN'];
exports.languageOptions = {
    'zh-CN': '简体中文',
};
exports.locale = {
    'zh-CN': {},
};


/***/ }),

/***/ "./config/index.ts":
/*!*************************!*\
  !*** ./config/index.ts ***!
  \*************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./build */ "./config/build.ts"), exports);
__exportStar(__webpack_require__(/*! ./i18n */ "./config/i18n.ts"), exports);


/***/ }),

/***/ "./site/components/App.tsx":
/*!*********************************!*\
  !*** ./site/components/App.tsx ***!
  \*********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.App = void 0;
const react_1 = __importStar(__webpack_require__(/*! react */ "react"));
const react_tooltip_1 = __importDefault(__webpack_require__(/*! react-tooltip */ "./node_modules/react-tooltip/dist/index.es.js"));
const config_1 = __webpack_require__(/*! ../../config */ "./config/index.ts");
const GitHubCorner_1 = __webpack_require__(/*! ./GitHubCorner */ "./site/components/GitHubCorner.tsx");
const RuleTable_1 = __webpack_require__(/*! ./RuleTable */ "./site/components/RuleTable.tsx");
const utils_1 = __webpack_require__(/*! ../utils */ "./site/utils.ts");
const App = () => {
    const query = (0, utils_1.getQuery)();
    const [namespace, setNamespace] = (0, react_1.useState)((0, utils_1.defaultTo)(query.rule, config_1.NAMESPACES[0], config_1.NAMESPACES));
    const [hideOff, toggleHideOff] = (0, react_1.useState)(query.hideOff === '1');
    const language = (0, utils_1.getLanguage)();
    (0, react_1.useEffect)(() => {
        document.documentElement.lang = language;
    }, []);
    (0, react_1.useEffect)(() => {
        react_tooltip_1.default.rebuild();
    }, [namespace]);
    const Header = (react_1.default.createElement("div", { className: "flex-center" },
        react_1.default.createElement("div", { className: "container-fluid" },
            react_1.default.createElement("h1", { className: "site-title" }, "eslint-config-nstarter"),
            react_1.default.createElement("form", { className: "top-gap site-form" },
                react_1.default.createElement("select", { value: namespace, onChange: (e) => {
                        setNamespace(e.target.value);
                        (0, utils_1.replaceUrl)((0, utils_1.newUrl)({ query: { rule: e.target.value } }));
                    } }, config_1.NAMESPACES.map((namespace) => (react_1.default.createElement("option", { key: namespace, value: namespace }, namespace)))),
                react_1.default.createElement("label", null,
                    react_1.default.createElement("input", { type: "checkbox", checked: hideOff, onChange: (e) => {
                            toggleHideOff(e.target.checked);
                            (0, utils_1.replaceUrl)((0, utils_1.newUrl)({ query: { hideOff: e.target.checked } }));
                        } }),
                    (0, utils_1.t)('隐藏已禁用的规则'))))));
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(GitHubCorner_1.GitHubCorner, { href: "https://github.com/jiandaoyun/nstarter-eslint-config" }),
        Header,
        react_1.default.createElement(RuleTable_1.RuleTable, { namespace: namespace, hideOff: hideOff }),
        react_1.default.createElement(react_tooltip_1.default, { className: "site-react-tooltip", place: "top", type: "error", effect: "solid", delayHide: 100, html: true })));
};
exports.App = App;


/***/ }),

/***/ "./site/components/GitHubCorner.tsx":
/*!******************************************!*\
  !*** ./site/components/GitHubCorner.tsx ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GitHubCorner = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
const GitHubCorner = ({ href }) => {
    const githubCornerHTML = `<a href="${href}" class="github-corner" aria-label="View source on Github"><svg width="80" height="80" viewBox="0 0 250 250" style="fill:#151513; color:#fff; position: absolute; top: 0; border: 0; right: 0;" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a><style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>`;
    return react_1.default.createElement("div", { dangerouslySetInnerHTML: { __html: githubCornerHTML } });
};
exports.GitHubCorner = GitHubCorner;


/***/ }),

/***/ "./site/components/RuleTable.tsx":
/*!***************************************!*\
  !*** ./site/components/RuleTable.tsx ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RuleTable = void 0;
const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
const config_1 = __webpack_require__(/*! ../../config */ "./config/index.ts");
const utils_1 = __webpack_require__(/*! ../utils */ "./site/utils.ts");
const RuleTable = ({ namespace, hideOff }) => {
    return (react_1.default.createElement("div", { className: "container-fluid" },
        react_1.default.createElement("div", { className: "flex-left flex-wrap units-gap hide-on-mobile" },
            react_1.default.createElement("h3", { className: "unit-1-3 unit-1-on-mobile site-table-header-text" }, (0, utils_1.t)('规则说明')),
            react_1.default.createElement("h3", { className: "unit-1-3 unit-1-on-mobile text-danger site-table-header-text" }, (0, utils_1.t)('错误的示例')),
            react_1.default.createElement("h3", { className: "unit-1-3 unit-1-on-mobile text-success site-table-header-text" }, (0, utils_1.t)('正确的示例'))),
        Object.values(config_1.NAMESPACE_CONFIG[namespace].ruleConfig).map(({ name, value, description, reason, badExample, goodExample, fixable, extendsBaseRule, requiresTypeChecking, }) => (react_1.default.createElement("div", { id: name, key: name, className: `flex-left flex-wrap top-gap-big units-gap site-row ${value === 'off' ? 'site-row-off site-row-wide' : ''}`, style: value === 'off' && hideOff
                ? {
                    display: 'none',
                }
                : {} },
            react_1.default.createElement("div", { className: "unit-1-3 unit-1-on-mobile site-desc" },
                react_1.default.createElement("a", { href: config_1.NAMESPACE_CONFIG[namespace].getDocsUrl(name) }, name),
                "\u00A0\u00A0",
                react_1.default.createElement("span", { "data-tip": (0, utils_1.t)('可使用 --fix 自动修复'), "data-type": "success" }, fixable && '🔧'),
                react_1.default.createElement("span", { "data-tip": (0, utils_1.t)('需要类型信息'), "data-type": "warning" }, requiresTypeChecking && '💭'),
                react_1.default.createElement("a", { "data-tip": (0, utils_1.t)('继承自 ') + extendsBaseRule, "data-type": "warning", href: `?rule=base#${extendsBaseRule}` }, extendsBaseRule && '👀'),
                react_1.default.createElement("a", { className: "site-anchor", href: `#${name}` }, "#"),
                react_1.default.createElement("p", { className: "top-gap-0", dangerouslySetInnerHTML: {
                        __html: (0, utils_1.parseDescription)((0, utils_1.t)(description)),
                    } }),
                reason && (react_1.default.createElement("p", { className: "text-muted text-small", style: { marginTop: 5 }, dangerouslySetInnerHTML: {
                        __html: (0, utils_1.parseDescription)(reason),
                    } })),
                Array.isArray(value) && (react_1.default.createElement("div", { className: "text-muted text-small site-rule-value" },
                    (0, utils_1.t)('配置：'),
                    typeof value[1] === 'object' ? (react_1.default.createElement("pre", null,
                        react_1.default.createElement("code", null, `["error", ${JSON.stringify(value[1], null, 4)}]`))) : (react_1.default.createElement("code", null, `["error", ${JSON.stringify(value[1])}]`))))),
            react_1.default.createElement("div", { className: "unit-1-3 unit-1-on-mobile" }, badExample && (react_1.default.createElement("pre", { className: `language-${config_1.NAMESPACE_CONFIG[namespace].prismLanguage} site-code` },
                react_1.default.createElement("code", { dangerouslySetInnerHTML: {
                        __html: badExample,
                    } })))),
            react_1.default.createElement("div", { className: "unit-1-3 unit-1-on-mobile" }, goodExample && (react_1.default.createElement("pre", { className: `language-${config_1.NAMESPACE_CONFIG[namespace].prismLanguage}  site-code` },
                react_1.default.createElement("code", { dangerouslySetInnerHTML: {
                        __html: goodExample,
                    } })))))))));
};
exports.RuleTable = RuleTable;


/***/ }),

/***/ "./site/index.tsx":
/*!************************!*\
  !*** ./site/index.tsx ***!
  \************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const react_1 = __importDefault(__webpack_require__(/*! react */ "react"));
const react_dom_1 = __webpack_require__(/*! react-dom */ "react-dom");
const App_1 = __webpack_require__(/*! ./components/App */ "./site/components/App.tsx");
(0, react_dom_1.render)(react_1.default.createElement(App_1.App, null), document.getElementById('app'));


/***/ }),

/***/ "./site/utils.ts":
/*!***********************!*\
  !*** ./site/utils.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultTo = exports.replaceUrl = exports.newUrl = exports.getQuery = exports.getLanguage = exports.t = exports.parseDescription = void 0;
const url_1 = __importDefault(__webpack_require__(/*! url */ "./node_modules/url/url.js"));
const cookie_1 = __importDefault(__webpack_require__(/*! cookie */ "./node_modules/cookie/index.js"));
const querystring_1 = __importDefault(__webpack_require__(/*! querystring */ "./node_modules/querystring/index.js"));
const config_1 = __webpack_require__(/*! ../config */ "./config/index.ts");
/**
 * 解析描述或原因，转换 <, >, \n 等字符串
 * @param str 需要解析的文本
 */
function parseDescription(str) {
    const language = getLanguage();
    const description = str.replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
    if (language === 'zh-CN') {
        return description
            .replace(/[a-zA-Z0-9\(\)\[\]\{\}\\\/'"_\-\+\?\.\*!=\&\@\#$%~:; ]+/g, (codes) => {
            const matchSpaces = codes.match(/^( *)(.*?)( *)$/);
            if (matchSpaces === null) {
                return `<code>${codes}</code>`;
            }
            if (matchSpaces[2].startsWith('http')) {
                return `${matchSpaces[1]}<a href="${matchSpaces[2]}" target="_blank">${matchSpaces[2]}</a>${matchSpaces[3]}`;
            }
            return `${matchSpaces[1]}<code>${matchSpaces[2]}</code>${matchSpaces[3]}`;
        })
            .replace(/\n/g, '<br />')
            .replace(/禁止/g, '<strong style="color:#db5757; font-weight:600;">$&</strong>')
            .replace(/必须/g, '<strong style="color:#267fd9; font-weight:600;">$&</strong>');
    }
    else {
        let isOpen = false;
        return description
            .replace(/\n/g, '<br />')
            .split('')
            .map((letter) => {
            if (letter !== '`') {
                return letter;
            }
            isOpen = !isOpen;
            if (isOpen) {
                return '<code>';
            }
            return '</code>';
        })
            .join('');
    }
}
exports.parseDescription = parseDescription;
/** 翻译 */
function t(str) {
    const language = getLanguage();
    return config_1.locale[language][str] || str;
}
exports.t = t;
/** 从 query 和 cookies 获取 language */
function getLanguage() {
    let language;
    const queryLanguage = getQuery().language;
    if (Array.isArray(queryLanguage)) {
        language = queryLanguage[queryLanguage.length - 1];
    }
    else {
        language = queryLanguage;
    }
    // 非法的 queryLanguage
    if (!config_1.avaliableLanguages.includes(language)) {
        language = cookie_1.default.parse(document.cookie).language;
        // 非法的 cookieLanguage
        if (!config_1.avaliableLanguages.includes(language)) {
            language = config_1.avaliableLanguages[0];
        }
    }
    setCookie('language', language);
    return language;
}
exports.getLanguage = getLanguage;
function getQuery() {
    return querystring_1.default.parse(location.search.replace(/^\?/, ''));
}
exports.getQuery = getQuery;
function setCookie(name, value, days = 365) {
    const cookieObject = cookie_1.default.parse(document.cookie);
    if (cookieObject[name] === value) {
        return;
    }
    let expires = '';
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
}
/** 生成新的 url */
function newUrl({ path, query }) {
    const parsedUrl = url_1.default.parse(location.href, true);
    const newUrlObject = {
        pathname: parsedUrl.pathname || '',
        query: parsedUrl.query,
    };
    if (path) {
        newUrlObject.pathname = url_1.default.resolve(newUrlObject.pathname, path);
    }
    if (query) {
        Object.entries(query).forEach(([key, value]) => {
            if (value === false) {
                delete newUrlObject.query[key];
            }
            else if (value === true) {
                newUrlObject.query[key] = '1';
            }
            else {
                newUrlObject.query[key] = value;
            }
        });
    }
    // 排序 query
    const newQuery = {};
    Object.entries(newUrlObject.query)
        .sort(([aKey], [bKey]) => aKey.localeCompare(bKey))
        .forEach(([key, value]) => {
        newQuery[key] = value;
    });
    newUrlObject.query = newQuery;
    return url_1.default.format(newUrlObject);
}
exports.newUrl = newUrl;
function replaceUrl(url, title) {
    history.replaceState({}, title || document.title, url);
}
exports.replaceUrl = replaceUrl;
/** 若为空则返回默认值，可提供取值范围 */
function defaultTo(source, defaultValue, avaliableValues) {
    if (typeof source === 'undefined') {
        return defaultValue;
    }
    if (source === null) {
        return defaultValue;
    }
    if (typeof source === 'number' && isNaN(source)) {
        return defaultValue;
    }
    if (typeof avaliableValues !== 'undefined') {
        if (!avaliableValues.includes(source)) {
            return defaultValue;
        }
    }
    return source;
}
exports.defaultTo = defaultTo;


/***/ }),

/***/ "./node_modules/url/url.js":
/*!*********************************!*\
  !*** ./node_modules/url/url.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(/*! punycode */ "./node_modules/punycode/punycode.js");
var util = __webpack_require__(/*! ./util */ "./node_modules/url/util.js");

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(/*! querystring */ "./node_modules/querystring/index.js");

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),

/***/ "./node_modules/url/util.js":
/*!**********************************!*\
  !*** ./node_modules/url/util.js ***!
  \**********************************/
/***/ ((module) => {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/bytesToUuid.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (bytesToUuid);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js");



function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }

  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || (0,_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = React;

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = ReactDOM;

/***/ }),

/***/ "./config/rules/base.json":
/*!********************************!*\
  !*** ./config/rules/base.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"accessor-pairs":{"name":"accessor-pairs","value":"off","description":"现阶段不要求 setter 必须有对应的 getter，getter 可以没有对应的 setter。取决于具体业务需要。\\n待开闭原则确定后启用。","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"array-callback-return":{"name":"array-callback-return","value":"error","description":"数组的方法除了 forEach 之外，回调函数必须有返回值","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">map</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">num</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\"><mark class=\\"eslint-error\\" data-tip=\\"Array.prototype.map() expects a return value from arrow function.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(array-callback-return)&lt;/span&gt;\\">=></mark></span> <span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>num <span class=\\"token operator\\">*</span> num<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">map</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">num</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> num <span class=\\"token operator\\">*</span> num<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"arrow-body-style":{"name":"arrow-body-style","value":"off","description":"箭头函数体必须由大括号包裹","reason":"代码格式问题，最好由 Prettier 解决","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"block-scoped-var":{"name":"block-scoped-var","value":"off","description":"将 var 定义的变量视为块作用域，禁止在块外使用","reason":"已经禁止使用 var 了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"callback-return":{"name":"callback-return","value":"off","description":"callback 之后必须立即 return","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"camelcase":{"name":"camelcase","value":"off","description":"变量名必须是 camelCase 风格的","reason":"很多 api 或文件名都不是 camelCase 风格的","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"capitalized-comments":{"name":"capitalized-comments","value":"off","description":"注释的首字母必须大写","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"class-methods-use-this":{"name":"class-methods-use-this","value":"off","description":"在类的非静态方法中，必须存在对 this 的引用","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"complexity":{"name":"complexity","value":["error",{"max":20}],"description":"禁止函数的循环复杂度超过 20","reason":"https://en.wikipedia.org/wiki/Cyclomatic_complexity","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Function &amp;apos;foo&amp;apos; has a complexity of 21. Maximum allowed is 20.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(complexity)&lt;/span&gt;\\"><span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">6</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">7</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">8</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">9</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">11</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">12</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">13</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">14</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">15</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">16</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">17</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">18</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">19</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">20</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">4</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">6</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">7</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">8</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">9</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">i</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">11</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">12</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">13</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">14</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">15</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">16</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">17</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">18</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">19</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">20</span><span class=\\"token punctuation\\">)</span> console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"consistent-return":{"name":"consistent-return","value":"off","description":"禁止函数在不同分支返回不同类型的值","reason":"缺少 TypeScript 的支持，类型判断是不准确的","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"consistent-this":{"name":"consistent-this","value":"off","description":"限制 this 的别名","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"constructor-super":{"name":"constructor-super","value":"error","description":"constructor 中必须有 super","reason":"","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Bar</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Expected to call &amp;apos;super()&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(constructor-super)&lt;/span&gt;\\"><span class=\\"token function\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Bar</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">super</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"curly":{"name":"curly","value":["error","all"],"description":"if 后面必须要有 {","reason":"可读性更好","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <mark class=\\"eslint-error\\" data-tip=\\"Expected { after &amp;apos;if&amp;apos; condition.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(curly)&lt;/span&gt;\\">foo<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span></mark>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  foo<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"default-case":{"name":"default-case","value":"error","description":"switch 语句必须有 default","reason":"避免部分场景下未调用 callback","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Expected a default case.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(default-case)&lt;/span&gt;\\"><span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token string\\">\'bar\'</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token string\\">\'bar\'</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">default</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"default-case-last":{"name":"default-case-last","value":"error","description":"switch 语句中的 default 必须在最后","reason":"","badExample":"<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Default clause should be the last clause.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(default-case-last)&lt;/span&gt;\\"><span class=\\"token keyword\\">default</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span></mark>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">default</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"default-param-last":{"name":"default-param-last","value":"off","description":"有默认值的参数必须放在函数参数的末尾","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"dot-notation":{"name":"dot-notation","value":"off","description":"禁止使用 foo[\'bar\']，必须写成 foo.bar","reason":"当需要写一系列属性的时候，可以更统一","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"eol-last":{"name":"eol-last","value":["warn","always"],"description":"文件最后一行必须有一个空行","reason":"部分系统下的兼容性直到规范","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"eqeqeq":{"name":"eqeqeq","value":["error","always"],"description":"必须使用 === 或 !==，禁止使用 == 或 !=","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token operator\\"><mark class=\\"eslint-error\\" data-tip=\\"Expected &amp;apos;===&amp;apos; and instead saw &amp;apos;==&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(eqeqeq)&lt;/span&gt;\\">==</mark></span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>bar <span class=\\"token operator\\"><mark class=\\"eslint-error\\" data-tip=\\"Expected &amp;apos;!==&amp;apos; and instead saw &amp;apos;!=&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(eqeqeq)&lt;/span&gt;\\">!=</mark></span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token operator\\">===</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>bar <span class=\\"token operator\\">!==</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"for-direction":{"name":"for-direction","value":"error","description":"禁止方向错误的 for 循环","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"The update clause in this loop moves the variable in the wrong direction.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(for-direction)&lt;/span&gt;\\"><span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">let</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">--</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// do something</span>\\n<span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">let</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// do something</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"func-name-matching":{"name":"func-name-matching","value":["error","always",{"includeCommonJSModuleExports":false}],"description":"函数赋值给变量的时候，函数名必须与变量名一致","reason":"","badExample":"<span class=\\"token keyword\\">const</span> <mark class=\\"eslint-error\\" data-tip=\\"Function name `bar` should match variable name `foo`.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(func-name-matching)&lt;/span&gt;\\"><span class=\\"token function-variable function\\">foo</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">foo</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">bar</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"func-names":{"name":"func-names","value":"off","description":"函数必须有名字","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"func-style":{"name":"func-style","value":"off","description":"必须只使用函数声明或只使用函数表达式","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"getter-return":{"name":"getter-return","value":"error","description":"getter 必须有返回值，并且禁止返回空","reason":"","badExample":"<span class=\\"token keyword\\">const</span> user <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Expected to return a value in getter &amp;apos;name&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(getter-return)&lt;/span&gt;\\"><span class=\\"token keyword\\">get</span> <span class=\\"token function\\">name</span></mark><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// do something</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">User</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">get</span> <span class=\\"token function\\">name</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <mark class=\\"eslint-error\\" data-tip=\\"Expected to return a value in getter &amp;apos;name&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(getter-return)&lt;/span&gt;\\"><span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span></mark>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">const</span> user <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">get</span> <span class=\\"token function\\">name</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token string\\">\'Alex\'</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">User</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">get</span> <span class=\\"token function\\">name</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>name<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"global-require":{"name":"global-require","value":"off","description":"require 必须在全局作用域下","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"grouped-accessor-pairs":{"name":"grouped-accessor-pairs","value":"error","description":"setter 和 getter 必须写在一起","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">set</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">value</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>barValue <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar \'</span> <span class=\\"token operator\\">+</span> value<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  baz<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Accessor pair setter &amp;apos;bar&amp;apos; and getter &amp;apos;bar&amp;apos; should be grouped.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(grouped-accessor-pairs)&lt;/span&gt;\\"><span class=\\"token keyword\\">get</span> <span class=\\"token function\\">bar</span></mark><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>barValue<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">set</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">value</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>barValue <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar \'</span> <span class=\\"token operator\\">+</span> value<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  <span class=\\"token keyword\\">get</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>barValue<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n  baz<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"guard-for-in":{"name":"guard-for-in","value":"error","description":"for in 内部必须有 hasOwnProperty","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"The body of a for-in should be wrapped in an if statement to filter unwanted properties from the prototype.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(guard-for-in)&lt;/span&gt;\\"><span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span>key <span class=\\"token keyword\\">in</span> foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span>key<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span>key <span class=\\"token keyword\\">in</span> foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">.</span>prototype<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">hasOwnProperty</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">call</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">,</span> key<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span>key<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"handle-callback-err":{"name":"handle-callback-err","value":"off","description":"callback 中的 err 必须被处理","reason":"它是通过字符串匹配来判断函数参数 err 的，不准确","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"id-blacklist":{"name":"id-blacklist","value":"off","description":"禁止使用指定的标识符","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"id-denylist":{"name":"id-denylist","value":"off","description":"禁止使用指定的标识符","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"id-length":{"name":"id-length","value":"off","description":"限制变量名长度","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"id-match":{"name":"id-match","value":"off","description":"限制变量名必须匹配指定的正则表达式","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"import/no-default-export":{"name":"import/no-default-export","value":"error","description":"禁止使用默认导出模块。","reason":"默认导出会允许被引用时重命名，不便于重构与统一目标对象理解。\\n不过对于 npm 模块的最外层封装，建议使用默认导出。","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n\\n<mark class=\\"eslint-error\\" data-tip=\\"Prefer named exports.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(import/no-default-export)&lt;/span&gt;\\"><span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">default</span> Foo<span class=\\"token punctuation\\">;</span></mark>","goodExample":"<span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>"},"import/no-unused-modules":{"name":"import/no-unused-modules","value":"error","description":"禁止保留未使用的模块依赖","reason":"避免产生循环依赖的问题。","badExample":"","goodExample":""},"init-declarations":{"name":"init-declarations","value":"off","description":"变量必须在定义的时候赋值","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"line-comment-position":{"name":"line-comment-position","value":"off","description":"单行注释必须写在上一行","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"linebreak-style":{"name":"linebreak-style","value":["error","unix"],"description":"要求统一使用 unix 风格的换行符","reason":"避免部分多行模板字符串在输出时产生连续换行问题","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"lines-between-class-members":{"name":"lines-between-class-members","value":"off","description":"类的成员之间是否需要空行","reason":"有时为了紧凑需要挨在一起，有时为了可读性需要空一行","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"max-classes-per-file":{"name":"max-classes-per-file","value":"off","description":"限制一个文件中类的数量","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"max-depth":{"name":"max-depth","value":["error",5],"description":"代码块嵌套的深度禁止超过 5 层","reason":"","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n          <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <mark class=\\"eslint-error\\" data-tip=\\"Blocks are nested too deeply (6). Maximum allowed is 5.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(max-depth)&lt;/span&gt;\\"><span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <span class=\\"token punctuation\\">}</span></mark>\\n          <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token punctuation\\">}</span>\\n      <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n          <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n          <span class=\\"token punctuation\\">}</span>\\n        <span class=\\"token punctuation\\">}</span>\\n      <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"max-lines":{"name":"max-lines","value":"off","description":"限制一个文件最多的行数","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"max-lines-per-function":{"name":"max-lines-per-function","value":["error",{"max":100,"skipComments":true,"skipBlankLines":true}],"description":"限制函数块中的代码行数","reason":"","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// a comment followed by a blank line</span>\\n\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// a comment followed by a blank line</span>\\n\\n  <span class=\\"token keyword\\">var</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"max-nested-callbacks":{"name":"max-nested-callbacks","value":["error",{"max":5}],"description":"回调函数嵌套禁止超过 5 层","reason":"","badExample":"<span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token function\\">qux</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token function\\">quux</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n          <span class=\\"token function\\">quuz</span><span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Too many nested callbacks (6). Maximum allowed is 5.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(max-nested-callbacks)&lt;/span&gt;\\"><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></mark><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n        <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n      <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">async</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">await</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">await</span> <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">await</span> <span class=\\"token function\\">qux</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"max-params":{"name":"max-params","value":["error",7],"description":"函数的参数禁止超过 7 个","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Function &amp;apos;foo&amp;apos; has too many parameters (8). Maximum allowed is 7.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(max-params)&lt;/span&gt;\\"><span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span></mark><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">a1<span class=\\"token punctuation\\">,</span> a2<span class=\\"token punctuation\\">,</span> a3<span class=\\"token punctuation\\">,</span> a4<span class=\\"token punctuation\\">,</span> a5<span class=\\"token punctuation\\">,</span> a6<span class=\\"token punctuation\\">,</span> a7<span class=\\"token punctuation\\">,</span> a8</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">a1<span class=\\"token punctuation\\">,</span> a2<span class=\\"token punctuation\\">,</span> a3<span class=\\"token punctuation\\">,</span> a4<span class=\\"token punctuation\\">,</span> a5<span class=\\"token punctuation\\">,</span> a6<span class=\\"token punctuation\\">,</span> a7</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\"><span class=\\"token punctuation\\">{</span> a1<span class=\\"token punctuation\\">,</span> a2<span class=\\"token punctuation\\">,</span> a3<span class=\\"token punctuation\\">,</span> a4<span class=\\"token punctuation\\">,</span> a5<span class=\\"token punctuation\\">,</span> a6<span class=\\"token punctuation\\">,</span> a7<span class=\\"token punctuation\\">,</span> a8 <span class=\\"token punctuation\\">}</span></span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"max-statements":{"name":"max-statements","value":"off","description":"限制函数块中的语句数量","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"max-statements-per-line":{"name":"max-statements-per-line","value":["error",{"max":1}],"description":"限制一行中的语句数量","reason":"","badExample":"<span class=\\"token keyword\\">var</span> bar<span class=\\"token punctuation\\">;</span> <mark class=\\"eslint-error\\" data-tip=\\"This line has 2 statements. Maximum allowed is 1.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(max-statements-per-line)&lt;/span&gt;\\"><span class=\\"token keyword\\">var</span> baz<span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>condition<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span> <mark class=\\"eslint-error\\" data-tip=\\"This line has 2 statements. Maximum allowed is 1.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(max-statements-per-line)&lt;/span&gt;\\">bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></mark> <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">var</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> length<span class=\\"token punctuation\\">;</span> <span class=\\"token operator\\">++</span>i<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span> <mark class=\\"eslint-error\\" data-tip=\\"This line has 2 statements. Maximum allowed is 1.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(max-statements-per-line)&lt;/span&gt;\\">bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></mark> <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>discriminant<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token keyword\\">default</span><span class=\\"token punctuation\\">:</span> <mark class=\\"eslint-error\\" data-tip=\\"This line has 2 statements. Maximum allowed is 1.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(max-statements-per-line)&lt;/span&gt;\\"><span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span></mark> <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span> <mark class=\\"eslint-error\\" data-tip=\\"This line has 2 statements. Maximum allowed is 1.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(max-statements-per-line)&lt;/span&gt;\\">bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></mark> <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">var</span> <span class=\\"token function-variable function\\">qux</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span> <mark class=\\"eslint-error\\" data-tip=\\"This line has 2 statements. Maximum allowed is 1.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(max-statements-per-line)&lt;/span&gt;\\">bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></mark> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span> <mark class=\\"eslint-error\\" data-tip=\\"This line has 2 statements. Maximum allowed is 1.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(max-statements-per-line)&lt;/span&gt;\\">bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></mark> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">var</span> bar<span class=\\"token punctuation\\">,</span> baz<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>condition<span class=\\"token punctuation\\">)</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">var</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> length<span class=\\"token punctuation\\">;</span> <span class=\\"token operator\\">++</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>discriminant<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">default</span><span class=\\"token punctuation\\">:</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">var</span> <span class=\\"token function-variable function\\">qux</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"multiline-comment-style":{"name":"multiline-comment-style","value":"off","description":"约束多行注释的格式","reason":"能写注释已经不容易了，不需要限制太多","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"new-cap":{"name":"new-cap","value":["error",{"newIsCap":true,"capIsNew":false,"properties":true}],"description":"new 后面的类名必须首字母大写","reason":"","badExample":"<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\"><mark class=\\"eslint-error\\" data-tip=\\"A constructor name should not start with a lowercase letter.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(new-cap)&lt;/span&gt;\\">foo</mark></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">foo<span class=\\"token punctuation\\">.</span><mark class=\\"eslint-error\\" data-tip=\\"A constructor name should not start with a lowercase letter.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(new-cap)&lt;/span&gt;\\">bar</mark></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">foo<span class=\\"token punctuation\\">.</span>Bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token function\\">Foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-alert":{"name":"no-alert","value":"off","description":"禁止使用 alert","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-array-constructor":{"name":"no-array-constructor","value":"error","description":"禁止使用 Array 构造函数时传入的参数超过一个","reason":"参数为一个时表示创建一个指定长度的数组，比较常用\\n参数为多个时表示创建一个指定内容的数组，此时可以用数组字面量实现，不必使用构造函数","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"The array literal notation [] is preferable.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-array-constructor)&lt;/span&gt;\\"><span class=\\"token function\\">Array</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// [0, 1, 2]</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"The array literal notation [] is preferable.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-array-constructor)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Array</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// [0, 1, 2]</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">0</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token function\\">Array</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// [empty × 3]</span>\\n<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Array</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// [empty × 3]</span>\\n<span class=\\"token function\\">Array</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">fill</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// [\\"foo\\", \\"foo\\", \\"foo\\"]</span>\\n<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Array</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">3</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">fill</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// [\\"foo\\", \\"foo\\", \\"foo\\"]</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-async-promise-executor":{"name":"no-async-promise-executor","value":"error","description":"禁止将 async 函数做为 new Promise 的回调函数","reason":"出现这种情况时，一般不需要使用 new Promise 实现异步了","badExample":"<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Promise</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\"><mark class=\\"eslint-error\\" data-tip=\\"Promise executor functions should not be async.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-async-promise-executor)&lt;/span&gt;\\">async</mark></span> <span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">resolve</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">setTimeout</span><span class=\\"token punctuation\\">(</span>resolve<span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1000</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Promise</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">resolve</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">setTimeout</span><span class=\\"token punctuation\\">(</span>resolve<span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1000</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-await-in-loop":{"name":"no-await-in-loop","value":"off","description":"禁止将 await 写在循环里，因为这样就无法同时发送多个异步请求了","reason":"要求太严格了，有时需要在循环中写 await","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-bitwise":{"name":"no-bitwise","value":"off","description":"禁止使用位运算","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-buffer-constructor":{"name":"no-buffer-constructor","value":"error","description":"禁止直接使用 Buffer","reason":"Buffer 构造函数是已废弃的语法","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"new Buffer() is deprecated. Use Buffer.from(), Buffer.alloc(), or Buffer.allocUnsafe() instead.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-buffer-constructor)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Buffer</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">5</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"Buffer() is deprecated. Use Buffer.from(), Buffer.alloc(), or Buffer.allocUnsafe() instead.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-buffer-constructor)&lt;/span&gt;\\"><span class=\\"token function\\">Buffer</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"Buffer<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">alloc</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">5</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nBuffer<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">from</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-caller":{"name":"no-caller","value":"error","description":"禁止使用 caller 或 callee","reason":"它们是已废弃的语法","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">n</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>n <span class=\\"token operator\\">&lt;=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Avoid arguments.callee.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-caller)&lt;/span&gt;\\">arguments<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">callee</span></mark><span class=\\"token punctuation\\">(</span>n <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">n</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>n <span class=\\"token operator\\">&lt;=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>n <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-case-declarations":{"name":"no-case-declarations","value":"error","description":"switch 的 case 内有变量定义的时候，必须使用大括号将 case 内变成一个代码块","reason":"","badExample":"<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span>\\n    <mark class=\\"eslint-error\\" data-tip=\\"Unexpected lexical declaration in case block.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-case-declarations)&lt;/span&gt;\\"><span class=\\"token keyword\\">const</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></mark>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">const</span> x <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-class-assign":{"name":"no-class-assign","value":"error","description":"禁止对已定义的 class 重新赋值","reason":"","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;Foo&amp;apos; is a class.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-class-assign)&lt;/span&gt;\\">Foo</mark> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-compare-neg-zero":{"name":"no-compare-neg-zero","value":"error","description":"禁止与负零进行比较","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Do not use the &amp;apos;===&amp;apos; operator to compare against -0.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-compare-neg-zero)&lt;/span&gt;\\">foo <span class=\\"token operator\\">===</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">0</span></mark><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token operator\\">===</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-cond-assign":{"name":"no-cond-assign","value":["error","except-parens"],"description":"禁止在测试表达式中使用赋值语句，除非这个赋值语句被括号包起来了","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Expected a conditional expression and instead saw an assignment.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-cond-assign)&lt;/span&gt;\\">foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span></mark><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token operator\\">===</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>bar <span class=\\"token operator\\">===</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-console":{"name":"no-console","value":"off","description":"禁止使用 console","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-const-assign":{"name":"no-const-assign","value":"error","description":"禁止对使用 const 定义的常量重新赋值","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;foo&amp;apos; is constant.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-const-assign)&lt;/span&gt;\\">foo</mark> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">let</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\nfoo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">const</span> bar <span class=\\"token keyword\\">in</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>bar<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-constant-condition":{"name":"no-constant-condition","value":["error",{"checkLoops":false}],"description":"禁止将常量作为分支条件判断中的测试表达式，但允许作为循环条件判断中的测试表达式","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\"><mark class=\\"eslint-error\\" data-tip=\\"Unexpected constant condition.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-constant-condition)&lt;/span&gt;\\">true</mark></span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\"><mark class=\\"eslint-error\\" data-tip=\\"Unexpected constant condition.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-constant-condition)&lt;/span&gt;\\">0</mark></span> <span class=\\"token operator\\">?</span> <span class=\\"token string\\">\'bar\'</span> <span class=\\"token punctuation\\">:</span> <span class=\\"token string\\">\'baz\'</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">;</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">;</span> <span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token operator\\">===</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token operator\\">===</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">)</span> <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-constructor-return":{"name":"no-constructor-return","value":"error","description":"禁止在构造函数中返回值","reason":"","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">bar</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>bar <span class=\\"token operator\\">=</span> bar<span class=\\"token punctuation\\">;</span>\\n    <mark class=\\"eslint-error\\" data-tip=\\"Unexpected return statement in constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-constructor-return)&lt;/span&gt;\\"><span class=\\"token keyword\\">return</span> bar<span class=\\"token punctuation\\">;</span></mark>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">bar</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">!</span>bar<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>bar <span class=\\"token operator\\">=</span> bar<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-continue":{"name":"no-continue","value":"off","description":"禁止使用 continue","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-control-regex":{"name":"no-control-regex","value":"off","description":"禁止在正则表达式中出现 Ctrl 键的 ASCII 表示，即禁止使用 /\\\\x1f/","reason":"几乎不会遇到这种场景","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-debugger":{"name":"no-debugger","value":"error","description":"禁止使用 debugger","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Unexpected &amp;apos;debugger&amp;apos; statement.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-debugger)&lt;/span&gt;\\"><span class=\\"token keyword\\">debugger</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// debugger;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-delete-var":{"name":"no-delete-var","value":"off","description":"禁止对一个变量使用 delete","reason":"编译阶段就会报错了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-div-regex":{"name":"no-div-regex","value":"off","description":"禁止在正则表达式中出现形似除法操作符的开头，如 let a = /=foo/","reason":"有代码高亮的话，在阅读这种代码时，也完全不会产生歧义或理解上的困难","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-dupe-args":{"name":"no-dupe-args","value":"off","description":"禁止在函数参数中出现重复名称的参数","reason":"编译阶段就会报错了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-dupe-class-members":{"name":"no-dupe-class-members","value":"error","description":"禁止重复定义类的成员","reason":"","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Duplicate name &amp;apos;bar&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-dupe-class-members)&lt;/span&gt;\\"><span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-dupe-else-if":{"name":"no-dupe-else-if","value":"error","description":"禁止 if else 的条件判断中出现重复的条件","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"This branch can never execute. Its condition is a duplicate or covered by previous conditions in the if-else-if chain.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-dupe-else-if)&lt;/span&gt;\\">foo</mark><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>bar<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>bar<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>bar<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-dupe-keys":{"name":"no-dupe-keys","value":"error","description":"禁止在对象字面量中出现重复的键名","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  bar<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Duplicate key &amp;apos;bar&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-dupe-keys)&lt;/span&gt;\\">bar</mark><span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  bar<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span>\\n  baz<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-duplicate-case":{"name":"no-duplicate-case","value":"error","description":"禁止在 switch 语句中出现重复测试表达式的 case","reason":"","badExample":"<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Duplicate case label.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-duplicate-case)&lt;/span&gt;\\"><span class=\\"token keyword\\">case</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-duplicate-imports":{"name":"no-duplicate-imports","value":"error","description":"禁止重复导入模块","reason":"","badExample":"<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> readFile <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\"><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;fs&amp;apos; imported multiple times.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(import/no-duplicates)&lt;/span&gt;\\">\'fs\'</mark></span><span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;fs&amp;apos; import is duplicated.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-duplicate-imports)&lt;/span&gt;\\"><span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> writeFile <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\"><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;fs&amp;apos; imported multiple times.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(import/no-duplicates)&lt;/span&gt;\\">\'fs\'</mark></span><span class=\\"token punctuation\\">;</span></mark>","goodExample":"<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> readFile<span class=\\"token punctuation\\">,</span> writeFile <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'fs\'</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-else-return":{"name":"no-else-return","value":"off","description":"禁止在 else 内使用 return，必须改为提前结束","reason":"else 中使用 return 可以使代码结构更清晰","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-empty":{"name":"no-empty","value":["error",{"allowEmptyCatch":true}],"description":"禁止出现空代码块，允许 catch 为空代码块","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <mark class=\\"eslint-error\\" data-tip=\\"Empty block statement.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-empty)&lt;/span&gt;\\"><span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// do something</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// do something</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span>e<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-empty-character-class":{"name":"no-empty-character-class","value":"error","description":"禁止在正则表达式中使用空的字符集 []","reason":"","badExample":"<span class=\\"token keyword\\">const</span> reg <span class=\\"token operator\\">=</span> <span class=\\"token regex\\"><mark class=\\"eslint-error\\" data-tip=\\"Empty class.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-empty-character-class)&lt;/span&gt;\\">/abc[]/</mark></span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> reg <span class=\\"token operator\\">=</span> <span class=\\"token regex\\">/abc[a-z]/</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-empty-function":{"name":"no-empty-function","value":"off","description":"不允许有空函数","reason":"有时需要将一个空函数设置为某个项的默认值","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-empty-pattern":{"name":"no-empty-pattern","value":"error","description":"禁止解构赋值中出现空 {} 或 []","reason":"","badExample":"<span class=\\"token keyword\\">const</span> <mark class=\\"eslint-error\\" data-tip=\\"Unexpected empty object pattern.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-empty-pattern)&lt;/span&gt;\\"><span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></mark> <span class=\\"token operator\\">=</span> foo<span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> <span class=\\"token punctuation\\">{</span> bar <span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">=</span> foo<span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-eq-null":{"name":"no-eq-null","value":"error","description":"禁止使用 foo == null，必须使用 foo === null","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Use &amp;apos;===&amp;apos; to compare with null.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-eq-null)&lt;/span&gt;\\">foo <span class=\\"token operator\\">==</span> <span class=\\"token keyword\\">null</span></mark><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token operator\\">===</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-eval":{"name":"no-eval","value":"error","description":"禁止使用 eval","reason":"","badExample":"<span class=\\"token function\\"><mark class=\\"eslint-error\\" data-tip=\\"eval can be harmful.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-eval)&lt;/span&gt;\\">eval</mark></span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'const foo = 0\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-ex-assign":{"name":"no-ex-assign","value":"error","description":"禁止将 catch 的第一个参数 error 重新赋值","reason":"","badExample":"<span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span>e<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Do not assign to the exception parameter.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-ex-assign)&lt;/span&gt;\\">e</mark> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span>e<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">error</span><span class=\\"token punctuation\\">(</span>e<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-extend-native":{"name":"no-extend-native","value":"error","description":"禁止修改原生对象","reason":"修改原生对象可能会与将来版本的 js 冲突","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Array prototype is read only, properties should not be added.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-extend-native)&lt;/span&gt;\\"><span class=\\"token class-name\\">Array</span><span class=\\"token punctuation\\">.</span>prototype<span class=\\"token punctuation\\">.</span><span class=\\"token function-variable function\\">flat</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// do something</span>\\n<span class=\\"token punctuation\\">}</span></mark><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">flat</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">flat</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">arr</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// do something</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token function\\">flat</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-extra-bind":{"name":"no-extra-bind","value":"error","description":"禁止出现没必要的 bind","reason":"","badExample":"<span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\"><mark class=\\"eslint-error\\" data-tip=\\"The function binding is unnecessary.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-extra-bind)&lt;/span&gt;\\">bind</mark></span><span class=\\"token punctuation\\">(</span>bar<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">bind</span><span class=\\"token punctuation\\">(</span>bar<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-extra-boolean-cast":{"name":"no-extra-boolean-cast","value":"error","description":"禁止不必要的布尔类型转换","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Redundant double negation.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-extra-boolean-cast)&lt;/span&gt;\\"><span class=\\"token operator\\">!</span><span class=\\"token operator\\">!</span>foo</mark><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Redundant Boolean call.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-extra-boolean-cast)&lt;/span&gt;\\"><span class=\\"token function\\">Boolean</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">!</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-extra-label":{"name":"no-extra-label","value":"off","description":"禁止出现没必要的 label","reason":"已经禁止使用 label 了","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-fallthrough":{"name":"no-fallthrough","value":"error","description":"switch 的 case 内必须有 break, return 或 throw，空的 case 除外","reason":"","badExample":"<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Expected a &amp;apos;break&amp;apos; statement before &amp;apos;case&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-fallthrough)&lt;/span&gt;\\"><span class=\\"token keyword\\">case</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token function\\">doSomethingElse</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token function\\">doSomethingElse</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">switch</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span>\\n  <span class=\\"token keyword\\">case</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-func-assign":{"name":"no-func-assign","value":"error","description":"禁止将一个函数声明重新赋值","reason":"","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;foo&amp;apos; is a function.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-func-assign)&lt;/span&gt;\\">foo</mark> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">let</span> <span class=\\"token function-variable function\\">foo</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\nfoo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-global-assign":{"name":"no-global-assign","value":"error","description":"禁止对全局变量赋值","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Read-only global &amp;apos;Object&amp;apos; should not be modified.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-global-assign)&lt;/span&gt;\\">Object</mark> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">;</span>","goodExample":"foo <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">null</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-implicit-coercion":{"name":"no-implicit-coercion","value":["error",{"allow":["!!"]}],"description":"禁止使用 ~+ 等难以理解的类型转换，仅允许使用 !!","reason":"","badExample":"<span class=\\"token keyword\\">const</span> b <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"use `foo.indexOf(&amp;apos;.&amp;apos;) !== -1` instead.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-implicit-coercion)&lt;/span&gt;\\"><span class=\\"token operator\\">~</span>foo<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">indexOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'.\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> n <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"use `Number(foo)` instead.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-implicit-coercion)&lt;/span&gt;\\"><span class=\\"token operator\\">+</span>foo</mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> m <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"use `Number(foo)` instead.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-implicit-coercion)&lt;/span&gt;\\"><span class=\\"token number\\">1</span> <span class=\\"token operator\\">*</span> foo</mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> s <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"use `String(foo)` instead.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-implicit-coercion)&lt;/span&gt;\\"><span class=\\"token string\\">\'\'</span> <span class=\\"token operator\\">+</span> foo</mark><span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"use `foo = String(foo)` instead.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-implicit-coercion)&lt;/span&gt;\\">foo <span class=\\"token operator\\">+=</span> <span class=\\"token string\\">\'\'</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> b <span class=\\"token operator\\">=</span> foo<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">indexOf</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'.\'</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">!==</span> <span class=\\"token operator\\">-</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> n <span class=\\"token operator\\">=</span> <span class=\\"token function\\">Number</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> m <span class=\\"token operator\\">=</span> <span class=\\"token function\\">Number</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> s <span class=\\"token operator\\">=</span> <span class=\\"token function\\">String</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nfoo <span class=\\"token operator\\">=</span> <span class=\\"token function\\">String</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">const</span> c <span class=\\"token operator\\">=</span> <span class=\\"token operator\\">!</span><span class=\\"token operator\\">!</span>foo<span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-implicit-globals":{"name":"no-implicit-globals","value":"off","description":"禁止在全局作用域下定义变量或申明函数","reason":"模块化之后，不会出现这种在全局作用域下定义变量的情况","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-implied-eval":{"name":"no-implied-eval","value":"error","description":"禁止在 setTimeout 或 setInterval 中传入字符串","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Implied eval. Consider passing a function instead of a string.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-implied-eval)&lt;/span&gt;\\"><span class=\\"token function\\">setTimeout</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'alert(\\"Hello World\\");\'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1000</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token function\\">setTimeout</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">alert</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'Hello World\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">1000</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-import-assign":{"name":"no-import-assign","value":"error","description":"禁止对导入的模块进行赋值","reason":"","badExample":"<span class=\\"token keyword\\">import</span> foo <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;foo&amp;apos; is read-only.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-import-assign)&lt;/span&gt;\\">foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span></mark><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">import</span> <span class=\\"token operator\\">*</span> <span class=\\"token keyword\\">as</span> bar <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'bar\'</span><span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"The members of &amp;apos;bar&amp;apos; are read-only.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-import-assign)&lt;/span&gt;\\">bar<span class=\\"token punctuation\\">.</span>baz <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">import</span> foo <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">;</span>\\nfoo<span class=\\"token punctuation\\">.</span>baz <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">import</span> <span class=\\"token operator\\">*</span> <span class=\\"token keyword\\">as</span> bar <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'bar\'</span><span class=\\"token punctuation\\">;</span>\\nbar<span class=\\"token punctuation\\">.</span>baz<span class=\\"token punctuation\\">.</span>qux <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-inline-comments":{"name":"no-inline-comments","value":"off","description":"禁止在代码后添加单行注释","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-inner-declarations":{"name":"no-inner-declarations","value":["error","both"],"description":"禁止在 if 代码块内出现函数声明","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Move function declaration to program root.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-inner-declarations)&lt;/span&gt;\\"><span class=\\"token keyword\\">function</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">bar</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-invalid-regexp":{"name":"no-invalid-regexp","value":"error","description":"禁止在 RegExp 构造函数中出现非法的正则表达式","reason":"","badExample":"<span class=\\"token keyword\\">const</span> reg1 <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Invalid regular expression: /[/: Unterminated character class.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-invalid-regexp)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">RegExp</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'[\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> reg2 <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Invalid flags supplied to RegExp constructor &amp;apos;z&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-invalid-regexp)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">RegExp</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'.\'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\'z\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> reg1 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">RegExp</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'[a-z]\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> reg2 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">RegExp</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'.\'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\'g\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-invalid-this":{"name":"no-invalid-this","value":"off","description":"禁止在类之外的地方使用 this","reason":"会与 typescript 的类属性检测冲突","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-irregular-whitespace":{"name":"no-irregular-whitespace","value":["error",{"skipStrings":true,"skipComments":false,"skipRegExps":true,"skipTemplates":true}],"description":"禁止使用特殊空白符（比如全角空格），除非是出现在字符串、正则表达式或模版字符串中","reason":"","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><mark class=\\"eslint-error\\" data-tip=\\"Irregular whitespace not allowed.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-irregular-whitespace)&lt;/span&gt;\\">　</mark><span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'　\'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token regex\\">/　/</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> baz <span class=\\"token operator\\">=</span> <span class=\\"token template-string\\"><span class=\\"token string\\">`　`</span></span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-iterator":{"name":"no-iterator","value":"error","description":"禁止使用 __iterator__","reason":"__iterator__ 是一个已废弃的属性\\n使用 [Symbol.iterator] 替代它","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Reserved name &amp;apos;__iterator__&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-iterator)&lt;/span&gt;\\"><span class=\\"token class-name\\">Foo</span><span class=\\"token punctuation\\">.</span>prototype<span class=\\"token punctuation\\">.</span><span class=\\"token function-variable function\\">__iterator__</span></mark> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">FooIterator</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">let</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\nfoo<span class=\\"token punctuation\\">[</span>Symbol<span class=\\"token punctuation\\">.</span>iterator<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span><span class=\\"token operator\\">*</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">yield</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">yield</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">yield</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\nconsole<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">[</span><span class=\\"token operator\\">...</span>foo<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token comment\\">// [1, 2, 3]</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-label-var":{"name":"no-label-var","value":"off","description":"禁止 label 名称与已定义的变量重复","reason":"已经禁止使用 label 了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-labels":{"name":"no-labels","value":"error","description":"禁止使用 label","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Unexpected labeled statement.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-labels)&lt;/span&gt;\\">loop<span class=\\"token punctuation\\">:</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">let</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n            <mark class=\\"eslint-error\\" data-tip=\\"Unexpected label in continue statement.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-labels)&lt;/span&gt;\\"><span class=\\"token keyword\\">continue</span> loop<span class=\\"token punctuation\\">;</span></mark>\\n        <span class=\\"token punctuation\\">}</span>\\n        console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span></mark>\\n<span class=\\"token comment\\">// 0 2 3 4</span>","goodExample":"<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">let</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">5</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>i <span class=\\"token operator\\">===</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">continue</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token comment\\">// 0 2 3 4</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-lone-blocks":{"name":"no-lone-blocks","value":"error","description":"禁止使用没必要的 {} 作为代码块","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Block is redundant.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-lone-blocks)&lt;/span&gt;\\"><span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-lonely-if":{"name":"no-lonely-if","value":"off","description":"禁止 else 中只有一个单独的 if","reason":"单独的 if 可以把逻辑表达的更清楚","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-loop-func":{"name":"no-loop-func","value":"off","description":"禁止在循环内的函数内部出现循环体条件语句中定义的变量","reason":"使用 let 就已经解决了这个问题了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-loss-of-precision":{"name":"no-loss-of-precision","value":"error","description":"禁止使用超出 js 精度范围的数字","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\"><mark class=\\"eslint-error\\" data-tip=\\"This number literal will lose precision at runtime.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-loss-of-precision)&lt;/span&gt;\\">5123000000000000000000000000001</mark></span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">12345</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-magic-numbers":{"name":"no-magic-numbers","value":"off","description":"禁止使用 magic numbers","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-misleading-character-class":{"name":"no-misleading-character-class","value":"error","description":"禁止正则表达式中使用肉眼无法区分的特殊字符","reason":"某些特殊字符很难看出差异，最好不要在正则中使用","badExample":"<span class=\\"token regex\\"><mark class=\\"eslint-error\\" data-tip=\\"Unexpected combined character in character class.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-misleading-character-class)&lt;/span&gt;\\">/^[Á]$/u</mark></span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">test</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'Á\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// false</span>","goodExample":"<span class=\\"token regex\\">/^[A]$/u</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">test</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'A\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// true</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-mixed-requires":{"name":"no-mixed-requires","value":"off","description":"相同类型的 require 必须放在一起","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-multi-assign":{"name":"no-multi-assign","value":"off","description":"禁止连续赋值，比如 a = b = c = 5","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-multi-str":{"name":"no-multi-str","value":"error","description":"禁止使用 \\\\ 来换行字符串","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token string\\"><mark class=\\"eslint-error\\" data-tip=\\"Multiline support is limited to browsers supporting ES5 only.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-multi-str)&lt;/span&gt;\\">\'Line 1\\\\\\nLine 2\'</mark></span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token template-string\\"><span class=\\"token string\\">`Line 1\\nLine 2`</span></span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-negated-condition":{"name":"no-negated-condition","value":"off","description":"禁止 if 里有否定的表达式","reason":"否定的表达式可以把逻辑表达的更清楚","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-nested-ternary":{"name":"no-nested-ternary","value":"off","description":"禁止使用嵌套的三元表达式，比如 a ? b : c ? d : e","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-new":{"name":"no-new","value":"error","description":"禁止直接 new 一个类而不赋值","reason":"new 应该作为创建一个类的实例的方法，所以不能不赋值","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Do not use &amp;apos;new&amp;apos; for side effects.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-new)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></mark>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-new-func":{"name":"no-new-func","value":"error","description":"禁止使用 new Function","reason":"这和 eval 是等价的","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"The Function constructor is eval.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-new-func)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Function</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'a\'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\'b\'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\'return a + b\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> <span class=\\"token function-variable function\\">foo</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">a<span class=\\"token punctuation\\">,</span> b</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> a <span class=\\"token operator\\">+</span> b<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-new-object":{"name":"no-new-object","value":"error","description":"禁止直接 new Object","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"The object literal notation {} is preferrable.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-new-object)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Object</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-new-require":{"name":"no-new-require","value":"error","description":"禁止直接 new require(\'foo\')","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Unexpected use of new with require.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-new-require)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">require</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> Foo <span class=\\"token operator\\">=</span> <span class=\\"token function\\">require</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-new-symbol":{"name":"no-new-symbol","value":"error","description":"禁止使用 new 来生成 Symbol","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\"><mark class=\\"eslint-error\\" data-tip=\\"`Symbol` cannot be called as a constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-new-symbol)&lt;/span&gt;\\">Symbol</mark></span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token function\\">Symbol</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-new-wrappers":{"name":"no-new-wrappers","value":"error","description":"禁止使用 new 来生成 String, Number 或 Boolean","reason":"","badExample":"<span class=\\"token keyword\\">const</span> s <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Do not use String as a constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-new-wrappers)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">String</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> n <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Do not use Number as a constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-new-wrappers)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Number</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> b <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Do not use Boolean as a constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-new-wrappers)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Boolean</span><span class=\\"token punctuation\\">(</span><span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> s <span class=\\"token operator\\">=</span> <span class=\\"token function\\">String</span><span class=\\"token punctuation\\">(</span>someValue<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> n <span class=\\"token operator\\">=</span> <span class=\\"token function\\">Number</span><span class=\\"token punctuation\\">(</span>someValue<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> b <span class=\\"token operator\\">=</span> <span class=\\"token function\\">Boolean</span><span class=\\"token punctuation\\">(</span>someValue<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-nonoctal-decimal-escape":{"name":"no-nonoctal-decimal-escape","value":"off","description":"禁止在字符串中使用 \\\\8 \\\\9","reason":"代码格式问题，最好由 Prettier 解决","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-obj-calls":{"name":"no-obj-calls","value":"error","description":"禁止将 Math, JSON 或 Reflect 直接作为函数调用","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;Math&amp;apos; is not a function.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-obj-calls)&lt;/span&gt;\\"><span class=\\"token function\\">Math</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;JSON&amp;apos; is not a function.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-obj-calls)&lt;/span&gt;\\"><span class=\\"token constant\\">JSON</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> baz <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;Reflect&amp;apos; is not a function.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-obj-calls)&lt;/span&gt;\\"><span class=\\"token function\\">Reflect</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> Math<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">random</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token constant\\">JSON</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">parse</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'{}\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> baz <span class=\\"token operator\\">=</span> Reflect<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">get</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span> x<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> y<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">2</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\'x\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-octal":{"name":"no-octal","value":"off","description":"禁止使用 0 开头的数字表示八进制数","reason":"编译阶段就会报错了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-octal-escape":{"name":"no-octal-escape","value":"off","description":"禁止使用八进制的转义符","reason":"编译阶段就会报错了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-param-reassign":{"name":"no-param-reassign","value":"error","description":"禁止对函数的参数重新赋值","reason":"","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">bar</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Assignment to function parameter &amp;apos;bar&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-param-reassign)&lt;/span&gt;\\">bar</mark> <span class=\\"token operator\\">=</span> bar <span class=\\"token operator\\">||</span> <span class=\\"token string\\">\'\'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">bar_</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  bar <span class=\\"token operator\\">=</span> bar_ <span class=\\"token operator\\">||</span> <span class=\\"token string\\">\'\'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-path-concat":{"name":"no-path-concat","value":"error","description":"禁止对 __dirname 或 __filename 使用字符串连接","reason":"不同平台下的路径符号不一致，建议使用 path 处理平台差异性","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Use path.join() or path.resolve() instead of + to create paths.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-path-concat)&lt;/span&gt;\\">__dirname <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\'/foo.js\'</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Use path.join() or path.resolve() instead of + to create paths.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-path-concat)&lt;/span&gt;\\">__filename <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\'/bar.js\'</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">import</span> path <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'path\'</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> path<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">resolve</span><span class=\\"token punctuation\\">(</span>__dirname<span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\'foo.js\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> path<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">join</span><span class=\\"token punctuation\\">(</span>__filename<span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\'bar.js\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-plusplus":{"name":"no-plusplus","value":"off","description":"禁止使用 ++ 或 --","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-process-env":{"name":"no-process-env","value":"off","description":"禁止使用 process.env.NODE_ENV","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-process-exit":{"name":"no-process-exit","value":"off","description":"禁止使用 process.exit(0)","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-promise-executor-return":{"name":"no-promise-executor-return","value":"error","description":"禁止在 Promise 的回调函数中直接 return","reason":"","badExample":"<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Promise</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">resolve<span class=\\"token punctuation\\">,</span> reject</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>someCondition<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <mark class=\\"eslint-error\\" data-tip=\\"Return values from promise executor functions cannot be read.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-promise-executor-return)&lt;/span&gt;\\"><span class=\\"token keyword\\">return</span> defaultResult<span class=\\"token punctuation\\">;</span></mark>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token function\\">getSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">err<span class=\\"token punctuation\\">,</span> result</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>err<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token function\\">reject</span><span class=\\"token punctuation\\">(</span>err<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token function\\">resolve</span><span class=\\"token punctuation\\">(</span>result<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Promise</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">resolve<span class=\\"token punctuation\\">,</span> reject</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>someCondition<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">resolve</span><span class=\\"token punctuation\\">(</span>defaultResult<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token function\\">getSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">err<span class=\\"token punctuation\\">,</span> result</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>err<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token function\\">reject</span><span class=\\"token punctuation\\">(</span>err<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">else</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token function\\">resolve</span><span class=\\"token punctuation\\">(</span>result<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-proto":{"name":"no-proto","value":"error","description":"禁止使用 __proto__","reason":"__proto__ 是已废弃的语法","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"The &amp;apos;__proto__&amp;apos; property is deprecated.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-proto)&lt;/span&gt;\\">bar<span class=\\"token punctuation\\">.</span>__proto__</mark><span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"The &amp;apos;__proto__&amp;apos; property is deprecated.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-proto)&lt;/span&gt;\\">bar<span class=\\"token punctuation\\">.</span>__proto__</mark> <span class=\\"token operator\\">=</span> baz<span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> Object<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getPrototypeOf</span><span class=\\"token punctuation\\">(</span>bar<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nObject<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">setPrototypeOf</span><span class=\\"token punctuation\\">(</span>bar<span class=\\"token punctuation\\">,</span> baz<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-prototype-builtins":{"name":"no-prototype-builtins","value":"off","description":"禁止使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable","reason":"hasOwnProperty 比较常用","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-redeclare":{"name":"no-redeclare","value":"off","description":"禁止重复定义变量","reason":"禁用 var 之后，编译阶段就会报错了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-regex-spaces":{"name":"no-regex-spaces","value":"error","description":"禁止在正则表达式中出现连续的空格","reason":"","badExample":"<span class=\\"token keyword\\">const</span> reg1 <span class=\\"token operator\\">=</span> <span class=\\"token regex\\"><mark class=\\"eslint-error\\" data-tip=\\"Spaces are hard to count. Use {3}.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-regex-spaces)&lt;/span&gt;\\">/foo   bar/</mark></span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> reg2 <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Spaces are hard to count. Use {3}.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-regex-spaces)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">RegExp</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo   bar\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> reg1 <span class=\\"token operator\\">=</span> <span class=\\"token regex\\">/foo {3}bar/</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> reg2 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">RegExp</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo {3}bar\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-restricted-exports":{"name":"no-restricted-exports","value":"off","description":"禁止导出指定的变量名","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-restricted-globals":{"name":"no-restricted-globals","value":"off","description":"禁止使用指定的全局变量","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-restricted-imports":{"name":"no-restricted-imports","value":"off","description":"禁止导入指定的模块","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-restricted-modules":{"name":"no-restricted-modules","value":"off","description":"禁止使用指定的模块","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-restricted-properties":{"name":"no-restricted-properties","value":"off","description":"禁止使用指定的对象属性","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-restricted-syntax":{"name":"no-restricted-syntax","value":"off","description":"禁止使用指定的语法","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-return-assign":{"name":"no-return-assign","value":["error","always"],"description":"禁止在 return 语句里赋值","reason":"","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Return statement should not contain assignment.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-return-assign)&lt;/span&gt;\\"><span class=\\"token keyword\\">return</span> <span class=\\"token punctuation\\">(</span>bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">return</span> bar<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-return-await":{"name":"no-return-await","value":"error","description":"禁止在 return 语句里使用 await","reason":"","badExample":"<span class=\\"token keyword\\">async</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <mark class=\\"eslint-error\\" data-tip=\\"Redundant use of `await` on a return value.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-return-await)&lt;/span&gt;\\"><span class=\\"token keyword\\">await</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">async</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">const</span> b <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">await</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">return</span> b<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-script-url":{"name":"no-script-url","value":"off","description":"禁止出现 location.href = \'javascript:void(0)\';","reason":"有些场景下还是需要用到这个","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-self-assign":{"name":"no-self-assign","value":"error","description":"禁止将自己赋值给自己","reason":"","badExample":"foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;foo&amp;apos; is assigned to itself.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-self-assign)&lt;/span&gt;\\">foo</mark><span class=\\"token punctuation\\">;</span>","goodExample":"foo <span class=\\"token operator\\">=</span> bar<span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-self-compare":{"name":"no-self-compare","value":"error","description":"禁止将自己与自己比较","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Comparing to itself is potentially pointless.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-self-compare)&lt;/span&gt;\\">foo <span class=\\"token operator\\">===</span> foo</mark><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Comparing to itself is potentially pointless.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-self-compare)&lt;/span&gt;\\"><span class=\\"token number\\">NaN</span> <span class=\\"token operator\\">===</span> <span class=\\"token number\\">NaN</span></mark><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token operator\\">===</span> bar<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token function\\">isNaN</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-sequences":{"name":"no-sequences","value":"error","description":"禁止使用逗号操作符","reason":"","badExample":"<span class=\\"token punctuation\\">(</span>foo <span class=\\"token operator\\">=</span> <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\"><mark class=\\"eslint-error\\" data-tip=\\"Unexpected use of comma operator.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-sequences)&lt;/span&gt;\\">,</mark></span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nfoo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-setter-return":{"name":"no-setter-return","value":"error","description":"禁止 setter 有返回值","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">set</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">value</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>barValue <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar \'</span> <span class=\\"token operator\\">+</span> value<span class=\\"token punctuation\\">;</span>\\n    <mark class=\\"eslint-error\\" data-tip=\\"Setter cannot return a value.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-setter-return)&lt;/span&gt;\\"><span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>barValue<span class=\\"token punctuation\\">;</span></mark>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">set</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">value</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>barValue <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar \'</span> <span class=\\"token operator\\">+</span> value<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-shadow":{"name":"no-shadow","value":"off","description":"禁止变量名与上层作用域内的已定义的变量重复","reason":"很多时候函数的形参和传参是同名的","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-shadow-restricted-names":{"name":"no-shadow-restricted-names","value":"error","description":"禁止使用保留字作为变量名","reason":"","badExample":"<span class=\\"token keyword\\">const</span> <span class=\\"token keyword\\"><mark class=\\"eslint-error\\" data-tip=\\"Shadowing of global property &amp;apos;undefined&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-shadow-restricted-names)&lt;/span&gt;\\">undefined</mark></span> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\"><span class=\\"token number\\"><mark class=\\"eslint-error\\" data-tip=\\"Shadowing of global property &amp;apos;NaN&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-shadow-restricted-names)&lt;/span&gt;\\">NaN</mark></span></span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\"><mark class=\\"eslint-error\\" data-tip=\\"Shadowing of global property &amp;apos;Infinity&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-shadow-restricted-names)&lt;/span&gt;\\">Infinity</mark></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","goodExample":"console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">undefined</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nconsole<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">NaN</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nconsole<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">Infinity</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-sparse-arrays":{"name":"no-sparse-arrays","value":"error","description":"禁止在数组中出现连续的逗号","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Unexpected comma in middle of array.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-sparse-arrays)&lt;/span&gt;\\"><span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-sync":{"name":"no-sync","value":"off","description":"禁止使用 node 中的同步的方法，比如 fs.readFileSync","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-template-curly-in-string":{"name":"no-template-curly-in-string","value":"off","description":"禁止在普通字符串中出现模版字符串里的变量形式","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-ternary":{"name":"no-ternary","value":"off","description":"禁止使用三元表达式","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-this-before-super":{"name":"no-this-before-super","value":"error","description":"禁止在 super 被调用之前使用 this 或 super","reason":"","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Bar</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\"><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;this&amp;apos; is not allowed before &amp;apos;super()&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-this-before-super)&lt;/span&gt;\\">this</mark></span><span class=\\"token punctuation\\">.</span>foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">super</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Bar</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">super</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-throw-literal":{"name":"no-throw-literal","value":"error","description":"禁止 throw 字面量，必须 throw 一个 Error 对象","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Expected an error object to be thrown.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-throw-literal)&lt;/span&gt;\\"><span class=\\"token keyword\\">throw</span> <span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an error object to be thrown.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-throw-literal)&lt;/span&gt;\\"><span class=\\"token keyword\\">throw</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></mark>","goodExample":"<span class=\\"token keyword\\">throw</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Error</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-undef":{"name":"no-undef","value":"error","description":"禁止使用未定义的变量","reason":"","badExample":"<span class=\\"token function\\"><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;foo&amp;apos; is not defined.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-undef)&lt;/span&gt;\\">foo</mark></span><span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;bar&amp;apos; is not defined.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-undef)&lt;/span&gt;\\">bar</mark><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>bar<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">typeof</span> baz <span class=\\"token operator\\">===</span> <span class=\\"token string\\">\'number\'</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-undef-init":{"name":"no-undef-init","value":"error","description":"禁止将 undefined 赋值给变量","reason":"","badExample":"<span class=\\"token keyword\\">let</span> <mark class=\\"eslint-error\\" data-tip=\\"It&amp;apos;s not necessary to initialize &amp;apos;foo&amp;apos; to undefined.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-undef-init)&lt;/span&gt;\\">foo <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">undefined</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">let</span> foo<span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-undefined":{"name":"no-undefined","value":"off","description":"禁止使用 undefined","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-underscore-dangle":{"name":"no-underscore-dangle","value":"off","description":"禁止变量名出现下划线","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-unmodified-loop-condition":{"name":"no-unmodified-loop-condition","value":"error","description":"循环内必须对循环条件中的变量有修改","reason":"","badExample":"<span class=\\"token keyword\\">let</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;foo&amp;apos; is not modified in this loop.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unmodified-loop-condition)&lt;/span&gt;\\">foo</mark><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">let</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">while</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  foo<span class=\\"token operator\\">--</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-unneeded-ternary":{"name":"no-unneeded-ternary","value":"off","description":"必须使用 !a 替代 a ? false : true","reason":"后者表达的更清晰","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-unreachable":{"name":"no-unreachable","value":"error","description":"禁止在 return, throw, break 或 continue 之后还有代码","reason":"","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Unreachable code.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unreachable)&lt;/span&gt;\\"><span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token comment\\">// const bar = 1;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-unreachable-loop":{"name":"no-unreachable-loop","value":"error","description":"禁止在第一轮循环时就一定会退出循环的情况出现","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Invalid loop. Its body allows only one iteration.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unreachable-loop)&lt;/span&gt;\\"><span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token keyword\\">of</span> bar<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">.</span>id <span class=\\"token operator\\">===</span> id<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token keyword\\">of</span> bar<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">.</span>id <span class=\\"token operator\\">===</span> id<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">break</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-unsafe-finally":{"name":"no-unsafe-finally","value":"error","description":"禁止在 finally 中出现 return, throw, break 或 continue","reason":"finally 中的语句会在 try 之前执行","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">finally</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token comment\\">// finally 会在 try 之前执行，故会 return 2</span>\\n    <mark class=\\"eslint-error\\" data-tip=\\"Unsafe usage of ReturnStatement.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unsafe-finally)&lt;/span&gt;\\"><span class=\\"token keyword\\">return</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span></mark>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">finally</span> <span class=\\"token punctuation\\">{</span>\\n    console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-unsafe-negation":{"name":"no-unsafe-negation","value":"error","description":"禁止在 in 或 instanceof 操作符的左侧变量前使用感叹号","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Unexpected negating the left operand of &amp;apos;in&amp;apos; operator.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unsafe-negation)&lt;/span&gt;\\"><span class=\\"token operator\\">!</span>key</mark> <span class=\\"token keyword\\">in</span> object<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Unexpected negating the left operand of &amp;apos;instanceof&amp;apos; operator.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unsafe-negation)&lt;/span&gt;\\"><span class=\\"token operator\\">!</span>obj</mark> <span class=\\"token keyword\\">instanceof</span> <span class=\\"token class-name\\">SomeClass</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">!</span><span class=\\"token punctuation\\">(</span>key <span class=\\"token keyword\\">in</span> object<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">!</span><span class=\\"token punctuation\\">(</span>obj <span class=\\"token keyword\\">instanceof</span> <span class=\\"token class-name\\">SomeClass</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-unsafe-optional-chaining":{"name":"no-unsafe-optional-chaining","value":"error","description":"禁止使用不安全的 optional chaining","reason":"","badExample":"<span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Unsafe usage of optional chaining. If it short-circuits with &amp;apos;undefined&amp;apos; the evaluation will throw TypeError.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unsafe-optional-chaining)&lt;/span&gt;\\">obj<span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">.</span>foo</mark><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token punctuation\\">(</span>obj<span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">.</span>foo <span class=\\"token operator\\">?</span><span class=\\"token operator\\">?</span> <mark class=\\"eslint-error\\" data-tip=\\"Unsafe usage of optional chaining. If it short-circuits with &amp;apos;undefined&amp;apos; the evaluation will throw TypeError.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unsafe-optional-chaining)&lt;/span&gt;\\">obj<span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">.</span>bar</mark><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"obj<span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token punctuation\\">(</span>obj<span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">.</span>foo <span class=\\"token operator\\">?</span><span class=\\"token operator\\">?</span> bar<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-unused-expressions":{"name":"no-unused-expressions","value":["error",{"allowShortCircuit":true,"allowTernary":true,"allowTaggedTemplates":true}],"description":"禁止无用的表达式","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unused-expressions)&lt;/span&gt;\\"><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unused-expressions)&lt;/span&gt;\\">foo<span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unused-expressions)&lt;/span&gt;\\"><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unused-expressions)&lt;/span&gt;\\">foo <span class=\\"token operator\\">&amp;&amp;</span> bar<span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unused-expressions)&lt;/span&gt;\\">foo <span class=\\"token operator\\">||</span> bar<span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unused-expressions)&lt;/span&gt;\\">foo <span class=\\"token operator\\">?</span> bar <span class=\\"token punctuation\\">:</span> baz<span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unused-expressions)&lt;/span&gt;\\"><span class=\\"token template-string\\"><span class=\\"token string\\">`bar`</span></span><span class=\\"token punctuation\\">;</span></mark>","goodExample":"<span class=\\"token string\\">\'use strict\'</span><span class=\\"token punctuation\\">;</span>\\nfoo <span class=\\"token operator\\">&amp;&amp;</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nfoo <span class=\\"token operator\\">||</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nfoo <span class=\\"token operator\\">?</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">:</span> <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nfoo<span class=\\"token template-string\\"><span class=\\"token string\\">`bar`</span></span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-unused-labels":{"name":"no-unused-labels","value":"off","description":"禁止出现没用到的 label","reason":"已经禁止使用 label 了","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-unused-vars":{"name":"no-unused-vars","value":["error",{"vars":"all","args":"none","ignoreRestSiblings":false,"caughtErrors":"none"}],"description":"已定义的变量必须使用","reason":"","badExample":"<span class=\\"token keyword\\">let</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;foo&amp;apos; is assigned a value but never used.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unused-vars)&lt;/span&gt;\\">foo</mark> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\"><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;bar&amp;apos; is defined but never used.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unused-vars)&lt;/span&gt;\\">bar</mark></span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">baz</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">const</span> <span class=\\"token punctuation\\">{</span> <mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;baz&amp;apos; is assigned a value but never used.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unused-vars)&lt;/span&gt;\\">baz</mark><span class=\\"token punctuation\\">,</span> <span class=\\"token operator\\">...</span><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;rest&amp;apos; is assigned a value but never used.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-unused-vars)&lt;/span&gt;\\">rest</mark> <span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">=</span> data<span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">let</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\nconsole<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">baz</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">const</span> <span class=\\"token punctuation\\">{</span> baz<span class=\\"token punctuation\\">,</span> <span class=\\"token operator\\">...</span>rest <span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">=</span> data<span class=\\"token punctuation\\">;</span>\\nconsole<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>baz<span class=\\"token punctuation\\">,</span> rest<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span>e<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-use-before-define":{"name":"no-use-before-define","value":["error",{"variables":false,"functions":false,"classes":false}],"description":"变量必须先定义后使用","reason":"","badExample":"console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;foo&amp;apos; was used before it was defined.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-use-before-define)&lt;/span&gt;\\">foo</mark><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\"><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;Baz&amp;apos; was used before it was defined.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-use-before-define)&lt;/span&gt;\\">Baz</mark></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Baz</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  console<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\nconsole<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Baz</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-useless-backreference":{"name":"no-useless-backreference","value":"error","description":"禁止正则表达式中出现无用的回溯引用","reason":"某些回溯引用语法上没问题，但是会永远匹配到空字符串","badExample":"<span class=\\"token regex\\"><mark class=\\"eslint-error\\" data-tip=\\"Backreference &amp;apos;\\\\1&amp;apos; will be ignored. It references group &amp;apos;(a)&amp;apos; which is in another alternative.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-useless-backreference)&lt;/span&gt;\\">/^(?:(a)|\\\\1b)$/</mark></span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// reference to (a) into another alternative</span>","goodExample":"<span class=\\"token regex\\">/^(?:(a)|(b)\\\\2)$/</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// reference to (b)</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-useless-call":{"name":"no-useless-call","value":"off","description":"禁止出现没必要的 call 或 apply","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-useless-catch":{"name":"no-useless-catch","value":"error","description":"禁止在 catch 中仅仅只是把错误 throw 出去","reason":"这样的 catch 是没有意义的，等价于直接执行 try 里的代码","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Unnecessary try/catch wrapper.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-useless-catch)&lt;/span&gt;\\"><span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">doSomethingThatMightThrow</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span>e<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">throw</span> e<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token function\\">doSomethingThatMightThrow</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">try</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">doSomethingThatMightThrow</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">catch</span> <span class=\\"token punctuation\\">(</span>e<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">doSomethingBeforeRethrow</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">throw</span> e<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-useless-computed-key":{"name":"no-useless-computed-key","value":"error","description":"禁止出现没必要的计算键名","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Unnecessarily computed property [&amp;apos;1&amp;apos;] found.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-useless-computed-key)&lt;/span&gt;\\"><span class=\\"token punctuation\\">[</span><span class=\\"token string\\">\'1\'</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">1</span></mark><span class=\\"token punctuation\\">,</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Unnecessarily computed property [&amp;apos;bar&amp;apos;] found.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-useless-computed-key)&lt;/span&gt;\\"><span class=\\"token punctuation\\">[</span><span class=\\"token string\\">\'bar\'</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">:</span> <span class=\\"token string\\">\'bar\'</span></mark><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span>\\n  bar<span class=\\"token punctuation\\">:</span> <span class=\\"token string\\">\'bar\'</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-useless-concat":{"name":"no-useless-concat","value":"error","description":"禁止出现没必要的字符串连接","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'f\'</span> <span class=\\"token operator\\"><mark class=\\"eslint-error\\" data-tip=\\"Unexpected string concatenation of literals.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-useless-concat)&lt;/span&gt;\\">+</mark></span> <span class=\\"token string\\">\'oo\'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token template-string\\"><span class=\\"token string\\">`b`</span></span> <span class=\\"token operator\\"><mark class=\\"eslint-error\\" data-tip=\\"Unexpected string concatenation of literals.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-useless-concat)&lt;/span&gt;\\">+</mark></span> <span class=\\"token template-string\\"><span class=\\"token string\\">`ar`</span></span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'fo\'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span> <span class=\\"token operator\\">+</span> <span class=\\"token template-string\\"><span class=\\"token string\\">`ar`</span></span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-useless-constructor":{"name":"no-useless-constructor","value":"error","description":"禁止出现没必要的 constructor","reason":"","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Useless constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-useless-constructor)&lt;/span&gt;\\"><span class=\\"token function\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></mark>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Bar</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Useless constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-useless-constructor)&lt;/span&gt;\\"><span class=\\"token function\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\"><span class=\\"token operator\\">...</span>args</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">super</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">...</span>args<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Bar</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\"><span class=\\"token operator\\">...</span>args</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">super</span><span class=\\"token punctuation\\">(</span><span class=\\"token operator\\">...</span>args<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-useless-escape":{"name":"no-useless-escape","value":"off","description":"禁止出现没必要的转义","reason":"转义可以使代码更易懂","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-useless-rename":{"name":"no-useless-rename","value":"error","description":"禁止解构赋值时出现同样名字的的重命名，比如 let { foo: foo } = bar;","reason":"","badExample":"<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> foo <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">export</span> <span class=\\"token punctuation\\">{</span> bar <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">let</span> <span class=\\"token punctuation\\">{</span> <mark class=\\"eslint-error\\" data-tip=\\"Destructuring assignment baz unnecessarily renamed.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-useless-rename)&lt;/span&gt;\\">baz<span class=\\"token punctuation\\">:</span> baz</mark> <span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">=</span> foo<span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> foo <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">export</span> <span class=\\"token punctuation\\">{</span> bar <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">let</span> <span class=\\"token punctuation\\">{</span> baz <span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">=</span> foo<span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-useless-return":{"name":"no-useless-return","value":"off","description":"禁止没必要的 return","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-var":{"name":"no-var","value":"error","description":"禁止使用 var","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Unexpected var, use let or const instead.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-var)&lt;/span&gt;\\"><span class=\\"token keyword\\">var</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></mark>","goodExample":"<span class=\\"token keyword\\">let</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"no-void":{"name":"no-void","value":"error","description":"禁止使用 void","reason":"","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <mark class=\\"eslint-error\\" data-tip=\\"Expected &amp;apos;undefined&amp;apos; and instead saw &amp;apos;void&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(no-void)&lt;/span&gt;\\"><span class=\\"token keyword\\">void</span> <span class=\\"token number\\">0</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-warning-comments":{"name":"no-warning-comments","value":"off","description":"禁止注释中出现 TODO 和 FIXME","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"no-with":{"name":"no-with","value":"off","description":"禁止使用 with","reason":"编译阶段就会报错了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"object-shorthand":{"name":"object-shorthand","value":["error","always"],"description":"必须使用 a = {b} 而不是 a = {b: b}","reason":"减少代码冗余","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"one-var":{"name":"one-var","value":"off","description":"禁止变量申明时用逗号一次申明多个","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"operator-assignment":{"name":"operator-assignment","value":"off","description":"必须使用 x = x + y 而不是 x += y","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"padding-line-between-statements":{"name":"padding-line-between-statements","value":"off","description":"限制语句之间的空行规则，比如变量定义完之后必须要空行","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-arrow-callback":{"name":"prefer-arrow-callback","value":["error",{"allowNamedFunctions":true}],"description":"必须使用箭头函数作为回调","reason":"避免产生闭包中 this 指向的问题。\\n特殊规则，允许有名称定义的函数使用。","badExample":"<span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Unexpected function expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(prefer-arrow-callback)&lt;/span&gt;\\"><span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">a</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> a<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span></mark><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">a</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> a<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-const":{"name":"prefer-const","value":"error","description":"申明后不再被修改的变量必须使用 const 来申明","reason":"","badExample":"<span class=\\"token keyword\\">let</span> <mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;foo&amp;apos; is never reassigned. Use &amp;apos;const&amp;apos; instead.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(prefer-const)&lt;/span&gt;\\">foo</mark> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar\'</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar\'</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-destructuring":{"name":"prefer-destructuring","value":"off","description":"必须使用解构赋值","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-exponentiation-operator":{"name":"prefer-exponentiation-operator","value":"off","description":"使用 ES2016 的语法 ** 替代 Math.pow","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-named-capture-group":{"name":"prefer-named-capture-group","value":"off","description":"使用 ES2018 中的正则表达式命名组","reason":"正则表达式已经较难理解了，没必要强制加上命名组","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-numeric-literals":{"name":"prefer-numeric-literals","value":"error","description":"必须使用 0b11111011 而不是 parseInt()","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Use binary literals instead of parseInt().&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(prefer-numeric-literals)&lt;/span&gt;\\"><span class=\\"token function\\">parseInt</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'111110111\'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0b11111011</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-object-spread":{"name":"prefer-object-spread","value":"error","description":"必须使用 ... 而不是 Object.assign，除非 Object.assign 的第一个参数是一个变量","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Use an object spread instead of `Object.assign` eg: `{ ...foo }`.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(prefer-object-spread)&lt;/span&gt;\\">Object<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">assign</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> bar<span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span> <span class=\\"token operator\\">...</span>bar <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token comment\\">// 第一个参数为变量时允许使用 Object.assign</span>\\nObject<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">assign</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">,</span> baz<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-promise-reject-errors":{"name":"prefer-promise-reject-errors","value":"error","description":"Promise 的 reject 中必须传入 Error 对象，而不是字面量","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Expected the Promise rejection reason to be an Error.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(prefer-promise-reject-errors)&lt;/span&gt;\\">Promise<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">reject</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Promise</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">resolve<span class=\\"token punctuation\\">,</span> reject</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Expected the Promise rejection reason to be an Error.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(prefer-promise-reject-errors)&lt;/span&gt;\\"><span class=\\"token function\\">reject</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Promise</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">resolve<span class=\\"token punctuation\\">,</span> reject</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Expected the Promise rejection reason to be an Error.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(prefer-promise-reject-errors)&lt;/span&gt;\\"><span class=\\"token function\\">reject</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"Promise<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">reject</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Error</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Promise</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">resolve<span class=\\"token punctuation\\">,</span> reject</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">reject</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Error</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-regex-literals":{"name":"prefer-regex-literals","value":"error","description":"优先使用正则表达式字面量，而不是 RegExp 构造函数","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Use a regular expression literal instead of the &amp;apos;RegExp&amp;apos; constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(prefer-regex-literals)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">RegExp</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'abc\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"Use a regular expression literal instead of the &amp;apos;RegExp&amp;apos; constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(prefer-regex-literals)&lt;/span&gt;\\"><span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">RegExp</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'\\\\\\\\.\'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token string\\">\'g\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token regex\\">/abc/</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token regex\\">/\\\\./g</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">RegExp</span><span class=\\"token punctuation\\">(</span>prefix <span class=\\"token operator\\">+</span> <span class=\\"token string\\">\'abc\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-rest-params":{"name":"prefer-rest-params","value":"off","description":"必须使用 ...args 而不是 arguments","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-spread":{"name":"prefer-spread","value":"off","description":"必须使用 ... 而不是 apply，比如 foo(...args)","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"prefer-template":{"name":"prefer-template","value":"off","description":"必须使用模版字符串而不是字符串连接","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"radix":{"name":"radix","value":"error","description":"parseInt 必须传入第二个参数","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Missing radix parameter.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(radix)&lt;/span&gt;\\"><span class=\\"token function\\">parseInt</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'071\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// 57</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token function\\">parseInt</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'071\'</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// 71</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"require-atomic-updates":{"name":"require-atomic-updates","value":"off","description":"禁止将 await 或 yield 的结果做为运算符的后面项\\nhttps://github.com/eslint/eslint/issues/11899\\n在上面 issue 修复之前，关闭此规则","reason":"这样会导致不符合预期的结果","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"require-await":{"name":"require-await","value":"off","description":"async 函数中必须存在 await 语句","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"require-jsdoc":{"name":"require-jsdoc","value":["error",{"require":{"FunctionDeclaration":true,"MethodDefinition":false,"ClassDeclaration":false,"ArrowFunctionExpression":false,"FunctionExpression":false}}],"description":"限制一行中的语句数量","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Missing JSDoc comment.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(require-jsdoc)&lt;/span&gt;\\"><span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span></mark>\\n\\n<span class=\\"token keyword\\">var</span> <span class=\\"token function-variable function\\">bar</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">var</span> <span class=\\"token function-variable function\\">baz</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">var</span> qux <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function-variable function\\">bar</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n\\n  <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token comment\\">/**\\n * It returns 10\\n */</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token comment\\">/**\\n * It returns test + 10\\n * @params {int} test - some number\\n * @returns {int} sum of test and 10\\n */</span>\\n<span class=\\"token keyword\\">var</span> <span class=\\"token function-variable function\\">bar</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">test</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> test <span class=\\"token operator\\">+</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token comment\\">/**\\n * It returns 10\\n */</span>\\n<span class=\\"token keyword\\">var</span> <span class=\\"token function-variable function\\">baz</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token comment\\">/**\\n * It returns 10\\n */</span>\\n<span class=\\"token keyword\\">var</span> <span class=\\"token function-variable function\\">qux</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">var</span> array <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\narray<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">filter</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">item</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> item <span class=\\"token operator\\">></span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token comment\\">/**\\n * A class that can return the number 10\\n */</span>\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">/**\\n   * It returns 10\\n   */</span>\\n  <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token comment\\">/**\\n * It returns 10\\n */</span>\\n<span class=\\"token keyword\\">var</span> <span class=\\"token function-variable function\\">quux</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">var</span> foofoo <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">/**\\n   * It returns 10\\n   */</span>\\n  <span class=\\"token function-variable function\\">bar</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n\\n  <span class=\\"token comment\\">/**\\n   * It returns 10\\n   */</span>\\n  <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token function\\">setTimeout</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span> <span class=\\"token comment\\">// since it\'s an anonymous arrow function</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"require-unicode-regexp":{"name":"require-unicode-regexp","value":"off","description":"正则表达式中必须要加上 u 标志","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"require-yield":{"name":"require-yield","value":"error","description":"generator 函数内必须有 yield","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"This generator function does not have &amp;apos;yield&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(require-yield)&lt;/span&gt;\\"><span class=\\"token keyword\\">function</span><span class=\\"token operator\\">*</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token keyword\\">function</span><span class=\\"token operator\\">*</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">yield</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"semi":{"name":"semi","value":"error","description":"statement 必须用分号分隔","reason":"","badExample":"<span class=\\"token keyword\\">const</span> a <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><mark class=\\"eslint-error\\" data-tip=\\"Missing semicolon.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(semi)&lt;/span&gt;\\"></mark>","goodExample":"<span class=\\"token keyword\\">const</span> a <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"sort-imports":{"name":"sort-imports","value":"off","description":"导入必须按规则排序","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"sort-keys":{"name":"sort-keys","value":"off","description":"对象字面量的键名必须排好序","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"sort-vars":{"name":"sort-vars","value":"off","description":"变量申明必须排好序","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"spaced-comment":{"name":"spaced-comment","value":["error","always",{"exceptions":["#alt","#endalt"],"markers":["#","#module","#endmodule"]}],"description":"注释的斜线或 * 后必须有空格\\n特殊规则，nstarter 模板中的代码块声明标签必须与注释符号相连。","reason":"提升可读性","badExample":"<span class=\\"token comment\\"><mark class=\\"eslint-error\\" data-tip=\\"Expected exception block, space or tab after &amp;apos;//&amp;apos; in comment.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(spaced-comment)&lt;/span&gt;\\">//foo</mark></span>\\n<span class=\\"token comment\\"><mark class=\\"eslint-error\\" data-tip=\\"Expected exception block, space or tab after &amp;apos;/*&amp;apos; in comment.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(spaced-comment)&lt;/span&gt;\\">/*bar */</mark></span>\\n<span class=\\"token comment\\"><mark class=\\"eslint-error\\" data-tip=\\"Expected exception block, space or tab after &amp;apos;/**&amp;apos; in comment.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(spaced-comment)&lt;/span&gt;\\">/**baz */</mark></span>","goodExample":"<span class=\\"token comment\\">// foo</span>\\n<span class=\\"token comment\\">/* bar */</span>\\n<span class=\\"token comment\\">/** baz */</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"strict":{"name":"strict","value":["error","never"],"description":"禁止使用 \'strict\';","reason":"","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;use strict&amp;apos; is unnecessary inside of modules.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(strict)&lt;/span&gt;\\"><span class=\\"token string\\">\'use strict\'</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;use strict&amp;apos; is unnecessary inside of modules.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(strict)&lt;/span&gt;\\"><span class=\\"token string\\">\'use strict\'</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"symbol-description":{"name":"symbol-description","value":"error","description":"创建 Symbol 时必须传入参数","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Expected Symbol to have a description.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(symbol-description)&lt;/span&gt;\\"><span class=\\"token function\\">Symbol</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token function\\">Symbol</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"template-curly-spacing":{"name":"template-curly-spacing","value":["warn","always"],"description":"模板字符串变量括号前后保留空格。","reason":"可读性更好","badExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token template-string\\"><span class=\\"token string\\">`</span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\"><mark class=\\"eslint-error\\" data-tip=\\"Expected space(s) after &amp;apos;${&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(template-curly-spacing)&lt;/span&gt;\\">${</mark></span>bar<span class=\\"token interpolation-punctuation punctuation\\"><mark class=\\"eslint-error\\" data-tip=\\"Expected space(s) before &amp;apos;}&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(template-curly-spacing)&lt;/span&gt;\\">}</mark></span></span><span class=\\"token string\\">`</span></span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token template-string\\"><span class=\\"token string\\">`</span><span class=\\"token interpolation\\"><span class=\\"token interpolation-punctuation punctuation\\">${</span> bar <span class=\\"token interpolation-punctuation punctuation\\">}</span></span><span class=\\"token string\\">`</span></span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"use-isnan":{"name":"use-isnan","value":"error","description":"必须使用 isNaN(foo) 而不是 foo === NaN","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Use the isNaN function to compare with NaN.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(use-isnan)&lt;/span&gt;\\">foo <span class=\\"token operator\\">===</span> <span class=\\"token number\\">NaN</span></mark><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token function\\">isNaN</span><span class=\\"token punctuation\\">(</span>foo<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"valid-typeof":{"name":"valid-typeof","value":"error","description":"typeof 表达式比较的对象必须是 \'undefined\', \'object\', \'boolean\', \'number\', \'string\', \'function\', \'symbol\', 或 \'bigint\'","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">typeof</span> foo <span class=\\"token operator\\">===</span> <span class=\\"token string\\"><mark class=\\"eslint-error\\" data-tip=\\"Invalid typeof comparison value.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(valid-typeof)&lt;/span&gt;\\">\'numbe\'</mark></span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">typeof</span> foo <span class=\\"token operator\\">===</span> <span class=\\"token string\\">\'number\'</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"vars-on-top":{"name":"vars-on-top","value":"off","description":"var 必须在作用域的最前面","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"yoda":{"name":"yoda","value":"off","description":"必须使用 if (foo === 5) 而不是 if (5 === foo)","reason":"","badExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span> <span class=\\"token operator\\">===</span> foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>foo <span class=\\"token operator\\">===</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span> <span class=\\"token operator\\">&lt;</span> foo<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span><span class=\\"token number\\">1</span> <span class=\\"token operator\\">&lt;</span> foo <span class=\\"token operator\\">&amp;&amp;</span> foo <span class=\\"token operator\\">&lt;</span> <span class=\\"token number\\">10</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false}}');

/***/ }),

/***/ "./config/rules/typescript.json":
/*!**************************************!*\
  !*** ./config/rules/typescript.json ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"@typescript-eslint/adjacent-overload-signatures":{"name":"@typescript-eslint/adjacent-overload-signatures","value":"error","description":"重载的函数必须写在一起","reason":"增加可读性","badExample":"<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">namespace</span> NSFoo1 <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">s<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">n<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"All foo signatures should be adjacent.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/adjacent-overload-signatures)&lt;/span&gt;\\"><span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">sn<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">number</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">type</span> TypeFoo1 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>s<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>n<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"All foo signatures should be adjacent.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/adjacent-overload-signatures)&lt;/span&gt;\\"><span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>sn<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">IFoo1</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>s<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>n<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"All foo signatures should be adjacent.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/adjacent-overload-signatures)&lt;/span&gt;\\"><span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>sn<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">namespace</span> NSFoo2 <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">s<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">n<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">sn<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">number</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">export</span> <span class=\\"token keyword\\">function</span> <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">type</span> TypeFoo2 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>s<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>n<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>sn<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">IFoo2</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>s<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>n<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span>sn<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/array-type":{"name":"@typescript-eslint/array-type","value":"off","description":"限制数组类型必须使用 Array<T> 或 T[]","reason":"允许灵活运用两者","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/await-thenable":{"name":"@typescript-eslint/await-thenable","value":"off","description":"禁止对没有 then 方法的对象使用 await","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/ban-ts-comment":{"name":"@typescript-eslint/ban-ts-comment","value":"off","description":"禁止使用 // @ts-ignore // @ts-nocheck // @ts-check","reason":"这种注释本身就是对特殊代码的说明","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/ban-ts-ignore":{"name":"@typescript-eslint/ban-ts-ignore","value":"off","description":"是否允许使用 // @ts-ignore 来忽略编译错误","reason":"既然已经使用注释来忽略编译错误了，说明已经清楚可能带来的后果","badExample":"","goodExample":""},"@typescript-eslint/ban-tslint-comment":{"name":"@typescript-eslint/ban-tslint-comment","value":"off","description":"禁止使用类似 tslint:disable-next-line 这样的注释","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/ban-types":{"name":"@typescript-eslint/ban-types","value":["error",{"types":{"{}":false,"Object":{"message":"Use \'{}\' instead","fixWith":"{}"},"String":{"message":"Use \'string\' instead","fixWith":"string"},"Number":{"message":"Use \'number\' instead","fixWith":"number"},"Boolean":{"message":"Use \'boolean\' instead","fixWith":"boolean"}}}],"description":"禁止使用指定的类型\\n不使用 Object, String, Number, Boolean 类型，而使用原生的 ts 类型","reason":"统一代码风格","badExample":"<span class=\\"token keyword\\">let</span> foo<span class=\\"token punctuation\\">:</span> <mark class=\\"eslint-error\\" data-tip=\\"Don&amp;apos;t use `Object` as a type. Use &amp;apos;{}&amp;apos; instead&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/ban-types)&lt;/span&gt;\\">Object</mark> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">let</span> bar<span class=\\"token punctuation\\">:</span> <mark class=\\"eslint-error\\" data-tip=\\"Don&amp;apos;t use `String` as a type. Use &amp;apos;string&amp;apos; instead&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/ban-types)&lt;/span&gt;\\">String</mark> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'\'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">let</span> baz<span class=\\"token punctuation\\">:</span> <mark class=\\"eslint-error\\" data-tip=\\"Don&amp;apos;t use `Number` as a type. Use &amp;apos;number&amp;apos; instead&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/ban-types)&lt;/span&gt;\\">Number</mark> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">let</span> qux<span class=\\"token punctuation\\">:</span> <mark class=\\"eslint-error\\" data-tip=\\"Don&amp;apos;t use `Boolean` as a type. Use &amp;apos;boolean&amp;apos; instead&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/ban-types)&lt;/span&gt;\\">Boolean</mark> <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">let</span> foo<span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">let</span> bar<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'\'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">let</span> baz<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">let</span> qux<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">boolean</span> <span class=\\"token operator\\">=</span> <span class=\\"token boolean\\">true</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/camelcase":{"name":"@typescript-eslint/camelcase","value":"off","description":"变量名必须是 camelcase 风格的","reason":"很多 api 或文件名都不是 camelcase 风格的","badExample":"","goodExample":""},"@typescript-eslint/class-literal-property-style":{"name":"@typescript-eslint/class-literal-property-style","value":["error","fields"],"description":"类的只读属性若是一个字面量，则必须使用只读属性而不是 getter","reason":"","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo1</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">get</span> <span class=\\"token function\\"><mark class=\\"eslint-error\\" data-tip=\\"Literals should be exposed using readonly fields.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/class-literal-property-style)&lt;/span&gt;\\">bar</mark></span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo2</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">readonly</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/consistent-indexed-object-style":{"name":"@typescript-eslint/consistent-indexed-object-style","value":"off","description":"必须使用内置的 Record<K, T> 来描述仅包含可索引成员的接口","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/consistent-type-assertions":{"name":"@typescript-eslint/consistent-type-assertions","value":["error",{"assertionStyle":"as","objectLiteralTypeAssertions":"never"}],"description":"类型断言必须使用 as Type，禁止使用 <Type>，禁止对对象字面量进行类型断言（断言成 any 是允许的）","reason":"<Type> 容易被理解为 jsx","badExample":"<span class=\\"token keyword\\">let</span> bar1<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> foo1 <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Use &amp;apos;as string&amp;apos; instead of &amp;apos;&amp;lt;string&amp;gt;&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/consistent-type-assertions)&lt;/span&gt;\\"><span class=\\"token operator\\">&lt;</span><span class=\\"token builtin\\">string</span><span class=\\"token operator\\">></span>bar1</mark><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">const</span> baz1 <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"Always prefer const x: T = { ... }.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/consistent-type-assertions)&lt;/span&gt;\\"><span class=\\"token punctuation\\">{</span>\\n  bar<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">as</span> object</mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">let</span> bar2<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> foo2 <span class=\\"token operator\\">=</span> bar2 <span class=\\"token keyword\\">as</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">const</span> baz2 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  bar<span class=\\"token punctuation\\">:</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span>\\n<span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">as</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/consistent-type-definitions":{"name":"@typescript-eslint/consistent-type-definitions","value":["error","interface"],"description":"优先使用 interface 而不是 type","reason":"interface 可以 implement, extend 和 merge","badExample":"<span class=\\"token keyword\\">type</span> <mark class=\\"eslint-error\\" data-tip=\\"Use an `interface` instead of a `type`.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/consistent-type-definitions)&lt;/span&gt;\\">Foo1</mark> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  foo<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">Foo2</span> <span class=\\"token punctuation\\">{</span>\\n  foo<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/consistent-type-imports":{"name":"@typescript-eslint/consistent-type-imports","value":"off","description":"必须使用 import type 导入类型","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/default-param-last":{"name":"@typescript-eslint/default-param-last","value":"off","description":"有默认值或可选的参数必须放到最后","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"default-param-last","requiresTypeChecking":false},"@typescript-eslint/dot-notation":{"name":"@typescript-eslint/dot-notation","value":"off","description":"禁止使用 foo[\'bar\']，必须写成 foo.bar","reason":"当需要写一系列属性的时候，可以更统一","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"dot-notation","requiresTypeChecking":true},"@typescript-eslint/explicit-function-return-type":{"name":"@typescript-eslint/explicit-function-return-type","value":"off","description":"函数返回值必须与声明的类型一致","reason":"编译阶段检查就足够了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/explicit-member-accessibility":{"name":"@typescript-eslint/explicit-member-accessibility","value":["error",{"accessibility":"explicit","overrides":{"constructors":"no-public"}}],"description":"必须设置类的成员的可访问性\\n特殊规则，对于 constructor，不要求指定其 public 状态。","reason":"将不需要公开的成员设为私有的，可以增强代码的可理解性，对文档输出也很友好","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo2</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Missing accessibility modifier on class property foo.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/explicit-member-accessibility)&lt;/span&gt;\\"><span class=\\"token keyword\\">static</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">;</span></mark>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Missing accessibility modifier on method definition getFoo.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/explicit-member-accessibility)&lt;/span&gt;\\"><span class=\\"token keyword\\">static</span> <span class=\\"token function\\">getFoo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> Foo2<span class=\\"token punctuation\\">.</span>foo<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span></mark>\\n  <span class=\\"token keyword\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Missing accessibility modifier on class property bar.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/explicit-member-accessibility)&lt;/span&gt;\\">bar <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar\'</span><span class=\\"token punctuation\\">;</span></mark>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Missing accessibility modifier on method definition getBar.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/explicit-member-accessibility)&lt;/span&gt;\\"><span class=\\"token function\\">getBar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></mark>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Missing accessibility modifier on get property accessor baz.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/explicit-member-accessibility)&lt;/span&gt;\\"><span class=\\"token keyword\\">get</span> <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token string\\">\'baz\'</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span></mark>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Missing accessibility modifier on set property accessor baz.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/explicit-member-accessibility)&lt;/span&gt;\\"><span class=\\"token keyword\\">set</span> <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">value</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>value<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo2</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> foo <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'foo\'</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token function\\">getFoo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> Foo2<span class=\\"token punctuation\\">.</span>foo<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">protected</span> bar <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar\'</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token function\\">getBar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">get</span> <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token string\\">\'baz\'</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">set</span> <span class=\\"token function\\">baz</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">value</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>value<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/explicit-module-boundary-types":{"name":"@typescript-eslint/explicit-module-boundary-types","value":"off","description":"导出的函数或类中的 public 方法必须定义输入输出参数的类型","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/generic-type-naming":{"name":"@typescript-eslint/generic-type-naming","value":"off","description":"约束泛型的命名规则","reason":"","badExample":"","goodExample":""},"@typescript-eslint/indent":{"name":"@typescript-eslint/indent","value":"off","description":"缩进规定为 4 空格","reason":"已被 javascript 规则覆盖，无需重复指定。","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"indent","requiresTypeChecking":false},"@typescript-eslint/init-declarations":{"name":"@typescript-eslint/init-declarations","value":"off","description":"变量必须在定义的时候赋值","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"init-declarations","requiresTypeChecking":false},"@typescript-eslint/interface-name-prefix":{"name":"@typescript-eslint/interface-name-prefix","value":"off","description":"接口名称必须以 I 开头","reason":"","badExample":"","goodExample":""},"@typescript-eslint/lines-between-class-members":{"name":"@typescript-eslint/lines-between-class-members","value":"off","description":"类的成员之间是否需要空行","reason":"有时为了紧凑需要挨在一起，有时为了可读性需要空一行","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"lines-between-class-members","requiresTypeChecking":false},"@typescript-eslint/member-delimiter-style":{"name":"@typescript-eslint/member-delimiter-style","value":["error",{"multiline":{"delimiter":"semi","requireLast":true},"singleline":{"delimiter":"semi","requireLast":false},"overrides":{"typeLiteral":{"multiline":{"delimiter":"comma","requireLast":false},"singleline":{"delimiter":"comma","requireLast":false}}}}],"description":"统一成员属性的分隔符形式\\n对于对象或 Interface 声明，使用 ;。对于 type 声明使用 ,。","reason":"统一代码风格","badExample":"<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">ITest1</span> <span class=\\"token punctuation\\">{</span>\\n  foo<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n  bar<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">type</span> TTest2 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  foo<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n  bar<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">type</span> TTest3 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span> foo<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span><mark class=\\"eslint-error\\" data-tip=\\"Expected a comma.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/member-delimiter-style)&lt;/span&gt;\\"> </mark>bar<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">const</span> test4<span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">{</span>\\n  x<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n  y<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span><mark class=\\"eslint-error\\" data-tip=\\"Expected a comma.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/member-delimiter-style)&lt;/span&gt;\\"></mark><mark class=\\"eslint-error\\" data-tip=\\"Unexpected separator (;).&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/member-delimiter-style)&lt;/span&gt;\\"></mark><mark class=\\"eslint-error\\" data-tip=\\"Expected a comma.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/member-delimiter-style)&lt;/span&gt;\\"></mark><mark class=\\"eslint-error\\" data-tip=\\"Unexpected separator (;).&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/member-delimiter-style)&lt;/span&gt;\\"></mark>","goodExample":"<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">ITest1</span> <span class=\\"token punctuation\\">{</span>\\n  foo<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n  bar<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">type</span> TTest2 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  foo<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">,</span>\\n  bar<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">type</span> TTest3 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span> foo<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">,</span> bar<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">const</span> test4<span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">{</span>\\n  x<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">,</span>\\n  y<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/member-naming":{"name":"@typescript-eslint/member-naming","value":"off","description":"私有成员必须以 _ 开头","reason":"已有 private 修饰符了，没必要限制变量名","badExample":"","goodExample":""},"@typescript-eslint/member-ordering":{"name":"@typescript-eslint/member-ordering","value":["warn",{"default":["static-field","instance-field","public-constructor","protected-constructor","private-constructor","private-static-method","protected-static-method","public-static-method"]}],"description":"成员属性定义过程的指导性顺序约束\\n不做强制性要求","reason":"优先级：\\n1. static > instance\\n2. field > constructor > method\\n3. public > protected > private","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo1</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token function\\">getBar3</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>bar3<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">protected</span> <span class=\\"token function\\">getBar2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token function\\">getBar1</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>Foo1<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getFoo3</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getBar3</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Member bar3 should be declared before all public constructor definitions.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/member-ordering)&lt;/span&gt;\\"><span class=\\"token keyword\\">private</span> bar3 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar3\'</span><span class=\\"token punctuation\\">;</span></mark>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Member bar2 should be declared before all public constructor definitions.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/member-ordering)&lt;/span&gt;\\"><span class=\\"token keyword\\">protected</span> bar2 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar2\'</span><span class=\\"token punctuation\\">;</span></mark>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Member bar1 should be declared before all public constructor definitions.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/member-ordering)&lt;/span&gt;\\"><span class=\\"token keyword\\">public</span> bar1 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar1\'</span><span class=\\"token punctuation\\">;</span></mark>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token function\\">getFoo3</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> Foo1<span class=\\"token punctuation\\">.</span>foo3<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">protected</span> <span class=\\"token keyword\\">static</span> <span class=\\"token function\\">getFoo2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token function\\">getFoo1</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Member foo3 should be declared before all public constructor definitions.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/member-ordering)&lt;/span&gt;\\"><span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> foo3 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'foo3\'</span><span class=\\"token punctuation\\">;</span></mark>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Member foo2 should be declared before all public constructor definitions.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/member-ordering)&lt;/span&gt;\\"><span class=\\"token keyword\\">protected</span> <span class=\\"token keyword\\">static</span> foo2 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'foo2\'</span><span class=\\"token punctuation\\">;</span></mark>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Member foo1 should be declared before all public constructor definitions.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/member-ordering)&lt;/span&gt;\\"><span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> foo1 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'foo1\'</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo2</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> foo1 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'foo1\'</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">protected</span> <span class=\\"token keyword\\">static</span> foo2 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'foo2\'</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> foo3 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'foo3\'</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">public</span> bar1 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar1\'</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">protected</span> bar2 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar2\'</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">private</span> bar3 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'bar3\'</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>Foo2<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getFoo3</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">getBar3</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token function\\">getBar1</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">protected</span> <span class=\\"token function\\">getBar2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token function\\">getBar3</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>bar3<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n\\n  <span class=\\"token keyword\\">private</span> <span class=\\"token keyword\\">static</span> <span class=\\"token function\\">getFoo1</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">return</span> Foo2<span class=\\"token punctuation\\">.</span>foo3<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">protected</span> <span class=\\"token keyword\\">static</span> <span class=\\"token function\\">getFoo2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">public</span> <span class=\\"token keyword\\">static</span> <span class=\\"token function\\">getFoo3</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/method-signature-style":{"name":"@typescript-eslint/method-signature-style","value":"error","description":"接口中的方法必须用属性的方式定义","reason":"配置了 strictFunctionTypes 之后，用属性的方式定义方法可以获得更严格的检查","badExample":"<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">Foo1</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Shorthand method signature is forbidden. Use a function property instead.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/method-signature-style)&lt;/span&gt;\\"><span class=\\"token function\\">bar</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">Foo1</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token function-variable function\\">bar</span><span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/naming-convention":{"name":"@typescript-eslint/naming-convention","value":["error",{"selector":"class","format":["PascalCase"]}],"description":"限制各种变量或类型的命名规则","reason":"","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\"><mark class=\\"eslint-error\\" data-tip=\\"Class name `Invalid_Class_Name` must match one of the following formats: PascalCase&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/naming-convention)&lt;/span&gt;\\">Invalid_Class_Name</mark></span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">invalidInterface</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">ValidClassName</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">ValidInterface</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-array-constructor":{"name":"@typescript-eslint/no-array-constructor","value":"off","description":"禁止使用 Array 构造函数","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"no-array-constructor","requiresTypeChecking":false},"@typescript-eslint/no-base-to-string":{"name":"@typescript-eslint/no-base-to-string","value":"off","description":"禁止滥用 toString 方法","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-confusing-non-null-assertion":{"name":"@typescript-eslint/no-confusing-non-null-assertion","value":"off","description":"禁止使用容易混淆的非空断言","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-confusing-void-expression":{"name":"@typescript-eslint/no-confusing-void-expression","value":"off","description":"禁止使用返回值为 void 的函数的返回值","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-dupe-class-members":{"name":"@typescript-eslint/no-dupe-class-members","value":"off","description":"禁止重复定义类的成员","reason":"编译阶段就会报错了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"no-dupe-class-members","requiresTypeChecking":false},"@typescript-eslint/no-duplicate-imports":{"name":"@typescript-eslint/no-duplicate-imports","value":"error","description":"禁止重复导入模块","reason":"","badExample":"<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> readFile <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\"><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;fs&amp;apos; imported multiple times.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(import/no-duplicates)&lt;/span&gt;\\">\'fs\'</mark></span><span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;fs&amp;apos; import is duplicated.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-duplicate-imports)&lt;/span&gt;\\"><span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> writeFile <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\"><mark class=\\"eslint-error\\" data-tip=\\"&amp;apos;fs&amp;apos; imported multiple times.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(import/no-duplicates)&lt;/span&gt;\\">\'fs\'</mark></span><span class=\\"token punctuation\\">;</span></mark>","goodExample":"<span class=\\"token keyword\\">import</span> <span class=\\"token punctuation\\">{</span> readFile<span class=\\"token punctuation\\">,</span> writeFile <span class=\\"token punctuation\\">}</span> <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'fs\'</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"no-duplicate-imports","requiresTypeChecking":false},"@typescript-eslint/no-dynamic-delete":{"name":"@typescript-eslint/no-dynamic-delete","value":"off","description":"禁止 delete 时传入的 key 是动态的","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-empty-function":{"name":"@typescript-eslint/no-empty-function","value":"off","description":"不允许有空函数","reason":"有时需要将一个空函数设置为某个项的默认值","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"no-empty-function","requiresTypeChecking":false},"@typescript-eslint/no-empty-interface":{"name":"@typescript-eslint/no-empty-interface","value":"off","description":"禁止定义空的接口","reason":"允许定义空的接口作为基础类型声明","badExample":"<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">Foo1</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">Foo2</span> <span class=\\"token punctuation\\">{</span>\\n  foo<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-explicit-any":{"name":"@typescript-eslint/no-explicit-any","value":"off","description":"禁止使用 any","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-extra-non-null-assertion":{"name":"@typescript-eslint/no-extra-non-null-assertion","value":"off","description":"禁止多余的 non-null 断言","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-extraneous-class":{"name":"@typescript-eslint/no-extraneous-class","value":"off","description":"禁止定义没必要的类，比如只有静态方法的类","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-floating-promises":{"name":"@typescript-eslint/no-floating-promises","value":"off","description":"禁止调用 Promise 时没有处理异常情况","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-for-in-array":{"name":"@typescript-eslint/no-for-in-array","value":"off","description":"禁止对 array 使用 for in 循环","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-implied-eval":{"name":"@typescript-eslint/no-implied-eval","value":"off","description":"禁止使用 eval","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"no-implied-eval","requiresTypeChecking":true},"@typescript-eslint/no-inferrable-types":{"name":"@typescript-eslint/no-inferrable-types","value":"error","description":"禁止给一个初始化时直接赋值为 number, string 的变量显式的声明类型","reason":"可以简化代码","badExample":"<span class=\\"token keyword\\">const</span> <mark class=\\"eslint-error\\" data-tip=\\"Type number trivially inferred from a number literal, remove type annotation.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-inferrable-types)&lt;/span&gt;\\">foo1<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span></mark><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> <mark class=\\"eslint-error\\" data-tip=\\"Type string trivially inferred from a string literal, remove type annotation.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-inferrable-types)&lt;/span&gt;\\">bar1<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'\'</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo2 <span class=\\"token operator\\">=</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> bar2 <span class=\\"token operator\\">=</span> <span class=\\"token string\\">\'\'</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-invalid-this":{"name":"@typescript-eslint/no-invalid-this","value":"error","description":"禁止在类之外的地方使用 this","reason":"","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\"><mark class=\\"eslint-error\\" data-tip=\\"Unexpected &amp;apos;this&amp;apos;.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-invalid-this)&lt;/span&gt;\\">this</mark></span><span class=\\"token punctuation\\">.</span>a <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo</span> <span class=\\"token punctuation\\">{</span>\\n  a<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span>a <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"no-invalid-this","requiresTypeChecking":false},"@typescript-eslint/no-invalid-void-type":{"name":"@typescript-eslint/no-invalid-void-type","value":"error","description":"禁止使用无意义的 void 类型","reason":"void 只能用在函数的返回值中","badExample":"<span class=\\"token keyword\\">type</span> Foo1 <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\"><mark class=\\"eslint-error\\" data-tip=\\"void is only valid as a return type or generic type variable.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-invalid-void-type)&lt;/span&gt;\\">void</mark></span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">type</span> <span class=\\"token function-variable function\\">Foo2</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-loop-func":{"name":"@typescript-eslint/no-loop-func","value":"off","description":"禁止在循环内的函数内部出现循环体条件语句中定义的变量","reason":"使用 let 就已经解决了这个问题了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"no-loop-func","requiresTypeChecking":false},"@typescript-eslint/no-loss-of-precision":{"name":"@typescript-eslint/no-loss-of-precision","value":"error","description":"禁止使用超出 js 精度范围的数字","reason":"","badExample":"<span class=\\"token keyword\\">const</span> foo1 <span class=\\"token operator\\">=</span> <span class=\\"token number\\"><mark class=\\"eslint-error\\" data-tip=\\"This number literal will lose precision at runtime.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-loss-of-precision)&lt;/span&gt;\\">5123000000000000000000000000001</mark></span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">const</span> foo2 <span class=\\"token operator\\">=</span> <span class=\\"token number\\">12345</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"no-loss-of-precision","requiresTypeChecking":false},"@typescript-eslint/no-magic-numbers":{"name":"@typescript-eslint/no-magic-numbers","value":"off","description":"禁止使用 magic numbers","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"no-magic-numbers","requiresTypeChecking":false},"@typescript-eslint/no-meaningless-void-operator":{"name":"@typescript-eslint/no-meaningless-void-operator","value":"off","description":"禁止 void 抛出空","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-misused-new":{"name":"@typescript-eslint/no-misused-new","value":"off","description":"禁止在接口中定义 constructor，或在类中定义 new","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-misused-promises":{"name":"@typescript-eslint/no-misused-promises","value":"off","description":"避免错误的使用 Promise","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-namespace":{"name":"@typescript-eslint/no-namespace","value":["error",{"allowDeclarations":true,"allowDefinitionFiles":true}],"description":"禁止使用 namespace 来定义命名空间","reason":"使用 es6 引入模块，才是更标准的方式。\\n但是允许使用 declare namespace ... {} 来定义外部命名空间","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"ES2015 module syntax is preferred over custom TypeScript modules and namespaces.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-namespace)&lt;/span&gt;\\"><span class=\\"token keyword\\">namespace</span> foo1 <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">namespace</span> foo1 <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-non-null-asserted-nullish-coalescing":{"name":"@typescript-eslint/no-non-null-asserted-nullish-coalescing","value":"error","description":"禁止非空断言后面跟着双问号","reason":"","badExample":"<span class=\\"token keyword\\">let</span> foo1<span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"The nullish coalescing operator is designed to handle undefined and null - using a non-null assertion is not needed.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-non-null-asserted-nullish-coalescing)&lt;/span&gt;\\">foo1<span class=\\"token punctuation\\">.</span>bar<span class=\\"token operator\\">!</span></mark> <span class=\\"token operator\\">?</span><span class=\\"token operator\\">?</span> <span class=\\"token string\\">\'\'</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">let</span> foo2<span class=\\"token punctuation\\">;</span>\\nfoo2<span class=\\"token punctuation\\">.</span>bar <span class=\\"token operator\\">?</span><span class=\\"token operator\\">?</span> <span class=\\"token string\\">\'\'</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-non-null-asserted-optional-chain":{"name":"@typescript-eslint/no-non-null-asserted-optional-chain","value":"error","description":"禁止在 optional chaining 之后使用 non-null 断言（感叹号）","reason":"optional chaining 后面的属性一定是非空的","badExample":"<span class=\\"token keyword\\">let</span> foo1<span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">{</span> bar<span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">{</span> baz<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token punctuation\\">}</span> <span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">|</span> undefined<span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Optional chain expressions can return undefined by design - using a non-null assertion is unsafe and wrong.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-non-null-asserted-optional-chain)&lt;/span&gt;\\">foo1<span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">.</span>bar<span class=\\"token operator\\">!</span></mark><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">let</span> foo2<span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">{</span> bar<span class=\\"token punctuation\\">:</span> <span class=\\"token punctuation\\">{</span> baz<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span> <span class=\\"token punctuation\\">}</span> <span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">|</span> undefined<span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>foo2<span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">.</span>bar<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-non-null-assertion":{"name":"@typescript-eslint/no-non-null-assertion","value":"off","description":"禁止使用 non-null 断言（感叹号）","reason":"使用 non-null 断言时就已经清楚了风险","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-parameter-properties":{"name":"@typescript-eslint/no-parameter-properties","value":"error","description":"禁止给类的构造函数的参数添加修饰符","reason":"强制所有属性都定义到类里面，比较统一","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo1</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\"><mark class=\\"eslint-error\\" data-tip=\\"Property name cannot be declared in the constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-parameter-properties)&lt;/span&gt;\\"><span class=\\"token keyword\\">private</span> name<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span></mark></span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo2</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">name<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span></span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-redeclare":{"name":"@typescript-eslint/no-redeclare","value":"off","description":"禁止重复定义变量","reason":"禁用 var 之后，编译阶段就会报错了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"no-redeclare","requiresTypeChecking":false},"@typescript-eslint/no-require-imports":{"name":"@typescript-eslint/no-require-imports","value":"error","description":"禁止使用 require\\n原则上禁止动态引用，对于循环依赖，通过 IOC 的方式解决。","reason":"统一使用 import 来引入模块，特殊情况使用单行注释允许 require 引入","badExample":"<span class=\\"token keyword\\">const</span> fs <span class=\\"token operator\\">=</span> <mark class=\\"eslint-error\\" data-tip=\\"A `require()` style import is forbidden.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-require-imports)&lt;/span&gt;\\"><span class=\\"token keyword\\">require</span><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'fs\'</span><span class=\\"token punctuation\\">)</span></mark><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">import</span> <span class=\\"token operator\\">*</span> <span class=\\"token keyword\\">as</span> fs <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'fs\'</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-restricted-imports":{"name":"@typescript-eslint/no-restricted-imports","value":"off","description":"禁止导入指定的模块","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"no-restricted-imports","requiresTypeChecking":false},"@typescript-eslint/no-shadow":{"name":"@typescript-eslint/no-shadow","value":"off","description":"禁止变量名与上层作用域内的已定义的变量重复","reason":"很多时候函数的形参和传参是同名的","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"no-shadow","requiresTypeChecking":false},"@typescript-eslint/no-this-alias":{"name":"@typescript-eslint/no-this-alias","value":["error",{"allowDestructuring":true}],"description":"禁止将 this 赋值给其他变量，除非是解构赋值","reason":"","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">const</span> <mark class=\\"eslint-error\\" data-tip=\\"Unexpected aliasing of &amp;apos;this&amp;apos; to local variable.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-this-alias)&lt;/span&gt;\\">self</mark> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">setTimeout</span><span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">function</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    self<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">doWork</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">const</span> <span class=\\"token punctuation\\">{</span> bar <span class=\\"token punctuation\\">}</span> <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token function\\">setTimeout</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">doWork</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-throw-literal":{"name":"@typescript-eslint/no-throw-literal","value":"off","description":"禁止 throw 字面量，必须 throw 一个 Error 对象","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"no-throw-literal","requiresTypeChecking":true},"@typescript-eslint/no-type-alias":{"name":"@typescript-eslint/no-type-alias","value":"off","description":"禁止使用类型别名","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-unnecessary-boolean-literal-compare":{"name":"@typescript-eslint/no-unnecessary-boolean-literal-compare","value":"off","description":"测试表达式中的布尔类型禁止与 true 或 false 直接比较","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-unnecessary-condition":{"name":"@typescript-eslint/no-unnecessary-condition","value":"off","description":"条件表达式禁止是永远为真（或永远为假）的","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-unnecessary-qualifier":{"name":"@typescript-eslint/no-unnecessary-qualifier","value":"off","description":"在命名空间中，可以直接使用内部变量，不需要添加命名空间前缀","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-unnecessary-type-arguments":{"name":"@typescript-eslint/no-unnecessary-type-arguments","value":"off","description":"禁止范型的类型有默认值时，将范型设置为该默认值","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-unnecessary-type-assertion":{"name":"@typescript-eslint/no-unnecessary-type-assertion","value":"off","description":"禁止无用的类型断言","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-unnecessary-type-constraint":{"name":"@typescript-eslint/no-unnecessary-type-constraint","value":"error","description":"禁止没用的类型限制","reason":"","badExample":"<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">FooAny</span><span class=\\"token operator\\">&lt;</span><mark class=\\"eslint-error\\" data-tip=\\"Constraining the generic type `T` to `any` does nothing and is unnecessary.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-unnecessary-type-constraint)&lt;/span&gt;\\"><span class=\\"token constant\\">T</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">any</span></mark><span class=\\"token operator\\">></span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">FooUnknown</span><span class=\\"token operator\\">&lt;</span><mark class=\\"eslint-error\\" data-tip=\\"Constraining the generic type `T` to `unknown` does nothing and is unnecessary.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-unnecessary-type-constraint)&lt;/span&gt;\\"><span class=\\"token constant\\">T</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">unknown</span></mark><span class=\\"token operator\\">></span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">Foo</span><span class=\\"token operator\\">&lt;</span><span class=\\"token constant\\">T</span><span class=\\"token operator\\">></span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/no-unsafe-argument":{"name":"@typescript-eslint/no-unsafe-argument","value":"off","description":"禁止将 any 类型的变量作为函数参数调用","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-unsafe-assignment":{"name":"@typescript-eslint/no-unsafe-assignment","value":"off","description":"禁止将变量或属性的类型设置为 any","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-unsafe-call":{"name":"@typescript-eslint/no-unsafe-call","value":"off","description":"禁止调用 any 类型的变量上的方法","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-unsafe-member-access":{"name":"@typescript-eslint/no-unsafe-member-access","value":"off","description":"禁止获取 any 类型的变量中的属性","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-unsafe-return":{"name":"@typescript-eslint/no-unsafe-return","value":"off","description":"禁止函数的返回值的类型是 any","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/no-unused-expressions":{"name":"@typescript-eslint/no-unused-expressions","value":["error",{"allowShortCircuit":true,"allowTernary":true,"allowTaggedTemplates":true}],"description":"禁止无用的表达式","reason":"","badExample":"<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">const</span> foo1<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">const</span> bar1<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">const</span> baz1<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">;</span>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-unused-expressions)&lt;/span&gt;\\"><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-unused-expressions)&lt;/span&gt;\\">foo1<span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-unused-expressions)&lt;/span&gt;\\"><span class=\\"token punctuation\\">(</span><span class=\\"token string\\">\'foo1\'</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-unused-expressions)&lt;/span&gt;\\">foo1 <span class=\\"token operator\\">&amp;&amp;</span> bar1<span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-unused-expressions)&lt;/span&gt;\\">foo1 <span class=\\"token operator\\">||</span> bar1<span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-unused-expressions)&lt;/span&gt;\\">foo1 <span class=\\"token operator\\">?</span> bar1 <span class=\\"token punctuation\\">:</span> baz1<span class=\\"token punctuation\\">;</span></mark>\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected an assignment or function call and instead saw an expression.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-unused-expressions)&lt;/span&gt;\\"><span class=\\"token template-string\\"><span class=\\"token string\\">`bar1`</span></span><span class=\\"token punctuation\\">;</span></mark>","goodExample":"<span class=\\"token string\\">\'use strict\'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">const</span> foo2<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">const</span> bar2<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">declare</span> <span class=\\"token keyword\\">const</span> baz2<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">;</span>\\nfoo2 <span class=\\"token operator\\">&amp;&amp;</span> <span class=\\"token function\\">bar2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nfoo2 <span class=\\"token operator\\">||</span> <span class=\\"token function\\">bar2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nfoo2 <span class=\\"token operator\\">?</span> <span class=\\"token function\\">bar2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">:</span> <span class=\\"token function\\">baz2</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\nfoo2<span class=\\"token template-string\\"><span class=\\"token string\\">`bar2`</span></span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"no-unused-expressions","requiresTypeChecking":false},"@typescript-eslint/no-unused-vars":{"name":"@typescript-eslint/no-unused-vars","value":"off","description":"已定义的变量必须使用","reason":"编译阶段检查就足够了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"no-unused-vars","requiresTypeChecking":false},"@typescript-eslint/no-use-before-define":{"name":"@typescript-eslint/no-use-before-define","value":"off","description":"禁止在定义变量之前就使用它","reason":"编译阶段检查就足够了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"no-use-before-define","requiresTypeChecking":false},"@typescript-eslint/no-useless-constructor":{"name":"@typescript-eslint/no-useless-constructor","value":"error","description":"禁止出现没必要的 constructor","reason":"","badExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo1</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Useless constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-useless-constructor)&lt;/span&gt;\\"><span class=\\"token keyword\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></mark>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Bar1</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Foo1</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Useless constructor.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/no-useless-constructor)&lt;/span&gt;\\"><span class=\\"token keyword\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">super</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span></mark>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Foo2</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">class</span> <span class=\\"token class-name\\">Bar2</span> <span class=\\"token keyword\\">extends</span> <span class=\\"token class-name\\">Foo1</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">constructor</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">super</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n    <span class=\\"token keyword\\">this</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token function\\">doSomething</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"no-useless-constructor","requiresTypeChecking":false},"@typescript-eslint/no-var-requires":{"name":"@typescript-eslint/no-var-requires","value":"off","description":"禁止使用 require 来引入模块","reason":"no-require-imports 规则已经约束了 require","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/non-nullable-type-assertion-style":{"name":"@typescript-eslint/non-nullable-type-assertion-style","value":"off","description":"必须使用 ! 而不是 as","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/padding-line-between-statements":{"name":"@typescript-eslint/padding-line-between-statements","value":"off","description":"限制语句之间的空行规则，比如变量定义完之后必须要空行","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"padding-line-between-statements","requiresTypeChecking":false},"@typescript-eslint/prefer-as-const":{"name":"@typescript-eslint/prefer-as-const","value":"off","description":"使用 as const 替代 as \'bar\'","reason":"as const 是新语法，不是很常见","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/prefer-enum-initializers":{"name":"@typescript-eslint/prefer-enum-initializers","value":"off","description":"枚举值必须初始化","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/prefer-for-of":{"name":"@typescript-eslint/prefer-for-of","value":"error","description":"使用 for 循环遍历数组时，如果索引仅用于获取成员，则必须使用 for of 循环替代 for 循环","reason":"for of 循环更加易读","badExample":"<span class=\\"token keyword\\">const</span> arr1 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n\\n<mark class=\\"eslint-error\\" data-tip=\\"Expected a `for-of` loop instead of a `for` loop with this simple iteration.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/prefer-for-of)&lt;/span&gt;\\"><span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">let</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> arr1<span class=\\"token punctuation\\">.</span>length<span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>arr1<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token keyword\\">const</span> arr2 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span><span class=\\"token number\\">1</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">2</span><span class=\\"token punctuation\\">,</span> <span class=\\"token number\\">3</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n\\n<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">const</span> x <span class=\\"token keyword\\">of</span> arr2<span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>x<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">let</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> arr2<span class=\\"token punctuation\\">.</span>length<span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// i is used to write to arr, so for-of could not be used.</span>\\n  arr2<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\n\\n<span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">let</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> arr2<span class=\\"token punctuation\\">.</span>length<span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token comment\\">// i is used independent of arr, so for-of could not be used.</span>\\n  <span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>i<span class=\\"token punctuation\\">,</span> arr2<span class=\\"token punctuation\\">[</span>i<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/prefer-function-type":{"name":"@typescript-eslint/prefer-function-type","value":"off","description":"可以简写为函数类型的接口或字面类型的话，则必须简写","reason":"不要求函数类型接口的简写，因为可读性并不好。","badExample":"<span class=\\"token keyword\\">interface</span> <span class=\\"token class-name\\">Foo1</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">type</span> <span class=\\"token function-variable function\\">Foo2</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span> <span class=\\"token operator\\">=></span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/prefer-includes":{"name":"@typescript-eslint/prefer-includes","value":"off","description":"使用 includes 而不是 indexOf","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/prefer-literal-enum-member":{"name":"@typescript-eslint/prefer-literal-enum-member","value":"off","description":"枚举类型的值必须是字面量，禁止是计算值","reason":"编译阶段检查就足够了","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/prefer-namespace-keyword":{"name":"@typescript-eslint/prefer-namespace-keyword","value":"error","description":"禁止使用 module 来定义命名空间","reason":"module 已成为 js 的关键字","badExample":"<mark class=\\"eslint-error\\" data-tip=\\"Use &amp;apos;namespace&amp;apos; instead of &amp;apos;module&amp;apos; to declare custom TypeScript modules.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/prefer-namespace-keyword)&lt;/span&gt;\\"><span class=\\"token keyword\\">module</span> Foo1 <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span></mark>","goodExample":"<span class=\\"token keyword\\">namespace</span> Foo2 <span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span>","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/prefer-nullish-coalescing":{"name":"@typescript-eslint/prefer-nullish-coalescing","value":"off","description":"使用 ?? 替代 ||","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/prefer-optional-chain":{"name":"@typescript-eslint/prefer-optional-chain","value":"error","description":"使用 optional chaining 替代 &&","reason":"","badExample":"<span class=\\"token keyword\\">let</span> foo1<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><mark class=\\"eslint-error\\" data-tip=\\"Prefer using an optional chain expression instead, as it&amp;apos;s more concise and easier to read.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/prefer-optional-chain)&lt;/span&gt;\\">foo1 <span class=\\"token operator\\">&amp;&amp;</span> foo1<span class=\\"token punctuation\\">.</span>a <span class=\\"token operator\\">&amp;&amp;</span> foo1<span class=\\"token punctuation\\">.</span>a<span class=\\"token punctuation\\">.</span>b <span class=\\"token operator\\">&amp;&amp;</span> foo1<span class=\\"token punctuation\\">.</span>a<span class=\\"token punctuation\\">.</span>b<span class=\\"token punctuation\\">.</span>c</mark><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">let</span> foo2<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token builtin\\">console</span><span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span>foo2<span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">.</span>a<span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">.</span>b<span class=\\"token operator\\">?</span><span class=\\"token punctuation\\">.</span>c<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/prefer-readonly":{"name":"@typescript-eslint/prefer-readonly","value":"off","description":"私有变量如果没有在构造函数外被赋值，则必须设为 readonly","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/prefer-readonly-parameter-types":{"name":"@typescript-eslint/prefer-readonly-parameter-types","value":"off","description":"函数的参数必须设置为 readonly","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/prefer-reduce-type-parameter":{"name":"@typescript-eslint/prefer-reduce-type-parameter","value":"off","description":"使用 reduce 方法时，必须传入范型，而不是对第二个参数使用 as","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/prefer-regexp-exec":{"name":"@typescript-eslint/prefer-regexp-exec","value":"off","description":"使用 RegExp#exec 而不是 String#match","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/prefer-return-this-type":{"name":"@typescript-eslint/prefer-return-this-type","value":"off","description":"类的方法返回值是 this 时，类型必须设置为 this","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/prefer-string-starts-ends-with":{"name":"@typescript-eslint/prefer-string-starts-ends-with","value":"off","description":"使用 String#startsWith 而不是其他方式","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/prefer-ts-expect-error":{"name":"@typescript-eslint/prefer-ts-expect-error","value":"off","description":"当需要忽略下一行的 ts 错误时，必须使用 @ts-expect-error 而不是 @ts-ignore","reason":"使用 @ts-expect-error 可以避免对不会报错的代码设置了 @ts-ignore","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/promise-function-async":{"name":"@typescript-eslint/promise-function-async","value":"off","description":"async 函数的返回值必须是 Promise","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/require-array-sort-compare":{"name":"@typescript-eslint/require-array-sort-compare","value":"off","description":"使用 sort 时必须传入比较函数","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/require-await":{"name":"@typescript-eslint/require-await","value":"off","description":"async 函数中必须存在 await 语句","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"require-await","requiresTypeChecking":true},"@typescript-eslint/restrict-plus-operands":{"name":"@typescript-eslint/restrict-plus-operands","value":"off","description":"使用加号时，两者必须同为数字或同为字符串","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/restrict-template-expressions":{"name":"@typescript-eslint/restrict-template-expressions","value":"off","description":"模版字符串中的变量类型必须是字符串","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/return-await":{"name":"@typescript-eslint/return-await","value":"off","description":"禁止在 return 语句里使用 await","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"no-return-await","requiresTypeChecking":true},"@typescript-eslint/sort-type-union-intersection-members":{"name":"@typescript-eslint/sort-type-union-intersection-members","value":"off","description":"联合类型和交叉类型的每一项必须按字母排序","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/strict-boolean-expressions":{"name":"@typescript-eslint/strict-boolean-expressions","value":"off","description":"条件判断必须传入布尔值","reason":"","badExample":"","goodExample":"","fixable":true,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/switch-exhaustiveness-check":{"name":"@typescript-eslint/switch-exhaustiveness-check","value":"off","description":"使用联合类型作为 switch 的对象时，必须包含每一个类型的 case","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/triple-slash-reference":{"name":"@typescript-eslint/triple-slash-reference","value":["error",{"path":"never","types":"always","lib":"always"}],"description":"禁止使用三斜杠导入文件","reason":"三斜杠是已废弃的语法，但在类型声明文件中还是可以使用的","badExample":"<span class=\\"token comment\\"><mark class=\\"eslint-error\\" data-tip=\\"Do not use a triple slash reference for ./Animal, use `import` style instead.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/triple-slash-reference)&lt;/span&gt;\\">/// &lt;reference path=\\"./Animal\\"></mark></span>","goodExample":"<span class=\\"token keyword\\">import</span> Animal <span class=\\"token keyword\\">from</span> <span class=\\"token string\\">\'./Animal\'</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/typedef":{"name":"@typescript-eslint/typedef","value":["error",{"arrayDestructuring":false,"arrowParameter":false,"memberVariableDeclaration":false,"objectDestructuring":false,"parameter":false,"propertyDeclaration":true,"variableDeclaration":false}],"description":"interface 和 type 定义时必须声明成员的类型","reason":"","badExample":"<span class=\\"token keyword\\">type</span> Foo1 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Expected bar to have a type annotation.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/typedef)&lt;/span&gt;\\">bar<span class=\\"token punctuation\\">;</span></mark>\\n  <mark class=\\"eslint-error\\" data-tip=\\"Expected baz to have a type annotation.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/typedef)&lt;/span&gt;\\">baz<span class=\\"token punctuation\\">;</span></mark>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","goodExample":"<span class=\\"token keyword\\">type</span> Foo2 <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n  bar<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">boolean</span><span class=\\"token punctuation\\">;</span>\\n  baz<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">;</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false},"@typescript-eslint/unbound-method":{"name":"@typescript-eslint/unbound-method","value":"off","description":"方法调用时需要绑定到正确的 this 上","reason":"","badExample":"","goodExample":"","fixable":false,"extendsBaseRule":"","requiresTypeChecking":true},"@typescript-eslint/unified-signatures":{"name":"@typescript-eslint/unified-signatures","value":"error","description":"函数重载时，若能通过联合类型将两个函数的类型声明合为一个，则使用联合类型而不是两个函数声明","reason":"","badExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo1</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">x<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo1</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\"><mark class=\\"eslint-error\\" data-tip=\\"These overloads can be combined into one signature taking `number | string`.&lt;br/&gt;&lt;span class=\'eslint-error-rule-id\'&gt;eslint(@typescript-eslint/unified-signatures)&lt;/span&gt;\\">x<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">string</span></mark></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo1</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">x<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> x<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","goodExample":"<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo2</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">x<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">number</span> <span class=\\"token operator\\">|</span> <span class=\\"token builtin\\">string</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token keyword\\">void</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">foo2</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">x<span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span></span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">:</span> <span class=\\"token builtin\\">any</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">return</span> x<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>","fixable":false,"extendsBaseRule":"","requiresTypeChecking":false}}');

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"eslint-config-nstarter","version":"2.0.1","description":"nstarter ESLint 规则","main":"index.js","scripts":{"start":"npm run dev","dev":"run-p dev:*","dev:eslintrc":"nodemon","dev:copyfiles":"npm run build:copyfiles && chokidar \\"site/public/**/*\\" -c \\"npm run build:copyfiles\\"","dev:webpack-dev-server":"webpack serve --open","build":"run-s build:*","build:eslintrc":"ts-node scripts/build.ts","build:clean":"rimraf ./dist","build:copyfiles":"copyfiles -u 2 \\"site/public/**/*\\" dist/public","build:site":"webpack","test":"npm run lint && ts-node ./test/index.ts","lint":"run-s eslint prettier","eslint":"eslint --ext .js,.jsx,.ts,.tsx,.vue --ignore-pattern \\"bad.*\\" .","prettier":"prettier -l \\"./**/*\\"","prettier:fix":"prettier --write -l \\"./**/*\\"","prepare":"husky install","update":"npm install --save-dev @babel/eslint-parser@latest eslint-plugin-import@latest @types/cookie@latest @types/doctrine@latest @types/eslint@latest @types/node@latest @types/prettier@latest @types/react@latest @types/react-dom@latest @types/rimraf@latest @types/xml-escape@latest @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest chokidar-cli@latest cookie@latest copyfiles@latest doctrine@latest eslint@7 eslint-config-prettier@latest eslint-plugin-react@latest eslint-plugin-vue@latest html-webpack-plugin@latest husky@latest insert-tag@latest mobi-plugin-color@latest mobi.css@latest nodemon@latest npm-run-all@latest prettier@latest react@latest react-dom@latest react-tooltip@latest rimraf@latest ts-loader@latest ts-node@latest typescript@latest vue-eslint-parser@latest webpack@latest webpack-cli@latest webpack-dev-server@latest xml-escape@latest ","rulesCoverage":"ts-node ./scripts/rulesCoverage.ts"},"repository":{"type":"git","url":"git+https://github.com/jiandaoyun/nstarter-eslint-config.git"},"keywords":["eslint","eslintrc","eslintconfig","config","alloy","alloyteam","javascript","styleguide","typescript"],"license":"MIT","bugs":{"url":"https://github.com/jiandaoyun/nstarter-eslint-config/issues"},"homepage":"https://jiandaoyun.github.io/nstarter-eslint-config/","publishConfig":{"access":"public"},"devDependencies":{"@babel/core":"^7.15.5","@babel/eslint-parser":"^7.15.8","@babel/preset-react":"^7.14.5","@types/cookie":"^0.4.1","@types/doctrine":"^0.0.5","@types/eslint":"^7.28.1","@types/node":"^16.10.4","@types/prettier":"^2.4.1","@types/react":"^17.0.29","@types/react-dom":"^17.0.9","@types/rimraf":"^3.0.2","@types/xml-escape":"^1.1.0","@typescript-eslint/eslint-plugin":"^5.0.0","@typescript-eslint/parser":"^5.0.0","chokidar-cli":"^3.0.0","cookie":"^0.4.1","copyfiles":"^2.4.1","doctrine":"^3.0.0","eslint":"^7.32.0","eslint-config-prettier":"^8.3.0","eslint-plugin-import":"^2.25.3","html-webpack-plugin":"^5.3.2","husky":"^7.0.2","insert-tag":"^0.1.2","mobi-plugin-color":"^1.0.0","mobi.css":"^3.1.1","nodemon":"^2.0.13","npm-run-all":"^4.1.5","prettier":"^2.4.1","react":"^17.0.2","react-dom":"^17.0.2","react-tooltip":"^4.2.21","rimraf":"^3.0.2","ts-loader":"^9.2.6","ts-node":"^10.3.0","typescript":"^4.4.4","webpack":"^5.58.1","webpack-cli":"^4.9.0","webpack-dev-server":"^4.3.1","xml-escape":"^1.1.0"}}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./site/index.tsx");
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map