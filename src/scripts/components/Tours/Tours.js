import React from 'react';
import PropTypes from 'prop-types';
import Tour from './Tour';
import { DEFAULT_NEW_TOUR_SETTINGS } from '../../constants/tour-settings';

import table from '../../../shared-styles/table.css';
import styles from './Tours.css';

Tours.propTypes = {
  tourList: PropTypes.array.isRequired,
  isNewEditableTourAdded: PropTypes.bool,
  cancelAddNewTour: PropTypes.func
};

export default function Tours({tourList, isNewEditableTourAdded = false, cancelAddNewTour = function(){}}) {
  return (
    <div styleName="table.table">
      <Tour isHeader={true}/>
      {tourList.map((tour, inx) => <Tour tourIndex={inx}
                                         tourName={tour.tourName}
                                         tourType={tour.tourType}
                                         lastOpen={tour.lastOpen}
                                         visitors={tour.visitors}
                                         steps={tour.steps.length}
                                         creator={tour.creator}
                                         key={inx}
      />)}
      {isNewEditableTourAdded ? <Tour tourName={DEFAULT_NEW_TOUR_SETTINGS.tourName}
                                      tourType={DEFAULT_NEW_TOUR_SETTINGS.tourType}
                                      cancelAddNewTour={cancelAddNewTour}
                                      isEditable={true}
      /> : null }
    </div>
  )
}
