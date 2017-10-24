import React from 'react';
import PropTypes from 'prop-types';
import getURL from '../../../helpers/src-url';
import Search from '../Search/Search';
import TourItem from '../TourItem/TourItem';

import './TourList.css';

import '../../../images/gt-logo-179x69.png';

TourList.propTypes = {
  tourList: PropTypes.array.isRequired
};

export default function TourList({tourList}) {
  const logoURL = getURL('../../../images/gt-logo-179x69.png');
  return (
    <div className="gt-tours-list-component">
      <div styleName="logo">
        <img src={logoURL} alt="logo"/>
      </div>
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
