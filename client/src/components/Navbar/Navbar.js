import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
// import { useAuth } from '../../utils/auth';
import Logo from '../../components/Logo/Logo';
import LogoText from '../../components/LogoText/LogoText';

function Navbar() {
  return (
    <nav className='Navbar_wrapper'>
      <Link to='/'>
        <div className='Navbar_logo'>
          <Logo />
          <LogoText className='u-m-l-sm' />
        </div>
      </Link>
      <div>
        <Link to='login'>
          <Button.Link className='color-white'>Login</Button.Link>
        </Link>
      </div>
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
