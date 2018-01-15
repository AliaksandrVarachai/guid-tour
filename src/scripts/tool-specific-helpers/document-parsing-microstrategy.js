/**
 * Returns all visuals from the document.
 * @returns {{title: string, pageId: string, pageTitle: string}}
 */
function getAllVisuals() {
  const visuals = {};
  const nodes = document.querySelectorAll('.mstrmojo-UnitContainer');
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    visuals[node.id] = {
      title: node.id,
      pageId: 'page-id-1',
      pageTitle: 'Page #1'
    }
  }
  return visuals;
}

const visuals = getAllVisuals();

const pages = Object.keys(visuals).reduce((accum, id) => {
  accum[visuals[id].pageId] = {
    title: visuals[id].pageTitle
  };
  return accum;
}, {});

export default {
  visuals,
  pages
}
