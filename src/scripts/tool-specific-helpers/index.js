let documentHelpers;

switch (process.env.NODE_TOOL) {
  case 'microstrategy':
    documentHelpers = require('./document-parsing-microstrategy');
    break;
  case 'tableau':
    documentHelpers = require('./document-parsing-tableau');
    break;
  default:
    documentHelpers = require('./document-parsing-default');
}

export default { ...documentHelpers.default }
