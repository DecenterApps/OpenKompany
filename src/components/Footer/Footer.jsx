import React from 'react';

import logo from './assets/footer-logo.png';

import './Footer.scss'

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <img src={logo} alt="Logo" />
      <p>OpenKompany</p>
    </div>
  </footer>
);

export default Footer;
