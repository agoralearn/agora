import React from 'react';
import './Badge.scss';

function Badge({ children, type }) {
  return <span className={`Badge_wrapper ${type}`}>{children}</span>;
}

Badge.defaultProps = {
  children: 'Math'
};

export default Badge;
