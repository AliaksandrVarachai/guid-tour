import path from 'path';
import sourceMap from '../source-map.js';
import { GT_SCRIPT_ID } from '../constants/constants';

/**
 * Returns a current working directory of the current script with trailing '/'.
 * @returns {string} - current working directory or empty string if there is no src attribute.
 * @example
 * // returns http://localhost:9090/
 * getCWD()
 */
function getCWD() {
  let script = document.getElementById(GT_SCRIPT_ID);
  if (!script) {
    console.log(`Error: Your script must have id="${GT_SCRIPT_ID}"`);
    return '';
  }
  let src = document.getElementById('guide-tour-script').src;
  if (!src) {
    console.log(`Error: script with id="${GT_SCRIPT_ID}" does not have src`);
    return '';
  }
  let url = src.match(/^[^?#]+(=?|#)/)[0];
  return url.match(/^.*\//)[0];
}

/**
 * Returns a URL for external loaded resource (image, font etc.).
 * @param relativePath {string} - relative path to file (must be the same as for import).
 * @returns {string} - url on base of getCWD.
 * @example
 * // returns http://localhost:9090/outer-src/logo.png
 * getURL('../images/logo.png')
 */
function getURL(relativePath) {
  const imgPath = path.relative('../source-map.js', relativePath);
  const imgDirname = path.dirname(imgPath);
  const imgBasename = path.basename(imgPath);
  return getCWD() + path.join(sourceMap[imgDirname], imgBasename);
}

export default getURL;
