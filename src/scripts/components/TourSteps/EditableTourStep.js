import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import * as actions from '../../actions';

import './EditableTourStep.pcss';

class EditableTourStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tourStepName: props.tourStepName,
    };
  }

  static propTypes = {
    tourStepName: PropTypes.string.isRequired,
    //tourStepIndex: PropTypes.number,    // only for changed tour (tourIndex !== undefined only for changed tour)
    //saveTourStepChanges: PropTypes.func,  // TODO: add handler both for an edited & added TourStep
    cancelAddNewTourStep: PropTypes.func.isRequired,
  };

  tourStepNameHandler = (event) => {
    this.setState({
      tourStepName: event.target.value,
      isWrongTourStepName: false
    });
  };

  saveNewTourStepLocallyHandler = () => {
    const { tourStepName } = this.state;
    if (tourStepName && tourStepName.trim()) {
      this.props.addNewTourStep(tourStepName.trim());
      this.props.goToNextStepEditor();
    } else {
      this.setState({
        isWrongTourStepName: true
      });
    }
  };

  // saveChangedTourHandler = () => {
  //   const { tourStepName } = this.state;
  //   const { tourIndex, saveTourChanges } = this.props;
  //   if (name) {
  //     this.props.dispatch({
  //       type: 'SAVE_TOUR_CHANGES',
  //       tourIndex,
  //       name,
  //       type
  //     });
  //     saveTourChanges(); // change the parent state
  //   } else {
  //     this.setState({
  //       isWrongTourName: true
  //     });
  //   }
  // };

  render() {
    const { tourStepName, isWrongTourStepName } = this.state;
    const { /*saveTourStepChanges,*/ cancelAddNewTourStep } = this.props;
    //const saveHandler = tourIndex !== undefined ? this.saveChangedTourHandler : this.saveNewTourHandler;
    return (
      <div className="gtu__overflow-visible" styleName="editable" >
        <span styleName="editable-action-panel">
          <span className="gtu__tooltip" data-tooltip="Save step name">
            <i className="material-icons" styleName="editable-action" onClick={this.saveNewTourStepLocallyHandler}>save</i>
          </span>
          <span className="gtu__tooltip" data-tooltip="Delete">
            <i className="material-icons" styleName="editable-action" onClick={cancelAddNewTourStep}>block</i>
          </span>
        </span>
        <input autoFocus type="text"
               styleName={classNames('editable-name', {'is-wrong-value': isWrongTourStepName})}
               value={tourStepName}
               placeholder="Enter step name"
               maxLength="100"
               onChange={this.tourStepNameHandler}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewTourStep: (...args) => dispatch(actions.addNewTourStep(...args)),
    goToNextStepEditor: () => dispatch(actions.goToNextStepEditor()),
  }
};

export default connect(null, mapDispatchToProps)(EditableTourStep);
