import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Header } from './Header';
import { LogIn } from './pages/LogIn';
import { Register } from './pages/Register';

export const App = () => {
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={LogIn} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </Router>
    </div>
  );
};
