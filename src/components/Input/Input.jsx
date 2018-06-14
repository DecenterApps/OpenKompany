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
  textarea = false,
  onButtonClick = () => {},
}) => (
  <div className="input-wrapper">
    {
      !textarea &&
      <input
        style={{ width, height }}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    }
    {
      textarea &&
      <textarea
        style={{ width, height }}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    }
    {
      buttonContent !== null &&
      <button
        onClick={onButtonClick}
        style={{ height }}
        className={wideButton && 'wide'}
      >
        {buttonContent}
      </button>
    }
  </div>
);

export default Input;