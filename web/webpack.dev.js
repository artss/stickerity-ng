/* eslint-disable import/no-extraneous-dependencies */

const merge = require('webpack-merge');

const common = require('./webpack.common');

const { DOMAIN } = process.env;
const PORT = Number(process.env.PORT) || 5000;

common.cssLoader.unshift('style-loader');

const config = merge(common.config, {
  mode: 'development',

  output: {
    publicPath: `//${DOMAIN}:${PORT}/static/`,
  },

  devServer: {
    host: '0.0.0.0',
    port: PORT,
    disableHostCheck: true,
    hot: true,
  },

  devtool: 'inline-source-map',
});

module.exports = config;
