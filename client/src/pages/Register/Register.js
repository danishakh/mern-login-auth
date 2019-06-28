import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link as BrowserLink, withRouter } from 'react-router-dom';
import { Container, Grid, TextField, Button, Paper, Typography, Link } from '@material-ui/core';
import BackIcon from '@material-ui/icons/KeyboardBackspaceSharp';
import { registerUser } from '../../actions/authActions';
import NotifSnackbar from '../../components/NotifSnackbar';


class Register extends Component {

    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {},
            open: false
        }
    }

    componentWillMount(){
        // if user is logged in and tries to navigate to Register page, redirect to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          }, () => {
                // callback - if errors object has an 'error' property, trigger Snackbar Open
                if (this.state.errors.error) {
                    this.setState({open: true});
                }
            })
        }
    }

    // Snackbar Close
    handleClose = () => {
        this.setState({open: false})
    }

    onChangeHandler = e => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmitHandler = e => {
        e.preventDefault();

        const newUser = {
            user_name: this.state.name,
            user_email: this.state.email,
            user_pass: this.state.password,
            user_pass2: this.state.password2
        };

        //console.log(newUser);
        this.props.registerUser(newUser, this.props.history); 
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
                            <b>Register</b> below
                        </Typography>
                    </Grid>

                    <Grid item xs={12} style={{marginBottom: 15}} >
                        <Typography variant="caption" color="textSecondary">
                            <i>Already have an account? <Link component={BrowserLink} to="/login">Login</Link></i>
                        </Typography>
                    </Grid>


                    <Grid item xs={4}>
                        <form onSubmit={this.onSubmitHandler}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        id="name"
                                        name="name"
                                        label="Full Name"
                                        fullWidth
                                        value={this.state.name}
                                        onChange={this.onChangeHandler}
                                        error={errors.user_name}
                                        helperText={errors.user_name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        value={this.state.email}
                                        onChange={this.onChangeHandler}
                                        error={errors.user_email}
                                        helperText={errors.user_email}
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
                                        error={errors.user_pass}
                                        helperText={errors.user_pass}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        id="password2"
                                        name="password2"
                                        label="Confirm Password"
                                        type="password"
                                        fullWidth
                                        value={this.state.password2}
                                        onChange={this.onChangeHandler}
                                        error={errors.user_pass2}
                                        helperText={errors.user_pass2}
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
                                        Register
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>
                </Paper>

                <NotifSnackbar 
                    open={this.state.open}
                    handleClose={this.handleClose}
                    message={errors.error}
                />
            </Container>
        )
    }

}

// this function will allow us to get our state from redux and map it to 'props'
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

// propTypes validation
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};


// withRouter(Register) - since we can't just do a 'history.push(/toSomewhere)' in an action, we need to use withRouter 
// to allow us to redirect within an action
export default connect(mapStateToProps, { registerUser })(withRouter(Register));