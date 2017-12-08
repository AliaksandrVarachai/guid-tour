import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditableTour from './EditableTour';
import { TOUR_TYPES } from '../../constants/tour-settings';

import table from '../../../shared-styles/table.css';
import styles from './Tour.css';

// TODO: add required for properties (exclude of isHeader == true)
class Tour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: props.isEditable
    }
  }

  static propTypes = {
    tourIndex: PropTypes.number,
    tourName: PropTypes.string,
    tourType: PropTypes.string,
    lastOpen: PropTypes.string,
    visitors: PropTypes.number,
    steps: PropTypes.number,
    creator: PropTypes.string,
    isHeader: PropTypes.bool,
    cancelAddNewTour: PropTypes.func,  // only if a new Tour added
  };

  static defaultProps = {
    isHeader: false,
    isEditable: false
  };

  editTour = (event) => {
    this.setState({
      isEditable: true
    })
  };

  saveTourChanges = (event) => {
    this.setState({
      isEditable: false
    });
  };

  cancelTourChanges = (event) => {
    this.setState({
      isEditable: false
    });
  };

  render() {
    const { tourIndex, tourName, tourType, lastOpen, visitors, steps, creator, isHeader = false } = this.props;
    let { isEditable } = this.state;
    const isNewAddedTour = !!this.props.cancelAddNewTour;
    return (
      isHeader ?
        <div styleName="table.row">
          <div styleName="table.header styles.col-tour-name">
            {tourName ? tourName : "Tour Name"}
          </div>
          <div styleName="table.header styles.col-tour-type">
            {tourType ? tourType : "Tour Type"}
          </div>
          <div styleName="table.header styles.col-last-open">
            {lastOpen ? lastOpen : "Last Open"}
          </div>
          <div styleName="table.header styles.col-visitors">
            {visitors ? visitors : "# Visitors"}
          </div>
          <div styleName="table.header styles.col-steps">
            {steps ? steps : "# Steps"}
          </div>
          <div styleName="table.header styles.col-creator">
            {creator ? creator : "Creator"}
          </div>
          <div styleName="table.header styles.col-actions">
            {null}
          </div>
        </div>
        : isEditable ?
        <div styleName="table.row">
          <div styleName="table.cell">
            {isNewAddedTour
              ?
              <EditableTour tourName={tourName} tourType={tourType} cancelTourChanges={this.props.cancelAddNewTour} />
              :
              <EditableTour tourIndex={tourIndex} tourName={tourName} tourType={tourType} saveTourChanges={this.saveTourChanges} cancelTourChanges={this.cancelTourChanges} />
            }
            {tourName} {/* to prevent change of cell for editing row */}
          </div>
          <div styleName="table.cell"/>
          <div styleName="table.cell"/>
          <div styleName="table.cell"/>
          <div styleName="table.cell"/>
          <div styleName="table.cell"/>
          <div styleName="table.cell"/>
        </div>
        :
        <div styleName="table.row">
          <div styleName="table.cell">
            {tourName}
          </div>
          <div styleName="table.cell">
            {TOUR_TYPES[tourType]}
          </div>
          <div styleName="table.cell">
            {lastOpen}
          </div>
          <div styleName="table.cell">
            {visitors}
          </div>
          <div styleName="table.cell">
            {steps}
          </div>
          <div styleName="table.cell">
            {creator}
          </div>
          <div styleName="table.cell">
            <i className="material-icons" styleName="styles.action">content_copy</i>
            <i className="material-icons" styleName="styles.action" onClick={this.editTour}>create</i>
            <i className="material-icons" styleName="styles.action">delete</i>
          </div>
        </div>
    )
  }
}

export default connect()(Tour);

