import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';


function App() {
  return (
    <Grid style={{height: '100%'}}>
        <Router>
          <div className="container">
            <Navbar />
          </div>

          <Switch>
            <Route path="/" exact component={Landing} />
          </Switch>

        </Router>
      </Grid>
  );
}

export default App;