import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ReactEventOutside from 'react-event-outside';

// Content
import TourList from './containers/TourList/TourList';
import TourSettings from './containers/TourSettings/TourSettings';
import StepEditor from './containers/StepEditor/StepEditor';
import Popup from './containers/Popup/Popup';
import { GT_ROOT_ID, GT_EVENTS } from './constants/constants';

// Data
import Data from '../mocked-data/data';

import './index.css';

const GUIDED_TOUR_INDEX = 0;  // TODO: add choice of guided tour by click;

class GuideTour extends React.Component {
  constructor() {
    super();
    this.state = {
      isPopupShown: false
    }
  }

  handleEvent = event => {
    Object.keys(GT_EVENTS).forEach(gtEvent => {
      if (event.type !== gtEvent)
        return;
      let eventOutsideName = event.target.getAttribute(GT_EVENTS[gtEvent]);
      if (!eventOutsideName)
        return;
      switch(eventOutsideName) {
        // TODO: replace pt with px
        case 'showConfigPopup':
          this.setState({
            isPopupShown: true,
            width: 500,
            units: 'pt',
            title: 'Guided Tour Configuration',
            content: TourList,
            dataProps: {
              tourList: Data.tourList
            },
            buttons: [
              {
                title: 'Cancel',
                key: 'cancel',
                onClick: function(e) {alert('Cancel')},
                className: 'action'
              }, {
                title: 'Save',
                key: 'save',
                onClick: function(e) {alert('Save')},
                className: 'action'
              }
            ]
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
            },
            buttons: [
              {
                title: 'Cancel',
                key: 'cancel',
                onClick: function(e) {alert('Cancel')},
                className: 'action'
              }, {
                title: 'Save',
                key: 'save',
                onClick: function(e) {alert('Save')},
                className: 'action'
              }
            ]
          });
          break;
        case 'showStepEditor':
          this.setState({
            isPopupShown: true,
            width: 800,
            units: 'px',
            title: `Guided Tour Steps (${Data.tourList[GUIDED_TOUR_INDEX].tourName})`,
            content: StepEditor,
            dataProps: {
              steps: Data.tourList[GUIDED_TOUR_INDEX].steps, // TODO: change tour index by click
              selectedNumber: 2
            },
            buttons: [
              {
                title: 'Save',
                key: 'save',
                onClick: function(e) {alert('Save')},
                className: 'action'
              }, {
                title: 'Previous',
                key: 'previous',
                onClick: (evt) => {
                  if (this.state.dataProps.selectedNumber <= 1)
                    return; // TODO: add disabled attribute
                  let dataProps = Object.assign({}, this.state.dataProps);  // TODO: make a deep copy of nested array
                  dataProps.selectedNumber--;
                  this.setState({
                    dataProps: dataProps,

                  });
                },
                className: 'action'
              }, {
                title: 'Next',
                key: 'next',
                onClick: (evt) => {
                  if (this.state.dataProps.selectedNumber >= Data.tourList[GUIDED_TOUR_INDEX].steps.length)
                    return; // TODO: add disabled attribute
                  let dataProps = Object.assign({}, this.state.dataProps);  // TODO: make a copy of nested array
                  dataProps.selectedNumber++;
                  this.setState({
                    dataProps
                  });
                },
                className: 'action'
              }
            ]
          });
          break;
        default:
          console.log(`There is no event handler for "${eventOutsideName}"`);
      }
    });
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

  // TODO: remove on prod (only to facilitate test of components)
  componentDidMount() {
    let bt = document.querySelector('[gt-onclick=showStepEditor]');
    setTimeout(() => {
      bt.click();
    }, 0);
  }

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
                     buttons={state.buttons}
                     closeHandler={this.closeHandler}
            /> : null}
        </div>
      </div>
    );
  }
}

const SharedComponent = ReactEventOutside(Object.keys(GT_EVENTS))(GuideTour);

let gtRoot = document.createElement('div');
gtRoot.id = GT_ROOT_ID;
document.body.appendChild(gtRoot);

ReactDOM.render(<SharedComponent/>, gtRoot);
