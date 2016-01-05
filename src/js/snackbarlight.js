/**
 * Constructor
 *
 * @param {[type]}   data     [description]
 * @param {[type]}   options  [description]
 * @param {Function} callback [description]
 */
function Snackbar(data, options, callback){
	if (data !== "") {
		this.options = this.activateOptions(options);
		this.data = data;
		this.callback = callback;
		this.start();
		this.snackbar();
	} else {
		console.warn("SnackbarLight: You can not create a empty snackbar please give it a string.");
	}
}

Snackbar.prototype = {

	/**
	 * Default options
	 *
	 * @type {Object}
	 */
	options: {
		// How long it takes for the snackbar to disappear
		timeout: 5000,
		// Wich class is used to tell that the snackbar is active
		activeClass: "active",
		// Name of the link or action if specified
		link: false,
		// If not used clicking will activate the callback or do nothing
		url: "#",
	},

	/**
	 * Create container for the snackbar
	 *
	 * @return {void}
	 */
	start: function() {
		if (!document.getElementById("snackbar-container")) {
			var snackbarContainer = document.createElement("div");
			
			snackbarContainer.setAttribute("id", "snackbar-container");
			
			document.body.appendChild(snackbarContainer);
		}
	},

	/**
	 * Timer
	 *
	 * @param  {Function} callback
	 * @param  {int}   delay
	 * @return {void}
	 */
	timer: function(callback, delay) {
	    var remaining = delay;

	    this.timer = {
	    	// Create random timer id
	    	timerId: Math.round(Math.random()*1000),

		    pause: function() {
		        // Clear the timeout
		        window.clearTimeout(this.timerId);
		        // Set the remaining to what time remains
		        remaining -= new Date() - start;
		    },

		    resume: function() {
		        start = new Date();
		        // Clear the timeout
		        window.clearTimeout(this.timerId);
		        // Set the timeout again
		        this.timerId = window.setTimeout(callback, remaining);
		    },	
	    };
	    // Start the timer
	    this.timer.resume();
	},

	/**
	 * snackbar
	 *
	 * @return {void}
	 */
	snackbar: function() {
		var __self = this,
			snackbar = document.createElement("div");
		
		// Put the snackbar inside the snackbar container
		document.getElementById("snackbar-container").appendChild(snackbar);

	  	// Set the html inside the snackbar
	  	snackbar.innerHTML = this.getData();
		
		// Set the class of the snackbar
		snackbar.setAttribute("class", "snackbar");

		// Wait to set the active class so animations will be activated
		setTimeout(function() {
			snackbar.setAttribute("class","snackbar " + __self.options.activeClass);
		}, 50);

		// If the timeout is false the snackbar will not be destroyed after some time
		// only when the user clicks on it
		if (this.options.timeout !== false) {
			// Start the timer
			this.timer(function() {
				snackbar.setAttribute("class", "snackbar");
				__self.destroy(snackbar);
			}, this.options.timeout);
		}

		// Add the event listeners
		this.listeners(snackbar);
	},

	/**
	 * Get the data/ message to display in the snackbar
	 *
	 * @return {string}
	 */
	getData: function() {
		if (this.options.link !== false) {
			return "<span>" + this.data + "</span><a href='" + this.options.url + "'>" + this.options.link + "</a>";
		}
		return "<span>" + this.data + "</span>";
	},

	/**
	 * Activate the listeners
	 *
	 * @param  {Object} element
	 * @return {void}
	 */
	listeners: function(element) {
		var __self = this;
		// Adding event listener for when user clicks on the snackbar to remove it
		element.addEventListener("click", function(){
			if (typeof __self.callback == "function") {
				__self.callback();
			}
			element.setAttribute("class", "snackbar");
	    	__self.destroy(element);
		});

		// Stopping the timer when user hovers on the snackbar
		element.addEventListener("mouseenter",function(){
			__self.timer.pause();
		});
		element.addEventListener("mouseout",function(){
			__self.timer.resume();
		});
	},

	/**
	 * Remove the snackbar
	 *
	 * @param  {object} element
	 * @return {void}
	 */
	destroy: function(element) {
		// Delay for removing the element (for when there are animations)
		this.timer.pause();
		setTimeout(function() {
			element.remove();
		}, 10000);
	},

	/**
	 * Compare the options to the default ones.
	 *
	 * @param  {Object} newOptions
	 * @return {Object}
	 */
	activateOptions: function(newOptions) {
		var __self = this,
  			options = newOptions || {};

    	for (var opt in this.options) {
        	if (__self.options.hasOwnProperty(opt) && !options.hasOwnProperty(opt)) {
            	options[opt] = __self.options[opt];
        	}
        }
       	return options;
	},
};

///////////////////////////////
// Vuejs/ browserify support //
///////////////////////////////
SnackbarLight = {
	/**
	 * Install function for Vue
	 *
	 * @param  {Object} Vue
	 * @return {void}
	 */
	install: function(Vue){
		var __self = this;
		Vue.prototype.$snackbar = {};
	  	Vue.prototype.$snackbar.create = function(data, options, callback){
	  		__self.create(data, options, callback);
	  	};
	},

	/**
	 * Create a new snackbar
	 *
	 * @param  {string}   data
	 * @param  {Object}   options
	 * @param  {Function} callback
	 * @return {void}
	 */
	create: function(data, options, callback){
		new Snackbar(data, options, callback);
	}
};

if (typeof exports == "object") {
	// Export
    module.exports = SnackbarLight;
} else if (typeof define == "function" && define.amd) {
	define([], function(){ return SnackbarLight });
} else if (window.Vue) {
	// Vue use if vue is being used on the page
	Vue.use(SnackbarLight);
}

/////////////////
// Data-toggle //
/////////////////

// Search all elements for the data toggle the snackbar
var elements = document.querySelectorAll("[data-toggle=snackbar]");

// Loop them and add event listeners to them
for (var i = elements.length - 1; i >= 0; i--) {
	elements[i].addEventListener("click", function(){
		var options = {};

		if (this.getAttribute("data-link") !== null) {
			options.link = this.getAttribute("data-link");
		}
		if (this.getAttribute("data-timeout") !== null) {
			options.timeout = this.getAttribute("data-timeout");
		}
		if (this.getAttribute("data-activeClass") !== null) {
			options.activeClass = this.getAttribute("data-active-class");
		}
		if (this.getAttribute("data-url")) {
			options.url = this.getAttribute("data-url");
		}
			
		new Snackbar(this.getAttribute("data-content"), options);
	});
}
