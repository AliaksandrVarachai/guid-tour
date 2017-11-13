import React from 'react';
import PropTypes from 'prop-types';
import WindowOrientation from '../../components/WindowOrientation/WindowOrientation';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';

import './SE_StepDetail.css';

export default class SE_StepDetail extends React.Component {
  constructor(props) {
    super(props);
    const _window = props.settings.window;
    this.state = {
      details: props.details,
      settings: {
        window: {
          style: _window.style,
          width: _window.width,
          height: _window.height,
          orientation: _window.orientation,
        }
      }
    };
  }

  static propTypes = {
    details: PropTypes.string.isRequired,
    settings: PropTypes.shape({
      window: PropTypes.shape({
        style: PropTypes.string.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        orientation: PropTypes.string.isRequired
      }).isRequired,
      // changeHandler: PropTypes.func.isRequired // TODO: save state to store on Save/Next action
    }).isRequired
  };

  changeDetailsHandler = (event) => {
    this.setState({
      details: event.target.value
    });
  };

  // TODO: do we need a deep copy?
  copySettings = () => {
    return Object.assign({}, {window: this.state.settings.window});
  };

  changeStyleHandler = (event) => {
    let settings = this.copySettings();
    settings.window.style = event.target.value;
    this.setState({ settings });
  };

  changeWidthHandler = (event) => {
    let settings = this.copySettings();
    settings.window.width = event.target.value;
    this.setState({ settings });
  };

  changeHeightHandler = (event) => {
    let settings = this.copySettings();
    settings.window.height = event.target.value;
    this.setState({ settings });
  };

  render() {
    const { details, settings } = this.state;

    return (
      <div styleName="container">
        <div styleName="text-editor-container">
          <input type="text" styleName="details" value={details} onChange={this.changeDetailsHandler} />
          <div styleName="text-editor">
            <RichTextEditor />
          </div>
        </div>
        <div styleName="settings-container">
          <div styleName="table">
            <div styleName="row">
              <div styleName="cell param-name">Window Style</div>
              <div styleName="cell param-value">
                <input type="text" value={settings.window.style} onChange={this.changeStyleHandler} />
              </div>
              <div styleName="cell">
                <button styleName="action">Styles Editor</button>
              </div>
            </div>
            <div styleName="row">
              <div styleName="cell param-name">Width</div>
              <div styleName="cell param-value">
                <span styleName="units">px.</span>
                <input type="text" value={settings.window.width} onChange={this.changeWidthHandler} />
              </div>
              <div styleName="cell">
                <button styleName="action">Preview</button>
              </div>
            </div>
            <div styleName="row">
              <div styleName="cell param-name">Height</div>
              <div styleName="cell param-value">
                <span styleName="units">px.</span>
                <input type="text" value={settings.window.height} onChange={this.changeHeightHandler} />
              </div>
              <div styleName="cell"/>
            </div>
          </div>
          <div styleName="window-orientation">
            <div styleName="orientation-title">Window orientation: {settings.window.orientation}</div>
            <div styleName="window-orientation-component">
              <WindowOrientation orientation={settings.window.orientation} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}


