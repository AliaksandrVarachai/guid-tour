import React from 'react';
import { connect } from 'react-redux';
import getResourceURL from '../../helpers/get-resource-url';
import Tour from '../../components/Tours/Tour';
import { startTour } from '../../helpers/tour-runner';
import * as actions from '../../actions';

import './TourListLauncher.pcss';
import logo from '../../../images/gt-logo-179x69.png';

class StartTourList extends React.Component {
  constructor(props) {
    super(props);
  }
    
  runTour = (event) => {
    let loadedTour = this.props.tours[+event.target.getAttribute('tourindex')];
    if (loadedTour.steps.length){
      this.props.closePopup()}
    startTour(loadedTour);
  }
  
  render() {
    const { tours } = this.props;
    return (
      <div className="gt__config-container gtu__pos-relative">
        <div styleName="logo-bar">
          <img styleName="logo" src={getResourceURL(logo)} alt="logo" />
        </div>
        <div styleName="main-header">
          Available Tours
        </div>
        <div styleName='tourlist-container'>
        {tours.map((tour, inx) =>
             <button styleName='tourlist-button'
              tourindex={inx}
              key={tour.id}
              onClick={this.runTour}> {tour.name}
            </button>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tours: state.tours
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    closePopup: () => dispatch(actions.closePopup()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartTourList);
