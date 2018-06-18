import React from 'react';

import './Button.scss';

const Button = ({
  text,
  className = '',
  width = 'auto',
  height = '36px',
  marginRight = '0',
  onClick = () => {},
}) => (
  <button
    onClick={onClick}
    style={{ width, height, marginRight }}
    className={`default-button ${className}`}
  >
    {text}
  </button>
);

export default Button;