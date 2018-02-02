import mergeCustomFields from './to-object-with-required-fields';
import { TOUR_STEP_DTO_REQUIRED_FIELDS } from '../../constants/tour-settings';

const requiredFields = {
  ...TOUR_STEP_DTO_REQUIRED_FIELDS
};

/**
 * Provides tour's step object with all required fields.
 * @param {object} tourStep - origin tour step.
 * @returns {object} - new tour step object with filled required fields.
 */
export default function toRequiredTourStepDto(tourStep) {
  return mergeCustomFields(requiredFields, tourStep);
}

