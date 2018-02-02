import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './ActionButton.pcss';

const ActionButton = (props) => {
  return (
    <button styleName={props.className || 'action'} onClick={props.onClick}>
      {props.title}
    </button>
  );
};

ActionButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.oneOf(['action', 'action-capitalized']) //for adding of new css classes
};

export default connect()(ActionButton);



