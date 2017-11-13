import React from 'react';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton';

import './Popup.css';

Popup.propTypes = {
  title: PropTypes.string.isRequired,
  Component: PropTypes.func.isRequired,    // component
  componentProps: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,      // e.g. '800px', '600pt'
  closeHandler: PropTypes.func.isRequired,
  buttons: PropTypes.array.isRequired
};

export default function Popup({title, Component, componentProps, width, closeHandler, buttons}) {
  return (
    <div className="gt-popup-container" style={{display: 'block'}}>
      <div className="gt-popup" style={{width: width}}>
        <div styleName="wrapper">
          <header styleName="header">
            <i className="material-icons" styleName="close" onClick={closeHandler}>clear</i>
            <div styleName="title">{title}</div>
          </header>
          <div styleName="content">
            <Component {...componentProps}/>
          </div>
          <footer styleName="footer">
            {buttons.map(bt => <ActionButton {...bt}/>)}
          </footer>
        </div>
      </div>
    </div>
  );
}