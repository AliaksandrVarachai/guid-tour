import React from 'react';
import PropTypes from 'prop-types';
import { TOUR_TYPES } from '../../constants/tour-settings';

import './TourTypesSelector.css';

TourTypesSelector.propTypes = {
  onChange: PropTypes.func.isRequired,
  tourType: PropTypes.oneOf(Object.keys(TOUR_TYPES)).isRequired,
};

/**
 * Selector has with=100% and height=100% of parent element by default.
 * To set customs style use style property: {width: '50px'}
 */
export default function TourTypesSelector(props) {
  const { onChange, tourType } = props;
  return (
    <select styleName="selector" onChange={onChange}>
      {Object.keys(TOUR_TYPES).map(tourType =>
        <option value={tourType} key={tourType}>
          {TOUR_TYPES[tourType]}
        </option>
      )}
    </select>
  )
}

