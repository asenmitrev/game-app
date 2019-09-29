import React, { Component } from 'react';
import EventLog from './EventLog';
import CardTemplate from './Card';
import { flyToPos} from './animation';
import './App.css';


const generatorTurn = function *(array) {
  if(array){
      for (var item of array) {
          if(item.alive){
            yield item.turn();
          }
          else{

          }
      }

      yield "finish"
  }
}

const explainAttacks = function(attack){
  switch(attack){
    case 'normal':
      return 'Normal'
      break;
    case 'pierceArmor':
      return "Ignores Armor"
    break;
    case 'massDamage':
      return "Damages All Enemies"
      break;
    case 'lightAttack':
      return "Twice as weak against armor"
      break;
  }

  return ''
}

const giveSpecial = function(card,points){
  if(card.attackSpecial != 'normal'){
    return points
  }
  let whileCheck = true;
  while(whileCheck){
    switch(Math.floor(Math.random() * 3)) {
      case 0:
          if(points>=100){
            card.attackSpecial = 'pierceArmor'
            whileCheck = false;
            return points-100;
          }
        break;
      case 1:
          if(points>=150){
            card.attackSpecial = 'massDamage'
            whileCheck = false;
            return points-150;
          }
          break;

      case 2:
            card.attackSpecial = 'lightAttack'
            whileCheck = false;
            return points+80;
          break;
    }
  }

}

const distributePoints = function(card){
  let points = 300
  if(card.type == 'water'){
    while(points > 0){
      switch(Math.floor(Math.random() * 4)) {
        case 0:
              if(points-1>=0){
                card.hp+=1;
                points-=1;
              }
            break;
  
        case 1:
              if(points-1>=0){
                card.initiative+=2;
                points-=1;
              }
            break;
  
        case 2:
              if(points-5>=0){
                card.power+=1;
                points-=5;
              }
            break;
  
        case 3:
            if(points-20>=0){
              card.armor+=1;
              points-=20;
            }
          break;
      }
    }
  }

  else if(card.type == 'dark'){
    while(points > 0){
      switch(Math.floor(Math.random() * 4)) {
        case 0:
              if(points-5>=0){
                card.power+=1;
                points-=5;
              }
            break;
        case 1:
            if(points-20>=0){
              card.armor+=1;
              points-=20;
            }
            break;
        case 2:
            if(points-1>=0){
              card.hp+=1;
              points-=1;
            }
            break;
        case 3:
          points = giveSpecial(card,points)
          break
      }
    }
  }

  else if(card.type == 'fire'){
    while(points > 0){
      switch(Math.floor(Math.random() * 6)) {
        case 0:
        case 1:
              if(points-5>=0){
                card.power+=1;
                points-=5;
              }
            break;
        case 2:
        case 3:
            if(points-1>=0){
              card.hp+=1;
              points-=1;
            }
            break;

        case 4:
            if(points-1>=0){
              card.initiative+=2;
              points-=1;
            }
          break;
        case 5:
          points = giveSpecial(card,points);
          break;

      }
    }
  }

  else if(card.type == 'electric'){
    while(points > 0){
      switch(Math.floor(Math.random() * 7)) {
        case 6:
            points = giveSpecial(card,points);
            break;
        case 0:
              if(points-1>=0){
                card.hp+=1;
                points-=1;
              }
            break;
  
        case 1:
              if(points-1>=0){
                card.initiative+=2;
                points-=1;
              }
            break;
  
        
        case 4:
        case 5:
              if(points-5>=0){
                card.power+=1;
                points-=5;
              }
            break;
              
        case 2:
        case 3:
            if(points-20>=0){
              card.armor+=1;
              points-=20;
            }
            break;
      }
    }
  }

  else if(card.type == 'grass'){
    while(points > 0){
      switch(Math.floor(Math.random() * 7)) {
        case 4:
        case 5:
        case 0:
              if(points-1>=0){
                card.hp+=1;
                points-=1;
              }
            break;
        case 1:
              if(points-1>=0){
                card.initiative+=2;
                points-=1;
              }
            break;
        case 2:
              if(points-5>=0){
                card.power+=1;
                points-=5;
              }
            break;
        case 3:
            if(points-20>=0){
              card.armor+=1;
              points-=20;
            }
            break;
        case 6:
          points = giveSpecial(card,points);
          break;
      }
    }
  }
  else if(card.type == 'psychic'){
    while(points > 0){
      switch(Math.floor(Math.random() * 8)) {
        case 7:
        case 6:
          points =giveSpecial(card,points);
          break;
        case 0:
        case 1:
              if(points-1>=0){
                card.hp+=1;
                points-=1;
              }
            break;
        
        case 2:
              if(points-1>=0){
                card.initiative+=2;
                points-=1;
              }
            break;
        case 3:
        case 4:

            if(points-20>=0){
              card.armor+=1;
              points-=20;
            }
            break;
  
        case 5:
            if(points-5>=0){
              card.power+=1;
              points-=5;
            }
          break;
      }
    }
 
  }
  return card
}

function getCardCoords(element) {

  let centerX = element.offsetLeft + element.offsetWidth / 2;
      let centerY = element.offsetTop + element.offsetHeight / 2;
      return {x: centerX, y: centerY};
}

function getRandomArrayElement(arr) {
    return arr[Math.floor(Math.random()*arr.length)]
}

