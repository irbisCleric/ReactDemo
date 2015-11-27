require('./../styles/foundation/foundation.min.css');

import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router';
import { createHistory, useBasename } from 'history';

import App from './components/App';
import Users from './components/Users';
import User from './components/User';


const routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'users', component: Users },
    { path: 'users/:id', component: User }
  ]
}

render(<Router routes={routes} />, document.getElementById('content'));
