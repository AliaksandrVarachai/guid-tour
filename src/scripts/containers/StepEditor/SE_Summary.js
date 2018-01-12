import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PreviewWindow from '../../components/PreviewWindow/PreviewWindow';
import documentData from '../../tool-specific-helpers';

import './SE_Summary.pcss';

class SE_StepTarget extends React.Component {
  constructor(props) {
    super(props);
    const { tours, tourIndex, tourStepIndex } = this.props;
    this.state = {
      tourStepName: tours[tourIndex].steps[tourStepIndex].tourStepName,
    };
  }

  // TODO: NOT REMOVE before adding of flow in mapStateToProps!!!
  // static propTypes = {
  //   details: PropTypes.string.isRequired,
  //   style: PropTypes.string.isRequired,
  //   width: PropTypes.number.isRequired,
  //   height: PropTypes.number.isRequired,
  //   orientation: PropTypes.string.isRequired
  //   step: PropTypes.object.isRequired
  // };

  changeStateAndDispatch = (propName, value) => {
    this.setState({
      [propName]: value
    });
    this.props.dispatch({
      type: 'CHANGE_TOUR_STEP',
      propName,
      value
    });
  };

  changeTourStepNameHandler = (event) => {
    this.changeStateAndDispatch('tourStepName', event.target.value);
  };

  render() {
    const { tourStepName } = this.state;
    const { tours, tourIndex, tourStepIndex } = this.props;
    const step = tours[tourIndex].steps[tourStepIndex];
    const visual = documentData.visuals[step.visualId] || '';
    const page =  documentData.pages[visual.pageId] || '';

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
          <div styleName="variables-list-item">
            <span styleName="variable-name">Window theme</span>
            <span styleName="variable-value">{step.style}</span>
          </div>
          <div styleName="variables-list-item">
            <span styleName="variable-name">Window orientation</span>
            <span styleName="variable-value">{step.orientation}</span>
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

export default connect(mapStateToProps)(SE_StepTarget)
