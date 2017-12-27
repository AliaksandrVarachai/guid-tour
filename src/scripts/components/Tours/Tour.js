import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditableTour from './EditableTour';
import { TOUR_TYPES } from '../../constants/tour-settings';

import './Tour.pcss';

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
        <div className="gtu__table-row">
          <div className="gtu__table-cell" styleName="header header-tour-name">
            {tourName ? tourName : "Tour Name"}
          </div>
          <div className="gtu__table-cell" styleName="header header-tour-type">
            {tourType ? tourType : "Tour Type"}
          </div>
          <div className="gtu__table-cell" styleName="header header-last-open">
            {lastOpen ? lastOpen : "Last Open"}
          </div>
          <div className="gtu__table-cell" styleName="header header-visitors">
            {visitors ? visitors : "# Visitors"}
          </div>
          <div className="gtu__table-cell" styleName="header header-steps">
            {steps ? steps : "# Steps"}
          </div>
          <div className="gtu__table-cell" styleName="header header-creator">
            {creator ? creator : "Creator"}
          </div>
          <div className="gtu__table-cell" styleName="header header-actions">
            {null}
          </div>
        </div>
        : isEditable ?
        <div className="gtu__table-row">
          <div className="gtu__table-cell" styleName="data">
            {isNewAddedTour
              ?
              <EditableTour tourName={tourName} tourType={tourType} cancelTourChanges={this.props.cancelAddNewTour} />
              :
              <EditableTour tourIndex={tourIndex} tourName={tourName} tourType={tourType} saveTourChanges={this.saveTourChanges} cancelTourChanges={this.cancelTourChanges} />
            }
            {tourName} {/* to prevent change of cell for editing row */}
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
            {tourName}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {TOUR_TYPES[tourType]}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {lastOpen}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {visitors}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {steps}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {creator}
          </div>
          <div className="gtu__table-cell" styleName="data">
            <i className="material-icons" styleName="action">content_copy</i>
            <i className="material-icons" styleName="action" onClick={this.editTour}>create</i>
            <i className="material-icons" styleName="action">delete</i>
          </div>
        </div>
    )
  }
}

export default connect()(Tour);

