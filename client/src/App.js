import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';

// Our Components
import { AuthProvider, useAuth } from './utils/auth';
import Login from './pages/Login/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup/Signup';
import ProtectedRouteComp from './pages/ProtectedRoute';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';

function ProtectedRoute({ children, ...rest }) {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return children;
  }
  return <Redirect to='/signup' />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Switch>
          {/* Protecting routes - keep for reference */}
          {/* <ProtectedRoute exact path="/">
              <ProtectedRouteComp />
            </ProtectedRoute> */}
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <ProtectedRoute exact path='/profile'>
            <Profile />
          </ProtectedRoute>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
