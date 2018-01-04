import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import EditableTourStep from './EditableTourStep';

import './TourStep.pcss';

// TODO: add required for properties (exclude of isHeader == true)
class TourStep extends React.Component {
  constructor(props) {
    super(props);
    console.log('props.isEditable=', props.isEditable)
    this.state = {
      isEditable: props.isEditable
    }
  }

  static propTypes = {
    isChecked: PropTypes.bool,
    tourStepName: PropTypes.string,
    targetPage: PropTypes.string,
    targetControl: PropTypes.string,
    content: PropTypes.string,
    isHeader: PropTypes.bool,
    cancelAddNewTourStep: PropTypes.func,  // only if a new TourStep added
  };

  static defaultProps = {
    isHeader: false,
    isEditable: false
  };

  // saveTourStepChanges = (event) => {
  //   this.setState({
  //     isEditable: false
  //   });
  // };

  // cancelTourStepChanges = (event) => {
  //   this.setState({
  //     isEditable: false
  //   });
  // };

  render() {
    const { isChecked, tourStepName, targetPage, targetControl, content, isHeader = false } = this.props;
    let { isEditable } = this.state;
    //const isNewAddedTourStep = !!this.props.cancelAddNewTourStep;
    return (
      isHeader ?
        <div className="gtu__table-row">
          <div className="gtu__table-cell" styleName="header header-tour-radio">
            {null}
          </div>
          <div className="gtu__table-cell" styleName="header header-tour-step">
            {tourStepName ? tourStepName : "Tour Step Name"}
          </div>
          <div className="gtu__table-cell" styleName="header header-target-page">
            {targetPage ? targetPage : "Target Page"}
          </div>
          <div className="gtu__table-cell" styleName="header header-target-control">
            {targetControl ? targetControl : "Target Control"}
          </div>
          <div className="gtu__table-cell" styleName="header header-content">
            {content ? content : "Content"}
          </div>
          <div className="gtu__table-cell" styleName="header header-scroll">
            {null}
          </div>
          <div className="gtu__table-cell" styleName="header header-actions">
            {null}
          </div>
        </div>
        : isEditable ?
        <div className="gtu__table-row">
          <div className="gtu__table-cell" styleName="data">
            <EditableTourStep tourStepName={tourStepName} cancelTourStepChanges={this.props.cancelAddNewTour} />
            {tourStepName} {/* to prevent change of cell for editing row */}
          </div>
          <div className="gtu__table-cell" styleName="data" />
          <div className="gtu__table-cell" styleName="data" />
          <div className="gtu__table-cell" styleName="data" />
          <div className="gtu__table-cell" styleName="data" />
          <div className="gtu__table-cell" styleName="data" />
          <div className="gtu__table-cell" styleName="data" />
        </div>
        :
        <div className="gtu__table-row">
          <div className="gtu__table-cell" styleName="data">
            <input type="radio" name="tour-item-radio" defaultChecked={isChecked}/>
          </div>
          <div className="gtu__table-cell" styleName="data">
            {tourStepName}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {targetPage}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {targetControl}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {content}
          </div>
          <div className="gtu__table-cell" styleName="data">
            <i className="material-icons" styleName="action">keyboard_arrow_up</i>
            <i className="material-icons" styleName="action">keyboard_arrow_down</i>
          </div>
          <div className="gtu__table-cell" styleName="data">
            <i className="material-icons" styleName="action">content_copy</i>
            <i className="material-icons" styleName="action">delete</i>
          </div>
        </div>
    );
  }
}

// class TourStep({isChecked, tourStepName, targetPage, targetControl, content, isHeader = false}) {
//
//
// }

export default connect()(TourStep);
