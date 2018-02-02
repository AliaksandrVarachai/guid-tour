import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import ReactEventOutside from 'react-event-outside';
import Popup from './containers/Popup/Popup';
import { GT_ROOT_ID, GT_EVENTS } from './constants/dom-elements';
import { startTour } from './helpers/tour-runner';
import verifyApi from './helpers/verify-api';
import verifyTool from './tool-specific-helpers/verify-tool';
import initGtDomElements from './tool-specific-helpers/init-gt-dom-elements';
import { ApiValidationError } from './errors';

import './index.pcss';
import '../styles/sync-styles.pcss';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));


verifyTool()
  .then(() => verifyApi())
  .then(apiVersion => {
    initGtDomElements(store);
    renderGtElements();
  })
  .catch(error => {
    if (error instanceof ApiValidationError) {
      alert(error.message);
    } else {
      // console.log(error.message);
    }
  });


// General functions
function getDefaultTour() {
  const loadedTours = store.getState().tours;
  if (loadedTours.length === 0)
    return null;
  for (let i = 0; i < loadedTours.length; i++) {
    if (loadedTours[i].steps !== null && loadedTours[i].steps.length > 0)
      return loadedTours[i];
  }
  return null;
}


function renderGtElements() {
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
            case 'startTour': {
              // TODO: loaded async with getToursByTemplateId, so it is potentially wrong!!!
              let defaultTour = getDefaultTour(); // TODO: move out of mapDispatchToProps as a not
              if (defaultTour === null) {
                alert('No tour found to run!')
              } else {
                startTour(defaultTour);
              }
              break;
            }

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

  // TODO: check if we can avoid of rerendering if we add the component to parent window.
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedSharedComponent/>
    </Provider>,
    gtRoot
  );
}
