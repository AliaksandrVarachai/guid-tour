/**
 * Returns a new object customized by the first argument.
 * @param args - list of objects.
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
  const keys = Object.keys(args[0]);
  for (let i = 1; i < args.length; i++) {
    keys.forEach(key => {
      if (key in args[i]) {
        accum[key] = args[i][key];
      }
    });
  }
  keys.forEach(key => {
    if(!(key in accum))
      accum[key] = args[0][key];
  });
  return accum;
}

export default mergeCustomFields;
