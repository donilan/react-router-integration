var os = require('os');
var gulp             = require('gulp');
var open             = require('gulp-open');
var webpackConfig    = require('./webpack.config');
var webpack          = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var gutil            = require('gulp-util');

var URL = "http://localhost:3000/webpack-dev-server/index.html";

gulp.task('images', function() {
  return gulp.src('./src/img/**')
    .pipe(gulp.dest('./www/img'));
});

gulp.task('html', function() {
  return gulp.src('./src/index.html')
             .pipe(gulp.dest('./www'));
});

gulp.task('browser', function(){
  gulp.src('./src/index.html').pipe(open({uri: URL}));
});

gulp.task('build', ['html', 'images', 'webpack:build']);

gulp.task("webpack:build", function(callback) {

  webpack(require('./webpack.production.config'), function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack:dev:server", ['html', 'images', 'browser'], function(callback) {

  var compiler = webpack(webpackConfig);
  new WebpackDevServer(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    contentBase: './www',
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  }).listen(3000, "localhost", function(err) {
    if(err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", URL);
    callback();
  });
});

gulp.task('default', ["webpack:dev:server"]);
