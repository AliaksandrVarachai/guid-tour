class SaveTourDto{
	constructor(tourId, docData){
		this.id = '00000000-6000-0000-0000-000000000000';
		//Guid.raw();
		this.tourId = tourId;
		this.isLibraryItem = docData.isLibraryItem;
		this.libraryItemId = docData.libraryItemId;
		this.templateId = docData.templateId;
		this.path = docData.path;
		this.computerName = docData.computerName;
		this.lastModifiedTime = docData.lastModifiedTime;
		this.userName = docData.userName;
		this.documentId = docData.documentId;
	}
}