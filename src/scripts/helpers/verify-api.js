import communication from '../rest-api/helpers/communication';
import { ApiValidationError } from '../errors';

export default function() {
  return communication.get('api/Tours/getapiversion')
    .then(versionApiMsg => null)
    .catch(msg => Promise.reject(new ApiValidationError()));
}
