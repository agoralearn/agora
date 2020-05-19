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
import Inbox from './pages/Inbox/Inbox';
import Chat from './pages/Chat/Chat';
// import ProtectedRouteComp from './pages/ProtectedRoute';
// import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import NavBar from './components/Navbar/Navbar';

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
        <NavBar />
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
          <Route exact path='/login'>
            <Login />
          </Route>
          <ProtectedRoute exact path='/profile'>
            <Profile />
          </ProtectedRoute>
          <Route exact path='/inbox'>
            <Inbox />
          </Route>
          <Route path='/chat/:chatId' component={Chat} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
