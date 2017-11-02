import React from 'react';
import PropTypes from 'prop-types';
import Tour from './Tour';

import table from '../../../shared-styles/table.css';
import styles from './Tours.css';

Tours.propTypes = {
  tourList: PropTypes.array.isRequired
};

export default function Tours({tourList}) {
  return (
    <div styleName="table.table">
      <Tour isHeader={true}/>
      {tourList.map(tour => <Tour tourName={tour.tourName}
                                  tourType={tour.tourType}
                                  lastOpen={tour.lastOpen}
                                  visitors={tour.visitors}
                                  steps={tour.steps.length}
                                  creator={tour.creator}
                                  key={tour.tourName}
      />)}
    </div>
  )
}
