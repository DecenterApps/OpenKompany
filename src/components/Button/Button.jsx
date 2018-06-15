import React from 'react';

import './Button.scss';

const Button = ({
  text,
  width = 'auto',
  height = '36px',
  marginRight = '0',
  onClick = () => {},
}) => (
  <button onClick={onClick} style={{ width, height, marginRight }} className="default-button">
    {text}
  </button>
);

export default Button;