let tourEditorSteps = [
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
        content: '<nav>Home|About|Help</nav><div>Content 1</div>'
      }, {
        tourStepName: 'Second Step',
        targetPage: 'Page <1>',
        targetControl: '-',
        content: '<p>Content 2</p>'
      }, {
        tourStepName: 'Third Step',
        targetPage: 'Page <1>',
        targetControl: '-',
        content: '<p>Content 3</p>'
      }
    ],
    settings: {  // TODO: add to every tour
      window: {
        style: 'A style name',
        width: 320,
        height: 320,
        orientation: 'center'
      }
    }
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
        content: '<nav>Home|About|Help</nav><div>Content 1</div>'
      }, {
        tourStepName: 'Second Step',
        targetPage: 'Page <1>',
        targetControl: '-',
        content: '<p>Content 2</p>'
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
        content: '<nav>Home|About|Help</nav><div>Content 1</div>'
      }, {
        tourStepName: 'Second Step',
        targetPage: 'Page <1>',
        targetControl: '-',
        content: '<p>Content 2</p>'
      }, {
        tourStepName: 'Third Step',
        targetPage: 'Page <1>',
        targetControl: '-',
        content: '<p>Content 3</p>'
      }, {
        tourStepName: 'Forth Step',
        targetPage: 'Page <1>',
        targetControl: '-',
        content: '<p>Content 4</p>'
      }
    ]
  },
];

export default {
  tourEditorSteps,
  tourList
}
