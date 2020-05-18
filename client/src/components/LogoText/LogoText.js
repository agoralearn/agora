import React from 'react';
import './Logotext.scss';
import { withRouter } from 'react-router-dom';

export default function LogoText({ className }) {
  // <style>.cls-1{fill:#231f20;}</style>
  return (
    // <div className={className}>
    <svg
      id='Layer_1'
      data-name='Layer 1'
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 76.23 16.26'
      style={{ fill: 'white' }}
      height='18'
      className={className}
    >
      <path
        className='cls-1'
        d='M10.34,12.54H4.88L3.41,16H0L7.61,0l7.64,16H11.82ZM9.2,9.88,7.61,6.2,6,9.88Z'
      />
      <path
        className='cls-1'
        d='M28.71,7v7.83a10.67,10.67,0,0,1-5.32,1.43,8,8,0,0,1-8.12-8,8.08,8.08,0,0,1,8.32-8A9.48,9.48,0,0,1,27.94,1.3l-.46,3a7.5,7.5,0,0,0-3.83-1.1,5.05,5.05,0,0,0-5.21,5.08,5,5,0,0,0,5.08,5.06,5.6,5.6,0,0,0,2.33-.44V9.66H22.4L22.82,7Z'
      />
      <path
        className='cls-1'
        d='M30.84,8.25a8.19,8.19,0,1,1,8.19,8A8,8,0,0,1,30.84,8.25ZM44,8.25a5,5,0,1,0-9.94,0,5,5,0,1,0,9.94,0Z'
      />
      <path
        className='cls-1'
        d='M56.63,16l-4-6.31V16h-3.1V.55H54c3.56,0,5.63,2.05,5.63,4.84a4.56,4.56,0,0,1-3.43,4.47L60.35,16Zm-4-7.85h.95c1.78,0,2.83-1,2.83-2.51S55.4,3.15,53.62,3.15h-.95Z'
      />
      <path
        className='cls-1'
        d='M71.33,12.54H65.87L64.4,16H61L68.6,0l7.63,16H72.8ZM70.18,9.88,68.6,6.2,67,9.88Z'
      />
    </svg>
    // </div>
  );
}
