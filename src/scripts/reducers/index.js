// Mocked data
import { NOTIFICATION_TYPES } from '../constants/tour-settings';
import { setStateValue, setStateValues } from '../helpers/state-operations';
import { deepCopy } from '../helpers/deep-operations';

// TODO: replace pt with px
const COMPONENTS = {
  Config: {
    width: 500,
    units: 'pt',
    title: 'Guided Tour Configuration',
    componentProps: {
      // custom props are here
    },
    buttons: []
  },
  TourSettings: {
    width: 350,
    units: 'pt',
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
  targets: {
    pages: {},
    visuals: {}
  },
  // Synchronizes just locally added TourStep with DB (false between ADD_NEW_TOUR_STEP and SAVE_NEW_TOUR_STEP actions)
  //isTourStepDifferFromDb: false,
  notificationMessage: '',
  notificationType: NOTIFICATION_TYPES.empty
};

initState.snapShot = {
  tours: deepCopy(initState.tours),
  tourStepIndex: initState.tourStepIndex,
  tourIndex: initState.tourIndex,
};


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

    case 'GO_TO_STEP_EDITOR':
      const tourName = state.tours[action.tourIndex].name;
      state.COMPONENTS['StepEditor'].title = `Guided Tour Steps (${tourName})`;
      return setStateValues(state, [
        'tourIndex', action.tourIndex,
        'tourStepIndex', action.tourStepIndex,
        'componentName', 'StepEditor',
        'stepEditorIndex', 0
      ]);

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

    // sets a flag that user saved a tourStep to DB (both for new step and for updated step)
    case 'SAVE_TOUR_STEP': {
      const stepPath = `tours[${state.tourIndex}].steps[${state.tourStepIndex}]`;
      return setStateValues(state, [
        stepPath + '.isSynchronized', true,
        stepPath + '.isNew', false
      ]);
    }

    // set a flag that user made changes and tourStep differ from DB
    case 'CHANGE_TOUR_STEP': // action.propName & action.value is required
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

    // TODO: check for immutability with freeze
    case 'REORDER_TOUR_STEPS': {
      const steps = state.tours[state.tourIndex].steps;
      switch (action.order) {
        case 'MOVE_PREV': {
          const step = steps[action.index];
          if (action.index === 0)
            return state;
          const prevStep = steps[action.index - 1];
          return setStateValues(state, [
            `tours[${state.tourIndex}].steps[${action.index - 1}]`, step,
            `tours[${state.tourIndex}].steps[${action.index}]`, prevStep,
            'tourStepIndex', action.index - 1
          ]);
        }
        case 'MOVE_NEXT': {
          const step = steps[action.index];
          if (action.index === steps.length - 1)
            return state;
          const nextStep = steps[action.index + 1];
          return setStateValues(state, [
            `tours[${state.tourIndex}].steps[${action.index}]`, nextStep,
            `tours[${state.tourIndex}].steps[${action.index + 1}]`, step,
            'tourStepIndex', action.index + 1
          ]);
        }
        default:
          return state;
      }
    }

    case 'DELETE_TOUR_STEP': {
      const steps = state.tours[state.tourIndex].steps;
      return setStateValues(state, [
        `tours[${state.tourIndex}].steps`, steps.filter((step, inx) => inx !== action.removedTourStepIndex),
        'tourStepIndex', action.nextTourStepIndex
      ]);
    }

    case 'CLONE_TOUR_STEP': {;
      return setStateValues(state, [
        `tours[${state.tourIndex}].steps`, [...state.tours[state.tourIndex].steps, action.tourStep]
      ]);
    }

    case 'CHANGE_NOTIFICATION':
      return setStateValues(state, [
        'notificationMessage', action.message,
        'notificationType', action.messageType
      ]);

    case 'UPDATE_TARGETS':
      return setStateValue(state, 'targets', action.targets);

    default:
      return state;
  }
};
