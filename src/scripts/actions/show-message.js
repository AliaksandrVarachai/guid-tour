import { NOTIFICATION_TYPES } from '../constants/tour-settings';

/**
 * Shows message to user.
 * @param {string} message - text message.
 * @param {string} messageType - message type.
 */
export function showMessage(message, messageType) {
  if (!NOTIFICATION_TYPES[messageType])
    throw Error(`Type of message must be a string from the list: ${Object.keys(NOTIFICATION_TYPES).join(', ')}`);
  return dispatch => {
    dispatch({
      type: 'CHANGE_NOTIFICATION',
      message,
      messageType: NOTIFICATION_TYPES[messageType]
    });
  }
}
