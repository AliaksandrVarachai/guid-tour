import tourService from '../rest-api/services/tour-service';

// TODO: replace array with ID (it's a mock to check added steps)
export function getTourById(tourId) {
  return dispatch => tourService.getTourById(tourId).then(
    tour => {
      dispatch({
        type: 'LOAD_TOURS',
        tours: [tour]
      });
      return tour;
    },
    errorMessage => {
      console.log(errorMessage);
      return [];
    }
  );
}
