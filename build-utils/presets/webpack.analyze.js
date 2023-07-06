const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => ({
  plugins: [
    new WebpackBundleAnalyzerPlugin({
      analyzerPort: 8081,
      reportTitle: 'Prod build bundle report',
      defaultSizes: 'stat',
    }),
  ],
});
