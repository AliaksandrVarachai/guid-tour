/**
 * Creates an object with required fields and assign the corresponding properties from a source object.
 * If there is no corresponding property, the value provided from the required field.
 * @param {object} requiredFields - object contains required fields
 * @param {object} srcObject - source object to be merged to required fields.
 * @returns {object} - object with the same structure as requiredFields object.
 * @example
 * const required = {
 *   a: 'str-a',
 *   b: null,
 *   c: [], // array with no structure: found array will be copied
 *   d: {},
 *   e: [{
 *     e1: 0,
 *     e2: [{e3: 'str-e3'}]
 *   }],
 *   f: {
 *     f1: 0,
 *     f2: {f3: 'str-f3'}
 *   }
 * }
 *
 * const src1 = {};
 * //returns deep copied required object
 * toObjectWithRequiredFields(required, src1);
 *
 * const src2 = {
 *   b: 'value B',
 *   unnecessaryField: 'unnecessary value',
 *   //   c: {},  // will be []
 *   c: [{
 *     fieldToBeCopied: 'value-1'
 *   }, {
 *     fieldToBeCopied: 'value-2'
 *   }],
 *   //  d: 888   //returns {}
 *   //  d: []    //returns {}
 *   d: {fieldNotToBeCopied: 'value-2'},
 *   e: [{
 *     e1: 42,
 *     fieldNotToBeCopied: 999,
 *     //    e2: [], // will be []
 *     e2: [{fieldNotToBeCopied: 999}, {e3: 'value-e3'}],
 *   }],
 *   f: {
 *     f2: {f3: 'value-4'},
 *     fieldNotToBeCopied: 'value-3'
 *  }
 * };
 * //returns
 * {
 *   a: "str-a",
 *   b: "value B",
 *   c: [{
 *     fieldToBeCopied: 'value-1'
 *   }, {
 *     fieldToBeCopied: 'value-2'
 *   }],
 *   d: {},
 *   e: [{
 *     e1: 42,
 *     e2: [{
 *       e3: "str-e3"
 *     }, {
 *       e3: "value-e3"
 *     }]
 *   }],
 *  f: {
 *    f1: 0,
 *    f2: {f3: "value-4"},
 *   }
 *  }
 * toObjectWithRequiredFields(required, src2);
 */
function toObjectWithRequiredFields(requiredFields, srcObject) {

  function merge(o, restObjects) {
    if (o instanceof Array) {
      if (!o.length)
        return restObjects[0] instanceof Array ? restObjects[0] : [];
      for (let i = 0; i < restObjects.length; i++) {
        const restObject = restObjects[i];
        if (restObject instanceof Array) {
          return restObject.map(item => {
            return merge(o[0], [item])
          });
        }
      }
    } else if (typeof o === 'object' && o !== null) {
      const accum = {};
      Object.keys(o).forEach(key => {
        const newRestObjects = [];
        restObjects.forEach(restObject => {
          if (!(restObject instanceof Array) && typeof restObject === 'object' && restObject !== null && key in restObject) {
            newRestObjects.push(restObject[key]);
          }
        });
        accum[key] = merge(o[key], newRestObjects);
      });
      return accum;
    }
    return restObjects.length ? restObjects[restObjects.length - 1] : o;
  }

  return merge(requiredFields, [srcObject]);
}

export default toObjectWithRequiredFields;
