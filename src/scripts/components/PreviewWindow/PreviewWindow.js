import React from 'react';
import PropTypes from 'prop-types';

import './PreviewWindow.css';

PreviewWindow.propTypes = {
  orientation: PropTypes.string.isRequired
};

export default function PreviewWindow(props) {
  return (
    <div styleName="container table">
      <div styleName={`cell ${props.orientation}`}>
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
