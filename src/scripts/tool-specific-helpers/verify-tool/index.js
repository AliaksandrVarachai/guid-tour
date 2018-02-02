let verifyTool;

switch (process.env.NODE_TOOL) {
  case 'microstrategy':
    verifyTool = require('./microstrategy');
    break;
  case 'tableau':
    verifyTool = require('./tableau');
    break;
  default:
    verifyTool = require('./default');
}

export default verifyTool.default;
