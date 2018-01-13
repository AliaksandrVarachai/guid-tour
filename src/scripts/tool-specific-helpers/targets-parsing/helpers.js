/**
 * Saves parsed targets to avoid the repeated parsing of the document.
 * @typedef targets
 * @type {{
 *          visuals: {
 *            [id]: {
 *              title: string,
 *              frameIndex: number,
 *              pageId: string,
 *              pageTitle: string
 *            }
 *          },
 *          pages: {
 *            [id]: {
 *              pageTitle: string
 *            }
 *          }
 *       }}
 */
let targets = {};

/**
 * Returns all targets without parsing of the document (if it's possible).
 * @param parseTargets - function parsing a document and returning visuals as an object.
 * @returns {{visuals: {id?: {title: string, frameIndex: number, pageId: string, pageTitle: string}}, pages: {id?: {pageTitle: string}}}}
 */
function getTargets(parseTargets) {
  return targets.visuals ? targets : getParsedTargets(parseTargets);
}

/**
 * Returns all parsed targets on the document.
 * @param parseTargets - function parsing a document and returning visuals as an object.
 * @returns {{visuals: {id?: {title: string, frameIndex: number, pageId: string, pageTitle: string}}, pages: {id?: {pageTitle: string}}}}
 */
function getParsedTargets(parseTargets) {
  const visuals = parseTargets();
  const pages = Object.keys(visuals).reduce((accum, id) => {
    accum[visuals[id].pageId] = {
      title: visuals[id].pageTitle
    };
    return accum;
  }, {});
  return targets = {
    visuals,
    pages
  };
}

export {
  getTargets,
  getParsedTargets
};
