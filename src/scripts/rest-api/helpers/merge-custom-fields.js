/**
 * Returns a new object customized by the first argument.
 * @param args - list of objects, args[0] must be not null object (if any other argument is null or primitive it will be ignored).
 * @returns {{}}
 * @example
 * const customFields = {x: 0, y: 0, z: 0};
 * const o1 = {x: 1, y: 2};
 * const o2 = {y: 33};
 * //returns {x: 1, y: 33, z: 0}
 * mergeCustomFields(customFields, o1, o2);
 */
function mergeCustomFields(...args) {
  const accum = {};
  const custom = args[0];
  if (typeof custom !== 'object' || custom === null)
    Error(`First argument must be a not null object, but received "${custom}"`);
  const keys = Object.keys(custom);
  for (let i = 1; i < args.length; i++) {
    if (typeof args[i] !== 'object' || args[i] === null)
      continue;
    keys.forEach(key => {
      if (key in args[i]) {
        accum[key] = args[i][key];
      }
    });
  }
  keys.forEach(key => {
    if(!(key in accum))
      accum[key] = custom[key];
  });
  return accum;
}

export default mergeCustomFields;
