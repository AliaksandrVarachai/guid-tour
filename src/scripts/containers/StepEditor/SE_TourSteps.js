import React from 'react';
import { connect } from 'react-redux';
import TourStep from '../../components/TourStep/TourStep';
import EditableTourStep from '../../components/TourStep/EditableTourStep';
import DraggableList from '../../components/DraggableList/DraggableList';
import { TOUR_STEP_REQUIRED_FIELDS } from '../../constants/tour-settings';
import * as actions from '../../actions';

import './SE_TourSteps.pcss';

class SE_TourSteps extends React.Component {
  constructor(props) {
    super(props);
  }

  addNewEditableTourStep = (event) => {
    if (this.props.isTourStepDraggingInProgress) {
      this.props.showMessage('You cannot add a new step before applying the step order.', 'warning')
    } else {
      this.props.setTourStepInProgress(true);
    }
  };

  startDraggableMode = () => {
    this.props.startTourStepDragging();
  };

  stopDraggableMode = () => {
    this.props.stopTourStepDragging();
  };

  render() {
    const { tours, tourIndex, tourStepIndex, pages, isNewTourStepInProgress, orderTourSteps } = this.props;
    const steps = tours[tourIndex].steps;
    return (
      <div styleName="container">
        <div styleName="main-header">
          <button name="addNew"
                  styleName="action"
                  onClick={this.addNewEditableTourStep}
                  disabled={isNewTourStepInProgress}>
            Add new step
          </button>
        </div>
        <div styleName="steps-container">
          <DraggableList showHeader={true}
                         showFooter={isNewTourStepInProgress}
                         orderHandler={orderTourSteps}
                         itemsNumber={steps.length}
                         isDraggableModeAllowed={!isNewTourStepInProgress}
                         startDraggableMode={this.startDraggableMode}
                         stopDraggableMode={this.stopDraggableMode}
          >
            <TourStep isHeader={true}/>
            {steps.map((step, index) => {
              return <TourStep index={index}
                               tourStepIndex={tourStepIndex}
                               tourStepName={step.name}
                               targetPage={step.pageId && pages[step.pageId] ? pages[step.pageId].title : 'none'}
                               targetControl={step.customTargetId}
                               htmlContent={step.htmlContent}
                               isSynchronized={step.isSynchronized}
                               isNew={step.isNew}
                               id={step.id}
                               key={step.id}
              />
            })}
            <EditableTourStep tourStepName={TOUR_STEP_REQUIRED_FIELDS.name}/>
          </DraggableList>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tours: state.tours,
    tourIndex: state.tourIndex,
    tourStepIndex: state.tourStepIndex,
    pages: state.product.pages,
    isNewTourStepInProgress: state.isNewTourStepInProgress,
    isTourStepDraggingInProgress: state.isTourStepDraggingInProgress
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setTourStepInProgress: (...args) => dispatch(actions.setTourStepInProgress(...args)),
    orderTourSteps: (...args) => dispatch(actions.orderTourSteps(...args)),
    showMessage: (...args) => dispatch(actions.showMessage(...args)),
    startTourStepDragging: () => dispatch(actions.startTourStepDragging()),
    stopTourStepDragging: () => dispatch(actions.stopTourStepDragging()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(SE_TourSteps);
