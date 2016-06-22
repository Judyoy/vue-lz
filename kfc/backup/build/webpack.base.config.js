var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    App: ['./src/js/client.js', './src/js/App.jsx'],
    Share: ['./src/js/client.js', './src/js/App2.jsx']
  },
  output: {
    path: path.resolve(__dirname, '../dist/static'),
    publicPath: 'static/',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.swig']
  },
  module: {
    loaders: [ // 不要移动css和scss[0, 1]的位置，因为prod需要在原位替换它们
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass'
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
        // loader: 'react-hot!babel?presets[]=react,presets[]=es2015'
        loader: 'react-hot!babel?presets[]=react,presets[]=es2015'
      },
      {
        test: /\.swig$/,
        loader: 'swig'
      }
    ]
  }
};
