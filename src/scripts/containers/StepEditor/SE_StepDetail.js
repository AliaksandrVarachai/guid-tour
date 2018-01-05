import React from 'react';
import { connect } from 'react-redux';
import WindowOrientation from '../../components/WindowOrientation/WindowOrientation';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import { ORIENTATION_NAMES } from '../../constants/tour-settings';

import './SE_StepDetail.pcss';

class SE_StepDetail extends React.Component {
  constructor(props) {
    super(props);
    const step = props.tours[props.tourIndex].steps[props.tourStepIndex];
    const _window = step.settings.window;
    this.state = {
      tourStepName: step.tourStepName,
      content: step.content,
      style: _window.style,
      width: _window.width,
      height: _window.height,
      orientation: _window.orientation,
    };
  }

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

  changeStyleHandler = (event) => {
    this.changeStateAndDispatch('style', event.target.value);
  };

  changeWidthHandler = (event) => {
    this.changeStateAndDispatch('width', event.target.value);
  };

  changeHeightHandler = (event) => {
    this.changeStateAndDispatch('height', event.target.value);
  };

  changeOrientationHandler = (event) => {
    this.changeStateAndDispatch('orientation', event.target.value);
  };

  render() {
    const { tourStepName, content, style, width, height, orientation } = this.state;
    return (
      <div styleName="container">
        <div styleName="text-editor-container">
          <input type="text" styleName="details" value={tourStepName} onChange={this.changeTourStepNameHandler} />
          <div styleName="text-editor">
            <RichTextEditor value={content} />
          </div>
        </div>
        <div styleName="settings-container">
          <div styleName="table">
            <div styleName="row">
              <div styleName="cell param-name">Window Style</div>
              <div styleName="cell param-value">
                <input type="text" value={style} onChange={this.changeStyleHandler} />
              </div>
              <div styleName="cell">
                <button styleName="action">Styles Editor</button>
              </div>
            </div>
            <div styleName="row">
              <div styleName="cell param-name">Width</div>
              <div styleName="cell param-value">
                <span styleName="units">px.</span>
                <input type="text" value={width} onChange={this.changeWidthHandler} />
              </div>
              <div styleName="cell">
                <button styleName="action">Preview</button>
              </div>
            </div>
            <div styleName="row">
              <div styleName="cell param-name">Height</div>
              <div styleName="cell param-value">
                <span styleName="units">px.</span>
                <input type="text" value={height} onChange={this.changeHeightHandler} />
              </div>
              <div styleName="cell"/>
            </div>
          </div>
          <div styleName="window-orientation">
            <div styleName="orientation-title">Window orientation: {ORIENTATION_NAMES[orientation]}</div>
            <div styleName="window-orientation-component">
              <WindowOrientation orientation={orientation} changeOrientationHandler={this.changeOrientationHandler} />
            </div>
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

export default connect(mapStateToProps)(SE_StepDetail)

