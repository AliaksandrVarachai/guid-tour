import React from 'react';
import PropTypes from 'prop-types';

import table from '../../../shared-styles/table.css';
import styles from './Tour.css';

Tour.propTypes = {
  tourName: PropTypes.string,
  tourType: PropTypes.string,
  lastOpen: PropTypes.string,
  visitors: PropTypes.number,
  steps: PropTypes.number,
  creator: PropTypes.string,
  isHeader: PropTypes.bool,
};

// TODO: add required for properties (exclude of isHeader == true)
export default function Tour({tourName, tourType, lastOpen, visitors, steps, creator, isHeader = false}) {
  return (
    isHeader ?
      <div styleName="table.row">
        <div styleName="table.header">
          {tourName ? tourName : "Tour Name"}
        </div>
        <div styleName="table.header">
          {tourType ? tourType : "Tour Type"}
        </div>
        <div styleName="table.header">
          {lastOpen ? lastOpen : "Last Open"}
        </div>
        <div styleName="table.header">
          {visitors ? visitors : "# Visitors"}
        </div>
        <div styleName="table.header">
          {steps ? steps : "# Steps"}
        </div>
        <div styleName="table.header">
          {creator ? creator : "Creator"}
        </div>
        <div styleName="table.header">
          {null}
        </div>
      </div>
      :
      <div styleName="table.row">
        <div styleName="table.cell">
          {tourName}
        </div>
        <div styleName="table.cell">
          {tourType}
        </div>
        <div styleName="table.cell">
          {lastOpen}
        </div>
        <div styleName="table.cell">
          {visitors}
        </div>
        <div styleName="table.cell">
          {steps}
        </div>
        <div styleName="table.cell">
          {creator}
        </div>
        <div styleName="table.cell">
          <i className="material-icons" styleName="styles.action">content_copy</i>
          <i className="material-icons" styleName="styles.action">create</i>
          <i className="material-icons" styleName="styles.action">delete</i>
        </div>
      </div>
  )
}

