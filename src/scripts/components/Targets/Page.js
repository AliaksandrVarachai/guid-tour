import React from 'react';
import PropTypes from 'prop-types';

import './Page.css';

Page.propTypes = {
  title: PropTypes.string.isRequired
};

export default function Page(props) {
  return (
    <div styleName="container">
      {props.title}
    </div>
  )
}
