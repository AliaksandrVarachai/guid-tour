import { LOCAL_TEST_TEMPLATE_ID, LOCAL_TEST_PAGE_ID } from '../../constants/tour-settings';

function getTemplateId() {
  return LOCAL_TEST_TEMPLATE_ID;  // TODO: replace with document's template ID
}

function getPageId() {
  return LOCAL_TEST_PAGE_ID;      // TODO: replace with page's template ID
}

export default {
  getTemplateId,
  getPageId,
}
