import React from 'react';
import PropTypes from 'prop-types';

import table from '../../../styles/table.css';
import styles from './TourStep.css';

TourStep.propTypes = {
  isChecked: PropTypes.bool,
  tourStepName: PropTypes.string,
  targetPage: PropTypes.string,
  targetControl: PropTypes.string,
  content: PropTypes.string,
  isHeader: PropTypes.bool
};

export default function TourStep({isChecked, tourStepName, targetPage, targetControl, content, isHeader = false}) {
  return (
    isHeader ?
      <div styleName="table.row">
        <div styleName="table.header styles.col-1">
          {null}
        </div>
        <div styleName="table.header styles.col-2">
          {tourStepName ? tourStepName : "Tour Step Name"}
        </div>
        <div styleName="table.header styles.col-3">
          {targetPage ? targetPage : "Target Page"}
        </div>
        <div styleName="table.header styles.col-4">
          {targetControl ? targetControl : "Target Control"}
        </div>
        <div styleName="table.header styles.col-5">
          {content ? content : "Content"}
        </div>
        <div styleName="table.header styles.col-6">
          {null}
        </div>
        <div styleName="table.header styles.col-7">
          {null}
        </div>
      </div>
      :
      <div styleName="table.row">
        <div styleName="table.cell">
          <input type="radio" name="tour-item-radio" defaultChecked={isChecked}/>
        </div>
        <div styleName="table.cell">
          {tourStepName}
        </div>
        <div styleName="table.cell">
          {targetPage}
        </div>
        <div styleName="table.cell">
          {targetControl}
        </div>
        <div styleName="table.cell">
          {content}
        </div>
        <div styleName="table.cell">
          <i className="material-icons" styleName="styles.action">keyboard_arrow_up</i>
          <i className="material-icons" styleName="styles.action">keyboard_arrow_down</i>
        </div>
        <div styleName="table.cell">
          <i className="material-icons" styleName="styles.action">content_copy</i>
          <i className="material-icons" styleName="styles.action">create</i>
          <i className="material-icons" styleName="styles.action">delete</i>
        </div>
      </div>
  );
}
