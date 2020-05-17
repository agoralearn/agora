import React from 'react';
import './Button.scss';

export default function Button({ children, className }) {
  return <button className={`btn ${className}`}>{children}</button>;
}

Button.Link = function ({ children, className }) {
  return <button className={`btn btn-link ${className}`}>{children}</button>;
};
