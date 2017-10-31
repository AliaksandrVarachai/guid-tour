function Tour({tourName, tourType, lastOpen, visitors, steps, creator}) {
  this.tourName = tourName;
  this.tourType = tourType;
  this.lastOpen = lastOpen;
  this.visitors = visitors;
  this.steps = steps;
  this.creator = creator;
}

let tourList = [
  new Tour({
    tourName: 'Example Tour',
    tourType: 'Tooltip',
    lastOpen: '01/01/2017', //TODO: transform to formatted date
    visitors: 0,
    creator: 'Botond Kopacz',
    steps: [
      {
        title: 'Tour Steps',
        details: 'Step #1 details'
      }, {
        title: 'Step Detail',
        details: 'Step #2 details'
      }, {
        title: 'Step Target',
        details: 'Step #3 details'
      }, {
        title: 'Summary',
        details: 'Step #4 details'
      }
    ]
  }),
  new Tour({
    tourName: 'Self Service Certification',
    tourType: 'Training',
    lastOpen: '01/01/2017',
    visitors: 10,
    creator: 'Botond Kopacz',
    steps: [
      {
        title: 'Tour Steps',
        details: 'Step #1 details'
      }, {
        title: 'Step Detail',
        details: 'Step #2 details'
      }, {
        title: 'Step Target',
        details: 'Step #3 details'
      }
    ]
  }),
  new Tour({
    tourName: 'Quick shortcut',
    tourType: 'Sortcut',
    lastOpen: '01/01/2017',
    visitors: 0,
    creator: 'Botond Kopacz',
    steps: [
      {
        title: 'Tour Steps',
        details: 'Step #1 details'
      }, {
        title: 'Step Detail',
        details: 'Step #2 details'
      }
    ]
  }),
];

export default {
  tourList
}
