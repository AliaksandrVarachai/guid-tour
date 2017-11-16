import React from 'react';
import { connect } from 'react-redux';
import TourEditorSteps from '../../components/TourEditorSteps/TourEditorSteps';
import SE_TourSteps from './SE_TourSteps';
import SE_StepDetail from './SE_StepDetail';
import SE_StepTarget from './SE_StepTarget';
import SE_Summary from './SE_Summary';

import './StepEditor.css';

class StepEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tourEditorSteps,currentTourEditorStepIndex } = this.props;
    const componentName = tourEditorSteps[currentTourEditorStepIndex].componentName;

    const CURRENT_STEP_INDEX = 0; // make a variable

    return (
      <div className="gt-step-editor">
        <TourEditorSteps steps={tourEditorSteps} currentIndex={currentTourEditorStepIndex} />
        {componentName === 'SE_TourSteps' ? <SE_TourSteps currentIndex={CURRENT_STEP_INDEX} /> : null}
        {componentName === 'SE_StepDetail' ? <SE_StepDetail /> : null}
        {componentName === 'SE_StepTarget' ? <SE_StepTarget /> : null}
        {componentName === 'SE_Summary' ? <SE_Summary currentStepIndex={CURRENT_STEP_INDEX} /> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const component = state.COMPONENTS[state.componentName];
  return {
    tourEditorSteps: component.componentProps.tourEditorSteps,
    currentTourEditorStepIndex: component.componentProps.currentTourEditorStepIndex
  }
};

export default connect(mapStateToProps)(StepEditor);

