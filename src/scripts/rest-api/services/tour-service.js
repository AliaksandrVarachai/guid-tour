import communication from '../helpers/communication';
import converting from '../helpers/converting';
import TourDto from '../entities/tour-dto';
import SaveTourDto from '../entities/save-tour-dto';

//TODO: add array Dto logic
export function getAllTours() {
  return communication.get('api/Tours/all')
    .then(data => converting.mapFromDto(data));
}

export function getTourById(id) {
  return communication.get(`api/Tours/single?tourId=${id}`)
    .then(data => new TourDto(converting.mapFromDto(data)));
}

//TODO: add array Dto logic
export function getTourByTemplateId(templateId) {
  return communication.get(`api/Tours/template?templateId=${templateId}`)
    .then(data => converting.mapFromDto(data));
}

export function updateTour(tour) {
  return communication.put('api/Tours/update', converting.mapToDto(tour));
}

export function addTour(tour) {
  // TODO: this data must be in tour
  //tour.lastOpenDate = (new Date(1900, 1, 1)).toISOString().slice(0, 19);
  //tour.id = '00000000-6000-0000-0000-000000000000'; // Guid.raw();
  //tour.steps = [];
  return communication.post('api/tours/add', converting.mapToDto(tour))
    .then(() => {
      // TODO: this must be in potions
      //docOptions = {
      //  isLibraryItem: false,
      //  libraryItemId: '00000000-0000-0000-0000-000000000000',
      //  path: null,
      //  computerName: "comp",
      //  lastModifiedTime: tour.lastOpenDate,
      //  userName: "name",
      //  documentId: '00000000-6000-0000-0000-000000000000',
      //  templateId: '00000000-6000-0000-0000-000000000000'
      //}
      const docOptions = {};
      const saveTourDto = converting.mapToDto(new SaveTourDto(tour), docOptions);
      return communication.post('api/Tours/save', saveTourDto);
    });
}

export function deleteTourFromTemplate(tourId, templateId) {
  return communication.delete(`api/Tours/delete/${tourId}?templateid=${templateId}`);
}
