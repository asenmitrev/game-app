import React, { Component } from 'react';
import EventLog from './EventLog';
import CardTemplate from './Card';
import './App.css';


const generatorTurn = function *(array) {
  if(array){
      for (var item of array) {
          yield item.turn();
        
      }

      yield "finish"
  }

}

class Card {
  family=[];
  hp=10;
  power = 5;
  position =0;
  initiative = 10;
  alive = true;
  team;

  constructor(cardArray,position,team){
    this.family = cardArray;
    this.position = position;
    this.team = team;
  }


  turn(){
    let enemyTeam;

    if(this.team === "human"){
      enemyTeam = "computer"
    }
    else
    {
      enemyTeam = "human";
    }

    let enemy = this.family.find((element) =>{
      return element.position == this.position && element.team == enemyTeam
    })

    if(enemy){
      this.attack(enemy);
    }
  }

  attack(enemy){
    enemy.hp -= this.power;
    enemy.deathCheck();
  }

  deathCheck(){
    if(this.hp <= 0){
      this.death();
    }
  }

  death(){
    this.family.splice(this.family.indexOf(this),1);
    this.alive = false;
  }
}



class App extends Component {
  cards = [];
  generator;
  constructor(){
    super()
    this.state = {
      cards:this.cards
    }
    this.generator = generatorTurn(this.cards);

    this.nextTurn = this.nextTurn.bind(this);
    this.cardSpawn = this.cardSpawn.bind(this);
    this.rerender = this.cardSpawn.bind(this);
    this.cardSpawn(1,"human")
    this.cardSpawn(1,"computer")
    this.cardSpawn(2,"human")
    this.cardSpawn(2,"computer")
    this.cardSpawn(3,"human")
    this.cardSpawn(3,"computer")
  }

  nextTurn(){
    if(this.generator.next().value == "finish"){
      this.generator = generatorTurn(this.cards)
    }
    this.rerender();
  }
  
  cardSpawn(position,team){
    this.cards.push(new Card(this.cards,position,team))
  }

  rerender(){
    this.setState(() =>{return {
      cards:this.cards
    }})
  }




  render() {
    const enemyCards = [1,2,3].map(card => (<CardTemplate key={card} className="col-xs-4" card={card}></CardTemplate>));

    const myCards = [1,2,3].map(card => (<CardTemplate key={card} className="col-xs-4" card={card}></CardTemplate>));

    const eventLog = ['Somebody hit somebody', 'You died'].map(log => (<EventLog key={log} log={log} />))
    return (
      <div className="app">
        <div className="row">
          <div className="col-xs-8">
            <div className="row between-xs middle-xs margin-bottom__medium"><h1>THE BATTLEFIELD</h1> <button className="fight-btn" onClick={this.nextTurn}>FIGHT</button></div>
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
