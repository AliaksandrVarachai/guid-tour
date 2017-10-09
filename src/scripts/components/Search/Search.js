import React from 'react';

import './Search.css';

export default function Search(props) {
  return (
    <div className="gt-search-component">
      <input type="text" styleName="search-input" placeholder="Search..."/>
      <span styleName="search-link"></span>
    </div>
  )
}
