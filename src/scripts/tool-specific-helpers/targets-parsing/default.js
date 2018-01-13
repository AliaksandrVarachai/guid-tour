import { getTargets, getParsedTargets } from './helpers';

function getClosestNode(node, className) {
  let parentNode = node.parentNode;
  while (parentNode) {
    if (parentNode.classList.contains(className)) {
      return parentNode;
    }
    return getClosestNode(parentNode, className);
  }
  return parentNode;
}

function parseTargets() {
  const visualNodes = document.getElementsByClassName('visual');
  const visuals = {};
  for (let i = 0; i < visualNodes.length; i++) {
    const node = visualNodes[i];
    const parentPageNode = getClosestNode(node, 'page');
    if (!parentPageNode)
      Error(`Visual "${node.id}" does not have parent element with class="page"`);
    visuals[node.id] = {
      title: node.getAttribute('data-gt-visual-title'),
      pageId: parentPageNode.id,
      pageTitle: parentPageNode.getAttribute('data-gt-page-title')
    }
  }
  return visuals;
}

export default {
  getTargets: () => getTargets(parseTargets),
  getParsedTargets: () => getParsedTargets(parseTargets)
}
