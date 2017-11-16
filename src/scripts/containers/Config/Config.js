import React from 'react';
import { connect } from 'react-redux';
import getResourceURL from '../../helpers/get-resource-url';
import Search from '../../components/Search/Search';
import Tours from '../../components/Tours/Tours';

import './Config.css';

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
      <div className="gt-config-container">
        <div styleName="logo-bar">
          <img styleName="logo" src={getResourceURL(logo)} alt="logo" />
        </div>
        <div styleName="main-header">Available Guided Tours
          <div style={{float: 'right'}}>
            <Search />
          </div>
        </div>
        <button name="addNew" styleName="action" onClick={this.addNewEditableTour}>Add New</button>
        <button name="settings" styleName="action">Settings</button>
        <Tours tourList={tourList} isNewEditableTourAdded={isNewEditableTourAdded} />
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
