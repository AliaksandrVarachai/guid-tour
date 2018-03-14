import React from 'react';
import { connect } from 'react-redux';
import WindowOrientation from '../../components/WindowOrientation/WindowOrientation';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import { ORIENTATION_NAMES, TOUR_STEP_REQUIRED_FIELDS } from '../../constants/tour-settings';
import * as actions from '../../actions';

import './SE_StepDetail.pcss';

function checkAutoSize(width, height) {
  return width === 0 || height === 0;
}

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
      // private values to store previous state
      prevWidth: step.width || TOUR_STEP_REQUIRED_FIELDS.width,
      prevHeight: step.height || TOUR_STEP_REQUIRED_FIELDS.height,
    };
  };

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

  changeHtmlTextEditorHandler = (event) => {
    this.changeStateAndDispatch('htmlContent', event.target.value);
  };

  displayRichTextEditor = (event) => {
    document.getElementById('html-text-editor-container').style.display = "none";
    document.getElementById('rich-text-editor-container').style.display = "block";
  };

  displayHtmlTextEditor = (event) => {
    document.getElementById('html-text-editor-container').style.display = "block";
    document.getElementById('rich-text-editor-container').style.display = "none";
  };

  sizeHandler = (width = 0, height = 0) => {
    this.setState({
      prevWidth: this.state.width || TOUR_STEP_REQUIRED_FIELDS.width,
      prevHeight: this.state.height || TOUR_STEP_REQUIRED_FIELDS.height
    });
    this.changeStateAndDispatch('width', width);
    this.changeStateAndDispatch('height', height);
  };

  // TODO:window style, styles editor button, preview button 
  render() {
    const { tourStepName, htmlContent, styleId, width, height, orientation, prevWidth, prevHeight } = this.state;
    const isAutoSize = checkAutoSize(width, height);
    return (
      <div styleName="container">
        <div styleName="text-editor-container">
          <input type="text" maxLength="100" styleName="details" value={tourStepName} onChange={this.changeTourStepNameHandler} />
          <div styleName="toggle">
            <label>
              <input type="radio" name="editorSelectGroup" onClick={this.displayRichTextEditor} defaultChecked={true}/>
              <span>Rich Text Editor</span>
            </label>
            <label>
              <input type="radio" name="editorSelectGroup" onClick={this.displayHtmlTextEditor}/>
              <span>Html Editor</span>
            </label>
          </div>
          <div id="rich-text-editor-container" styleName="text-editor">
            <RichTextEditor value={this.state.htmlContent} onChange={this.changeRichTextEditorHandler}/>
          </div>
          <div id="html-text-editor-container" styleName="text-editor" style={{display: 'none'}}>
            <textarea rows="23" cols="64" value={this.state.htmlContent} onChange={this.changeHtmlTextEditorHandler} style={{resize: 'none'}}/>
          </div>
        </div>
        <div styleName="settings-container">
        {/* TODO: uncomment when width & height will be defined */}
        {/*
          <div styleName="table"style={{display: 'none'}}>
            <div styleName="row">
              <div styleName="cell param-name">Window Style</div>
              <div styleName="cell param-value">
                <input type="text" value={styleId} onChange={this.changeStyleHandler} />
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
          </div>
          */}
          <div styleName="toggle">
            <label>
              <input type="radio" name="sizeSelectGroup" onClick={e => this.sizeHandler(prevWidth, prevHeight)} defaultChecked={!isAutoSize}/>
              <span>Custom size</span>
            </label>
            <label>
              <input type="radio" name="sizeSelectGroup" onClick={e => this.sizeHandler()} defaultChecked={isAutoSize}/>
              <span>Autosize</span>
            </label>
          </div>
          <div id="size-editor" className={isAutoSize ? 'gtu__hidden' : null}>
            <div styleName="size-editor-row">
              <div styleName="size-editor-row-name">Width</div>
              <div styleName="size-editor-row-value">
                <input type="text" value={width} onChange={this.changeWidthHandler}/> px.
              </div>
            </div>
            <div styleName="size-editor-row">
              <div styleName="size-editor-row-name">Height</div>
              <div styleName="size-editor-row-value">
                <input type="text" value={height} onChange={this.changeHeightHandler}/> px.
              </div>
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

const mapDispatchToProps = (dispatch) => {
  return {
    changeTourStep: (...args) => dispatch(actions.changeTourStep(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SE_StepDetail);
