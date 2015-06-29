var args        = require('yargs').argv;
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var browserify  = require('browserify');
var babelify    = require("babelify");
var browserSync = require('browser-sync');
var source      = require('vinyl-source-stream');
var $           = require('gulp-load-plugins')({
  rename: {
    'gulp-ruby-sass': 'sass',
    'gulp-minify-css': 'minifyCss'
  }});


var config = {
  sassPath: './src/sass/',
  bowerDir: './bower_components',
  dest: './www'
};

function handleErrors() {

  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  $.notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


gulp.task('bower', function() {
  return $.bower().pipe(gulp.dest(config.bowerDir));
});

gulp.task('icons', function() {
  return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
             .pipe(gulp.dest('./www/fonts'));
});

gulp.task('css', function() {
  return $.sass(config.sassPath + '/app.scss',{
    style: 'compressed',
    loadPath: [
      config.sassPath,
      config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
      config.bowerDir + '/fontawesome/scss',
    ]}).on("error", handleErrors
    ).pipe(gulp.dest('./www/'));
});

gulp.task('js', function(){
  return browserify({
    entries: 'src/js/main.jsx',
    extensions: ['.jsx'],
    debug: true
  }).transform(babelify
  ).bundle(
  ).pipe(source('app.js')
  ).on('error', handleErrors
  ).pipe($.if(args.production, $.streamify($.uglify()))
  ).pipe(gulp.dest('./www'));
});

gulp.task('images', function() {
  return gulp.src('./src/img/**')
    .pipe(gulp.dest('./www/img'));
});

gulp.task('html', function() {
  return gulp.src('./src/index.html')
             .pipe(gulp.dest('./www'));
});


gulp.task('build', ['html', 'bower', 'icons', 'css', 'js']);


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
        baseDir: config.dest
      }
    });
    gulp.watch('./src/js/**', ['js'])
    gulp.watch('./src/img/**', ['images']);
    gulp.watch('./src/sass/**', ['css']);
    gulp.watch('./src/index.html', ['html']);
    gulp.watch(config.dest + '/**/*.*', function(file) {
      browserSync.reload();
    });
    cb();
  });
});

gulp.task('default', ['serve']);
