import React from 'react';
import PropTypes from 'prop-types';
import Search from '../../components/Search/Search';
import TourSteps from '../../components/TourSteps/TourSteps';

import './SE_TourSteps.css';

export default class SE_TourSteps extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    steps: PropTypes.array.isRequired,
    currentIndex: PropTypes.number.isRequired
  };

  render() {
    const {steps, currentIndex} = this.props;
    return (
      <div className="gt-se-tour-steps">
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
