import React from 'react';
import { Link } from 'react-router-dom';

import './CompanyCard.scss';

const CompanyCard = ({ company }) => (
  <Link to={`/team_page/${company.id}`} className="company-card">
    <p className="company-title">{company.companyName}</p>
    <div className="company-stats">
      <p><span className="stat-label">Employees: </span> {company.numOfEmployees}</p>
      <p><span className="stat-label">Founder: </span> {company.founder}</p>
    </div>
  </Link>
);

export default CompanyCard;

