import { ORIENTATION } from '../scripts/constants/tour-settings';
const { CENTER, LEFT, RIGHT, UP, DOWN } = ORIENTATION;

let tourList = [
  {
    tourName: 'Example Tour',
    tourType: 'tooltip',    // link to TOUR TYPES
    lastOpen: '01/01/2017', // TODO: transform to formatted date
    visitors: 0,
    creator: 'Botond Kopacz',
    steps: [
      {
        tourStepName: 'First Step',
        targetPage: 'Page <1>',
        targetControl: 'SampleBarChart',
        content: '<nav>Home|About|Help</nav><div>Content 1</div>',
        pageId: 'page-id-2',
        visualId: 'visual-id-5',
        style: 'Step #0 style',
        width: 320,
        height: 320,
        orientation: CENTER,
      }, {
        tourStepName: 'Second Step',
        targetPage: 'Page <2>',
        targetControl: '-',
        content: '<p>Content 2</p>',
        pageId: 'page-id-1',
        visualId: 'visual-id-2',
        style: 'Step #1 style',
        width: 321,
        height: 321,
        orientation: LEFT,
      }, {
        tourStepName: 'Third Step',
        targetPage: 'Page <1>',
        targetControl: '-',
        content: '<p>Content 3</p>',
        pageId: 'page-id-1',
        visualId: 'visual-id-3',
        style: 'Step #2 style',
        width: 322,
        height: 322,
        orientation: UP,
      }
    ]
  },
  {
    tourName: 'Self Service Certification',
    tourType: 'training',
    lastOpen: '01/01/2017',
    visitors: 10,
    creator: 'Botond Kopacz',
    steps: [
      {
        tourStepName: 'First Step',
        targetPage: 'Page <1>',
        targetControl: 'SampleBarChart',
        content: '<nav>Home|About|Help</nav><div>Content 1</div>',
        pageId: 'page-id-2',
        visualId: 'visual-id-5',
        style: 'Style #0',
        width: 320,
        height: 320,
        orientation: RIGHT,
      }, {
        tourStepName: 'Second Step',
        targetPage: 'Page <1>',
        targetControl: '-',
        content: '<p>Content 2</p>',
        pageId: 'page-id-2',
        visualId: 'visual-id-6',
        style: 'Style #1',
        width: 321,
        height: 321,
        orientation: LEFT,
      }
    ]
  },
  {
    tourName: 'Quick shortcut',
    tourType: 'shortcut',
    lastOpen: '01/01/2017',
    visitors: 0,
    creator: 'Botond Kopacz',
    steps: [
      {
        tourStepName: 'First Step',
        targetPage: 'Page <1>',
        targetControl: 'SampleBarChart',
        content: '<nav>Home|About|Help</nav><div>Content 1</div>',
        pageId: 'page-id-1',
        visualId: 'visual-id-1',
        style: 'Style #0',
        width: 320,
        height: 320,
        orientation: UP,
      }, {
        tourStepName: 'Second Step',
        targetPage: 'Page <1>',
        targetControl: '-',
        content: '<p>Content 2</p>',
        pageId: 'page-id-2',
        visualId: 'visual-id-5',
        style: 'Style #1',
        width: 321,
        height: 321,
        orientation: DOWN,
      }, {
        tourStepName: 'Third Step',
        targetPage: 'Page <1>',
        targetControl: '-',
        content: '<p>Content 3</p>',
        pageId: 'page-id-3',
        visualId: 'visual-id-8',
        style: 'Style #2',
        width: 322,
        height: 322,
        orientation: RIGHT,
      }, {
        tourStepName: 'Forth Step',
        targetPage: 'Page <1>',
        targetControl: '-',
        content: '<p>Content 4</p>',
        pageId: 'page-id-1',
        visualId: 'visual-id-2',
        style: 'Style #3',
        width: 323,
        height: 323,
        orientation: LEFT,
      }
    ]
  },
];

/**
 * BEGIN API response (just example and is not used in code)
 */
let tour = {
  Id: "37615833-57cd-4119-8a1c-5cd534c1da07",
  Name: "sample string 2",
  Steps: [
    /* steps are here */
  ],
  StepCount: 3,
  Type: "sample string 4",
  CountWrongAnswers: 5,
  LastOpenDate: "2018-01-05T19:22:10.0932229+01:00",
  TotalVisits: 7,
  Visibility: "sample string 1" // !!! NOT "<Visibility>k__BackingField" !!!
};

let step = {
  Id: "19f94d83-9616-42c5-aef5-4197d0c1a3bc",
  Name: "sample string 2",
  PageTitle: "sample string 3",
  Height: 4,
  Width: 5,
  MeasuredWidth: 6,
  MeasuredHeight: 7,
  HtmlContent: "sample string 8",
  StartUpScript: "sample string 9",
  Index: 10,
  PageId: "1c211365-de81-4406-b6fa-71a1a3718ba6",
  Orientation: 0,
  TourId: "661a292a-3f07-437b-87c1-c9aa5b34a4f3",
  TargetId: "b61a0265-65fc-41be-99c0-9d9df3007c40",
  VisualId: "606f522c-f95c-49fc-a2d0-3e98512380da",
  TargetType: 13,
  CustomStyle: "sample string 14",
  GuideId: "97033177-1347-4bb0-8a4e-e38f12f789cf",
  Title: "sample string 15",
  StyleId: "ab2f77c2-69d6-4efe-80ac-51661eae9ce9",
  CustomTargetId: "sample string 16",
  SubVisuals: {
  ControlId: "sample string 1",
    SubControlType: "sample string 2",
    SubControlDataType: "sample string 3",
    Name: "sample string 4",
    Value: "sample string 5",
    IsCustomControl: true
  },
  Validation: {
    IsActive: true,
    ValidationLogic: 2,
    FirstValue: 1.1,
    SecondValue: 1.1,
    ShowNotification: true,
    Message: "sample string 4",
    MatchString: "sample string 5"
  },
  IsToolTip: true
};
/** END API response (just example and is not used in code) */

export default {
  tourList
}
