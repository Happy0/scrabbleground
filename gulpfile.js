var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream')

var standalone = "Scrabbleground"
var browserify = require('browserify');

var onError = function(error) {
  gutil.log(gutil.colors.red(error.message));
};


gulp.task('prod', function() {
  return browserify('./src/main.js', {
      standalone: standalone
    }).bundle()
    .on('error', onError)
    .pipe(source('scrabbleground.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest(destination));
});

