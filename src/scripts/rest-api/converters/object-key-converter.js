function toDto(str) {
  return '<' + str.charAt(0).toUpperCase() + str.slice(1) + '>k__BackingField';
}

function fromDto(str) {
  const s = /[^<>]+/.exec(str)[0];
  return s.charAt(0).toLowerCase() + s.slice(1);
}

/**
 * Transforms object keys with a given function.
 * Converts only objects/arrays and primitives (Map, Set etc. will be converted to Object)
 * @param {object|array} o - object need to be transformed.
 * @param {function} transform - transforming function.
 * @returns {object|array} - transformed object.
 */
function convertObjectKeys(o, transform) {

  function convert(o) {
    if (o instanceof Array)
      return o.map(elem => convert(elem));
    if (typeof o === 'object' && o !== null) {
      const copied = {...o};
      return Object.keys(copied).reduce((accum, key) => {
        accum[transform(key)] = convert(copied[key]);
        return accum;
      }, {});
    }
    return o;
  }

  return convert(o);
}

function objectToDto(o) {
  return convertObjectKeys(o, toDto);
}

function dtoToObject(o) {
  return convertObjectKeys(o, fromDto);
}

export default {
  dtoToObject,
  objectToDto
}
