import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TOUR_TYPES } from '../../constants/tour-settings';

import './TourTypesSelector.css';

TourTypesSelector.propTypes = {
  tourType: PropTypes.oneOf(Object.keys(TOUR_TYPES)).isRequired,
  style: PropTypes.object
};

/**
 * Selector width is 100% of parent element by default.
 * To set customs style use style property: {width: '50px'}
 */
function TourTypesSelector(props) {
  const { changeTourType, tourType, style } = props;
  // debugger;
  return (
    <select styleName="selector" onChange={changeTourType} value={tourType} style={style}>
      {Object.keys(TOUR_TYPES).map(tourType =>
        <option value={tourType} key={tourType}>
          {TOUR_TYPES[tourType]}
        </option>
      )}
    </select>
  )
}

const mapStateToProps = (state) => {
  return {}
};

const mapDispatchProps = (dispatch) => {
  return {
    changeTourType: (event) => {
      dispatch({
        type: 'CHANGE_TOUR_TYPE',
        tourTypeName: event.target.value
      })
    }
  }
};

export default connect(mapStateToProps, mapDispatchProps)(TourTypesSelector);

