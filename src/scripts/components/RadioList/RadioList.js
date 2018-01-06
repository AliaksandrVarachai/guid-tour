import React from 'react';
import PropTypes from 'prop-types';

import './RadioList.pcss';

export default class RadioList extends React.Component {
  static propTypes = {
    children: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })).isRequired,
    listName: PropTypes.string.isRequired,
    selectedId: PropTypes.string, // it is not required for a new added step
    changeHandler: PropTypes.func.isRequired,
  };

  // id must be unique (e.g. 32 hex digits)
  generateInput = (item) => (
    <input type="radio"
           name={this.props.listName}
           id={item.id}
           styleName="item-radio" key={`radio-${item.id}`}
           onChange={this.props.changeHandler}
           checked={item.id === this.props.selectedId}
    />
  );

  generateLabel = (item) => (
    <label htmlFor={item.id}
           styleName="item-label"
           key={`label-${item.id}`}>
      {item.label}
    </label>
  );

  render() {
    // Accordion is selected by CSS, so it ought to stick to the strict DOM element order: input+label+content (without any container for them)
    let inputLabelContentItems = [];
    this.props.children.forEach(item => {
      inputLabelContentItems.push(this.generateInput(item));
      inputLabelContentItems.push(this.generateLabel(item));
    });

    return (
      <div>
        {inputLabelContentItems}
      </div>
    );
  }
}
