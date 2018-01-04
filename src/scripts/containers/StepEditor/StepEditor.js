import React from 'react';
import { connect } from 'react-redux';
import TourEditorSteps from '../../components/TourEditorSteps/TourEditorSteps';
import SE_TourSteps from './SE_TourSteps';
import SE_StepDetail from './SE_StepDetail';
import SE_StepTarget from './SE_StepTarget';
import SE_Summary from './SE_Summary';
import { TOUR_EDITOR_STEPS } from '../../constants/tour-settings.js';

import './StepEditor.pcss';

class StepEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { stepEditorIndex } = this.props;
    const componentName = TOUR_EDITOR_STEPS[stepEditorIndex].componentName;

    return (
      <div className="gt__step-editor">
        <TourEditorSteps steps={TOUR_EDITOR_STEPS} currentIndex={stepEditorIndex} />
        {componentName === 'SE_TourSteps' ? <SE_TourSteps/> : null}
        {componentName === 'SE_StepDetail' ? <SE_StepDetail/> : null}
        {componentName === 'SE_StepTarget' ? <SE_StepTarget/> : null}
        {componentName === 'SE_Summary' ? <SE_Summary/> : null}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stepEditorIndex: state.stepEditorIndex
  }
};

export default connect(mapStateToProps)(StepEditor);

