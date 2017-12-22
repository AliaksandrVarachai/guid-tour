// Mocked data
import Data from '../../mocked-data/data';
import { DEFAULT_NEW_TOUR_SETTINGS } from '../constants/tour-settings';
import { setStateValue, setStateValues } from '../helpers/state-operations';

const GUIDED_TOUR_INDEX = 0;  // TODO: add choice of guided tour by click;

// TODO: replace pt with px
const COMPONENTS = {
  Config: {
    width: 500,
    units: 'pt',
    title: 'Guided Tour Configuration',
    componentProps: {
      tourList: Data.tourList
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
      tourEditorSteps: Data.tourEditorSteps,
      tourSteps: Data.tourList[GUIDED_TOUR_INDEX].steps,
      currentTourEditorStepIndex: 0,
      settings: Data.tourList[GUIDED_TOUR_INDEX].settings,
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
  componentName: 'Config',
  COMPONENTS,
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
      const currentTourEditorStepIndex = state.COMPONENTS[state.componentName].componentProps.currentTourEditorStepIndex;
      if (action.type === 'ON_PREVIOUS' && currentTourEditorStepIndex <= 0 ||
          action.type === 'ON_NEXT' && currentTourEditorStepIndex >= Data.tourEditorSteps.length - 1) {
        return state; // TODO: add disabled attribute
      }
      return setStateValue(
        state,
        `COMPONENTS[${state.componentName}]componentProps.currentTourEditorStepIndex`,
        action.type === 'ON_NEXT' ? currentTourEditorStepIndex + 1 : currentTourEditorStepIndex - 1
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
      const tourListLength = state.COMPONENTS.Config.componentProps.tourList.length;
      return setStateValue(
        state,
        `COMPONENTS.Config.componentProps.tourList[${tourListLength}]`,
        newTour
      );

    case 'SAVE_TOUR_CHANGES':
      return setStateValues(state, [
        `COMPONENTS.Config.componentProps.tourList[${action.tourIndex}].tourName`, action.tourName,
        `COMPONENTS.Config.componentProps.tourList[${action.tourIndex}].tourType`, action.tourType
        ]
      );

    case 'SAVE_TOUR':
      alert('SAVE_TOUR');
      return state;

    default: {
      return state;
    }

  }
};
