
import Snackbar from './snackbar.js';
import Timer from './timer.js';


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
