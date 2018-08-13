/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(2);

	__webpack_require__(3);

	__webpack_require__(4);

	__webpack_require__(7);

	__webpack_require__(9);

	__webpack_require__(10);

	__webpack_require__(11);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.animate = animate;
	exports.mAnimate = mAnimate;
	/**
	 * @func animate
	 * @desc animate an element with easing
	 * @param {object} el - html element to animate
	 * @param {function} deltaFn - function to apply delta of animation
	 * @param {number} ms - total duration of animation
	 * @param {object} easing - easing function
	 * @param {function} [cb] - optional callback
	 * @returns {object} stop method
	 */
	function animate(el, deltaFn, ms, easing, cb) {
	  // initial vars
	  var start = Date.now();
	  var keepRunning = true;

	  // convenience fn
	  var apply = function apply(p) {
	    return deltaFn(el, p);
	  };

	  // main loop
	  function loop() {
	    if (keepRunning) {
	      // percent elapsed time
	      var pet = (Date.now() - start) / ms;
	      return pet >= 1 ? done() : cont(pet);
	    }
	  }

	  // loop again
	  function cont(p) {
	    requestAnimationFrame(loop);
	    apply(easing.get(p));
	  }

	  // finish animation
	  function done() {
	    apply(1);
	    if (cb) return cb();
	  }

	  // start loop
	  requestAnimationFrame(loop);

	  // export stop method
	  return { stop: function stop() {
	      return keepRunning = false;
	    } };
	}

	/**
	 * @func mAnimate
	 * @desc simultaneously animate multiple elements with easing
	 * @param {array} els - array of html elements
	 * @param {function} deltaFn - function to apply delta of animation
	 * @param {number} ms - total duration of animation
	 * @param {object} easing - easing function
	 * @param {function} [cb] - optional callback
	 * @returns {object} stop method
	 */
	function mAnimate(els, deltaFn, ms, easing, cb) {
	  var count = els.length;
	  var cbs = 0;
	  function metaCb() {
	    cbs += 1;
	    if (cbs === count && cb) return cb();
	  }
	  var anims = els.map(function (el) {
	    return animate(el, deltaFn, ms, easing, metaCb);
	  });
	  return { stop: function stop() {
	      return anims.map(function (anim) {
	        return anim.stop();
	      });
	    } };
	}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function stateClass(el, state) {
	  var name = el.className.split(/\s/)[0];
	  return name + "--" + state;
	}

	var toggle = function toggle(el, state) {
	  return el.classList.toggle(stateClass(el, state));
	};

	function add(el, state) {
	  var sc = stateClass(el, state);
	  if (el.className.indexOf(sc) === -1) {
	    el.classList.toggle(sc);
	  }
	}

	function del(el, state) {
	  var sc = stateClass(el, state);
	  if (el.className.indexOf(sc) > -1) {
	    el.classList.toggle(sc);
	  }
	}

	exports.default = { toggle: toggle, add: add, del: del };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	function add(el, style) {
	  var meta = function meta(_) {
	    return Object.keys(style).map(function (key) {
	      return _.style[key] = style[key];
	    });
	  };
	  el.length ? el.map(meta) : meta(el);
	}

	function del(el, style) {
	  typeof style === 'string' ? el.style.removeProperty(style) : style.map(function (_) {
	    return el.style.removeProperty(_);
	  });
	  if (el.style.length === 0) el.removeAttribute('style');
	}

	exports.default = { add: add, del: del };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getElement = __webpack_require__(5);

	var _getElement2 = _interopRequireDefault(_getElement);

	var _domready = __webpack_require__(6);

	var _domready2 = _interopRequireDefault(_domready);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function fixHeight() {
	  var body = _getElement2.default.withTag('body')[0];
	  var hasBanner = body.classList.contains('has-banner');

	  // hack to target mobile
	  var mobile = typeof window.orientation !== 'undefined';

	  if (mobile && hasBanner) {
	    var html = _getElement2.default.withTag('html')[0];
	    var banner = _getElement2.default.withClass('banner')[0];
	    var height = window.innerHeight;
	    var els = [html, body, banner];
	    els.map(function (element) {
	      element.style.height = height + 'px';
	    });
	    var arrow = _getElement2.default.withClass('scroll-down')[0];
	    var arrowHeight = getComputedStyle(arrow)['height'].replace('px', '');
	    var top = height - parseInt(arrowHeight);
	    arrow.style.top = top + 'px';
	    arrow.style.animation = 'bounce-top 1.5s infinite';
	  }
	}

	exports.default = (0, _domready2.default)(fixHeight);

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	/**
	 * @func withClass
	 * @desc get elements by .class
	 * @param {string} className - name of class to match
	 * @param {object} [fromEl=document] - element to start search from
	 * @returns {array<object>} array of elements
	 */
	function withClass(className, fromEl) {
	  fromEl = fromEl || document
	  return Array.prototype.slice.call(fromEl.getElementsByClassName(className))
	}

	/**
	 * @func withTag
	 * @desc get elements by <tag>
	 * @param {string} tagName - name of tag to match
	 * @param {object} [fromEl=document] - element to start search from
	 * @returns {array<object>} array of elements
	 */
	function withTag(tagName, fromEl) {
	  fromEl = fromEl || document
	  return Array.prototype.slice.call(fromEl.getElementsByTagName(tagName))
	}

	module.exports = {
	  withClass: withClass,
	  withTag: withTag
	}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
	!function (name, definition) {

	  if (true) module.exports = definition()
	  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
	  else this[name] = definition()

	}('domready', function () {

	  var fns = [], listener
	    , doc = document
	    , hack = doc.documentElement.doScroll
	    , domContentLoaded = 'DOMContentLoaded'
	    , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(doc.readyState)


	  if (!loaded)
	  doc.addEventListener(domContentLoaded, listener = function () {
	    doc.removeEventListener(domContentLoaded, listener)
	    loaded = 1
	    while (listener = fns.shift()) listener()
	  })

	  return function (fn) {
	    loaded ? setTimeout(fn, 0) : fns.push(fn)
	  }

	});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getElement = __webpack_require__(5);

	var _getElement2 = _interopRequireDefault(_getElement);

	var _domready = __webpack_require__(6);

	var _domready2 = _interopRequireDefault(_domready);

	var _bezierEasing = __webpack_require__(8);

	var _bezierEasing2 = _interopRequireDefault(_bezierEasing);

	var _elementClass = __webpack_require__(2);

	var _elementClass2 = _interopRequireDefault(_elementClass);

	var _elementStyle = __webpack_require__(3);

	var _elementStyle2 = _interopRequireDefault(_elementStyle);

	var _animate = __webpack_require__(1);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//----------------------------------------------------------
	// logic
	//----------------------------------------------------------
	//----------------------------------------------------------
	// modules
	//----------------------------------------------------------
	// npm
	function menuEvents() {
	  // state vars
	  //----------------------------------------------------------
	  var directionToggle = true;
	  var shouldPreOpen = true;
	  var opacity = 0;
	  var anim = void 0,
	      windowW = void 0,
	      bodyW = void 0,
	      scrollW = void 0;

	  // relevant elements
	  //----------------------------------------------------------
	  var menuButton = _getElement2.default.withClass('menu-toggle')[0];
	  var menu = _getElement2.default.withClass('menu')[0];
	  var body = _getElement2.default.withTag('body')[0];
	  var scrollDown = _getElement2.default.withClass('scroll-down')[0];
	  var banner = _getElement2.default.withClass('banner')[0];

	  // animation deltaFns and helpers
	  //----------------------------------------------------------
	  var fadeIn = function fadeIn(el, p) {
	    return el.style.opacity = opacity + p * (1 - opacity);
	  };
	  var fadeOut = function fadeOut(el, p) {
	    return el.style.opacity = (1 - p) * opacity;
	  };
	  var animateMenu = function animateMenu(fn, cb) {
	    return (0, _animate.animate)(menu, fn, 322, _bezierEasing2.default.easeIn, cb);
	  };

	  // scrollbar fns
	  //----------------------------------------------------------
	  function addMissingScrollbarStyles() {
	    _elementStyle2.default.add(body, { paddingRight: scrollW + 'px' });
	    if (banner) {
	      _elementStyle2.default.add(banner, { width: windowW + 'px',
	        paddingRight: scrollW + 'px'
	      });
	    }
	  }

	  function delMissingScrollbarStyles() {
	    _elementStyle2.default.del(body, 'padding-right');
	    if (banner) _elementStyle2.default.del(banner, ['width', 'padding-right']);
	  }

	  // BEM modifier class fns
	  //----------------------------------------------------------
	  function addModClasses() {
	    _elementClass2.default.add(menu, 'visible');
	    _elementClass2.default.add(body, 'no-scroll');
	  }

	  function delModClasses() {
	    _elementClass2.default.del(menu, 'visible');
	    _elementClass2.default.del(body, 'no-scroll');
	  }

	  // hacky test for mobile (feelsbadman)
	  //----------------------------------------------------------
	  var mobile = typeof window.orientation !== 'undefined';

	  // modular listener fn for click
	  //----------------------------------------------------------
	  function preOpen() {
	    addModClasses();
	    if (!mobile) addMissingScrollbarStyles();
	    shouldPreOpen = false;
	  }

	  function postClose() {
	    delModClasses();
	    if (!mobile) delMissingScrollbarStyles();
	    shouldPreOpen = true;
	  }

	  function open() {
	    if (shouldPreOpen) preOpen();
	    anim = animateMenu(fadeIn);
	  }

	  function close() {
	    anim = animateMenu(fadeOut, postClose);
	  }

	  function toggleMenu(e) {
	    // don't follow href
	    e.preventDefault();

	    // if not at top scroll to top
	    if (window.pageYOffset !== 0) window.scroll(0, 0);

	    // stop running animation
	    if (anim) anim.stop();

	    // store current menu opacity
	    opacity = parseFloat(menu.style.opacity);

	    // toggles
	    directionToggle = !directionToggle;
	    _elementClass2.default.toggle(menuButton, 'toggled');

	    // open or close menu
	    return directionToggle ? close() : open();
	  }

	  menuButton.addEventListener('click', toggleMenu);

	  // initialize
	  //----------------------------------------------------------
	  function getWidths() {
	    windowW = window.innerWidth;
	    bodyW = body.offsetWidth;
	    scrollW = windowW - bodyW;
	  }

	  function lockPositions() {
	    if (scrollDown) scrollDown.style.left = Math.round(bodyW / 2) + 'px';
	  }

	  function reset() {
	    if (anim) anim.stop();
	    delModClasses();
	    delMissingScrollbarStyles();

	    // reset and bind opacity
	    opacity = 0;
	    menu.style.opacity = opacity;

	    // reset toggles
	    directionToggle = true;
	    shouldPreOpen = true;
	    _elementClass2.default.del(menuButton, 'toggled');
	  }

	  function init() {
	    reset();
	    getWidths();
	    lockPositions();
	  }

	  init();
	  window.addEventListener('resize', init);
	}

	//----------------------------------------------------------
	// export
	//----------------------------------------------------------


	// local
	exports.default = (0, _domready2.default)(menuEvents);

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	/**
	 * BezierEasing - use bezier curve for transition easing function
	 * by Gaëtan Renaudeau 2014 - 2015 – MIT License
	 *
	 * Credits: is based on Firefox's nsSMILKeySpline.cpp
	 * Usage:
	 * var spline = BezierEasing([ 0.25, 0.1, 0.25, 1.0 ])
	 * spline.get(x) => returns the easing value | x must be in [0, 1] range
	 *
	 */

	// These values are established by empiricism with tests (tradeoff: performance VS precision)
	var NEWTON_ITERATIONS = 4;
	var NEWTON_MIN_SLOPE = 0.001;
	var SUBDIVISION_PRECISION = 0.0000001;
	var SUBDIVISION_MAX_ITERATIONS = 10;

	var kSplineTableSize = 11;
	var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

	var float32ArraySupported = typeof Float32Array === "function";

	function A (aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1; }
	function B (aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1; }
	function C (aA1)      { return 3.0 * aA1; }

	// Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
	function calcBezier (aT, aA1, aA2) {
	  return ((A(aA1, aA2)*aT + B(aA1, aA2))*aT + C(aA1))*aT;
	}

	// Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
	function getSlope (aT, aA1, aA2) {
	  return 3.0 * A(aA1, aA2)*aT*aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
	}

	function binarySubdivide (aX, aA, aB, mX1, mX2) {
	  var currentX, currentT, i = 0;
	  do {
	    currentT = aA + (aB - aA) / 2.0;
	    currentX = calcBezier(currentT, mX1, mX2) - aX;
	    if (currentX > 0.0) {
	      aB = currentT;
	    } else {
	      aA = currentT;
	    }
	  } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);
	  return currentT;
	}

	function newtonRaphsonIterate (aX, aGuessT, mX1, mX2) {
	  for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
	    var currentSlope = getSlope(aGuessT, mX1, mX2);
	    if (currentSlope === 0.0) return aGuessT;
	    var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
	    aGuessT -= currentX / currentSlope;
	  }
	  return aGuessT;
	}

	/**
	 * points is an array of [ mX1, mY1, mX2, mY2 ]
	 */
	function BezierEasing (points, b, c, d) {
	  if (arguments.length === 4) {
	    return new BezierEasing([ points, b, c, d ]);
	  }
	  if (!(this instanceof BezierEasing)) return new BezierEasing(points);

	  if (!points || points.length !== 4) {
	    throw new Error("BezierEasing: points must contains 4 values");
	  }
	  for (var i=0; i<4; ++i) {
	    if (typeof points[i] !== "number" || isNaN(points[i]) || !isFinite(points[i])) {
	      throw new Error("BezierEasing: points should be integers.");
	    }
	  }
	  if (points[0] < 0 || points[0] > 1 || points[2] < 0 || points[2] > 1) {
	    throw new Error("BezierEasing x values must be in [0, 1] range.");
	  }

	  this._str = "BezierEasing("+points+")";
	  this._css = "cubic-bezier("+points+")";
	  this._p = points;
	  this._mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);
	  this._precomputed = false;

	  this.get = this.get.bind(this);
	}

	BezierEasing.prototype = {

	  get: function (x) {
	    var mX1 = this._p[0],
	      mY1 = this._p[1],
	      mX2 = this._p[2],
	      mY2 = this._p[3];
	    if (!this._precomputed) this._precompute();
	    if (mX1 === mY1 && mX2 === mY2) return x; // linear
	    // Because JavaScript number are imprecise, we should guarantee the extremes are right.
	    if (x === 0) return 0;
	    if (x === 1) return 1;
	    return calcBezier(this._getTForX(x), mY1, mY2);
	  },

	  getPoints: function() {
	    return this._p;
	  },

	  toString: function () {
	    return this._str;
	  },

	  toCSS: function () {
	    return this._css;
	  },

	  // Private part

	  _precompute: function () {
	    var mX1 = this._p[0],
	      mY1 = this._p[1],
	      mX2 = this._p[2],
	      mY2 = this._p[3];
	    this._precomputed = true;
	    if (mX1 !== mY1 || mX2 !== mY2)
	      this._calcSampleValues();
	  },

	  _calcSampleValues: function () {
	    var mX1 = this._p[0],
	      mX2 = this._p[2];
	    for (var i = 0; i < kSplineTableSize; ++i) {
	      this._mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
	    }
	  },

	  /**
	   * getTForX chose the fastest heuristic to determine the percentage value precisely from a given X projection.
	   */
	  _getTForX: function (aX) {
	    var mX1 = this._p[0],
	      mX2 = this._p[2],
	      mSampleValues = this._mSampleValues;

	    var intervalStart = 0.0;
	    var currentSample = 1;
	    var lastSample = kSplineTableSize - 1;

	    for (; currentSample !== lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
	      intervalStart += kSampleStepSize;
	    }
	    --currentSample;

	    // Interpolate to provide an initial guess for t
	    var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample+1] - mSampleValues[currentSample]);
	    var guessForT = intervalStart + dist * kSampleStepSize;

	    var initialSlope = getSlope(guessForT, mX1, mX2);
	    if (initialSlope >= NEWTON_MIN_SLOPE) {
	      return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
	    } else if (initialSlope === 0.0) {
	      return guessForT;
	    } else {
	      return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
	    }
	  }
	};

	// CSS mapping
	BezierEasing.css = {
	  "ease":        BezierEasing.ease      = BezierEasing(0.25, 0.1, 0.25, 1.0),
	  "linear":      BezierEasing.linear    = BezierEasing(0.00, 0.0, 1.00, 1.0),
	  "ease-in":     BezierEasing.easeIn    = BezierEasing(0.42, 0.0, 1.00, 1.0),
	  "ease-out":    BezierEasing.easeOut   = BezierEasing(0.00, 0.0, 0.58, 1.0),
	  "ease-in-out": BezierEasing.easeInOut = BezierEasing(0.42, 0.0, 0.58, 1.0)
	};

	module.exports = BezierEasing;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getElement = __webpack_require__(5);

	var _getElement2 = _interopRequireDefault(_getElement);

	var _domready = __webpack_require__(6);

	var _domready2 = _interopRequireDefault(_domready);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function preventDrag() {
	  var body = _getElement2.default.withTag('body')[0];
	  body.addEventListener('dragstart', function (e) {
	    return e.preventDefault();
	  });
	}

	exports.default = (0, _domready2.default)(preventDrag);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _domready = __webpack_require__(6);

	var _domready2 = _interopRequireDefault(_domready);

	var _getElement = __webpack_require__(5);

	var _getElement2 = _interopRequireDefault(_getElement);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	//----------------------------------------------------------
	// logic
	//----------------------------------------------------------
	//----------------------------------------------------------
	// modules
	//----------------------------------------------------------
	// npm
	var msToText = [[94608000001, 'over three years ago'], [94608000000, 'three years ago'], [63072000000, 'two years ago'], [31536000000, 'a year ago'], [28512000000, 'eleven months ago'], [25920000000, 'ten months ago'], [23328000000, 'nine months ago'], [20736000000, 'eight months ago'], [18144000000, 'seven months ago'], [15552000000, 'six months ago'], [12960000000, 'five months ago'], [10368000000, 'four months ago'], [7776000000, 'three months ago'], [5184000000, 'two months ago'], [2592000000, 'a month ago'], [1814400000, 'three weeks ago'], [1209600000, 'two weeks ago'], [604800000, 'a week ago'], [172800000, 'a few days ago'], [86400000, 'a day ago'], [7200000, 'a few hours ago'], [3600000, 'an hour ago'], [300000, 'a few minutes ago'], [0, 'just now']];

	// transform fns
	//----------------------------------------------------------
	var parse = function parse(el) {
	  return Date.parse(el.getAttribute('datetime'));
	};
	var diff = function diff(time, now) {
	  return now - time;
	};
	function humanize(ms) {
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = msToText[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var pair = _step.value;

	      if (ms > pair[0]) return pair[1];
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }
	}

	// main loop
	//----------------------------------------------------------
	function replaceTime() {
	  var timeEls = _getElement2.default.withClass('replace-time');
	  if (timeEls.length) {
	    var now = Date.now();
	    timeEls.map(function (el) {
	      return [el, el];
	    }).map(function (el) {
	      return [el[0], parse(el[1])];
	    }).map(function (el) {
	      return [el[0], diff(el[1], now)];
	    }).map(function (el) {
	      return [el[0], humanize(el[1])];
	    }).map(function (el) {
	      return el[0].innerHTML = el[1];
	    });
	  }
	}

	exports.default = (0, _domready2.default)(replaceTime);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _smoothScroll = __webpack_require__(12);

	var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _smoothScroll2.default.init({ selector: '[data-scroll]'
	  // , selectorHeader:
	  , speed: 500,
	  easing: 'easeInOutCubic',
	  updateURL: false,
	  offset: 0,
	  callback: function callback(el) {
	    return el.blur();
	  } // remove :focus from element
	});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/*! smooth-scroll v14.2.1 | (c) 2018 Chris Ferdinandi | MIT License | http://github.com/cferdinandi/smooth-scroll */
	window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t,n=(this.document||this.ownerDocument).querySelectorAll(e),o=this;do{for(t=n.length;--t>=0&&n.item(t)!==o;);}while(t<0&&(o=o.parentElement));return o}),(function(){function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}if("function"==typeof window.CustomEvent)return!1;e.prototype=window.Event.prototype,window.CustomEvent=e})(),(function(){for(var e=0,t=["ms","moz","webkit","o"],n=0;n<t.length&&!window.requestAnimationFrame;++n)window.requestAnimationFrame=window[t[n]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[t[n]+"CancelAnimationFrame"]||window[t[n]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(t,n){var o=(new Date).getTime(),i=Math.max(0,16-(o-e)),r=window.setTimeout((function(){t(o+i)}),i);return e=o+i,r}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(e){clearTimeout(e)})})(),(function(e,t){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function(){return t(e)}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof exports?module.exports=t(e):e.SmoothScroll=t(e)})("undefined"!=typeof global?global:"undefined"!=typeof window?window:this,(function(e){"use strict";var t={ignore:"[data-scroll-ignore]",header:null,topOnEmptyHash:!0,speed:500,clip:!0,offset:0,easing:"easeInOutCubic",customEasing:null,updateURL:!0,popstate:!0,emitEvents:!0},n=function(){return"querySelector"in document&&"addEventListener"in e&&"requestAnimationFrame"in e&&"closest"in e.Element.prototype},o=function(){for(var e={},t=0;t<arguments.length;t++)!(function(t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(arguments[t]);return e},i=function(t){return!!("matchMedia"in e&&e.matchMedia("(prefers-reduced-motion)").matches)},r=function(t){return parseInt(e.getComputedStyle(t).height,10)},a=function(e){var t;try{t=decodeURIComponent(e)}catch(n){t=e}return t},u=function(e){"#"===e.charAt(0)&&(e=e.substr(1));for(var t,n=String(e),o=n.length,i=-1,r="",a=n.charCodeAt(0);++i<o;){if(0===(t=n.charCodeAt(i)))throw new InvalidCharacterError("Invalid character: the input contains U+0000.");t>=1&&t<=31||127==t||0===i&&t>=48&&t<=57||1===i&&t>=48&&t<=57&&45===a?r+="\\"+t.toString(16)+" ":r+=t>=128||45===t||95===t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122?n.charAt(i):"\\"+n.charAt(i)}var u;try{u=decodeURIComponent("#"+r)}catch(e){u="#"+r}return u},c=function(e,t){var n;return"easeInQuad"===e.easing&&(n=t*t),"easeOutQuad"===e.easing&&(n=t*(2-t)),"easeInOutQuad"===e.easing&&(n=t<.5?2*t*t:(4-2*t)*t-1),"easeInCubic"===e.easing&&(n=t*t*t),"easeOutCubic"===e.easing&&(n=--t*t*t+1),"easeInOutCubic"===e.easing&&(n=t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1),"easeInQuart"===e.easing&&(n=t*t*t*t),"easeOutQuart"===e.easing&&(n=1- --t*t*t*t),"easeInOutQuart"===e.easing&&(n=t<.5?8*t*t*t*t:1-8*--t*t*t*t),"easeInQuint"===e.easing&&(n=t*t*t*t*t),"easeOutQuint"===e.easing&&(n=1+--t*t*t*t*t),"easeInOutQuint"===e.easing&&(n=t<.5?16*t*t*t*t*t:1+16*--t*t*t*t*t),e.customEasing&&(n=e.customEasing(t)),n||t},s=function(){return Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.body.clientHeight,document.documentElement.clientHeight)},l=function(t,n,o,i){var r=0;if(t.offsetParent)do{r+=t.offsetTop,t=t.offsetParent}while(t);return r=Math.max(r-n-o,0),i&&(r=Math.min(r,s()-e.innerHeight)),r},m=function(e){return e?r(e)+e.offsetTop:0},d=function(e,t,n){t||history.pushState&&n.updateURL&&history.pushState({smoothScroll:JSON.stringify(n),anchor:e.id},document.title,e===document.documentElement?"#top":"#"+e.id)},f=function(t,n,o){0===t&&document.body.focus(),o||(t.focus(),document.activeElement!==t&&(t.setAttribute("tabindex","-1"),t.focus(),t.style.outline="none"),e.scrollTo(0,n))},h=function(t,n,o,i){if(n.emitEvents&&"function"==typeof e.CustomEvent){var r=new CustomEvent(t,{bubbles:!0,detail:{anchor:o,toggle:i}});document.dispatchEvent(r)}};return function(r,p){var g,v,w,y,E,b,S,A={};A.cancelScroll=function(e){cancelAnimationFrame(S),S=null,e||h("scrollCancel",g)},A.animateScroll=function(n,i,r){var a=o(g||t,r||{}),u="[object Number]"===Object.prototype.toString.call(n),p=u||!n.tagName?null:n;if(u||p){var v=e.pageYOffset;a.header&&!y&&(y=document.querySelector(a.header)),E||(E=m(y));var w,b,C,O=u?n:l(p,E,parseInt("function"==typeof a.offset?a.offset(n,i):a.offset,10),a.clip),I=O-v,q=s(),F=0,L=function(t,o){var r=e.pageYOffset;if(t==o||r==o||(v<o&&e.innerHeight+r)>=q)return A.cancelScroll(!0),f(n,o,u),h("scrollStop",a,n,i),w=null,S=null,!0},H=function(t){w||(w=t),F+=t-w,b=F/parseInt(a.speed,10),b=b>1?1:b,C=v+I*c(a,b),e.scrollTo(0,Math.floor(C)),L(C,O)||(S=e.requestAnimationFrame(H),w=t)};0===e.pageYOffset&&e.scrollTo(0,0),d(n,u,a),h("scrollStart",a,n,i),A.cancelScroll(!0),e.requestAnimationFrame(H)}};var C=function(t){if(!i()&&0===t.button&&!t.metaKey&&!t.ctrlKey&&"closest"in t.target&&(w=t.target.closest(r))&&"a"===w.tagName.toLowerCase()&&!t.target.closest(g.ignore)&&w.hostname===e.location.hostname&&w.pathname===e.location.pathname&&/#/.test(w.href)){var n=u(a(w.hash)),o=g.topOnEmptyHash&&"#"===n?document.documentElement:document.querySelector(n);o=o||"#top"!==n?o:document.documentElement,o&&(t.preventDefault(),A.animateScroll(o,w))}},O=function(e){if(null!==history.state&&history.state.smoothScroll&&history.state.smoothScroll===JSON.stringify(g)&&history.state.anchor){var t=document.querySelector(u(a(history.state.anchor)));t&&A.animateScroll(t,null,{updateURL:!1})}},I=function(e){b||(b=setTimeout((function(){b=null,E=m(y)}),66))};return A.destroy=function(){g&&(document.removeEventListener("click",C,!1),e.removeEventListener("resize",I,!1),e.removeEventListener("popstate",O,!1),A.cancelScroll(),g=null,v=null,w=null,y=null,E=null,b=null,S=null)},A.init=function(i){if(!n())throw"Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";A.destroy(),g=o(t,i||{}),y=g.header?document.querySelector(g.header):null,E=m(y),document.addEventListener("click",C,!1),y&&e.addEventListener("resize",I,!1),g.updateURL&&g.popstate&&e.addEventListener("popstate",O,!1)},A.init(p),A}}));
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ })
/******/ ]);