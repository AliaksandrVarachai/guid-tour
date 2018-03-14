let productActions;

switch (process.env.NODE_TOOL) {
  case 'microstrategy':
    productActions = require('./microstrategy');
    break;
  case 'tableau':
    productActions = require('./tableau');
    break;
  default:
    productActions = require('./default');
}

export default productActions;
