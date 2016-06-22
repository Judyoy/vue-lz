var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/js/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: 'static/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss']
  },
  devServer: {
    stats: {
      colors: true,
      chunks: false
    }
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css')
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', ['css', 'sass'])
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'react-hot!babel?presets[]=react,presets[]=es2015'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        // removeAttributeQuotes: true
      }
    })
  ]
};
