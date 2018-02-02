import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PreviewWindow from '../../components/PreviewWindow/PreviewWindow';
import documentHelpers from '../../tool-specific-helpers/targets-parsing';
import { ORIENTATION_NAMES } from '../../constants/tour-settings';
import * as actions from '../../actions';

import './SE_Summary.pcss';

class SE_StepSummary extends React.Component {
  constructor(props) {
    super(props);
    const { tours, tourIndex, tourStepIndex } = this.props;
    this.state = {
      tourStepName: tours[tourIndex].steps[tourStepIndex].name,
    };
  }

  // TODO: NOT REMOVE before adding of flow in mapStateToProps!!!
  // static propTypes = {
  //   details: PropTypes.string.isRequired,
  //   style: PropTypes.string.isRequired,
  //   width: PropTypes.number.isRequired,
  //   height: PropTypes.number.isRequired,
  //   orientation: PropTypes.string.isRequired
  //   step: PropTypes.object.isRequired,
  //   changeTourStep: PropTypes.func.isRequired
  // };

  changeStateAndDispatch = (propName, value) => {
    this.setState({
      [propName]: value
    });
    this.props.changeTourStep({
      [propName]: value
    });
  };

  changeTourStepNameHandler = (event) => {
    this.changeStateAndDispatch('tourStepName', event.target.value);
  };
  // TODO:window style
  render() {
    const { tourStepName } = this.state;
    const { tours, tourIndex, tourStepIndex } = this.props;
    const step = tours[tourIndex].steps[tourStepIndex];
    const { visuals, pages } = documentHelpers.getTargets();
    const visual = visuals[step.customTargetId] || '';
    const page =  pages[visual.pageId] || '';

    return (
      <div styleName="container">
        <div styleName="text-editor-container">
          <input type="text" styleName="details" value={tourStepName} onChange={this.changeTourStepNameHandler} />
          <div styleName="variables-list-title">
            Guided Tour Step Details
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Target page</span>
            <span styleName="variable-value">{page.title}</span>
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Target control</span>
            <span styleName="variable-value">{visual.title}</span>
          </div>
          <div styleName="variables-list-item" style={{display : 'none'}}>
            <span styleName="variable-name">Window style</span>
            <span styleName="variable-value">{step.style}</span>
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Window orientation</span>
            <span styleName="variable-value">{ORIENTATION_NAMES[step.orientation]}</span>
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Window width</span>
            <span styleName="variable-value">{step.width} px</span>
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Window height</span>
            <span styleName="variable-value">{step.height} px</span>
          </div>
        </div>
        <div styleName="settings-container">
          <div styleName="preview-title">
            Guided Tour Step Preview
          </div>
          <div styleName="preview-window">
            <PreviewWindow orientation={step.orientation} />
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
    tourStepIndex: state.tourStepIndex
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeTourStep: (...args) => dispatch(actions.changeTourStep(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SE_StepSummary);
