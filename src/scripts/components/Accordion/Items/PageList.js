import React from 'react';
import { connect } from 'react-redux';
import RadioList from '../../RadioList/RadioList';
import productActions from '../../../tool-specific-helpers/actions';

import './PageList.pcss';

class PageList extends React.Component {
  constructor(props) {
    const { tours, tourIndex, tourStepIndex, activateSheetAsync } = props;
    super(props);
    activateSheetAsync(tours[tourIndex].steps[tourStepIndex].pageId, false);
  }

  changeHandler = (e) => {
    const targetPageId = e.target.getAttribute('data-id');
    this.props.activateSheetAsync(targetPageId, true);
  };

  // TODO: implement a real custom target id (now it is a substitute of visual id)  then remove {display : 'none'}
  render() {
    const { pages, tours, tourIndex, tourStepIndex } = this.props;
    return (
      <div>
        <div styleName="action-container" style={{display : 'none'}}>
          <input type="text" placeholder="Custom page id"/>
          <button>Add</button>
        </div>
        <RadioList listName="gt-page-list"
                   selectedId={tours[tourIndex].steps[tourStepIndex].pageId}
                   changeHandler={this.changeHandler}>
          {Object.keys(pages).map(id => ({
            id,
            label: pages[id].title,
          }))}
        </RadioList>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tours: state.tours,
    tourIndex: state.tourIndex,
    tourStepIndex: state.tourStepIndex,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    activateSheetAsync: (...args) => dispatch(productActions.activateSheetAsync(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
