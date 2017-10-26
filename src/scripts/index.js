import '../index.html';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactEventOutside from 'react-event-outside';

// Content
import TourList from './containers/TourList/TourList';
import TourSettings from './containers/TourSettings/TourSettings';
import Popup from './containers/Popup/Popup';
import { GT_ROOT_ID } from '../constants/constants';

// Data
import Data from './data';

import './index.css';

class GuideTour extends React.Component {
  constructor() {
    super();
    this.state = {
      isPopupShown: false
    }
  }

  handleEvent = event => {
    let eventOutsideName = event.target.getAttribute('gt-onclick');
    if (!eventOutsideName)
      return;
    switch(eventOutsideName) {
      case 'showConfigPopup':
        this.setState({
          isPopupShown: true,
          width: 500,
          units: 'pt',
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
          width: 350,
          units: 'pt',
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

  /**
   * Set min-width of the document to avoid sliding up a centered popup form small width.
   * @param minWidth {number} - minimal body width (0 to restore default)
   * @param units (string) - name of units (e.g. pt, px).
   */
  bodyWidthHandler = (minWidth = 0, units = 'pt') => {
    if (minWidth) {
      document.body.style.minWidth = minWidth + units;
    } else {
      document.body.style.minWidth = '';
    }
  };

  closeHandler = (event) => {
    this.setState({
      isPopupShown: false
    });
  };

  render() {
    let state = this.state;
    if (state.isPopupShown) {
      this.bodyWidthHandler(state.width + 10, state.units);
    } else {
      this.bodyWidthHandler();
    }
    return (
      <div className="gt-container">
        <div id="popups-store">
          {state.isPopupShown
            ? <Popup title={state.title}
                                       content={state.content}
                                       dataProps={state.dataProps}
                                       width={state.width + state.units}
                                       closeHandler={this.closeHandler}
            /> : null}
        </div>
      </div>
    );
  }
}

const SharedComponent = ReactEventOutside(['click'])(GuideTour);

let gtRoot = document.createElement('div');
gtRoot.id = GT_ROOT_ID;
document.body.appendChild(gtRoot);

ReactDOM.render(<SharedComponent/>, gtRoot);
