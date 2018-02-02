import React from 'react';

import './Search.pcss';

export default function Search(props) {
  // TODO:add search
  return (
    <div styleName="container" className={props.className} style={{visibility: 'hidden'}}>
      <input type="text" styleName="search-input" placeholder="Search..."/>
      <span className="material-icons" styleName="search-link">search</span>
    </div>
  )
}
