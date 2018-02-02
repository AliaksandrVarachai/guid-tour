import React from 'react';
import PropTypes from 'prop-types';
import ReactRTE from 'react-rte';

import './RichTextEditor.pcss';

const toolbarConfig = {
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'IMAGE_BUTTON', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS : [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Strikethrough', style: 'STRIKETHROUGH'},
    {label: 'Monospace', style: 'CODE'},
  ],
  BLOCK_TYPE_DROPDOWN : [
    {label: 'Normal', style: 'unstyled'},
    {label: 'Heading Large', style: 'header-one'},
    {label: 'Heading Medium', style: 'header-two'},
    {label: 'Heading Small', style: 'header-three'},
    {label: 'Code Block', style: 'code-block'},
  ],
  BLOCK_TYPE_BUTTONS : [
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Blockquote', style: 'blockquote'},
  ],
};

// TODO: remove after moving the script out of an iframe
function blockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  switch (type) {
    case 'header-one':
      return 'gt__rte-h1';
    case 'header-two':
      return 'gt__rte-h2';
    case 'header-three':
      return 'gt__rte-h3';
    case 'code-block':
      return 'gt__rte-code-block';
    default:
      //nothing
  }
}

export default class RichTextEditor extends React.Component {
  static propTypes = {
    value: PropTypes.string,
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
        toolbarConfig={toolbarConfig}
        // className="gt__rte-container"
        editorClassName="gt__rte-container"
        placeholder="Add content here"
        autoFocus={true}
        blockStyleFn={blockStyleFn}
      />
    );
  }
}
