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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _snackbar = __webpack_require__(1);

	var _snackbar2 = _interopRequireDefault(_snackbar);

	var _timer = __webpack_require__(2);

	var _timer2 = _interopRequireDefault(_timer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Main snackbar class
	 */
	var SnackbarLight = function () {
		function SnackbarLight() {
			_classCallCheck(this, SnackbarLight);

			if (( false ? 'undefined' : _typeof(exports)) == "object") {
				// Export
				module.exports = this;
			} else if (true) {
				//	define([], () => { return this });
			} else if (window.Vue) {
				// Vue use if vue is being used on the page
				Vue.use(this);
			}
			this.addListeners();
		}

		/**
	  * Install function for Vue
	  *
	  * @param  {Object} Vue
	  * @return {Void}
	  */


		_createClass(SnackbarLight, [{
			key: 'install',
			value: function install(Vue) {
				var _this = this;

				Vue.prototype.$snackbar = {};
				Vue.prototype.$snackbar.create = function (data, options, callback) {
					_this.create(data, options, callback);
				};
			}

			/**
	   * Create a new snackbar
	   *
	   * @param  {string}   data
	   * @param  {Object}   options
	   * @param  {Function} callback
	   * @return {Void}
	   */

		}, {
			key: 'create',
			value: function create(data, options, callback) {
				new _snackbar2.default(data, options, callback);
			}

			/**
	   * Get all elements
	   *
	   * @return {Array}
	   */

		}, {
			key: 'findElements',
			value: function findElements() {
				return document.querySelectorAll("[data-toggle=snackbar]");
			}

			/**
	   * Loop all elements and fire addlistener on each
	   *
	   * @return {Void}
	   */

		}, {
			key: 'addListeners',
			value: function addListeners() {
				var elements = this.findElements();
				for (var i = elements.length - 1; i >= 0; i--) {
					this.addListener(elements[i]);
				}
			}

			/**
	   * Add listener to element and fire create when it is clicked upon
	   *
	   * @param {Object} element
	   */

		}, {
			key: 'addListener',
			value: function addListener(element) {
				var _this2 = this;

				element.addEventListener("click", function () {
					_this2.create(_this2.getAttribute("data-content"), _this2.getOptions(_this2));
				});
			}

			/**
	   * Get the options from the attributes attached to the element
	   *
	   * @param  {Object} element
	   * @return {Object}
	   */

		}, {
			key: 'getOptions',
			value: function getOptions(element) {
				var options = {};

				if (element.getAttribute("data-link") !== null) {
					options.link = element.getAttribute("data-link");
				}
				if (element.getAttribute("data-timeout") !== null) {
					options.timeout = element.getAttribute("data-timeout");
				}
				if (element.getAttribute("data-activeClass") !== null) {
					options.activeClass = element.getAttribute("data-active-class");
				}
				if (element.getAttribute("data-url") !== null) {
					options.url = element.getAttribute("data-url");
				}
				return options;
			}
		}]);

		return SnackbarLight;
	}();

	var snackbarLight = new SnackbarLight();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Snackbar
	 */
	var Snackbar = function () {
		function Snackbar(data, options, callback) {
			_classCallCheck(this, Snackbar);

			if (data !== "") {
				this.options = this.activateOptions(options);
				this.data = data;
				this.callback = callback;

				this.ensureContainerExists();
				this.createElement();
			} else {
				console.warn("SnackbarLight: You can not create a empty snackbar please give it a string.");
			}
		}

		/**
	  * Start function inserting the basic components
	  *
	  * @return {Void}
	  */


		_createClass(Snackbar, [{
			key: "ensureContainerExists",
			value: function ensureContainerExists() {
				// If the Snackbar container does not exist create it
				if (!document.getElementById("snackbar-container")) {
					var snackbarContainer = document.createElement("div");

					snackbarContainer.setAttribute("id", "snackbar-container");

					document.body.appendChild(snackbarContainer);
				}
			}

			/**
	   * Create a Snackbar
	   *
	   * @return {Void}
	   */

		}, {
			key: "createElement",
			value: function createElement() {
				var _this = this;

				this.snackbar = document.createElement("div");

				// Put the snackbar inside the snackbar container
				document.getElementById("snackbar-container").appendChild(this.snackbar);

				// Set the html inside the snackbar
				this.snackbar.innerHTML = this.messageToHtml();

				// Set the class of the snackbar
				this.snackbar.setAttribute("class", "snackbar");

				// Wait to set the active class so animations will be activated
				setTimeout(function () {
					_this.snackbar.setAttribute("class", "snackbar " + _this.options.activeClass);
				}, 50);

				// If the timeout is false the snackbar will not be destroyed after some time
				// only when the user clicks on it
				if (this.options.timeout !== "false") {
					// Start the timer
					this.timer = new Timer(function () {
						_this.snackbar.setAttribute("class", "snackbar");
						_this.destroy();
					}, this.options.timeout + 50);
				}

				// Add the event listeners
				this.addListeners();
			}

			/**
	   * Makes a html string of the message
	   *
	   * @return {String}
	   */

		}, {
			key: "messageToHtml",
			value: function messageToHtml() {
				if (this.options.link !== false) {
					return "<span>" + this.data + "</span><a href='" + this.options.url + "'>" + this.options.link + "</a>";
				}
				return "<span>" + this.data + "</span>";
			}

			/**
	   * Add listeners for mouse enter and leave
	   *
	   * @param  {Object} element
	   * @return {Void}
	   */

		}, {
			key: "addListeners",
			value: function addListeners() {
				var _this2 = this;

				// Adding event listener for when user clicks on the snackbar to remove it
				this.snackbar.addEventListener("click", function () {
					if (typeof this_.callback == "function") {
						_this2.callback();
					}
					element.setAttribute("class", "snackbar");
					_this2.destroy();
				});

				if (this.options.timeout !== "false") {
					// Stopping the timer when user hovers on the snackbar
					this.snackbar.addEventListener("mouseenter", function () {
						_this2.timer.pause();
					});
					this.snackbar.addEventListener("mouseout", function () {
						_this2.timer.resume();
					});
				}
			}

			/**
	   * Remove element after 10 seconds
	   *
	   * @param  {Object} element
	   * @return {Void}
	   */

		}, {
			key: "destroy",
			value: function destroy(element) {
				var _this3 = this;

				if (this.timer instanceof Timer) {
					this.timer.pause();
				}
				// Delay for removing the element (for when there are animations)
				setTimeout(function () {
					_this3.snackbar.remove();
				}, 10000);
			}

			/**
	   * [activateOptions description]
	   *
	   * @param  {Object} newOptions
	   * @return {Object}           
	   */

		}, {
			key: "activateOptions",
			value: function activateOptions(newOptions) {
				var options = newOptions || {},
				    defaultOptions = {
					// How long it takes for the snackbar to disappear
					timeout: 5000,
					// Wich class is used to tell that the snackbar is active
					activeClass: "snackbar-active",
					// Name of the link or action if specified
					link: false,
					// If not used clicking will activate the callback or do nothing
					url: "#"
				};

				for (var opt in defaultOptions) {
					if (defaultOptions.hasOwnProperty(opt) && !options.hasOwnProperty(opt)) {
						options[opt] = defaultOptions[opt];
					}
				}
				return options;
			}
		}]);

		return Snackbar;
	}();

	module.exports = Snackbar;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Timer = function () {
	    function Timer(callback, remaining) {
	        _classCallCheck(this, Timer);

	        // Create random timer id
	        this.timerId = Math.round(Math.random() * 1000);

	        this.callback = callback;
	        this.remaining = remaining;

	        this.resume();
	    }

	    _createClass(Timer, [{
	        key: "pause",
	        value: function pause() {
	            // Clear the timeout
	            window.clearTimeout(this.timerId);
	            // Set the remaining to what time remains
	            this.remaining -= new Date() - this.start;
	        }
	    }, {
	        key: "resume",
	        value: function resume() {
	            this.start = new Date();
	            // Clear the timeout
	            window.clearTimeout(this.timerId);
	            // Set the timeout again
	            this.timerId = window.setTimeout(callback, this.remaining);
	        }
	    }]);

	    return Timer;
	}();

	module.exports = Timer;

/***/ }
/******/ ]);