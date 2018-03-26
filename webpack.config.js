// *** COMMON CONFIG OPTIONS *** //
var siteTitle = 'Nik Nak Studio\'s React Starter Kit';
var faviconPath = './src/img/favicon.png';

// In webpack.config.js
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var fs = require('fs');

// Common plugin definitions
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/src/index.html',
  filename: 'index.html',
  inject: 'body',
  title: siteTitle,
});
var ExtractTextPlugin = new ExtractTextPlugin('./css/style.css');

var webpackCommonPlugins = [HTMLWebpackPluginConfig, ExtractTextPlugin];

// Favicon process, but only if file exists.
if (fs.existsSync(faviconPath)) {
  console.log('favicon.png does exist');
  var FaviconsWebpackPlugin = new FaviconsWebpackPlugin({
    logo: faviconPath,
    // The prefix for all image files (might be a folder or a name)
    prefix: 'icons/',
    // Emit all stats of the generated icons
    emitStats: false,
    // The name of the json containing all favicon information
    statsFilename: 'iconstats-[hash].json',
    // Generate a cache file with control hashes and
    // don't rebuild the favicons until those hashes change
    persistentCache: true,
    // Inject the html into the html-webpack-plugin
    inject: true,
    background: '#fff',
    title: siteTitle,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: true,
      opengraph: true,
      twitter: true,
      yandex: false,
      windows: true
    }
  });

  webpackCommonPlugins = webpackCommonPlugins.concat(FaviconsWebpackPlugin);
}

// Loaders custom config
var BabelLoaderQuery = {
  presets: ['es2015', 'react']
};

// *** PRODUCTION / DEVELOPMENT SWITCH OBJECT
var environment = process.env.npm_lifecycle_event ? process.env.npm_lifecycle_event : 'command-line-development';
var config, allPlugins;

console.log('Environment is: "' + environment + '"');

switch (environment) {
  case 'build-production':
    config = require('./webpack.config.prod.js');
    break;
  default:
    config = require('./webpack.config.dev.js');
}
allPlugins = webpackCommonPlugins.concat(config.plugins);

// *** WEBPACK OBJECT ***
module.exports = {
  entry: [
    './src/js/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: BabelLoaderQuery
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          loader: 'css-loader!sass-loader',
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|jpg|svg)$/,
        exclude: /node_modules/,
        loader: 'svg-url-loader?limit=10000&name=images/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=100000'
      },
    ]
  },
  output: {
    filename: "./js/index_bundle.js",
    path: __dirname + config.outputDir,
  },
  devtool: config.devTool,
  plugins: allPlugins,
}
