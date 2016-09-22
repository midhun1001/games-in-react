import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import activeReducer from './active';

const rootReducer = combineReducers({
  routing:routerReducer,
  board:activeReducer.board,
  multi:activeReducer.multi
})

export default rootReducer;
