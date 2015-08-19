var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'sourcemap',
  cache: true,
  debug: true,
  entry: [
    'webpack/hot/only-dev-server',
    './src/js/main'
  ],
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'app.js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    reasons: true
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("development")
      },
      "__DEV__": true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel-loader'
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
