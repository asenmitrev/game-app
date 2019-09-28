import React, { Component } from 'react';
import EventLog from './EventLog';
import Card from './Card';
import './App.css';

class App extends Component {
  render() {
    const enemyCards = [1,2,3].map(card => (<Card key={card} className="col-xs-4" card={card}></Card>));

    const myCards = [1,2,3].map(card => (<Card key={card} className="col-xs-4" card={card}></Card>));

    const eventLog = ['Somebody hit somebody', 'You died'].map(log => (<EventLog key={log} log={log} />))

    return (
      <div className="app">

        <div className="row">
          <div className="col-xs-8">
            <div className="row between-xs middle-xs margin-bottom__medium"><h1>THE BATTLEFIELD</h1> <button className="fight-btn">FIGHT</button></div>
            <div className="row margin-bottom__default"><h2>The Enemy's cards</h2></div>
            <div className="row margin-bottom__medium">
              {enemyCards}
            </div>
            <div className="row margin-bottom__default"><h2>Your Cards</h2></div>
            <div className="row margin-bottom__medium">
              {myCards}
            </div>
          </div>
          <div className="col-xs-4">
            <h1>Event Log:</h1>
            {eventLog}

          </div>
        </div>
      </div>
    );
  }
}

export default App;
