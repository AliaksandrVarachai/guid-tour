import React from 'react';

import './TourItem.css';

// TODO: add required for properties (exclude of isHeader == true)
export default function TourItem({tourName, tourType, lastOpen, visitors, steps, creator, isHeader = false}) {
  return (
    isHeader ?
      <div className="gt-tour-item-component" styleName="header">
        <div styleName="cell">
          {tourName ? tourName : "Tour Name"}
        </div>
        <div styleName="cell">
          {tourType ? tourType : "Tour Type"}
        </div>
        <div styleName="cell">
          {lastOpen ? lastOpen : "Last Open"}
        </div>
        <div styleName="cell">
          {visitors ? visitors : "# Visitors"}
        </div>
        <div styleName="cell">
          {steps ? steps : "# Steps"}
        </div>
        <div styleName="cell">
          {creator ? creator : "Creator"}
        </div>
        <div styleName="cell">
          {null}
        </div>
      </div>
      :
      <div className="gt-tour-item-component">
        <div styleName="cell">
          {tourName}
        </div>
        <div styleName="cell">
          {tourType}
        </div>
        <div styleName="cell">
          {lastOpen}
        </div>
        <div styleName="cell">
          {visitors}
        </div>
        <div styleName="cell">
          {steps}
        </div>
        <div styleName="cell">
          {creator}
        </div>
        <div styleName="cell">
          Icons are here
        </div>
      </div>
  )
}

