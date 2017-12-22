import React from 'react';

import './Search.css';

export default function Search(props) {
  return (
    <div styleName="container" className="u-position u-size">
      <input type="text" styleName="search-input" placeholder="Search..."/>
      <span className="material-icons" styleName="search-link">search</span>
    </div>
  )
}
