import { uuidFromString } from '../../helpers/uuid-generator';
import globals from '../globals/index';

/**
 * Generates ID for the active target page.
 * @returns {string} - page ID in format '00000000-0000-0000-0000-000000000000'.
 */
export function getActiveTargetPageId() {
  const uniquePageName = globals.tableau.VizManager.getVizs()[0].getWorkbook().getActiveSheet().getName();
  return uuidFromString(uniquePageName);
}

/**
 * Parses the document to find target pages.
 * @returns {Object} - object with structure {[pageId]: {title: 'Page Title'}} or {} if no pages found.
 * pageId has format '00000000-0000-0000-0000-000000000000'.
 */
export function getTargetPages() {
  const sheets = globals.tableau.VizManager.getVizs()[0].getWorkbook().getPublishedSheetsInfo();
  const pages = {};
  for(let i = 0; i < sheets.length; i++) {
    pages[uuidFromString(sheets[i].getName())] = {
      title: sheets[i].getName(),
      visuals: {}
    }
  }
  return pages;
}

/**
 * Parses the document to find all visuals belong to the given target page.
 * @returns {Object} - object with structure {[visualNodeId]: {title: 'Visual Title'}} or {} if no visuals found.
 * visualNodeId is document.HTMLElement.id.
 */
export function getActivePageTargetVisuals() {
  function getName(node) {
    if (!node)
      return '';
    while (node.children.length) {
      node = node.children[0];
    }
    return node.textContent;
  }

  const visuals = {};
  const nodes = document.querySelectorAll('.tab-zone.tabSuppressVizTooltipsAndOverlays:not(.tabZone-empty), .tabZone-viz:not(.tabZone-empty)');
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    let name = getName(node);
    if (name === '') {
      name = getName(node.previousElementSibling);
    }
    visuals[node.id] = {
      title: name ? name : node.id,
    }
  }
  return visuals;
}

/**
 * Parses the document to find all pages and all visuals in every page.
 * It is NOT USED in Tableau and demonstrates an example of possible usage.
 *
 * @returns {{
 *  [pageId]: {
 *    title: 'Page Title',
 *    visuals: {
 *      [visualId]: {
 *        title: 'Visual Title',
 *      }
 *    }
 *  }
 * }} - pages object with visuals embedded.
 */
export function getTargetPagesWithVisuals() {
  const pages = {};
  document.querySelectorAll('.some-target-page').forEach(pageNode => {
    const pageId = uuidFromString(pageNode.id);
    pages[pageId] = {
      title: pageNode.getAttribute('data-title'),
      visuals: {}
    };
    const visuals = pages[pageId].visuals;
    pageNode.querySelectorAll('.some-target-visual').forEach(visualNode => {
      visuals[uuidFromString(visualNode.id)] = {
        title: visualNode.getAttribute('data-title'),
      }
    });
  });
  return pages;
}
