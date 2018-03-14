import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './FlexTableRow.pcss';

FlexTableRow.propTypes = {
  isLabel: PropTypes.bool,
  sizes: PropTypes.arrayOf(PropTypes.shape({
    fixed: PropTypes.bool.isRequired,
    width: PropTypes.string.isRequired
  })).isRequired,
  children: function(props) {
    if (React.Children.count(props.children) !== props.sizes.length)
      throw Error('Length of array "sizes" must equal to number of children');
  }
};

function createFlexTableCell(Child, size) {
  return  React.cloneElement(Child, {
    className: classnames(Child.props.className, size.fixed ? 'gtu__flex-table-item--fixed' : 'gtu__flex-table-item--flex'),
    style: {width: size.width}
  });
}

export default function FlexTableRow({children, sizes, isLabel = false}) {
  return isLabel
    ? <label styleName="container">
        {React.Children.map(children, (Child, index) => {
          return createFlexTableCell(Child, sizes[index])
        })}
      </label>
    : <div styleName="container">
        {React.Children.map(children, (Child, index) => {
          return createFlexTableCell(Child, sizes[index])
        })}
      </div>
}
