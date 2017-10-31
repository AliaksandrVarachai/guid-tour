import React from 'react';
import PropTypes from 'prop-types';
import Step from './Step';

import './Steps.css';

Steps.propTypes = {
  steps: PropTypes.array.isRequired,
  selectedNumber: PropTypes.number.isRequired,
};

export default function Steps({steps, selectedNumber}) {
  return (
    <div className="gt-steps-component">
      {steps.map((step, inx) => <Step number={inx + 1}
                                      selectedNumber={selectedNumber}
                                      {...step}
                                      key={inx}
      />)}
    </div>
  )
}
