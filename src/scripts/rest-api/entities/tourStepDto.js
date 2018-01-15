class TourStepDto{
	constructor(tourStep){
		this.id = tourStep.id;
		this.name = tourStep.name;
		this.pageTitle = tourStep.pageTitle;
		this.height = tourStep.height;
		this.width = tourStep.width;
		this.measuredWidth = tourStep.measuredWidth;
		this.measuredHeight = tourStep.measuredHeight;
		this.htmlContent = tourStep.htmlContent;
		this.startUpScript = tourStep.startUpScript;
		this.index = tourStep.index;
		this.pageId = tourStep.pageId;
		this.orientation = tourStep.orientation;
		this.tourId = tourStep.tourId;
		this.targetId = tourStep.targetId;
		this.visualId = tourStep.visualId;
		this.targetType = tourStep.targetType;
		this.customStyle = tourStep.customStyle;
		this.guideId = tourStep.guideId;
		this.title = tourStep.title;
		this.styleId = tourStep.styleId;
		this.customTargetId = tourStep.customTargetId;
		this.subVisuals = tourStep.subVisuals;
		this.validation = tourStep.validation;
		this.isToolTip = tourStep.isToolTip;
	}
}