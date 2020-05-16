import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';

// Our Components
import { AuthProvider, useAuth } from './utils/auth';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Home from './pages/ProtectedRoute';
import Navbar from './components/Navbar';

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
        <div>
          <Navbar />
          <Switch>
            {/* Protecting routes - keep for reference */}
            {/* <ProtectedRoute exact path="/">
              <Home />
            </ProtectedRoute> */}
            <Route exact path='/'>
              <Login />
            </Route>
            <Route exact path='/signup'>
              <Signup />
            </Route>
            <ProtectedRoute exact path='/profile'>
              <Profile />
            </ProtectedRoute>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
