import mergeCustomFields from '../helpers/merge-custom-fields';
import {
  TOUR_ID,
  LAST_OPEN_DATE,
  TOUR_TYPE
} from '../helpers/default-settings';
const uuidv4 = require('uuid/v4');

const requiredFields = {
  id: TOUR_ID,
  name: '',
  stepsCount: 0,
  type: TOUR_TYPE,
  countWrongAnswers: 0,
  lastOpenDate: LAST_OPEN_DATE,
  totalVisits: 0,
  visibility: true,
  steps: [],
};

/**
 * Provides tour object with all required fields.
 * @param {object} tour - origin tour.
 * @returns {object} - new tour object with filled required fields.
 */
export default function createTour(tour) {
  return mergeCustomFields(requiredFields, tour);
}
