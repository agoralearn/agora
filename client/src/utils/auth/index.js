import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './AuthService';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();
const authService = new AuthService();

function newSocket() {
  return io(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3001'
      : 'https://agora-tutor.herokuapp.com'
  );
}

// Provides user (object || null), isLoggedIn (bool), login(): promise,
// and logout(): void
export const AuthProvider = ({ value, ...rest }) => {
  const isLoggedIn = authService.loggedIn();
  const [user, setUser] = useState(
    isLoggedIn ? authService.getProfile() : null
  );
  const [socket, setSocket] = useState(newSocket());

  const [state, setState] = useState({
    unread: []
  });

  const history = useHistory();

  useEffect(() => {
    // console.log(window.location.pathname);
    setSocket((oldSocket) => {
      oldSocket.disconnect();

      const socket = newSocket();
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
              setState({
                unread: state.unread.filter((id) => {
                  return id !== data.chatId;
                })
              });
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

      return socket;
    });
  }, [isLoggedIn, user, history, state.unread]);

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
