import getJsonFromResponse from './getJsonFromResponse';
import { loadConfig } from '../services/config-service';

const configuredHost = loadConfig()
  .then(config => config.GUIDED_TOUR_API_HOST);

/**
 * Sends a get request to the server.
 * @param {string} api - api url.
 * @returns {Promise<object|null>}
 * @throws {error} - status end description of an error.
 */
function get(api) {
  const options = {
    headers: new Headers({'Accept': 'application/json'})
  };
  return configuredHost
    .then(host => fetch(`${host}${api}`, options))
    .then(response => getJsonFromResponse(response));
}

/**
 * Sends a post request to the server.
 * @param {string} api - api url.
 * @param {object} data - object is to be sent in the body of a request.
 * @returns {Promise<object|null>} - a js object formed from response body.
 * @throws {error} - status and description of the error.
 */
function post(api, data) {
  const options = {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify(data)
  };
  return configuredHost
    .then(host => fetch(`${host}${api}`, options))
    .then(response => getJsonFromResponse(response));
}

/**
 * Sends a put request to the server.
 * @param {string} api - api url.
 * @param {object} data - object is to be sent in the body of a request.
 * @returns {Promise<object|null>} - a js object formed from response body.
 * @throws {error} - status and description of the error.
 */
function put(api, data) {
  const options = {
    headers: new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }),
    method: 'PUT',
    body: JSON.stringify(data)
  };
  return configuredHost
    .then(host => fetch(`${host}${api}`, options))
    .then(response => getJsonFromResponse(response));
}

/**
 * Sends a delete request to the server.
 * @param {string} api - api url.
 * @returns {Promise<object|null>} - a js object formed from response body.
 * @throws {error} - status and description of the error.
 */
function delete1(api) {
  const options = {
    headers: new Headers({'Accept': 'application/json'}),
    method: 'DELETE'
  };
  return configuredHost
    .then(host => fetch(`${host}${api}`, options))
    .then(response => getJsonFromResponse(response));
}

export default {
  get,
  post,
  put,
  'delete': delete1
}
