function toDto(str) {
  return '<' + str.charAt(0).toUpperCase() + str.slice(1) + '>k__BackingField';
}

function fromDto(str) {
  const s = /[^<>]+/.exec(str)[0];
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function generateMapToDto(obj){
  const objMap = {};
  Object.keys(obj).forEach(function(item) {
    objMap[item] = toDto(item);
  });
  return objMap;
}

function mapToDto(obj) {
  const map = generateMapToDto(obj);
  return Object.keys(map).reduce(function(accum, key) {
    const value = obj[key];
    if (typeof value === 'function')
      throw Error('function cannot be transformed to the REST format in a DTO object');
    if (value instanceof Array) {
      accum[map[key]] = value.map(function (val) {
        return mapToDto(val);
      });
      return accum;
    }
    if (typeof value === 'object')
      if (value !== null)
        return generateMapToDto(value);
    accum[map[key]] = value;
    return accum;
  }, {});
}

// converts only objects/arrays and primitives (Map, Set etc. will be converted to Object)
function dtoToObject(o) {
  if (o instanceof Array)
    return o.map(elem => dtoToObject(elem));
  if (typeof o === 'object' && o !== null) {
    const copied = {...o};
    return Object.keys(copied).reduce((accum, key) => {
      accum[fromDto(key)] = dtoToObject(copied[key]);
      return accum;
    }, {});
  }
  return o;
}

export default {
  mapToDto,
  dtoToObject
}
