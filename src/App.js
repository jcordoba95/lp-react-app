import React from 'react';
import './App.css';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import { history } from './helpers/history';
import { Dashboard } from './components/Dashboard';
import { Login } from './components/Login';
import { Navbar } from './components/Navbar';
import { PrivateRoute } from './components/PrivateRoute';
import { OperationForm } from './components/OperationForm';

export function App() {
  return (
    <div className="app-container bg-light">
      <Router history={history}>
        <Navbar />
        <div className="container pt-4 pb-4">
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute exact path="/operation" component={OperationForm} />
            <Route path="/login" component={Login} />
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </Router>
    </div>
  )
}
