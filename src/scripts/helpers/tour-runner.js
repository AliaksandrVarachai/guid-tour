import tourService from '../rest-api/services/tour-service'; 
import { sortStepsByIndex } from './tour-step-helper';
import { getTargetPages } from '../tool-specific-helpers/targets-parsing/tableau';
import globals from '../tool-specific-helpers/globals';

function startTour(loadedTour) {  
  if (!loadedTour.steps || loadedTour.steps.length === 0){
    return alert('No steps found in selected tour!\nPlease add steps or select another tour.');
  }
  
  //const loadedSteps = [
   // {id: 1, name: "First step", customTargetId: "tabZoneId32", htmlContent : "This is <b>first step</b>", orientation: 2},
   // {id: 2, name: "Second step", customTargetId: "tabZoneId28", htmlContent : "This is second step", orientation: 4}];
  // Crate bootstap tour steps
  let currentPage = "";
  const orderedSteps = sortStepsByIndex(loadedTour.steps);
  // TODO: change to gettting pages from store
  const pages = getTargetPages();
  let steps = [];
  for (let index = 0; index < orderedSteps.length; index ++) {
    const templateStr = orderedSteps[index].width === 0 ? `<div class='popover tour' role='tooltip'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content' style='overflow: auto;'></div><div class='popover-navigation'><button class='btn btn-default' data-role='prev'>« Prev</button><span data-role='separator'>|</span><button class='btn btn-default' data-role='next'>Next »</button><button class='btn btn-default' data-role='end'>End tour</button></div></div>`
                                                        : `<div class='popover tour' role='tooltip' style='max-width: ${orderedSteps[index].width + 28}px;'><div class='arrow'></div><h3 class='popover-title'></h3><div class='popover-content' style='overflow: auto; height: ${orderedSteps[index].height}px; width: ${orderedSteps[index].width}px;'></div><div class='popover-navigation'><button class='btn btn-default' data-role='prev'>« Prev</button><span data-role='separator'>|</span><button class='btn btn-default' data-role='next'>Next »</button><button class='btn btn-default' data-role='end'>End tour</button></div></div>`;
    const sheetName = pages[orderedSteps[index].pageId].title;
    let step = {
      element: `#${orderedSteps[index].customTargetId}`,
      title: orderedSteps[index].name,
      content: orderedSteps[index].htmlContent,
      placement: getStepPlacement(orderedSteps[index].orientation),
      smartPlacement: true,
      template: templateStr,
      sheetName,
      onShown: (tour) => { 
        changeTourBackgroundColor('#000', 0.8);
        currentPage = globals.tableau.VizManager.getVizs()[0].getWorkbook().getActiveSheet().getName();
        let currentStep = tour.getStep(tour.getCurrentStep());
        if(currentStep.placement === 'auto') {
          placeStepPopupOnCenter();
        }
      },
      onNext: (tour) =>  {
        const stepSheet = tour.getStep(tour.getCurrentStep() + 1).sheetName;
        if (currentPage !== stepSheet) {
          changeTourBackgroundColor('#FFF', 0.2);
          return globals.tableau.VizManager.getVizs()[0].getWorkbook().activateSheetAsync(stepSheet);
        }
      },
      onPrev: (tour) => {
        const stepSheet = tour.getStep(tour.getCurrentStep() - 1).sheetName;
        if (currentPage !== stepSheet) {
          changeTourBackgroundColor('#FFF', 0.2);
          return globals.tableau.VizManager.getVizs()[0].getWorkbook().activateSheetAsync(stepSheet);
        }
      }
    };
    steps.push(step);
  }



  let tour = new Tour({
    storage: false,
    backdrop: true,
    steps: steps,
    onStart: (tour) => {
      currentPage = globals.tableau.VizManager.getVizs()[0].getWorkbook().getActiveSheet().getName();
      const stepSheet = tour.getStep(0).sheetName;
      if (currentPage !== stepSheet) {
        return globals.tableau.VizManager.getVizs()[0].getWorkbook().activateSheetAsync(stepSheet);
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

function changeTourBackgroundColor(color, opacity) {
  let nodes = document.querySelectorAll(".tour-backdrop");
  for (let i = 0; i < nodes.length; i++) {
    nodes[i].style.backgroundColor = color;
    nodes[i].style.opacity = opacity;
  }
}

function highlightVisual(visualId) {
  let tour = new Tour({
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
