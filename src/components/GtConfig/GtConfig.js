import React from 'react';
// import '../../images/gt-logo-179x69.png';
import './GtConfig.css';

export default class GtConfig extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="gt-config-component">
        <div styleName="ccc">123456</div>
        <div styleName="logo"></div>
        <h1 styleName="header">I am a GtConfig component!</h1>
      </div>
    );
  }
}

