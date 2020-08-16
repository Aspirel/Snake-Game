import React, { Component } from 'react';
import Apples from './apples';
import Snake from './snake';


const randomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random()*(max-min+1)+min)/2)*2;
  let y = Math.floor((Math.random()*(max-min+1)+min)/2)*2;

  return [x, y];
}

 class App extends Component {

  state = {
    apples: randomCoordinates(),
    direction: 'RIGHT',
    speed: 200,
    snakeDots: [
      [0, 0],
      [2, 0]
    ]
  }

  activeComponent(){
    setInterval(this.movement, this.state.speed);
    document.onkeydown = this.onkeydown;
  }

  onkeydown = (e) => {
    e = e || window.event;

    switch (e.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        console.log('UP');
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        console.log('DOWN');
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        console.log('LEFT');
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        console.log('RIGHT');
        break;
    }
  }

  movement = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length -1];

    switch (this.state.direction) {
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    })
  }

  render(){
    return (
      <div className="gameArea">
        <Snake snakeBody={this.state.snakeDots}/>
        <Apples dot={this.state.apples}/>
      </div>
    );
  }
}

export default App;
