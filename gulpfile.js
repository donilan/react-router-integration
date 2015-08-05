var args        = require('yargs').argv;
var gulp        = require('gulp');
var runSequence = require('run-sequence');
var webpackConfig = require('./webpack.config');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var $           = require('gulp-load-plugins')({
  rename: {
    'gulp-ruby-sass': 'sass',
    'gulp-minify-css': 'minifyCss',
    'gulp-jest-iojs': 'jest'
  }});


var config = {
  sassPath: './src/sass/',
  bowerDir: './bower_components',
  dest: './www',
  jsEntries: './src/js/main.js'
};
config['fontsPath'] = config.bowerDir + '/fontawesome/fonts/**.*';
config['stylePaths'] = [
  config.sassPath,
  config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
  config.bowerDir + '/fontawesome/scss',
];


function handleErrors(arg1) {

  var args = Array.prototype.slice.call(arguments);
  // Send error to notification center with gulp-notify
  $.notify.onError({
    title: "Compile Error",
    message: "<%= error.message %>"
  }).apply(this, args);
  console.log(arg1.codeFrame);
  // Keep gulp from hanging on this task
  this.emit('end');
};


gulp.task('bower', function() {
  return $.bower().pipe(gulp.dest(config.bowerDir));
});

gulp.task('icons', function() {
  return gulp.src(config.fontsPath)
             .pipe(gulp.dest('./www/fonts'));
});

gulp.task('css', function() {
  return $.sass(config.sassPath + '/app.scss',{
    style: 'compressed',
    loadPath: config.stylePaths}).on("error", handleErrors
    ).pipe(gulp.dest('./www/'));
});

gulp.task('images', function() {
  return gulp.src('./src/img/**')
    .pipe(gulp.dest('./www/img'));
});

gulp.task('html', function() {
  return gulp.src('./src/index.html')
             .pipe(gulp.dest('./www'));
});


gulp.task('build', ['html', 'bower', 'icons', 'css', 'webpack:build']);

gulp.task("webpack:build", function(callback) {

  webpack(require('./webpack.production.config'), function(err, stats) {
    if(err) throw new $.util.PluginError("webpack:build", err);
    $.util.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack:dev:server", ['html', 'bower', 'icons', 'css'], function(callback) {

  var compiler = webpack(webpackConfig);

  new WebpackDevServer(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: './www',
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }

  }).listen(3000, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    $.util.log("[webpack-dev-server]", "http://localhost:3000/webpack-dev-server/index.html");

    gulp.watch('./src/sass/**', ['css']);

    callback();
  });
});

gulp.task('default', ["webpack:dev:server"]);
