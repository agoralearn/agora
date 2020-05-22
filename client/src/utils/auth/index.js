import React, { createContext, useContext, useState, useEffect } from 'react';
import AuthService from './AuthService';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

const AuthContext = createContext();
const authService = new AuthService();

// Provides user (object || null), isLoggedIn (bool), login(): promise,
// and logout(): void
export const AuthProvider = ({ value, ...rest }) => {
  const isLoggedIn = authService.loggedIn();
  const [user, setUser] = useState(
    isLoggedIn ? authService.getProfile() : null
  );
  const [ioSocket, setIoSocket] = useState();

  useEffect(() => {
    socket.on('message', (data) => {
      console.log('FROM SERVER', data);
      // alert(data);
    });

    socket.on('connect', () => {
      if (isLoggedIn) {
        socket.emit('loggedIn', { userId: user.id });
      }
    });
  }, []);

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
        socket
      }}
      {...rest}
    />
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
