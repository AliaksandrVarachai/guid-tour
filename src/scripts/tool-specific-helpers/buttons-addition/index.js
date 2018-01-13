let addGtButtons;

switch (process.env.NODE_TOOL) {
  case 'microstrategy':
    addGtButtons = require('./microstrategy');
    break;
  case 'tableau':
    addGtButtons = require('./tableau');
    break;
  default:
    addGtButtons = require('./default');
}

export default addGtButtons.default;
