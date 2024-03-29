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
import Profile from './pages/Profile/Profile';
import Signup from './pages/Signup/Signup';
import Inbox from './pages/Inbox/Inbox';
import Chat from './pages/Chat/Chat';
import WhiteBoard from './pages/WhiteBoard/WhiteBoard';
// import ProtectedRouteComp from './pages/ProtectedRoute';
import Home from './pages/Home/Home';
import NavBar from './components/Navbar/Navbar';
import TutorBio from './pages/TutorBio/TutorBio';
import Search from './pages/Search/Search';
import BottomNav from './components/BottomNav/BottomNav';
import Onboarding from './pages/Onboarding/Onboarding';

// SOCKET IO

function ProtectedRoute({ children, ...rest }) {
  const { isLoggedIn } = useAuth();
  // Render children depending on how the component is
  // passed to the route
  if (isLoggedIn) {
    return children;
  }
  return <Redirect to='/' />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <NavBar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='/whiteboard/:chatId'>
            <WhiteBoard />
          </Route>
          <Route component={Signup} exact path='/signup' />

          <Route exact path='/login'>
            <Login />
          </Route>

          <Route exact path='/tutors'>
            <Search />
          </Route>

          <ProtectedRoute exact path='/profile'>
            <Profile />
          </ProtectedRoute>

          <ProtectedRoute exact path='/onboarding'>
            <Onboarding />
          </ProtectedRoute>

          <Route exact path='/tutorbio/:userId' component={TutorBio} />

          <ProtectedRoute exact path='/inbox'>
            <Route component={Inbox}></Route>
          </ProtectedRoute>

          <ProtectedRoute exact path='/chat/:chatId'>
            <Route exact path='/chat/:chatId' component={Chat}></Route>
          </ProtectedRoute>
        </Switch>

        <BottomNav />
      </AuthProvider>
    </Router>
  );
}
export default App;
