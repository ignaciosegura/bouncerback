// *** COMMON CONFIG OPTIONS *** //
var siteTitle = 'BOUNCERBACK';
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
    prefix: 'res/icons/',
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
      android: false,
      appleIcon: true,
      appleStartup: false,
      coast: false,
      favicons: true,
      firefox: true,
      opengraph: true,
      twitter: false,
      yandex: false,
      windows: false
    }
  });

  webpackCommonPlugins = webpackCommonPlugins.concat(FaviconsWebpackPlugin);
}


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
        loader: 'babel-loader', // Options are in a .babelrc file
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
        loader: 'url-loader?limit=10000&name=img/[name].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=100000&name=/res/fonts/[name].[ext]'
      },
      {
        test: /\.htaccess$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: './.htaccess',
          }
        }
      },
      {
        test: /\.mp3$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: './res/sound/[name].[ext]',
          }
        }
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        use: {
          loader: 'json-loader',
        }
      }
    ]
  },
  output: {
    filename: './js/index_bundle.js',
    path: __dirname + config.outputDir,
  },
  devtool: config.devTool,
  plugins: allPlugins,
}
