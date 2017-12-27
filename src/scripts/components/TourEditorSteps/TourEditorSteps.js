import React from 'react';
import PropTypes from 'prop-types';
import TourEditorStep from './TourEditorStep';

import './TourEditorSteps.pcss';

TourEditorSteps.propTypes = {
  steps: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
};

export default function TourEditorSteps({steps, currentIndex}) {
  return (
    <div styleName="container">
      {steps.map((step, index) => <TourEditorStep index={index}
                                                  currentIndex={currentIndex}
                                                  {...step}
                                                  key={index}
      />)}
    </div>
  )
}
