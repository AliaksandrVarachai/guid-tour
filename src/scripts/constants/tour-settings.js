const EMPTY_ID = '00000000-0000-0000-0000-000000000000';

const TOUR_TYPES = [
  // 'Exam',
  // 'MSTR_Default_Tour',
  // 'MSTR_Tour',
  // 'TABLEAU_Tour',
  // 'TABLEAU_Default_Tour',
  // 'TitleButtons',
  // 'Tooltip',
  'Tour',
  // 'Training',
  // 'Shortcuts',
];

const DEFAULT_TOUR_TYPE = TOUR_TYPES.indexOf('Tour') > -1 ? 'Tour' : TOUR_TYPES[0];
const DEFAULT_DATE = new Date('2000-01-01T00:00:00Z').toISOString();

const ORIENTATION = {
  CENTER: 0,
  LEFT: 1,
  RIGHT: 2,
  UP: 3,
  DOWN: 4
};

const VISIBILITY = {
  everyone: 'Everyone',
  onlyMe: 'Only me'
};

const ORIENTATION_NAMES = {
  [ORIENTATION.CENTER]: 'Center',
  [ORIENTATION.LEFT]: 'Left',
  [ORIENTATION.RIGHT]: 'Right',
  [ORIENTATION.UP]: 'Up',
  [ORIENTATION.DOWN]: 'Down'
};


const TOUR_REQUIRED_FIELDS = {
  id: '',
  name: '',
  type: DEFAULT_TOUR_TYPE,
  lastOpenDate: DEFAULT_DATE,
  totalVisits: 0,
  creator: 'Unknown User',
  steps: [],
};

const TOUR_DTO_REQUIRED_FIELDS = TOUR_REQUIRED_FIELDS;

const SAVE_TOUR_REQUIRED_FIELDS = {
  id: '',
  tourId: '',
  isLibraryItem: true,
  libraryItemId: '',
  templateId: '',
  path: '',
  computerName: '',
  lastModifiedTime: DEFAULT_DATE,
  userName: 'Unknown User',
  visibility: VISIBILITY.everyone,
};

const TOUR_STEP_REQUIRED_FIELDS = {
  id: '',
  name: '',
  height: 300,
  width: 300,
  htmlContent: '',
  pageId: '',
  orientation: ORIENTATION.CENTER,
  tourId: '',
  targetId: '', 
  customTargetId: '',
  customStyle: '',
  styleId: EMPTY_ID,
  guideId: '',
  index: 1,
  // TODO: remove extra field from request to DB
  isSynchronized: true, // sync changes with DB
  isNew: false,       // check new added but not yet saved in DB (to border 'add' or 'update' API methods)


  // id: "",
  // name: "Updated name",
  // pageTitle: '',
  // height: 0,
  // width: 0,
  // measuredWidth: 200,
  // measuredHeight: 100,
  // htmlContent: "",
  // startUpScript: '',
  // index: 1,
  // pageId: "c280386d-1dab-4adc-9645-48d6f3d79229",
  // orientation: 0,
  // tourId: "00000000-1000-0000-0000-000000000000",
  // targetId: "00000000-1000-0000-0000-000000000000",
  // customTargetId: "00000000-1000-0000-0000-000000000000",
  // targetType: 1,
  // customStyle: '',
  // guideId: "00000000-1000-0000-0000-000000000000",
  // title: "New step",
  // styleId: "00000000-0000-0000-0000-000000000000",
  // customTargetId: "00000000-1000-0000-0000-000000000000",
  // subVisuals: null,
  // validation: null,
  // isToolTip: false
};

const TOUR_STEP_DTO_REQUIRED_FIELDS = TOUR_STEP_REQUIRED_FIELDS;

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

const NOTIFICATION_TYPES = {
  empty: 0,
  success: 1,
  info: 2,
  warning: 3,
  fail: 4,
};

//local test constants:
const LOCAL_TEST_TEMPLATE_ID = '66feb9b8-0a65-4a7d-a303-ad529161176b';
//const LOCAL_TEST_TEMPLATE_ID = '1dd9617f-6d4e-404d-b764-fc39c953206d';
const LOCAL_TEST_PAGE_ID = LOCAL_TEST_TEMPLATE_ID;


export {
  TOUR_TYPES,
  ORIENTATION,
  ORIENTATION_NAMES,
  TOUR_REQUIRED_FIELDS,
  TOUR_DTO_REQUIRED_FIELDS,
  SAVE_TOUR_REQUIRED_FIELDS,
  TOUR_STEP_REQUIRED_FIELDS,
  TOUR_STEP_DTO_REQUIRED_FIELDS,
  TOUR_EDITOR_STEPS,
  NOTIFICATION_TYPES,
  //local test constants:
  LOCAL_TEST_TEMPLATE_ID,
  LOCAL_TEST_PAGE_ID,
}
