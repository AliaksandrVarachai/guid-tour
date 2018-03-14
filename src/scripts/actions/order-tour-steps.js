import tourService from '../rest-api/services/tour-service';
import { showMessage } from './show-message';

/**
 * Orders tour steps in DB.
 * @param {array} originalIndexes - tour steps original indexes ordered by user.
 */
export function orderTourSteps(originalIndexes) {
  return (dispatch, getState) => {
    const {tours, tourIndex} = getState();
    const steps = tours[tourIndex].steps;
    const tourStepIds = originalIndexes.map(originalIndex => steps[originalIndex].id);
    return tourService.orderTourSteps(tours[tourIndex].id, tourStepIds).then(
      isSuccess => {
        if (isSuccess) {
          dispatch({
            type: 'ORDER_TOUR_STEPS',
            originalIndexes
          });
        } else {
          showMessage('Reordering of tours is declined by the server', 'fail');
        }
        return isSuccess;
      },
      errorMessage => {
        console.log(errorMessage);
        return false;
      }
    );
  }
}