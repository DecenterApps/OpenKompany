import React from 'react';

import logo from '../../../assets/logo.png'
import './HomeHeader.scss';

export default () => (
  <header className="home-header">
    <div className="header-text">
      <img src={logo} alt="" />
      <p className="header-title">OpenKompany</p>
      <p className="header-description">
        Our idea is to be a platform for decentralized and publicly transparent companies.
        You can add your employees, perform/receive payments and have public and open statistics.
      </p>
    </div>
  </header>
)