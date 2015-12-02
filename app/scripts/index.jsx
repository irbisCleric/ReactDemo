import './../styles/css/bootstrap.min.css';
import './../styles/css/bootstrap-theme.min.css';

import React from 'react';
import ReactDOM from 'react-dom'
import { Router, Route, Link } from 'react-router';
import { createHistory, useBasename } from 'history';

import App from './components/App';
import Users from './components/Users/Users';
import Catalog from './components/Catalog/Catalog';
import User from './components/Users/User';
import CreateUser from './components/Users/CreateUser';
import NotFound from './components/NotFound';

const routes = {
    path: '/',
    component: App,
    childRoutes: [
        {path: 'catalog', component: Catalog},
        {path: 'users', component: Users},
        {path: 'users/:id', component: User},
        {path: 'create-user', component: CreateUser},
        {path: '*', component: NotFound}
    ]
};


ReactDOM.render(
    <Router routes={routes}/>, document.getElementById('app')
);