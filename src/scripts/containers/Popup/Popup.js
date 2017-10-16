import React from 'react';

import './Popup.css';

import ActionButton from './ActionButton';
import ToursList from '../../components/TourList/TourList';

/* Data */
import Data from '../../data';

export default class Popup extends React.Component {
  constructor() {
    super();
    this.state = {
      header: {
        title: 'Guided Tour Configuration'
      },
      content: {
        component: ToursList,
        props: Data
      },
      footer: {
        buttons: [
          {
            title: 'Cancel',
            key: 'cancel',
            onClick: function(e) {alert('Cancel')},
            className: 'action'
          },
          {
            title: 'Save',
            key: 'save',
            onClick: function(e) {alert('Save')},
            className: 'action'
          },
        ]
      }
    }
  }

  render() {
    const state = this.state;

    return (
      <div className="gt-popup-container">
        <div className="gt-popup">
          <div styleName="wrapper">
            <header styleName="header">
              <i className="material-icons" styleName="close" onClick={() => alert('close')}>clear</i>
              <div styleName="title">{state.header.title}</div>
            </header>
            <div styleName="content">
              <div styleName="logo"></div>
              {console.log(state.content.props.tourList)}
              {<state.content.component tourList={state.content.props.tourList}/>}
            </div>
            <footer styleName="footer">
              {this.state.footer.buttons.map(bt => <ActionButton {...bt}/>)}
            </footer>
          </div>
        </div>
      </div>
    );
  }
}