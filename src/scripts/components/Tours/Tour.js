import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import EditableTour from './EditableTour';
import * as actions from '../../actions';
import documentMetaInfo from '../../tool-specific-helpers/document-meta-info';

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
    lastOpenDate: PropTypes.string,
    totalVisits: PropTypes.number,
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

  goToStepEditorHandler = (event) => {
    this.props.goToStepEditor(+event.target.getAttribute('data-tour-index'));
  };

  cloneTourHandler = (event) => {
    if (confirm(`Are you sure you want to clone tour "${this.props.tourName}"?`)) {
      this.props.cloneTour(+event.target.getAttribute('data-tour-index'), documentMetaInfo.getTemplateId(), this.props.creator);
    }
  };

  deleteTourHandler = (event) => {
    if (confirm(`Are you sure you want to delete tour "${this.props.tourName}"?`)) {
      this.props.deleteTour(+event.target.getAttribute('data-tour-index'))
    }
  };

  // TODO: unhide Creators
  render() {
    const { tourIndex, tourName, tourType, lastOpenDate, totalVisits, steps, creator, isHeader = false } = this.props;
    const minTime = "1900-01-01T00:00:00";
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
            {lastOpenDate ? lastOpenDate : "Last Open"}
          </div>
          <div className="gtu__table-cell" styleName="header header-visitors">
            {totalVisits ? totalVisits : "# Visits"}
          </div>
          <div className="gtu__table-cell" styleName="header header-steps">
            {steps ? steps : "# Steps"}
          </div>
          <div className="gtu__table-cell" styleName="header header-creator">
            {/*{creator ? creator : "Creator"}*/}
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
            {tourType}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {lastOpenDate === minTime ? "Never" : new Date(lastOpenDate).toLocaleDateString()}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {totalVisits}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {steps}
          </div>
          <div className="gtu__table-cell" styleName="data">
            {/*{creator}*/}
          </div>
          <div className="gtu__table-cell" styleName="data__overflow-visible">
            <span styleName="tooltip" data-tooltip="Step list">
              <i className="material-icons" styleName="action" data-tour-index={tourIndex} onClick={this.goToStepEditorHandler}>dashboard</i>
            </span>
            <span styleName="tooltip" data-tooltip="Clone tour">
              <i className="material-icons" styleName="action" data-tour-index={tourIndex} onClick={this.cloneTourHandler}>content_copy</i>
            </span>
            <span styleName="tooltip" data-tooltip="Edit tour">
              <i className="material-icons" styleName="action" onClick={this.editTour}>create</i>
            </span>
            <span styleName="tooltip" data-tooltip="Delete tour">
              <i className="material-icons" styleName="action" data-tour-index={tourIndex} onClick={this.deleteTourHandler}>delete</i>
            </span>
          </div>
        </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    goToStepEditor: (...args) => dispatch(actions.goToStepEditor(...args)),
    cloneTour: (...args) => dispatch(actions.cloneTour(...args)),
    deleteTour: (...args) => dispatch(actions.deleteTour(...args)),
  }
};

export default connect(null, mapDispatchToProps)(Tour);
