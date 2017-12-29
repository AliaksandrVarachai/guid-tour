import React from 'react';
import ActionButton from './ActionButton';
import { connect } from 'react-redux';

const COMPONENTS = {
  Config: require('../../containers/Config/Config'),
  TourSettings: require('../../containers/TourSettings/TourSettings'),
  StepEditor: require('../../containers/StepEditor/StepEditor')
};

import './Popup.pcss';

const Popup = (props) => {
  const { title, componentName, componentProps, width, onClose, buttons } = props;
  const Component = COMPONENTS[componentName].default;
  return (
    <div className="gt__popup-container" style={{display: 'block'}}>
      <div className="gt__popup" style={{width: width}}>
        <div styleName="wrapper">
          <header styleName="header">
            <i className="material-icons" styleName="close" onClick={onClose}>clear</i>
            <div styleName="title">{title}</div>
          </header>
          <div styleName="content">
            <Component />
          </div>
          <footer styleName="footer">
            {buttons.map(bt => <ActionButton {...bt}/>)}
          </footer>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const componentName = state.componentName;
  const component = state.COMPONENTS[componentName];
  return {
    componentName,
    title: component.title,
    componentProps: component.componentProps,
    width: component.width + component.units,
    buttons: component.buttons
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onClose: (event) => {
      dispatch({type: 'ON_CLOSE'});
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
