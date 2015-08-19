var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/main'
  ],
  debug: false,
  devtool: false,
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'app.js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    reasons: false
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      },
      "__DEV__": false
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel']
    }, {
      test: /\.scss/,
      loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|woff|woff2|eot|ttf|svg).*$/,
      loader: 'url-loader?limit=8192'
    }]
  }
};
