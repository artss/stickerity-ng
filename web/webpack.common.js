/* eslint-disable import/no-extraneous-dependencies */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const staticDir = path.join(__dirname, 'dist', 'static');

const cssLoader = [
  {
    loader: 'css-loader',
    options: {
      modules: true,
      importLoaders: 1,
      localIdentName: '[name]_[local]__[hash:base64:5]',
      minimize: true,
    },
  },
  'postcss-loader',
];

const config = {
  entry: {
    app: './src/index.jsx',
    /*
    lib: [
      'classnames',
      'history/createBrowserHistory',
      'react',
      'react-dom',
      'react-helmet',
      'react-router',
      'react-router-dom',
      // 'react-toolbox',
      'redux',
      'reselect',
    ],
    */
  },

  output: {
    path: staticDir,
    pathinfo: true,
    filename: '[name].[chunkhash:6].js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: cssLoader,
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules'],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};

module.exports = {
  config,
  cssLoader,
};
