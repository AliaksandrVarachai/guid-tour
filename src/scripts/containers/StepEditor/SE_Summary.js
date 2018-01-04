import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PreviewWindow from '../../components/PreviewWindow/PreviewWindow';
import { TOUR_EDITOR_STEPS } from '../../constants/tour-settings.js';

import './SE_Summary.pcss';

class SE_StepTarget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: TOUR_EDITOR_STEPS[props.stepEditorIndex].details, // TODO: replace input by div or move to tour???
    };
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

  changeDetailsHandler = (event) => {
    this.setState({details: event.target.value})
  };

  render() {
    const { details } = this.state;
    const { tours, tourIndex, tourStepIndex } = this.props;
    const tour = tours[tourIndex];
    const settings = tour.settings;
    const step = tour.steps[tourStepIndex];

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

const mapStateToProps = (state) => {
  return {
    tours: state.tours,
    tourIndex: state.tourIndex,
    tourStepIndex: state.tourStepIndex,
    stepEditorIndex: state.stepEditorIndex
  }
};

export default connect(mapStateToProps)(SE_StepTarget)
