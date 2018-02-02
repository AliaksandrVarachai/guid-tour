import React from 'react';
import { connect } from 'react-redux';
import ActionButton from './ActionButton';
import { TOUR_EDITOR_STEPS, NOTIFICATION_TYPES } from '../../constants/tour-settings';
import * as actions from '../../actions';

import './Footer.pcss';


function Button(title, onClick = () => {}, className = 'action') {
  this.title = title;
  this.onClick = onClick;
  this.className = className;
  this.key = title;
}

const Footer = (props) => {

  function getNotificationClass(notificationType) {
    //TODO: rewrite the notification fadeout. 
    if(notificationType != NOTIFICATION_TYPES.empty) {
       window.setTimeout(() => {
         props.dispatch({
            type: 'CHANGE_NOTIFICATION',
            message: '',
            messageType: NOTIFICATION_TYPES.empty
          });
       }, 3000);
    }

    switch(notificationType) {
      case NOTIFICATION_TYPES.success:
        return 'msg-success';
      case NOTIFICATION_TYPES.info:
        return 'msg-info';
      case NOTIFICATION_TYPES.warning:
        return 'msg-warning';
      case NOTIFICATION_TYPES.fail:
        return 'msg-fail';
      default:
        return '';
    }
}

  function getButtons() {
    const { componentName, stepEditorIndex, tours, tourIndex } = props;
    switch (componentName) {
      case 'Config':
        return [];
      case 'StepEditor':
        if (stepEditorIndex === 0)
          return tours[tourIndex].steps.length
            ? [new Button('Next', (e) => props.goToNextStepEditor())]
            : [];
        if (stepEditorIndex === TOUR_EDITOR_STEPS.length - 1)
          return [
            new Button('Previous', (e) => props.goToPreviousStepEditor()),
            new Button('Save', (e) => props.saveData()),
          ];
        return [
          new Button('Previous', (e) => props.goToPreviousStepEditor()),
          new Button('Next', (e) => props.goToNextStepEditor()),
        ];
      default:
        return [
          new Button('Previous', (e) => props.goToPreviousStepEditor()),
          new Button('Next', (e) => props.goToNextStepEditor()),
          new Button('Save', (e) => props.saveData()),
        ];
    }
  }

  return (
    <footer styleName="footer">
      {getButtons().map(button => <ActionButton {...button} />)}
      <div styleName={'notification ' + getNotificationClass(props.notificationType)}>{props.notificationMessage}</div>
    </footer>
  );
};



const mapStateToProps = (state) => {
  const { componentName, stepEditorIndex, notificationMessage, notificationType, tours, tourIndex } = state;
  return {
    tours,
    tourIndex,
    componentName,
    stepEditorIndex,
    notificationMessage,
    notificationType,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    cancelOperation: () => dispatch(actions.cancelOperation()),
    saveData: () => dispatch(actions.saveData()),
    goToNextStepEditor: () => dispatch(actions.goToNextStepEditor()),
    goToPreviousStepEditor: () => dispatch(actions.goToPreviousStepEditor()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
