import React from 'react';

import './Button.scss';

const Button = ({ text }) => (
  <button className="default-button">
    {text}
  </button>
);

export default Button;