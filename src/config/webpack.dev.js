const {merge} = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const webpack = require('webpack');
const path=require('path');
const process=require("process");

module.exports = merge(baseConfig, {
  mode: 'development',
  target: 'web',
  devtool: 'inline-source-map',
  output:{
    publicPath: '/',
  },
  devServer: {
    static: path.resolve(process.cwd(), './src/renderer'),
    port: 3000,
    hot:true,
    open: false,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), 
  ],
});

