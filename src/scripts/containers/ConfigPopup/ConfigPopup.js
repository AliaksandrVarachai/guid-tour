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

  render() {
    return (
      <div className="gt-config-popup-container">
        <i className="material-icons" styleName="close">clear</i>
        <div styleName="title">Guided Tour Configuration</div>
        <div styleName="content">
          <Header/>
          <ToursList toursList={Data.toursList}/>
          <Footer/>
        </div>
      </div>
    );
  }
}
