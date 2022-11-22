import React from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { history } from './helpers/history';
import { Dashboard } from './components/Dashboard/index';
import { Login } from './components/Login/index';
import { Navbar } from './components/Navbar/Navbar';
import { PrivateRoute } from './components/PrivateRoute';

export function App() {
  return (
    <div className="app-container bg-light">
      <Router history={history}>
        <Navbar />
        <div className="container pt-4 pb-4">
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
