import React from 'react';
import './PageHeader.scss';

export default function PageHeader({ children, hr }) {
  return (
    <div className='PageHeader_wrapper'>
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
