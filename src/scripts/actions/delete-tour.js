import tourService from '../rest-api/services/tour-service';
import documentMetaInfo from '../tool-specific-helpers/document-meta-info';
import { NOTIFICATION_TYPES } from '../constants/tour-settings';

export function deleteTour(removedTourIndex) {
  return (dispatch, getState) => {
    const { tours, tourIndex} = getState();
    const tour = tours[removedTourIndex];
    if (!tours.length)
      Error('There is no tours to be removed');
    let nextTourIndex = tourIndex;
    if (removedTourIndex < tourIndex) {
      nextTourIndex--;
    } else if (removedTourIndex === tourIndex) {
      if (removedTourIndex) {
        nextTourIndex--;
      } else {
        nextTourIndex = tours.length > 1 ? 0 : -1;
      }
    }
    return tourService.deleteTour(tour.id, documentMetaInfo.getTemplateId()).then(
      () => {
        dispatch({
          type: 'DELETE_TOUR',
          removedTourIndex,
          nextTourIndex
        });
        dispatch({
          type: 'CHANGE_NOTIFICATION',
          message: `Tour "${tour.name}" is removed`,
          messageType: NOTIFICATION_TYPES.success
        });
        return true;
      },
      errorMessage => {
        dispatch({
          type: 'CHANGE_NOTIFICATION',
          message: `Tour "${tour.name}" is not removed`,
          messageType: NOTIFICATION_TYPES.error
        });
        console.log(errorMessage);
        return false;
      }
    );
  }
}
