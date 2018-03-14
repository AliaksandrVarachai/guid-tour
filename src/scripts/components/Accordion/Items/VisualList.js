import React from 'react';
import { connect } from 'react-redux';
import RadioList from '../../RadioList/RadioList';
import { highlightVisual } from '../../../helpers/tour-runner';
import getVisualsByPageId from '../../../helpers/get-visuals-by-page-id';
import * as actions from '../../../actions';

import './PageList.pcss';

function VisualList({ visuals, tours, tourIndex, tourStepIndex, changeTourStep }) {

  function changeHandler(e) {
    const visualId = e.target.getAttribute('data-id');

    changeTourStep({
      customTargetId: visualId
    });
    highlightVisual(visualId);
  }

  const step = tours[tourIndex].steps[tourStepIndex];

  // TODO: implement a real custom target id (now it is a substitute of visual id)  then remove {display : 'none'}
  return (
    <div>
      <div styleName="action-container" style={{display : 'none'}}>
        <input type="text" placeholder="Custom target id"/>
        <button>Add</button>
      </div>
      {step.pageId
        ?
        <RadioList listName="gt-visual-list"
                   selectedId={step.customTargetId}
                   changeHandler={changeHandler}>
          {Object.keys(visuals).map(id => ({
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

const mapDispatchToProps = (dispatch) => {
  return {
    changeTourStep: (...args) => dispatch(actions.changeTourStep(...args)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(VisualList);
