import React from 'react';
import Footer from './Footer';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const COMPONENTS = {
  Config: require('../../containers/Config/Config'),
  TourSettings: require('../../containers/TourSettings/TourSettings'),
  StepEditor: require('../../containers/StepEditor/StepEditor')
};

import './Popup.pcss';

const Popup = (props) => {
  const { title, componentName, componentProps, width, closePopup } = props;
  const Component = COMPONENTS[componentName].default;

  const onCloseHandler = (event) => {
    closePopup();
  };

  return (
    <div className="gt__popup-container" style={{display: 'block'}}>
      <div className="gt__popup" style={{width: width}}>
        <div styleName="wrapper">
          <header styleName="header">
            <i className="material-icons" styleName="close" onClick={onCloseHandler}>clear</i>
            <div styleName="title">{title}</div>
          </header>
          <div styleName="content">
            <Component />
          </div>
          <Footer/>
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
    width: component.width + component.units
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    closePopup: () => dispatch(actions.closePopup())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Popup);
