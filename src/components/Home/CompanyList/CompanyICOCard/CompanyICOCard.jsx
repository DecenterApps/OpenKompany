import React from 'react';
import { Link } from 'react-router-dom';

import '../CompanyCard/CompanyCard.scss';

const CompanyICOCard = ({ ico }) => (
  <Link to={`/ico/${ico.companyAddress}`} className="company-card">
    <p className="company-title">{ico.name} ({ico.symbol})</p>
    <div className="company-stats">
      <p><span className="stat-label">Decimals: </span> {ico.decimals.toString()}</p>
      <p><span className="stat-label small">Price: </span> {ico.price.toString()} Ξ</p>
    </div>
  </Link>
);

export default CompanyICOCard;

