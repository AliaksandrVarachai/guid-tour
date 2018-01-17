import mergeCustomFields from '../helpers/merge-custom-fields';
import {
  TOUR_ID,
  LIBRARY_ITEM_ID,
  TEMPLATE_ID,
  PATH,
  COMPUTER_NAME,
  LAST_MODIFIED_TIME,
  USER_NAME,
  DOCUMENT_ID
} from '../helpers/default-settings';
const uuidv4 = require('uuid/v4');

const requiredFields = {
  tourId: TOUR_ID,
  isLibraryItem: false,
  libraryItemId: LIBRARY_ITEM_ID,
  templateId: TEMPLATE_ID,
  path: PATH,
  computerName: COMPUTER_NAME,
  lastModifiedTime: LAST_MODIFIED_TIME,
  userName: USER_NAME,
  documentId: DOCUMENT_ID,
};

/**
 * Provides saveTour object with all required fields.
 * @param {object} tour - origin tour.
 * @returns {object} - new saveTour object with filled required fields.
 */
export default function createSaveTour(tour) {
  return Object.assign(mergeCustomFields(requiredFields, tour), {
    id: uuidv4() // is generated on every save request
  });
}
