import React from 'react';
import Footer from './Footer';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const COMPONENTS = {
  Config: require('../../containers/Config/Config'),
  TourSettings: require('../../containers/TourSettings/TourSettings'),
  StepEditor: require('../../containers/StepEditor/StepEditor'),
  TourListLauncher: require('../../containers/TourListLauncher/TourListLauncher')
};

import './Popup.pcss';

const Popup = (props) => {
  const { title, componentName, componentProps, width, closePopup } = props;
  const Component = COMPONENTS[componentName].default;

  const onCloseHandler = (event) => {
    closePopup();
  };
  const MAX_TITLE_LENGTH = 50
  let tourTitle = title.substring(title.indexOf('(') + 1, title.length - 1),
    visibleTitle = title.substring(0, MAX_TITLE_LENGTH) + '...)'

  return (
    <div className="gt__popup-container" style={{display: 'block'}}>
      <div className="gt__popup" style={{width: width}}>
        <div styleName="wrapper">
          <header styleName="header">
            <i className="material-icons" styleName="close" onClick={onCloseHandler}>clear</i>
            <div styleName="title">
              {
                componentName === "StepEditor" && title.length > MAX_TITLE_LENGTH ?
                <span styleName="tooltip" data-tooltip={tourTitle}> {visibleTitle} </span> :
                <span> {title} </span>
              }
            </div>
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
