import globals from '../../tool-specific-helpers/globals';
import { DomValidationError } from '../../errors';

/**
 * Verifies the tool-specific data before Guided Tour is initialized.
 * @returns {Promise} - a promise that returns null if resolved and throws DomValidationError if rejected.
 */
export default function() {
  // TODO: validate Microstrategy objects
  if (globals.window) {
    return Promise.resolve(null);
  } else {
    return Promise.reject(new DomValidationError('Global objects of Microstrategy are not specified.'));
  }
}
