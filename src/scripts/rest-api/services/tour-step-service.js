import communication from '../helpers/communication';
import objectKeyConverter from '../converters/object-key-converter';
import toRequiredTourStep from '../converters/to-required-tour-step';
import toRequiredTourStepDto from '../converters/to-required-tour-step-dto';

/**
 * Gets list of steps by tour's ID.
 * @param {string} tourId - tour's ID.
 * @returns {Promise<array>} - promise returning array of steps or empty array if there is no such tour or the tour does not contain steps.
 */
function getStepsByTourId(tourId) {
  return communication.get(`api/steps?tourId=${tourId}`)
    .then(dtoSteps => {
      return dtoSteps.length ? objectKeyConverter.dtoToObject(dtoSteps).map(step => toRequiredTourStep(step)) : [];
    });
}

/**
 * Gets a step by target's ID.
 * @param {string} targetId - target's ID.
 * @returns {Promise<object|null>} - promise returning step object or null if there is no such target ID.
 */
function getStepByTargetId(targetId) {
  return communication.get(`api/steps?targetId=${targetId}`)
    .then(dtoStep => {
      return dtoStep ? toRequiredTourStep(objectKeyConverter.dtoToObject(dtoStep)) : null;
    });
}

/**
 * Gets a step by step's ID.
 * @param {string} stepId - step's ID.
 * @returns {Promise<object|null>} - promise returning step object or null if there is no such step ID.
 */
function getStepById(stepId) {
  return communication.get(`api/steps/get/${stepId}`)
    .then(dtoStep => {
      return dtoStep ? toRequiredTourStep(objectKeyConverter.dtoToObject(dtoStep)) : null;
    });
}

/**
 * Adds steps to DB.
 * @param {object} tourStep - tour step need to be added to DB.
 * @returns {Promise<Object>} - tour step with the same ID as tourStep if success or with ID filled by zeros otherwise.
 */
function addStep(tourStep) {
  return communication.post('api/steps/add', objectKeyConverter.objectToDto(tourStep))
    .then(tourStepDto => toRequiredTourStep(objectKeyConverter.dtoToObject(tourStepDto)));
}

/**
 * Updates existing step in DB.
 * @param {object} tourStep - tour step.
 * @returns {Promise<Object>} - tour step added to DB.
 */
function updateStep(tourStep) {
  return communication.put('api/steps/update', objectKeyConverter.objectToDto(tourStep))
    .then(dtoTourStep => {
      return toRequiredTourStep(objectKeyConverter.dtoToObject(dtoTourStep))
    });
}

function cloneStep(tourStep) {
  return communication.post('api/Steps/clone', objectKeyConverter.objectToDto(tourStep))
    .then(dtoTourStep => {
      return toRequiredTourStep(objectKeyConverter.dtoToObject(dtoTourStep))
    });
}

function deleteStep(stepId) {
  return communication.delete(`api/Steps/delete/${stepId}`);
}

export default {
  getStepsByTourId,
  getStepByTargetId,
  getStepById,
  addStep,
  updateStep,
  cloneStep,
  deleteStep
}
