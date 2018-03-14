import globals from '../../tool-specific-helpers/globals';
import { getActiveTargetPageId, getActivePageTargetVisuals, getTargetPages } from '../../tool-specific-helpers/targets-parsing/tableau';
import * as actions from '../../actions';
import * as commonActions from './common-actions';
import eventCallbackStore from '../../helpers/event-callback-store';
const uuidv4 = require('uuid/v4');

/**
 * Saves a new tour's step to DB then dispatches an action for the store.
 * @param {string} targetPageId - pageId.
 * @param {boolean} [modifyTourStepPageId=false] - true if modification of the current tourStep needed.
 * @returns {function(*): Promise.<boolean>}
 */
export function activateSheetAsync(targetPageId, modifyTourStepPageId = false) {
  return (dispatch, getState) => {
    const { product,  } = getState();
    const sheetName = product.pages[targetPageId].title;

    if (modifyTourStepPageId) {
      const cbUuid = uuidv4();
      eventCallbackStore.put(cbUuid, () => {
        dispatch(actions.changeTourStep({'pageId': targetPageId}));
      });
      dispatch(commonActions.addProductExpectedEvent(globals.tableau.TableauEventName.TAB_SWITCH, cbUuid));
    }

    // triggers TAB_SWITCH event after DOM is updated
    globals.tableau.VizManager.getVizs()[0].getWorkbook().activateSheetAsync(sheetName);
  }
}


export function updateActiveTargetPage() {
  return dispatch => {
    dispatch(commonActions.updateActiveTargetPage(getActiveTargetPageId));
  };
}

export function updateActivePageTargetVisuals() {
  return dispatch => {
    dispatch(commonActions.updateActivePageTargetVisuals(getActivePageTargetVisuals));
  };
}

export function updateTargetPages() {
  return dispatch => {
    dispatch(commonActions.updateTargetPages(getTargetPages));
  };
}

export {
  addProductExpectedEvent,
  removeProductExpectedEvent,
} from './common-actions';
