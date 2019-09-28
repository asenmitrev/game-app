import React, { Component } from 'react';
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
  }
  
  cardSpawn(position,team){
    this.cards.push(new Card(this.cards,position,team))
  }






  render() {
      const enemyCards = [];

      const myCards = [];

      return (

        <div className="row">
          <button onClick={this.nextTurn}>Next TUrn</button>

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
