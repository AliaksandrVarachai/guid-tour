import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TOUR_TYPES } from '../../constants/tour-settings';
import TourTypesSelector from '../TourTypesSelector/TourTypesSelector';

import styles from './EditableTour.css';

class EditableTour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tourName: props.tourName,
      tourType: props.tourType
    };
  }

  static propTypes = {
    tourName: PropTypes.string.isRequired,
    tourType: PropTypes.oneOf(Object.keys(TOUR_TYPES)).isRequired
  };

  tourNameHandler = (event) => {
    this.setState({tourName: event.target.value});
  };

  tourTypeHandler = (event) => {
    this.setState({tourType: event.target.value});
  };

  saveHandler = () => {
    const { tourName, tourType } = this.state;
    this.props.dispatch({
      type: 'SAVE_TOUR',
      tourName,
      tourType
    })
  };

  render() {
    const { tourName, tourType } = this.state;
    return (
      <div styleName="styles.editable">
        <input styleName="styles.editable-name" type="text" value={tourName} onChange={this.tourNameHandler} />
        <TourTypesSelector tourType={tourType} onChange={this.tourTypeHandler} style={{width: '30%'}} />
        <i className="material-icons" styleName="styles.editable-action" onClick={this.saveHandler}>save</i>
      </div>
    );
  }
}

export default connect()(EditableTour);
