import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Step.css';

Step.propTypes = {
  number: PropTypes.number.isRequired,
  selectedNumber: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  details: PropTypes.string
};

export default function Step({number, selectedNumber, title, details}) {
  return (
    <div styleName="step">
      <div styleName="step-progress">
        <span styleName={classNames(
          'step-progress-bar-before',
          {'passed': number <= selectedNumber}
        )}/>
        <span styleName={classNames(
          'step-progress-icon',
          {'passed': number < selectedNumber},
          {'selected': number === selectedNumber}
        )}>{number}</span>
        <span styleName={classNames(
          'step-progress-bar-after',
          {'passed': number < selectedNumber}
        )}/>
      </div>
      <div styleName={classNames(
        'step-label',
        {'passed': number < selectedNumber},
        {'selected': number === selectedNumber}
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
