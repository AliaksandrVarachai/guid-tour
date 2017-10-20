/**
 * Returns a current working directory of the running script with trailing '/'.
 * @returns {string} - current working directory or empty string if there is no src attribute.
 */
function getCWD() {
  let scripts = document.getElementsByTagName('script');
  let src = scripts[scripts.length - 1].src;
  if (!src) return '';
  let url = src.match(/^[^?#]+(=?|#)/)[0];
  return url.match(/^.*\//)[0];
}

export default getCWD;
