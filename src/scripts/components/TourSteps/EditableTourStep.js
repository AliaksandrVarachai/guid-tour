import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

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

  saveNewTourStepHandler = () => {
    const { tourStepName } = this.state;
    if (tourStepName) {
      this.props.dispatch({
        type: 'SAVE_NEW_TOUR_STEP',
        tourStepName
      });
    } else {
      this.setState({
        isWrongTourStepName: true
      });
    }
  };

  // saveChangedTourHandler = () => {
  //   const { tourStepName } = this.state;
  //   const { tourIndex, saveTourChanges } = this.props;
  //   if (tourName) {
  //     this.props.dispatch({
  //       type: 'SAVE_TOUR_CHANGES',
  //       tourIndex,
  //       tourName,
  //       tourType
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
      <div styleName="editable">
        <span styleName="editable-action-panel">
          <i className="material-icons" styleName="editable-action" onClick={this.saveNewTourStepHandler}>save</i>
          <i className="material-icons" styleName="editable-action" onClick={cancelAddNewTourStep}>block</i>
        </span>
        <input type="text"
               styleName={classNames('editable-name', {'is-wrong-value': isWrongTourStepName})}
               value={tourStepName}
               placeholder="Enter step name"
               onChange={this.tourStepNameHandler}
        />
      </div>
    );
  }
}

export default connect()(EditableTourStep);

