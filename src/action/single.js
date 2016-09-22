const throwDice=(nextVal,currentval, count)=>{
  return {
    type:"DICE_THROWN",
    payload:{
      nextVal:nextVal,
      currentval:currentval,
      count:count
    }
  }
}
const snakeladder = (current, snake, ladder)=> {
  return {
    type:"SNAKE_EAT",
    payload:{
      current:current,
      snake:snake,
      ladder:ladder
    }
  }
}
const sixSingle=()=>{
  return {
    type:"SIX_SINGLE"
  }
}
const resetSingle=(element)=>{
  return {
    type:"RESET_SINGLE"
  }
}
const player=(player)=>{
  return {
    type: "ADD_PLAYER",
    payload:player
  }
}
const actions = {throwDice, snakeladder, resetSingle, player, sixSingle}
export default actions;
