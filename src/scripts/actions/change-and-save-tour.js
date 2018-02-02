import { NOTIFICATION_TYPES } from '../constants/tour-settings';
import tourService from '../rest-api/services/tour-service';
import { deepCopy } from '../helpers/deep-operations';

/**
 * Saves a changed current tour to DB then dispatches an action for the store.
 * @param tourIndex - tour index.
 * @param tourName - tour name.
 * @param tourType - tour type.
 * @returns {function(*): Promise.<boolean>}
 */
export function changeAndSaveTour(tourIndex, tourName, tourType) {
  return (dispatch, getState) => {
    dispatch({
      type: 'CHANGE_TOUR_INDEX',
      index: tourIndex
    });
    const { tours } = getState();
    const changedTour = Object.assign(deepCopy(tours[tourIndex]), {
      name: tourName,
      type: tourType
    });
    return tourService.updateTour(changedTour).then(
      () => {
        dispatch({
          type: 'CHANGE_TOUR',
          tour: changedTour
        });
        dispatch({
          type: 'CHANGE_NOTIFICATION',
          message: `Tour "${tourName}" is successfully updated`,
          messageType: NOTIFICATION_TYPES.success
        });
        return true;
      },
      errorMessage => {
        dispatch({
          type: 'CHANGE_NOTIFICATION',
          message: errorMessage,
          messageType: NOTIFICATION_TYPES.fail
        });
        return false;
      }
    );
  }
}
