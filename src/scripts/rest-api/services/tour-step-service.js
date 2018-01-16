import communication from '../helpers/communication';
import converting from '../helpers/converting';
import TourStepDto from '../entities/tour-step-dto';

/**
 * Gets list of steps by tour's ID.
 * @param {string} tourId - tour's ID.
 * @returns {Promise<array>} - promise returning array of steps or empty array if there is no such tour or the tour does not contain steps.
 */
function getStepsByTourId(tourId) {
  return communication.get(`api/steps?tourId=${tourId}`)
    .then(dtoSteps => {
      return dtoSteps.length ? converting.dtoToObject(dtoSteps).map(dtoStep => new TourStepDto(dtoStep)) : [];
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
      return dtoStep ? new TourStepDto(converting.dtoToObject(dtoStep)) : null;
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
      return dtoStep ? new TourStepDto(converting.dtoToObject(dtoStep)) : null;
    });
}

function addStep(tourStep) {
  return communication.post('api/steps/add', converting.dtoToObject(tourStep))
    .then(data => new TourStepDto(converting.dtoToObject(data)));
}

function updateStep(tourStep) {
  return communication.put('api/steps/update', converting.dtoToObject(tourStep))
    .then(data => new TourStepDto(converting.dtoToObject(data)));
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
  deleteStep
}
