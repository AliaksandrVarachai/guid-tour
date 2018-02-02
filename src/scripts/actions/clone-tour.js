import tourService from '../rest-api/services/tour-service';
import { NOTIFICATION_TYPES } from '../constants/tour-settings';

/**
 * Clones a selected tour with given index.
 * @param {number} tourIndex - tour index.
 * @param templateId - template ID where cloned tour is to be added.
 * @param userName - user clones the tour.
 * @returns {function(*): Promise.<boolean>}
 */
export function cloneTour(tourIndex, templateId, userName) {
  return (dispatch, getState) => {
    const tour = getState().tours[tourIndex];
    return tourService.cloneTour(tour.id, templateId, userName).then(
      (clonedTour) => {
        dispatch({
          type: 'CLONE_TOUR',
          tour: clonedTour
        });
        dispatch({
          type: 'CHANGE_NOTIFICATION',
          message: `Tour "${tour.name}" is cloned to "${clonedTour.name}"`,
          messageType: NOTIFICATION_TYPES.success
        });
        return true;
      },
      errorMessage => {
        dispatch({
          type: 'CHANGE_NOTIFICATION',
          message: `Tour "${tour.name}" is not cloned`,
          messageType: NOTIFICATION_TYPES.fail
        });
        console.log(errorMessage);
        return false;
      }
    );
  };
}
