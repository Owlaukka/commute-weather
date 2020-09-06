const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const SWCachePlugin = require('sw-cache-plugin');

module.exports = {
  entry: './src/index.jsx',
  resolve: { extensions: ['.js', '.jsx'] },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(__dirname, '../src')],
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Weather for Commute',
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/sw.js', to: path.resolve(__dirname, '../dist') },
      ],
    }),
    new SWCachePlugin(),
  ],
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'deterministic',
    chunkIds: 'named',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor',
          priority: -10,
          enforce: true,
        },
      },
    },
  },
};
