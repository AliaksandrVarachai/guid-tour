import { startTour } from './tour-runner';

function runTourOrShowPopup(dispatch, store) { 
  const loadedTours = store.getState().tours;
  if (loadedTours.length === 1) {
    startTour(loadedTours[0]);
  } else if (loadedTours.length > 1) {
    dispatch({
      type: 'SHOW_POPUP',
      componentName: 'TourListLauncher'
    })
  } else {
    alert('No tours found to run!');
  }
}

export {
  runTourOrShowPopup
}
