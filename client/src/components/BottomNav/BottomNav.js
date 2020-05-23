import React from 'react';
import './BottomNav.scss';
import { Icon } from 'semantic-ui-react';
import { useAuth } from '../../utils/auth';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

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
  const { isLoggedIn, state } = useAuth();

  function renderMailIcon() {
    return <Icon name='mail outline' />;
  }

  function renderIconGroup() {
    return (
      <Icon.Group>
        {renderMailIcon()}
        <Icon
          name='exclamation circle'
          color='red'
          corner='top right'
          size='large'
        />
      </Icon.Group>
    );
  }

  return (
    <>
      {checkIfShouldRender(location.pathname) && (
        <div>
          {isLoggedIn && (
            <Link to='/inbox'>
              <div className='BottomNav_wrapper'>
                {state.unread.length > 0 ? renderIconGroup() : renderMailIcon()}
              </div>
            </Link>
          )}
        </div>
      )}
    </>
  );
}
