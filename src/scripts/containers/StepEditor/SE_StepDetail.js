import React from 'react';
import PropTypes from 'prop-types';

import './SE_StepDetail.css';

export default class SE_StepDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    windowStyle: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,  // px
    height: PropTypes.number.isRequired, // px
    windowOrientation: PropTypes.oneOf(['center', 'up', 'right', 'down', 'left'])
  };

  render() {
    const { windowStyle, width, height, windowOrientation } = this.props;
    return (
      <div>
        <div styleName="col-rte">
          <input type="text" styleName="step-header"/>
          <div>
            Rich Text Editor is here
          </div>
        </div>
        <div styleName="col-settings">
          <div styleName="params table">
            <div styleName="row">
              <div styleName="cell">Window Style</div>
              <div styleName="cell">
                <input type="text" value={windowStyle} />
              </div>
              <div styleName="cell">
                <button>Styles Editor</button>
              </div>
            </div>
            <div styleName="row">
              <div styleNAme="cell">Width</div>
              <div styleName="cell">
                <input type="text" value={width} />
                <span styleName="units">px.</span>
              </div>
              <div styleName="cell">
                <button>Preview</button>
              </div>
            </div>
            <div styleName="row">
              <div styleNAme="cell">Heigth</div>
              <div styleName="cell">
                <input type="text" value={width} />
                <span styleName="units">px.</span>
              </div>
              <div styleName="cell"/>
            </div>
          </div>
          <div styleName="window-orientation">
            component with Up, Right ....
          </div>
        </div>
      </div>
    );
  }
}

