# SnackbarLightjs
Easy snackbars without JQuery (and its only 3kb minified!)
Customize your snackbars or use the basic css file

## Usage
Create snackbars with javascript

	new Snackbar("Hey! Im a snackbar");
	// Snackbar(message, options, callback)

or even easier write it right in your html

	<span data-toggle=snackbar data-content="Hey! Im a snackbar">Click me</span>

## Options
	
	options: {
		// How long it takes for the snackbar to disappear
		timeout: 5000,
		// Wich class is used to tell that the snackbar is active
		activeClass: "active",
		// Name of the link or action if specified
		link: false,
		// If not specified clicking on the link will activate the callback if specified
		url: "#",
	}

You can also specify these in your html

	<span 
		data-toggle=snackbar 
		data-content="Hey! Im a snackbar"
		data-timeout=3000
		data-link="https://www.somePlaceFarAway.likeRealyFar/"
		data-active-class="active">
	Click me</span>

## Callbacks
You can attach a callback function for when the snackbar is clicked upon.

	new Snackbar("Hey! Im a snackbar",{},function(){
		alert("Why did you have to close me!");
		});

## Browserify
[npm](https://www.npmjs.com/package/snackbarlightjs)
	
	var Snackbar = require("snackbarlightjs");

	Snackbar.create("I can be used here also awesome!", {}, function(){});

## Vuejs
This package does support usage in [Vuejs](http://vuejs.org/)
[npm](https://www.npmjs.com/package/snackbarlightjs)

Basic usage:

	this.$snackbar.create("Vuejs is awsome!", {}, function(){});
	
### With Browserify
If you use Browserify to compile your vue you need to call Vue.use() on it

	var Snackbar = require("snackbarlightjs");

	Vue.use(Snackbar);

## LICENSE
MIT