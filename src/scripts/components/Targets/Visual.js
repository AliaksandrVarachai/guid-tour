import React from 'react';
import PropTypes from 'prop-types';

import './Page.pcss';

Visual.propTypes = {
  title: PropTypes.string.isRequired
};

export default function Visual(props) {
  return (
    <div styleName="container">
      {props.title}
    </div>
  )
}

