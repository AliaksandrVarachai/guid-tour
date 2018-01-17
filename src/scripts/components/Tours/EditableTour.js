import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { TOUR_TYPES } from '../../constants/tour-settings';
import TourTypesSelector from '../TourTypesSelector/TourTypesSelector';

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
    if (tourName) {
      this.props.dispatch({
        type: 'SAVE_NEW_TOUR',
        tourName,
        tourType
      });
    } else {
      this.setState({
        isWrongTourName: true
      });
    }
  };

  saveChangedTourHandler = () => {
    const { tourName, tourType } = this.state;
    const { tourIndex, saveTourChanges } = this.props;
    if (tourName) {
      this.props.dispatch({
        type: 'SAVE_TOUR_CHANGES',
        tourIndex,
        tourName,
        tourType
      });
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
      <div styleName="editable">
        <span styleName="editable-action-panel">
          <i className="material-icons" styleName="editable-action" onClick={saveHandler}>save</i>
          <i className="material-icons" styleName="editable-action" onClick={cancelTourChanges}>block</i>
        </span>
        <input type="text"
               styleName={classNames('editable-name', {'is-wrong-value': isWrongTourName})}
               value={tourName}
               onChange={this.tourNameHandler}
        />
        <span styleName="editable-type">
          <TourTypesSelector tourType={tourType} onChange={this.tourTypeHandler} />
        </span>
      </div>
    );
  }
}

export default connect()(EditableTour);
