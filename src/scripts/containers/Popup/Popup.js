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

  closeHandler = (event) => {
    //document.querySelector('.gt-popup-container')[0].style.display = 'none';
  };

  componentDidMount() {
    //console.log(this.refs.popupContainer.style.display = 'none')
  }

  render() {
    const state = this.state;
    return (
      <div className="gt-popup-container" style={{display: 'block'}} ref="popupContainer">
        <div className="gt-popup" style={{width: state.width}}>
          <div styleName="wrapper">
            <header styleName="header">
              <i className="material-icons" styleName="close" onClick={this.closeHandler}>clear</i>
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