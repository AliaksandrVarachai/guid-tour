let documentHelpers;

switch (process.env.NODE_TOOL) {
  case 'microstrategy':
    documentHelpers = require('./microstrategy');
    break;
  case 'tableau':
    documentHelpers = require('./tableau');
    break;
  default:
    documentHelpers = require('./default');
}

export default { ...documentHelpers.default };
