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


function getRandomArrayElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

const types = ['grass', 'dark', 'fire', 'water', 'psychic', 'electric'];
const names = ["ninja", "chair", "pancake", "statue", "unicorn", "rainbows", "laser", "senor", "bunny", "captain", "nibblets", "cupcake", "carrot", "gnomes", "glitter", "potato", "salad", "toejam", "curtains", "beets", "toilet", "exorcism", "stick figures", "mermaid eggs", "sea barnacles", "dragons", "jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "ice cream", "ukulele", "kazoo", "banjo", "opera singer", "circus", "trampoline", "carousel", "carnival", "locomotive", "hot air balloon", "praying mantis", "animator", "artisan", "artist", "colorist", "inker", "coppersmith", "director", "designer", "flatter", "stylist", "leadman", "limner", "make-up artist", "model", "musician", "penciller", "producer", "scenographer", "set decorator", "silversmith", "teacher", "auto mechanic", "beader", "bobbin boy", "clerk of the chapel", "filling station attendant", "foreman", "maintenance engineering", "mechanic", "miller", "moldmaker", "panel beater", "patternmaker", "plant operator", "plumber", "sawfiler", "shop foreman", "soaper", "stationary engineer", "wheelwright", "woodworkers"];
class Card {
  family=[];
  hp=10;
  power = 5;
  position =0;
  initiative = 10;
  alive = true;
  team;
  id;
  constructor(cardArray,position,team){
    this.family = cardArray;
    this.position = position;
    this.team = team;
    this.id ='id' + Math.random();
    
    this.type = getRandomArrayElement(types);
    this.imageNr = getRandomArrayElement([1,2,3,4]);
    this.name = getRandomArrayElement(names);
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
    // this.family.splice(this.family.indexOf(this),1);
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
    this.rerender = this.rerender.bind(this);
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
    console.log(this.cards)
    this.rerender();
  }
  
  cardSpawn(position,team){
    this.cards.push(new Card(this.cards,position,team))
  }

  rerender(){
    this.setState({cards:this.cards})
  }




  render() {
    console.log(this.state.cards)
    const enemyCards = this.state.cards.filter(c => c.team === 'computer').map(card => (<CardTemplate key={card.id} className="col-xs-4" card={card}></CardTemplate>));

    const myCards = this.state.cards.filter(c => c.team === 'human').map(card => (<CardTemplate key={card.id} className="col-xs-4" card={card}></CardTemplate>));

    const eventLog = ['Somebody hit somebody', 'You died'].map(log => (<EventLog key={log} log={log} />))
    return (
      <div className="app">
        <div className="row">
          <div className="col-xs-8">
            {/* <div className="row between-xs middle-xs margin-bottom__medium"><h1>THE BATTLEFIELD</h1> </div> */}
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
          <button className="fight-btn" onClick={this.nextTurn.bind(this)}>FIGHT</button>
            <h1>Event Log:</h1>
            {eventLog}

          </div>
        </div>
      </div>
    );
  }
}

export default App;
