import { TOUR_REQUIRED_FIELDS, NOTIFICATION_TYPES } from '../constants/tour-settings';
import tourService from '../rest-api/services/tour-service';
const uuidv4 = require('uuid/v4');

/**
 * Saves a new tour to DB then dispatches an action for the store.
 * @param tourName - tour name.
 * @param tourType - tour type.
 * @returns {function(*): Promise.<boolean>}
 */
export function addAndSaveNewTour(tourName, tourType) {
  return dispatch => {
    const newTour = {
      ...TOUR_REQUIRED_FIELDS,
      id: uuidv4(),
      lastOpenDate: "1900-01-01T00:00:00",
      name: tourName,
      type: tourType
    };
    return tourService.addTour(newTour).then(
      () => {
        dispatch({
          type: 'ADD_NEW_TOUR',
          tour: newTour
        });
        dispatch({
          type: 'CHANGE_NOTIFICATION',
          message: `Tour "${tourName}" is successfully saved`,
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
