let visuals = {};
let pages = {};

/**
 * Returns all visuals from the document and iframes.
 * @returns {{title: string, frameIndex: number, pageId: string, pageTitle: string}}
 */
function getParsedVisuals() {
  // const visuals = {};
  visuals = {};
  const nodes = document.querySelectorAll('.tab-zone.tabSuppressVizTooltipsAndOverlays:not(.tabZone-empty), .tabZone-viz:not(.tabZone-empty)');
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    visuals[node.id] = {
      title: node.id,
      frameIndex: -1,  // TODO: remove frameIndex for root document
      pageId: 'page-id-1',
      pageTitle: 'Page #1'
    }
  }

  pages = Object.keys(visuals).reduce((accum, id) => {
    accum[visuals[id].pageId] = {
      title: visuals[id].pageTitle
    };
    return accum;
  }, {});

  /*
  const frames = window.frames;
  for (let frameIndex = 0; frameIndex < frames.length; frameIndex++) {
    try {
      const frameVisualNodes = frames[frameIndex].document.querySelectorAll('.tab-zone.tabSuppressVizTooltipsAndOverlays:not(.tabZone-empty), .tabZone-viz:not(.tabZone-empty)');
      for (let i = 0; i < frameVisualNodes.length; i++) {
        const node = frameVisualNodes[i];
        visuals[node.id] = {
          title: node.id,
          frameIndex,
          pageId: 'page-id-1',
          pageTitle: 'Page #1'
        }
      }
    } catch (errorMsg) {
      console.warn('No access to the content of iframe #' + frameIndex);
    }
  }*/
  return {
    visuals,
    pages
  };
}

/**
 * Returns all visuals without parsing of the document (if it's possible)
 * @returns {*}
 */
function getVisuals() {
  return Object.keys(visuals).length
    ? {visuals, pages}
    : getParsedVisuals();
}


// const pages = Object.keys(visuals).reduce((accum, id) => {
//   accum[visuals[id].pageId] = {
//     title: visuals[id].pageTitle
//   };
//   return accum;
// }, {});

export default {
  getVisuals,
  getParsedVisuals
}
