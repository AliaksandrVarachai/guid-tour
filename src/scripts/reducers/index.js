// Mocked data
import Data from '../../mocked-data/rest-data';
import { DEFAULT_NEW_TOUR_SETTINGS, DEFAULT_NEW_STEP_SETTINGS, TOUR_EDITOR_STEPS } from '../constants/tour-settings';
import { setStateValue, setStateValues } from '../helpers/state-operations';

const GUIDED_TOUR_INDEX = 0;  // TODO: add choice of guided tour by click;

// TODO: replace pt with px
const COMPONENTS = {
  Config: {
    width: 500,
    units: 'pt',
    title: 'Guided Tour Configuration',
    componentProps: {
      // custom props are here
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
    title: `Guided Tour Steps (${Data.tourList[GUIDED_TOUR_INDEX].tourName})`,
    componentName: 'StepEditor',
    componentProps: {
      // custom props are here
    },
    buttons: [
      {
        title: 'Save',
        key: 'save',
        onClick: 'onSave',
        className: 'action'
      }, {
        title: 'Previous',
        key: 'previous',
        onClick: 'onPrevious',
        className: 'action'
      }, {
        title: 'Next',
        key: 'next',
        onClick: 'onNext',
        className: 'action'
      }
    ]
  }
};

const initState = {
  isPopupShown: true, //false,
  componentName: 'StepEditor', //'Config',
  COMPONENTS,
  tours: Data.tourList,
  tourStepIndex: 0,
  tourIndex: 0,
  stepEditorIndex: 2,
  //TODO: have to be received?
  pageId: 'page-id-1', 
  visualId: 'visual-id-2',
};


export default (state = initState, action) => {
  switch (action.type) {
    case 'ON_CANCEL':
    case 'ON_CLOSE':
      return setStateValue(state, 'isPopupShown', false);

    case 'ON_SAVE':
      alert('ON_SAVE');
      return state;

    case 'ON_PREVIOUS':
    case 'ON_NEXT':
      const stepEditorIndex = state.stepEditorIndex;
      if (action.type === 'ON_PREVIOUS' && stepEditorIndex <= 0 ||
          action.type === 'ON_NEXT' && stepEditorIndex >= TOUR_EDITOR_STEPS.length - 1) {
        return state; // TODO: add disabled attribute
      }
      return setStateValue(
        state,
        `stepEditorIndex`,
        action.type === 'ON_NEXT' ? stepEditorIndex + 1 : stepEditorIndex - 1
      );

    case 'SHOW_POPUP':
      if (state.COMPONENTS[action.componentName] === undefined) {
        console.error(`Component "${componentName}" does not exist`);
        return state;
      }
      return setStateValues(state, [
        'isPopupShown', true,
        'componentName', action.componentName
      ]);

    case 'SAVE_NEW_TOUR':
      let now = new Date();
      const newTour = {
        ...DEFAULT_NEW_TOUR_SETTINGS,
        lastOpen: `${now.getDate()}/${now.getMonth()+1}/${now.getFullYear()}`, //TODO: store UTC but show local date
        tourName: action.tourName,
        tourType: action.tourType
      };
      const tourListLength = state.tours.length;
      return setStateValue(
        state,
        `tours[${tourListLength}]`,
        newTour
      );

    case 'SAVE_TOUR_CHANGES':
      return setStateValues(state, [
        `tours[${action.tourIndex}].tourName`, action.tourName,
        `tours[${action.tourIndex}].tourType`, action.tourType
        ]
      );

    case 'SAVE_TOUR':
      alert('SAVE_TOUR');
      return state;

    case 'CHANGE_TOUR_STEP_INDEX':
      return state.tourStepIndex !== action.index ? setStateValue(state, 'tourStepIndex', action.index) : state;

    case 'SAVE_NEW_TOUR_STEP':
      const newTourStep = {
        ...DEFAULT_NEW_STEP_SETTINGS,
        tourStepName: action.tourStepName
      };
      const tourStepListLength = state.tours[state.tourIndex].steps.length;
      return setStateValue(
        state,
        `tours[${state.tourIndex}].steps[${tourStepListLength}]`,
        newTourStep
      );

    case 'CHANGE_TOUR_STEP': // action.propName & action.value is required
      const stepPath = `tours[${state.tourIndex}].steps[${state.tourStepIndex}]`;
      const stepToPathMap = {
        tourStepName: 'tourStepName',
        style: stepPath + '.settings.window.style',
        width: stepPath + '.settings.window.width',
        height: stepPath + '.settings.window.height',
        orientation: stepPath + '.settings.window.orientation',
      };
      if (!stepToPathMap.hasOwnProperty(action.propName)) {
        console.warn(`dispatch "CHANGE_TOUR_STEP" must contain "action.propName" from the list: [${Object.keys(stepToPathMap).join()}]`);
        return state;
      }
      return setStateValue(
        state,
        stepToPathMap[action.propName],
        action.value
      );

    case 'SAVE_TOUR_STEP':
      alert('SAVE_TOUR_STEP');
      return state;

    default: {
      return state;
    }

  }
};
