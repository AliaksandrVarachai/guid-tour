import '../index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactEventOutside from 'react-event-outside';

// Content
import TourList from './components/TourList/TourList';
import TourSettings from './containers/TourSettings/TourSettings';

import Popup from './containers/Popup/Popup';

// Data
import Data from './data';

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
    if (!eventOutsideName)
      return;
    switch(eventOutsideName) {
      case 'showConfigPopup':
        this.setState({
          isPopupShown: true,
          width: '500pt',
          title: 'Guided Tour Configuration',
          content: TourList,
          dataProps: {
            tourList: Data.tourList
          }
        });
        break;
      case 'showSettingsPopup':
        this.setState({
          isPopupShown: true,
          width: '350pt',
          title: 'Tour Settings',
          content: TourSettings,
          dataProps: {
            somePropName: 'qwerty'
          }
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

  closeHandler = (event) => {
    this.setState({
      isPopupShown: false
    });
  };

  render() {
    let state = this.state;
    return (
      <div className="gt-container">
        <div id="popups-store">
          {state.isPopupShown
            ? <Popup title={state.title}
                                       content={state.content}
                                       dataProps={state.dataProps}
                                       width={state.width}
                                       closeHandler={this.closeHandler}
            /> : null}
        </div>
      </div>
    );
  }
}

// ReactDOM.render(ReactEventOutside(['click'])(GuideTour), document.getElementById('gt-root'));
const SharedComponent = ReactEventOutside(['click'])(GuideTour);

ReactDOM.render(<SharedComponent/>, document.getElementById('gt-root'));
