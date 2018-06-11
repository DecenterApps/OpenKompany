import React from 'react';

import './Input.scss';

const Input = ({
  height = '36px',
  width = '246px',
  type = 'text',
  name = '',
  buttonContent = null,
  placeholder = '',
  value = '',
  onChange = () => {},
  wideButton = false,
}) => (
  <form className="input-wrapper">
    <input
      style={{ width, height }}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
    {
      buttonContent !== null &&
      <button style={{ height }} className={wideButton && 'wide'}>
        {buttonContent}
      </button>
    }
  </form>
);

export default Input;