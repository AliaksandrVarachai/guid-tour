import React from 'react';
import PropTypes from 'prop-types';
import TourStep from './TourStep';

import table from '../../../shared-styles/table.css';
import styles from './TourSteps.css';

TourSteps.propTypes = {
  steps: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired
};

export default function TourSteps({steps, currentIndex}) {
  return (
    <div styleName="table.table">
      <TourStep isHeader={true}/>
      {steps.map((step, index) => <TourStep isChecked={index === currentIndex}
                                            tourStepName={step.tourStepName}
                                            targetPage={step.targetPage}
                                            targetControl={step.targetControl}
                                            content={step.content}
                                            key={index}
      />)}
    </div>
  );
}
