import mergeCustomFields from './to-object-with-required-fields';
import { TOUR_REQUIRED_FIELDS, TOUR_STEP_REQUIRED_FIELDS } from '../../constants/tour-settings';

const requiredFields = {
  ...TOUR_REQUIRED_FIELDS,
  steps: [TOUR_STEP_REQUIRED_FIELDS]
};

/**
 * Provides tour object with all required fields.
 * @param {object} tour - origin tour.
 * @returns {object} - new tour object with filled required fields.
 */
export default function toRequiredTour(tour) {
  return mergeCustomFields(requiredFields, tour);
}
