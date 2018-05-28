/* global require */
// Webpack config for production

var webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


var config = {
  environment: 'production',
  outputDir: '/prod',
  debug: false,
  devTool: false,
  plugins: [
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
}

module.exports = config;
