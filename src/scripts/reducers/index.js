'use strict';

// Mocked data
import { NOTIFICATION_TYPES } from '../constants/tour-settings';
import { deepFreeze, setStateValue, setStateValues } from '../helpers/state-operations';
import { deepCopy } from '../helpers/deep-operations';

// TODO: replace pt with px
const COMPONENTS = {
  Config: {
    width: 680,
    units: 'px',
    title: 'Guided Tour Configuration',
    componentProps: {
      // custom props are here
    },
    buttons: []
  },
  TourSettings: {
    width: 480,
    units: 'px',
    title: 'Tour Settings',
    componentName: 'TourSettings',
    componentProps: {
      // custom props are here
      somePropName: 'qwerty'
    },
    buttons: [
      {
        title: 'Cancel',
        key: 'cancel',
        onClick: 'onCancel',
        className: 'action'
      }, {
        title: 'Save',
        key: 'save',
        onClick: 'onSave',
        className: 'action'
      }
    ]
  },
  StepEditor: {
    width: 800,
    units: 'px',
    title: 'Guided Tour Steps',
    componentName: 'StepEditor',
    componentProps: {
      // custom props are here
    },
    buttons: [
      {
        title: 'Previous',
        key: 'previous',
        onClick: 'onPrevious',
        className: 'action'
      }, {
        title: 'Next',
        key: 'next',
        onClick: 'onNext',
        className: 'action'
      }, {
        title: 'Save',
        key: 'save',
        onClick: 'onSave',
        className: 'action'
      }
    ]
  },
  TourListLauncher: {
    width: 300,
    units: 'px',
    title: 'Available Tour List',
    componentName: 'TourListLauncher',
    componentProps: {
      // custom props are here
    },
    buttons: []
  }
};

const initState = {
  isPopupShown: false,
  componentName: 'Config',
  COMPONENTS,
  tours: [],
  tourStepIndex: 0,
  tourIndex: 0,
  stepEditorIndex: 0,
  // needed for synchronization with dynamic product's document
  product: {
    expectedEvents: {},
    // expectedEvents: {
    //   {'TAB_SWITCH': ['cb-uuid-1', 'cb-uuid-2']},
    //   {'ON_LOAD': ['cb-uuid-3']},
    // }
    // where uuid must be unique
    activePageId: '',
    pages: {}
    // pages: {
    //   [pageUuidId]: {
    //     title: 'Title',
    //     visuals: {
    //       [visualNodeId]: {
    //         title: 'Title'
    //       }
    //     }
    //   }
    // }
  },
  notificationMessage: '',
  notificationType: NOTIFICATION_TYPES.empty,
  isNewTourStepInProgress: false,
  isTourStepDraggingInProgress: false, // TODO: remove after user actions permission implementation
};

initState.snapShot = {
  tours: deepCopy(initState.tours),
  tourStepIndex: initState.tourStepIndex,
  tourIndex: initState.tourIndex,
};

deepFreeze(initState, true);


function shallowCopyRequiredFields(requiredFields, source) {
  if (typeof requiredFields !== 'object' || typeof source !== 'object')
    throw Error(`requiredFields and source must be objects but "${typeof requiredFields}" and "${typeof source}" provided`)
  return Object.keys(requiredFields).reduce((accum, key) => {
    accum[key] = source[key];
    return accum;
  }, {});
}

function createArrayForSetStateValues(requiredFields, source) {
  if (typeof requiredFields !== 'object' || typeof source !== 'object')
    throw Error(`requiredFields and source must be objects but "${typeof requiredFields}" and "${typeof source}" provided`)
  const result = [];
  Object.keys(requiredFields).forEach(key => {
    result.push(key, source[key]);
  });
  return result;
}

