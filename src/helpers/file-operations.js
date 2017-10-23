/**
 * Transforms name of file to regexp for require.context needs.
 * @param filename {string} - name of file.
 * @param prefix {string?} - prefix, default value is '^\.\/'.
 * @param postfix {string?} - postfix, default value is '$'.
 * @returns {RegExp} - transformed file's name
 * @example
 * // returns /^\.\/foo\.json$'/
 * filenameToRegExp('foo.json')
 */
function filenameToRegExp(filename, prefix = '^\.\/', postfix = '$') {
  const specials = [
    '-',
    '[',
    ']',
    '/',
    '{',
    '}',
    '(',
    ')',
    '*',
    '+',
    '?',
    '.',
    '\\',
    '^',
    '$',
    '|',
  ];
  const regex = new RegExp('[' + specials.join('\\') + ']', 'g');

  return new RegExp(prefix + filename.replace(regex, "\\$&") + postfix);
}

/**
 * Parses file name.
 * @param path {string} - file path.
 * @returns {string} - file name.
 * @example
 * // returns 'bar.js'
 * parseFileName('foo/bar.js')
 */
function parseFilePath(path) {
  if (typeof path === 'string') {
    let base = path.match(/[^\/]+$/)[0];
    let dir = path.substr(0, -base.length);
    // let dir = path.match(/^.*(?:[^\/]+)/);
    console.log('base=', base);
    console.log('dir=', dir);
    return {
      base,
      dir
    };
  } else {
    return ''
  }
}

export default {
  filenameToRegExp,
  parseFilePath
};
