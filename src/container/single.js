import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../action/single';

var throwcount = 0;
class Multi extends Component {
  componentDidMount() {
    window.BoardTemplate()
  }
  reset(){
    $("#board").find('p').fadeOut();
    $("#1").find('p').fadeIn();
    $("#throw-single").fadeIn();
    throwcount=0;
    this.props.dispatch(actions.resetSingle());
  }
  throwCout(){
    return (
      <span>Number of throws: {this.props.board.singlethrow}</span>
    )
  }
  move(next, current) {
    $('.board').find('p').fadeOut();
    $("#"+next).find('p').fadeIn();
    var snake =0;
    var ladder=0;
    if(next == 46) {
      snake = 1;
      current = 34;
      $("#"+next).find('p').fadeOut();
      $("#"+current).find('p').fadeIn();
      this.props.dispatch(actions.snakeladder(current, snake, ladder));
    } else if(next == 99) {
      snake = 1;
      current = 74;
      $("#"+next).find('p').fadeOut();
      $("#"+current).find('p').fadeIn();
      this.props.dispatch(actions.snakeladder(current, snake, ladder));
    }else if(next == 73) {
      snake = 1;
      current = 3;
      $("#"+next).find('p').fadeOut();
      $("#"+current).find('p').fadeIn();
      this.props.dispatch(actions.snakeladder(current, snake, ladder));
    }else if(next == 86) {
      snake = 1;
      current = 22;
      $("#"+next).find('p').fadeOut();
      $("#"+current).find('p').fadeIn();
      this.props.dispatch(actions.snakeladder(current, snake, ladder));
    } else if(next== 67) {
      ladder = 1;
      current = 95;
      $("#"+next).find('p').fadeOut();
      $("#"+current).find('p').fadeIn();
      this.props.dispatch(actions.snakeladder(current, snake, ladder));
    } else if(next== 14) {
      ladder = 1;
      current = 70;
      $("#"+next).find('p').fadeOut();
      $("#"+current).find('p').fadeIn();
      this.props.dispatch(actions.snakeladder(current, snake, ladder));
    } else if(next== 39) {
      ladder = 1;
      current = 63;
      $("#"+next).find('p').fadeOut();
      $("#"+current).find('p').fadeIn();
      this.props.dispatch(actions.snakeladder(current, snake, ladder));
    }else if(next == 61) {
      snake = 1;
      current = 20;
      $("#"+next).find('p').fadeOut();
      $("#"+current).find('p').fadeIn();
      this.props.dispatch(actions.snakeladder(current, snake, ladder));
    }
  }
  startGame() {
    var player = this.refs.player.value;
    if(player == '') {
      $(".warning").show();
    } else {
      $(".warning").hide();
      this.props.dispatch(actions.player(player))
      $("#board").show();
      $("#start-single").hide();
      $("#throw-single, #reset-single").show();
      var initial = this.props.board.initial;
      $("#"+initial).find('p').fadeIn();
      $("#enterplayer").fadeOut();
      $("#throwcountSingle, #playername").fadeIn();
    }
  }
  throwDice() {
    throwcount += 1;
    var value = Math.floor(Math.random()*6 + 1);
    var currentval = this.props.board.initial;
    var nextVal = parseInt(currentval) + parseInt(value);
    $("#diceVal").html("Dice rolled: "+value);
    if(nextVal == 100){
      $("#throw-single").fadeOut();
    }
    this.props.dispatch(actions.throwDice(nextVal,currentval, throwcount));
      if(nextVal <= 100) {
        this.move(nextVal, currentval);
    }
    if(value == 6) {
      this.props.dispatch(actions.sixSingle());
    }
  }
  square() {
    var size = this.props.board.size;
    var board = '';
    var id =101;
    for(var i=0;i<size;i++) {
      for(var j=0; j<size;j++) {
        id=id-1;
        board +="<div id='"+id+"' class='square'><div>"+id+"</div><p class='circle'></p></div>"
      }
    }
    board += "<div class='overlay'><div><img id='snake1' width='100' src='./images/snake1.png' /><img id='snake2' width='300' src='./images/snake2.png' /><img id='snake3' width='300' src='./images/snake3.png' /><img id='snake4' src='./images/snake4.png' /><img id='snake5' width='100' src='./images/snake5.png' /><img id='ladder1' width='150' src='./images/ladder1.png' /><img id='ladder2' width='150' src='./images/ladder1.png' /><img id='ladder3' width='150' src='./images/ladder1.png' /></div></div>";
    return {__html:board};
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="col-sm-2">
          <div id='enterplayer' className="form-group">
            <label>Player Name:</label>
            <input ref="player" type="text" className="form-control" id="player" />
            <p className="warning">Enter Name</p>
          </div>
          <div id='playername' className="form-group">
            <label>{this.props.board.player}</label>
          </div>
          <button id="throw-single" className="btn btn-primary btn-sm" onClick={()=>this.throwDice()}>
            Throw dice
          </button>
          <buttons id='start-single' className="btn btn-primary btn-sm" onClick={()=>this.startGame()}>
            Start Game
          </buttons>
          <buttons id='reset-single' className="btn btn-primary btn-sm" onClick={()=>this.reset()}>
            Reset Game
          </buttons>
          <div id="throwcountSingle" className="well well-sm">
            <p>{this.throwCout()}</p>
            <p id="diceVal"></p>
            <p>6 Rolled: {this.props.board.six}</p>
            <p>Snake Attacked: {this.props.board.snake}</p>
            <p>Ladder Climbed: {this.props.board.ladder}</p>
          </div>
        </div>
        <div id="board" className="board col-md-offset-3" dangerouslySetInnerHTML={this.square()}>
        </div>
      </div>
    )
  }
}
export default Multi;
