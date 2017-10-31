import React from 'react';
import PropTypes from 'prop-types';
import Steps from '../../components/Steps/Steps';

import './StepEditor.css';


export default class StepEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    steps: PropTypes.array.isRequired,
    selectedNumber: PropTypes.number.isRequired
  };

  render() {
    const {steps, selectedNumber} = this.props;
    return (
      <div className="gt-tour-steps-container">
        <Steps steps={steps} selectedNumber={selectedNumber} />
        <div>Some content</div>
      </div>
    )
  }
}

