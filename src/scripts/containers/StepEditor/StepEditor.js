import React from 'react';
import PropTypes from 'prop-types';
import TourEditorSteps from '../../components/TourEditorSteps/TourEditorSteps';
import SE_TourSteps from './SE_TourSteps';
import SE_StepDetail from './SE_StepDetail';
import SE_StepTarget from './SE_StepTarget';
import SE_Summary from './SE_Summary';

import './StepEditor.css';

export default class StepEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    tourEditorSteps: PropTypes.array.isRequired,
    tourSteps: PropTypes.array.isRequired,
    currentTourEditorStepIndex: PropTypes.number.isRequired,
    settings: PropTypes.object.isRequired,
  };

  render() {
    const { tourEditorSteps, tourSteps, currentTourEditorStepIndex, settings } = this.props;
    const componentName = tourEditorSteps[currentTourEditorStepIndex].componentName;

    const CURRENT_STEP_INDEX = 0; // make a variable

    return (
      <div className="gt-step-editor">
        <TourEditorSteps steps={tourEditorSteps} currentIndex={currentTourEditorStepIndex} />
        {componentName === 'SE_TourSteps' ? <SE_TourSteps steps={tourSteps} currentIndex={CURRENT_STEP_INDEX} /> : null}
        {componentName === 'SE_StepDetail' ? <SE_StepDetail settings={settings} details={tourEditorSteps[currentTourEditorStepIndex].details} /> : null}
        {componentName === 'SE_StepTarget' ? <SE_StepTarget details={tourEditorSteps[currentTourEditorStepIndex].details} /> : null}
        {componentName === 'SE_Summary' ? <SE_Summary step={tourSteps[CURRENT_STEP_INDEX]} settings={settings} details={tourEditorSteps[currentTourEditorStepIndex].details} /> : null}
      </div>
    )
  }
}

