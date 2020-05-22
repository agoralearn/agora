import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './AuthService';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
const socket = io(
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://agora-tutor.herokuapp.com'
);

const AuthContext = createContext();
const authService = new AuthService();

// Provides user (object || null), isLoggedIn (bool), login(): promise,
// and logout(): void
export const AuthProvider = ({ value, ...rest }) => {
  const isLoggedIn = authService.loggedIn();
  const [user, setUser] = useState(
    isLoggedIn ? authService.getProfile() : null
  );

  const [state, setState] = useState({
    unread: []
  });

  const history = useHistory();

  useEffect(() => {
    // console.log(window.location.pathname);

    socket.on('message', (data) => {
      const locationArr = history.location.pathname.split('/');

      if (
        !locationArr.includes(data.chatId) &&
        !locationArr.includes('inbox')
      ) {
        toast.configure();
        toast.success('You have a new message!', {
          position: toast.POSITION.TOP_RIGHT,
          onClick: () => {
            history.push(`/chat/${data.chatId}`);
          },
          pauseOnHover: false
        });
      }

      if (!locationArr.includes(data.chatId)) {
        setState((state) => {
          return { ...state, unread: [...state.unread, data.chatId] };
        });
      }
    });

    socket.on('connect', () => {
      if (isLoggedIn) {
        socket.emit('loggedIn', { userId: user.id });
      }
    });
  }, [isLoggedIn, user, history]);

  const login = (email, password) => {
    return authService.login(email, password).then(() => {
      setUser(authService.getProfile());
      return authService.getProfile();
    });
  };

  const logout = () => authService.logout();

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        logout,
        socket,
        state,
        setState
      }}
      {...rest}
    />
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
