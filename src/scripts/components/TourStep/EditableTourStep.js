import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import FlexTableRow from '../FlexTableRow/FlexTableRow';
import * as actions from '../../actions';

import './EditableTourStep.pcss';

const sizes = [
  {fixed: false, width: '100%'},
  {fixed: true, width: 'initial'},
];

class EditableTourStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tourStepName: props.tourStepName,
    };
  }

  static propTypes = {
    tourStepName: PropTypes.string.isRequired,
  };

  tourStepNameHandler = (event) => {
    this.setState({
      tourStepName: event.target.value,
      isWrongTourStepName: false
    });
  };

  saveNewTourStepLocallyHandler = () => {
    const { tourStepName } = this.state;
    if (tourStepName && tourStepName.trim()) {
      this.props.addNewTourStep(tourStepName.trim());
      this.props.goToNextStepEditor();
    } else {
      this.setState({
        isWrongTourStepName: true
      });
    }
  };

  cancelAddNewTourStep = (event) => {
    this.props.setTourStepInProgress(false)
  };

  render() {
    const { tourStepName, isWrongTourStepName } = this.state;
    return (
      <FlexTableRow isLabel={false} sizes={sizes}>
        <input autoFocus type="text"
               styleName={classNames('editable-name', {'is-wrong-value': isWrongTourStepName})}
               value={tourStepName}
               placeholder="Enter step name"
               maxLength="100"
               onChange={this.tourStepNameHandler}
        />
        <div styleName="editable-action-panel">
          <span styleName="tooltip" data-tooltip="Save step name">
            <i className="material-icons" styleName="editable-action" onClick={this.saveNewTourStepLocallyHandler}>save</i>
          </span>
          <span styleName="tooltip" data-tooltip="Delete">
            <i className="material-icons" styleName="editable-action" onClick={this.cancelAddNewTourStep}>block</i>
          </span>
        </div>
      </FlexTableRow>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewTourStep: (...args) => dispatch(actions.addNewTourStep(...args)),
    goToNextStepEditor: () => dispatch(actions.goToNextStepEditor()),
    setTourStepInProgress: (...args) => dispatch(actions.setTourStepInProgress(...args)),
  }
};

export default connect(null, mapDispatchToProps)(EditableTourStep);
