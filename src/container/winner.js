import React, { Component } from 'react';


class Results extends Component {
  render() {
    return (
      <div id="winner" className="box">
        <div className='result'><label>Player1: </label> {this.props.multi.player1.name}</div>
        <div className='result'><label>Total No. Throws: </label> {this.props.multi.player1.count}</div>
        <div className='result'><label>Snake Attacked: </label> {this.props.multi.player1.snake}</div>
        <div className='result'><label>Ladder Climbed: </label> {this.props.multi.player1.ladder}</div>
        <div className='result'><label>6 Rolled: </label> {this.props.multi.player1.six}</div>
        <hr />
        <div className='result'><label>Player2: </label> {this.props.multi.player2.name}</div>
        <div className='result'><label>Total No. Throws: </label> {this.props.multi.player2.count}</div>
        <div className='result'><label>Snake Attacked: </label> {this.props.multi.player2.snake}</div>
        <div className='result'><label>Ladder Climbed: </label> {this.props.multi.player2.ladder}</div>
        <div className='result'><label>6 Rolled: </label> {this.props.multi.player2.six}</div>
      </div>
    )
  }
}

export default Results;
