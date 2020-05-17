import React from 'react';
import './Badge.scss';

function Badge({ children }) {
  return <span className='Badge_wrapper'>{children}</span>;
}

Badge.defaultProps = {
  children: 'Math'
};

export default Badge;
