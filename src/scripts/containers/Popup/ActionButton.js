import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './ActionButton.pcss';

// TODO: move the list to 'actions'
const actions = (dispatch) => ({
  onCancel: (event) => {
    dispatch({type: 'ON_CANCEL'});
  },
  onSave: (event) => {
    dispatch({type: 'ON_SAVE'});
  },
  onNext: (event) => {
    dispatch({type: 'ON_NEXT'});
  },
  onPrevious: (event) => {
    dispatch({type: 'ON_PREVIOUS'});
  }
});

const ActionButton = (props) => {
  let defaultClassName = 'action';

  return (
    <button styleName={props.className || defaultClassName} onClick={actions(props.dispatch)[props.onClick]}>
      {props.title}
    </button>
  )
};

ActionButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.oneOf(['onCancel', 'onSave', 'onNext', 'onPrevious']).isRequired,
  className: PropTypes.oneOf(['action', 'action-capitalized']) //for adding of new css classes
};

export default connect()(ActionButton);



