import React from 'react';
import { Link } from 'react-router-dom';

import './CompanyCard.scss';

const CompanyCard = ({ company }) => (
  <Link to={`/kompany/${company.hash}`} className="company-card">
    <p className="company-title">{company.companyName}</p>
    <div className="company-stats">
      <p><span className="stat-label">Employees: </span> {company.employees.length}</p>
      <p><span className="stat-label">Founder: </span> {company.founder}</p>
    </div>
  </Link>
);

export default CompanyCard;

