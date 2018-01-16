/**
 * Creates of a deep copy of object. Only enumerable properties are to be copied.
 * Copying is implemented for Array, Object and primitives only (not for Set, Map etc.).
 * @param o{any} - object needed to be copied.
 * @returns {any} - a deeply copied object.
 * @example
 * const o = {
 *   x: 1,
 *   y: [1, 2, {
 *     z: {
 *       a: [4, 8]
 *     }
 *   }],
 * };
 * // returns
 * // {
 * //  x: 1,
 * //  y: [1, 2, {
 * //    z: {
 * //      a: [4, 8]
 * //    }
 * //  }],
 * // }
 * const copied = deepCopy(o);
 * // where o !== copied
 * //       o.y !== copied.y
 * //       o.y[2] !== copied.y[2]
 * //       o.y[2].z !== copied.y[2].z
 * //       o.y[2].z.a !== copied.y[2].z.a
 */
function deepCopy(o) {
  if (o instanceof Array)
    return o.map(elem => deepCopy(elem));
  if (typeof o === 'object' && o !== null) {
    const copied = {...o};
    return Object.keys(copied).reduce((accum, key) => {
      accum[key] = deepCopy(copied[key]);
      return accum;
    }, {});
  }
  return o;
}

export {
  deepCopy
}
