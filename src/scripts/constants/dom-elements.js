/**
 * Id of DOM script element loading the created build.
 * @type {string}
 */
const GT_SCRIPT_ID = 'guided-tour-script';

/**
 * Id of DOM element where guided tour has to be loaded to.
 * @type {string}
 */
const GT_ROOT_ID = 'guided-tour-root';

/**
 * Pairs of listened events and relevant DOM attributes
 * @type {{string: string}}
 */
const GT_EVENTS = {
  'click': 'gt-onclick',
};

export {
  GT_SCRIPT_ID,
  GT_ROOT_ID,
  GT_EVENTS
}
