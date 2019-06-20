import React, { Component } from 'react';
import {Grid, Container, Typography, Button} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {

    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };

    render() {
        const { user } = this.props.auth;

        return (
            <Container maxWidth="md" style={{marginTop: 100}}>
                <Grid container justify='space-between' alignItems="center" direction="column" spacing={6}>
                    <Grid item>
                        <Typography align="center" color="textPrimary" variant="h4">
                                Simple Login/Auth App with the <span style={{fontFamily: 'monospace'}}>MERN</span> stack from scratch
                        </Typography>
                    </Grid>
                    <Grid item>
                        <br />
                        <br />
                        <Typography align="center" color="textPrimary" variant="h5">
                            Welcome <span style={{fontFamily: 'monospace'}}>{user.user_name.split(' ')[0]}</span> {"!"} 
                        </Typography>
                        <Typography align="center" color="textSecondary" variant="h6">
                            <br />
                            This is a protected page. You are now logged in full-stack <span style={{fontFamily: 'monospace'}}>MERN</span> app!
                        </Typography>
                    </Grid>
                    
                    <Grid container justify="center" alignItems="center" direction="row"  spacing={6} style={{marginTop: 50}}>
                        <Grid item sm={3}>
                            <Button
                                style={{width: 200, height:80, borderRadius: 10, letterSpacing: 1.5}}
                                variant="contained" 
                                aria-label="Logout"
                                size="large"
                                color="primary"
                                onClick={this.onLogoutClick}
                            >
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Container>
        )
    }
}

// PropTypes Validation
Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});


export default connect(mapStateToProps, { logoutUser })(Dashboard);