const { merge: webpackMerge } = require('webpack-merge');

const loadPreset = (env) => {
  const { presets } = env;

  console.log({ presets });
  const flatenedPresets = [].concat(...[presets]);

  const mergedConfigs = flatenedPresets.map((presetName) => require(`./presets/webpack.${presetName}`)(env));

  return webpackMerge({}, ...mergedConfigs);
};

module.exports = loadPreset;
