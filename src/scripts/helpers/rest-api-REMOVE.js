// see Rest-api.js & grid.js & RestServerAPI.txt in Volumes/Volume2/3/

// TODO: move to constants
//const regExpId = new RegExp("^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$", "i");
const HOST = 'http://ecsb00100c96.epam.com:8085/';
const EMPTY_ID = '00000000-0000-0000-0000-000000000000';
const TEMPLATE_ID = '00000000-0000-0000-0000-000000000A00';  // constant for the page (from localStorage)
//const STEP_ID = '00000000-0000-0000-0000-000000000001';           // generated
//const TOUR_ID = '00000000-0000-0000-0000-000000000010';           // generated
//const TEMPLATE_SAVE_ID = '00000000-0000-0000-0000-000000001000';  // generated
const TOUR_TYPE = "MSTR_Tour";
const DEFAULT_TOUR_TYPE = "MSTR_Default_Tour";

function jsToDto(str) {
  return '<' + str + '>k__BackingField';
}

function dtoToJs(str) {
  return /[^<>]+/.exec(str)[0];
}

// Transforms keys of object with map function
function transformKeys(obj, map) {
  function _transformKeys(obj) {
    if (obj instanceof Array)
      return obj.map(v => _transformKeys(v));
    if (typeof obj !== 'object' || obj === null)
      return obj;
    return Object.keys(obj).reduce((accum, key) => {
      let value = obj[key];
      accum[map(key)] = _transformKeys(value);
      return accum;
    }, {});
  }

  return _transformKeys(obj);
}

class Dto {
  constructor(obj) {
    Object.assign(this, obj);
  }

  getId() {
    return this.id;
  }

  mapToDbo() {
    return {}; // is to be overwritten by a descendant to convert a js object ot a REST API object
  };

  convertToRest() {
    const map = this.mapToDbo();
    const self = this;
    return Object.keys(map).reduce(function(accum, key) {
      //debugger;
      const value = self[key];
      if (typeof value === 'function')
        throw Error('function cannot be transformed to the REST format in a DTO object');
      if (value instanceof Array) {
        accum[map[key]] = value.map(function (val) {
          return val.convertToRest();
        });
        return accum;
      }
      if (typeof value === 'object')
        return value.convertToRest();
      accum[map[key]] = value;
      return accum;
    }, {});
  }
}

class Step extends Dto {
  constructor(obj, tour) {
    super(obj);
    Object.assign(this, {
      id: generateStepId(),
      tourId: tour.getId()
    });
    tour.steps.push(this);
  }

  mapToDbo() {
    return {
      id: jsToDto('Id'),
      name: jsToDto('Name'),
      htmlContent: jsToDto('HtmlContent'),
      index: jsToDto('Index'),
      pageId: jsToDto('PageId'),
      orientation: jsToDto('Orientation'),
      tourId: jsToDto('TourId'),
      title: jsToDto('Title'),
      targetType: jsToDto('TargetType'),
      customTargetId: jsToDto('CustomTargetId'),
      isToolTip: jsToDto('IsToolTip')
    }
  }
}

class Tour extends Dto {
  constructor(obj) {
    super(obj);
    this.id = generateTourId();
  }

  mapToDbo() {
    return {
      id: jsToDto('Id'),
      name: jsToDto('Name'),
      type: jsToDto('Type'),
      steps: jsToDto('Steps'),
      lastOpenDate: jsToDto('LastOpenDate')
    }
  }
}

class SavingObject extends Dto {
  constructor(obj, { tourId, libraryItemId, templateId, documentId }) {
    super(obj);
    Object.assign(this, {
      id: generateTemplateSaveId(),
      tourId,
      libraryItemId,
      templateId,
      documentId
    });
  }

  mapToDbo() {
    return {
      id: jsToDto('Id'),
      tourId: jsToDto('TourId'),
      isLibraryItem: jsToDto('IsLibraryItem'),
      libraryItemId: jsToDto('LibraryItemId'),
      templateId: jsToDto('TemplateId'),
      path: jsToDto('Path'),
      computerName: jsToDto('ComputerName'),
      lastModifiedTime: jsToDto('LastModifiedTime'),
      documentId: jsToDto('DocumentId')
    }
  }
}


// TODO: remove Generators
let stepIdCounter = 0,
    tourIdCounter = 0,
    templateSaveIdCounter = 0;

