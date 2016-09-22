import React, { Component } from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';
import actions from '../action/multi';
import Results from './winner';

var throwcount = 0;
class Multi extends Component {

  componentDidMount() {
    window.BoardTemplate()
  }
  snakeorladder(nextPos, turn) {
    var snake = 0;
    var ladder= 0;
    if(nextPos == 46) {
      snake +=1;
      nextPos = 34;
    }  else if(nextPos == 99) {
      snake +=1;
      nextPos = 74;
    }else if(nextPos == 61) {
      snake +=1;
      nextPos = 20;
    }else if(nextPos == 73) {
      snake +=1;
      nextPos = 3;
    }else if(nextPos == 86) {
      snake +=1;
      nextPos = 22;
    }else if(nextPos == 39) {
      ladder +=1;
      nextPos = 63;
    }else if(nextPos == 14) {
      ladder +=1;
      nextPos = 70;
    }else if(nextPos == 67) {
      ladder +=1;
      nextPos = 95;
    } else {
      nextPos = nextPos;
    }
    this.props.dispatch(actions.snakeladder(snake,ladder));
    return nextPos;
  }
  square() {
    var size = this.props.multi.size;
    var board = '';
    var id =101;
    for(var i=0;i<size;i++) {
      for(var j=0; j<size;j++) {
        id=id-1;
        board +="<div id='"+id+"' class='square'><div>"+id+"</div><label class='circle'></label><label class='circle2'></label></div>"
      }
    }
    board += "<div class='overlay'><div><img id='snake1' width='100' src='./images/snake1.png' /><img id='snake2' width='300' src='./images/snake2.png' /><img id='snake3' width='300' src='./images/snake3.png' /><img id='snake4' src='./images/snake4.png' /><img id='snake5' width='100' src='./images/snake5.png' /><img id='ladder1' width='150' src='./images/ladder1.png' /><img id='ladder2' width='150' src='./images/ladder1.png' /><img id='ladder3' width='150' src='./images/ladder1.png' /></div></div>";
    return {__html:board};
  }

  reset() {
    $("#board, .multi-box, #winner").hide()
    $("#enterplayer, #throw-dice").show();
    $("#player-1-dice, #player-2-dice").html("Dice Rolled: 0")
    this.props.dispatch(actions.reset());
  }

  throwDice() {
    var count = 0;
    var six = 0;
    var turn= this.props.multi.turn;
    var position1 = this.props.multi.player1.position;
    var position2 = this.props.multi.player2.position;
    var value = Math.floor(Math.random()*6 + 1);
    if(turn == 1) {
      $("#next-turn").find('span').html(this.props.multi.player2.name)
      var nextPos = parseInt(position1) + parseInt(value);
      $("#player-1-dice").html("Dice Rolled: "+value)
      count = parseInt(this.props.multi.player1.count) + 1;
      six = this.props.multi.player1.six;
      nextPos = this.snakeorladder(nextPos, turn)
      if(nextPos< 100){
        $('#board').find('.circle').fadeOut();
        $("#"+nextPos).find('.circle').fadeIn();
      } else if(nextPos == 100) {
        $("#throw-dice").hide();
        $("#winner").show()
        $("#winner").find('h3 span').html(this.props.multi.player1.name);
        $('#board').find('.circle').hide();
        $("#"+nextPos).find('.circle').show();
        turn = 1;
        nextPos=1;
      } else {
        nextPos = parseInt(position1);
      }
    } else {
      $("#next-turn").find('span').html(this.props.multi.player1.name)
      var nextPos = parseInt(position2) + parseInt(value);
      $("#player-2-dice").html("Dice Rolled: "+value);
      count = parseInt(this.props.multi.player1.count) + 1;
      six = this.props.multi.player2.six;
      if(value==6) {
        six = + 1;
      }
      nextPos = this.snakeorladder(nextPos, turn)
      if(nextPos < 100) {
        $('#board').find('.circle2').fadeOut();
        $("#"+nextPos).find('.circle2').fadeIn();
      } else if(nextPos == 100) {
        $("#throw-dice").hide();
        $('#board').find('.circle2').hide();
        $("#winner").show()
        $("#winner").find('h3 span').html(this.props.multi.player2.name)
        $("#"+nextPos).find('.circle2').show();
        turn = 1;
        nextPos=1;
      } else {
        nextPos = parseInt(position2)
      }
    }
      this.props.dispatch(actions.throwDice(turn, count, nextPos, value ))
  }

  submitName(){
    var player1 = this.refs.player1.value;
    var player2 = this.refs.player2.value;
    if((player1=='') || (player2 == '')){
      $(".warning").show();
    } else {
      this.props.dispatch(actions.multiplayer(player1, player2));
      $("#board").show();
      $("#enterplayer").hide();
      $(".multi-box").show();
      $("#next-turn").find('span').html(player1)
      $('.square').find('label').hide();
      $("#1").find('.circle, .circle2').show();
    }

  }
  render(){
    // const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    return (
      <div className="container-fluid">
        <Draggable zIndex={100} >
          <div id="winner" className="box">
          <h3>Winner: <span></span></h3>
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
        </Draggable>
        <div className='col-md-12'>
        <div id='enterplayer' className='col-md-2 '>
          <div className="form-group">
            <label>Player 1:</label>
            <input ref="player1" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label>Player 2:</label>
            <input ref="player2" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <button className='btn btn-primary' onClick={()=>this.submitName()}>Start Game</button>
          </div>
          <p className="warning">Enter Names</p>
        </div>
        <div className='col-md-2 multi-box'>
          <div id='next-turn' className='col-md-12'>
            <h3>Next Turn: <span></span></h3>
          </div>
          <div id="player1_Div" className="col-md-12 well">
            <p>{this.props.multi.player1.name}</p>
            <p>Number of throws: {this.props.multi.player1.count}</p>
            <p id="player-1-dice">Dice Rolled: 0</p>
            <p>Player: Black</p>
          </div>
          <div id="player2_Div" className="col-md-12 well">
            <p>{this.props.multi.player2.name}</p>
            <p>Number of throws: {this.props.multi.player2.count}</p>
            <p id="player-2-dice">Dice Rolled: 0</p>
            <p>Player: Blue</p>
          </div>
          <div className="col-md-12">
            <button id="throw-dice" className='btn btn-primary' onClick={()=>this.throwDice()}>Throw Dice</button>
          </div>
          <div className="col-md-12">
            <button id="reset-board" className='btn btn-primary' onClick={()=>this.reset()}>Reset Game</button>
          </div>
        </div>

          <div className='col-md-8'>
            <div id="board" className="board col-md-offset-3" dangerouslySetInnerHTML={this.square()}>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Multi;
