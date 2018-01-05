// { value: visibleName }
const TOUR_TYPES = {
  tooltip: 'Tooltip',
  training: 'Training',
  shortcut: 'Shortcut'
};

const DEFAULT_NEW_TOUR_SETTINGS = {
  tourName: '',
  tourType: 'tooltip',
  visitors: 0,
  creator: 'Unknown User',
  steps: [],
  settings: {
    window: {
      style: 'A style name',
      width: 320,
      height: 320,
      orientation: 'center'
    }
  }
};

const DEFAULT_NEW_STEP_SETTINGS = {
  tourStepName: ''
};

const TOUR_EDITOR_STEPS = [
  {
    title: 'Tour Steps',
    details: 'Step #1 details',
    componentName: 'SE_TourSteps'
  }, {
    title: 'Step Detail',
    details: 'Step #2 details',
    componentName: 'SE_StepDetail'
  }, {
    title: 'Step Target',
    details: 'Step #3 details',
    componentName: 'SE_StepTarget'
  }, {
    title: 'Summary',
    details: 'Step #4 details',
    componentName: 'SE_Summary'
  }
];

export {
  TOUR_TYPES,
  DEFAULT_NEW_TOUR_SETTINGS,
  DEFAULT_NEW_STEP_SETTINGS,
  TOUR_EDITOR_STEPS
}
