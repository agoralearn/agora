import React from 'react';
import './Navbar.scss';
import { Link, useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import { useAuth } from '../../utils/auth';
import Logo from '../../components/Logo/Logo';
import LogoText from '../../components/LogoText/LogoText';
import ProfileImage from '../ProfileImage/ProfileImage';
import { Dropdown } from 'semantic-ui-react';

function Navbar() {
  const { isLoggedIn, logout, user } = useAuth();
  const history = useHistory();

  function showLoginOrProfile() {
    function navigateToProfile() {
      history.push('/profile');
    }

    function navigateToBio() {
      history.push('/tutorbio/' + user.id);
    }

    function navigateToInbox() {
      history.push('/inbox');
    }

    const profileImage = (
      <ProfileImage
        profileImg={user.image}
        height='30px'
        width='30px'
        style={{ display: 'inline-block' }}
      />
    );

    if (isLoggedIn) {
      return (
        <div className='Navbar_profile'>
          <Link to='/tutors'>
            <Button.Link className='btn-link btn-link--white u-m-r'>
              Tutors
            </Button.Link>
          </Link>
          <Dropdown
            trigger={profileImage}
            item
            simple
            direction='left'
            className='Navbar_profile-dropdown'
          >
            <Dropdown.Menu>
              {/* <Dropdown.Header content='Menu' /> */}
              {/* <Dropdown.Divider /> */}
              <Dropdown.Item text='Profile' onClick={navigateToProfile} />
              <Dropdown.Item text='Inbox' onClick={navigateToInbox} />
              {user.role === 'tutor' ? (
                <Dropdown.Item text='Bio Page' onClick={navigateToBio} />
              ) : null}
              <Dropdown.Divider />
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
          <Button.Link className='color-white'>Login</Button.Link>
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
      <div>{showLoginOrProfile()}</div>
    </nav>
  );
}

export default Navbar;
