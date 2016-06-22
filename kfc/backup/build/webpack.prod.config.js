var webpack = require('webpack')
var config = require('./webpack.base.config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

config.devServer = {
  stats: {
    colors: true,
    chunks: false
  }
}
config.output.publicPath = 'http://yxacc.lizhi.fm/webres/kfc/'
config.output.filename = '[name].[chunkhash].js'

config.module.loaders[0] = {
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css')
}
config.module.loaders[1] = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style', ['css', 'sass'])
}

config.plugins = (config.plugins || []).concat([
  new webpack.optimize.CommonsChunkPlugin('common.[chunkhash].js'),
  new ExtractTextPlugin('[name].[contenthash].css'),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new HtmlWebpackPlugin({
    title: 'a webpack-react project',
    filename: '../index.html',
    template: 'src/tpl/index.swig',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      // removeAttributeQuotes: true
    }
  })
])

module.exports = config
