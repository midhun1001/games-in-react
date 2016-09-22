const multiplayer=(player1, player2)=>{
  return {
    type:"MULTIPLAYER_NAMES",
    payload:{
      player1:player1,
      player2:player2
    }
  }
}

const throwDice=(turn, count, nextPos, value)=>{
  return {
    type:"MULTI_THROW",
    payload:{
      turn:turn,
      count:count,
      nextPos:nextPos,
      dice:value
    }
  }
}

const snakeladder=(snake, ladder)=>{
  return{
    type:"SNAKE_LADDER",
    payload:{
      snake:snake,
      ladder:ladder
    }
  }
}

const reset=()=> {
  return {
    type:"RESET_MULTI"
  }
}

const actions = {multiplayer, throwDice, reset, snakeladder}
export default actions
