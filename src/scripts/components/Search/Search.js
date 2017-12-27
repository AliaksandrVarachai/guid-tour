import React from 'react';

import './Search.pcss';

export default function Search(props) {
  return (
    <div styleName="container" className={props.className}>
      <input type="text" styleName="search-input" placeholder="Search..."/>
      <span className="material-icons" styleName="search-link">search</span>
    </div>
  )
}
