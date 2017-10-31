import React from 'react';
import PropTypes from 'prop-types';
import getResourceURL from '../../helpers/get-resource-url';
import Search from '../../components/Search/Search';
import TourItem from '../../components/TourItem/TourItem';

import './TourList.css';

import logo from '../../../images/gt-logo-179x69.png';

TourList.propTypes = {
  tourList: PropTypes.array.isRequired
};

export default function TourList({tourList}) {
  return (
    <div className="gt-tours-list-container">
      <div styleName="logo-bar">
        <img styleName="logo" src={getResourceURL(logo)} alt="logo"/>
      </div>
      <div styleName="main-header">Available Guided Tours
        <Search/> {/* TODO: add props with saved search */}
      </div>
      <button name="addNew" styleName="action">Add New</button>
      <button name="settings" styleName="action">Settings</button>
      <div styleName="table">
        <TourItem isHeader={true}/>
        {tourList.map(tour => <TourItem tourName={tour.tourName}
                                        tourType={tour.tourType}
                                        lastOpen={tour.lastOpen}
                                        visitors={tour.visitors}
                                        steps={tour.steps.length}
                                        creator={tour.creator}
                                        key={tour.tourName}
        />)}
      </div>
    </div>
  )
}
