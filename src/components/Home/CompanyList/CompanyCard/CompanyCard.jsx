import React from 'react';
import { Link } from 'react-router-dom';

import './CompanyCard.scss';

const CompanyCard = ({ company }) => (
  <Link to={`/kompany/${company.companyAddress}`} className="company-card">
    <p className="company-title">{company.companyName}</p>
    {
      company.isICOLive &&
      <span className="active-ico">
          ICO LIVE
      </span>
    }
    <div className="company-stats">
      <p><span className="stat-label">Employees: </span> {company.employees.length}</p>
      <p><span className="stat-label">Founder: </span> {company.founder}</p>
    </div>
  </Link>
);

export default CompanyCard;

