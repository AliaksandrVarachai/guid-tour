import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Search from '../../components/Search/Search';
import TourSteps from '../../components/TourSteps/TourSteps';

import './SE_TourSteps.pcss';

class SE_TourSteps extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    currentIndex: PropTypes.number.isRequired
  };

  render() {
    const {steps, currentIndex} = this.props;
    return (
      <div styleName="container">
        <div styleName="main-header">
          <span style={{float: 'right'}}>
            <Search />
          </span>
        </div>
        <TourSteps steps={steps} currentIndex={currentIndex} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const component = state.COMPONENTS[state.componentName];
  return {
    steps: component.componentProps.tourSteps,
  }
};

export default connect(mapStateToProps)(SE_TourSteps);
