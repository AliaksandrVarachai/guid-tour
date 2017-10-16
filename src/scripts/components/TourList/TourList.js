import React from 'react';
import PropTypes from 'prop-types';

import Search from '../Search/Search';
import TourItem from '../TourItem/TourItem';

import './TourList.css';

TourList.propTypes = {
  tourList: PropTypes.array.isRequired
};

export default function TourList({tourList}) {
  console.log('tourList=', tourList)
  return (
    <div className="gt-tours-list-component">
      <div styleName="main-header">Available Guided Tours
        <Search/> {/* TODO: add props with saved search */}
      </div>
      <button name="addNew" styleName="action">Add New</button>
      <button name="settings" styleName="action">Settings</button>
      <div styleName="table">
        <TourItem isHeader={true}/>
        {tourList.map(tour => <TourItem {...tour} key={tour.tourName}/>)}
      </div>
    </div>
  )
}
