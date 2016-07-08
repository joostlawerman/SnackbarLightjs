"use strict"

const webpack = require('webpack');

module.exports = {
	entry: './src/js/babel/snackbarlight.js',
	output: {
		path: './dist',
		filename: 'snackbarlight.min.js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		},
		{
			test: /\.sass$/, 
			loaders: ['style', 'css', 'sass']
		}
		]
	},
	plugins: [
     	new webpack.optimize.UglifyJsPlugin({
	    	compress: {
            		warnings: false,
	            },
	            output: {
           			comments: false,
        	},
		}),
	]
};
