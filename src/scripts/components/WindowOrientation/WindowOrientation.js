import React from 'react';
import PropTypes from 'prop-types';
import { ORIENTATION, ORIENTATION_NAMES } from '../../constants/tour-settings';

import './WindowOrientation.pcss';

const { CENTER, LEFT, RIGHT, UP, DOWN } = ORIENTATION;

WindowOrientation.propTypes = {
  orientation: PropTypes.oneOf(Object.keys(ORIENTATION).map(key => ORIENTATION[key])).isRequired,
  changeOrientationHandler: PropTypes.func.isRequired
};

// The height style of outer DOM element must be strictly defined otherwise height of element will not be set
export default function WindowOrientation(props) {
  const DIRECTION_GROUP_NAME = 'gt__se-window-direction';
  const ID_CENTER = `${DIRECTION_GROUP_NAME}-${CENTER}`;
  const ID_UP = `${DIRECTION_GROUP_NAME}-${UP}`;
  const ID_RIGHT = `${DIRECTION_GROUP_NAME}-${RIGHT}`;
  const ID_DOWN = `${DIRECTION_GROUP_NAME}-${DOWN}`;
  const ID_LEFT = `${DIRECTION_GROUP_NAME}-${LEFT}`;
  let { orientation, changeOrientationHandler } = props;

  return (
    <div styleName="container">
      <div styleName="row">
        <input type="radio" value={UP} name={DIRECTION_GROUP_NAME} id={ID_UP} defaultChecked={orientation === UP} onChange={changeOrientationHandler} />
        <label styleName="direction" htmlFor={ID_UP}>
          {ORIENTATION_NAMES[UP]}
        </label>
      </div>
      <div styleName="row">
        <input type="radio" value={RIGHT} name={DIRECTION_GROUP_NAME} id={ID_RIGHT} defaultChecked={orientation === RIGHT} onChange={changeOrientationHandler} />
        <label styleName="direction" htmlFor={ID_RIGHT}>
          {ORIENTATION_NAMES[RIGHT]}
        </label>
        <input type="radio" value={LEFT} name={DIRECTION_GROUP_NAME} id={ID_LEFT} defaultChecked={orientation === LEFT} onChange={changeOrientationHandler} />
        <label styleName="direction" htmlFor={ID_LEFT}>
          {ORIENTATION_NAMES[LEFT]}
        </label>
        <input type="radio" value={CENTER} name={DIRECTION_GROUP_NAME} id={ID_CENTER} defaultChecked={orientation === CENTER} onChange={changeOrientationHandler} />
        <label styleName="direction" htmlFor={ID_CENTER}>
          {ORIENTATION_NAMES[CENTER]}
        </label>
      </div>
      <div styleName="row">
        <input type="radio" value={DOWN} name={DIRECTION_GROUP_NAME} id={ID_DOWN} defaultChecked={orientation === DOWN} onChange={changeOrientationHandler} />
        <label styleName="direction" htmlFor={ID_DOWN}>
          {ORIENTATION_NAMES[DOWN]}
        </label>
      </div>
    </div>
  );
}

