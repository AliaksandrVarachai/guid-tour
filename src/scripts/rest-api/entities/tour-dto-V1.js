import mergeCustomFields from '../helpers/merge-custom-fields';
import {
  TOUR_ID,
  LAST_OPEN_DATE,
  TOUR_TYPE
} from '../helpers/default-settings';
const uuidv4 = require('uuid/v4');

const necessaryFields = {
  id: TOUR_ID,
  name: '',
  stepsCount: 0,
  type: TOUR_TYPE,
  countWrongAnswers: 0,
  lastOpenDate: LAST_OPEN_DATE,
  totalVisits: 0,
  visibility: true,
  steps: []
};

export default function SaveTourDto(tour) {
  Object.assign(this, mergeCustomFields(necessaryFields, tour), {
    // TODO: copy steps[] here
  });
}


// class TourDto {
//   constructor(tour){
//     this.id = tour.id;
//     this.name = tour.name;
//     this.stepsCount = tour.stepsCount;
//     this.type = tour.type;
//     this.countWrongAnswers = tour.countWrongAnswers;
//     this.lastOpenDate = tour.lastOpenDate;
//     this.totalVisits = tour.totalVisits;
//     this.visibility = tour.visibility;
//     this.steps = [];
//     self = this;
//     tour.steps.forEach(function(item, index) {
//       self.steps.push(new TourStepDto(item));
//     });
//   }
// }
