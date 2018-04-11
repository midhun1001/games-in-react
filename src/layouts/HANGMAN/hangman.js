import React, { Component } from 'react';
import { Row, Col, Input } from 'react-materialize';
import Winner from '../Winner/Winner';
import './hangman.scss';

let winnerRepeat = '';
const startSound = require('../../../public/sounds/start.mp3');
const failSound = require('../../../public/sounds/fail.mp3');
const successSound = require('../../../public/sounds/success.mp3');
const moveSound = require('../../../public/sounds/move.mp3');
const winnerSound = require('../../../public/sounds/winner.mp3');

class Hangman extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    let word = prevState.que.q;
    word = word.split('');
    const dashes = [];
    word.map(() => {
      dashes.push('__');
    });
    return {
      inputState: dashes
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      chance: 5,
      total: [],
      entered: '',
      error: '',
      inputState: '',
      win: false,
      fail: false,
      que: {
        q: 'ATACAMA',
        clue: 'Driest Place on Earth'
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
      clearInterval(winnerRepeat);
      window.location.reload();
    };
    this.showBody = () => {
      if (this.state.chance >= 0) {
        let chance = this.state.chance;
        document.getElementById(chance).style.display = 'block';
        chance -= 1;
        this.setState({ chance });
        this.callTone('failSound');
      }
    };
    this.input = (event) => {
      const target = event.target;
      if (target.value.trim() !== '') {
        const value = target.value.trim().toUpperCase();
        if (!this.state.total.includes(value)) {
          this.setState({ entered: value });
          const total = this.state.total;
          total.push(value);
          this.setState({ total, error: '' }, () => {
            this.solve();
          });
        } else {
          this.setState({ error: 'This alphabet is already entered' });
        }
      }
    };
    this.solve = () => {
      if (this.state.chance > 0) {
        if (this.state.que.q.includes(this.state.entered)) {
          const input = this.state.inputState;
          for (let i = 0; i < this.state.que.q.length; i += 1) {
            if (this.state.que.q[i] === this.state.entered) {
              input[i] = this.state.entered;
            }
          }
          this.setState({ inputState: input }, () => {
            this.checkResult();
          });
          this.callTone('successSound');
        } else {
          this.showBody();
        }
      } else {
        this.showBody();
        this.setState({ error: 'You hanged !!', fail: true });
        document.getElementsByTagName('input')[0].blur();
        return false;
      }
      return true;
    };
    this.checkResult = () => {
      if (this.state.inputState.join('') === this.state.que.q) {
        this.callTone('winnerSound');
        this.setState({ win: true });
        document.getElementsByTagName('input')[0].blur();
      }
    };
    this.reset = () => {
      this.setState({ entered: '' });
    };
  }
  componentDidMount() {
    this.callTone('startSound');
  }
  render() {
    return (
      <main className="hng">
        <Row>
          <Col s={12}>
            <Col s={3} />
            <Col s={6} className="hng__image">
              <svg height="300" width="100">
                <line className="line__1" x1="0" y1="0" x2="0" y2="300" fill="black" />
                <line className="line__1" x1="0" y1="0" x2="50" y2="0" />
                <line className="line__1" x1="50" y1="20" x2="50" y2="0" />
                <circle id="0" className="body" cx="50" cy="50" r="30" stroke="black" strokeWidth="1" fill="white" />
                <line id="1" className="line__1 body" x1="50" y1="200" x2="50" y2="80" />
                <line id="2" className="line__1 body" x1="50" y1="100" x2="100" y2="150" />
                <line id="3" className="line__1 body" x1="50" y1="100" x2="0" y2="150" />
                <line id="4" className="line__1 body" x1="50" y1="200" x2="350" y2="300" />
                <line id="5" className="line__1 body" x1="50" y1="200" x2="-350" y2="300" />
              </svg>
            </Col>
          </Col>
          <Col s={12} className="hng__que">
            <h5>Clue: {this.state.que.clue}</h5>
            <ul>
              {
                this.state.inputState && this.state.inputState.map((val, index) => (
                  <li data-index={index} key={index}>{val}</li>
                ))
              }
            </ul>
          </Col>
          <Col s={12} className="hng__user">
            <Col s={3} />
            <Col s={6}>
              <h5>Entered Alphabets</h5>
              <ul className="hng__user__entered">
                {
                  this.state.total.length === 0 &&
                  <li className="hng__user__entered__placeholder">Entered Alphabets</li>
                }
                {
                  this.state.total.map((val, index) => (
                    <li key={index}>{val}</li>
                  ))
                }
              </ul>
              <Col s={5} />
              <Input s={3} onKeyDown={() => this.reset()} autoComplete="off" value={this.state.entered} onChange={(e) => this.input(e)} label="Enter" />
              <Col s={12} className="hng__error">
                { this.state.error }
              </Col>
            </Col>
          </Col>
        </Row>
        {
          (this.state.win || this.state.fail) &&
          <Winner reset={this.resetGame} fail={this.state.fail} />
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

export default Hangman;
