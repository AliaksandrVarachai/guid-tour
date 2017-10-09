import React from 'react';

import './Search.css';

export default function Search(props) {
  return (
    <div className="gt-search-component">
      <input type="text" styleName="search-input" placeholder="Search..."/>
      <span className="material-icons" styleName="search-link">search</span>
    </div>
  )
}
