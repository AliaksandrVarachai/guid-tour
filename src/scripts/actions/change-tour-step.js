import { uuidFromString } from '../helpers/uuid-generator';

/**
 * Changes tour step's specific fields.
 * @param {object} changedProps - props to be changed, e.g. {propName1: 'str1', propName2: 42}.
 */
export function changeTourStep(changedProps) {
  return (dispatch, getState) => {
    Object.keys(changedProps).forEach(propName => {
      const value = changedProps[propName];
      dispatch({
        type: 'CHANGE_TOUR_STEP',
        propName,
        value
      });
      switch (propName) {
        case 'customTargetId':
          dispatch({
            type: 'CHANGE_TOUR_STEP',
            propName: 'targetId',
            value: uuidFromString(value)
          });
          dispatch({
            type: 'CHANGE_TOUR_STEP',
            propName: 'customTargetId',
            value
          });
          break;
        case 'pageId':
          const visualId = Object.keys(getState().product.pages[value].visuals)[0];
          if (visualId === undefined)
            throw Error('The page does not have any visuals to add to the step');
          dispatch({
            type: 'CHANGE_TOUR_STEP',
            propName: 'targetId',
            value: uuidFromString(visualId)
          });
          dispatch({
            type: 'CHANGE_TOUR_STEP',
            propName: 'customTargetId',
            value: visualId
          });
          break;
        default:
          // do nothing
      }
    });
  }
}
