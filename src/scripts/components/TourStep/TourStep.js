import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import FlexTableRow from '../FlexTableRow/FlexTableRow';
import * as actions from '../../actions';

import './TourStep.pcss';

const sizes = [
  {fixed: true, width: '20px'},
  {fixed: false, width: '40%'},
  {fixed: false, width: '10%'},
  {fixed: false, width: '10%'},
  {fixed: false, width: '40%'},
  {fixed: true, width: '50px'},
];

// TODO: add required for properties (exclude of isHeader == true)
class TourStep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isTourNameTooltipShown: false
    }
  }

  static propTypes = {
    index: PropTypes.number,
    id: PropTypes.string,  // to control array of children via parent component
    isChecked: PropTypes.bool,
    tourStepName: PropTypes.string,
    targetPage: PropTypes.string,
    targetControl: PropTypes.string,
    htmlContent: PropTypes.string,
    isHeader: PropTypes.bool,
    isSynchronized: PropTypes.bool,
    isNew: PropTypes.bool,
    cancelAddNewTourStep: PropTypes.func,
  };

  static defaultProps = {
    isHeader: false,
  };

  stepSelectHandler = (event) => {
    this.props.dispatch({
      type: 'CHANGE_TOUR_STEP_INDEX',
      index: +event.target.getAttribute('data-step-index')
    });
  };

  cloneStepHandler = (event) => {
    if (this.props.isTourStepDraggingInProgress) {
      this.props.showMessage('You cannot clone step in draggable mode', 'warning');
    } else if (confirm(`Are you sure you want to clone the step "${this.props.tourStepName}"?`)) {
      this.props.cloneTourStep(+event.target.getAttribute('data-step-index'));
    }
  };

  deleteStepHandler = (event) => {
    if (this.props.isTourStepDraggingInProgress) {
      this.props.showMessage('You cannot delete step in draggable mode', 'warning');
    } else if (confirm(`Are you sure you want to delete the step "${this.props.tourStepName}"?`)) {
      this.props.deleteTourStep(+event.target.getAttribute('data-step-index'));
    }
  };

  tourNameTooltipHandler = (elem) => {
    if (elem === null)
      return; //unMount
    const { isTourNameTooltipShown } = this.state;
    const isOverflow = elem.scrollWidth > elem.clientWidth;
    if (isOverflow === isTourNameTooltipShown)
      return;
    this.setState({
      isTourNameTooltipShown: isOverflow
    });
  };

  render() {
    const { index, id, isChecked, tourStepName, targetPage, targetControl, htmlContent, isSynchronized = true, isNew = false, isHeader = false } = this.props;
    return (
      isHeader
        ?
        <FlexTableRow isLabel={false} sizes={sizes}>
          <div styleName="header"/>
          <div className="gtu__overflow-hidden" styleName="header">
            Tour Step Name
          </div>
          <div className="gtu__overflow-hidden" styleName="header">
            Target Page
          </div>
          <div className="gtu__overflow-hidden" styleName="header">
            Target Control
          </div>
          <div className="gtu__overflow-hidden" styleName="header">
            Content
          </div>
          <div styleName="header"/>
        </FlexTableRow>
        :
        <FlexTableRow isLabel={true} sizes={sizes}>
          <div styleName="data">
            <input type="radio" name="tour-item-radio" data-step-index={index} checked={isChecked} onChange={this.stepSelectHandler} />
          </div>
          <div styleName={classnames('data', {'not-synchronized': !isSynchronized || isNew})}>
            {this.state.isTourNameTooltipShown
              ?
              <span styleName="tooltip-tour-name" data-tooltip={tourStepName} key={id}>
                <span className="gtu__flex-table-inline--overflow-hidden" ref={elem => this.tourNameTooltipHandler(elem)}>
                  {tourStepName}
                </span>
              </span>
              :
              <span className="gtu__flex-table-inline--overflow-hidden" key={id} ref={elem => this.tourNameTooltipHandler(elem)}>
                {tourStepName}
              </span>
            }
          </div>
          <div className="gtu__overflow-hidden" styleName="data">
            {targetPage}
          </div>
          <div className="gtu__overflow-hidden" styleName="data">
            {targetControl}
          </div>
          <div className="gtu__overflow-hidden" styleName="data">
            {htmlContent}
          </div>
          <div styleName="data">
            <span styleName="tooltip-action" data-tooltip="Clone step">
              <i className="material-icons" styleName="action" data-step-index={index} onClick={this.cloneStepHandler}>content_copy</i>
            </span>
            <span styleName="tooltip-action" data-tooltip="Delete step">
              <i className="material-icons" styleName="action" data-step-index={index} onClick={this.deleteStepHandler}>delete</i>
            </span>
          </div>
        </FlexTableRow>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isChecked: state.tourStepIndex === ownProps.index,
    isTourStepDraggingInProgress: state.isTourStepDraggingInProgress,
  }
};

//TODO: REMOVE DISPATCH OR REFACTOR
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: dispatch,
    deleteTourStep: (...args) => dispatch(actions.deleteTourStep(...args)),
    cloneTourStep: (...args) => dispatch(actions.cloneTourStep(...args)),
    showMessage:  (...args) => dispatch(actions.showMessage(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TourStep);
