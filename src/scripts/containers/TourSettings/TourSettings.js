import React from 'react';

import './TourSettings.css';

export default class SettingsPopup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="gt-settings-popup-container">
        <div styleName="table">
          <div styleName="row">
            <div styleName="cell">
              <input type="checkbox" id="gt-display-notification-option"/>
            </div>
            <div styleName="cell">
              <div styleName="option-name">
                <label htmlFor="gt-display-notification-option">
                  Display Notification
                </label>
              </div>
              <div styleName="option-details">
                Notify end users of the dashboard about the availability of tours, when it is opened from web client.
              </div>
            </div>
          </div>
          <div styleName="row">
            <div styleName="cell">
              <input type="checkbox" id="gt-public-tour-option"/>
            </div>
            <div styleName="cell">
              <div styleName="option-name">
                <label htmlFor="gt-public-tour-option">
                  Public Tour
                </label>
              </div>
              <div styleName="option-details">
                Adjust visibility of the tour. Public tours are available for Everyone, while non-public tours are visible only for current User.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
