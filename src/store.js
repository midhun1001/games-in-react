import { createStore, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import rootReducer from './reducer';

var defaultState = {
  board: {
    size:10,
    initial:1,
    singlethrow:0,
    player:"",
    six:0,
    snake:0,
    ladder:0
  },
  multi:{
    size:10,
    turn:1,
    player1:{
      name:'',
      count:0,
      position:1,
      six:0,
      ladder:0,
      snake:0
    },
    player2:{
      name:'',
      count:0,
      position:1,
      six:0,
      ladder:0,
      snake:0
    },
    resetMulti:{
      player1:{
        name:'',
        count:0,
        position:1,
        six:0,
        ladder:0,
        snake:0
      },
      player2:{
        name:'',
        count:0,
        position:1,
        six:0,
        ladder:0,
        snake:0
      }
    }
  }
};
const store = createStore(rootReducer,defaultState,applyMiddleware(thunk));

export const history = syncHistoryWithStore(browserHistory,store);
export default store;
