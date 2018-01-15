class TourDto {
	constructor(tour){
    	this.id = tour.id;
		this.name = tour.name;
		this.stepsCount = tour.stepsCount;
		this.type = tour.type;
		this.countWrongAnswers = tour.countWrongAnswers;
		this.lastOpenDate = tour.lastOpenDate;
		this.totalVisits = tour.totalVisits;
		this.visibility = tour.visibility;
		this.steps = [];
		self = this;
		tour.steps.forEach(function(item, index) {
			self.steps.push(new TourStepDto(item));
		});
    }
}