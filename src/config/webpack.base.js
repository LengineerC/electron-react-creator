const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');
const process=require("process");

const RENDERER_ENTRY=path.resolve(process.cwd(),"./src/renderer/index.js");

module.exports = {
  entry: {
    renderer: RENDERER_ENTRY,
  },
  output: {
    path: path.resolve(process.cwd(), './dist/renderer'),
    filename: '[name].bundle.js',

  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname, '../../node_modules'), 
      'node_modules', 
    ],
  },
  resolveLoader: {
    modules: [
      path.resolve(__dirname, '../../node_modules'), 
      'node_modules', 
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
      {
        test: /\.(svg|png|webp|jpg|jpeg)$/,
        type: 'asset/resource'
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(),"./src/renderer/index.html"),
      filename: 'index.html',
      inject: 'body', 
    }),
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      TextEncoder: ['text-encoding', 'TextEncoder'],
      TextDecoder: ['text-encoding', 'TextDecoder'],
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    fallback: {
      "util": require.resolve("util/"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "global": require.resolve("global/"),
      // "text-encoding": require.resolve("text-encoding/"),
    },
  },

};
