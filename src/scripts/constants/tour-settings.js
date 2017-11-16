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

export {
  TOUR_TYPES,
  DEFAULT_NEW_TOUR_SETTINGS
}
