import React from 'react';

import './PageHeader.scss';

import logo from '../../assets/logo.png';

const PageHeader = ({ hasLogo, title, description }) => (
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
      <div>
        aa
      </div>
    }
  </header>
);

export default PageHeader;