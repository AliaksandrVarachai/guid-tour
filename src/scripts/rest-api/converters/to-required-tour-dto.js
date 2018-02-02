import mergeCustomFields from './to-object-with-required-fields';
import { TOUR_DTO_REQUIRED_FIELDS, TOUR_STEP_DTO_REQUIRED_FIELDS } from '../../constants/tour-settings';

const requiredFields = {
  ...TOUR_DTO_REQUIRED_FIELDS,
  steps: [TOUR_STEP_DTO_REQUIRED_FIELDS]
};

/**
 * Provides tour object with all required fields.
 * @param {object} tour - origin tour.
 * @returns {object} - new tour object with filled required fields.
 */
export default function toRequiredTourDto(tour) {
  return mergeCustomFields(requiredFields, tour);
}
