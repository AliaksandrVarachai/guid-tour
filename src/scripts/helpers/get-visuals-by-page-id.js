/**
 * Returns array of all visuals when their pade ID field is equal to the passed value.
 * @param {object} visuals - object contains visual IDs as keys.
 * @param {string} selectedPageId - page ID to filter visuals.
 * @returns {Array} - visuals satisfying the condition.
 */
export default function getVisualsByPageId(visuals, selectedPageId) {
  return Object.keys(visuals).filter(id => visuals[id].pageId === selectedPageId).map(id => ({
    id,
    label: visuals[id].title,
  }));



  // const defaultCustomTargetId = Object.keys(targets.visuals)[0] || null;
  // const defaultVisual = defaultCustomTargetId ? targets.visuals[defaultCustomTargetId] : null;
  // const defaultPageId = defaultVisual ? defaultVisual.pageId : null;


}
