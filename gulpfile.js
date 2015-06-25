var gulp       = require('gulp');
var sass = require('gulp-sass');
var flatten = require('gulp-flatten');
var runSequence = require('run-sequence');
var notify     = require("gulp-notify");
var rename     = require('gulp-rename');
var browserify = require('gulp-browserify');
var babelify   = require("babelify");
var gutil      = require('gulp-util');
var browserSync = require('browser-sync');

var DEST = './www';

function handleErrors() {

	var args = Array.prototype.slice.call(arguments);

	// Send error to notification center with gulp-notify
	notify.onError({
		title: "Compile Error",
		message: "<%= error.message %>"
	}).apply(this, args);

	// Keep gulp from hanging on this task
	this.emit('end');
};


gulp.task('js', function(){
  return gulp.src(
    'src/js/main.jsx', { read: false }
  ).pipe(browserify({
    transform: ['babelify'],
    extensions: ['.jsx']})
  ).pipe(rename('app.js')
  ).pipe(gulp.dest('./www'));;
});

gulp.task('images', function() {
	return gulp.src('./src/img/**')
		.pipe(gulp.dest('./www/img'));
});

gulp.task('fonts', function() {
  return gulp.src('node_modules/ratchet/dist/fonts/*.*')
    .pipe(flatten())
    .pipe(gulp.dest('./www/fonts'));
});

gulp.task('styles', ['fonts'], function () {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass()).on('error', handleErrors)
    .pipe(gulp.dest('./www'));
});

gulp.task('html', function() {
	return gulp.src('./src/index.html')
		         .pipe(gulp.dest('./www'));
});


gulp.task('build', ['html', 'styles', 'js', 'fonts']);


gulp.task('serve', function(cb) {
  var url = require('url');
  var fs = require('fs');
  watch = true;

  runSequence('build', function() {
    browserSync({
      notify: false,
      // Customize the BrowserSync console logging prefix
      logPrefix: 'RSK',
      server: {
        baseDir: DEST
      }
    });
    gulp.watch('./src/js/**', ['js'])
    gulp.watch('./src/img/**', ['images']);
	  gulp.watch('./src/sass/**', ['styles']);
	  gulp.watch('./src/index.html', ['html']);
    gulp.watch(DEST + '/**/*.*', function(file) {
      browserSync.reload(path.relative(__dirname, file.path));
    });
    cb();
  });
});

gulp.task('default', ['serve']);
