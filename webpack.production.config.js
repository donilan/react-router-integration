var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './src/js/main'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'app.js',
    publicPath: '/'
  },
  plugins: [
        new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel']
    }]
  }
};
