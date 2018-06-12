import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from '../Home/Home';
import CreateCompany from '../CreateCompany/CreateCompany';
import KompanyPage from '../KompanyPage/KompanyPage';

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/create_kompany" component={CreateCompany} />
      <Route path="/kompany/:id" component={KompanyPage} />
    </div>
  </Router>
);

export default Routes;
