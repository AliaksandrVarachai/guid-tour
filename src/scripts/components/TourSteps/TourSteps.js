import React from 'react';
import PropTypes from 'prop-types';
import TourStep from './TourStep';
import { DEFAULT_NEW_STEP_SETTINGS } from '../../constants/tour-settings';

import './TourSteps.pcss';

TourSteps.propTypes = {
  steps: PropTypes.array.isRequired,
  currentIndex: PropTypes.number.isRequired,
  isNewEditableTourStepAdded: PropTypes.bool,
  cancelAddNewTourStep: PropTypes.func
};

export default function TourSteps({steps, currentIndex, isNewEditableTourStepAdded = false, cancelAddNewTour = function() {}}) {
  return (
    <div className="gtu__table gtu__w100" styleName="steps-container">
      <TourStep isHeader={true}/>
      {steps.map((step, index) => <TourStep isChecked={index === currentIndex}
                                            tourStepName={step.tourStepName}
                                            targetPage={step.targetPage}
                                            targetControl={step.targetControl}
                                            content={step.content}
                                            key={index}
      />)}
      {isNewEditableTourStepAdded ? <TourStep tourStepName={DEFAULT_NEW_STEP_SETTINGS.tourStepName}
                                          cancelAddNewTour={cancelAddNewTour}
                                          isEditable={true}
      /> : null }
    </div>
  );
}
