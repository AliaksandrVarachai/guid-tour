import React from 'react';
import { connect } from 'react-redux';
import TourSteps from '../../components/TourSteps/TourSteps';

import './SE_TourSteps.pcss';

class SE_TourSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewEditableTourStepAdded: false
    };
  }

  addNewEditableTourStep = () => {
    this.setState({
      isNewEditableTourStepAdded: true
    });
  };

  cancelAddNewTourStep = () => {
    this.setState({
      isNewEditableTourStepAdded: false
    })
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.tours[this.props.tourIndex].steps !== nextProps.tours[nextProps.tourIndex].steps) {
      this.setState({
        isNewEditableTourStepAdded: false
      });
    }
  }

  render() {
    const { tours, tourIndex, tourStepIndex } = this.props;
    const { isNewEditableTourStepAdded } = this.state;

    return (
      <div styleName="container">
        <div styleName="main-header">
          <button name="addNew"
                  styleName="action"
                  onClick={this.addNewEditableTourStep}
                  disabled={isNewEditableTourStepAdded}>
            Add New
          </button>
        </div>
        <TourSteps steps={tours[tourIndex].steps}
                   tourStepIndex={tourStepIndex}
                   isNewEditableTourStepAdded={isNewEditableTourStepAdded}
                   cancelAddNewTourStep={this.cancelAddNewTourStep}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tours: state.tours,
    tourIndex: state.tourIndex,
    tourStepIndex: state.tourStepIndex,
  }
};

export default connect(mapStateToProps)(SE_TourSteps);
