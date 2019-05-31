import React, { Component } from "react";
import { Link as BrowserLink } from "react-router-dom";
import {Grid, Container, Typography, Button} from '@material-ui/core';


export default class Landing extends Component {


    render() {

        return(

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
                        <Typography align="center" color="textPrimary" variant="h6">
                            This is a minimal full-stack app to showcase user authentication via Passport and JWTs
                        </Typography>
                    </Grid>
                    
                    <Grid container justify="center" alignItems="center" direction="row"  spacing={6} style={{marginTop: 50}}>
                        <Grid item sm={6} md={3}>
                            <Button
                                style={{width: 200, height:80, borderRadius: 10, letterSpacing: 1.5}}
                                variant="contained" 
                                aria-label="Register"
                                component={BrowserLink}
                                to="/register"
                                size="large"
                                color="primary"
                            >
                                Register
                            </Button>
                        </Grid>
                        <Grid item sm={6} md={3}>
                            <Button 
                                style={{width: 200, height:80, borderRadius: 10, letterSpacing: 1.5}}
                                variant="contained" 
                                aria-label="Login"
                                component={BrowserLink}
                                to="/login"
                                size="large"
                                color="default"
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                    
                </Grid>
            </Container>
        )
    }
}