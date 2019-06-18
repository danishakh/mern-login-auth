import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Provider } from "react-redux";
import store from "./store";


function App() {
  return (
    <Provider store={store}>
      <Grid container style={{height: '100%'}}>
          <Router>
              <Navbar />

            <Switch>
              <Route path="/" exact component={Landing} />
              <Route path="/register" exact component={Register} />
              <Route path="/login" exact component={Login} />
              <Route path="/dashboard" exact component={Dashboard} />
            </Switch>

          </Router>
      </Grid>
    </Provider>
  );
}

export default App;