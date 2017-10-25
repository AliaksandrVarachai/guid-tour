import path from 'path';
import sourceConfig from '../source-config.js';
import { GT_SCRIPT_ID } from '../constants/constants';

/**
 * Returns a current working directory of the current script with trailing '/'.
 * @returns {string} - current working directory or empty string if there is no src attribute.
 * @example
 * // returns 'http://localhost:9090/commonUI/'
 * getCWD()
 */
function getCWD() {
  let script = document.getElementById(GT_SCRIPT_ID);
  if (!script) {
    console.log(`Error: Your script must have id="${GT_SCRIPT_ID}"`);
    return '';
  }
  let src = script.src;
  if (!src) {
    console.log(`Error: script with id="${GT_SCRIPT_ID}" does not have src`);
    return '';
  }
  let url = src.match(/^[^?#]+(=?|#)/)[0];
  return url.match(/^.*\//)[0];
}

/**
 * Returns a URL for external loaded resource (image, font etc.).
 * @param outputPath {string} - path to output file after build.
 * @returns {string} - url on base of getCWD.
 * @example
 * // import of image file
 * import image from '../images/logo.png';
 * // returns 'http://localhost:9090/commonUI/outer-src/images/logo.png'
 * <img src={getURL(image)} />
 */
function getURL(outputPath) {
  return getCWD() + outputPath;
}

export default getURL;
