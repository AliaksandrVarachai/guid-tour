export function takeSnapshot() {
  return dispatch => {
    dispatch({
      type: 'TAKE_SNAPSHOT'
    });
  }
}

export function applySnapshot() {
  return dispatch => {
    dispatch({
      type: 'APPLY_SNAPSHOT'
    });
  }
}
