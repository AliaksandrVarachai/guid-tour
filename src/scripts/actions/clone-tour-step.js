import tourStepService from '../rest-api/services/tour-step-service';
import { NOTIFICATION_TYPES } from '../constants/tour-settings';

export function cloneTourStep(tourStepIndex) {
  return (dispatch, getState) => { 
    const tourStep = getState().tours[getState().tourIndex].steps[tourStepIndex];
    if (!tourStep.isSynchronized) {
      alert("Cannot clone an unsaved step.");
    }
    else{
      return tourStepService.cloneStep(tourStep).then(
        clonedTourStep => {
    	    dispatch({
            type: 'CLONE_TOUR_STEP',
            tourStep: clonedTourStep
          });
          dispatch({
            type: 'TAKE_SNAPSHOT'
          });
          dispatch({
            type: 'CHANGE_NOTIFICATION',
            message: `Step "${clonedTourStep.name}" is cloned`,
            messageType: NOTIFICATION_TYPES.success
          });
          return true;
        },
        errorMessage => {
          dispatch({
          	type: 'CHANGE_NOTIFICATION',
          	message: `Step is not cloned`,
          	messageType: NOTIFICATION_TYPES.fail
          });
          console.log(errorMessage);
          return false;
        }
      );
    }
  }
}