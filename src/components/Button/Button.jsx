import React from 'react';

import './Button.scss';

const Button = ({ text, width = 'auto', height = '36px' }) => (
  <button style={{ width, height }} className="default-button">
    {text}
  </button>
);

export default Button;