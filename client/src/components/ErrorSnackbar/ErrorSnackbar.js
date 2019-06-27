import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';


const useStyles = makeStyles(theme => ({
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
}));

function MySnackbarContentWrapper(props) {
    const classes = useStyles();
    const { className, message, onClose, variant, ...other} = props;

    return (
        <SnackbarContent 
            className={classes[variant]}
            aria-describedby='error-snackbar'
            message={
                <span id='error-snackbar' className={classes.message}>
                    <ErrorIcon />
                    {message}
                </span>
            }
            action={[
                <IconButton key='close' aria-label='Close' color='inherit' onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>
            ]}
            {...other}
        />
    )
}

export default class ErrorSnackbar extends Component {

    constructor(){
        super()

        this.state = {
            open: false,
            errors: {}
        }
    }
    

    handleOpen = (error) => {
        this.setState({open: true, errors: error})
    }

    handleClose = () => {
        this.setState({open: false})
    }
    
    render(){
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                open={this.state.open}
                autoHideDuration={3000}
                onClose={this.handleClose}
            >
                <MySnackbarContentWrapper 
                    onClose={this.handleClose}
                    variant='error'
                    message={this.state.errors}
                />
    
            </Snackbar>
        )
    }
    
}

