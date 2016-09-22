import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './container/app';
import Single from './container/single';
import Multi from './container/multi';
import Home from './container/home.js';

export default (
  <Route component={App} path='/'>
    <IndexRoute component={Home}></IndexRoute>
    <Route component={Single} path='/single'></Route>
    <Route component={Multi} path='/multi'></Route>
    <Route component={Home} path='/home'></Route>
  </Route>
)
