import React, { useEffect } from 'react';
import { Icon } from 'semantic-ui-react';

export default function CheckInbox({ setHelperVisible }) {
  useEffect(() => {
    if (setHelperVisible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [setHelperVisible]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,.9)',
        zIndex: 12
      }}
      onClick={() => setHelperVisible(false)}
    >
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          fontWeight: 'bold',
          fontSize: '24px',
          right: '90px',
          color: 'white',
          zIndex: '13'
        }}
      >
        Keep an eye out for a response here <Icon name='arrow right' />
      </div>
    </div>
  );
}
