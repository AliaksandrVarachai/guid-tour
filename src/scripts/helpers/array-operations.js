/**
 * Looks for the first index in an array of objects. The criterion is set by property's name and its value.
 * @param {array} arr - array that has to contain objects.
 * @param {string} propName - property name to be compared.
 * @param {string|number|boolean} value - value to be found in given property names.
 * @returns {number} - index of found element or -1 if such element is absent.
 *
 * @example
 * const arr = [
 *   {name: 'name-1', str: 'str'},
 *   {name: 'name-2', bool: true},
 *   {name: 'name-3', obj: {x: 0, y: 0}, size: 42},
 *   {name: 'name-4'}
 * ];
 * // returns 2
 * findIndexByProperty(arr, 'name', 'name-3');
 */
export function findIndexByProperty(arr, propName, value) {
  if (!(arr instanceof Array))
    throw Error('Array must be provided');
  if (typeof propName !== 'string')
    throw Error('Prop name must be a string');
  if (value !== null && typeof value ==='object' || typeof value === 'function')
    throw Error('Only null and primitive values could be compared');
  let inx;
  for (inx = 0; inx < arr.length; inx++) {
    if (arr[inx] !== null && typeof arr[inx] === 'object' && arr[inx].hasOwnProperty(propName) && arr[inx][propName] === value)
      break;
  }
  return inx === arr.length ? -1 : inx;
}