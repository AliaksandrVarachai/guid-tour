import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton';

import './Popup.css';

Popup.propTypes = {
  width: PropTypes.string.isRequired,  // e.g. '800px', '600pt'
  closeHandler: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  dataProps: PropTypes.object.isRequired,
  buttons: PropTypes.array.isRequired
};

export default function Popup(props) {
  return (
    <div className="gt-popup-container" style={{display: 'block'}}>
      <div className="gt-popup" style={{width: props.width}}>
        <div styleName="wrapper">
          <header styleName="header">
            <i className="material-icons" styleName="close" onClick={props.closeHandler}>clear</i>
            <div styleName="title">{props.title}</div>
          </header>
          <div styleName="content">
            {<props.content {...props.dataProps}/>}
          </div>
          <footer styleName="footer">
            {props.buttons.map(bt => <ActionButton {...bt}/>)}
          </footer>
        </div>
      </div>
    </div>
  );
}