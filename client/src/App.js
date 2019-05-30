import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Grid style={{height: '100%'}}>
        <Router>
          <div className="container">
            <Navbar />
          </div>

          {/* <Switch>
            <Route path="/" exact component={TodoList} />
            <Route path="/edit/:id" component={EditTodo} />
            <Route path="/create" component={CreateTodo} />
            <Route component={NotFound} />
          </Switch> */}

        </Router>
      </Grid>
  );
}

export default App;