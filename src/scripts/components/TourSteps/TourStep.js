import React from 'react';
import PropTypes from 'prop-types';

import './TourStep.pcss';

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
      <div className="gtu__table-row">
        <div className="gtu__table-cell" styleName="header header-tour-radio">
          {null}
        </div>
        <div className="gtu__table-cell" styleName="header header-tour-step">
          {tourStepName ? tourStepName : "Tour Step Name"}
        </div>
        <div className="gtu__table-cell" styleName="header header-target-page">
          {targetPage ? targetPage : "Target Page"}
        </div>
        <div className="gtu__table-cell" styleName="header header-target-control">
          {targetControl ? targetControl : "Target Control"}
        </div>
        <div className="gtu__table-cell" styleName="header header-content">
          {content ? content : "Content"}
        </div>
        <div className="gtu__table-cell" styleName="header header-scroll">
          {null}
        </div>
        <div className="gtu__table-cell" styleName="header header-actions">
          {null}
        </div>
      </div>
      :
      <div className="gtu__table-row">
        <div className="gtu__table-cell" styleName="data">
          <input type="radio" name="tour-item-radio" defaultChecked={isChecked}/>
        </div>
        <div className="gtu__table-cell" styleName="data">
          {tourStepName}
        </div>
        <div className="gtu__table-cell" styleName="data">
          {targetPage}
        </div>
        <div className="gtu__table-cell" styleName="data">
          {targetControl}
        </div>
        <div className="gtu__table-cell" styleName="data">
          {content}
        </div>
        <div className="gtu__table-cell" styleName="data">
          <i className="material-icons" styleName="action">keyboard_arrow_up</i>
          <i className="material-icons" styleName="action">keyboard_arrow_down</i>
        </div>
        <div className="gtu__table-cell" styleName="data">
          <i className="material-icons" styleName="action">content_copy</i>
          <i className="material-icons" styleName="action">create</i>
          <i className="material-icons" styleName="action">delete</i>
        </div>
      </div>
  );
}
