/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common');

const { DOMAIN } = process.env;
const PORT = Number(process.env.PORT) || 5000;

common.cssLoader.unshift('style-loader');

const config = merge(common.config, {
  mode: 'development',

  output: {
    publicPath: `//${DOMAIN}:${PORT}/`,
  },

  devServer: {
    host: '0.0.0.0',
    port: PORT,
    disableHostCheck: true,
    contentBase: '/',
    hot: true,
    historyApiFallback: true,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: 'inline-source-map',
});

console.log(config);

module.exports = config;
