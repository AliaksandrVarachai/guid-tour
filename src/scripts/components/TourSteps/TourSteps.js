import React from 'react';
import PropTypes from 'prop-types';
import TourStep from './TourStep';
import { TOUR_STEP_REQUIRED_FIELDS } from '../../constants/tour-settings';
import documentHelpers from '../../tool-specific-helpers/targets-parsing';
import { sortStepsByIndex } from '../../helpers/tour-step-helper';

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
      {sortStepsByIndex(steps).map((step, index) => {
        const visual = visuals[step.customTargetId] || '';
        const page =  pages[visual.pageId] || '';
        return <TourStep index={index}
                         isChecked={index === tourStepIndex}
                         tourStepIndex={tourStepIndex}
                         tourStepName={step.name}
                         targetPage={page.title}
                         targetControl={visual.title}
                         htmlContent={step.htmlContent}
                         isSynchronized={step.isSynchronized}
                         isNew={step.isNew}
                         key={step.id}
        />
      })}
      {isNewEditableTourStepAdded ? <TourStep tourStepName={TOUR_STEP_REQUIRED_FIELDS.name}
                                          cancelAddNewTourStep={cancelAddNewTourStep}
                                          isEditable={true}
      /> : null }
    </div>
  );
}
