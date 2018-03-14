import * as commonActions from './common-actions';

export function activateSheetAsync(targetPageId, modifyTourStepPageId = false) {
  return (dispatch, getState) => {
    // it does nothing
  }
}

export function updateActiveTargetPage() {}

export function updateActivePageTargetVisuals() {}

export function updateTargetPages() {}

export {
  addProductExpectedEvent,
  removeProductExpectedEvent,
} from './common-actions';
