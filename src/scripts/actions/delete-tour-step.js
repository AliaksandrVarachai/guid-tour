import tourStepService from '../rest-api/services/tour-step-service';
import { NOTIFICATION_TYPES } from '../constants/tour-settings';

export function deleteTourStep(removedTourStepIndex) {
  return (dispatch, getState) => {
    const { tours, tourIndex, tourStepIndex } = getState();
    const steps = tours[tourIndex].steps;
    const tourStep = steps[removedTourStepIndex];
    if (!steps.length)
      Error('There is no steps to be removed');
    let nextTourStepIndex = tourStepIndex;
    if (removedTourStepIndex < tourStepIndex) {
      nextTourStepIndex--;
    } else if (removedTourStepIndex === tourStepIndex) {
      if (removedTourStepIndex) {
        nextTourStepIndex--;
      } else {
        nextTourStepIndex = steps.length > 1 ? 0 : -1;
      }
    }
    if (tourStep.isNew) {
      dispatch({
        type: 'DELETE_TOUR_STEP',
        removedTourStepIndex,
        nextTourStepIndex
      });
      dispatch({
        type: 'CHANGE_NOTIFICATION',
        message: `Step "${tourStep.name}" is removed`, // locally
        messageType: NOTIFICATION_TYPES.success
      });
      return Promise.resolve(true);
    }

    return tourStepService.deleteStep(tourStep.id).then(
      () => {
        dispatch({
          type: 'DELETE_TOUR_STEP',
          removedTourStepIndex,
          nextTourStepIndex
        });
        dispatch({
          type: 'TAKE_SNAPSHOT'
        });
        dispatch({
          type: 'CHANGE_NOTIFICATION',
          message: `Step "${tourStep.name}" is removed`,
          messageType: NOTIFICATION_TYPES.success
        });
        return true;
      },
      errorMessage => {
        dispatch({
          type: 'CHANGE_NOTIFICATION',
          message: `Step "${tourStep.name}" is not removed`,
          messageType: NOTIFICATION_TYPES.fail
        });
        console.log(errorMessage);
        return false;
      }
    );
  }
}