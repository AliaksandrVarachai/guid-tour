import React from 'react';
import PropTypes from 'prop-types';
import { ORIENTATION_NAMES } from '../../constants/tour-settings';

import './PreviewWindow.pcss';

PreviewWindow.propTypes = {
  orientation: PropTypes.number.isRequired
};

export default function PreviewWindow({ orientation }) {
  return (
    <div styleName="container table">
      <div styleName={`cell ${ORIENTATION_NAMES[orientation].toLowerCase()}`}>
        <div styleName="popup">
          <div styleName="popup-title">
            <span styleName="close">X</span>
            <span>Title</span>
          </div>
          <div styleName="popup-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt dolore dolorem dolorum impedit itaque minus nisi, perspiciatis ut veniam veritatis.
          </div>
        </div>
      </div>
    </div>
  )
}
