import React from 'react';
import { Link } from 'react-router-dom';

import './PageHeader.scss';

import logo from '../../assets/logo.png';

const PageHeader = ({ hasLogo, companyName, description }) => (
  <header className="page-header">
    {
      hasLogo &&
      <div className="page-header-logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
          <p>OpenKompany</p>
        </Link>
      </div>
    }
    {
      !hasLogo &&
      <div className="container">
        <div className="nav-links">
          <Link to="/" className="logo-nav">
            <img src={logo} alt="" />
            OpenKompany
          </Link>

          <Link to="/" className="link-nav">
            Home
          </Link>
        </div>
        <p className="page-header-title">{companyName}</p>
        <p className="page-header-description">{description}</p>
      </div>
    }
  </header>
);

export default PageHeader;