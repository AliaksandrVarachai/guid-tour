import React from 'react';

import './Popup.css';

export default class Popup extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="popup-container">
        <div className="popup">
          <header>Header</header>
          <div className="content">
            Content is here
          </div>
          <footer>Footer</footer>
        </div>
      </div>
    )
  }
}