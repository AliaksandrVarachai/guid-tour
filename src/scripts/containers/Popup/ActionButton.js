import React from 'react';
import PropTypes from 'prop-types';

import './ActionButton.css';

function ActionButton(props) {
  let defaultClassName = 'action';

  return (
    <button styleName={props.className || defaultClassName} onClick={props.onClick.bind(this)}>
      {props.title}
    </button>
  )
}

ActionButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.oneOf(['action', 'action-capitalized']) //for adding of new css classes
};

export default ActionButton;



