import React from 'react';
import './Button.scss';

export default function Button({
  children,
  className,
  onClick,
  style,
  disabled,
  id
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`btn ${className} ${disabled ? 'disabled' : ''}`}
      style={style}
      id={id}
    >
      {children}
    </button>
  );
}

Button.Link = function ({ children, className, onClick, style, id }) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-link ${className}`}
      style={style}
    >
      {children}
    </button>
  );
};
