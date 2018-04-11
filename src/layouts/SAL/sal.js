import React, { Component } from 'react';
import { Row, Col, Input, Button, Icon } from 'react-materialize';
import Winner from '../Winner/Winner';
import './sal.scss';

let winnerRepeat = '';
const snake1 = require('../../../public/snake1.png');
const snake2 = require('../../../public/snake2.png');
const snake3 = require('../../../public/snake3.png');
const snake4 = require('../../../public/snake4.png');
const ladder1 = require('../../../public/ladder1.png');
const ladder2 = require('../../../public/ladder2.png');
const ladder3 = require('../../../public/ladder3.png');
const startSound = require('../../../public/sounds/start.mp3');
const failSound = require('../../../public/sounds/fail.mp3');
const successSound = require('../../../public/sounds/success.mp3');
const moveSound = require('../../../public/sounds/move.mp3');
const winnerSound = require('../../../public/sounds/winner.mp3');

class SAL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start: false,
      playerNum: 1,
      player1: '',
      player2: '',
      turn: 1,
      dice: 'Dice value',
      player1Pos: 99,
      player2Pos: 99,
      endGame: false,
      winner: 'Midhun Murali',
      snake: {
        37: 66,
        12: 49,
        56: 99,
        45: 94
      },
      ladder: {
        98: 61,
        75: 6,
        68: 33
      }
    };
    this.callTone = (id) => {
      const audio = document.getElementById(id);
      audio.play();
      if (id === 'winnerSound') {
        winnerRepeat = setInterval(() => {
          audio.play();
        }, 1000);
      }
    };
    this.resetGame = () => {
      this.setState({ start: false, endGame: false, player1Pos: 99, player2Pos: 99 });
      clearInterval(winnerRepeat);
    };
    this.randomColors = () => {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i += 1) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    };
    this.playerNum = (e, count) => {
      this.setState({ playerNum: count });
    };
    this.setPlayer = (e, pos) => {
      if (pos === 0) {
        this.setState({ player1: e.target.value });
      } else {
        this.setState({ player2: e.target.value });
      }
    };
    this.renderBoard = () => {
      const html = [];
      for (let j = 0; j < 10; j += 1) {
        for (let i = 0; i < 10; i += 1) {
          if (j % 2 === 0) {
            html.push(<div key={(10 * j) + i} id={(10 * j) + i} className="sal__boardCol" style={{ backgroundColor: this.randomColors(), float: 'left' }}>{100 - ((10 * j) + i)}</div>);
          } else {
            html.push(<div key={(10 * j) + i} id={(10 * j) + i} className="sal__boardCol" style={{ backgroundColor: this.randomColors(), float: 'right' }}>{100 - ((10 * j) + i)}</div>);
          }
        }
      }
      return html;
    };
    this.initialRender = () => {
      if (this.state.player2) {
        document.getElementById(this.state.player1Pos).innerHTML = '<div class="sal__ball multi1">1</div><div class="sal__ball multi2">2</div>';
      } else {
        document.getElementById(this.state.player1Pos).innerHTML = '<div class="sal__ball single">1</div>';
      }
      this.callTone('startSound');
    };
    this.startGame = (e) => {
      if (!e || (e && e.which === 13)) {
        if (this.state.player1.trim() === '') {
          this.setState({ errorMsg: 'Enter Player one' });
          return false;
        }
        if ((this.state.playerNum === 2) && this.state.player2.trim() === '') {
          this.setState({ errorMsg: 'Enter Player two' });
          return false;
        }
        this.setState({ start: true }, () => this.initialRender());
        return true;
      }
      return null;
    };
    this.moveBall = () => {
      if (this.state.player2) {
        if (this.state.turn === 1) {
          let newPos = this.state.player1Pos - this.state.dice;
          if (newPos >= 0) {
            if (this.state.snake[newPos]) {
              newPos = this.state.snake[newPos];
              this.callTone('failSound');
            } else if (this.state.ladder[newPos]) {
              newPos = this.state.ladder[newPos];
              this.callTone('successSound');
            } else {
              this.callTone('moveSound');
            }
            const present = document.getElementById(newPos);
            const newchild = document.getElementsByClassName('multi1')[0];
            const newchildcln = newchild.cloneNode(true);
            present.appendChild(newchildcln);
            const curnt = document.getElementById(this.state.player1Pos);
            const oldchild = curnt.querySelector('.multi1');
            curnt.removeChild(oldchild);
            this.setState({ player1Pos: newPos, turn: 2 });
            if (newPos === 0) {
              this.setState({ endGame: true, winner: this.state.player1 });
              this.callTone('winnerSound');
            }
          }
        } else if (this.state.turn === 2) {
          let newPos = this.state.player2Pos - this.state.dice;
          if (newPos >= 0) {
            if (this.state.snake[newPos]) {
              newPos = this.state.snake[newPos];
              this.callTone('failSound');
            } else if (this.state.ladder[newPos]) {
              newPos = this.state.ladder[newPos];
              this.callTone('successSound');
            } else {
              this.callTone('moveSound');
            }
            const present = document.getElementById(newPos);
            const newchild = document.getElementsByClassName('multi2')[0];
            const newchildcln = newchild.cloneNode(true);
            present.appendChild(newchildcln);
            const curnt = document.getElementById(this.state.player2Pos);
            const oldchild = curnt.querySelector('.multi2');
            curnt.removeChild(oldchild);
            this.setState({ player2Pos: newPos, turn: 1 });
            if (newPos === 0) {
              this.setState({ endGame: true, winner: this.state.player2 });
              this.callTone('winnerSound');
            }
          }
        }
      } else {
        let newPos = this.state.player1Pos - this.state.dice;
        if (newPos >= 0) {
          const child = document.getElementsByClassName('single')[0];
          const parent = document.getElementById(this.state.player1Pos);
          parent.removeChild(child);
          if (this.state.snake[newPos]) {
            newPos = this.state.snake[newPos];
            this.callTone('failSound');
          } else if (this.state.ladder[newPos]) {
            newPos = this.state.ladder[newPos];
            this.callTone('successSound');
          } else {
            this.callTone('moveSound');
          }
          this.setState({ player1Pos: newPos, turn: 1 });
          document.getElementById(newPos).innerHTML = '<div class="sal__ball single">1</div>';
          if (newPos === 0) {
            this.setState({ endGame: true, winner: this.state.player1 });
            this.callTone('winnerSound');
          }
        }
      }
    };
    this.rollDice = () => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      this.setState({ dice: randomNumber }, () => this.moveBall());
    };
  }
  render() {
    return (
      <main className="sal">
        {
          !this.state.start &&
          <Row className="sal__settings">
            <h3 className="sal__settings__heading">Game Settings</h3>
            <Col s={12} className="sal__settings__col">
              <Col s={4} />
              <Col s={3}>
                <button
                  className={`${this.state.playerNum === 1 ? 'active__plyr' : ''} sal__settings__plyr1`}
                  onClick={(e) => this.playerNum(e, 1)}
                >
                  <Icon>check_circle</Icon>
                  <span>Single Player</span>
                </button>
              </Col>
              <Col s={3}>
                <button
                  className={`${this.state.playerNum === 2 ? 'active__plyr' : ''} sal__settings__plyr1`}
                  onClick={(e) => this.playerNum(e, 2)}
                >
                  <Icon>check_circle</Icon>
                  <span>Two Player</span>
                </button>
              </Col>
            </Col>
            <Col s={12} className="sal__settings__col">
              <Col s={4} />
              <Input s={4} label="Player 1" onChange={(e) => this.setPlayer(e, 0)} onKeyPress={(e) => this.startGame(e)} />
            </Col>
            {
              this.state.playerNum === 2 &&
              <Col s={12} className="sal__settings__col">
                <Col s={4} />
                <Input s={4} label="Player 2" onChange={(e) => this.setPlayer(e, 1)} onKeyPress={(e) => this.startGame(e)} />
              </Col>
            }
            <Col s={12} className="sal__settings__start">
              <Button waves="light" onClick={() => this.startGame()}>Start</Button>
            </Col>
            <Col s={12} className="sal__error">
              {this.state.errorMsg}
            </Col>
          </Row>
        }
        {
          this.state.start &&
          <Row className="sal__board">
            <Col s={12} className="sal__board__dice">
              <Col s={4} />
              <Col s={4}>
                <h5>Play Dice</h5>
                <span className="sal__board__dice__val">{this.state.dice}</span>
                <Button waves="green" onClick={() => this.rollDice()}>
                  {`${this.state.turn === 1 ? this.state.player1 : this.state.player2}`}
                  &nbsp;Roll Dice
                </Button>
              </Col>
            </Col>
            <Col s={12} className="sal__board__area">
              { this.renderBoard() }
              <img className="snake1" src={snake1} alt="Snake 1" />
              <img className="snake2" src={snake2} alt="Snake 1" />
              <img className="snake3" src={snake3} alt="Snake 1" />
              <img className="snake4" src={snake4} alt="Snake 1" />
              <img className="ladder1" src={ladder1} alt="Ladder 1" />
              <img className="ladder2" src={ladder2} alt="Ladder 2" />
              <img className="ladder3" src={ladder3} alt="Ladder 3" />
            </Col>
          </Row>
        }
        {
          this.state.endGame &&
          <Winner winner={this.state.winner} reset={this.resetGame} />
        }
        <audio id="startSound" src={startSound} />
        <audio id="failSound" src={failSound} />
        <audio id="successSound" src={successSound} />
        <audio id="moveSound" src={moveSound} />
        <audio id="winnerSound" src={winnerSound} />
      </main>
    );
  }
}

export default SAL;
