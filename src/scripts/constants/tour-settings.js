const TOUR_TYPES = {
  tooltip: 'Tooltip',
  training: 'Training',
  shortcut: 'Shortcut'
};

const ORIENTATION = {
  CENTER: '0',
  LEFT: '1',
  RIGHT: '2',
  UP: '3',
  DOWN: '4'
};

const ORIENTATION_NAMES = (function(o) {
  return {
    [o.CENTER]: 'Center',
    [o.LEFT]: 'Left',
    [o.RIGHT]: 'Right',
    [o.UP]: 'Up',
    [o.DOWN]: 'Down'
  }
})(ORIENTATION);


const DEFAULT_NEW_TOUR_SETTINGS = {
  name: '',
  type: 'tooltip',
  visitors: 0,
  creator: 'Unknown User',
  steps: [],
};

const DEFAULT_NEW_STEP_SETTINGS = {
  name: '',
  style: '',
  width: 300,
  height: 300,
  orientation: ORIENTATION.CENTER,
};

const TOUR_EDITOR_STEPS = [
  {
    title: 'Tour Steps',
    details: 'Step #1 details',
    componentName: 'SE_TourSteps',
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
  ORIENTATION,
  ORIENTATION_NAMES,
  DEFAULT_NEW_TOUR_SETTINGS,
  DEFAULT_NEW_STEP_SETTINGS,
  TOUR_EDITOR_STEPS
}
