import React from 'react';
import PropTypes from 'prop-types';

import './WindowOrientation.css';

const ORIENTATION = {
  CENTER: 'center',
  UP: 'up',
  RIGHT: 'right',
  DOWN: 'down',
  LEFT: 'left'
};

const DIRECTION_GROUP_NAME = 'gt-se-window-direction';

WindowOrientation.propTypes = {
  orientation: PropTypes.oneOf(Object.keys(ORIENTATION).map(key => ORIENTATION[key])).isRequired,
};

// TODO: make the handler to change the state
function changeHandler(e) {
  console.log('checked orientation: ' + e.target.value);
}

// The height style of outer DOM element must be strictly defined otherwise height of element will not be set
export default function WindowOrientation(props) {
  const { CENTER, UP, RIGHT, DOWN, LEFT } = ORIENTATION;
  const ID_CENTER = `${DIRECTION_GROUP_NAME}-${CENTER}`;
  const ID_UP = `${DIRECTION_GROUP_NAME}-${UP}`;
  const ID_RIGHT = `${DIRECTION_GROUP_NAME}-${RIGHT}`;
  const ID_DOWN = `${DIRECTION_GROUP_NAME}-${DOWN}`;
  const ID_LEFT = `${DIRECTION_GROUP_NAME}-${LEFT}`;
  let { orientation } = props;

  return (
    <div styleName="container">
      <div styleName="row">
        <input type="radio" value={UP} name={DIRECTION_GROUP_NAME} id={ID_UP} defaultChecked={orientation === UP} onChange={changeHandler} />
        <label styleName="direction" htmlFor={ID_UP}>
          {UP}
        </label>
      </div>
      <div styleName="row">
        <input type="radio" value={RIGHT} name={DIRECTION_GROUP_NAME} id={ID_RIGHT} defaultChecked={orientation === RIGHT} onChange={changeHandler} />
        <label styleName="direction" htmlFor={ID_RIGHT}>
          {RIGHT}
        </label>
        <input type="radio" value={LEFT} name={DIRECTION_GROUP_NAME} id={ID_LEFT} defaultChecked={orientation === LEFT} onChange={changeHandler} />
        <label styleName="direction" htmlFor={ID_LEFT}>
          {LEFT}
        </label>
        <input type="radio" value={CENTER} name={DIRECTION_GROUP_NAME} id={ID_CENTER} defaultChecked={orientation === CENTER} onChange={changeHandler} />
        <label styleName="direction" htmlFor={ID_CENTER}>
          {CENTER}
        </label>
      </div>
      <div styleName="row">
        <input type="radio" value={DOWN} name={DIRECTION_GROUP_NAME} id={ID_DOWN} defaultChecked={orientation === DOWN} onChange={changeHandler} />
        <label styleName="direction" htmlFor={ID_DOWN}>
          {DOWN}
        </label>
      </div>
    </div>
  );
}

