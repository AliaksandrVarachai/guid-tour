import tourService from '../rest-api/services/tour-service';

export function getToursByTemplateId(templateId) {
  return dispatch => tourService.getToursByTemplateId(templateId).then(
    tours => {
      tours.sort((a, b) => a.name.localeCompare(b.name, {sensitivity: 'accent'}));
      tours.forEach(tour => tour.steps.sort((a, b) => a.index - b.index));
      dispatch({
        type: 'LOAD_TOURS',
        tours
      });
      return tours;
    },
    errorMessage => {
      console.log(errorMessage);
      return [];
    }
  );
}
