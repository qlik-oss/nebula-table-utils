const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = () => ({
  devtool: 'hidden-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '',
    library: {
      type: 'module',
    },
  },

  experiments: {
    outputModule: true,
  },

  externals: {
    react: 'react',
    'react-dom': 'react-dom',
  },

  optimization: {
    minimize: true,
    minimizer: [
      // new TerserWebpackPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 1024,
      minChunks: 1,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'npm.react-vendor',
          chunks: 'all',
        },
        // materialUIVendor: {
        //   test: /[\\/]node_modules[\\/](@material-ui)[\\/]/,
        //   name: "@material-ui-vendor",
        //   chunks: "all",
        // },
        shared: {
          test: /[\\/]node_modules[\\/]/,
          name(module, _, cacheGroupKey) {
            const moduleFileName = module
              .identifier()
              .split('/')
              .reduceRight((item) => item);
            return `npm.${cacheGroupKey}~${moduleFileName}`;
          },
          chunks: 'all',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },

  module: {
    rules: [
      /** more rules here */
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:6].css',
      chunkFilename: 'styles/[id].[contenthash:6].css',
    }),
  ],
});
