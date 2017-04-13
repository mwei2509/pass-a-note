import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Notepad from './components/notepad'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Notepad store={this.props.store} />
      </div>
    );
  }
}

export default App;
