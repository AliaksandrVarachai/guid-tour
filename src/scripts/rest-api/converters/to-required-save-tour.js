import mergeCustomFields from './to-object-with-required-fields';
import { SAVE_TOUR_REQUIRED_FIELDS } from '../../constants/tour-settings';
import documentMetaInfo from '../../tool-specific-helpers/document-meta-info';
const uuidv4 = require('uuid/v4');

const requiredFields = {
  ...SAVE_TOUR_REQUIRED_FIELDS,
};

/**
 * Provides saveTour object with all required fields.
 * @param {object} tour - origin tour.
 * @returns {object} - new saveTour object with filled required fields.
 */
export default function toRequiredSaveTour(tour) {
  return Object.assign(mergeCustomFields(requiredFields, tour), {
    id: uuidv4(),
    tourId: tour.id,
    templateId: documentMetaInfo.getTemplateId()
  });
}
