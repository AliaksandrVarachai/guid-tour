class TourService{
	constructor(){
		this.communication = new CommunicationHelper('http://ecsb00100b6f.epam.com/GuidedTourApiUnifyingAlex/');
	}

	//'acb843f9-1281-435c-9738-02df1488c00f'
	//TODO: add array Dto logic
	getAllTours(){
		return this.communication.GET('api/Tours/all')
			.then(data => ConvertationHelper.mapFromDto(data));
	}

	getTourById(id){
		return this.communication.GET(`api/Tours/single?tourId=${id}`)
			.then(data => new TourDto(ConvertationHelper.mapFromDto(data)));
	}
	//TODO: add array Dto logic
	getTourByTempalteId(templateId){
		return this.communication.GET(`api/Tours/template?templateId=${templateId}`)
			.then(data => ConvertationHelper.mapFromDto(data));
	}

	updateTour(tour){
		var tourDto = ConvertationHelper.mapToDto(tour)
		return this.communication.PUT('api/Tours/update', tourDto);
	}

	addTour(tour){
		tour.lastOpenDate = (new Date(1900, 1, 1)).toISOString().slice(0, 19);
		tour.id = '00000000-6000-0000-0000-000000000000';
		tour.steps = []; 
		//Guid.raw();
		var tourDto = ConvertationHelper.mapToDto(tour)
		
		return this.communication.POST('api/tours/add', tourDto)
			.then(() => {
				docData = {
					isLibraryItem: false,
					libraryItemId: '00000000-0000-0000-0000-000000000000',
					path: null,
					computerName: "comp",
					lastModifiedTime: tour.lastOpenDate,
					userName: "name",
					documentId: '00000000-6000-0000-0000-000000000000',
					templateId: '00000000-6000-0000-0000-000000000000'
				}
				var saveTourDto = ConvertationHelper.mapToDto(new SaveTourDto(tour.id, docData));
				return this.communication.POST('api/Tours/save', saveTourDto);
			});
	}

	deleteTourFromTemplate(tourId, templateId){
		return this.communication.DELETE(`api/Tours/delete/${tourId}?templateid=${templateId}`);
	}
}