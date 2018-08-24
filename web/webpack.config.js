const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';
const DEBUG = NODE_ENV === 'development';

module.exports = {
  entry: './src/index.jsx',

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'app.js',
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[local]__[hash:base64:5]',
              minimize: !DEBUG,
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    modules: ['node_modules'],
  },

  devServer: {
    host: '0.0.0.0',
    port: Number(process.env.WDS_PORT) || 5000,
    disableHostCheck: true,
  },

  devtool: 'inline-source-map',

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
