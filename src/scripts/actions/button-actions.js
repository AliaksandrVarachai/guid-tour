import tourService from '../rest-api/services/tour-service';
import tourStepService from '../rest-api/services/tour-step-service';
import { TOUR_EDITOR_STEPS, NOTIFICATION_TYPES } from '../constants/tour-settings';
import { validateTourStep } from '../helpers/validators';
import { isTourSynchronized } from '../helpers/synchronized-validators';

export function goToConfig() {
  return dispatch => {
    dispatch({
      type: 'GO_TO_CONFIG'
    });
  }
}

/**
 * Opens Step Editor popup for a selected tour.
 * @param {number} [tourIndex = -1] - tour index (if it omitted then will be get from store).
 * @param tourStepIndex [tourStepIndex = 0] - tour step index.
 * @returns {function(*, *)}
 */
export function goToStepEditor(tourIndex = -1, tourStepIndex = 0) {
  return (dispatch, getState) => {
    if (tourIndex < 0)
      tourIndex = getState().tourIndex;
    if (isTourSynchronized(getState().tours[tourIndex])) {
      dispatch({
        type: 'TAKE_SNAPSHOT'
      });
      // dispatch({
      //   type: 'CHANGE_NOTIFICATION',
      //   message: 'Snapshot is created',
      //   messageType: NOTIFICATION_TYPES.success
      // });
    }
    dispatch({
      type: 'GO_TO_STEP_EDITOR',
      tourIndex,
      tourStepIndex
    });
  }
}

/**
 * Go to next step in Step Editor.
 * @returns {function(*, *)}
 */
export function goToNextStepEditor() {
  return (dispatch, getState) => {
    if (getState().stepEditorIndex < TOUR_EDITOR_STEPS.length - 1) {
      dispatch({
        type: 'ON_NEXT'
      });
    }
  }
}

/**
 * Go to previous step in Step Editor.
 * @returns {function(*, *)}
 */
export function goToPreviousStepEditor() {
  return (dispatch, getState) => {
    if (getState().stepEditorIndex > 0) {
      dispatch({
        type: 'ON_PREVIOUS'
      });
    }
  }
}

/**
 * Cancels the current operation without data saving.
 * @returns {function(*, *)}
 */
export function cancelOperation() {
  return (dispatch, getState) => {
    dispatch({
      type: 'ON_CANCEL'
    });
  }
}

/**
 * Closes Guided Tour popup.
 * @returns {function(*, *)}
 */
export function closePopup() {
  return (dispatch, getState) => {
    const { componentName, tours, tourIndex, tourStepIndex, stepEditorIndex } = getState();
    switch (componentName) {
      case 'StepEditor':
        if (!isTourSynchronized(tours[tourIndex])) {
          const step = tours[tourIndex].steps[tourStepIndex];
          if (confirm(`Your changes in steps are not saved. Do you really want to discard the changes?`)) {
            dispatch({
              type: 'APPLY_SNAPSHOT'
            });
            // dispatch({
            //   type: 'CHANGE_NOTIFICATION',
            //   message: 'State is restored from snapshot',
            //   messageType: NOTIFICATION_TYPES.success
            // });
          } else {
            break;
          }
        }
        if (stepEditorIndex === 0) {
          dispatch({
            type: 'GO_TO_CONFIG'
          });
        } else {
          dispatch({
            type: 'GO_TO_STEP_EDITOR',
            tourIndex: tourIndex,
            tourStepIndex: getState().tourStepIndex
          });
        }
        break;
      default:
        dispatch({
          type: 'CLOSE_POPUP'
        });
    }
  }
}

/**
 * Saves data from the store to DB.
 * @returns {function(*, *)}
 */
// TODO: move logic from button-actions (and reorder action creators to not duplicate them)
export function saveData() {
  return (dispatch, getState) => {
    const { componentName, stepEditorIndex, tourIndex, tourStepIndex, tours } = getState();
    switch(componentName) {
      case 'StepEditor':
        if (stepEditorIndex === TOUR_EDITOR_STEPS.length - 1) {
          const tourStep = tours[tourIndex].steps[tourStepIndex];
          return tourStep.isNew ? saveNewTourStep(tourStep, dispatch, getState) : updateTourStep(tourStep, dispatch, getState);
        }
        alert('You can save the step only on Summary page');
        break;
      default:
        console.log('ON_SAVE functionality is not implemented yet');
    }
  }
}

/**
 * Saves a tour's step to DB then dispatches an action for the store.
 * @param {number} tourStep - tour step index.
 * @param {function} dispatch - Redux dispatch function.
 * @param {function} getState - Redux getState function.
 * @returns {function(*): Promise.<boolean>}
 */
function saveNewTourStep(tourStep, dispatch, getState) {
  const { tourIndex, tourStepIndex } = getState();
  tourStep.name = tourStep.name.trim();
  const validation = validateTourStep(tourStep);
  if (!validation.valid) {
    dispatch({
      type: 'CHANGE_NOTIFICATION',
      message: validation.message,
      messageType: NOTIFICATION_TYPES.warning
    });
    return Promise.resolve(validation.message);
  }
  return tourStepService.addStep(tourStep).then(
    (addedStep) => {
      dispatch({
        type: 'SAVE_TOUR_STEP'
      });
      dispatch({
        type: 'TAKE_SNAPSHOT'
      });
      dispatch({
        type: 'GO_TO_STEP_EDITOR',
        tourIndex,
        tourStepIndex,
      });
      dispatch({
        type: 'CHANGE_NOTIFICATION',
        message: `Step "${tourStep.name}" is saved`,
        messageType: NOTIFICATION_TYPES.success
      });
      return true;
    },
    errorMessage => {
      dispatch({
        type: 'CHANGE_NOTIFICATION',
        message: errorMessage,
        messageType: NOTIFICATION_TYPES.fail
      });
      return false;
    }
  );
}

function updateTourStep(tourStep, dispatch, getState) {
  const { tourIndex, tourStepIndex } = getState();
  tourStep.name = tourStep.name.trim();
  const validation = validateTourStep(tourStep);
  if (!validation.valid) {
    dispatch({
      type: 'CHANGE_NOTIFICATION',
      message: validation.message,
      messageType: NOTIFICATION_TYPES.warning
    });
    return Promise.resolve(validation.message);
  }
  return tourStepService.updateStep(tourStep).then(
    (addedStep) => {
      dispatch({
        type: 'SAVE_TOUR_STEP'
      });
      dispatch({
        type: 'TAKE_SNAPSHOT'
      });
      dispatch({
        type: 'GO_TO_STEP_EDITOR',
        tourIndex,
        tourStepIndex,
      });
      dispatch({
        type: 'CHANGE_NOTIFICATION',
        message: `Step "${tourStep.name}" is updated`,
        messageType: NOTIFICATION_TYPES.success
      });
      return true;
    },
    errorMessage => {
      dispatch({
        type: 'CHANGE_NOTIFICATION',
        message: errorMessage,
        messageType: NOTIFICATION_TYPES.fail
      });
      return false;
    }
  );
}
