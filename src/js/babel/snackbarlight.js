/**
 * Timer
 */
class Timer {
	constructor(callback, remaining){
		// Create random timer id
		this.timerId = Math.round(Math.random()*1000);
		
		this.callback = callback;
		this.remaining = remaining;

        this.resume();
	}

	/**
	 * Pause timer
	 *
	 * @return {Void}
	 */
    pause() {
        // Clear the timeout
        window.clearTimeout(this.timerId);
        // Set the remaining to what time remains
        this.remaining -= new Date() - this.start;
    }

    /**
     * Resume timer
     *
     * @return {Void}
     */
    resume() {
        this.start = new Date();
        // Clear the timeout
        window.clearTimeout(this.timerId);
        // Set the timeout again
        this.timerId = window.setTimeout(this.callback, this.remaining);
    }
}

/**
 * Snackbar
 */
class Snackbar {
	constructor(data, options, callback){
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
	ensureContainerExists(){
		// If the Snackbar container does not exist create it
		if (!document.getElementById("snackbar-container")) {
			let snackbarContainer = document.createElement("div");
			
			snackbarContainer.setAttribute("id", "snackbar-container");
			
			document.body.appendChild(snackbarContainer);
		}
	}

	/**
	 * Create a Snackbar
	 *
	 * @return {Void}
	 */
	createElement() {
		this.snackbar = document.createElement("div");
		
		// Put the snackbar inside the snackbar container
		document.getElementById("snackbar-container").appendChild(this.snackbar);

	  	// Set the html inside the snackbar
	  	this.snackbar.innerHTML = this.messageToHtml();
		
		// Set the class of the snackbar
		this.snackbar.setAttribute("class", "snackbar");

		// Wait to set the active class so animations will be activated
		setTimeout(() => {
			this.snackbar.setAttribute("class","snackbar " + this.options.activeClass);
		}, 50);

		// If the timeout is false the snackbar will not be destroyed after some time
		// only when the user clicks on it
		if (this.options.timeout !== "false") {
			// Start the timer
			this.timer = new Timer(() => {
				this.snackbar.setAttribute("class", "snackbar");
				this.destroy();
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
	messageToHtml() {
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
	addListeners() {
		// Adding event listener for when user clicks on the snackbar to remove it
		this.snackbar.addEventListener("click", () => {
			if (typeof this_.callback == "function") {
				this.callback();
			}
			element.setAttribute("class", "snackbar");
	    	this.destroy();
		});

		if (this.options.timeout !== "false") {
			// Stopping the timer when user hovers on the snackbar
			this.snackbar.addEventListener("mouseenter", () => {
				this.timer.pause();
			});
			this.snackbar.addEventListener("mouseout", () => {
				this.timer.resume();
			});
		}
	}

	/**
	 * Remove element after 10 seconds
	 *
	 * @param  {Object} element
	 * @return {Void}
	 */
	destroy(element) {
		if (this.timer instanceof Timer) {
			this.timer.pause();	
		}
		// Delay for removing the element (for when there are animations)
		setTimeout(() => {
			this.snackbar.remove();
		}, 10000);
	}

	/**
	 * [activateOptions description]
	 *
	 * @param  {Object} newOptions
	 * @return {Object}           
	 */
	activateOptions(newOptions) {
		let options = newOptions || {},
  			defaultOptions = {
				// How long it takes for the snackbar to disappear
				timeout: 5000,
				// Wich class is used to tell that the snackbar is active
				activeClass: "snackbar-active",
				// Name of the link or action if specified
				link: false,
				// If not used clicking will activate the callback or do nothing
				url: "#",
			};

    	for (var opt in defaultOptions) {
        	if (defaultOptions.hasOwnProperty(opt) && !options.hasOwnProperty(opt)) {
            	options[opt] = defaultOptions[opt];
        	}
        }
       	return options;
	}
}

/**
 * Main snackbar class
 */
class SnackbarLight {
	constructor(){
		if (typeof exports == "object") {
			// Export
		    module.exports = this;
		} else if (typeof define == "function" && define.amd) {
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
	install(Vue){
		Vue.prototype.$snackbar = {};
	  	Vue.prototype.$snackbar.create = (data, options, callback) => {
	  		this.create(data, options, callback);
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
	create(data, options, callback){
		new Snackbar(data, options, callback);
	}

	/**
	 * Get all elements
	 *
	 * @return {Array}
	 */
	findElements(){
		return document.querySelectorAll("[data-toggle=snackbar]");
	}

	/**
	 * Loop all elements and fire addlistener on each
	 *
	 * @return {Void}
	 */
	addListeners(){
		let elements = this.findElements();
		for (var i = elements.length - 1; i >= 0; i--) {
			this.addListener(elements[i]);
		}
	}

	/**
	 * Add listener to element and fire create when it is clicked upon
	 *
	 * @param {Object} element
	 */
	addListener(element){
		element.addEventListener("click", () => {
			this.create(this.getAttribute("data-content"), this.getOptions(this));
		});
	}

	/**
	 * Get the options from the attributes attached to the element
	 *
	 * @param  {Object} element
	 * @return {Object}
	 */
	getOptions(element){
		let options = {};

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

}

const snackbarLight = new SnackbarLight();