const types = ['grass', 'dark', 'fire', 'water', 'psychic', 'electric'];
const names = ["ninja", "chair", "pancake", "statue", "unicorn", "rainbows", "laser", "senor", "bunny", "captain", "nibblets", "cupcake", "carrot", "gnomes", "glitter", "potato", "salad", "toejam", "curtains", "beets", "toilet", "exorcism", "stick figures", "mermaid eggs", "sea barnacles", "dragons", "jellybeans", "snakes", "dolls", "bushes", "cookies", "apples", "ice cream", "ukulele", "kazoo", "banjo", "opera singer", "circus", "trampoline", "carousel", "carnival", "locomotive", "hot air balloon", "praying mantis", "animator", "artisan", "artist", "colorist", "inker", "coppersmith", "director", "designer", "flatter", "stylist", "leadman", "limner", "make-up artist", "model", "musician", "penciller", "producer", "scenographer", "set decorator", "silversmith", "teacher", "auto mechanic", "beader", "bobbin boy", "clerk of the chapel", "filling station attendant", "foreman", "maintenance engineering", "mechanic", "miller", "moldmaker", "panel beater", "patternmaker", "plant operator", "plumber", "sawfiler", "shop foreman", "soaper", "stationary engineer", "wheelwright", "woodworkers"];
class Card {
  family=[];
  hp=1;
  power =0; 
  position =0;
  initiative = 0 ;
  alive = true;
  team;
  id;
  logger;
  armor = 0; 
  attackSpecial = 'normal'
  attackText = '';
  modifier = 0;
  constructor(cardArray,position,team,logger){

    this.family = cardArray;
    this.position = position;
    this.team = team;
    this.logger = logger;
    this.id ='id' + Math.random();
    
    this.type = getRandomArrayElement(types);
    this.imageNr = getRandomArrayElement([1,2,3,4]);
    this.name = getRandomArrayElement(names);
    distributePoints(this);

    this.attackText = explainAttacks(this.attackSpecial);


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

    if(this.alive){
      if(this.attackSpecial == "massDamage"){
        this.family.forEach((element) => {
          if(element.team === enemyTeam){
            this.attack(element)
          }
        })
      }
      else{
        let enemy = this.family.find((element) =>{
          return  element.team === enemyTeam && element.alive
        })
    
        if(enemy){
          this.attack(enemy)
        }
      }
    }



  }

  attack(enemy){
    let power;

    if(this.attackSpecial != 'pierceArmor' && this.attackSpecial != 'lightAttack'){
      if((this.power - enemy.armor) > 0){
        power = this.power - enemy.armor
      }
      else{
        power = 0;
      }
    }
    else if(this.attackSpecial =='lightAttack'){
      if((this.power - enemy.armor*2) > 0){
        power = this.power - enemy.armor*2
      }
      else{
        power = 0;
      }    
    }
    else if(this.attackSpecial =='pierceArmor'){
      power = this.power;
    }

    this.logger.push({ id: Math.random(), text: `${this.name} attacked ${enemy.name} for ${power} damage`, attacker: this, defender: enemy})

    enemy.hp -= power;
    enemy.deathCheck();

  }

  deathCheck(){
    if(this.hp <= 0){
      this.logger.push(`${this.name} died`)
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
  logger = [];
  constructor(){
    super()
    this.state = {
      cards:this.cards,
      logger:this.logger
    }
    this.generator = generatorTurn(this.cards);

    this.nextTurn = this.nextTurn.bind(this);
    this.cardSpawnRandom = this.cardSpawnRandom.bind(this);
    this.rerender = this.rerender.bind(this);
    this.cardSpawnRandom(1,"human")
    this.cardSpawnRandom(1,"computer")
    this.cardSpawnRandom(2,"human")
    this.cardSpawnRandom(2,"computer")
    this.cardSpawnRandom(3,"human")
    this.cardSpawnRandom(3,"computer")
    this.rerender();

    this.attack = React.createRef();

    this.cards.sort((a, b) => {
      return b.initiative-a.initiative;
    })
  }

  nextTurn(){

    
    if(this.generator.next().value === "finish"){
      this.generator = generatorTurn(this.cards)
    }
    this.rerender();
  }
  
  cardSpawnRandom(position,team){

    this.cards.push(new Card(this.cards,position,team,this.logger))
  }

  rerender(){
    this.setState({cards:this.cards,logger:this.logger})
  }




  render() {
    const enemyCards = this.state.cards.filter(c => c.team === 'computer').map(card => (<CardTemplate key={card.id} className="col-xs-4" card={card}></CardTemplate>));

    const myCards = this.state.cards.filter(c => c.team === 'human').map(card => (<CardTemplate key={card.id} className="col-xs-4" card={card}></CardTemplate>));

    const eventLog = this.state.logger.map(log => (<EventLog key={log.id} log={log.text} />));

    setTimeout(() => {
      if(this.state.logger.length === 0) return;
      const {attacker, defender } = this.state.logger[this.state.logger.length - 1];
      if(!attacker || !defender) return;
      // console.log(this.attack.current, attacker)
      console.log(getCardCoords(attacker.ref.current), getCardCoords(defender.ref.current))
      flyToPos(this.attack.current, getCardCoords(attacker.ref.current), getCardCoords(defender.ref.current), 1000);
    });

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
            <div id="attack" className="attack" style={{display: 'none'}} ref={this.attack}> <img src={`${process.env.PUBLIC_URL}/img/attack.png`} alt="FIRE"/></div>
          </div>
          <div className="col-xs-4">
          <button className="fight-btn" onClick={this.nextTurn.bind(this)}>FIGHT</button>
            <h1 className="margin-bottom__medium">Event Log:</h1>
            {eventLog}

          </div>
        </div>
      </div>
    );
  }
}

export default App;
