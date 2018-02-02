import { LOCAL_TEST_TEMPLATE_ID, LOCAL_TEST_PAGE_ID } from '../../constants/tour-settings'
let documentMetaInfo;

const mockedDocumentMetaInfo = {
  getTemplateId: () => LOCAL_TEST_TEMPLATE_ID,
  getPageId: () => LOCAL_TEST_PAGE_ID,
};

switch (process.env.NODE_TOOL) {
  case 'microstrategy':
    documentMetaInfo = require('./microstrategy');
    break;
  case 'tableau':
    documentMetaInfo = require('./tableau');
    break;
  default:
    documentMetaInfo = require('./default');
}

export default process.env.NODE_IS_LOCAL_START ? { ...mockedDocumentMetaInfo } : { ...documentMetaInfo.default };
