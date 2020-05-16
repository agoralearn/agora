import React from 'react';

export default function Button() {
  return <button className='btn'></button>;
}

Button.Link = function ({ children, className }) {
  return <button className={`btn btn-link ${className}`}>{children}</button>;
};
