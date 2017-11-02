import React from 'react';
import PropTypes from 'prop-types';
import getResourceURL from '../../helpers/get-resource-url';
import Search from '../../components/Search/Search';
import Tours from '../../components/Tours/Tours';

import './Config.css';

import logo from '../../../images/gt-logo-179x69.png';

Config.propTypes = {
  tourList: PropTypes.array.isRequired
};

export default function Config({tourList}) {
  return (
    <div className="gt-config-container">
      <div styleName="logo-bar">
        <img styleName="logo" src={getResourceURL(logo)} alt="logo" />
      </div>
      <div styleName="main-header">Available Guided Tours
        <div style={{float: 'right'}}>
          <Search />
        </div>
      </div>
      <button name="addNew" styleName="action">Add New</button>
      <button name="settings" styleName="action">Settings</button>
      <Tours tourList={tourList} />
    </div>
  )
}
