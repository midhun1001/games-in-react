import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store, { history } from './store';
import routes from './routes';

ReactDOM.render(
  <Provider store={ store }>
    <Router children={ routes } history={ history }></Router>
  </Provider>,
  document.getElementById('root')
);
