const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  entry: './src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        resolve: { extensions: ['.js', '.jsx'] },
        include: [path.resolve(__dirname, '../src')],
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Should I Walk?',
    }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$/,
      threshold: 8192,
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|html)$/,
      compressionOptions: {
        level: 11,
      },
      threshold: 8192,
    }),
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
