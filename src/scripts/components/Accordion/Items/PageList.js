import React from 'react';
import { connect } from 'react-redux';
import RadioList from '../../RadioList/RadioList';
import * as actions from '../../../actions';

import './PageList.pcss';

function PageList({ pages, tours, tourIndex, tourStepIndex, changeTourStep }) {

  function changeHandler(e) {
    changeTourStep({
      pageId: e.target.getAttribute('data-id')
    });
  }

  // TODO: implement a real custom target id (now it is a substitute of visual id)  then remove {display : 'none'}
  return (
    <div>
      <div styleName="action-container" style={{display : 'none'}}>
        <input type="text" placeholder="Custom page id"/>
        <button>Add</button>
      </div>
      <RadioList listName="gt-page-list"
                 selectedId={tours[tourIndex].steps[tourStepIndex].pageId}
                 changeHandler={changeHandler}>
        {Object.keys(pages).map(id => ({
          id,
          label: pages[id].title,
        }))}
      </RadioList>
    </div>
  )
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
    changeTourStep: (...args) => dispatch(actions.changeTourStep(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageList);
