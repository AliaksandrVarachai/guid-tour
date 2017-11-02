import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TourEditorStep.css';

TourEditorStep.propTypes = {
  index: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string
};

export default function TourEditorStep({index, currentIndex, title, details}) {
  return (
    <div styleName="step">
      <div styleName="step-progress">
        <span styleName={classNames(
          'step-progress-bar-before',
          {'passed': index <= currentIndex}
        )}/>
        <span styleName={classNames(
          'step-progress-icon',
          {'passed': index < currentIndex},
          {'selected': index === currentIndex}
        )}>{index + 1}</span>
        <span styleName={classNames(
          'step-progress-bar-after',
          {'passed': index < currentIndex}
        )}/>
      </div>
      <div styleName={classNames(
        'step-label',
        {'passed': index < currentIndex},
        {'selected': index === currentIndex}
      )}>
        <div styleName="step-title">
          {title}
        </div>
        <div styleName="step-details">
          {details ? `(${details})` : null}
        </div>
      </div>
    </div>
  )
}
