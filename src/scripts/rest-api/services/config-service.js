import getResourceURL from '../../helpers/get-resource-url';
import getJsonFromResponse from '../helpers/getJsonFromResponse';
import config from '../../../config/config.json';

function loadConfig() {
  return fetch(getResourceURL(config))
    .then(response => getJsonFromResponse(response));
}

export {
  loadConfig
}


