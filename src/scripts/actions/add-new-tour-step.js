import { TOUR_STEP_REQUIRED_FIELDS } from '../constants/tour-settings';
import { getNextStepIndex } from '../helpers/tour-step-helper';
const uuidv4 = require('uuid/v4');
import { uuidFromString } from '../helpers/uuid-generator';
import getVisualsByPageId from '../helpers/get-visuals-by-page-id';
import documentMetaInfo from '../tool-specific-helpers/document-meta-info';

/**
 * Saves a new tour's step to DB then dispatches an action for the store.
 * @param tourStepName - tour step name.
 * @returns {function(*): Promise.<boolean>}
 */
export function addNewTourStep(tourStepName) {
  return (dispatch, getState) => {
    const { tours, tourIndex, targets } = getState();
    const pageId = documentMetaInfo.getPageId();
    const visualsByPageId = getVisualsByPageId(targets.visuals, pageId);
    const customTargetId = visualsByPageId.length ? visualsByPageId[0].id : '';
    const newTourStep = {
      ...TOUR_STEP_REQUIRED_FIELDS,
      id: uuidv4(),
      tourId: tours[tourIndex].id,
      name: tourStepName,
      index: getNextStepIndex(tours[tourIndex].steps),
      pageId,
      customTargetId,
      targetId: uuidFromString(customTargetId),
      isSynchronized: false,
      isNew: true,
    };
    dispatch({
      type: 'ADD_NEW_TOUR_STEP',
      tourStep: newTourStep
    });
  }
}