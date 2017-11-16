/**
 * Provides testing of created components on the local dev server.
 * Copies html into output directory.
 * @example <caption>Local testing of components.</caption>
 * http://localhost:9090/redux-store.html
 */

import './redux-store.html';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const initState = {coords: {x: 0, y: 0}, color: 'black'};

const reducer = (state = initState, action) => {

  switch (action.type) {
    case 'POSITION':
      let newState = {...state}; // coords & color poinst to the same object
      newState.coords = {        // mutable branch is replaced completely with a new object
        x: action.x,
        y: action.y
      };
      return newState;
    case 'COLOR':
      return {
        ...state,
        color: action.color
      };
    case 'TEST':
      alert('TEST');
      return state;
    default:
      return state;
  }
};

const store = createStore(reducer);

class InnerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: props.x,
      y: props.y,
      color: props.color
    };
  }

  changeX = (e) => {
    this.setState({
      x: +e.target.value
    });
  };

  changeY = (e) => {
    this.setState({
      y: +e.target.value
    });
  };

  changeColor = (e) => {
    this.setState({
      color: e.target.value
    })
  };

  applyAll = () => {
    let {x, y, color} = this.state;
    this.props.applyAll(x, y, color);
  };

  render() {
    const {x, y, color} = this.state;
    return (
      <div>
        <table>
          <tbody>
          <tr>
            <td>x=</td>
            <td><input type="text" value={x} onChange={this.changeX}/></td>
          </tr>
          <tr>
            <td>y=</td>
            <td><input type="text" value={y} onChange={this.changeY}/></td>
          </tr>
          <tr>
            <td>color=</td>
            <td><input type="text" value={color} onChange={this.changeColor}/></td>
          </tr>
          </tbody>
        </table>
        <button onClick={this.applyAll}>Apply #1</button>
        <br/>
        <Button name="Apply #2" onClick={this.applyAll}/>
        <div id="area">
          <div id="point" style={{left: x + 'px', top: y + 'px', background: color}}></div>
        </div>
      </div>
    )
  }
}

const mapStateToPropsInner = state => {
  return {
    x: state.coords.x,
    y: state.coords.y,
    color: state.color
  }
};

const mapDispatchToPropsInner = dispatch => {

  return {
    applyAll: (x, y, color) => {
      dispatch({type: 'POSITION', x, y});
      dispatch({type: 'COLOR', color});
    }
  }
};

const ConnectedInnerComponent = connect(mapStateToPropsInner, mapDispatchToPropsInner)(InnerComponent);

class OuterComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {x, y, color} = this.props;
    return (
      <div>
        <table>
          <tbody>
          <tr>
            <td>x =</td>
            <td>{x}</td>
          </tr>
          <tr>
            <td>y =</td>
            <td>{y}</td>
          </tr>
          <tr>
            <td>color =</td>
            <td>{color}</td>
          </tr>
          </tbody>
        </table>
        <br/>
        <button onClick={this.props.onClick}>Test</button>
        <br/>
        <ConnectedInnerComponent/>
      </div>
    )
  }
}

const mapStateToPropsOuter = state => {
  return {
    color: state.color,
    x: state.coords.x,
    y: state.coords.y
  }
};

const mapDispatchToPropsOuter = dispatch => {
  return {
    onClick: () => {
      dispatch({type: 'TEST'});
    }
  }
};

const ConnectedOuterComponent = connect(mapStateToPropsOuter, mapDispatchToPropsOuter)(OuterComponent);

function Button(props) {
  return (
    <button onClick={props.onClick}>{props.name}</button>
  )
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedOuterComponent/>
  </Provider>,
  document.getElementById('root')
);


