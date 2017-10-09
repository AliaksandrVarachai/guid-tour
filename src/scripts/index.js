import '../index.html';

import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header/Header';
import Search from './components/Search/Search';
import GtConfig from './components/GtConfig/GtConfig';

// TODO: move the component to a separate file
function PopupForm(props) {
  return(
    <div className="popup-container" style={{left: props.left, top: props.top}}>
      <h2>Container title</h2>
      <div className="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum ipsam laboriosam libero sapiente veritatis. Consequatur ea eius est excepturi facere harum in ipsa itaque, labore, nemo praesentium quo sapiente sequi.</p>
        <p>
          <input type="text" placeholder="Type something"/>
        </p>
      </div>
      <div className="action-container">
        <button>Yes</button> <button>No</button>
      </div>
    </div>
  )
}

class GuideTour extends React.Component {
  constructor() {
    super();
    this.state = {
      isPopupShown: false,
      popup: null,
      left: 0,
      top: 0
    }
  }

  onComponentClick = evt => {
    this.setState({
      isPopupShown: true,
      popup: PopupForm,
      left: evt.pageX,
      top: evt.pageY
    });
  };

  onButtonClick = evt => {
    alert(123)
  };

  render() {
    let state = this.state;
    return (
      <div onClick={ this.onComponentClick } style={{height: "100%"}}>
        <Header/>
        <Search/> {/* TODO: add props with saved search */}
        <h2>Test Component</h2>
        <p>Click any place of the yellow area to test a popup menu</p>
        <GtConfig/>
        <button onClick={ this.onButtonClick }>Click to load</button>
        <div id="popups-store">
          {this.state.isPopupShown ? <PopupForm left={state.left + 'px'} top={state.top + 'px'}/> : null}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<GuideTour/>, document.getElementById('gt-root'));
