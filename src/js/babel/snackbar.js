
import Timer from './timer.js';

export class Snackbar {
	constructor(data, options, callback){
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
	start(){
		if (!document.getElementById("snackbar-container")) {
			let snackbarContainer = document.createElement("div");
			
			snackbarContainer.setAttribute("id", "snackbar-container");
			
			document.body.appendChild(snackbarContainer);
		}
	}
	timer(callback, delay) {
	    let remaining = delay;

	    // Make timer
	    this.timer = new Timer(callback, delay);
	}
	snackbar() {
		let this_ = this,
			snackbar = document.createElement("div");
		
		// Put the snackbar inside the snackbar container
		document.getElementById("snackbar-container").appendChild(snackbar);

	  	// Set the html inside the snackbar
	  	snackbar.innerHTML = this.messageToHtml();
		
		// Set the class of the snackbar
		snackbar.setAttribute("class", "snackbar");

		// Wait to set the active class so animations will be activated
		setTimeout(function() {
			snackbar.setAttribute("class","snackbar " + this_.options.activeClass);
		}, 50);

		// If the timeout is false the snackbar will not be destroyed after some time
		// only when the user clicks on it
		if (this.options.timeout !== false) {
			// Start the timer
			this.timer(function() {
				snackbar.setAttribute("class", "snackbar");
				this_.destroy(snackbar);
			}, this.options.timeout);
		}

		// Add the event listeners
		this.addListeners(snackbar);
	}
	messageToHtml() {
		if (this.options.link !== false) {
			return "<span>" + this.data + "</span><a href='" + this.options.url + "'>" + this.options.link + "</a>";
		}
		return "<span>" + this.data + "</span>";
	}
	addListeners(element) {
		let this_ = this;
		// Adding event listener for when user clicks on the snackbar to remove it
		element.addEventListener("click", function(){
			if (typeof this_.callback == "function") {
				this_.callback();
			}
			element.setAttribute("class", "snackbar");
	    	this_.destroy(element);
		});

		// Stopping the timer when user hovers on the snackbar
		element.addEventListener("mouseenter",function(){
			this_.timer.pause();
		});
		element.addEventListener("mouseout",function(){
			this_.timer.resume();
		});
	}
	destroy(element) {
		this.timer.pause();
		// Delay for removing the element (for when there are animations)
		setTimeout(function() {
			element.remove();
		}, 10000);
	}
}