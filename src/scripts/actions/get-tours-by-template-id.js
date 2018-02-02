import tourService from '../rest-api/services/tour-service';

export function getToursByTemplateId(templateId) {
  return dispatch => tourService.getToursByTemplateId(templateId).then(
    tours => {
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
