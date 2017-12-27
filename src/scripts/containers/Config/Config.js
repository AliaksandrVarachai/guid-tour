import React from 'react';
import { connect } from 'react-redux';
import getResourceURL from '../../helpers/get-resource-url';
import Search from '../../components/Search/Search';
import Tours from '../../components/Tours/Tours';

import './Config.pcss';

import logo from '../../../images/gt-logo-179x69.png';

class Config extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNewEditableTourAdded: false
    };
  }

  addNewEditableTour = () => {
    this.setState({
      isNewEditableTourAdded: true
    });
  };

  cancelAddNewTour = () => {
    this.setState({
      isNewEditableTourAdded: false
    })
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.tourList !== nextProps.tourList) {
      this.setState({
        isNewEditableTourAdded: false
      });
    }
  }

  render() {
    const { tourList } = this.props;
    const { isNewEditableTourAdded } = this.state;
    return (
      <div className="gt__config-container">
        <div styleName="logo-bar">
          <img styleName="logo" src={getResourceURL(logo)} alt="logo" />
        </div>
        <div styleName="main-header">Available Guided Tours
          <Search className="gtu__float-right" />
        </div>
        <button name="addNew" styleName="action" onClick={this.addNewEditableTour} disabled={isNewEditableTourAdded}>Add New</button>
        <button name="settings" styleName="action">Settings</button>
        <Tours tourList={tourList} isNewEditableTourAdded={isNewEditableTourAdded} cancelAddNewTour={this.cancelAddNewTour} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tourList: state.COMPONENTS.Config.componentProps.tourList
  }
};

export default connect(mapStateToProps)(Config);
