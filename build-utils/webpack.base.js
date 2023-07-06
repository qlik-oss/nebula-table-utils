const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const extractEntryFiles = require('./extractEntryFiles');

console.log({
  entryFiles: extractEntryFiles(),
});

module.exports = ({ mode }) => ({
  mode,
  entry: extractEntryFiles(),

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.css', '.scss', '.sass'],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      BUILD_MODE: JSON.stringify(mode),
    }),

    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, '../package.json') },
        { from: path.resolve(__dirname, '../README.md') },
        { from: path.resolve(__dirname, '../LICENSE') },
      ],
    }),

    new webpack.ProgressPlugin(),
  ],
});
