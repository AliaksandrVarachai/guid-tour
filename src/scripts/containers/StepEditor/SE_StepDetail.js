import React from 'react';
import { connect } from 'react-redux';
import WindowOrientation from '../../components/WindowOrientation/WindowOrientation';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import { ORIENTATION_NAMES } from '../../constants/tour-settings';
import * as actions from '../../actions';

import './SE_StepDetail.pcss';

class SE_StepDetail extends React.Component {
  constructor(props) {
    super(props);
    const step = props.tours[props.tourIndex].steps[props.tourStepIndex];
    this.state = {
      tourStepName: step.name,
      htmlContent: step.htmlContent,
      styleId: step.styleId,
      width: step.width,
      height: step.height,
      orientation: step.orientation,
    };
  }

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

  changeStyleHandler = (event) => {
    this.changeStateAndDispatch('styleId', event.target.value);
  };

  changeWidthHandler = (event) => {
    this.changeStateAndDispatch('width', event.target.value);
  };

  changeHeightHandler = (event) => {
    this.changeStateAndDispatch('height', event.target.value);
  };

  changeOrientationHandler = (event) => {
    this.changeStateAndDispatch('orientation', +event.target.value);
  };

  changeRichTextEditorHandler = (event) => {
    this.changeStateAndDispatch('htmlContent', event.toString('html'));
  };
  // TODO:window style, styles editor button, preview button 
  render() {
    const { tourStepName, htmlContent, styleId, width, height, orientation } = this.state;
    return (
      <div styleName="container">
        <div styleName="text-editor-container">
          <input type="text" maxLength="100" styleName="details" value={tourStepName} onChange={this.changeTourStepNameHandler} />
          <div styleName="text-editor">
            <RichTextEditor value={this.state.htmlContent} onChange={this.changeRichTextEditorHandler}/>
          </div>
        </div>
        <div styleName="settings-container">
          <div styleName="table">
            <div styleName="row" style={{display: 'none'}}>
              <div styleName="cell param-name">Window Style</div>
              <div styleName="cell param-value">
                <input type="text" value={styleId} onChange={this.changeStyleHandler} />
              </div>
              <div styleName="cell">
                <button styleName="action">Styles Editor</button>
              </div>
            </div>
            {/* TODO: uncomment when width & height will be defined */}
            {/*
            <div styleName="row">
              <div styleName="cell param-name">Width</div>
              <div styleName="cell param-value">
                <span styleName="units">px.</span>
                <input type="text" value={width} onChange={this.changeWidthHandler} />
              </div>
              <div styleName="cell" style={{visibility: 'hidden'}}>
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
             */}
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

const mapDispatchToProps = (dispatch) => {
  return {
    changeTourStep: (...args) => dispatch(actions.changeTourStep(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SE_StepDetail);

