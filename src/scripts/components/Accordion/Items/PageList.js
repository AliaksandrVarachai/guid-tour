import React from 'react';
import { connect } from 'react-redux';
import RadioList from '../../RadioList/RadioList';

import './PageList.pcss';

function PageList({ pages, tours, tourIndex, tourStepIndex, dispatch }) {

  function changeHandler(e) {
    // TODO: make propNames = []
    dispatch({
      type: 'CHANGE_TOUR_STEP',
      propName: 'pageId',
      value: e.target.id
    });
    dispatch({
      type: 'CHANGE_TOUR_STEP',
      propName: 'visualId', // clear visualId when a new page is chosen
      value: ''
    })
  }

  return (
    <div>
      <div styleName="action-container">
        <input type="text" placeholder="Custom page id"/>
        <button>Add</button>
      </div>
      <RadioList listName="page-list"
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

export default connect(mapStateToProps)(PageList)
