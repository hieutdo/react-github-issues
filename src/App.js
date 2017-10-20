import './App.css';

import React, { Component } from 'react';

import ApiKeyInput from './components/ApiKeyInput';
import logo from './logo.svg';

class App extends Component {
  state = {
    apiKey: null,
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Github Issues</h1>
        </header>
        <div className="container">
          <ApiKeyInput />
        </div>
      </div>
    );
  }
}

export default App;
