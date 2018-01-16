import communication from '../helpers/communication';
import converting from '../helpers/converting';
import TourDto from '../entities/tour-dto';
import SaveTourDto from '../entities/save-tour-dto';

/**
 * Gets list of all tours.
 * @returns {Promise<array>} - promise returning array of tours or empty array if there is no tours.
 */
function getAllTours() {
  return communication.get('api/Tours/all')
    .then(dtoTours => {
      return dtoTours.length ? converting.dtoToObject(dtoTours).map(dtoTour => new TourDto(dtoTour)) : [];
    });
}

/**
 * Gets tour by its ID.
 * @param {string} id - tour's ID.
 * @returns {Promise<object|null>} - promise returning tour object or null if there is no tour with given ID.
 */
function getTourById(id) {
  return communication.get(`api/Tours/single?tourId=${id}`)
    .then(dtoTour => {
      return dtoTour ? new TourDto(converting.dtoToObject(dtoTour)) : null;
    });
}

/**
 * Gets list of tours by template's ID.
 * @param {string} templateId - template's ID.
 * @returns {Promise<array>} - promise returning array of tours or empty array if there is no template with given ID.
 */
function getToursByTemplateId(templateId) {
  return communication.get(`api/Tours/template?templateId=${templateId}`)
    .then(dtoTours => {
      return dtoTours.length ? converting.dtoToObject(dtoTours).map(dtoTour => new TourDto(dtoTour)) : [];
    });
}

function updateTour(tour) {
  return communication.put('api/Tours/update', converting.dtoToObject(tour));
}

function addTour(tour) {
  // TODO: this data must be in tour
  //tour.lastOpenDate = (new Date(1900, 1, 1)).toISOString().slice(0, 19);
  //tour.id = '00000000-6000-0000-0000-000000000000'; // Guid.raw();
  //tour.steps = [];
  return communication.post('api/tours/add', converting.dtoToObject(tour))
    .then(() => {
      // TODO: this must be in potions
      //docOptions = {
      //  isLibraryItem: false,
      //  libraryItemId: '00000000-0000-0000-0000-000000000000',
      //  path: null,
      //  computerName: "comp",
      //  lastModifiedTime: tour.lastOpenDate,
      //  userName: "name",
      //  documentId: '00000000-6000-0000-0000-000000000000',
      //  templateId: '00000000-6000-0000-0000-000000000000'
      //}
      const docOptions = {};
      const saveTourDto = converting.dtoToObject(new SaveTourDto(tour), docOptions);
      return communication.post('api/Tours/save', saveTourDto);
    });
}

function deleteTourFromTemplate(tourId, templateId) {
  return communication.delete(`api/Tours/delete/${tourId}?templateid=${templateId}`);
}

export default {
  getAllTours,
  getTourById,
  getToursByTemplateId,
  updateTour,
  deleteTourFromTemplate
}
