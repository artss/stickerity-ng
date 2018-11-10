/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const common = require('./webpack.common');

common.cssLoader.unshift(MiniCssExtractPlugin.loader);

const config = merge(common.config, {
  mode: 'production',

  output: {
    publicPath: '/',
  },

  optimization: {
    runtimeChunk: false,
    splitChunks: {
      chunks: 'all',
    },

    minimize: true,
    minimizer: [
      new UglifyJSPlugin({
        sourceMap: true,
        uglifyOptions: {
          mangle: true,
          warnings: false,
          ie8: false,
          output: {
            comments: false,
          },
        },
      }),
    ],
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash:6].css',
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.80,
      algorithm: 'gzip',
    }),
  ],
});

if (process.env.NODE_ANALYZE) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
