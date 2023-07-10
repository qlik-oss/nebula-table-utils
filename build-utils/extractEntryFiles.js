const glob = require('glob');
const path = require('path');

const getAssetkey = (name) => {
  // preserve the assetName "${path.basename(previousValue, path.extname(previousValue))}"
  let assetName = path.basename(name, path.extname(name));
  // but add the folder path name before it -> so get the folder name first
  let folderPath = path.dirname(name).replace('./src/', '');
  let key = `${folderPath}/${assetName}`;

  // if it is root file of entire pkg, replace it with index
  // since it does not have any folder path
  if (key === './src/index') key = 'index';

  return key;
};

function extractEntryFiles() {
  return glob.sync('./src/**/*.{ts,tsx}', { ignore: './src/**/*.{spec,test}.{ts,tsx}' }).reduce((prevVal, currVal) => {
    if (typeof prevVal === 'string') {
      let prevKey = getAssetkey(prevVal);
      let currKey = getAssetkey(currVal);

      return {
        [prevKey]: prevVal,
        [currKey]: currVal,
      };
    } else {
      let currKey = getAssetkey(currVal);
      return {
        ...prevVal,
        [currKey]: currVal,
      };
    }
  });
}

module.exports = extractEntryFiles;
