import '../index.html';

import React from 'react';
import ReactDOM from 'react-dom';

/* Data */
import Data from './data';

import Header from './components/Header/Header';
import ToursList from './components/ToursList/ToursList';
import Footer from './components/Footer/Footer';

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

  render() {
    let state = this.state;
    return (
      <div onClick={ this.onComponentClick } style={{height: "100%"}}>
        <Header/>
        <div id="popups-store">
          {this.state.isPopupShown ? <PopupForm left={state.left + 'px'} top={state.top + 'px'}/> : null}
        </div>
        <ToursList toursList={Data.toursList}/>
        <Footer/>
      </div>
    );
  }
}

ReactDOM.render(<GuideTour/>, document.getElementById('gt-root'));
