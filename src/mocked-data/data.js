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
    settings: {
      window: {
        style: 'A style name #1',
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
    ],
    settings: {
      window: {
        style: 'A style name #2',
        width: 320,
        height: 320,
        orientation: 'center'
      }
    }
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
    ],
    settings: {
      window: {
        style: 'A style name #3',
        width: 320,
        height: 320,
        orientation: 'center'
      }
    }
  },
];

export default {
  tourList
}
