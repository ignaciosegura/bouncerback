// Webpack config for development
var webpack = require('webpack');
var loaderOptionsPluginConfig = new webpack.LoaderOptionsPlugin({
  debug: true
});

var config = {
  environment: 'development',
  outputDir: '/dev',
  debug: true,
  devTool: 'source-map',
  plugins: [loaderOptionsPluginConfig],
}

module.exports = config;
