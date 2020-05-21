import React, { useEffect } from 'react';
import './BottomNav.scss';
import { Icon } from 'semantic-ui-react';
import { useAuth } from '../../utils/auth';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { useLocation } from 'react-router-dom';

const socket = io('http://localhost:3001');

const pathsToHideButton = ['inbox', 'chat'];

function checkIfShouldRender(path) {
  let shouldRender = true;
  const urlPaths = path.split('/');

  pathsToHideButton.forEach((path) => {
    if (urlPaths.includes(path)) {
      shouldRender = false;
    }
  });

  return shouldRender;
}

export default function BottomNav(props) {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return (
    <>
      {checkIfShouldRender(location.pathname) && (
        <div>
          {isLoggedIn && (
            <Link to='/inbox'>
              <div className='BottomNav_wrapper'>
                <Icon name='mail outline'></Icon>
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
}
