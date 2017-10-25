const path = require('path');

const sourceMap = {
  images: {                          // resource name
    include: './images',             // relative path to resource folder {string}
    outputPath: 'outer-src/images/'  // output path in dist folder {string}
  },
  fonts: {
    // TODO: add fonts
  }
};

/**
 * Gets absolute path to source folder. It is need for webpack build stage.
 * @param resourceName {'image'|'fonts'} - resource name in sourceMap.
 * @return {string} - absolute path to needed resource folder
 */
function getIncludeAbsolutePath(resourceName) {
  return path.resolve(__dirname, sourceMap[resourceName].include);
}

module.exports = {
  sourceMap,
  getIncludeAbsolutePath
};
