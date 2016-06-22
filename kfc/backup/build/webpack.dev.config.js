var webpack = require('webpack')
var config = require('./webpack.base.config')

// config.entry.App.unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server")
config.devServer = {
  stats: {
    colors: true,
    chunks: false
  }
}
config.plugins = (config.plugins || []).concat([
  new webpack.optimize.CommonsChunkPlugin('common.js'),
  // new webpack.optimize.OccurenceOrderPlugin(),
  // new webpack.HotModuleReplacementPlugin()
  // new webpack.NoErrorsPlugin()
])

module.exports = config
