let initGtDomElements;

switch (process.env.NODE_TOOL) {
  case 'microstrategy':
    initGtDomElements = require('./microstrategy');
    break;
  case 'tableau':
    initGtDomElements = require('./tableau');
    break;
  default:
    initGtDomElements = require('./default');
}

export default initGtDomElements.default;
