import globals from '../../tool-specific-helpers/globals';
import productActions from '../actions'
import eventCallbackStore from '../../helpers/event-callback-store';

export default function(store) {
  function updateTargetPages() {
    store.dispatch(productActions.updateTargetPages());
  }

  function updateTargetVisuals() {
    // user clicked on tab
    store.dispatch(productActions.updateActiveTargetPage()); //selected active target page
    store.dispatch(productActions.updateActivePageTargetVisuals());

    // begin callbacks call
    const TAB_SWITCH = globals.tableau.TableauEventName.TAB_SWITCH;
    const cbUuids = store.getState().product.expectedEvents[TAB_SWITCH] || [];
    cbUuids.forEach(cbUuid => eventCallbackStore.pop(cbUuid)());
    store.dispatch(productActions.removeProductExpectedEvent(TAB_SWITCH));
    // end of callbacks call
  }

  function callOnInitialize() {
    visualFrame.removeEventListener(globals.tableau.TableauEventName.CUSTOM_VIEW_LOAD, callOnInitialize);
    // assumption: DOM is loaded
    updateTargetPages();
    updateTargetVisuals();
  }

  const visualFrame = globals.tableau.VizManager.getVizs()[0];
  visualFrame.addEventListener(globals.tableau.TableauEventName.TOOLBAR_STATE_CHANGE, () => {
    addGtButtonsToDocument();
  });
  // TODO: check if the events have happened already and call
  visualFrame.addEventListener(globals.tableau.TableauEventName.CUSTOM_VIEW_LOAD, FULL_SCREEN_ADD_BUTTON_FIX);
  visualFrame.addEventListener(globals.tableau.TableauEventName.CUSTOM_VIEW_LOAD, callOnInitialize);
  visualFrame.addEventListener(globals.tableau.TableauEventName.TAB_SWITCH, updateTargetVisuals);
}

function FULL_SCREEN_ADD_BUTTON_FIX() {
  const tabNonVizItem = document.querySelector('.tab-toolbar-container .tab-nonVizItems') //v10.3
    || document.querySelector('#toolbar-container .tab-nonVizItems'); //v10.4 and 10.5

  tabNonVizItem.addEventListener('click', (e) => {
    if(tabNonVizItem.classList.contains('hideLabels')){
      setTimeout(addGtButtonsToDocument, 1000);
    }
  });
}


function addGtButtonsToDocument() {
  const editButtonId = 'gt-edit-button';
  const startButtonId = 'gt-start-button';

  const parentButtonStartNode = document.querySelector('.tab-toolbar-container .tab-nonVizItems') //v10.3
      || document.querySelector('#toolbar-container .tab-nonVizItems'); //v10.4 and 10.5

  if(parentButtonStartNode.querySelector(`#${editButtonId}`)) {
    return;
  }

  const firstChild = parentButtonStartNode.firstChild;
  const editGtButton = createCustomViewButton(editButtonId, 'EDIT TOUR', 'showConfigPopup');
  const startGtButton = createCustomViewButton(startButtonId, ' START TOUR', 'startTour');
  
  parentButtonStartNode.insertBefore(startGtButton, firstChild);
  parentButtonStartNode.insertBefore(editGtButton, firstChild);
}


function createCustomViewButton(btnId, text, clickEventName) {
  const btn = document.createElement('div');
  btn.id = btnId;
  btn.setAttribute('class', 'tabToolbarButton tab-widget customviews');
  btn.setAttribute('role', 'button');
  btn.setAttribute('aria-label', 'Custom views');
  btn.setAttribute('tabindex', '0');
  btn.setAttribute('style', 'position: relative; user-select: none; -webkit-tap-highlight-color: transparent; width: 115px !important;-ms-transform: translateY(-35%)');
  btn.innerHTML = `<div gt-onclick="${clickEventName}" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0;"></div>
    <span class="tabToolbarButtonImg tab-icon-edit"></span><span class="tabToolbarButtonText">${text}</span>`;
  return btn;
}
