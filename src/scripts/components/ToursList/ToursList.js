import React from 'react';

import Search from '../Search/Search';
import TourItem from '../TourItem/TourItem';

import './ToursList.css';

export default function ToursList({toursList}) {
  return (
    <div className="gt-tours-list-component">
      <div styleName="main-header">Available Guided Tours
        <Search/> {/* TODO: add props with saved search */}
      </div>
      <button name="addNew" styleName="action">Add New</button>
      <button name="settings" styleName="action">Settings</button>
      <div styleName="table">
        <TourItem isHeader={true}/>
        {toursList.map(tour => <TourItem {...tour} key={tour.tourName}/>)}
      </div>
    </div>
  )
}
