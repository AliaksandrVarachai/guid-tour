import globals from '../../tool-specific-helpers/globals';
import documentMetaInfo from '../document-meta-info';
import * as actions from '../../actions';


export default function(store) {
  const visualFrame = globals.tableau.VizManager.getVizs()[0];
  visualFrame.addEventListener(globals.tableau.TableauEventName.TOOLBAR_STATE_CHANGE, () => {
    addGtButtonsToDocument();
  });
  visualFrame.addEventListener(globals.tableau.TableauEventName.CUSTOM_VIEW_LOAD, () => {
    store.dispatch(actions.updateParsedTargets());
    store.dispatch(actions.getToursByTemplateId(documentMetaInfo.getTemplateId()));
    FULL_SCREEN_ADD_BUTTON_FIX();
  });
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
  const startGtButton = createCustomViewButton(startButtonId, 'START TOUR', 'startTour');
  
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
  btn.setAttribute('style', 'position: relative; user-select: none; -webkit-tap-highlight-color: transparent; width: 115px !important');
  btn.innerHTML = `<div gt-onclick="${clickEventName}" style="position: absolute; left: 0; top: 0; right: 0; bottom: 0;"></div>
    <span class="tabToolbarButtonImg tab-icon-edit"></span><span class="tabToolbarButtonText">${text}</span>`;
  return btn;
}
