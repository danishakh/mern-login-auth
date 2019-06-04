import React, { Component } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import { Container, Grid, TextField, Button, Paper, Typography, Link } from '@material-ui/core';
import BackIcon from '@material-ui/icons/KeyboardBackspaceSharp';


export default class Login extends Component {

    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
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

        console.log(userData);
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