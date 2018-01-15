function mergeCustomFields(custom, source) {
  if (typeof custom !== 'object' || typeof source !== 'object')
    Error(`Arguments customized="${custom}" and source="${source}" must be objects`);
  return Object.keys(custom).reduce((accum, key) => {
    accum[key] = source[key] === undefined ? custom[key] : source[key];
    return accum;
  }, {});
}

export default mergeCustomFields;
