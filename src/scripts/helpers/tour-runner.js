import tourService from '../rest-api/services/tour-service'; 
import { sortStepsByIndex } from './tour-step-helper';

 function startTour(loadedTour) {  
  //const loadedSteps = [
   // {id: 1, name: "First step", customTargetId: "tabZoneId32", htmlContent : "This is <b>first step</b>", orientation: 2},
   // {id: 2, name: "Second step", customTargetId: "tabZoneId28", htmlContent : "This is second step", orientation: 4}];
  // Crate bootstap tour steps
  const orderedSteps = sortStepsByIndex(loadedTour.steps);
  var steps = [];
  for (var index = 0; index < orderedSteps.length; index ++) {
    var step = {
      element: `#${orderedSteps[index].customTargetId}`,
      title: orderedSteps[index].name,
      content: orderedSteps[index].htmlContent,
      placement: getStepPlacement(orderedSteps[index].orientation),
      smartPlacement: true,
    };

    steps.push(step);
  }

  var tour = new Tour({
      storage: false,
      backdrop: true,
      steps: steps,
      onShown: function (tour) {
        var currentStep = tour.getStep(tour.getCurrentStep());
        if(currentStep.placement == 'auto') {
          placeStepPopupOnCenter();
        }
    }
  });

  tour.init();
  tour.start(true);
  tourService.updateTourOpenDate(loadedTour.id)
    .then((result) => {
      if (result) {
        loadedTour.lastOpenDate = result;
        loadedTour.totalVisits++;
      }
    },
    errorMessage => {
      console.log("Can't update tour lastOpenDate");
    });
}

function highlightVisual(visualId) {
  var tour = new Tour({
    storage: false,
    backdrop: true,
    steps: [
      {
        element : `#${visualId}`,
        animation: false,
        duration: 1500
      }
    ],
    onShown: function (tour) {
        document.querySelector('div[role="tooltip"]').style.visibility = 'hidden';
    }    
  });

  tour.init();
  tour.start(true);
}


function getStepPlacement(orientation) {
  switch(orientation) {
    case 0: return 'auto';// No center orientation
    case 1: return 'left';
    case 2: return 'right';
    case 3: return 'top';
    case 4: return 'bottom';
    default: return "auto";
  }
}

function placeStepPopupOnCenter() {
  const containterDiv = document.querySelector('div[role="tooltip"]');
  const bottomBackdropTopValue = parseFloat(document.querySelector('.tour-backdrop.bottom').style.top);
  const topBackdropHeightValue = parseFloat(document.querySelector('.tour-backdrop.top').style.height);
  const rightBackdropLeftValue = parseFloat(document.querySelector('.tour-backdrop.right').style.left);
  const leftBackdropWidthValue = parseFloat(document.querySelector('.tour-backdrop.left').style.width);

  const containerDivTop = bottomBackdropTopValue - ((bottomBackdropTopValue - topBackdropHeightValue) /2);
  const containerDivLeft = rightBackdropLeftValue - ((rightBackdropLeftValue - leftBackdropWidthValue) / 2);
  containterDiv.style.top = `${containerDivTop}px`;
  containterDiv.style.left = `${containerDivLeft}px`;

  containterDiv.querySelector('.arrow').style.visibility = 'hidden';
}


export {
  startTour,
  highlightVisual
}