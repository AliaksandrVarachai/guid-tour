/* Map for static and uploaded resources */

const path = require('path');

let config = {};

let outerResources = config.outerResources = {
  entry: 'src',
  output: 'outer-resources'
};

outerResources.img = {
  entry: path.join(outerResources.entry, 'images'),
  output: path.join(outerResources.output, 'images', path.sep),
};

console.log('entry=', config.outerResources.img.entry)
console.log('output=', config.outerResources.img.output)

outerResources.font = {};

// TODO: test some json with config data
outerResources.json = {};

module.exports = config;

