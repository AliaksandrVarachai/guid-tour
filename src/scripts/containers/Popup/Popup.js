import React from 'react';

import './Popup.css';

import ActionButton from './ActionButton';
// import TourList from '../../components/TourList/TourList';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: props.width,
      header: {
        title: props.title
      },
      content: {
        component: props.content,
        dataProps: props.dataProps
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
          }
        ]
      }
    }
  }

  render() {
    const state = this.state;
    const props = this.props;
    return (
      <div className="gt-popup-container" style={{display: 'block'}} ref="popupContainer">
        <div className="gt-popup" style={{width: state.width}}>
          <div styleName="wrapper">
            <header styleName="header">
              <i className="material-icons" styleName="close" onClick={props.closeHandler}>clear</i>
              <div styleName="title">{state.header.title}</div>
            </header>
            <div styleName="content">
              {<state.content.component {...state.content.dataProps}/>}
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