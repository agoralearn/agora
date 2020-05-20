import React from 'react';
import './BottomNav.scss';
import { Icon } from 'semantic-ui-react';
import { useAuth } from '../../utils/auth';
import { Link } from 'react-router-dom';

export default function BottomNav() {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      {isLoggedIn && (
        <Link to='/inbox'>
          <div className='BottomNav_wrapper'>
            <Icon name='mail outline'></Icon>
          </div>
        </Link>
      )}
    </div>
  );
}
