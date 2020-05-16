import React from 'react';
import './PageHeader.scss';

export default function PageHeader({ children }) {
  return (
    <div className='PageHeader_wrapper'>
      <div className='PageHeader_header-text'>
        {children}
        <hr></hr>
      </div>
    </div>
  );
}
