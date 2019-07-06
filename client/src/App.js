import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/authToken';
import { setCurrentUser, logoutUser } from './actions/authActions';

import { Provider } from "react-redux";
import store from "./store";

import { Grid } from '@material-ui/core';

import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound';


// check for JWT in localStorage to keep user logged in even if they close or refresh app
if (localStorage.jwtToken) {
  // set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);

  // deconde token and get user info and expiry
  const decoded = jwt_decode(token);

  // set user and isAuthentication
  store.dispatch(setCurrentUser(decoded));

  // check for expired token
  const currentTime = Date.now() / 1000;  // to get time in milliseconds
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logoutUser());

    // redirect to login page
    window.location.href = './login';

  }
}


function App() {
  return (
    <Provider store={store}>
      <Grid container style={{height: '100%'}}>
          <Router>
              <Navbar />
              <Route path="/" exact component={Landing} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Switch>
                <PrivateRoute path='/dashboard' exact component={Dashboard} />
              </Switch>
              <Route component={NotFound} />
          </Router>
      </Grid>
    </Provider>
  );
}

export default App;