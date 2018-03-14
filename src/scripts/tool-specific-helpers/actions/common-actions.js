export function updateActiveTargetPage(getActiveTargetPageId) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_PRODUCT_ACTIVE_PAGE',
      pageId: getActiveTargetPageId()
    });
  };
}

export function updateActivePageTargetVisuals(getActivePageTargetVisuals) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_PRODUCT_ACTIVE_PAGE_VISUALS',
      visuals: getActivePageTargetVisuals()
    });
  };
}

export function updateTargetPages(getTargetPages) {
  return dispatch => {
    dispatch({
      type: 'UPDATE_PRODUCT_PAGES',
      pages: getTargetPages(),
    });
  };
}

export function addProductExpectedEvent(eventName, cbUuid) {
  return dispatch => {
    dispatch({
      type: 'ADD_PRODUCT_EXPECTED_EVENT',
      eventName,
      cbUuid
    });
  };
}

export function removeProductExpectedEvent(eventName) {
  return dispatch => {
    dispatch({
      type: 'REMOVE_PRODUCT_EXPECTED_EVENT',
      eventName,
    })
  };
}
