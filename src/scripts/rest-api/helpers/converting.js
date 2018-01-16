function toDto(str) {
  return '<' + capitalizeFirstLetter(str) + '>k__BackingField';
}

function fromDto(str) {
  return uncapitalizeFirstLetter(/[^<>]+/.exec(str)[0]);
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function uncapitalizeFirstLetter(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

function generateMapToDto(obj){
  const objMap = {};
  Object.keys(obj).forEach(function(item) {
    objMap[item] = toDto(item);
  });
  return objMap;
}

function generateMapFromDto(obj){
  const objMap = {};
  Object.keys(obj).forEach(function(item) {
    objMap[item] = fromDto(item);
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

function mapFromDto(obj) {
  const map = generateMapFromDto(obj);
  return Object.keys(map).reduce(function(accum, key) {
    const value = obj[key];
    if (typeof value === 'function')
      throw Error('function cannot be transformed to the REST format in a DTO object');
    if (value instanceof Array) {
      accum[map[key]] = value.map(function (val) {
        return mapFromDto(val);
      });
      return accum;
    }
    if (typeof value === 'object')
      if (value !== null)
        return generateMapFromDto(value);
    accum[map[key]] = value;
    return accum;
  }, {});
}

export default {
  mapToDto,
  mapFromDto
}
