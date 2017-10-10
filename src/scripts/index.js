import '../index.html';

import React from 'react';
import ReactDOM from 'react-dom';

import ConfigPopup from './containers/ConfigPopup/ConfigPopup';

// TODO: Move data loading from container to index.js

import './index.css';

class GuideTour extends React.Component {
  constructor() {
    super();
    this.state = {
      isPopupShown: false,
      popup: null,
      left: 0,
      top: 0
    }
  }

  actionClick = evt => {
    this.setState({
      isPopupShown: !this.state.isPopupShown,
      popup: ConfigPopup,
      left: Math.floor(Math.random() * 200), //evt.pageX,
      top: Math.floor(Math.random() * 400)   //evt.pageY
    });
  };


  render() {
    let state = this.state;
    return (
      <div className="container" style={{height: "100%"}}>
        <h1>
          HEADER (TODO: move to separate component)
        </h1>
        <div className="content">
          <button name="show-gt-config" className="action" onClick={this.actionClick}>
            Guided Tour Configuration
          </button>
        </div>
        <div id="popups-store">
          {this.state.isPopupShown ? <ConfigPopup/> : null}
        </div>
        <h2>
          FOOTER (TODO: move to separate component)
        </h2>
      </div>
    );
  }
}

ReactDOM.render(<GuideTour/>, document.getElementById('gt-root'));
