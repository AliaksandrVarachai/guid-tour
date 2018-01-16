import communication from '../helpers/communication';
import converting from '../helpers/converting';
import TourDto from '../entities/tour-dto';
import SaveTourDto from '../entities/save-tour-dto';

export function getStepsByTourId(tourId) {
  return communication.get(`api/steps?tourId=${tourId}`)
    .then(data => new TourStepDto(converting.mapFromDto(data)));
}

export function getStepByTargetId(targetId) {
  return communication.get(`api/steps?targetId=${targetId}`)
    .then(data => new TourStepDto(converting.mapFromDto(data)));
}

export function getStepById(stepId) {
  return communication.get(`api/steps/get/${stepId}`)
    .then(data => new TourStepDto(converting.mapFromDto(data)));
}

export function addStep(tourStep) {
  return communication.post('api/steps/add', converting.mapToDto(tourStep))
    .then(data => new TourStepDto(converting.mapFromDto(data)));
}

export function updateStep(tourStep) {
  return communication.put('api/steps/update', converting.mapToDto(tourStep))
    .then(data => new TourStepDto(converting.mapFromDto(data)));
}

export function deleteStep(stepId) {
  return communication.delete(`api/Steps/delete/${stepId}`);
}
