import React, { Component } from 'react';
import { Link as BrowserLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CodeIcon from '@material-ui/icons/Code';


export default class Navbar extends Component {
    

    render() {

        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography align="center" variant="h5">
                        <Link
                            style={{fontFamily: "monospace"}}
                            color='textPrimary'
                            underline='none'
                            component={BrowserLink}
                            to='/'
                        >
                            <CodeIcon /> MERN Login App - with JSON Web Tokens
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}