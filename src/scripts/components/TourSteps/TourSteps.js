import React from 'react';
import PropTypes from 'prop-types';
import TourStep from './TourStep';
import { DEFAULT_NEW_STEP_SETTINGS } from '../../constants/tour-settings';
import documentHelpers from '../../tool-specific-helpers';

import './TourSteps.pcss';

TourSteps.propTypes = {
  steps: PropTypes.array.isRequired,
  tourStepIndex: PropTypes.number.isRequired,
  isNewEditableTourStepAdded: PropTypes.bool,
  cancelAddNewTourStep: PropTypes.func
};

export default function TourSteps({steps, tourStepIndex, isNewEditableTourStepAdded = false, cancelAddNewTourStep = function() {}}) {
  const { visuals, pages } = documentHelpers.getTargets();
  return (
    <div className="gtu__table gtu__w100" styleName="steps-container">
      <TourStep isHeader={true}/>
      {steps.map((step, index) => {
        const visual = visuals[step.visualId] || '';
        const page =  pages[visual.pageId] || '';
        return <TourStep index={index}
                         isChecked={index === tourStepIndex}
                         tourStepIndex={tourStepIndex}
                         tourStepName={step.tourStepName}
                         targetPage={page.title}
                         targetControl={visual.title}
                         content={step.content}
                         key={index}
        />
      })}
      {isNewEditableTourStepAdded ? <TourStep tourStepName={DEFAULT_NEW_STEP_SETTINGS.tourStepName}
                                          cancelAddNewTourStep={cancelAddNewTourStep}
                                          isEditable={true}
      /> : null }
    </div>
  );
}
