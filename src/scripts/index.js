import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import ReactEventOutside from 'react-event-outside';
import Popup from './containers/Popup/Popup';
import { GT_ROOT_ID, GT_EVENTS } from './constants/dom-elements';
import reducer from './reducers';

import './index.css';

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

  // TODO: remove on prod (only to facilitate test of components)
  componentDidMount() {
    let bt = document.querySelector('[gt-onclick=showConfigPopup]');
    setTimeout(() => {
      bt.click();
    }, 0);
  }

  render() {
    const props = this.props;
    if (props.isPopupShown) {
      this.bodyWidthHandler(props.width + 10, props.units);
    } else {
      this.bodyWidthHandler();
    }
    return (
      <div className="gt-container">
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
