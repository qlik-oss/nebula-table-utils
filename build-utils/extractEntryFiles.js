const glob = require('glob');
const path = require('path');

function extractEntryFiles() {
  return glob.sync('./src/**/*.{ts,tsx}').reduce((previousValue, currentValue, currentIndex, array) => {
    if (typeof previousValue === 'string') {
      // TODO:
      // preserve the key "${path.basename(previousValue, path.extname(previousValue))}"
      // but add the folder name before it -> so get the folder name first
      let prevAssetName = path.basename(previousValue, path.extname(previousValue));
      let prevKeyFolderName = path.dirname(previousValue).replace('./src/', '');
      let prevKey = `${prevKeyFolderName}/${prevAssetName}`;

      let currAssetName = path.basename(currentValue, path.extname(currentValue));
      let currKeyFolderName = path.dirname(currentValue).replace('./src/', '');
      let currKey = `${currKeyFolderName}/${currAssetName}`;

      if (prevKey === './src/index') prevKey = 'index';
      if (currKey === './src/index') currKey = 'index';

      return {
        [prevKey]: previousValue,
        [currKey]: currentValue,
      };
    } else {
      let currAssetName = path.basename(currentValue, path.extname(currentValue));
      let currKeyFolderName = path.dirname(currentValue).replace('./src/', '');
      let currKey = `${currKeyFolderName}/${currAssetName}`;

      if (currKey === './src/index') currKey = 'index';
      return {
        ...previousValue,
        [currKey]: currentValue,
      };
    }
  });
}

module.exports = extractEntryFiles;
