import tourStepService from '../services/tour-step-service';
import tourService from '../services/tour-service';
import toRequiredTourStep from '../converters/to-required-tour-step';
import toRequiredTourStepDto from '../converters/to-required-tour-step-dto';
import { TOUR_REQUIRED_FIELDS, TOUR_STEP_REQUIRED_FIELDS } from '../../constants/tour-settings';
const uuidv4 = require('uuid/v4');

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
  const myGeneratedIds = [
    // tours:
    'b5bc89e8-1594-4993-a101-610d160e6394',
    '333d8731-db16-49b2-bce7-5fdbe77af063',
    // steps:
    'a7239312-cd9d-45fc-ae0c-dd9fbd3ab5fb',
    '1e8dcc12-f0f5-4ed6-bf3c-a261b17db858',
    '3e814909-ea80-4a0f-8af6-f41cfc67acf8',
    '5a0c97f0-746a-49d0-ad23-b25c0f858747',
    'c38f9823-bb3a-46e5-9c2a-7c2284262c0a',
    '3d0525b7-6afe-468d-9d70-fce1c96fa491',
    '38a0dab0-86d5-43c9-85c3-a85166bceb27',
    '1555af33-8e2d-4e8f-a868-755c3445a6cc'
  ];
  {
    const generatedTourId = '00000000-1000-0000-0000-000000000000'; //uuidv4();  // to save different tours
    //console.log('generatedTourId=', generatedTourId);

    const tour = {
      ...TOUR_REQUIRED_FIELDS,
      id: generatedTourId, //myGeneratedIds[1],
      name: 'Tour_Name_1',
    };

    const tourSteps = [{
      ...TOUR_STEP_REQUIRED_FIELDS,
      id: '91ebf0cf-f7ac-47bf-b272-a53081268299', //uuidv4(), //myGeneratedIds[2],
      tourId: generatedTourId, //myGeneratedIds[0],
      name: 'Step_1'
    // }, {
    //   ...TOUR_STEP_REQUIRED_FIELDS,
    //   id: uuidv4(), //myGeneratedIds[3],
    //   tourId: generatedTourId, //myGeneratedIds[0],
    //   name: 'Step_2'
    }];

    // console.log('***** addTour is trying to save tour=', tour);
    // tourService.addTour(tour)
    //   .then(tour => {
    //     console.log('***** addTour: saved successfully tour=', tour);
    //     return tour;
    //   })
      // .then(tour => {
      //   console.log('tour=', tour)
      //   tourSteps.forEach(tourStep => {
      //     tourStepService.addStep(tourStep).then(step => {
      //       console.log('addStep(): added step=', step);
      //     });
      //   });
      // })




    // console.log('addStep(): added tourSteps=', tourSteps)
    // tourSteps.forEach(tourStep => {
    //   tourStepService.addStep(tourStep).then(step => {
    //     console.log('addStep(): loaded step=', step);
    //   });
    // });
    // Promise.all(tourSteps.map(tourStep => {
    //   return tourStepService.addStep(tourStep).then(data => {
    //     console.log('addStep(): loaded date=', data);
    //     return data;
    //   });
    // })).then(values => {
    //   const tour = {
    //     ...TOUR_REQUIRED_FIELDS,
    //     id: generatedTourId, //myGeneratedIds[1],
    //     name: 'Tour Name #1',
    //     steps: tourSteps,
    //   };
    //
    //   console.log('***** addTour is trying to save tour=', tour);
    //   tourService.addTour(tour).then(tour => {
    //     console.log('***** addTour: saved successfully tour=', tour);
    //   })
    // });



  }
}

export default {
  run
}