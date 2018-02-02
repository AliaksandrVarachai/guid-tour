import { getTargets, getParsedTargets } from './helpers';
import documentMetaInfo from '../document-meta-info';
import globals from '../globals';

function parseTargets() {
  const visuals = {};
  const nodes = document.querySelectorAll('.tab-zone.tabSuppressVizTooltipsAndOverlays:not(.tabZone-empty), .tabZone-viz:not(.tabZone-empty)');
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    visuals[node.id] = {
      title: node.id,
      frameIndex: -1,  // TODO: remove frameIndex for root document
      pageId: documentMetaInfo.getPageId(),//'page-id-1',
      pageTitle: globals.tableau.VizManager.getVizs()[0].getWorkbook().getActiveSheet().getName()//'Page #1'
    }
  }

  // TODO: not to remove (it will be useful for the frames parsing)
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
  }
  */

  return visuals;
}

export default {
  getTargets: () => getTargets(parseTargets),
  getParsedTargets: () => getParsedTargets(parseTargets),
}
