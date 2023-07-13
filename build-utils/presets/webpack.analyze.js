const WebpackBundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = () => ({
  plugins: [
    new WebpackBundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportTitle: 'Prod build bundle report',
      defaultSizes: 'stat',
      generateStatsFile: true,
      reportFilename: 'bundle-analyzer-report.html',
      statsFilename: 'bundle-analyzer-stats.json',
    }),
  ],
});
