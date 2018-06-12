import React from 'react';

import './PageHeader.scss';

import logo from '../../assets/logo.png';

const PageHeader = ({ hasLogo, companyName, description }) => (
  <header className="page-header">
    {
      hasLogo &&
      <div className="page-header-logo">
        <img src={logo} alt="Logo" />
        <p>OpenKompany</p>
      </div>
    }
    {
      !hasLogo &&
      <div className="container">
        <p className="page-header-title">{companyName}</p>
        <p className="page-header-description">{description}</p>
      </div>
    }
  </header>
);

export default PageHeader;