import React from 'react';
import { connect } from 'react-redux';
import RadioList from '../../RadioList/RadioList';

import './PageList.pcss';

function VisualList({ visuals, tours, tourIndex, tourStepIndex, dispatch }) {
  function changeHandler(e) {
    dispatch({
      type: 'CHANGE_TOUR_STEP',
      propName: 'visualId',
      value: e.target.id
    })
  }

  const step = tours[tourIndex].steps[tourStepIndex];

  return (
    <div>
      <div styleName="action-container">
        <input type="text" placeholder="Custom target id"/>
        <button>Add</button>
      </div>
      {step.pageId
        ?
        <RadioList listName="visual-list"
                     selectedId={step.visualId}
                     changeHandler={changeHandler}>

          {Object.keys(visuals).filter(id => visuals[id].pageId === step.pageId).map(id => ({
            id,
            label: visuals[id].title,
          }))}
        </RadioList>
        :
        'Target page is not selected'
      }

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

export default connect(mapStateToProps)(VisualList)
