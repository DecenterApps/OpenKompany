import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Home/Home';
import CreateCompany from '../CreateCompany/CreateCompany'

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/create_kompany" component={CreateCompany} />
    </div>
  </Router>
);

export default Routes;
