const { merge: webpackMerge } = require('webpack-merge');
const BaseConfig = require('./build-utils/webpack.base.js');
const ModeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);
const PresetConfig = require('./build-utils/loadPresets');

/**
 *
 * @param {Object} build_args - build args from command line
 * You can export an object or a function that would
 * return an object from webpack config file can export
 */
module.exports = (...args) => {
  const [
    WEBPAKC_BUILD_FLAGS,
    {
      mode = 'production',
      env: { presets = [] },
    },
  ] = args;

  console.log('>>>>>>>>>>>>>>>>>> BUILD ARGS <<<<<<<<<<<<<<<<<<<<');
  console.log(`Mode: ${mode}`);
  console.log(`Presets: ${JSON.stringify(presets, null, 2)}`);
  console.log('==================================================');

  const isDev = mode === 'development';

  return webpackMerge(
    BaseConfig({ mode, isDev, WEBPAKC_BUILD_FLAGS }),
    ModeConfig(mode),
    PresetConfig({ mode, presets: Object.keys(presets) })
  );
};
