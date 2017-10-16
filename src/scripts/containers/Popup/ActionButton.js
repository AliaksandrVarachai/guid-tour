import React from 'react';
import PropTypes from 'prop-types';

function ActionButton(props) {
  return (
    <button className="action" onClick={props.onClick.bind(this)}>
      {props.title}
    </button>
  )
}

ActionButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ActionButton;



