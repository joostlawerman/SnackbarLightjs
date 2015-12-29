var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var minifyCss = require('gulp-minify-css');

gulp.task('lint', function() {
    return gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('minify-css', function() {
  return gulp.src('./src/css/*.css')
    .pipe(concat('snackbarlight.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(rename('snackbarlight.min.css'))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
        .pipe(concat('snackbarlight.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(rename('snackbarlight.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
});

gulp.task('default', ['minify-css','lint','scripts','watch']);