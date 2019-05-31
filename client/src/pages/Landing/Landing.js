import React, { Component } from "react";
import { Link as BrowserLink } from "react-router-dom";
import {Grid, Container, Typography, Button} from '@material-ui/core';


export default class Landing extends Component {


    render() {

        return(

            <Container maxWidth="md" style={{marginTop: 100}}>
                <Grid container justify='center' alignItems="center" direction="column" spacing={6}>
                    <Grid item>
                        <Typography align="center" color="textPrimary" variant="h4">
                                Simple Login/Auth App with the <span style={{fontFamily: 'monospace'}}>MERN</span> stack from scratch
                        </Typography>
                        <br />
                        <br />
                        <Typography align="center" color="textPrimary" variant="h5">
                            Create a minimal full-stack app with user authentication via Passport and JWTs
                        </Typography>
                    </Grid>
                    
                    <br />
                    <Grid container direction="row"  spacing={6}>
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
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