import { getTargets, getParsedTargets } from './helpers';

function parseTargets() {
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

export default {
  getTargets: () => getTargets(parseTargets),
  getParsedTargets: () => getParsedTargets(parseTargets)
}
