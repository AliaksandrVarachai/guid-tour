import React from 'react';
import PropTypes from 'prop-types';
import ReactRTE from 'react-rte';

import './RichTextEditor.css';

export default class RichTextEditor extends React.Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func
  };

  state = {
    value: this.props.value ? ReactRTE.createValueFromString(this.props.value, 'html') : ReactRTE.createEmptyValue()
  };

  onChange = (value) => {
    this.setState({value});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        value.toString('html')
      );
    }
  };

  render () {
    return (
      <ReactRTE
        value={this.state.value}
        onChange={this.onChange}
        className="gt__rte-container"
      />
    );
  }
}
