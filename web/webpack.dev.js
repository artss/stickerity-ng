/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common');

// const { DOMAIN } = process.env;
const PORT = Number(process.env.PORT) || 5000;

common.cssLoader.unshift('style-loader');

const config = merge(common.config, {
  mode: 'development',

  output: {
    publicPath: '/',
  },

  devServer: {
    host: '0.0.0.0',
    port: PORT,
    // https: true,
    disableHostCheck: true,
    contentBase: '/',
    hot: true,
    historyApiFallback: {
      index: 'app.html',
    },
    inline: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'inline-source-map',
});

module.exports = config;
