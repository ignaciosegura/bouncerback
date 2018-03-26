// Webpack config for production

var webpack = require('webpack');

var config = {
  environment: 'production',
  outputDir: '/prod',
  debug: false,
  devTool: null,
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
}

module.exports = config;
