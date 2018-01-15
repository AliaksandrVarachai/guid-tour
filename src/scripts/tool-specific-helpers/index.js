let documentParsing;

switch (process.env.NODE_TOOL) {
  case 'microstrategy':
    documentParsing = require('./document-parsing-microstrategy');
    break;
  case 'tableau':
    documentParsing = require('./document-parsing-tableau');
    break;
  default:
    documentParsing = require('./document-parsing-default');
}

export default {
  // visuals: documentParsing.default.visuals,
  // pages: documentParsing.default.pages,
  getVisuals: documentParsing.default.getVisuals,
  getParsedVisuals: documentParsing.default.getParsedVisuals
}
