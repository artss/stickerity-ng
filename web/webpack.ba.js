/* eslint-disable import/no-extraneous-dependencies */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const config = require('./webpack.prod');

config.plugins.push(new BundleAnalyzerPlugin());
module.exports = config;
