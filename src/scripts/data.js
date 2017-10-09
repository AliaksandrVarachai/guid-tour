function Tour({tourName, tourType, lastOpen, visitors, steps, creator}) {
  this.tourName = tourName;
  this.tourType = tourType;
  this.lastOpen = lastOpen;
  this.visitors = visitors;
  this.steps = steps;
  this.creator = creator;
}

let toursList = [
  new Tour({
    tourName: 'Example Tour',
    tourType: 'Tooltip',
    lastOpen: '01/01/2017', //TODO: transform to formatted date
    visitors: 0,
    steps: 2,
    creator: 'Botond Kopacz'
  }),
  new Tour({
    tourName: 'Self Service Certification',
    tourType: 'Training',
    lastOpen: '01/01/2017',
    visitors: 10,
    steps: 2,
    creator: 'Botond Kopacz'
  }),
  new Tour({
    tourName: 'Quick shortcut',
    tourType: 'Sortcut',
    lastOpen: '01/01/2017',
    visitors: 0,
    steps: 2,
    creator: 'Botond Kopacz'
  }),
];

export default {
  toursList
}
