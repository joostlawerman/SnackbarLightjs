'use strict'

// Global
const gulp = require('gulp');
const rename = require('gulp-rename');

var exec = require('child_process').exec;

gulp.task('default', ['css-minify', 'javascript-lint', 'javascript', 'javascript-watch']);

// Css
const jshint = require('gulp-jshint');
const minifyCss = require('gulp-minify-css');

gulp.task('css-minify', function() {
  return gulp.src('./src/css/*.css')
    .pipe(concat('snackbarlight.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(rename('snackbarlight.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/'));
});

// Javascript ES6
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('javascript', function(cb) {
  var command = 'webpack    ./src/js/snackbarlight.js ./dist/snackbarlight.js &&' +
                'webpack -p ./src/js/snackbarlight.js ./dist/snackbarlight.min.js';

  exec(command, function (err, stdout, stderr) {
      console.log(stdout);
      console.log(stderr);
      cb(err);
  });
});

gulp.task('javascript-lint', function() {
    return gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('javascript-watch', function() {
    gulp.watch('js/*.js', ['javascript-lint', 'javascript']);
});
