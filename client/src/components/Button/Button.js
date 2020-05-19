import React from 'react';
import './Button.scss';

export default function Button({ children, className, onClick, style }) {
  return (
    <button onClick={onClick} className={`btn ${className}`} style={style}>
      {children}
    </button>
  );
}

Button.Link = function ({ children, className, onClick }) {
  return (
    <button onClick={onClick} className={`btn btn-link ${className}`}>
      {children}
    </button>
  );
};
