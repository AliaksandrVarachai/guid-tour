import tourStepService from '../services/tour-step-service';
import tourService from '../services/tour-service';

// Just uncomment tests you need

function run() {
  const testTourIds = [
    'b221a9d6-59e2-4167-804f-05c8291522f0', // null (no such tour)
    '0aa0eb3b-14e2-4934-9597-0328e5e35a01', // null (but steps.length = 0 via getAllTours)
    'acb843f9-1281-435c-9738-02df1488c00f', // steps.length = 4
    'b221a9d6-59e2-4167-804f-05c8291522ff', // steps.length = 8
  ];
  // testTourIds.forEach(tourId => tourService.getTourById(tourId)
  //   .then(tour => {
  //     console.log('getTourById: tour=', tour)
  //   })
  // );
  // testTourIds.forEach(tourId => tourStepService.getStepsByTourId(tourId)
  //   .then(steps => {
  //     console.log('getStepsByTourId, steps=', steps);
  //   })
  // );

  const testTemplateIds = [
    'b4d6bcdf-aca2-4ee7-996b-08043ed31c31', // [] (no such template)
    '00000000-0000-0000-0000-000000000000', // length = 2
    '1E78A063-7506-4DE3-BA46-08FAEA8EE879', // length = 8
    'F5A1B4C4-AEA5-4C32-82A0-2F970A37578F', // length = 77
  ];
  // testTemplateIds.forEach(templateId => tourService.getToursByTemplateId(templateId)
  //   .then(tours => {
  //     console.log('getTourByTemplateId: tours=', tours)
  //   })
  // );

  // tourService.getAllTours().then(tours => {
  //   console.log('getAllTours: tours=', tours)
  // });

  // TODO: test tourStepService.getStepByTargetId()

  const testStepsIds = [
    '4c6a23b4-ff89-4d46-8518-ac8d15476580', // null (error message Not Found 404)
    '4c6a23b4-ff89-4d46-8518-ac8d1547658d',
    '178dbe1a-148a-411d-8b2c-9ddf7f2ada4c',
  ];
  // testStepsIds.forEach(stepId => tourStepService.getStepById(stepId)
  //   .then(step => {
  //     console.log('getStepById, step=', step);
  //   })
  // );
}

export default {
  run
}