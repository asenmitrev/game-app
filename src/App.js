import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
      const enemyCards = [];

      const myCards = [];

      return (
        <div className="row">
          <div className="col-xs-8">
            <div className="row"><h1>THE BATTLEFIELD</h1></div>
            <div className="row"><h2>The Enemy's cards</h2></div>
          </div>
          <div className="col-xs-4"></div>
        </div>
      );
  }
}

export default App;
