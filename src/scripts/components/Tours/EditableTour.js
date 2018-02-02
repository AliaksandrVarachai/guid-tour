import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { TOUR_TYPES } from '../../constants/tour-settings';
import TourTypesSelector from '../TourTypesSelector/TourTypesSelector';
import * as actions from '../../actions';

import './EditableTour.pcss';

class EditableTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tourName: props.tourName,
      tourType: props.tourType,
    };
  }

  static propTypes = {
    tourName: PropTypes.string.isRequired,
    tourType: PropTypes.oneOf(TOUR_TYPES).isRequired,
    tourIndex: PropTypes.number,    // only for changed tour (tourIndex !== undefined only for changed tour)
    saveTourChanges: PropTypes.func,  // TODO: add handler both for an edited Tour & a new added tour
    cancelTourChanges: PropTypes.func.isRequired,
  };

  tourNameHandler = (event) => {
    this.setState({
      tourName: event.target.value,
      isWrongTourName: false
    });
  };

  tourTypeHandler = (event) => {
    this.setState({tourType: event.target.value});
  };

  saveNewTourHandler = () => {
    const { tourName, tourType } = this.state;
    if (tourName && tourName.trim()) {
      this.props.addAndSaveNewTour(tourName.trim(), tourType)
        .then(isSuccess => {
          if (isSuccess) {
            this.props.goToStepEditor();
          } else {
            alert('A new tour is not saved');
          }
        })
    } else {
      this.setState({
        isWrongTourName: true
      });
    }
  };

  saveChangedTourHandler = () => {
    const { tourName, tourType } = this.state;
    const { tourIndex, saveTourChanges } = this.props;
    if (tourName && tourName.trim()) {
      this.props.changeAndSaveTour(tourIndex, tourName.trim(), tourType);
      saveTourChanges(); // change the parent state
    } else {
      this.setState({
        isWrongTourName: true
      });
    }
  };

  render() {
    const { tourName, tourType, isWrongTourName } = this.state;
    const { saveTourChanges, cancelTourChanges, tourIndex } = this.props;
    const saveHandler = tourIndex !== undefined ? this.saveChangedTourHandler : this.saveNewTourHandler;
    return (
      <div className="gtu__overflow-visible" styleName="editable">
        <span styleName="editable-action-panel">
          <span className="gtu__tooltip" data-tooltip="Save tour name">
            <i className="material-icons" styleName="editable-action" onClick={saveHandler}>save</i>
          </span>
          <span className="gtu__tooltip" data-tooltip="Delete">
            <i className="material-icons" styleName="editable-action" onClick={cancelTourChanges}>block</i>
          </span>
        </span>
        <input autoFocus type="text"
               styleName={classNames('editable-name', {'is-wrong-value': isWrongTourName})}
               value={tourName}
               placeholder="Enter tour name"
               maxLength="100"
               onChange={this.tourNameHandler}
        />
        <span styleName="editable-type">
          <TourTypesSelector tourType={tourType} onChange={this.tourTypeHandler} />
        </span>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addAndSaveNewTour: (...args) => dispatch(actions.addAndSaveNewTour(...args)),
    changeAndSaveTour: (...args) => dispatch(actions.changeAndSaveTour(...args)),
    goToStepEditor: (...args) => dispatch(actions.goToStepEditor(...args)),
  }
};

export default connect(null, mapDispatchToProps)(EditableTour);
