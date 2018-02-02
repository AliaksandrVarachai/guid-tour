const tableau = window.parent.tableau || {};

tableau.VizManager = {
  getVizs
};

const visuals = [
  { getWorkbook }
];

function getVizs() {
  return visuals;
}

/** Begin of event section */

const events = {};
const visual = tableau.VizManager.getVizs()[0];

visual.dispatchEvent = function(eventName) {
  if (events[eventName] && events[eventName] instanceof Array) {
    events[eventName].forEach(cb => cb());
  } else {
    console.warn(`There are no listeners for dispatched event "${eventName}"`);
  }
};

visual.addEventListener = function(eventName, cb) {
  if (events[eventName] && events[eventName] instanceof Array)
    events[eventName].push(cb);
  events[eventName] = [cb];
};

visual.removeEventListener = function(eventName, cb) {
  if (events[eventName] && events[eventName] instanceof Array) {
    const inx = events[eventName].indexOf(cb);
    if (inx > -1)
      events.splice(inx, 1);
  } else {
    console.warn(`Event "${eventName}" does not have the provided listener`);
  }
};

if(document.readyState === 'complete') {
  setTimeout(dispatchCustomViewLoadEvent, 500);
  if (event.target.classList.contains('tabLabel')) {
    setTimeout(dispatchToolbarStateChangeEvent, 1000);
  }
} else {
  window.onload = function(event) {
    setTimeout(dispatchCustomViewLoadEvent, 500);
    document.onclick = function(event) {
      if (event.target.classList.contains('tabLabel')) {
        setTimeout(dispatchToolbarStateChangeEvent, 1000);
      }
    };
  };
}

tableau.TableauEventName = {
  TOOLBAR_STATE_CHANGE: 'TOOLBAR_STATE_CHANGE',
  CUSTOM_VIEW_LOAD: 'CUSTOM_VIEW_LOAD'
};

function dispatchCustomViewLoadEvent() {
  visual.dispatchEvent(tableau.TableauEventName.CUSTOM_VIEW_LOAD);
  visual.dispatchEvent(tableau.TableauEventName.TOOLBAR_STATE_CHANGE);
}

function dispatchToolbarStateChangeEvent() {
  visual.dispatchEvent(tableau.TableauEventName.TOOLBAR_STATE_CHANGE);
}

/** End of event section */

function getWorkbook() {
  return {
    getActiveSheet
  };
}

function getActiveSheet() {
  return {
    getName
  }
}

function getName() {
  return 'Dashboard 1';
}

export default {
  tableau
}