function clearTestedObjectsInDb() {
  // **********************************
  // delete all tested tours, steps, templates here
}

function generateStepId() {
  stepIdCounter++;
  return EMPTY_ID.slice(0, -1) + stepIdCounter.toString(16);
}

function generateTourId() {
  tourIdCounter++;
  return EMPTY_ID.slice(0, -2) + tourIdCounter.toString(16) + EMPTY_ID.slice(-1);
}

function generateTemplateSaveId() {
  templateSaveIdCounter++;
  return EMPTY_ID.slice(0, -4) + templateSaveIdCounter.toString(16) + EMPTY_ID.slice(-3);
}

// TODO: replace by a function with a real Date functionality (copied from Mihaly)
function dateTimeNow(){
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hr = date.getHours();
  let min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  let sec = date.getSeconds();
  if (sec < 10) {
    sec = "0" + sec;
  }
  return year + " " + month + " " + day + " " + hr + ":" + min + ":" + sec;
}

let tours = new Array(3),
    steps = new Array(6),
    isDefault = true;

// tours
for (let i = 0; i < tours.length; i++) {
  tours[i] = new Tour({
    name: `Tour\'s name #${i}`,
    type: isDefault ? DEFAULT_TOUR_TYPE : TOUR_TYPE,
    steps: [],
    lastOpenDate: dateTimeNow(), //This is added because of dateteime2 issue. It was the fastest solution to initialiaze this field.
  });
}

// steps (are added to random tours)
for (let i = 0; i < steps.length; i++) {
  steps[i] = new Step({
    name: `Step's name #${i}`,
    htmlContent: encodeURI(`<html><h1>Step #${i}<h1><p>content #{i}</p></html>`), //escape(step.content),
    index: i,
    pageId: EMPTY_ID,
    orientation: 0,
    title: `Step\'s title ${i}`,
    targetType: 4,
    customTargetId: `id-${i}`, //$(step.element).attr('id'),
    isToolTip: true
  }, tours[i % tours.length]);
}

// Create tour + save it to DB with to templateId
// POST api/Tours/add + POST api/Tours/save
function saveTourIntoDb(tour) {
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  const init = {
    method: 'POST',
    headers
  };

  fetch(`${HOST}api/Tours/add`, Object.assign(init, {
    body: JSON.stringify(tour.convertToRest())
  })).then(data => {
      let savingObject = new SavingObject({
        isLibraryItem: false,
        path: 'N/A',
        computerName: 'N/A',
        lastModifiedTime: dateTimeNow(),
      }, {
        tourId: tour.getId(),
        libraryItemId: EMPTY_ID,
        templateId: TEMPLATE_ID,
        documentId: EMPTY_ID
      });
      return fetch(`${HOST}api/Tours/save`, Object.assign(init, {
        body: JSON.stringify(savingObject.convertToRest())
      }));
    })
    .then(data => {
      console.log('fetched "api/Tours/save", data=', data);
    })
    .catch(errorMessage =>
      console.error(errorMessage)
    );
}

// Get all tour for a report from DB
function getToursFromDb() {
  // GET api/Tours/template?templateId=" + templateId, loadToursFromDb, "text"
  const headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  fetch(`${HOST}api/Tours/template?templateId=${TEMPLATE_ID}`, {
    headers
  }).then(response => response.json())
    .then(data => {
      console.log('fetched "api/Tours/template", data=', transformKeys(data, dtoToJs));
    })
    .catch(errorMessage => {
      console.log(errorMessage)
    });
}

// // Update tour data into DB
// function updateTourInDb(options) {
//   // DELETE api/Tours/delete/ + tourId + "?templateid=" + templateId
//   var jsonData =  {
//     "<Id>k__BackingField": tourId,
//     "<Name>k__BackingField": name,
//     "<Type>k__BackingField": type,
//     "<CountWrongAnswers>k__BackingField": 0,
//     "<Visibility>k__BackingField": null
//   };
// }
//
// function deleteTourFromDB(options) {
//   // PUT api/Tours/update
//
// }
//
// function deleteToursFromDB(options) {
//   deleteFromGtApi("api/Tours/delete/" + tourId + "?templateid=" + templateId);
// }


// Example of using
function run() {
  //saveTourIntoDb(tours[0]);
  getToursFromDb();
}

export default {
  run
}



