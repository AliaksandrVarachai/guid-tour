import React from 'react';

import './Popup.css';

import ActionButton from './ActionButton';
// import TourList from '../../components/TourList/TourList';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
    console.log('props=', props)
    this.state = {
      header: {
        title: 'Guided Tour Configuration'
      },
      // content: {
      //   component: props.content, //TourList,
      //   dataProps: props.dataProps, //Data
      // },
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
    const props = this.props;
    console.log('state=', state)
    console.log('props=', props)

    return (
      <div className="gt-popup-container">
        <div className="gt-popup">
          <div styleName="wrapper">
            <header styleName="header">
              <i className="material-icons" styleName="close" onClick={() => alert('close')}>clear</i>
              <div styleName="title">{state.header.title}</div>
            </header>
            <div styleName="content">
              ********************************* PROPS????
              {<props.content.component {...props.tourList}/>}
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