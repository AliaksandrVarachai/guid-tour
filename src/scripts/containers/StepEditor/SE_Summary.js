import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PreviewWindow from '../../components/PreviewWindow/PreviewWindow';

import './SE_Summary.pcss';

class SE_StepTarget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: props.details
    }
  }

  // TODO: NOT REMOVE before adding of flow in mapStateToProps!!!
  // static propTypes = {
  //   details: PropTypes.string.isRequired,
  //   settings: PropTypes.shape({
  //     window: PropTypes.shape({
  //       style: PropTypes.string.isRequired,
  //       width: PropTypes.number.isRequired,
  //       height: PropTypes.number.isRequired,
  //       orientation: PropTypes.string.isRequired
  //     }).isRequired,
  //   }).isRequired,
  //   step: PropTypes.object.isRequired
  // };
  static propTypes = {
    currentStepIndex: PropTypes.number.isRequired
  };

  changeDetailsHandler = (event) => {
    this.setState({details: event.target.value})
  };

  render() {
    const { details } = this.state;
    const { settings, step } = this.props;

    return (
      <div styleName="container">
        <div styleName="text-editor-container">
          <input type="text" styleName="details" value={details} onChange={this.changeDetailsHandler} />
          <div styleName="variables-list-title">
            Guided Tour Step Details
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Target page</span>
            <span styleName="variable-value">{step.targetPage}</span>
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Target control</span>
            <span styleName="variable-value">{step.targetControl}</span>
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Window theme</span>
            <span styleName="variable-value">{settings.window.style}</span>
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Window orientation</span>
            <span styleName="variable-value">{settings.window.orientation}</span>
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Window width</span>
            <span styleName="variable-value">{settings.window.width} px</span>
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Window height</span>
            <span styleName="variable-value">{settings.window.height} px</span>
          </div>
        </div>
        <div styleName="settings-container">
          <div styleName="preview-title">
            Guided Tour Step Preview
          </div>
          <div styleName="preview-window">
            <PreviewWindow orientation={settings.window.orientation} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const componentProps = state.COMPONENTS[state.componentName].componentProps;
  const currentTourEditorStepIndex = componentProps.currentTourEditorStepIndex;
  return {
    step: componentProps.tourSteps[ownProps.currentStepIndex],
    details: componentProps.tourEditorSteps[currentTourEditorStepIndex].details,
    settings: componentProps.settings // TODO: add flow with checking of settings (see state)
  }
};

export default connect(mapStateToProps)(SE_StepTarget)
