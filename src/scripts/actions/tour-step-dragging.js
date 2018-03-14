export function startTourStepDragging() {
  return dispatch => {
    dispatch({
      type: 'START_TOUR_STEP_DRAGGING',
    });
  }
}

export function stopTourStepDragging() {
  return dispatch => {
    dispatch({
      type: 'STOP_TOUR_STEP_DRAGGING',
    });
  }
}
