import '../index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactEventOutside from 'react-event-outside';

import ConfigPopup from './containers/ConfigPopup/ConfigPopup';
import SettingsPopup from './containers/SettingsPopup/SettingsPopup';
import Popup from './containers/Popup/Popup';

// TODO: Move data loading from container to index.js

import './index.css';

class GuideTour extends React.Component {
  constructor() {
    super();
    this.state = {
      isPopupShown: false,
      popup: null,
      // left: 0,
      // top: 0
    }
  }

  handleEvent = event => {
    let eventOutsideName = event.target.getAttribute('react-event-outside-name');
    console.log(eventOutsideName)
    if (!eventOutsideName)
      return;
    switch(eventOutsideName) {
      case 'showConfigPopup':
        this.setState({
          isPopupShown: true,
          popup: ConfigPopup,
        });
        break;
      case 'showSettingsPopup':
        this.setState({
          isPopupShown: true,
          popup: SettingsPopup
        });
        break;
      case 'showCenteredPopup':
        this.setState({
          isPopupShown: true,
          popup: Popup
        });
        break;
      default:
        console.log(`There is no event handler for "${eventOutsideName}"`);
    }
  };

  // actionClick = event => {
  //   this.setState({
  //     isPopupShown: !this.state.isPopupShown,
  //     popup: ConfigPopup,
  //     left: Math.floor(Math.random() * 200), //evt.pageX,
  //     top: Math.floor(Math.random() * 400)   //evt.pageY
  //   });
  // };

  render() {
    let state = this.state;
    return (
      <div className="gt-container">
        <div id="popups-store">
          {this.state.isPopupShown ? <this.state.popup/> : null}
        </div>
      </div>
    );
  }
}

// ReactDOM.render(ReactEventOutside(['click'])(GuideTour), document.getElementById('gt-root'));
const SharedComponent = ReactEventOutside(['click'])(GuideTour);

ReactDOM.render(<SharedComponent/>, document.getElementById('gt-root'));
