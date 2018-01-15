import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import addGtButtonsToDocument from './tool-specific-helpers/buttons-addition';

// TODO: remove after API tests
import restApi from './helpers/rest-api';
restApi.run();

import './index.pcss';

// TODO: move check to Apache httpd file
if (/\/dima\//.test(parent.window.location.href)) {

  // TODO: add the event listener only for rerendering of document's visuals
  parent.tableau.VizManager.getVizs()[0].addEventListener(parent.tableau.TableauEventName.CUSTOM_VIEW_LOAD, () => {

    addGtButtonsToDocument();

    const ReactEventOutside = require('react-event-outside').default;
    const Popup = require('./containers/Popup/Popup').default;
    const { GT_ROOT_ID, GT_EVENTS } = require('./constants/dom-elements');
    const reducer = require('./reducers').default;


    const store = createStore(reducer);

    class GuidedTour extends React.Component {
      constructor(props) {
        super(props);
      }

      handleEvent = this.props.handleEvent;

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

      render() {
        const props = this.props;
        if (props.isPopupShown) {
          this.bodyWidthHandler(props.width + 10, props.units);
        } else {
          this.bodyWidthHandler();
        }
        return (
          <div className="gt__main-container gtu__pos-relative">
            <div id="popups-store">
              {props.isPopupShown ? <Popup/> : null}
            </div>
          </div>
        );
      }
    }

    const mapStateToProps = (state) => {
      const component = state.COMPONENTS[state.componentName];
      return {
        isPopupShown: state.isPopupShown,
        width: component.width,
        units: component.units
      }
    };

    const mapDispatchToProps = (dispatch) => {
      return {
        handleEvent: (event) => {
          Object.keys(GT_EVENTS).forEach(gtEvent => {
            if (event.type !== gtEvent)
              return;
            let eventOutsideName = event.target.getAttribute(GT_EVENTS[gtEvent]);
            if (!eventOutsideName)
              return;
            switch(eventOutsideName) {
              case 'showConfigPopup':
                dispatch({
                  type: 'SHOW_POPUP',
                  componentName: 'Config'
                });
                break;
              case 'showSettingsPopup':
                dispatch({
                  type: 'SHOW_POPUP',
                  componentName: 'TourSettings'
                });
                break;
              case 'showStepEditor':
                dispatch({
                  type: 'SHOW_POPUP',
                  componentName: 'StepEditor'
                });
                break;
              default:
                console.log(`There is no event handler for "${eventOutsideName}"`);
            }
          });
        }
      };
    };

    const SharedComponent = ReactEventOutside(Object.keys(GT_EVENTS))(GuidedTour);

    const ConnectedSharedComponent = connect(mapStateToProps, mapDispatchToProps)(SharedComponent);

    let gtRoot = document.createElement('div');
    gtRoot.id = GT_ROOT_ID;
    document.body.appendChild(gtRoot);

    ReactDOM.render(
      <Provider store={store}>
        <ConnectedSharedComponent/>
      </Provider>,
      gtRoot
    );

  }); // end addEventListener

} // end if
