import { TOUR_STEP_REQUIRED_FIELDS } from '../constants/tour-settings';
import { getNextStepIndex } from '../helpers/tour-step-helper';
const uuidv4 = require('uuid/v4');
import { uuidFromString } from '../helpers/uuid-generator';

/**
 * Saves a new tour's step to DB then dispatches an action for the store.
 * @param tourStepName - tour step name.
 * @returns {function(*): Promise.<boolean>}
 */
export function addNewTourStep(tourStepName) {
  return (dispatch, getState) => {
    const { tours, tourIndex, product } = getState();
    const pageId = product.activePageId;
    const customTargetId = Object.keys(product.pages[pageId].visuals)[0];
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
    dispatch({
      type: 'CHANGE_IS_NEW_TOUR_STEP_IN_PROGRESS',
      value: false
    });
  }
}
