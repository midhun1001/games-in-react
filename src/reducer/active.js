const board=(state={},action)=>{
  switch (action.type) {
    case "DICE_THROWN":
      var copy = Object.assign({}, state);
      var nextval = action.payload.nextVal;
      var currentval = action.payload.currentval;
      if(nextval <= 100) {
        copy.initial = nextval;
      }
      if(currentval < 100) {
        copy.singlethrow = action.payload.count;
      }
      return copy;
    case "SNAKE_EAT":
      var copy = Object.assign({}, state);
      copy.initial = action.payload.current;
      copy.snake = parseInt(copy.snake) + parseInt(action.payload.snake)
      copy.ladder = parseInt(copy.ladder) + parseInt(action.payload.ladder)
      return copy
      break;
    case "RESET_SINGLE":
      var copy = Object.assign({}, state);
      copy.initial = 1;
      copy.singlethrow = 0;
      return copy;
      break;
    case "SIX_SINGLE":
      var copy = Object.assign({}, state);
      copy.six = copy.six + 1;
      return copy;
      break;
    case "ADD_PLAYER":
      var copy = Object.assign({}, state);
      copy.player = action.payload
      return copy;
      break;
    default:
    return state;
  }
}

const multi=(state={}, action)=>{
  switch (action.type){
    case "MULTIPLAYER_NAMES":
    var copy = Object.assign({}, state);
    copy.player1.name = action.payload.player1;
    copy.player2.name = action.payload.player2;
    return copy;
    break;
    case "MULTI_THROW":
    var copy = Object.assign({}, state);
    var newturn = action.payload.turn;
    var dice = action.payload.dice;
    var six1 = copy.player1.six;
    var six2 = copy.player2.six;
    if((newturn==1)&&(dice == 6)) {
      six1 = six1 + 1;
    } else {
      six1 = 0;
    }
    if((newturn==2)&&(dice == 6)) {
      six2 = six2 + 1;
      console.log(six2);
    } else {
      six2 = 0;
    }
    if(((six1 > 0) && (six1<=3)) || (six2 > 0) && (six2<=3)) {
      if(newturn== 1){
        if(six1 == 3) {
          copy.turn = 2
          copy.player1.six = 0;
        } else {
          copy.player1.six = six1;
        }
        copy.player1.count = action.payload.count;
        copy.player1.position = action.payload.nextPos;

      } else if(newturn == 2) {
        if(six2 == 3) {
          copy.turn = 2
          copy.player2.six = 0;
        } else {
          copy.player2.six = six2;
        }
        copy.player2.count = action.payload.count;
        copy.player2.position = action.payload.nextPos;
      }
    } else {
        if(newturn== 1){
          copy.turn = 2
          copy.player1.count = action.payload.count;
          copy.player1.position = action.payload.nextPos;
          copy.player1.six1 = 0;
        } else if(newturn == 2) {
          copy.turn = 1
          copy.player2.count = action.payload.count;
          copy.player2.position = action.payload.nextPos;
          copy.player2.six2 = 0;
        }
    }
    return copy;
    break;
    case "RESET_MULTI":
    var copy = Object.assign({}, state);
    copy.turn= 1;
    copy.player1 = copy.resetMulti.player1;
    copy.player2 = copy.resetMulti.player2;
    return copy;
    case "SNAKE_LADDER":
    var copy = Object.assign({}, state);
    if(action.payload.turn == 1) {
      copy.player1.snake += action.payload.snake;
      copy.player1.ladder += action.payload.ladder;
    } else {
      copy.player2.snake += action.payload.snake;
      copy.player2.ladder += action.payload.ladder;
    }
    return copy;
    break;
    default:
    return state;
  }
}
const activeReducer = {board, multi}
export default activeReducer;
