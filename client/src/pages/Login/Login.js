import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as BrowserLink, withRouter } from 'react-router-dom';
import { Container, Grid, TextField, Button, Paper, Typography, Link } from '@material-ui/core';
import BackIcon from '@material-ui/icons/KeyboardBackspaceSharp';
import { loginUser } from '../../actions/authActions';
import classnames from 'classnames';



class Login extends Component {

    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(nextProps) {
        // isAuthenticated is linked to authReducer - check it out
        // if user object is present in the payload
        if (nextProps.auth.isAuthenticated) {
          this.props.history.push("/dashboard"); // push user to dashboard when they login
        }
    
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }

    onChangeHandler = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmitHandler = e => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password
        };

        //console.log(userData);
        this.props.loginUser(userData); 
    }

    render() {

        const { errors } = this.state

        return(
            <Container maxWidth="md" style={{marginTop: 50}}>
            
            <Grid container alignItems="flex-start" justify="flex-start" style={{margin: 20}}>
                <Link color="inherit" underline="none" component={BrowserLink} to="/">
                    <Typography>
                        <BackIcon fontSize="small" style={{display:"inline-block", marginBottom:"-5px"}} />   
                         BACK TO HOME
                    </Typography>
                </Link>
            </Grid>

            <Paper elevation={20} style={{padding: 30}}>
                <Grid container spacing={0} direction="column" alignItems="center" justify="center" style={{minHeight: '100 vh'}}>
                    <Grid item xs={12} style={{marginBottom: 15}}>
                        <Typography variant="h4">
                            <b>Login</b> below
                        </Typography>
                    </Grid>

                    <Grid item xs={12} style={{marginBottom: 15}} >
                        <Typography variant="caption" color="textSecondary">
                            <i>Don't have an account yet? <Link component={BrowserLink} to="/register">Register</Link></i>
                        </Typography>
                    </Grid>


                    <Grid item xs={4}>
                        <form onSubmit={this.onSubmitHandler}>
                            <Grid container spacing={2}>
                                
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        value={this.state.email}
                                        onChange={this.onChangeHandler}
                                        error={errors.email}
                                        className={classnames("", {
                                            invalid: errors.email || errors.emailnotfound
                                        })}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="password"
                                        name="password"
                                        label="Password"
                                        type="password"
                                        fullWidth
                                        value={this.state.password}
                                        onChange={this.onChangeHandler}
                                        error={errors.password}
                                        className={classnames("", {
                                            invalid: errors.password || errors.passwordincorrect
                                        })}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button 
                                            variant="contained" 
                                            color="primary" 
                                            type="submit" 
                                            style={{
                                                width: "120px",
                                                borderRadius: "3px",
                                                letterSpacing: "1.5px",
                                                marginTop: "2rem"
                                            }}>
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                </Paper>
            </Container>
        )
    }

}

// propTypes validation
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

// map our redux state to props
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

// connect the redux state to our react component
export default connect(mapStateToProps, { loginUser })(Login);