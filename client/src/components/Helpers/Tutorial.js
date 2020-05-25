import React, { useEffect, useState } from 'react';
import { Icon } from 'semantic-ui-react';
// import { useAuth } from '../../utils/auth';

export default function Tutorial({ setHelperVisible }) {
  const [stage, setStage] = useState(1);
  // const { user } = useAuth();
  useEffect(() => {
    if (setHelperVisible) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [setHelperVisible]);

  function handleStages() {
    if (stage < 3) {
      setStage(stage + 1);
    } else {
      setHelperVisible(false);
    }
  }
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0,0,0,.9)',
        zIndex: 9
      }}
      onClick={() => handleStages()}
    >
      {stage === 1 && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            fontWeight: 'bold',
            fontSize: '24px',
            right: '35px',
            color: 'white',
            zIndex: '11',
            maxWidth: '80%',
            lineHeight: '1.5'
          }}
        >
          <div style={{ float: 'right' }}>
            <Icon name='arrow up' />
          </div>
          Menu options including profile settings and logout
        </div>
      )}

      {stage === 2 && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            fontWeight: 'bold',
            fontSize: '24px',
            right: '90px',
            color: 'white',
            zIndex: '11',
            maxWidth: '80%',
            lineHeight: '1.5'
          }}
        >
          <div className='u-m-l' style={{ float: 'right' }}>
            <Icon name='arrow up' />
          </div>
          Search tutors here
        </div>
      )}

      {stage === 3 && (
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            fontWeight: 'bold',
            fontSize: '24px',
            right: '90px',
            color: 'white',
            zIndex: '11',
            maxWidth: '70%',
            lineHeight: '1.5'
          }}
        >
          Click here to view your inbox
          <div className='u-m-l' style={{ float: 'right' }}>
            <Icon name='arrow right' />
          </div>
        </div>
      )}
    </div>
  );
}