export default (state = initState, action) => {
  switch (action.type) {
    case 'TAKE_SNAPSHOT': {
      const {tours, tourIndex} = state;
      const synchronizedSteps = tours[tourIndex].steps.filter(step => !step.isNew && step.isSynchronized);
      return setStateValues(state, [
        'snapShot', shallowCopyRequiredFields(state.snapShot, state),  // all state (for any case)
        `snapShot.tours[${tourIndex}].steps`, synchronizedSteps
      ]);
    }

    case 'APPLY_SNAPSHOT':
      return setStateValues(state, createArrayForSetStateValues(state.snapShot, state.snapShot));

    case 'ON_CANCEL':
      return setStateValue(state, 'isPopupShown', false);

    case 'ON_SAVE':
      return state;

    case 'ON_PREVIOUS':
    case 'ON_NEXT':
      const stepEditorIndex = state.stepEditorIndex;
      return setStateValue(
        state,
        `stepEditorIndex`,
        action.type === 'ON_NEXT' ? stepEditorIndex + 1 : stepEditorIndex - 1
      );

    case 'CLOSE_POPUP':
      return setStateValue(state, 'isPopupShown', false);

    case 'SHOW_POPUP':
      if (state.COMPONENTS[action.componentName] === undefined) {
        console.error(`Component "${componentName}" does not exist`);
        return state;
      }
      return setStateValues(state, [
        'isPopupShown', true,
        'componentName', action.componentName
      ]);

    case 'GO_TO_CONFIG':
      return setStateValues(state, [
        'tourStepIndex', 0,
        'componentName', 'Config'
      ]);

    case 'GO_TO_STEP_EDITOR': {
      const tourName = state.tours[action.tourIndex].name;
      return setStateValues(state, [
        'COMPONENTS.StepEditor.title', `Guided Tour Steps (${tourName})`,
        'tourIndex', action.tourIndex,
        'tourStepIndex', action.tourStepIndex,
        'componentName', 'StepEditor',
        'stepEditorIndex', 0
      ]);
    }

    case 'LOAD_TOURS':
      return setStateValues(state, [
        'tours', action.tours,
        'tourIndex', 0,
        'tourStepIndex', 0,
        'stepEditorIndex', 0
      ]);

    case 'ADD_NEW_TOUR':
      const addedTourIndex = state.tours.length;
      return setStateValues(state, [
        `tours[${addedTourIndex}]`, action.tour,
        'tourIndex', addedTourIndex,
      ]);

    case 'CHANGE_TOUR':
      return setStateValue(state, `tours[${state.tourIndex}]`, action.tour);

    case 'CHANGE_TOUR_INDEX':
      return setStateValue(state, 'tourIndex', action.index);

    case 'SAVE_TOUR':
      alert('SAVE_TOUR');
      return state;

    case 'DELETE_TOUR':
      return setStateValues(state, [
        'tours', state.tours.filter((step, inx) => inx !== action.removedTourIndex),
        'tourIndex', action.nextTourIndex
      ]);

    case 'CLONE_TOUR':
      return setStateValue(
        state,
        'tours', [...state.tours, action.tour]
      );

    case 'CHANGE_TOUR_STEP_INDEX':
      return setStateValue(state, 'tourStepIndex', action.index);

    case 'ADD_NEW_TOUR_STEP': // adds tour step to the store locally (w/o saving to DB)
      const addedTourStepIndex = state.tours[state.tourIndex].steps.length;
      return setStateValues(state, [
        `tours[${state.tourIndex}].steps[${addedTourStepIndex}]`, action.tourStep,
        'tourStepIndex', addedTourStepIndex,
      ]);

    case 'CHANGE_IS_NEW_TOUR_STEP_IN_PROGRESS':
      return setStateValue(state, 'isNewTourStepInProgress', action.value);

    case 'START_TOUR_STEP_DRAGGING':
      return setStateValue(state, 'isTourStepDraggingInProgress', true);

    case 'STOP_TOUR_STEP_DRAGGING':
      return setStateValue(state, 'isTourStepDraggingInProgress', false);

    // sets a flag that user saved a tourStep to DB (both for new step and for updated step)
    case 'SAVE_TOUR_STEP': {
      const stepPath = `tours[${state.tourIndex}].steps[${state.tourStepIndex}]`;
      return setStateValues(state, [
        stepPath + '.isSynchronized', true,
        stepPath + '.isNew', false
      ]);
    }

    // sets a flag that user made changes and tourStep differ from DB
    // action.propName & action.value is required
    case 'CHANGE_TOUR_STEP': {
      const stepPath = `tours[${state.tourIndex}].steps[${state.tourStepIndex}]`;
      const stepToPathMap = {
        tourStepName: stepPath + '.name',
        styleId: stepPath + '.styleId',
        width: stepPath + '.width',
        height: stepPath + '.height',
        orientation: stepPath + '.orientation',
        pageId: stepPath + '.pageId',
        targetId: stepPath + '.targetId',
        customTargetId: stepPath + '.customTargetId',
        htmlContent: stepPath + '.htmlContent',
        isSynchronized: stepPath + '.isSynchronized',
        isNew: stepPath + '.isNew',
      };
      if (!stepToPathMap.hasOwnProperty(action.propName)) {
        console.warn(`dispatch "CHANGE_TOUR_STEP" must contain "action.propName" from the list: [${Object.keys(stepToPathMap).join()}]`);
        return state;
      }
      return setStateValues(state, [
        stepToPathMap[action.propName], action.value,
        stepToPathMap.isSynchronized, false,
      ]);
    }

    case 'ORDER_TOUR_STEPS': {
      const steps = state.tours[state.tourIndex].steps;
      const orderedSteps = action.originalIndexes.map((originalIndex, inx) => (
        { ...steps[originalIndex], index: inx}
      ));
      return setStateValue(
        state,
        `tours[${state.tourIndex}].steps`,
        orderedSteps
      );
    }

    case 'DELETE_TOUR_STEP': {
      const steps = state.tours[state.tourIndex].steps;
      return setStateValues(state, [
        `tours[${state.tourIndex}].steps`, steps.filter((step, inx) => inx !== action.removedTourStepIndex),
        'tourStepIndex', action.nextTourStepIndex
      ]);
    }

    case 'CLONE_TOUR_STEP': {
      return setStateValues(state, [
        `tours[${state.tourIndex}].steps`, [...state.tours[state.tourIndex].steps, action.tourStep]
      ]);
    }

    case 'CHANGE_NOTIFICATION':
      return setStateValues(state, [
        'notificationMessage', action.message,
        'notificationType', action.messageType
      ]);

    case 'UPDATE_PRODUCT_ACTIVE_PAGE':
      return setStateValue(state, 'product.activePageId', action.pageId);

    case 'UPDATE_PRODUCT_PAGES':
      return setStateValue(state, 'product.pages', action.pages);

    case 'UPDATE_PRODUCT_ACTIVE_PAGE_VISUALS':
      return setStateValue(state, `product.pages[${state.product.activePageId}].visuals`, action.visuals);

    case 'ADD_PRODUCT_EXPECTED_EVENT': {
      const callbacks = state.product.expectedEvents[action.eventName] || [];
      return setStateValue(
        state,
        'product.expectedEvents',
        { ...state.product.expectedEvents, [action.eventName]: [...callbacks, action.cbUuid] }
      );
    }

    case 'REMOVE_PRODUCT_EXPECTED_EVENT': {
      const { [action.eventName]: _, ...newExpectedEvents } = state.product.expectedEvents;
      return setStateValue(
        state,
        'product.expectedEvents',
        newExpectedEvents
      );
    }
    
    default:
      return state;
  }
};
