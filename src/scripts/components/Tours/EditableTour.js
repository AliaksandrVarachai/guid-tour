import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { TOUR_TYPES } from '../../constants/tour-settings';
import TourTypesSelector from '../TourTypesSelector/TourTypesSelector';

import styles from './EditableTour.css';

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
    tourType: PropTypes.oneOf(Object.keys(TOUR_TYPES)).isRequired
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

  saveHandler = () => {
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

  render() {
    const { tourName, tourType, isWrongTourName } = this.state;
    return (
      <div styleName="styles.editable">
        <i className="material-icons" styleName="styles.editable-action" onClick={this.saveHandler}>save</i>
        <input type="text"
               styleName={classNames('styles.editable-name', {'styles.is-wrong-value': isWrongTourName})}
               value={tourName}
               onChange={this.tourNameHandler}
        />
        <span styleName="styles.editable-type">
          <TourTypesSelector tourType={tourType} onChange={this.tourTypeHandler} />
        </span>
      </div>
    );
  }
}

export default connect()(EditableTour);
