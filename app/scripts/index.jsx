require('./../styles/foundation/foundation.min.css');

import React from 'react';
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router';
import { createHistory, useBasename } from 'history';

import App from './components/App';
import TableUsers from './components/TableUsers';


render((
  <Router>
    <Route path="/" component={App}>
      <Route path="users" component={TableUsers} />
    </Route>
  </Router>
), document.getElementById('content'));