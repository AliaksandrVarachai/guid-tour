import targetsParsing from '../tool-specific-helpers/targets-parsing';

/**
 * Saves all targets to the store without rendering of DOM (if it's possible).
 */
export function updateTargets() {
  return dispatch => {
    dispatch({
      type: 'UPDATE_TARGETS',
      targets: targetsParsing.getTargets()
    });
  }
}

/**
 * Saves all targets to the store  with preliminary rendering of DOM.
 */
export function updateParsedTargets() {
  return dispatch => {
    dispatch({
      type: 'UPDATE_TARGETS',
      targets: targetsParsing.getParsedTargets()
    });
  }
}
