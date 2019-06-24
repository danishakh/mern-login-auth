import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// We will create our own 'cool' Route component - takes in a path, a component and rest of the passed in props
const PrivateRoute = ({ component: Component, auth, ...rest }) => (

    // render a Route
    <Route 
        {...rest}

        // user React's render prop - whenever a user is authenticated, render the requested component - else redirect to login page
        render={props => 
            auth.isAuthenticated === true 
            ? (<Component {...props} />) 
            : (<Redirect to='/login' />)
        }
    />
);

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);