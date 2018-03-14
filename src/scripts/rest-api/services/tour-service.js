import communication from '../helpers/communication';
import objectKeyConverter from '../converters/object-key-converter';
import toRequiredTour from '../converters/to-required-tour';
import toRequiredSaveTour from '../converters/to-required-save-tour';

/**
 * Gets list of all tours.
 * @returns {Promise<array>} - promise returning array of tours or empty array if there is no tours.
 */
function getAllTours() {
  return communication.get('api/Tours/all')
    .then(dtoTours => {
      return dtoTours.length ? objectKeyConverter.dtoToObject(dtoTours).map(tour => toRequiredTour(tour)) : [];
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
      return dtoTour ? toRequiredTour(objectKeyConverter.dtoToObject(dtoTour)) : null;
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
      return dtoTours.length ? objectKeyConverter.dtoToObject(dtoTours).map(tour => toRequiredTour(tour)) : [];
    });
}

/**
 * Updates tour in DB.
 * @param {object} tour - tour to be updated by its id.
 * @returns {Promise.<boolean>} - promise returns true is success and false otherwise.
 */
function updateTour(tour) {
  return communication.put('api/Tours/update', objectKeyConverter.objectToDto(toRequiredTour(tour)))
    .then(() => {
      return true;
    }, errorMessage => {
      console.log(errorMessage);
      return false;
    });
}

/**
 * Updates tour last open date in DB.
 * @param {string} tourId - tour to be updated by its id.
 * @returs {Promise.<boolean>} - promise return true if success and false otherwise.
 */
function updateTourOpenDate(tourId) {
  return communication.put('api/tours/updateopendate', tourId)
    .then(result => {
      return result;
    }, errorMessage => {
      console.log(errorMessage);
      return false;
    });
}

/**
 * Clones a selected tour with given ID.
 * @param tourId - tour ID to be cloned.
 * @param templateId - template ID where cloned tour is to be added.
 * @param userName - user clones the tour.
 * @returns {Promise<object|null>} - promise returning tour object or null if cloning is failed.
 */
function cloneTour(tourId, templateId, userName) {
  return communication.post('api/Tours/clone', [tourId, templateId, userName])
    .then(dtoTour => {
      return dtoTour ? toRequiredTour(objectKeyConverter.dtoToObject(dtoTour)) : null;
    });
}

/**
 * Saves tour to DB.
 * @param {object} tour - tour need to be saved.
 * @returns {Promise.<TResult>|*} - response with empty body.
 */
function addTour(tour) {
  return communication.post('api/tours/add', objectKeyConverter.objectToDto(tour))
    .then((emptyResponse) => {
      const docOptions = {};
      const saveTourDto = objectKeyConverter.objectToDto(toRequiredSaveTour(tour), docOptions);
      return communication.post('api/Tours/save', saveTourDto);
    });
}

/**
 * Deletes tour from DB.
 * @param tourId - tour ID need to delete.
 * @param templateId - template ID contains the deleted tour.
 * @returns {*}
 */
function deleteTour(tourId, templateId) {
  return communication.delete(`api/Tours/delete/${tourId}?templateid=${templateId}`);
}

/**
 * Order tour steps in DB.
 * @param {string} tourId - tour identifier.
 * @param {Array<string>} tourStepIds - array of ordered step ids.
 * @returns {Promise<boolean>} - true if success.
 */
function orderTourSteps(tourId, tourStepIds) {
  return communication.post('api/Tours/updatetourstepsorder', objectKeyConverter.objectToDto({
    tourId : tourId,
    stepOrder : tourStepIds
  }))
    .then(isSuccess => isSuccess);
}


export default {
  getAllTours,
  getTourById,
  getToursByTemplateId,
  addTour,
  updateTour,
  updateTourOpenDate,
  cloneTour,
  deleteTour,
  orderTourSteps,
}
