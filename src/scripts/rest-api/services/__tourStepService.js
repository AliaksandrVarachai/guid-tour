class TourStepService{
	constructor(){
		this.communication = new CommunicationHelper('http://ecsb00100b6f.epam.com/GuidedTourApiUnifyingAlex/');
	}

	getStepsByTourId(tourId){
		return this.communication.GET(`api/steps?tourId=${tourId}`)
			.then(data => new TourStepDto(ConvertationHelper.mapFromDto(data)));
	}

	getStepByTargetId(targetId){
		return this.communication.GET(`api/steps?targetId=${targetId}`)
			.then(data => new TourStepDto(ConvertationHelper.mapFromDto(data)));
	}

	getStepById(stepId){
		return this.communication.GET(`api/steps/get/${stepId}`)
			.then(data => new TourStepDto(ConvertationHelper.mapFromDto(data)));
	}

	addStep(tourStep){
		var tourStepDto = ConvertationHelper.mapToDto(tourStep);
		return this.communication.POST('api/steps/add', tourStepDto)
			.then(data => new TourStepDto(ConvertationHelper.mapFromDto(data)));
	}

	updateStep(tourStep){
		var tourStepDto = ConvertationHelper.mapToDto(tourStep)
		return this.communication.PUT('api/steps/update', tourStepDto)
			.then(data => new TourStepDto(ConvertationHelper.mapFromDto(data)));
	}

	deleteStep(stepId){
		return this.communication.DELETE(`api/Steps/delete/${stepId}`);
	}
}