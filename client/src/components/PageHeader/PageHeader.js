import React from 'react';
import './PageHeader.scss';

export default function PageHeader({ children, hr, style }) {
  return (
    <div className='PageHeader_wrapper' style={{ style }}>
      <div className='PageHeader_header-text'>
        {children}
        {hr ? <hr></hr> : null}
      </div>
    </div>
  );
}

PageHeader.defaultProps = {
  hr: true
};
