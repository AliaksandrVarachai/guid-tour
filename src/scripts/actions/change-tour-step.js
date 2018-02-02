import { uuidFromString } from '../helpers/uuid-generator';

/**
 * Changes tour step's specific fields.
 * @param {object} changedProps - props to be changed, e.g. {propName1: 'str1', propName2: 42}.
 */
export function changeTourStep(changedProps) {
  return (dispatch, getState) => {
    Object.keys(changedProps).forEach(propName => {
      dispatch({
        type: 'CHANGE_TOUR_STEP',
        propName,
        value: changedProps[propName]
      });
      switch (propName) {
        case 'customTargetId':
          dispatch({
            type: 'CHANGE_TOUR_STEP',
            propName: 'targetId',
            value: uuidFromString(changedProps[propName])
          });
          break;
        case 'pageId':
          dispatch({
            type: 'CHANGE_TOUR_STEP',
            propName: 'customTargetId',
            value: '' // TODO: find the first item in the list
          });
          dispatch({
            type: 'CHANGE_TOUR_STEP',
            propName: 'targetId',
            value: uuidFromString('')  // TODO: generate ID for tne first item in the list
          });
          break;
        default:
          // do nothing
      }
    });
  }
}
