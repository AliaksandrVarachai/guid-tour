import globals from '../../tool-specific-helpers/globals';
import { DomValidationError } from '../../errors';

/**
 * Verifies the tool-specific data before Guided Tour is initialized.
 * @returns {Promise} - a promise that returns null if resolved and throws DomValidationError if rejected.
 */
export default function() {
  if (globals.tableau && globals.tableau.VizManager) {
    return Promise.resolve(null);
  } else {
    return Promise.reject(new DomValidationError('Global objects "tableau" or "tableau.VizManager" are not specified.'));
  }
}
