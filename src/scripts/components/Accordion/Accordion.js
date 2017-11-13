import React from 'react';
import PropTypes from 'prop-types';

import './Accordion.css';

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.func.isRequired
    })
  ).isRequired
};

const AC_ITEM_NAME = 'accordion';

const generateInput = (item, index) => (
  <input type="radio" name={AC_ITEM_NAME} id={`${AC_ITEM_NAME}-${index}`} styleName="ac-item-radio" key={`radio-${index}`} defaultChecked={true} />
);

const generateLabel = (item, index) => (
  <label htmlFor={`${AC_ITEM_NAME}-${index}`} styleName="ac-item-label" key={`label-${index}`}>
    {item.label}
  </label>
);

const generateContent = (item, index) => (
  <div styleName="ac-item-content" key={`content-${index}`}>
    <item.content />
  </div>
);

// height of container must be set strictly otherwise accordion height will be calculated according to its content
export default function Accordion(props) {
  // Accordion is selected by CSS, so it ought to stick to the strict DOM element order: input+label+content (without any container for them)
  let inputLabelContentItems = [];
  props.items.forEach((item, index) => {
    inputLabelContentItems.push(generateInput(item, index));
    inputLabelContentItems.push(generateLabel(item, index));
    inputLabelContentItems.push(generateContent(item, index));
  });

  return (
    <div styleName="container">
      {inputLabelContentItems}
    </div>
  );
}
