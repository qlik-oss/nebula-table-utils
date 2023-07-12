const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => ({
  plugins: [
    new WebpackBundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportTitle: 'Prod build bundle report',
      defaultSizes: 'stat',
      generateStatsFile: true,
      reportFilename: 'Bundle-analyzer-report.html',
    }),
  ],
});
