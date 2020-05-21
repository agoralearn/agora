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

    if (isLoggedIn) {
      return (
        <span className='Navbar_profile'>
          <ProfileImage
            profileImg={user.image}
            style={{
              height: '25px',
              width: '25px',
              float: 'left'
            }}
          />

          <Dropdown
            item
            simple
            text=''
            direction='left'
            className='Navbar_profile-dropdown'
          >
            <Dropdown.Menu>
              <Dropdown.Header content='Menu' />
              <Dropdown.Divider />
              <Dropdown.Item text='Profile' onClick={navigateToProfile} />
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
        </span>
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

// const createLink = ({ text, to, ...rest }) => {
//   const className = 'nav-link';
//   if (to) {
//     return (
//       <Link className={className} to={to} {...rest}>
//         {text}
//       </Link>
//     );
//   }
//   return (
//     <span
//       role='button'
//       className={className}
//       style={{ cursor: 'pointer' }}
//       {...rest}
//     >
//       {text}
//     </span>
//   );
// };

// function NavLinks() {
//   const { isLoggedIn, logout } = useAuth();
//   const links = [];
//   if (isLoggedIn) {
//     links.push({ text: 'Profile', to: '/profile' });
//     links.push({ text: 'Logout', onClick: () => logout() });
//   } else {
//     links.push({ text: 'Signup', to: '/signup' });
//     links.push({ text: 'Login', to: '/login' });
//   }
//   return (
//     <ul className='navbar-nav'>
//       {links.map((link, i) => (
//         <li key={i} className='nav-item'>
//           {createLink(link)}
//         </li>
//       ))}
//     </ul>
//   );
// }

export default Navbar;
