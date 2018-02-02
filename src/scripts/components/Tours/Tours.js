import React from 'react';
import PropTypes from 'prop-types';
import Tour from './Tour';
import { TOUR_REQUIRED_FIELDS } from '../../constants/tour-settings';

import './Tours.pcss';

Tours.propTypes = {
  tourList: PropTypes.array.isRequired,
  isNewEditableTourAdded: PropTypes.bool,
  cancelAddNewTour: PropTypes.func
};

export default function Tours({tourList, isNewEditableTourAdded = false, cancelAddNewTour = function(){}}) {
  return (
    <div className="gtu__table gtu__w100" styleName="tours-container">
      <Tour isHeader={true}/>
      {tourList.map((tour, inx) => <Tour tourIndex={inx}
                                         tourName={tour.name}
                                         tourType={tour.type}
                                         lastOpenDate={tour.lastOpenDate}
                                         totalVisits={tour.totalVisits}
                                         steps={tour.steps.length}
                                         creator={tour.creator}
                                         key={tour.id}
      />)}
      {isNewEditableTourAdded ? <Tour tourName={TOUR_REQUIRED_FIELDS.name}
                                      tourType={TOUR_REQUIRED_FIELDS.type}
                                      cancelAddNewTour={cancelAddNewTour}
                                      isEditable={true}
      /> : null }
    </div>
  )
}
