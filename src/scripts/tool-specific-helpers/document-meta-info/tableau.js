import { uuidFromString } from '../../helpers/uuid-generator';

//IMPORTANT!!! This function returns identificator of page, 
//due to some limitations - a tour can be created for page(dashboard/sheet) only, not for template(workbook)
function getTemplateId() {
	const workbook = parent.tableau.VizManager.getVizs()[0].getWorkbook();
  	const uniquePageName = workbook.getName() +'_'+ workbook.getActiveSheet().getName();
  	return uuidFromString(uniquePageName);
}

function getPageId() {
  // TODO: form page ID different from template ID
  return getTemplateId();
}

export default {
  getTemplateId,
  getPageId,
}
