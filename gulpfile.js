'use strict'

// Global
const gulp = require('gulp'); 
const rename = require('gulp-rename');

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
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

gulp.task('javascript', function() {
    return gulp.src('./src/js/*.js')
		.pipe(babel({presets: ['es2015']}))
        .pipe(concat('snackbarlight.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename('snackbarlight.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('javascript-lint', function() {
    return gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('javascript-watch', function() {
    gulp.watch('js/*.js', ['javascript-lint', 'javascript']);
});

