export function setTourStepInProgress(value) {
  return dispatch => {
    dispatch({
      type: 'CHANGE_IS_NEW_TOUR_STEP_IN_PROGRESS',
      value
    });
  }
}
