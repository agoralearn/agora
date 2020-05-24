import React from 'react';
import './Navbar.scss';
import { Link, useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import { useAuth } from '../../utils/auth';
import Logo from '../../components/Logo/Logo';
import LogoText from '../../components/LogoText/LogoText';
import ProfileImage from '../ProfileImage/ProfileImage';
import { Icon, Dropdown } from 'semantic-ui-react';

function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();
  const history = useHistory();

  function navigateToProfile() {
    history.push('/profile');
  }

  function navigateToBio() {
    history.push('/tutorbio/' + user.id);
  }

  function navigateToInbox() {
    history.push('/inbox');
  }

  function showLoginOrProfile() {
    const profileImage = user && (
      <ProfileImage
        profileImg={user.image}
        height='40px'
        width='40px'
        style={{ display: 'inline-block' }}
      />
    );

    if (isLoggedIn) {
      return (
        <div className='Navbar_profile'>
          <Dropdown
            trigger={profileImage}
            item
            simple
            direction='left'
            className='Navbar_profile-dropdown'
          >
            <Dropdown.Menu>
              <Dropdown.Item text='Messages' onClick={navigateToInbox} />
              {user.role === 'tutor' ? (
                <Dropdown.Item text='My Bio' onClick={navigateToBio} />
              ) : null}
              <Dropdown.Divider />
              <Dropdown.Item text='Settings' onClick={navigateToProfile} />

              <Dropdown.Item
                text='Logout'
                onClick={() => {
                  logout();
                }}
              />
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    } else {
      return (
        <Link to='/login'>
          <Button.Link className='color-white f-w-b u-m-l'>Login</Button.Link>
        </Link>
      );
    }
  }

  return (
    <nav className='Navbar_wrapper'>
      <Link to='/'>
        <div className='Navbar_logo'>
          <Logo />
          <LogoText className='u-m-l-sm' />
        </div>
      </Link>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Link to='/tutors'>
          <Button.Link className='btn-link btn-link--white u-m-r'>
            {/* Tutors */}
            <Icon name='search'></Icon>Tutors
          </Button.Link>
        </Link>
        {showLoginOrProfile()}
      </div>
    </nav>
  );
}

export default Navbar;
