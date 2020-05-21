import React, { useEffect } from 'react';
import './BottomNav.scss';
import { Icon } from 'semantic-ui-react';
import { useAuth } from '../../utils/auth';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

export default function BottomNav() {
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (user) {
      socket.emit('online', { userId: user.id });
    }
  }, [isLoggedIn]);

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
