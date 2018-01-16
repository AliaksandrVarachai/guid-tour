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

const necessaryFields = {
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

export default function SaveTourDto(tour, options) {
  Object.assign(this, mergeCustomFields(necessaryFields, tour), {
    id: uuidv4() // is generated on every save request
  });
}
