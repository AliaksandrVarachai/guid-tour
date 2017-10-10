import React from 'react';

/* Data */
import Data from '../../data';

import './ConfigPopup.css';

import Header from '../../components/Header/Header';
import ToursList from '../../components/ToursList/ToursList';
import Footer from '../../components/Footer/Footer';

export default class ConfigPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onMouseDownHandler = (evt) => {
  };

  onMouseMoveHandler = (evt) => {

  };

  onMouseUpHandler = (evt) => {
  };

  render() {
    return (
      <div className="gt-config-popup-container">
        <div onMouseDown={this.onMouseDownHandler}
             onMouseMove={this.onMouseMoveHandler}
             onMouseUp={this.onMouseUpHandler}>
          <Header/>
        </div>
        <ToursList toursList={Data.toursList}/>
        <Footer/>
      </div>
    );
  }
}
