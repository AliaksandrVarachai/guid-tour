import tourStepService from '../rest-api/services/tour-step-service';

/**
 * Saves a tour's step to DB then dispatches an action for the store.
 * @param {number} tourStepIndex - tour step index.
 * @returns {function(*): Promise.<boolean>}
 */
// TODO: rename or REMOVE the function to avoid mix with button-action.
export function saveTourStep(tourStepIndex) {
  return (dispatch, getState) => {
    const { tours, tourIndex } = getState();
    const tourStep = tours[tourIndex].steps[tourStepIndex]
    return tourStepService.addStep(tourStep).then(
      (addedStep) => {
        return true;
      },
      errorMessage => {
        console.log(errorMessage);
        return false;
      }
    );
  }
}