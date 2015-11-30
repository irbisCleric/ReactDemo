require('./../styles/foundation/foundation.min.css');

import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router';
import { createHistory, useBasename } from 'history';

import App from './components/App';
import Users from './components/Users';
import User from './components/User';
import CreateUser from './components/CreateUser';
import NotFound from './components/NotFound';

const routes = {
  path: '/',
  component: App,
  childRoutes: [
    { path: 'users', component: Users },
    { path: 'users/:id', component: User },
    { path: 'create-user', component: CreateUser },
    { path: '*', component: NotFound }
  ]
}

window.onload = function() {
	render(
		<Router routes={routes} />,
		document.getElementById('app'));
};

