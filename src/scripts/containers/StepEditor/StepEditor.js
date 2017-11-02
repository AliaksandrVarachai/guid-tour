import React from 'react';
import PropTypes from 'prop-types';
import TourEditorSteps from '../../components/TourEditorSteps/TourEditorSteps';
import SE_TourSteps from './SE_TourSteps';

import './StepEditor.css';

export default class StepEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    tourEditorSteps: PropTypes.array.isRequired,
    tourSteps: PropTypes.array.isRequired,
    currentTourEditorStepIndex: PropTypes.number.isRequired,
  };

  render() {
    const {tourEditorSteps, tourSteps, currentTourEditorStepIndex} = this.props;
    const componentName = tourEditorSteps[currentTourEditorStepIndex].componentName;
    return (
      <div className="gt-step-editor">
        <TourEditorSteps steps={tourEditorSteps} currentIndex={currentTourEditorStepIndex} />
        {componentName === 'SE_TourSteps' ? <SE_TourSteps steps={tourSteps} currentIndex={0} /> : null}
      </div>
    )
  }
}

